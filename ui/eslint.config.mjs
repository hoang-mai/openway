import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "**/dist/**",
    "next-env.d.ts",
    "node_modules/**",
    "**/*.cy.*",
  ]),
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  prettier,
]);

export default eslintConfig;
