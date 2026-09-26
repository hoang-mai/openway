import { defineConfig } from "tsup";
import fs from "node:fs";

const componentDirs = fs
  .readdirSync("src/components", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory() && dirent.name !== "common")
  .map((dirent) => dirent.name);

const entries: Record<string, string> = {
  "locale/index": "src/locale/index.ts",
  "query/index": "src/query/index.ts",
  "hooks/index": "src/hooks/index.ts",
};

for (const dir of componentDirs) {
  const entryFile = `src/components/${dir}/index.ts`;
  if (fs.existsSync(entryFile)) {
    entries[`${dir}/index`] = entryFile;
  }
}

export default defineConfig({
  entry: entries,
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  splitting: true,
  treeshake: true,
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
