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

test("component docs give every component in the README scope a section", () => {
  const scope = README.match(/## Current Component Scope\n\n(.+)\./)[1].split(", ");
  const headings = readFileSync("docs/component-usage.md", "utf8").match(/^## .+$/gm)
    .flatMap((heading) => heading.slice(3).split(" / "));

  for (const component of scope) {
    assert.ok(headings.includes(component), `no component-usage section for ${component}`);
  }
});

test("theming docs list every supported theme value", () => {
  const theming = readFileSync("docs/theming.md", "utf8");

  for (const theme of ["dust", "iron", "neon"]) {
    assert.match(theming, new RegExp(`\`${theme}\``));
  }
});
