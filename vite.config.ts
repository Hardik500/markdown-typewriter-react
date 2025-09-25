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
  },
  resolve: {
    alias: {
      "markdown-typewriter-react": r("src/index.tsx"),
    },
  },
});
