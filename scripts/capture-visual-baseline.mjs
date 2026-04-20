import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const WIDTH = 1440;
const HEIGHT = 2200;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptDir, "..");
const baselineDir = resolve(rootDir, "tests/visual-baseline");
const baselineFile = resolve(baselineDir, "playground-dark.png");
const manifestFile = resolve(baselineDir, "manifest.json");
const targetFile = resolve(rootDir, "examples/playground.html");
const targetUrl = `file://${targetFile}`;

mkdirSync(baselineDir, { recursive: true });

const chromiumArgs = [
  "--headless",
  "--disable-gpu",
  "--hide-scrollbars",
  `--window-size=${WIDTH},${HEIGHT}`,
  `--screenshot=${baselineFile}`,
  targetUrl,
];

const screenshot = spawnSync("chromium", chromiumArgs, { encoding: "utf8" });

if (screenshot.status !== 0) {
  process.stderr.write(
    "Failed to capture visual baseline with chromium.\n" +
      "If you are running in a restricted sandbox, run this command in a normal shell.\n\n" +
      (screenshot.stderr || screenshot.stdout || "No chromium output available.\n")
  );
  process.exit(screenshot.status ?? 1);
}

const baselineHash = createHash("sha256")
  .update(readFileSync(baselineFile))
  .digest("hex");

const manifest = {
  file: "tests/visual-baseline/playground-dark.png",
  sha256: baselineHash,
  generated_at: new Date().toISOString(),
  source: "examples/playground.html",
  viewport: { width: WIDTH, height: HEIGHT },
};

writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

process.stdout.write(`Baseline updated: ${manifest.file}\n`);
process.stdout.write(`sha256: ${manifest.sha256}\n`);
