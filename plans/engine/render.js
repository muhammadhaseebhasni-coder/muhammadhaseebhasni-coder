// Usage: node plans/engine/render.js <plan-folder> [--stills-only]
// Reads <plan-folder>/plan.js and writes PNG stills + a 1080x1920 MP4 (Shorts/Reels) into that folder.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { once } = require("events");

const dir = path.resolve(process.argv[2] || ".");
const stillsOnly = process.argv.includes("--stills-only");
const FPS = 30;

(async () => {
  const tpl = fs.readFileSync(path.join(__dirname, "plan.html"), "utf8");
  const html = tpl.replace("/*PLAN*/", () => fs.readFileSync(path.join(dir, "plan.js"), "utf8"));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const duration = await page.evaluate(() => window.DURATION);
  const stills = await page.evaluate(() => window.STILLS);

  for (const s of stills) {
    await page.evaluate(t => window.render(t), s.t);
    await page.screenshot({ path: path.join(dir, s.name) });
    console.log("still:", s.name);
  }
  if (stillsOnly) { await browser.close(); return; }

  const out = path.join(dir, "video.mp4");
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "medium", "-movflags", "+faststart", out],
    { stdio: ["pipe", "inherit", "inherit"] });
  const frames = Math.round(duration * FPS);
  for (let f = 0; f < frames; f++) {
    await page.evaluate(t => window.render(t), f / FPS);
    const buf = await page.screenshot({ type: "png" });
    if (!ff.stdin.write(buf)) await once(ff.stdin, "drain");
    if (f % 150 === 0) console.log(`frame ${f}/${frames}`);
  }
  ff.stdin.end();
  await once(ff, "close");
  await browser.close();
  console.log("video:", out);
})().catch(e => { console.error(e); process.exit(1); });
