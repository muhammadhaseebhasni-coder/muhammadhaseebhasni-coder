"""Generate voiceover clips for a plan: python3 plans/engine/voiceover.py <plan-folder> [config.json]
Reads <plan-folder>/voiceover.json (or the given config: {voice, rate, dir?, segments:[{at, text}]})
and writes <dir or "vo">/seg<N>.mp3.
Uses Microsoft Edge neural voices (edge-tts); needs speech.platform.bing.com reachable."""
import asyncio, json, os, subprocess, sys
import edge_tts

folder = sys.argv[1]
cfg = json.load(open(os.path.join(folder, sys.argv[2] if len(sys.argv) > 2 else "voiceover.json"), encoding="utf-8"))
clip_dir = os.path.join(folder, cfg.get("dir", "vo"))
os.makedirs(clip_dir, exist_ok=True)
proxy = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")

async def make(i, seg):
    out = os.path.join(clip_dir, f"seg{i}.mp3")
    await edge_tts.Communicate(seg["text"], cfg["voice"], rate=cfg.get("rate", "+0%"), proxy=proxy).save(out)
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out],
                             capture_output=True, text=True).stdout)
    print(f"seg{i}: starts {seg['at']:.2f}s, length {d:.2f}s, ends {seg['at'] + d:.2f}s")

for i, seg in enumerate(cfg["segments"]):
    asyncio.run(make(i, seg))
