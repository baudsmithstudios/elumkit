import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const README = readFileSync("README.md", "utf8");
const REQUIRED_DOCS = [
  "docs/plain-html-quickstart.md",
  "docs/eleventy-usage.md",
  "docs/component-usage.md",
  "docs/theming.md",
];

test("v0.1 documentation files exist", () => {
  for (const file of REQUIRED_DOCS) {
    assert.equal(existsSync(file), true, `missing required doc: ${file}`);
  }
});

test("readme links to v0.1 usage docs", () => {
  assert.match(README, /docs\/plain-html-quickstart\.md/);
  assert.match(README, /docs\/eleventy-usage\.md/);
  assert.match(README, /docs\/component-usage\.md/);
  assert.match(README, /docs\/theming\.md/);
});

test("component docs cover telemetry primitives", () => {
  const componentUsage = readFileSync("docs/component-usage.md", "utf8");
  assert.match(componentUsage, /## Status Bar/);
  assert.match(componentUsage, /## Status Label/);
  assert.match(componentUsage, /## Metrics/);
  assert.match(componentUsage, /## Meter/);
  assert.match(componentUsage, /## Data List/);
  assert.match(componentUsage, /## Data Table/);
});

test("component docs describe terminal status labels and dot rows", () => {
  const componentUsage = readFileSync("docs/component-usage.md", "utf8");
  assert.match(componentUsage, /uppercase status text/);
  assert.match(componentUsage, /pergyl-status-list/);
  assert.match(componentUsage, /pergyl-status-dot/);
  assert.match(componentUsage, /data-column="status"/);
});

test("component docs describe optional inline card subtitles", () => {
  const componentUsage = readFileSync("docs/component-usage.md", "utf8");
  assert.match(componentUsage, /Subtitle defaults to card body flow/);
  assert.match(componentUsage, /data-inline="true"/);
});

test("theming docs describe card customization properties", () => {
  const theming = readFileSync("docs/theming.md", "utf8");
  assert.match(theming, /--pergyl-card-padding/);
  assert.match(theming, /--pergyl-card-title-color/);
  assert.match(theming, /--pergyl-card-title-size/);
  assert.match(theming, /--pergyl-card-subtitle-color/);
  assert.match(theming, /--pergyl-card-subtitle-size/);
});
