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

Use `int main()` as the program entry point. Exceptions and threads are not available (`-fno-exceptions`, twr-wasm libc++).
