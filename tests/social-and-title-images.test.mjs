import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const TITLE_SVG = "assets/title.svg";
const SOCIAL_HTML = "examples/social-card.html";
const SOCIAL_PNG = "assets/social.png";

test("README title image asset exists and has the expected shape", () => {
  assert.equal(existsSync(TITLE_SVG), true, "expected assets/title.svg to exist");
  const svg = readFileSync(TITLE_SVG, "utf8");

  assert.match(svg, /viewBox="0 0 600 96"/);
  assert.match(svg, /width="600"/);
  assert.match(svg, /height="96"/);
  assert.match(svg, />pergyl</);
});

test("social card source uses Pergyl CSS and fixed image dimensions", () => {
  assert.equal(existsSync(SOCIAL_HTML), true, "expected examples/social-card.html to exist");
  const html = readFileSync(SOCIAL_HTML, "utf8");

  assert.match(html, /href="\.\.\/packages\/core-css\/src\/index\.css"/);
  assert.match(html, /width:\s*1280px/);
  assert.match(html, /height:\s*640px/);
  assert.match(html, /class="pergyl-card pergyl-card-labeled"/);
});

test("social PNG exists and matches the OpenGraph dimensions", () => {
  assert.equal(existsSync(SOCIAL_PNG), true, "expected assets/social.png to exist");
  const buf = readFileSync(SOCIAL_PNG);

  assert.ok(buf.length > 1024, "expected social.png to be larger than 1KB");
  assert.equal(buf[0], 0x89);
  assert.equal(buf[1], 0x50);
  assert.equal(buf[2], 0x4e);
  assert.equal(buf[3], 0x47);
  assert.equal(buf.readUInt32BE(16), 1280);
  assert.equal(buf.readUInt32BE(20), 640);
});

test("README embeds the title banner and project tagline", () => {
  const readme = readFileSync("README.md", "utf8");

  assert.match(readme, /<img\s+src="assets\/title\.svg"[^>]*alt="Pergyl"/);
  assert.match(readme, /HTML-first web UI primitives with a clean terminal feel\./);
});
