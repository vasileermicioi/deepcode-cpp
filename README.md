# Deepcode C++

Pure frontend C++ editor, compiler, and runtime. Clang and wasm-ld run in the browser, then the resulting module is executed with [twr-wasm](https://twiddlingbits.dev/).

## Stack

Vite, React, TypeScript, Tailwind, shadcn/ui, CodeMirror, twr-wasm, Biome, Bun.

## Run

```sh
bun install
bun dev
```

The first load downloads in-browser Clang/LLD (about 60 MB) and the twr-wasm C/C++ sysroot. After that, `Run` (or ⌘/Ctrl+Enter) compiles `main.cpp` to WebAssembly and executes it entirely in the browser.

Solving any Begin task (all `Run tests` cases pass) marks it solved: solved tasks show an emerald mark in the task dropdown, progress `N/40` plus a bar stays visible, and the set persists in `localStorage` under `deepcode-cpp-solved-v1` across reloads until `Reset code` clears it.

In production, Clang and wasm-ld binaries are fetched from jsDelivr so the deploy stays under Cloudflare Workers' 25 MiB per-file limit. Local `bun dev` still serves them from `node_modules`.

Use `int main()` as the program entry point. Exceptions and threads are not available (`-fno-exceptions`, twr-wasm libc++).
