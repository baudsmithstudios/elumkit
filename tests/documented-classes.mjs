import { readFileSync } from "node:fs";

const COMPONENT_USAGE = readFileSync("docs/component-usage.md", "utf8");

// the lookbehind skips custom properties such as --elum-meter-fill-width
export const DOCUMENTED_CLASSES = new Set(COMPONENT_USAGE.match(/(?<![\w-])elum-[a-z0-9]+(?:-[a-z0-9]+)*/g));
