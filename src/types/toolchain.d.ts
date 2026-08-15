/// <reference types="vite/client" />

declare module "browsercc/dist/clang.js" {
	const Clang: (opts?: Record<string, unknown>) => Promise<unknown>;
	export default Clang;
}

declare module "browsercc/dist/lld.js" {
	const LLD: (opts?: Record<string, unknown>) => Promise<unknown>;
	export default LLD;
}
