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
  assert.match(componentUsage, /## Badge/);
  assert.match(componentUsage, /## System Bar/);
  assert.match(componentUsage, /## Status Label/);
  assert.match(componentUsage, /## Metrics/);
  assert.match(componentUsage, /## Meter/);
  assert.match(componentUsage, /## Data List/);
  assert.match(componentUsage, /## Data Table/);
});

test("component docs describe terminal status labels", () => {
  const componentUsage = readFileSync("docs/component-usage.md", "utf8");
  assert.match(componentUsage, /same-color dot/);
  assert.match(componentUsage, /uppercase status text/);
  assert.match(componentUsage, /data-column="status"/);
});

test("component docs describe system bars", () => {
  const componentUsage = readFileSync("docs/component-usage.md", "utf8");
  assert.match(componentUsage, /pergyl-system-bar/);
  assert.doesNotMatch(componentUsage, /pergyl-status-brand/);
});

test("component docs describe persistent input prompts", () => {
  const componentUsage = readFileSync("docs/component-usage.md", "utf8");
  assert.match(componentUsage, /pergyl-prompt-field/);
  assert.match(componentUsage, /pergyl-input-prompt/);
  assert.match(componentUsage, /persistent prompt/);
});

test("component docs describe bracketed badges", () => {
  const componentUsage = readFileSync("docs/component-usage.md", "utf8");
  assert.match(componentUsage, /pergyl-badge/);
  assert.match(componentUsage, /\[WARNING\]/);
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

test("theming docs list the industrial gothic theme names", () => {
  const theming = readFileSync("docs/theming.md", "utf8");
  assert.match(theming, /`clerestory`/);
  assert.match(theming, /`iron`/);
  assert.match(theming, /`forge`/);
  assert.doesNotMatch(theming, /`light`/);
  assert.doesNotMatch(theming, /`dark`/);
  assert.doesNotMatch(theming, /`console`/);
  assert.match(theming, /warm operational console/);
});

test("theming docs describe the clerestory palette", () => {
  const theming = readFileSync("docs/theming.md", "utf8");
  assert.match(theming, /`clerestory`/);
  assert.match(theming, /cool utility palette/);
});
