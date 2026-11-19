# House Plan Shorts Generator

Creates 2D house plan images and animated 1080×1920 videos (YouTube Shorts / Facebook Reels).

## Plans
| Folder | Plot | Facing | Layout |
|---|---|---|---|
| `5-marla-north-3bed/` | 5 Marla (25' × 45') | North | 3 Bed, 3 Bath, Car Porch, Drawing, Kitchen, 2 Lounges |

Each folder has `ground-floor.png`, `first-floor.png`, `summary.png`, `video.mp4` (silent) and `video-voiceover.mp4` (Urdu voiceover).

## Make a new plan
1. Copy a plan folder and edit its `plan.js` (rooms, walls, doors, windows, in feet).
2. Optional voiceover: write `voiceover.json` (voice, rate, segments with start time + Urdu text), then run
   `python3 plans/engine/voiceover.py plans/<folder>` (needs `pip install edge-tts` and access to speech.platform.bing.com).
   Set `timing` in `plan.js` so rooms appear when their names are spoken.
3. Run `node plans/engine/render.js plans/<folder>` (needs Playwright + ffmpeg).

Plans are concept layouts only. Get final drawings checked by a licensed architect against local bylaws.
