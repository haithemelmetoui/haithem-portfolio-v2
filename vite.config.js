import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://haithemelmetoui.github.io/haithem-portfolio-v2/
// Override with BASE_PATH=/ when deploying to a custom domain or another host.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/haithem-portfolio-v2/",
  plugins: [react()],
  build: {
    // three.js lives in the lazily loaded CoreScene chunk; it is never on the critical path.
    chunkSizeWarningLimit: 1100,
  },
});
