export type CppStandard = "c++17" | "c++20" | "c++23";

export type CompilerRequest =
	| { type: "init" }
	| { type: "compile"; source: string; standard: CppStandard };

export type CompilerEvent =
	| { type: "progress"; message: string; loaded?: number; total?: number }
	| { type: "ready" }
	| { type: "compile-result"; ok: true; wasm: ArrayBuffer; log: string }
	| { type: "compile-result"; ok: false; log: string }
	| { type: "error"; message: string };

export const ENTRY_STUB = `
#include <stdio.h>

int main();

extern "C" {

enum { TWR_UNGET_MAX = 16 };
static int twr_unget_buf[TWR_UNGET_MAX];
static int twr_unget_len;
static FILE *twr_unget_fp;

int ungetc(int ch, FILE *stream) {
	if (ch == EOF || stream == nullptr || twr_unget_len >= TWR_UNGET_MAX) {
		return EOF;
	}
	if (twr_unget_len == 0) {
		twr_unget_fp = stream;
	} else if (twr_unget_fp != stream) {
		return EOF;
	}
	twr_unget_buf[twr_unget_len++] = ch;
	return ch;
}

int getc(FILE *stream) {
	if (twr_unget_len > 0 && twr_unget_fp == stream) {
		return twr_unget_buf[--twr_unget_len];
	}
	const int c = io_getc32(stream);
	if (c < 0) {
		return EOF;
	}
	return c > 255 ? 0 : c;
}

int fgetc(FILE *stream) {
	return getc(stream);
}

void __wasm_call_ctors(void);

__attribute__((export_name("run")))
int run(void) {
	__wasm_call_ctors();
	return main();
}

}
`;
