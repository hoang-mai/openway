import { defineConfig } from "tsup";
import fs from "node:fs";

export default defineConfig({
  entry: ["src/index.ts", "src/query.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  target: "es2022",
  external: [
    "react",
    "react-dom",
    "next",
    "next/image",
    "next/link",
    "next/navigation",
    "@tanstack/react-query",
  ],
  banner: {
    js: '"use client";',
  },
  onSuccess: async () => {
    fs.copyFileSync("src/styles.css", "dist/styles.css");
  },
});
