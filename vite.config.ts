import { createReadStream, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const isolationHeaders = {
	"Cross-Origin-Opener-Policy": "same-origin",
	"Cross-Origin-Embedder-Policy": "require-corp",
	"Cross-Origin-Resource-Policy": "same-origin",
};

const CLOUDFLARE_ASSET_LIMIT = 25 * 1024 * 1024;

function stripBrokenVendorSourcemaps(): Plugin {
	return {
		name: "strip-broken-vendor-sourcemaps",
		enforce: "pre",
		load(id) {
			const file = id.split("?")[0];
			if (
				!file.includes(`${path.sep}twr-wasm${path.sep}`) ||
				!file.endsWith(".js")
			) {
				return;
			}
			const code = readFileSync(file, "utf8");
			if (!code.includes("sourceMappingURL")) {
				return;
			}
			return {
				code: code.replace(/\n\/\/[#@] sourceMappingURL=.*$/gm, ""),
				map: null,
			};
		},
	};
}

function stubBrowserccWasmUrls(): Plugin {
	return {
		name: "stub-browsercc-wasm-urls",
		enforce: "pre",
		transform(code, id) {
			if (
				!id.includes(`${path.sep}browsercc${path.sep}dist${path.sep}`) ||
				!(id.endsWith("clang.js") || id.endsWith("lld.js"))
			) {
				return;
			}
			const next = code.replace(
				/new URL\("(clang|lld)\.wasm",\s*import\.meta\.url\)\.href/g,
				'"$1.wasm"',
			);
			if (next === code) {
				return;
			}
			return { code: next, map: null };
		},
	};
}

function serveLocalToolchainWasm(): Plugin {
	const toolchainDir = path.resolve(
		import.meta.dirname,
		"node_modules/browsercc/dist",
	);
	return {
		name: "serve-local-toolchain-wasm",
		configureServer(server) {
			server.middlewares.use("/toolchain", (req, res, next) => {
				const file = req.url?.replace(/^\//, "").split("?")[0] ?? "";
				if (file !== "clang.wasm" && file !== "lld.wasm") {
					next();
					return;
				}
				res.setHeader("Content-Type", "application/wasm");
				res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
				createReadStream(path.join(toolchainDir, file)).pipe(res);
			});
		},
	};
}

function rejectOversizedAssets(): Plugin {
	return {
		name: "reject-oversized-assets",
		closeBundle() {
			const dist = path.resolve(import.meta.dirname, "dist");
			const oversized: string[] = [];
			const walk = (dir: string) => {
				for (const entry of readdirSync(dir, { withFileTypes: true })) {
					const full = path.join(dir, entry.name);
					if (entry.isDirectory()) {
						walk(full);
						continue;
					}
					if (statSync(full).size > CLOUDFLARE_ASSET_LIMIT) {
						oversized.push(full);
					}
				}
			};
			walk(dist);
			if (oversized.length) {
				throw new Error(
					`These files exceed Cloudflare Workers' 25 MiB asset limit:\n${oversized.join("\n")}`,
				);
			}
		},
	};
}

export default defineConfig({
	plugins: [
		stubBrowserccWasmUrls(),
		serveLocalToolchainWasm(),
		stripBrokenVendorSourcemaps(),
		react(),
		tailwindcss(),
		rejectOversizedAssets(),
	],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
		},
	},
	optimizeDeps: {
		exclude: ["twr-wasm", "browsercc"],
	},
	worker: {
		format: "es",
		plugins: () => [stubBrowserccWasmUrls()],
	},
	server: {
		headers: isolationHeaders,
		fs: {
			allow: [".."],
		},
	},
	preview: {
		headers: isolationHeaders,
	},
});
