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

test("title.svg renders the brand mark with rust accent on the period", () => {
  const svg = readFileSync(TITLE_SVG, "utf8");
  assert.match(svg, />pergyl</);
  assert.match(svg, /class="accent"[^>]*>\.</);
});

test("title.svg labels the card with component-system v0.1", () => {
  const svg = readFileSync(TITLE_SVG, "utf8");
  assert.match(svg, /COMPONENT-SYSTEM\s*·\s*V0\.1/i);
});

test("title.svg uses iron token values", () => {
  const svg = readFileSync(TITLE_SVG, "utf8");
  // iron palette from packages/core-css/src/tokens.css
  assert.match(svg, /#1c1c1c/); // surface
  assert.match(svg, /#444444/); // border
  assert.match(svg, /#121212/); // bg
  assert.match(svg, /#a3a3a3/); // muted
  assert.match(svg, /#eeeeee/); // fg
  assert.match(svg, /#c47a5a/); // accent
});

const SOCIAL_HTML = "examples/social-card.html";

test("social-card.html exists", () => {
  assert.equal(existsSync(SOCIAL_HTML), true, "expected examples/social-card.html to exist");
});

test("social-card.html links Pergyl core CSS", () => {
  const html = readFileSync(SOCIAL_HTML, "utf8");
  assert.match(html, /href="\.\.\/packages\/core-css\/src\/index\.css"/);
});

test("social-card.html declares 1280x640 viewport via body sizing", () => {
  const html = readFileSync(SOCIAL_HTML, "utf8");
  assert.match(html, /width:\s*1280px/);
  assert.match(html, /height:\s*640px/);
});

test("social-card.html uses real Pergyl primitives for the title card", () => {
  const html = readFileSync(SOCIAL_HTML, "utf8");
  assert.match(html, /class="pergyl-card pergyl-card-labeled"/);
  assert.match(html, /class="pergyl-card-title">component-system/);
  assert.match(html, /v0\.1/);
});

test("social-card.html renders the brand mark and tagline", () => {
  const html = readFileSync(SOCIAL_HTML, "utf8");
  assert.match(html, /class="card-brand"/);
  assert.match(html, />pergyl<span class="card-brand-accent">\.<\/span></);
  assert.match(html, /HTML-first web UI primitives with a clean terminal feel\./);
});

test("social-card.html shows demo strip with status, meter, controls", () => {
  const html = readFileSync(SOCIAL_HTML, "utf8");
  assert.match(html, /class="pergyl-status-label" data-tone="success"/);
  assert.match(html, /class="pergyl-status-label" data-tone="warn"/);
  assert.match(html, /class="pergyl-meter"/);
  assert.match(html, /class="pergyl-button"/);
  assert.match(html, /class="pergyl-input"/);
});

const SOCIAL_PNG = "assets/social.png";

test("social.png exists", () => {
  assert.equal(existsSync(SOCIAL_PNG), true, "expected assets/social.png to exist");
});

test("social.png is a non-empty PNG with the magic header", () => {
  const buf = readFileSync(SOCIAL_PNG);
  assert.ok(buf.length > 1024, "expected social.png to be larger than 1KB");
  assert.equal(buf[0], 0x89);
  assert.equal(buf[1], 0x50);
  assert.equal(buf[2], 0x4e);
  assert.equal(buf[3], 0x47);
});

test("social.png is exactly 1280x640", () => {
  const buf = readFileSync(SOCIAL_PNG);
  // PNG IHDR chunk: width is bytes 16..19, height bytes 20..23, big-endian.
  const width  = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  assert.equal(width, 1280, `expected 1280px wide, got ${width}`);
  assert.equal(height, 640, `expected 640px tall, got ${height}`);
});
