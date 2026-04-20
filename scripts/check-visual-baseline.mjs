import { createHash } from "node:crypto";
import { readFileSync, existsSync, unlinkSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const WIDTH = 1440;
const HEIGHT = 2200;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptDir, "..");
const baselineFile = resolve(rootDir, "tests/visual-baseline/playground-dark.png");
const manifestFile = resolve(rootDir, "tests/visual-baseline/manifest.json");
const targetFile = resolve(rootDir, "examples/playground.html");
const tempFile = resolve(rootDir, "tests/visual-baseline/.playground-current.png");
const targetUrl = `file://${targetFile}`;

if (!existsSync(manifestFile) || !existsSync(baselineFile)) {
  process.stderr.write(
    "Visual baseline artifacts are missing.\nRun: node scripts/capture-visual-baseline.mjs\n"
  );
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestFile, "utf8"));
const strictMode = process.env.TUI_VISUAL_STRICT === "1";

const versionProbe = spawnSync("chromium", ["--version"], { encoding: "utf8" });

if (versionProbe.status !== 0) {
  process.stderr.write(
    "Failed to read chromium version.\n" +
      (versionProbe.stderr || versionProbe.stdout || "No chromium output available.\n")
  );
  process.exit(versionProbe.status ?? 1);
}

const chromiumVersion = (versionProbe.stdout || versionProbe.stderr).trim();
const environmentMatches =
  manifest.chromium_version === chromiumVersion && manifest.platform === process.platform;

if (!environmentMatches) {
  const details =
    `Manifest chromium: ${manifest.chromium_version ?? "missing"}\n` +
    `Current chromium: ${chromiumVersion}\n` +
    `Manifest platform: ${manifest.platform ?? "missing"}\n` +
    `Current platform: ${process.platform}\n`;

  if (strictMode) {
    process.stderr.write(
      "Visual baseline render environment differs from capture metadata.\n" +
        "Strict mode is enabled (TUI_VISUAL_STRICT=1), so the check is failing.\n" +
        "Run: node scripts/capture-visual-baseline.mjs in this environment to refresh.\n\n" +
        details
    );
    process.exit(1);
  }

  process.stdout.write(
    "Visual baseline render environment differs from capture metadata.\n" +
      "Skipping strict hash comparison. Set TUI_VISUAL_STRICT=1 to fail on mismatch.\n\n" +
      details
  );
  process.exit(0);
}

const screenshot = spawnSync(
  "chromium",
  [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    `--window-size=${WIDTH},${HEIGHT}`,
    `--screenshot=${tempFile}`,
    targetUrl,
  ],
  { encoding: "utf8" }
);

if (screenshot.status !== 0) {
  process.stderr.write(
    "Failed to render current playground for baseline check.\n" +
      "If you are running in a restricted sandbox, run this command in a normal shell.\n\n" +
      (screenshot.stderr || screenshot.stdout || "No chromium output available.\n")
  );
  process.exit(screenshot.status ?? 1);
}

const baselineHash = createHash("sha256")
  .update(readFileSync(baselineFile))
  .digest("hex");
const currentHash = createHash("sha256")
  .update(readFileSync(tempFile))
  .digest("hex");

unlinkSync(tempFile);

if (baselineHash !== manifest.sha256) {
  process.stderr.write(
    "Baseline image hash does not match manifest.\nRun: node scripts/capture-visual-baseline.mjs\n"
  );
  process.exit(1);
}

if (currentHash !== baselineHash) {
  process.stderr.write(
    "Visual baseline mismatch detected.\n" +
      "Run: node scripts/capture-visual-baseline.mjs to update the baseline if changes are intentional.\n"
  );
  process.exit(1);
}

process.stdout.write("Visual baseline check passed.\n");
