import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    themes: "src/themes/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  banner: {
    js: '"use client";',
  },
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
