import { Braces, Play, Square, TerminalSquare } from "lucide-react";
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
import type { CppStandard } from "@/lib/compiler-protocol";
import { DEFAULT_SOURCE, EXAMPLES } from "@/lib/examples";
import { createRuntime, type RuntimeSession } from "@/lib/runtime";
import { cn } from "@/lib/utils";

type EditorStatus = "idle" | "loading" | "compiling" | "running" | "error";

const SOURCE_KEY = "deepcode-cpp-source";
const STD_KEY = "deepcode-cpp-standard";

function formatBytes(bytes: number) {
	if (!bytes) {
		return "";
	}
	const mb = bytes / (1024 * 1024);
	return `${mb.toFixed(1)} MB`;
}

export default function App() {
	const [source, setSource] = useState(
		() => localStorage.getItem(SOURCE_KEY) ?? DEFAULT_SOURCE,
	);
	const [standard, setStandard] = useState<CppStandard>(
		() => (localStorage.getItem(STD_KEY) as CppStandard | null) ?? "c++20",
	);
	const [status, setStatus] = useState<EditorStatus>("loading");
	const [progress, setProgress] = useState("Preparing in-browser Clang...");
	const [compileLog, setCompileLog] = useState("");
	const [stdin, setStdin] = useState(
		() => localStorage.getItem("deepcode-cpp-stdin") ?? "1 2\n",
	);
	const [outputTab, setOutputTab] = useState("program");
	const [exitCode, setExitCode] = useState<number | null>(null);
	const consoleRef = useRef<HTMLDivElement>(null);
	const runtimeRef = useRef<RuntimeSession | null>(null);
	const runToken = useRef(0);

	useEffect(() => {
		localStorage.setItem(SOURCE_KEY, source);
	}, [source]);

	useEffect(() => {
		localStorage.setItem(STD_KEY, standard);
	}, [standard]);

	useEffect(() => {
		localStorage.setItem("deepcode-cpp-stdin", stdin);
	}, [stdin]);

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
			const result = await compiler.compile(source, standard, (event) => {
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
	}, [source, standard, status, stdin]);

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
				<Select
					value={
						EXAMPLES.find((example) => example.source === source)?.id ??
						"custom"
					}
					onValueChange={(id) => {
						const example = EXAMPLES.find((item) => item.id === id);
						if (example) {
							setSource(example.source);
						}
					}}
				>
					<SelectTrigger size="sm" className="w-40">
						<SelectValue placeholder="Examples" />
					</SelectTrigger>
					<SelectContent>
						{EXAMPLES.map((example) => (
							<SelectItem key={example.id} value={example.id}>
								{example.name}
							</SelectItem>
						))}
						<SelectItem value="custom">Custom</SelectItem>
					</SelectContent>
				</Select>
				<Select
					value={standard}
					onValueChange={(value) => setStandard(value as CppStandard)}
				>
					<SelectTrigger size="sm" className="w-28">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="c++17">C++17</SelectItem>
						<SelectItem value="c++20">C++20</SelectItem>
						<SelectItem value="c++23">C++23</SelectItem>
					</SelectContent>
				</Select>
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

			<ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
				<ResizablePanel defaultSize={62} minSize={35}>
					<div className="flex h-full min-h-0 flex-col">
						<div className="flex h-8 items-center justify-between border-b px-3 text-xs text-muted-foreground">
							<span>main.cpp</span>
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
									<span className="w-10 shrink-0 font-medium">stdin</span>
									<textarea
										value={stdin}
										onChange={(event) => setStdin(event.target.value)}
										spellCheck={false}
										rows={2}
										placeholder="Values for cin, one per line or space-separated"
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
