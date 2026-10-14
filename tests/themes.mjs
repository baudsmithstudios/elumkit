import { readFileSync } from "node:fs";

export const TOKENS_CSS = readFileSync("packages/core-css/src/tokens.css", "utf8");
export const THEMES = new Set([...TOKENS_CSS.matchAll(/\[data-theme="([\w-]+)"\]/g)].map((match) => match[1]));
