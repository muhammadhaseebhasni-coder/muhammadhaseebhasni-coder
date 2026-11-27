// Usage: node plans/engine/render.js <plan-folder> [--3d] [--stills-only]
// Reads <plan-folder>/plan.js and writes PNG stills + a 1080x1920 MP4 (Shorts/Reels) into that folder.
// --3d renders the 3D walkthrough (3d.html) to video-3d.mp4 and uses voiceover-3d.json for narration.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { once } = require("events");

const dir = path.resolve(process.argv[2] || ".");
const stillsOnly = process.argv.includes("--stills-only");
const is3d = process.argv.includes("--3d");
const sfx = is3d ? "-3d" : "";
const FPS = 30;

(async () => {
  const tpl = fs.readFileSync(path.join(__dirname, is3d ? "3d.html" : "plan.html"), "utf8");
  const html = tpl.replace("/*THREE*/", () => fs.readFileSync(path.join(__dirname, "vendor", "three.min.js"), "utf8"))
    .replace("/*PLAN*/", () => fs.readFileSync(path.join(dir, "plan.js"), "utf8"));
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

  const out = path.join(dir, `video${sfx}.mp4`);
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "medium", "-movflags", "+faststart", out],
    { stdio: ["pipe", "inherit", "inherit"] });
  const frames = Math.round(duration * FPS);
  for (let f = 0; f < frames; f++) {
    await page.evaluate(t => window.render(t), f / FPS);
    const buf = await page.screenshot({ type: "png" });
    if (!ff.stdin.write(buf)) await once(ff.stdin, "drain");
    if (f % 150 === 0) console.log(`frame ${f}/${frames}`, new Date().toISOString().slice(11, 19));
  }
  ff.stdin.end();
  await once(ff, "close");
  await browser.close();
  console.log("video (silent):", out);

  // Mix voiceover clips (vo/seg<N>.mp3 from voiceover.py) at their start times.
  const voCfg = path.join(dir, `voiceover${sfx}.json`);
  if (fs.existsSync(voCfg)) {
    const vcfg = JSON.parse(fs.readFileSync(voCfg, "utf8"));
    const clips = vcfg.segments.map((s, i) => ({ at: s.at, file: path.join(dir, vcfg.dir || "vo", `seg${i}.mp3`) })).filter(c => fs.existsSync(c.file));
    if (clips.length) {
      const args = ["-y", "-loglevel", "error", "-i", out];
      clips.forEach(c => args.push("-i", c.file));
      const delays = clips.map((c, i) => `[${i + 1}:a]adelay=${Math.round(c.at * 1000)}:all=1[a${i}]`).join(";");
      const mix = clips.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${clips.length}:normalize=0,apad[aout]`;
      const voiced = path.join(dir, `video${sfx}-voiceover.mp4`);
      args.push("-filter_complex", `${delays};${mix}`, "-map", "0:v", "-map", "[aout]", "-c:v", "copy",
        "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", voiced);
      const mx = spawn("ffmpeg", args, { stdio: "inherit" });
      const [code] = await once(mx, "close");
      if (code !== 0) throw new Error("audio mix failed");
      console.log("video (voiceover):", voiced);
    }
  }
})().catch(e => { console.error(e); process.exit(1); });
