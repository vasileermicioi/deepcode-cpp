import Clang from "browsercc/dist/clang.js";
import LLD from "browsercc/dist/lld.js";
import {
	type CompilerEvent,
	type CompilerRequest,
	type CppStandard,
	ENTRY_STUB,
} from "../lib/compiler-protocol";

type EmscriptenFS = {
	mkdirTree: (path: string) => void;
	writeFile: (path: string, data: string | Uint8Array) => void;
	readFile: (
		path: string,
		opts?: { encoding: "binary" | "utf8" },
	) => Uint8Array | string;
	analyzePath: (path: string) => { exists: boolean };
	unlink: (path: string) => void;
};

type EmscriptenModule = {
	FS: EmscriptenFS;
	callMain: (args: string[]) => number | undefined;
};

const MEMORY_BYTES = 16 * 1024 * 1024;
const STACK_BYTES = 128 * 1024;
const TOOLCHAIN_WASM_BASE = import.meta.env.DEV
	? "/toolchain"
	: "https://cdn.jsdelivr.net/npm/browsercc@0.1.1/dist";

let clang: EmscriptenModule | null = null;
let lldWasm: Uint8Array | null = null;
let twrArchive: Uint8Array | null = null;
let libcxxArchive: Uint8Array | null = null;
let clangLog = "";
let lldLog = "";
let sysrootReady = false;
let initPromise: Promise<void> | null = null;

function isAbortMessage(message: string): boolean {
	return /abort/i.test(message);
}

function resetToolchain() {
	clang = null;
	lldWasm = null;
	twrArchive = null;
	libcxxArchive = null;
	sysrootReady = false;
	initPromise = null;
}

function post(event: CompilerEvent, transfer?: Transferable[]) {
	if (transfer?.length) {
		self.postMessage(event, { transfer });
		return;
	}
	self.postMessage(event);
}

function* tarContents(contents: ArrayBuffer) {
	const data = new Uint8Array(contents);
	let offset = 0;
	const textDecoder = new TextDecoder("utf-8");
	while (offset + 512 <= data.length) {
		const header = data.slice(offset, offset + 512);
		const name = textDecoder.decode(header.slice(0, 100)).replace(/\0.*$/, "");
		if (!name) {
			break;
		}
		const sizeOctal = textDecoder
			.decode(header.slice(124, 136))
			.replace(/\0.*$/, "")
			.trim();
		const size = Number.parseInt(sizeOctal, 8) || 0;
		const contentStart = offset + 512;
		yield { name, content: data.slice(contentStart, contentStart + size) };
		offset += 512 + Math.ceil(size / 512) * 512;
	}
}

function mountSysroot(mod: EmscriptenModule, tar: ArrayBuffer) {
	for (const { name, content } of tarContents(tar)) {
		if (name.endsWith("/")) {
			continue;
		}
		const dirName = name.split("/").slice(0, -1).join("/");
		if (dirName && !mod.FS.analyzePath(dirName).exists) {
			mod.FS.mkdirTree(dirName);
		}
		mod.FS.writeFile(name, content);
	}
}

async function fetchBinary(url: string, label: string) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to download ${label} (${response.status})`);
	}
	const total = Number(response.headers.get("Content-Length") ?? 0);
	if (!response.body || !total) {
		post({ type: "progress", message: `Loading ${label}...` });
		return new Uint8Array(await response.arrayBuffer());
	}

	const reader = response.body.getReader();
	const chunks: Uint8Array[] = [];
	let loaded = 0;
	for (;;) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		chunks.push(value);
		loaded += value.byteLength;
		post({
			type: "progress",
			message: `Loading ${label}...`,
			loaded,
			total,
		});
	}

	const bytes = new Uint8Array(loaded);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return bytes;
}

function unlinkIfExists(mod: EmscriptenModule, path: string) {
	if (mod.FS.analyzePath(path).exists) {
		mod.FS.unlink(path);
	}
}

function formatLogPaths(log: string): string {
	return log.replaceAll("/src/main.cpp", "main.cpp");
}

type SymbolUse = { line: number; col: number; text: string };

function findUses(source: string, needle: string, max = 5): SymbolUse[] {
	const out: SymbolUse[] = [];
	if (!needle) {
		return out;
	}
	const lines = source.split("\n");
	for (let i = 0; i < lines.length && out.length < max; i++) {
		let from = 0;
		while (out.length < max) {
			const idx = lines[i].indexOf(needle, from);
			if (idx < 0) {
				break;
			}
			out.push({ line: i + 1, col: idx + 1, text: lines[i].trim() });
			from = idx + needle.length;
		}
	}
	return out;
}

// Symbols Clang -O2 synthesizes out of user calls. Maps the missing
// linker symbol back to the source function the user actually wrote.
const OPTIMIZER_ORIGINS: Record<string, string[]> = {
	exp2: ["pow"],
	exp2f: ["pow", "powf"],
	log2: ["log"],
	log2f: ["log", "logf"],
	log10: ["log"],
	log10f: ["log", "logf"],
	expm1: ["exp"],
	cbrt: ["pow"],
	powf: ["pow"],
	hypot: ["sqrt"],
};

function enhanceLinkLog(log: string, source: string): string {
	const cleaned = formatLogPaths(log);
	const missing = new Set<string>();
	for (const match of cleaned.matchAll(/undefined symbol:\s*([^\s]+)/g)) {
		missing.add(match[1].replace(/[.,:;]+$/, ""));
	}
	if (missing.size === 0) {
		return cleaned;
	}
	const hints: string[] = [];
	const hasMathHeader = /#include\s*<(cmath|math\.h)>/.test(source);
	for (const symbol of missing) {
		const uses = findUses(source, symbol);
		if (uses.length > 0) {
			for (const use of uses) {
				hints.push(
					`main.cpp:${use.line}:${use.col}: error: undefined symbol '${symbol}' used here\n  ${use.text}`,
				);
			}
		} else {
			const origins = OPTIMIZER_ORIGINS[symbol] ?? [];
			let mapped = false;
			for (const origin of origins) {
				const originUses = findUses(source, origin);
				if (originUses.length > 0) {
					for (const use of originUses) {
						hints.push(
							`main.cpp:${use.line}:${use.col}: error: '${symbol}' (generated by the compiler from '${origin}' here) is not provided by the twr-wasm libc\n  ${use.text}`,
						);
					}
					mapped = true;
					break;
				}
			}
			if (!mapped) {
				hints.push(
					`error: undefined symbol '${symbol}' — not found in your code, likely emitted by the compiler or missing from the twr-wasm libc`,
				);
			}
		}
		if (symbol === "exp2" || symbol === "exp2f") {
			const pow2Uses = findUses(source, "pow");
			const swapped = /pow\s*\(\s*2\s*,/.test(source);
			if (swapped) {
				for (const use of pow2Uses) {
					if (/pow\s*\(\s*2\s*,/.test(use.text)) {
						hints.push(
							`main.cpp:${use.line}:${use.col}: note: pow(2, R) means 2^R; for R² write pow(R, 2) or R*R\n  ${use.text}`,
						);
					}
				}
			}
		}
	}
	if (
		!hasMathHeader &&
		/\b(pow|sqrt|sin|cos|tan|exp|log|fabs|floor|ceil)\s*\(/.test(source)
	) {
		hints.push(
			"note: add #include <cmath> when using pow/sqrt/sin/cos/exp/log",
		);
	}
	return [cleaned, ...hints].join("\n");
}

function runTool(mod: EmscriptenModule, args: string[]) {
	try {
		const code = mod.callMain([...args]);
		return typeof code === "number" ? code : 0;
	} catch (error) {
		if (error && typeof error === "object" && "status" in error) {
			return Number((error as { status: number }).status);
		}
		if (error instanceof Error) {
			if (/exit|ExitStatus/i.test(error.message)) {
				const match = error.message.match(/(\d+)/);
				return match ? Number(match[1]) : 1;
			}
			// Emscripten abort (e.g. OOM in clang.wasm/lld.wasm) surfaces as
			// `Aborted()` / `abort(...)`. Normalize so the client can retry
			// with a fresh worker instead of treating it as a user error.
			if (isAbortMessage(error.message)) {
				throw new Error(`Toolchain aborted: ${error.message}`);
			}
		}
		throw error;
	}
}

async function ensureToolchain() {
	if (clang && lldWasm && twrArchive && libcxxArchive && sysrootReady) {
		return;
	}
	if (initPromise) {
		await initPromise;
		if (clang && lldWasm && twrArchive && libcxxArchive && sysrootReady) {
			return;
		}
	}

	initPromise = (async () => {
		post({ type: "progress", message: "Downloading Clang..." });
		const [clangWasm, fetchedLldWasm, sysroot] = await Promise.all([
			fetchBinary(`${TOOLCHAIN_WASM_BASE}/clang.wasm`, "Clang"),
			fetchBinary(`${TOOLCHAIN_WASM_BASE}/lld.wasm`, "LLD"),
			fetch("/twr-sysroot.tar").then(async (response) => {
				if (!response.ok) {
					throw new Error("Failed to download twr-wasm sysroot");
				}
				post({
					type: "progress",
					message: "Loading twr-wasm headers and libc++...",
				});
				return response.arrayBuffer();
			}),
		]);
		lldWasm = fetchedLldWasm;

		post({ type: "progress", message: "Starting Clang..." });

		clang = (await Clang({
			thisProgram: "clang++",
			noInitialRun: true,
			noExitRuntime: true,
			wasmBinary: clangWasm,
			print: (data: string) => {
				clangLog += `${data}\n`;
			},
			printErr: (data: string) => {
				clangLog += `${data}\n`;
			},
		})) as EmscriptenModule;

		post({ type: "progress", message: "Mounting twr-wasm sysroot..." });
		mountSysroot(clang, sysroot);
		const twr = clang.FS.readFile("/lib-c/twr.a", { encoding: "binary" });
		const libcxx = clang.FS.readFile("/lib-c/libc++.a", {
			encoding: "binary",
		});
		if (!(twr instanceof Uint8Array) || !(libcxx instanceof Uint8Array)) {
			throw new Error("twr-wasm sysroot is missing static libraries");
		}
		twrArchive = twr;
		libcxxArchive = libcxx;
		sysrootReady = true;
	})();
	try {
		await initPromise;
	} catch (error) {
		resetToolchain();
		throw error;
	} finally {
		if (clang && sysrootReady) {
			initPromise = null;
		}
	}
}

async function createLinker() {
	if (!lldWasm || !twrArchive || !libcxxArchive) {
		throw new Error("Linker assets are not ready");
	}
	const linker = (await LLD({
		thisProgram: "wasm-ld",
		noInitialRun: true,
		noExitRuntime: true,
		wasmBinary: lldWasm,
		print: (data: string) => {
			lldLog += `${data}\n`;
		},
		printErr: (data: string) => {
			lldLog += `${data}\n`;
		},
	})) as EmscriptenModule;
	linker.FS.mkdirTree("/lib-c");
	linker.FS.mkdirTree("/tmp");
	linker.FS.writeFile("/lib-c/twr.a", twrArchive);
	linker.FS.writeFile("/lib-c/libc++.a", libcxxArchive);
	return linker;
}

function compilerArgs(standard: CppStandard) {
	return [
		"--target=wasm32",
		"-fno-exceptions",
		"-nostdlibinc",
		"-nostdinc",
		"-nostdlib",
		"-I",
		"/include/c++/v1",
		"-I",
		"/include",
		"-D_LIBCPP_PROVIDES_DEFAULT_RUNE_TABLE",
		`-std=${standard}`,
		"-c",
		"-Wall",
		"-O2",
		"-fno-c++-static-destructors",
		"/src/main.cpp",
		"-o",
		"/tmp/main.o",
	];
}

function linkerArgs() {
	return [
		"/tmp/main.o",
		"/lib-c/twr.a",
		"/lib-c/libc++.a",
		"-o",
		"/tmp/program.wasm",
		"--no-entry",
		"--allow-multiple-definition",
		"--shared-memory",
		"--no-check-features",
		`--initial-memory=${MEMORY_BYTES}`,
		`--max-memory=${MEMORY_BYTES}`,
		"-z",
		`stack-size=${STACK_BYTES}`,
		"--export=run",
	];
}

async function compile(source: string, standard: CppStandard) {
	await ensureToolchain();
	if (!clang) {
		throw new Error("Toolchain failed to initialize");
	}

	clangLog = "";
	lldLog = "";
	clang.FS.mkdirTree("/src");
	clang.FS.mkdirTree("/tmp");
	unlinkIfExists(clang, "/tmp/main.o");
	clang.FS.writeFile("/src/main.cpp", `${source.trimEnd()}\n${ENTRY_STUB}`);

	post({ type: "progress", message: "Compiling with Clang..." });
	const compileCode = runTool(clang, compilerArgs(standard));
	const compileLog = formatLogPaths(clangLog.trim());
	if (compileCode !== 0) {
		// An aborted clang (OOM / Emscripten abort) poisons the reused
		// module — drop it so the next compile re-initializes cleanly.
		// Real syntax errors never contain "abort".
		if (isAbortMessage(compileLog)) {
			resetToolchain();
		}
		post({
			type: "compile-result",
			ok: false,
			log: compileLog || `clang++ exited with code ${compileCode}`,
		});
		return;
	}

	const objectFile = clang.FS.readFile("/tmp/main.o", { encoding: "binary" });
	if (!(objectFile instanceof Uint8Array)) {
		throw new Error("Clang did not emit an object file");
	}

	post({ type: "progress", message: "Linking with wasm-ld and twr-wasm..." });
	const lld = await createLinker();
	lld.FS.writeFile("/tmp/main.o", objectFile);
	let linkCode = 1;
	try {
		linkCode = runTool(lld, linkerArgs());
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		if (isAbortMessage(message)) {
			resetToolchain();
			throw new Error(`Toolchain aborted during link: ${message}`);
		}
		throw error;
	}
	const linkLog = [compileLog, lldLog.trim()].filter(Boolean).join("\n");
	if (linkCode !== 0) {
		if (isAbortMessage(linkLog)) {
			resetToolchain();
		}
		post({
			type: "compile-result",
			ok: false,
			log: enhanceLinkLog(
				linkLog || `wasm-ld exited with code ${linkCode}`,
				source,
			),
		});
		return;
	}

	const wasm = lld.FS.readFile("/tmp/program.wasm", { encoding: "binary" });
	if (!(wasm instanceof Uint8Array)) {
		throw new Error("Linker did not emit a wasm module");
	}
	const copy = new Uint8Array(wasm).buffer;
	post(
		{
			type: "compile-result",
			ok: true,
			wasm: copy,
			log: linkLog,
		},
		[copy],
	);
}

self.onmessage = async (event: MessageEvent<CompilerRequest>) => {
	const request = event.data;
	try {
		if (request.type === "init") {
			await ensureToolchain();
			post({ type: "ready" });
			return;
		}
		if (request.type === "compile") {
			await compile(request.source, request.standard);
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		if (isAbortMessage(message)) {
			resetToolchain();
		}
		post({ type: "error", message });
	}
};
