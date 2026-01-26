import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
	plugins: [
		solidPlugin(),
		dts({
			include: ["src"],
			exclude: ["src/vite-env.d.ts"],
			entryRoot: "src",
			copyDtsFiles: true,
		}),
	],
	build: {
		lib: {
			entry: {
				"publish/index": resolve(__dirname, "src/publish/index.tsx"),
				"watch/index": resolve(__dirname, "src/watch/index.tsx"),
			},
			formats: ["es"],
		},
		rollupOptions: {
			external: ["@moq/hang", "@moq/lite", "@moq/signals"],
		},
		sourcemap: true,
		target: "esnext",
	},
});
