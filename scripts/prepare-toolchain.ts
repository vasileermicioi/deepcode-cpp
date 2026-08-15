import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";

const root = join(import.meta.dir, "..");
const publicDir = join(root, "public");
const twrRoot = join(root, "node_modules", "twr-wasm");

await mkdir(publicDir, { recursive: true });
await $`tar -cf ${join(publicDir, "twr-sysroot.tar")} -C ${twrRoot} include lib-c`;

console.log(
	"Packed twr-wasm headers and static libraries into public/twr-sysroot.tar",
);
