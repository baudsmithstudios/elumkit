import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_DIR = "packages/core-css/src";
const ENTRY = join(SOURCE_DIR, "index.css");
const BUNDLE = "packages/core-css/dist/elumkit.css";

// Flattens the index.css @import chain into one file for consumers with no CSS
// build step (single-binary embeds, plain server-rendered apps). Fonts are
// inlined as data URLs so the file still stands alone.
export function buildCss() {
  return readFileSync(ENTRY, "utf8")
    .replace(/@import\s+"([^"]+)";/g, (_, importPath) =>
      readFileSync(join(SOURCE_DIR, importPath), "utf8").trimEnd())
    .replace(/url\("\.\/(fonts\/[^"]+\.woff2)"\)/g, (_, fontPath) =>
      `url("data:font/woff2;base64,${readFileSync(join(SOURCE_DIR, fontPath)).toString("base64")}")`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  mkdirSync(dirname(BUNDLE), { recursive: true });
  writeFileSync(BUNDLE, buildCss());
}
