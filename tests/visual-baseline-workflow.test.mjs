import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { test } from "node:test";

const README = readFileSync("README.md", "utf8");
const CAPTURE_SCRIPT = "scripts/capture-visual-baseline.mjs";
const CHECK_SCRIPT = "scripts/check-visual-baseline.mjs";
const BASELINE_MANIFEST = "tests/visual-baseline/manifest.json";
const BASELINE_IMAGE = "tests/visual-baseline/playground-dark.png";
const CHECK_SCRIPT_TEXT = readFileSync(CHECK_SCRIPT, "utf8");

test("visual baseline scripts exist", () => {
  assert.equal(existsSync(CAPTURE_SCRIPT), true, "missing capture script");
  assert.equal(existsSync(CHECK_SCRIPT), true, "missing check script");
});

test("visual baseline artifact and manifest exist", () => {
  assert.equal(existsSync(BASELINE_MANIFEST), true, "missing baseline manifest");
  assert.equal(existsSync(BASELINE_IMAGE), true, "missing baseline image");
  assert.ok(statSync(BASELINE_IMAGE).size > 0, "baseline image is empty");
});

test("manifest references the expected baseline artifact", () => {
  const manifest = JSON.parse(readFileSync(BASELINE_MANIFEST, "utf8"));
  assert.equal(manifest.file, BASELINE_IMAGE);
  assert.equal(typeof manifest.sha256, "string");
  assert.ok(manifest.sha256.length > 10, "manifest sha256 is invalid");
});

test("manifest records render environment metadata", () => {
  const manifest = JSON.parse(readFileSync(BASELINE_MANIFEST, "utf8"));
  assert.equal(typeof manifest.chromium_version, "string");
  assert.ok(manifest.chromium_version.length > 3, "chromium version is missing");
  assert.equal(typeof manifest.platform, "string");
  assert.ok(manifest.platform.length > 1, "platform metadata is missing");
});

test("check script includes environment mismatch guard and strict mode", () => {
  assert.match(CHECK_SCRIPT_TEXT, /TUI_VISUAL_STRICT/);
  assert.match(CHECK_SCRIPT_TEXT, /render environment differs/i);
});

test("readme documents visual baseline commands", () => {
  assert.match(README, /node scripts\/capture-visual-baseline\.mjs/);
  assert.match(README, /node scripts\/check-visual-baseline\.mjs/);
});
