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
