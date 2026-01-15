import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
	plugins: [solidPlugin()],
	build: {
		lib: {
			entry: {
				publish: resolve(__dirname, "src/publish/index.tsx"),
				watch: resolve(__dirname, "src/watch/index.tsx"),
				stats: resolve(__dirname, "src/shared/components/stats/index.tsx"),
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
