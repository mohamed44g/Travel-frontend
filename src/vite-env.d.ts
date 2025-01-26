import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true,
      host: "localhost",
      protocol: "ws",
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  build: {
    sourcemap: true,
  },
});
