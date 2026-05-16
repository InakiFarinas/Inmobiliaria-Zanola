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
		sourcemap: false,
		// Aggressive code splitting
		rollupOptions: {
			output: {
				manualChunks: {
					"react-vendor": ["react", "react-dom", "react-router-dom"],
					"supabase-vendor": ["@supabase/supabase-js"],
					"ui-components": [
						"./src/components/ui/Button.jsx",
						"./src/components/ui/Card.jsx",
						"./src/components/ui/FormField.jsx",
					],
				},
				// Optimize chunk file names
				chunkFileNames: "assets/[name]-[hash].js",
				entryFileNames: "assets/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash][extname]",
			},
		},
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				passes: 3,
				arguments: true,
				dead_code: true,
				pure_funcs: ["console.log", "console.info"],
			},
			mangle: true,
			output: {
				comments: false,
			},
		},
		// Smaller chunk size threshold
		chunkSizeWarningLimit: 500,
		// CSS minification
		cssCodeSplit: true,
		cssMinify: "esbuild",
		// Report compressed sizes
		reportCompressedSize: true,
	},
});
