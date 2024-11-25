import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	root: "./", // Path where index.html is located
	plugins: [react()],
	base: "/",
	build: {
		chunkSizeWarningLimit: 3000,
	},
});
