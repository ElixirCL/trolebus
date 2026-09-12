import { defineConfig } from "vite";
import gleam from "vite-gleam";

export default defineConfig({
  plugins: [gleam()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    target: "es2020",
    lib: {
      entry: "entrypoint.js",
      formats: ["cjs"],
    },
    outDir: "dist",
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: "script.gs",
      },
    },
  },
});
