import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const r = (p: string) => resolve(fileURLToPath(new URL(".", import.meta.url)), p);

export default defineConfig({
  root: "example",
  base: "/markdown-typewriter-react/",
  plugins: [react()],
  server: { open: true },
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // Markdown processing
          'markdown-vendor': ['react-markdown'],
        },
      },
    },
    // Increase chunk size warning limit for demo
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      "markdown-typewriter-react": r("src/index.tsx"),
    },
  },
});
