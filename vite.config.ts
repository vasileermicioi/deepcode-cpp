import { readFileSync } from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const isolationHeaders = {
	"Cross-Origin-Opener-Policy": "same-origin",
	"Cross-Origin-Embedder-Policy": "require-corp",
	"Cross-Origin-Resource-Policy": "same-origin",
};

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

export default defineConfig({
	plugins: [stripBrokenVendorSourcemaps(), react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
		},
	},
	assetsInclude: ["**/*.wasm"],
	optimizeDeps: {
		exclude: ["twr-wasm", "browsercc"],
	},
	worker: {
		format: "es",
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
