import { twrWasmModuleAsync } from "twr-wasm";
import type { BeginTestCase } from "./tasks-begin-tests";
import { TestConsole } from "./test-console";

export type SingleTestResult = {
	index: number;
	stdin: string;
	expected: string;
	actual: string;
	passed: boolean;
	exitCode: number | null;
	error?: string;
};

function tokenize(s: string): string[] {
	const t = s.trim();
	if (!t) {
		return [];
	}
	return t.split(/\s+/).filter((x) => x.length > 0);
}

const NUM_RE = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;

function isNumericToken(t: string): boolean {
	return NUM_RE.test(t);
}

function numbersClose(a: number, b: number): boolean {
	if (Object.is(a, b)) {
		return true;
	}
	if (!Number.isFinite(a) || !Number.isFinite(b)) {
		return a === b;
	}
	const diff = Math.abs(a - b);
	if (diff <= 1e-6) {
		return true;
	}
	const denom = Math.max(1, Math.abs(a), Math.abs(b));
	return diff / denom <= 1e-4;
}

export function compareOutputs(actual: string, expected: string): boolean {
	const aToks = tokenize(actual);
	const eToks = tokenize(expected);
	if (aToks.length !== eToks.length) {
		return false;
	}
	for (let i = 0; i < aToks.length; i++) {
		const a = aToks[i];
		const e = eToks[i];
		if (isNumericToken(a) && isNumericToken(e)) {
			if (!numbersClose(Number.parseFloat(a), Number.parseFloat(e))) {
				return false;
			}
		} else if (a !== e) {
			return false;
		}
	}
	return true;
}

export async function runWasmOnce(
	wasm: ArrayBuffer,
	stdin: string,
	timeoutMs = 8000,
): Promise<{ output: string; exitCode: number }> {
	if (!crossOriginIsolated) {
		throw new Error(
			"This page is not cross-origin isolated, so stdin (cin) cannot run. Use the Vite dev server or serve with COOP/COEP headers.",
		);
	}
	const testConsole = new TestConsole(stdin);
	const mod = new twrWasmModuleAsync({
		io: { stdio: testConsole, stderr: testConsole },
	});
	const blob = new Blob([wasm.slice(0)], { type: "application/wasm" });
	const url = URL.createObjectURL(blob);
	try {
		await mod.loadWasm(url);
		const runPromise = mod.callC(["run"]);
		const timeoutPromise = new Promise<never>((_, reject) => {
			setTimeout(() => reject(new Error("Test timed out")), timeoutMs);
		});
		const result = (await Promise.race([
			runPromise,
			timeoutPromise,
		])) as unknown;
		const exitCode = typeof result === "number" ? result : 0;
		return { output: testConsole.getOutput(), exitCode };
	} finally {
		try {
			mod.myWorker.terminate();
		} catch {
			// ignore
		}
		URL.revokeObjectURL(url);
	}
}

export async function runBeginTests(
	wasm: ArrayBuffer,
	tests: BeginTestCase[],
	timeoutMs = 8000,
	onResult?: (result: SingleTestResult) => void,
): Promise<SingleTestResult[]> {
	const results: SingleTestResult[] = [];
	for (let i = 0; i < tests.length; i++) {
		const t = tests[i];
		try {
			const { output, exitCode } = await runWasmOnce(wasm, t.stdin, timeoutMs);
			const passed = compareOutputs(output, t.expected);
			const r: SingleTestResult = {
				index: i,
				stdin: t.stdin,
				expected: t.expected,
				actual: output,
				passed,
				exitCode,
			};
			results.push(r);
			onResult?.(r);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			const r: SingleTestResult = {
				index: i,
				stdin: t.stdin,
				expected: t.expected,
				actual: "",
				passed: false,
				exitCode: null,
				error: message,
			};
			results.push(r);
			onResult?.(r);
		}
	}
	return results;
}
