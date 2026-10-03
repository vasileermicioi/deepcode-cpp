import {
	Braces,
	FlaskConical,
	LoaderCircle,
	Play,
	RotateCcw,
	Square,
	TerminalSquare,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CodeEditor } from "@/components/code-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { compiler } from "@/lib/compiler-client";
import { createRuntime, type RuntimeSession } from "@/lib/runtime";
import {
	BEGIN_TASKS,
	TASK_LOCALES,
	type TaskLocale,
	UI_TEXT,
} from "@/lib/tasks-begin";
import { BEGIN_TESTS } from "@/lib/tasks-begin-tests";
import { runBeginTests, type SingleTestResult } from "@/lib/test-runner";
import { cn } from "@/lib/utils";

type EditorStatus = "idle" | "loading" | "compiling" | "running" | "error";

const TASK_KEY = "deepcode-cpp-task";
const LOCALE_KEY = "deepcode-cpp-locale";
const STDIN_KEY_PREFIX = "deepcode-cpp-stdin-";
// v2: starter templates switched to `using namespace std;` without fast-io guards.
// Bump the key so stale v1 drafts cached in localStorage don't override new starters.
const SOURCE_KEY_PREFIX = "deepcode-cpp-source-v2-";
const STANDARD = "c++20" as const;

function formatBytes(bytes: number) {
	if (!bytes) {
		return "";
	}
	const mb = bytes / (1024 * 1024);
	return `${mb.toFixed(1)} MB`;
}

function getInitialTaskId() {
	const saved = localStorage.getItem(TASK_KEY);
	if (saved && BEGIN_TASKS.some((t) => t.id === saved)) {
		return saved;
	}
	return BEGIN_TASKS[0].id;
}

function modernizeSource(src: string): string {
	let out = src;
	out = out.replace(
		"#include <iostream>\n#include <cmath>",
		"#include <iostream>\n#include <cmath>\nusing namespace std;",
	);
	if (
		out.includes("#include <iostream>") &&
		!out.includes("using namespace std;")
	) {
		out = out.replace(
			"#include <iostream>",
			"#include <iostream>\nusing namespace std;",
		);
	}
	out = out.replace(
		"int main() {\n    std::ios::sync_with_stdio(false);\n    std::cin.tie(nullptr);\n\n",
		"int main() {\n",
	);
	out = out.replace(/if \(!\(std::cin >> (.*?)\)\) return 0;/g, "cin >> $1;");
	out = out
		.replaceAll("std::cin", "cin")
		.replaceAll("std::cout", "cout")
		.replaceAll("std::sqrt", "sqrt")
		.replaceAll("std::abs", "abs")
		.replaceAll("std::swap", "swap");
	return out;
}

const LEGACY_SOURCE_KEY_PREFIX = "deepcode-cpp-source-";

// Old starters embedded the formula in the TODO comment
// (e.g. `// TODO: Begin3 — compute S = a*b, P = 2*(a+b)`).
// Strip it from cached drafts so returning users don't keep seeing the solution.
// Old starters also printed multiple values newline-separated;
// normalize to the new single-line convention (`<< " " <<`).
function stripSolutionHints(src: string): string {
	return src
		.replace(/\/\/ TODO: Begin[^\n]*/g, "// TODO: write your solution here")
		.replace(/<<\s*"\\n"\s*<</g, '<< " " <<');
}

function loadSource(taskId: string, fallback: string): string {
	const key = `${SOURCE_KEY_PREFIX}${taskId}`;
	const current = localStorage.getItem(key);
	if (current !== null) {
		const clean = stripSolutionHints(current);
		if (clean !== current) {
			localStorage.setItem(key, clean);
		}
		return clean;
	}
	// One-time migration: preserve a v1 solution, but convert it to the new style.
	const legacy = localStorage.getItem(`${LEGACY_SOURCE_KEY_PREFIX}${taskId}`);
	if (legacy !== null) {
		const modern = stripSolutionHints(modernizeSource(legacy));
		localStorage.setItem(`${SOURCE_KEY_PREFIX}${taskId}`, modern);
		return modern;
	}
	return stripSolutionHints(fallback);
}

function getInitialLocale(): TaskLocale {
	const saved = localStorage.getItem(LOCALE_KEY);
	if (saved === "ru" || saved === "ro" || saved === "en") {
		return saved;
	}
	return "en";
}

export default function App() {
	const [taskId, setTaskId] = useState(getInitialTaskId);
	const [locale, setLocale] = useState<TaskLocale>(getInitialLocale);
	const task = useMemo(
		() => BEGIN_TASKS.find((t) => t.id === taskId) ?? BEGIN_TASKS[0],
		[taskId],
	);
	const ui = UI_TEXT[locale];

	const [source, setSource] = useState(() => loadSource(task.id, task.starter));
	const [status, setStatus] = useState<EditorStatus>("loading");
	const [progress, setProgress] = useState("Preparing in-browser Clang...");
	const [compileLog, setCompileLog] = useState("");
	const [stdin, setStdin] = useState(
		() => localStorage.getItem(`${STDIN_KEY_PREFIX}${task.id}`) ?? task.stdin,
	);
	const [outputTab, setOutputTab] = useState("program");
	const [exitCode, setExitCode] = useState<number | null>(null);
	const [testResults, setTestResults] = useState<SingleTestResult[] | null>(
		null,
	);
	const [testError, setTestError] = useState("");
	const [isTesting, setIsTesting] = useState(false);
	const [runningIndex, setRunningIndex] = useState<number | null>(null);
	const consoleRef = useRef<HTMLDivElement>(null);
	const runtimeRef = useRef<RuntimeSession | null>(null);
	const runToken = useRef(0);
	const testRunToken = useRef(0);

	// Persist task / locale selection
	useEffect(() => {
		localStorage.setItem(TASK_KEY, taskId);
	}, [taskId]);

	useEffect(() => {
		localStorage.setItem(LOCALE_KEY, locale);
	}, [locale]);

	// Persist per-task source / stdin
	useEffect(() => {
		localStorage.setItem(`${SOURCE_KEY_PREFIX}${task.id}`, source);
	}, [source, task.id]);

	useEffect(() => {
		localStorage.setItem(`${STDIN_KEY_PREFIX}${task.id}`, stdin);
	}, [stdin, task.id]);

	const selectTask = useCallback((id: string) => {
		const next = BEGIN_TASKS.find((t) => t.id === id);
		if (!next) {
			return;
		}
		setTaskId(next.id);
		setSource(loadSource(next.id, next.starter));
		setStdin(
			localStorage.getItem(`${STDIN_KEY_PREFIX}${next.id}`) ?? next.stdin,
		);
		setExitCode(null);
		setCompileLog("");
		setTestResults(null);
		setTestError("");
		setRunningIndex(null);
	}, []);

	const resetCode = useCallback(() => {
		setSource(task.starter);
		setStdin(task.stdin);
	}, [task]);

	useEffect(() => {
		if (!consoleRef.current) {
			return;
		}
		try {
			runtimeRef.current = createRuntime(consoleRef.current);
		} catch (error) {
			setStatus("error");
			setProgress(error instanceof Error ? error.message : String(error));
			return;
		}
		let cancelled = false;
		compiler
			.preload((event) => {
				const suffix =
					event.loaded && event.total
						? ` ${formatBytes(event.loaded)} / ${formatBytes(event.total)}`
						: "";
				setProgress(`${event.message}${suffix}`);
			})
			.then(() => {
				if (cancelled) {
					return;
				}
				setStatus("idle");
				setProgress("Clang + twr-wasm ready");
			})
			.catch((error: unknown) => {
				if (cancelled) {
					return;
				}
				setStatus("error");
				setProgress(error instanceof Error ? error.message : String(error));
			});
		return () => {
			cancelled = true;
			runtimeRef.current?.clear();
			runtimeRef.current = null;
		};
	}, []);

	const statusLabel = useMemo(() => {
		switch (status) {
			case "loading":
				return "Loading toolchain";
			case "compiling":
				return "Compiling";
			case "running":
				return "Running";
			case "error":
				return "Error";
			default:
				return "Ready";
		}
	}, [status]);

	const run = useCallback(async () => {
		if (
			status === "compiling" ||
			status === "running" ||
			status === "loading" ||
			isTesting
		) {
			return;
		}
		const token = ++runToken.current;
		setExitCode(null);
		setCompileLog("");
		setOutputTab("program");
		setStatus("compiling");
		setProgress("Compiling...");
		runtimeRef.current?.clear();

		try {
			const result = await compiler.compile(source, STANDARD, (event) => {
				const suffix =
					event.loaded && event.total
						? ` ${formatBytes(event.loaded)} / ${formatBytes(event.total)}`
						: "";
				setProgress(`${event.message}${suffix}`);
			});
			if (token !== runToken.current) {
				return;
			}
			setCompileLog(result.log);
			if (!result.ok) {
				setStatus("error");
				setProgress("Compilation failed");
				setOutputTab("program");
				return;
			}
			if (!runtimeRef.current) {
				throw new Error("Runtime console is not ready");
			}
			setStatus("running");
			setProgress("Executing with twr-wasm...");
			const code = await runtimeRef.current.run(result.wasm, stdin);
			if (token !== runToken.current) {
				return;
			}
			setExitCode(code);
			setStatus("idle");
			setProgress(`Finished with exit code ${code}`);
		} catch (error) {
			if (token !== runToken.current) {
				return;
			}
			const message = error instanceof Error ? error.message : String(error);
			setStatus("error");
			setProgress(message);
			setCompileLog(message);
			setOutputTab("program");
		}
	}, [source, status, stdin, isTesting]);

	const runTests = useCallback(async () => {
		if (
			status === "compiling" ||
			status === "running" ||
			status === "loading" ||
			isTesting
		) {
			return;
		}
		const token = ++testRunToken.current;
		setTestResults([]);
		setTestError("");
		setRunningIndex(null);
		setOutputTab("tests");
		setIsTesting(true);
		setProgress("Compiling for tests...");

		try {
			const result = await compiler.compile(source, STANDARD, (event) => {
				const suffix =
					event.loaded && event.total
						? ` ${formatBytes(event.loaded)} / ${formatBytes(event.total)}`
						: "";
				setProgress(`${event.message}${suffix}`);
			});
			if (token !== testRunToken.current) {
				return;
			}
			setCompileLog(result.log);
			if (!result.ok) {
				setTestError(result.log || "Compilation failed");
				setTestResults(null);
				setRunningIndex(null);
				setProgress("Compilation failed");
				return;
			}
			const cases = BEGIN_TESTS[task.id] ?? [];
			const acc: SingleTestResult[] = [];
			setRunningIndex(0);
			setProgress(`Running test 1/${cases.length}...`);
			const results = await runBeginTests(result.wasm, cases, 8000, (r) => {
				if (token !== testRunToken.current) {
					return;
				}
				acc.push(r);
				setTestResults([...acc]);
				setRunningIndex(acc.length < cases.length ? acc.length : null);
				setProgress(
					acc.length < cases.length
						? `Running test ${acc.length + 1}/${cases.length}...`
						: `Finishing...`,
				);
			});
			if (token !== testRunToken.current) {
				return;
			}
			setTestResults(results);
			setRunningIndex(null);
			const passed = results.filter((r) => r.passed).length;
			setProgress(
				passed === results.length
					? `All ${results.length} tests passed`
					: `${passed}/${results.length} tests passed`,
			);
		} catch (error) {
			if (token !== testRunToken.current) {
				return;
			}
			const message = error instanceof Error ? error.message : String(error);
			setTestError(message);
			setRunningIndex(null);
			setProgress(message);
		} finally {
			if (token === testRunToken.current) {
				setIsTesting(false);
				setRunningIndex(null);
			}
		}
	}, [source, status, isTesting, task.id]);

	const passedCount = useMemo(
		() => testResults?.filter((r) => r.passed).length ?? null,
		[testResults],
	);

	const testCases = useMemo(() => BEGIN_TESTS[task.id] ?? [], [task.id]);

	const testResultByIndex = useMemo(() => {
		const map = new Map<number, SingleTestResult>();
		for (const r of testResults ?? []) {
			map.set(r.index, r);
		}
		return map;
	}, [testResults]);

	return (
		<div className="flex h-svh flex-col bg-background">
			<header className="flex h-12 shrink-0 items-center gap-3 border-b px-3">
				<div className="flex items-center gap-2">
					<Braces className="size-4 text-primary" />
					<div className="leading-tight">
						<p className="text-sm font-medium">Deepcode C++</p>
						<p className="text-[11px] text-muted-foreground">
							Browser Clang + twr-wasm
						</p>
					</div>
				</div>
				<Separator orientation="vertical" className="h-6" />
				<Select value={taskId} onValueChange={selectTask}>
					<SelectTrigger size="sm" className="w-32">
						<SelectValue placeholder={ui.task} />
					</SelectTrigger>
					<SelectContent className="max-h-80">
						{BEGIN_TASKS.map((t) => (
							<SelectItem key={t.id} value={t.id}>
								{t.id}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select
					value={locale}
					onValueChange={(value) => setLocale(value as TaskLocale)}
				>
					<SelectTrigger size="sm" className="w-28">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{TASK_LOCALES.map((l) => (
							<SelectItem key={l.id} value={l.id}>
								{l.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Badge variant="secondary">{ui.standard}</Badge>
				<Button
					size="sm"
					variant="ghost"
					title={ui.reset}
					onClick={resetCode}
					className="hidden sm:inline-flex"
				>
					<RotateCcw data-icon="inline-start" />
					{ui.reset}
				</Button>
				<div className="ml-auto flex items-center gap-2">
					<Badge
						variant={
							status === "error"
								? "destructive"
								: status === "idle"
									? "secondary"
									: "outline"
						}
					>
						{statusLabel}
					</Badge>
				</div>
			</header>

			<div className="flex shrink-0 items-start gap-3 border-b bg-muted/30 px-3 py-2 text-[12px] leading-5">
				<Badge variant="outline" className="mt-0.5 shrink-0">
					{task.id}
				</Badge>
				<p className="text-foreground">{task.text[locale]}</p>
			</div>

			<ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
				<ResizablePanel defaultSize={62} minSize={35}>
					<div className="flex h-full min-h-0 flex-col">
						<div className="flex h-8 items-center justify-between border-b px-3 text-xs text-muted-foreground">
							<span>main.cpp — {task.id} (C++20)</span>
							<span>⌘/Ctrl + Enter to run</span>
						</div>
						<div className="min-h-0 flex-1">
							<CodeEditor value={source} onChange={setSource} onRun={run} />
						</div>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={38} minSize={24}>
					<Tabs
						value={outputTab}
						onValueChange={setOutputTab}
						className="h-full gap-0"
					>
						<div className="flex h-8 items-center justify-between border-b px-2">
							<TabsList variant="line" className="h-8">
								<TabsTrigger value="program">
									<TerminalSquare className="size-3.5" />
									{ui.program}
								</TabsTrigger>
								<TabsTrigger value="tests">
									<FlaskConical className="size-3.5" />
									{ui.tests}
									{passedCount !== null &&
									testResults &&
									testResults.length > 0 ? (
										<span className="font-mono text-[11px] text-muted-foreground">
											{passedCount}/{testCases.length}
										</span>
									) : null}
								</TabsTrigger>
							</TabsList>
							{exitCode !== null && outputTab === "program" ? (
								<span className="px-2 font-mono text-[11px] text-muted-foreground">
									exit {exitCode}
								</span>
							) : null}
						</div>
						<TabsContent
							value="program"
							forceMount
							className="min-h-0 overflow-hidden data-[state=inactive]:hidden"
						>
							<div className="flex h-full min-h-0 flex-col">
								<div className="flex shrink-0 items-center gap-2 border-b px-3 py-1.5">
									<span className="w-10 shrink-0 text-[11px] font-medium text-muted-foreground">
										{ui.stdinLabel}
									</span>
									<textarea
										value={stdin}
										onChange={(event) => setStdin(event.target.value)}
										spellCheck={false}
										rows={2}
										placeholder={ui.stdinPlaceholder}
										className="min-h-8 flex-1 resize-none rounded-md border bg-background px-2 py-1 font-mono text-[12px] text-foreground outline-none focus-visible:border-ring"
									/>
									<Button
										size="sm"
										title="Compile and execute (⌘/Ctrl + Enter)"
										onClick={run}
										disabled={
											status === "loading" ||
											status === "compiling" ||
											status === "running" ||
											isTesting
										}
									>
										{status === "compiling" || status === "running" ? (
											<LoaderCircle
												data-icon="inline-start"
												className="animate-spin"
											/>
										) : (
											<Play data-icon="inline-start" />
										)}
										{status === "compiling"
											? ui.compiling
											: status === "running"
												? ui.running
												: ui.run}
									</Button>
								</div>
								{status === "error" && compileLog ? (
									<div className="shrink-0 border-b border-destructive/30 bg-destructive/10 px-3 py-2">
										<p className="text-[11px] font-medium text-destructive">
											{ui.compilationFailed}
										</p>
										<pre className="mt-1 max-h-32 overflow-auto whitespace-pre-wrap font-mono text-[12px] leading-5 text-destructive">
											{compileLog}
										</pre>
									</div>
								) : compileLog ? (
									<details className="shrink-0 border-b px-3 py-1.5 text-[11px] text-muted-foreground">
										<summary className="cursor-pointer font-mono hover:text-foreground">
											{ui.buildWarnings}
										</summary>
										<pre className="mt-1 max-h-32 overflow-auto whitespace-pre-wrap font-mono text-[12px] leading-5">
											{compileLog}
										</pre>
									</details>
								) : null}
								<div
									ref={consoleRef}
									className="twr-console min-h-0 flex-1 overflow-auto px-3 py-2 font-mono text-[13px] leading-6 text-zinc-200 outline-none"
								/>
							</div>
						</TabsContent>
						<TabsContent
							value="tests"
							forceMount
							className="min-h-0 overflow-hidden data-[state=inactive]:hidden"
						>
							<div className="flex h-full min-h-0 flex-col">
								<div className="flex shrink-0 items-center gap-2 border-b px-3 py-1.5">
									<Button
										size="sm"
										variant="secondary"
										onClick={runTests}
										disabled={
											status === "loading" ||
											status === "compiling" ||
											status === "running" ||
											isTesting
										}
									>
										<FlaskConical data-icon="inline-start" />
										{isTesting ? ui.testing : ui.runTests}
									</Button>
									{testResults && testResults.length > 0 ? (
										<span className="font-mono text-[11px] text-muted-foreground">
											{passedCount}/{testCases.length} passed
										</span>
									) : (
										<span className="font-mono text-[11px] text-muted-foreground">
											{testCases.length} cases
										</span>
									)}
								</div>
								<div className="min-h-0 flex-1 overflow-auto px-3 py-2">
									{testError ? (
										<pre className="mb-2 whitespace-pre-wrap font-mono text-[12px] leading-5 text-destructive">
											{testError}
										</pre>
									) : null}
									<div className="space-y-2">
										{testCases.map((c, idx) => {
											const r = testResultByIndex.get(idx);
											const isRunning = isTesting && runningIndex === idx && !r;
											return (
												<div
													key={`${task.id}-${c.stdin}`}
													className={cn(
														"rounded-md border px-2 py-1.5 text-[12px] transition-colors",
														!r && !isRunning && "border-dashed opacity-70",
														isRunning && "border-primary",
													)}
												>
													<div className="flex items-center gap-2">
														{r ? (
															<Badge
																variant={r.passed ? "secondary" : "destructive"}
																className={cn(r.passed && "text-emerald-600")}
															>
																{r.passed ? "PASS" : "FAIL"}
															</Badge>
														) : isRunning ? (
															<Badge variant="outline">
																<LoaderCircle className="size-3 animate-spin" />
																RUN
															</Badge>
														) : (
															<Badge
																variant="outline"
																className="text-muted-foreground"
															>
																WAIT
															</Badge>
														)}
														<span className="font-mono text-muted-foreground">
															#{idx + 1}
														</span>
														<span className="truncate font-mono text-muted-foreground">
															stdin: {c.stdin.trim().replace(/\s+/g, " ")}
														</span>
													</div>
													<div className="mt-1 grid grid-cols-2 gap-2 font-mono leading-5">
														<div className="whitespace-pre-wrap break-words">
															<span className="text-muted-foreground">
																{ui.expected}:{" "}
															</span>
															<span className="text-foreground">
																{c.expected}
															</span>
														</div>
														<div className="whitespace-pre-wrap break-words">
															<span className="text-muted-foreground">
																{ui.actual}:{" "}
															</span>
															{r ? (
																<span
																	className={cn(
																		r.passed
																			? "text-foreground"
																			: "text-destructive",
																	)}
																>
																	{r.actual || (r.error ?? "—")}
																</span>
															) : isRunning ? (
																<span className="animate-pulse text-muted-foreground">
																	…
																</span>
															) : (
																<span className="text-muted-foreground">—</span>
															)}
														</div>
													</div>
												</div>
											);
										})}
									</div>
									{!isTesting && !testResults && !testError ? (
										<p className="mt-2 font-mono text-[12px] leading-5 text-muted-foreground">
											{ui.testsPlaceholder}
										</p>
									) : null}
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</ResizablePanel>
			</ResizablePanelGroup>

			<footer className="flex h-8 shrink-0 items-center gap-2 border-t px-3 text-[11px] text-muted-foreground">
				<Square
					className={cn(
						"size-2.5",
						status === "error"
							? "text-destructive"
							: status === "idle"
								? "text-emerald-500"
								: "animate-pulse text-amber-400",
					)}
				/>
				<span className="truncate">{progress}</span>
			</footer>
		</div>
	);
}
