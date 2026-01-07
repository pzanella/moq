import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import nodeResolve from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import solid from "unplugin-solid/rollup";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Plugin to handle ?inline and ?raw imports
function inlineAssets() {
	return {
		name: "inline-assets",
		resolveId(source, importer) {
			if (source.includes("?inline") || source.includes("?raw")) {
				const [path, query] = source.split("?");
				// Resolve relative to importer
				const resolved = importer ? resolve(dirname(importer), path) : resolve(__dirname, path);
				return `${resolved}?${query}`;
			}
			return null;
		},
		load(id) {
			if (id.includes("?inline") || id.includes("?raw")) {
				const realPath = id.split("?")[0];
				const content = readFileSync(realPath, "utf8");
				return `export default ${JSON.stringify(content)};`;
			}
			return null;
		},
	};
}

// Shared plugins for Solid components
const solidPlugins = [
	inlineAssets(),
	solid({ dev: false, hydratable: false }),
	esbuild({
		include: /\.[jt]sx?$/,
		jsx: "preserve",
		tsconfig: "tsconfig.json",
	}),
	nodeResolve({ extensions: [".js", ".ts", ".tsx"] }),
];

// Simple esbuild plugin for non-Solid files
const simplePlugins = [
	inlineAssets(),
	esbuild({
		include: /\.[jt]s$/,
		tsconfig: "tsconfig.json",
	}),
	nodeResolve({ extensions: [".js", ".ts"] }),
];

export default [
	{
		input: "src/index.ts",
		output: { file: "dist/index.js", format: "es" },
		plugins: simplePlugins,
	},
	{
		input: "src/settings.ts",
		output: { file: "dist/settings.js", format: "es" },
		plugins: simplePlugins,
	},
	{
		input: "src/utilities/index.ts",
		output: { file: "dist/utilities/index.js", format: "es" },
		plugins: simplePlugins,
	},
	{
		input: "src/Components/publish/element.tsx",
		output: { file: "dist/Components/publish/element.js", format: "es", sourcemap: true },
		plugins: solidPlugins,
	},
	{
		input: "src/Components/watch/element.tsx",
		output: { file: "dist/Components/watch/element.js", format: "es", sourcemap: true },
		plugins: solidPlugins,
	},
	{
		input: "src/Components/stats/index.ts",
		output: { file: "dist/Components/stats/index.js", format: "es", sourcemap: true },
		plugins: solidPlugins,
	},
];
