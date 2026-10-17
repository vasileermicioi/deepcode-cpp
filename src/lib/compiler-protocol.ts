export type CppStandard = "c++20";

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
#include <math.h>

int main();

extern "C" {

// twr-wasm libc only provides a subset of libm (see include/math.h):
// acos asin atan atan2 ceil cos exp fabs floor fmod log pow sin sqrt tan trunc.
// Clang -O2 rewrites pow(2,x) -> exp2(x), log(x)/log(2) -> log2(x), etc.,
// and <cmath> float overloads need sinf/powf/..., so provide them here in
// terms of the available double functions. --allow-multiple-definition
// makes these harmless if a future sysroot provides them natively.
double exp2(double x) { return exp(x * 0.6931471805599453); }
float exp2f(float x) { return (float)exp((double)x * 0.6931471805599453); }
double expm1(double x) { return exp(x) - 1.0; }
float expm1f(float x) { return (float)(exp((double)x) - 1.0); }
double log2(double x) { return log(x) * 1.4426950408889634; }
float log2f(float x) { return (float)(log((double)x) * 1.4426950408889634); }
double log10(double x) { return log(x) * 0.4342944819032518; }
float log10f(float x) { return (float)(log((double)x) * 0.4342944819032518); }
double log1p(double x) { return log(1.0 + x); }
float log1pf(float x) { return (float)log(1.0 + (double)x); }
float powf(float b, float e) { return (float)pow((double)b, (double)e); }
double hypot(double x, double y) { return sqrt(x * x + y * y); }
float hypotf(float x, float y) {
	return (float)sqrt((double)x * (double)x + (double)y * (double)y);
}
double cbrt(double x) {
	if (x == 0.0) return 0.0;
	if (x < 0.0) return -pow(-x, 1.0 / 3.0);
	return pow(x, 1.0 / 3.0);
}
float cbrtf(float x) { return (float)cbrt((double)x); }
float sinf(float x) { return (float)sin((double)x); }
float cosf(float x) { return (float)cos((double)x); }
float tanf(float x) { return (float)tan((double)x); }
float asinf(float x) { return (float)asin((double)x); }
float acosf(float x) { return (float)acos((double)x); }
float atanf(float x) { return (float)atan((double)x); }
float atan2f(float y, float x) { return (float)atan2((double)y, (double)x); }
float sqrtf(float x) { return (float)sqrt((double)x); }
float fabsf(float x) { return (float)fabs((double)x); }
float floorf(float x) { return (float)floor((double)x); }
float ceilf(float x) { return (float)ceil((double)x); }
float truncf(float x) { return (float)trunc((double)x); }
float fmodf(float x, float y) { return (float)fmod((double)x, (double)y); }
float expf(float x) { return (float)exp((double)x); }
float logf(float x) { return (float)log((double)x); }


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
