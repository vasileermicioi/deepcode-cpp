import type {
	CompilerEvent,
	CompilerRequest,
	CppStandard,
} from "./compiler-protocol";

export type CompileProgress = {
	message: string;
	loaded?: number;
	total?: number;
};

export type CompileResult =
	| { ok: true; wasm: ArrayBuffer; log: string }
	| { ok: false; log: string };

class CompilerClient {
	private worker: Worker | null = null;
	private ready: Promise<void> | null = null;
	private readyResolve: (() => void) | null = null;
	private readyReject: ((error: Error) => void) | null = null;
	private compileResolve: ((result: CompileResult) => void) | null = null;
	private compileReject: ((error: Error) => void) | null = null;
	private onProgress: ((progress: CompileProgress) => void) | null = null;

	preload(onProgress?: (progress: CompileProgress) => void) {
		this.onProgress = onProgress ?? this.onProgress;
		return this.ensureReady();
	}

	async compile(
		source: string,
		standard: CppStandard,
		onProgress?: (progress: CompileProgress) => void,
	): Promise<CompileResult> {
		this.onProgress = onProgress ?? this.onProgress;
		await this.ensureReady();
		return new Promise<CompileResult>((resolve, reject) => {
			this.compileResolve = resolve;
			this.compileReject = reject;
			this.post({ type: "compile", source, standard });
		});
	}

	private ensureReady() {
		if (this.ready) {
			return this.ready;
		}

		this.worker = new Worker(
			new URL("../workers/compiler.worker.ts", import.meta.url),
			{
				type: "module",
			},
		);
		this.worker.onmessage = (event: MessageEvent<CompilerEvent>) => {
			this.handleEvent(event.data);
		};
		this.worker.onerror = (event) => {
			const error = new Error(event.message || "Compiler worker failed");
			this.readyReject?.(error);
			this.compileReject?.(error);
			this.readyReject = null;
			this.compileReject = null;
		};

		this.ready = new Promise<void>((resolve, reject) => {
			this.readyResolve = resolve;
			this.readyReject = reject;
		});
		this.post({ type: "init" });
		return this.ready;
	}

	private handleEvent(event: CompilerEvent) {
		if (event.type === "progress") {
			this.onProgress?.({
				message: event.message,
				loaded: event.loaded,
				total: event.total,
			});
			return;
		}
		if (event.type === "ready") {
			this.readyResolve?.();
			this.readyResolve = null;
			this.readyReject = null;
			return;
		}
		if (event.type === "compile-result") {
			this.compileResolve?.(
				event.ok
					? { ok: true, wasm: event.wasm, log: event.log }
					: { ok: false, log: event.log },
			);
			this.compileResolve = null;
			this.compileReject = null;
			return;
		}
		if (event.type === "error") {
			const error = new Error(event.message);
			this.readyReject?.(error);
			this.compileReject?.(error);
			this.readyReject = null;
			this.compileReject = null;
		}
	}

	private post(request: CompilerRequest) {
		this.worker?.postMessage(request);
	}
}

export const compiler = new CompilerClient();
