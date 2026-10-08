import { defineConfig } from "tsup";
import fs from "node:fs";

const libDirs = fs
  .readdirSync("src/lib", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory() && dirent.name !== "common")
  .map((dirent) => dirent.name);

const entries: Record<string, string> = {
  "locale/index": "src/locale/index.ts",
  "query/index": "src/query/index.ts",
  "hooks/index": "src/hooks/index.ts",
  "theme/index": "src/theme/index.ts",
};

for (const dir of libDirs) {
  const entryFile = `src/lib/${dir}/index.ts`;
  if (fs.existsSync(entryFile)) {
    entries[`lib/${dir}/index`] = entryFile;
    entries[`${dir}/index`] = entryFile;
  }
}

if (fs.existsSync("src/components")) {
  const compDirs = fs
    .readdirSync("src/components", { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const dir of compDirs) {
    const entryFile = `src/components/${dir}/index.ts`;
    if (fs.existsSync(entryFile)) {
      entries[`components/${dir}/index`] = entryFile;
    }
  }
}

if (fs.existsSync("src/types/otp.ts")) {
  entries["types/otp"] = "src/types/otp.ts";
}

export default defineConfig({
  entry: entries,
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  splitting: true,
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
