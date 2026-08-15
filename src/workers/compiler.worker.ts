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

function runTool(mod: EmscriptenModule, args: string[]) {
	try {
		const code = mod.callMain([...args]);
		return typeof code === "number" ? code : 0;
	} catch (error) {
		if (error && typeof error === "object" && "status" in error) {
			return Number((error as { status: number }).status);
		}
		if (error instanceof Error && /exit|ExitStatus/i.test(error.message)) {
			const match = error.message.match(/(\d+)/);
			return match ? Number(match[1]) : 1;
		}
		throw error;
	}
}

async function ensureToolchain() {
	if (clang && lldWasm && twrArchive && libcxxArchive && sysrootReady) {
		return;
	}

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
	const libcxx = clang.FS.readFile("/lib-c/libc++.a", { encoding: "binary" });
	if (!(twr instanceof Uint8Array) || !(libcxx instanceof Uint8Array)) {
		throw new Error("twr-wasm sysroot is missing static libraries");
	}
	twrArchive = twr;
	libcxxArchive = libcxx;
	sysrootReady = true;
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
	const compileLog = clangLog.trim();
	if (compileCode !== 0) {
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
	const linkCode = runTool(lld, linkerArgs());
	const linkLog = [compileLog, lldLog.trim()].filter(Boolean).join("\n");
	if (linkCode !== 0) {
		post({
			type: "compile-result",
			ok: false,
			log: linkLog || `wasm-ld exited with code ${linkCode}`,
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
		post({ type: "error", message });
	}
};
