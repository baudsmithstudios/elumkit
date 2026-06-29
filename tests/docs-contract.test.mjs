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

test("documentation entrypoints exist and are linked from README", () => {
  for (const file of REQUIRED_DOCS) {
    assert.equal(existsSync(file), true, `missing required doc: ${file}`);
    assert.match(README, new RegExp(file.replaceAll("/", "\\/")));
  }
});

test("component docs cover the public component set", () => {
  const componentUsage = readFileSync("docs/component-usage.md", "utf8");

  for (const heading of [
    "Button",
    "Input / Textarea / Select",
    "Checkbox / Radio Group",
    "Card",
    "Alert",
    "Badge",
    "Status Label",
    "System Bar",
    "Navbar",
    "Tabs",
    "Toolbar",
    "Query Row",
    "Pagination",
    "Empty State",
    "Disclosure",
    "Detail List",
    "Metrics",
    "Meter",
    "Data List",
    "Data Table",
  ]) {
    assert.match(componentUsage, new RegExp(`## ${heading}`));
  }
});

test("theming docs list only the supported theme values", () => {
  const theming = readFileSync("docs/theming.md", "utf8");

  for (const theme of ["dust", "iron", "neon"]) {
    assert.match(theming, new RegExp(`\`${theme}\``));
  }
  assert.doesNotMatch(theming, /`(?:light|dark|console)`/);
});
