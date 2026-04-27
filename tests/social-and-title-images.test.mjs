import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const TITLE_SVG = "assets/title.svg";

test("title.svg exists", () => {
  assert.equal(existsSync(TITLE_SVG), true, "expected assets/title.svg to exist");
});

test("title.svg uses 600x96 dimensions matching sibling projects", () => {
  const svg = readFileSync(TITLE_SVG, "utf8");
  assert.match(svg, /viewBox="0 0 600 96"/);
  assert.match(svg, /width="600"/);
  assert.match(svg, /height="96"/);
});

test("title.svg switches palette via prefers-color-scheme", () => {
  const svg = readFileSync(TITLE_SVG, "utf8");
  assert.match(svg, /@media \(prefers-color-scheme: light\)/);
});

test("title.svg renders the brand mark with rust accent on the period", () => {
  const svg = readFileSync(TITLE_SVG, "utf8");
  assert.match(svg, />pergyl</);
  assert.match(svg, /class="accent"[^>]*>\.</);
});

test("title.svg labels the card with component-system v0.1", () => {
  const svg = readFileSync(TITLE_SVG, "utf8");
  assert.match(svg, /COMPONENT-SYSTEM\s*·\s*V0\.1/i);
});

test("title.svg uses Pergyl tokens for both themes", () => {
  const svg = readFileSync(TITLE_SVG, "utf8");
  assert.match(svg, /#444444/);
  assert.match(svg, /#c47a5a/);
  assert.match(svg, /#d4d4d4/);
  assert.match(svg, /#8b4a2a/);
});
