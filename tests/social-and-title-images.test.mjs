import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";

const TITLE_SVG = "assets/title.svg";

test("title.svg exists", () => {
  assert.equal(existsSync(TITLE_SVG), true, "expected assets/title.svg to exist");
});
