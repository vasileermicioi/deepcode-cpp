import { twrConsoleDiv, twrWasmModuleAsync } from "twr-wasm";

export type RuntimeSession = {
	console: twrConsoleDiv;
	run: (wasm: ArrayBuffer, stdin?: string) => Promise<number>;
	clear: () => void;
};

function pushStdin(console: twrConsoleDiv, stdin: string) {
	const text = stdin.endsWith("\n") ? stdin : `${stdin}\n`;
	for (const char of text) {
		const key = char === "\n" ? "Enter" : char;
		console.keyDown(new KeyboardEvent("keydown", { key }));
	}
}

export function createRuntime(element: HTMLDivElement): RuntimeSession {
	if (!crossOriginIsolated) {
		throw new Error(
			"This page is not cross-origin isolated, so stdin (cin) cannot run. Use the Vite dev server or serve with COOP/COEP headers.",
		);
	}

	const console = new twrConsoleDiv(element, {
		foreColor: "#e4e4e7",
		backColor: "#09090b",
		fontSize: 13,
	});

	element.tabIndex = 0;
	element.addEventListener("keydown", (event) => {
		console.keyDown(event);
	});

	let module: twrWasmModuleAsync | null = null;

	const clear = () => {
		element.innerHTML = "";
		module?.myWorker.terminate();
		module = null;
	};

	const run = async (wasm: ArrayBuffer, stdin = "") => {
		clear();
		const url = URL.createObjectURL(
			new Blob([wasm], { type: "application/wasm" }),
		);
		try {
			module = new twrWasmModuleAsync({
				io: { stdio: console, stderr: console },
			});
			await module.loadWasm(url);
			if (stdin) {
				pushStdin(console, stdin);
			} else {
				element.focus();
			}
			const result = await module.callC(["run"]);
			return typeof result === "number" ? result : 0;
		} finally {
			URL.revokeObjectURL(url);
		}
	};

	return { console, run, clear };
}
