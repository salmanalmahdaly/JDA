// Copies the site files into dist/ and checks every file the page references exists.
import { cpSync, rmSync, mkdirSync, readFileSync, existsSync } from "node:fs";

const FILES = ["index.html", "qr.html", "app.js", "favicon.svg",
  "ground.jpg", "mezzanine.jpg", "first.jpg", "second.jpg", "third.jpg"];
const OUT = "dist";

const missing = FILES.filter((f) => !existsSync(f));
if (missing.length) {
  console.error("Build failed. These files are missing from the repository:\n  " + missing.join("\n  "));
  process.exit(1);
}
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
for (const f of FILES) cpSync(f, `${OUT}/${f}`);

const js = readFileSync("app.js", "utf8");
try { new Function(js); } catch (e) { console.error("Build failed. app.js:", e.message); process.exit(1); }
console.log(`Build OK: ${FILES.length} files copied to ${OUT}/`);
