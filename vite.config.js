import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";

export default defineConfig({
	plugins: [react(), splitVendorChunkPlugin()],
	server: {
		host: "0.0.0.0",
		port: 5173,
	},
	build: {
		outDir: "dist",
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				passes: 3,
			},
			mangle: true,
		},
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// Vendor chunks strategy
					if (id.includes("node_modules")) {
						if (id.includes("react")) return "react-vendor";
						if (id.includes("supabase")) return "supabase-vendor";
						return "vendor";
					}
				},
			},
		},
	},
});
