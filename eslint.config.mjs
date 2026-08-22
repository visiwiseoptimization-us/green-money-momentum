import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The Chrome extension is a separate, plain-JS (non-module, no bundler)
    // project living alongside the Next.js app — its files are loaded via
    // <script>/importScripts as globals, which trips this config's
    // no-unused-vars rule. Lint it separately if needed.
    "extension/**",
  ]),
]);

export default eslintConfig;
