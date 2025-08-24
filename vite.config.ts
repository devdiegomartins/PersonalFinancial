import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "src"),
			"~config": path.resolve(__dirname, "src/config"),
			"~shared": path.resolve(__dirname, "src/shared"),
			"~ui": path.resolve(__dirname, "src/ui"),
			"~hooks": path.resolve(__dirname, "src/shared/hooks"),
			"~providers": path.resolve(__dirname, "src/shared/providers"),
			"~services": path.resolve(__dirname, "src/services"),
		},
	},
	plugins: [react(), tailwindcss()],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent Vite from obscuring rust errors
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		hmr: host
			? {
					protocol: "ws",
					host,
					port: 1421,
				}
			: undefined,
		watch: {
			ignored: ["**/src-tauri/**"],
			include: ["./public/**"],
		},
	},
}));
