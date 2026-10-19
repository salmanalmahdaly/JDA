// Copies public/ to dist/ and checks that every file the page references exists.
import { cpSync, rmSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SRC = "public", OUT = "dist";
rmSync(OUT, { recursive: true, force: true });
cpSync(SRC, OUT, { recursive: true });

const html = readFileSync(join(OUT, "index.html"), "utf8");
const js = readFileSync(join(OUT, "assets/app.js"), "utf8");
const refs = [
  ...html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g),
  ...js.matchAll(/"(assets\/[^"]+)"/g),
].map((m) => m[1]);

const missing = refs.filter((r) => !existsSync(join(OUT, r)));
if (missing.length) {
  console.error("Build failed. Missing files:\n  " + missing.join("\n  "));
  process.exit(1);
}
// Syntax check of the app script
try { new Function(js); } catch (e) { console.error("Build failed. app.js:", e.message); process.exit(1); }

console.log(`Build OK: ${refs.length} asset references verified -> ${OUT}/`);
