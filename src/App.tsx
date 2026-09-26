import { Braces, Play, RotateCcw, Square, TerminalSquare } from "lucide-react";
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

function loadSource(taskId: string, fallback: string): string {
	const current = localStorage.getItem(`${SOURCE_KEY_PREFIX}${taskId}`);
	if (current !== null) {
		return current;
	}
	// One-time migration: preserve a v1 solution, but convert it to the new style.
	const legacy = localStorage.getItem(`${LEGACY_SOURCE_KEY_PREFIX}${taskId}`);
	if (legacy !== null) {
		const modern = modernizeSource(legacy);
		localStorage.setItem(`${SOURCE_KEY_PREFIX}${taskId}`, modern);
		return modern;
	}
	return fallback;
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
	const consoleRef = useRef<HTMLDivElement>(null);
	const runtimeRef = useRef<RuntimeSession | null>(null);
	const runToken = useRef(0);

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
			status === "loading"
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
				setOutputTab("build");
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
			setOutputTab("build");
		}
	}, [source, status, stdin]);

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
					<Button
						size="sm"
						title="Compile and execute (⌘/Ctrl + Enter)"
						onClick={run}
						disabled={
							status === "loading" ||
							status === "compiling" ||
							status === "running"
						}
					>
						<Play data-icon="inline-start" />
						Run
					</Button>
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
									Program
								</TabsTrigger>
								<TabsTrigger value="build">Build log</TabsTrigger>
							</TabsList>
							{exitCode !== null ? (
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
								<label className="flex shrink-0 items-center gap-2 border-b px-3 py-1.5 text-[11px] text-muted-foreground">
									<span className="w-10 shrink-0 font-medium">
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
								</label>
								<div
									ref={consoleRef}
									className="twr-console min-h-0 flex-1 overflow-auto px-3 py-2 font-mono text-[13px] leading-6 text-zinc-200 outline-none"
								/>
							</div>
						</TabsContent>
						<TabsContent
							value="build"
							forceMount
							className="min-h-0 overflow-hidden data-[state=inactive]:hidden"
						>
							<pre className="h-full overflow-auto whitespace-pre-wrap px-3 py-2 font-mono text-[12px] leading-5 text-muted-foreground">
								{compileLog || "Build output will appear here."}
							</pre>
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
