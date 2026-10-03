import {
	type TLibImports,
	twrLibrary,
	twrLibraryInstanceRegistry,
} from "twr-wasm";

const CHARREAD = 1 << 0;
const CHARWRITE = 1 << 1;

type WasmMemLike = {
	wasmMem: {
		getString: (idx: number, len?: number, codePage?: number) => string;
	};
};

export class TestConsole extends twrLibrary {
	id: number;
	imports: TLibImports = {
		twrConCharOut: { noBlock: true },
		twrConGetProp: {},
		twrConPutStr: { noBlock: true },
		twrConCharIn: { isAsyncFunction: true, isModuleAsyncOnly: true },
		twrConSetFocus: { noBlock: true },
	};
	libSourcePath: string = "test-console";
	interfaceName = "twrConsole";

	private output = "";
	private inputQueue: number[] = [];
	private inputPos = 0;
	private lastOut = 0;

	constructor(stdin = "") {
		super();
		this.id = twrLibraryInstanceRegistry.register(this);
		this.feedStdin(stdin);
	}

	feedStdin(stdin: string) {
		const text = stdin.endsWith("\n") ? stdin : `${stdin}\n`;
		this.inputQueue = [...text].map((c) => c.codePointAt(0) ?? 10);
		this.inputPos = 0;
	}

	getOutput(): string {
		return this.output;
	}

	// IConsoleStreamOut
	charOut(ch: string) {
		if (ch.length === 0) {
			return;
		}
		this.appendCodePoint(ch.codePointAt(0) ?? 0);
	}

	putStr(str: string) {
		for (const c of str) {
			this.appendCodePoint(c.codePointAt(0) ?? 0);
		}
	}

	twrConCharOut(_callingMod: unknown, ch: number, _codePage: number) {
		this.appendCodePoint(ch);
	}

	twrConPutStr(callingMod: WasmMemLike, chars: number, codePage: number) {
		try {
			const s: string = callingMod.wasmMem.getString(
				chars,
				undefined,
				codePage,
			);
			this.putStr(s);
		} catch {
			// ignore decode errors, output already captured via CharOut
		}
	}

	private appendCodePoint(ch: number) {
		if (ch === 13) {
			this.output += "\n";
			this.lastOut = 13;
			return;
		}
		if (ch === 10) {
			if (this.lastOut === 13) {
				this.lastOut = 10;
				return;
			}
			this.output += "\n";
			this.lastOut = 10;
			return;
		}
		if (ch === 8) {
			this.output = this.output.slice(0, -1);
			this.lastOut = 8;
			return;
		}
		// cursor on/off markers used by div console, ignore for capture
		if (ch === 0xe || ch === 0xf || ch === 0) {
			return;
		}
		if (ch > 0) {
			try {
				this.output += String.fromCodePoint(ch);
			} catch {
				// ignore invalid code points
			}
			this.lastOut = ch;
		}
	}

	// IConsoleBase
	getProp(propName: string): number {
		if (propName === "type") {
			return CHARREAD | CHARWRITE;
		}
		return 0;
	}

	twrConGetProp(callingMod: WasmMemLike, pn: number): number {
		try {
			const propName: string = callingMod.wasmMem.getString(pn);
			return this.getProp(propName);
		} catch {
			return 0;
		}
	}

	// IConsoleStreamIn
	keyDown(_ev: KeyboardEvent) {
		// headless: stdin is pre-fed, no interactive keys
	}

	async twrConCharIn_async(_callingMod: unknown): Promise<number> {
		if (this.inputPos < this.inputQueue.length) {
			return this.inputQueue[this.inputPos++];
		}
		// EOF: ENTRY_STUB maps c < 0 to EOF for getc/fgetc
		return -1;
	}

	twrConSetFocus() {
		// no-op headless
	}
}
