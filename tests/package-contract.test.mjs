import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

function jsModules(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return jsModules(path);
    return /\.m?js$/.test(entry.name) ? [path] : [];
  });
}

function packedFiles() {
  const output = execFileSync("npm", ["pack", "--dry-run", "--json"], { encoding: "utf8" });
  return new Set(JSON.parse(output)[0].files.map((file) => file.path));
}

test("authored JS modules ship in the published package", () => {
  const packed = packedFiles();
  for (const module of jsModules("packages")) {
    assert.equal(packed.has(module), true, `JS module missing from package: ${module}`);
  }
});
