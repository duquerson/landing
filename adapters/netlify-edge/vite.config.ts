import { resolve } from "node:path";
import { netlifyEdgeAdapter } from "@builder.io/qwik-city/adapters/netlify-edge/vite";
import { defineConfig, mergeConfig } from "vite";
import { baseConfig } from "../../vite.config";

export default defineConfig(
	mergeConfig(baseConfig, {
		plugins: [netlifyEdgeAdapter()],
		build: {
			ssr: true,
			outDir: resolve(
				process.cwd(),
				".netlify/edge-functions/entry.netlify-edge",
			),
			rollupOptions: {
				input: [
					resolve(process.cwd(), "src/entry.netlify-edge.tsx"),
					resolve(process.cwd(), "src/entry.ssr.tsx"),
					"@qwik-city-plan",
				],
			},
		},
	}),
);
