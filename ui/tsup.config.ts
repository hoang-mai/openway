import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
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
  ],
  banner: {
    js: '"use client";',
  },
});
