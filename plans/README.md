# House Plan Shorts Generator

Creates 2D house plan images and animated 1080×1920 videos (YouTube Shorts / Facebook Reels).

## Plans
| Folder | Plot | Facing | Layout |
|---|---|---|---|
| `5-marla-north-3bed/` | 5 Marla (25' × 45') | North | 3 Bed, 3 Bath, Car Porch, Drawing, Kitchen, 2 Lounges |

Each folder has:
- 2D: `ground-floor.png`, `first-floor.png`, `summary.png`, `video.mp4` (silent), `video-voiceover.mp4` (Urdu voiceover)
- 3D: `3d-ground-floor.png`, `3d-first-floor.png`, `3d-exterior.png`, `video-3d.mp4` (silent), `video-3d-voiceover.mp4` (Urdu voiceover)

## Make a new plan
1. Copy a plan folder and edit its `plan.js` (rooms, walls, doors, windows, in feet).
2. Optional voiceover: write `voiceover.json` (voice, rate, segments with start time + Urdu text), then run
   `python3 plans/engine/voiceover.py plans/<folder>` (needs `pip install edge-tts` and access to speech.platform.bing.com).
   Set `timing` in `plan.js` so rooms appear when their names are spoken.
3. Run `node plans/engine/render.js plans/<folder>` (needs Playwright + ffmpeg).
4. 3D video: add `low`, `furniture` and `view3d` to `plan.js` (see the 5 marla plan), write `voiceover-3d.json`, then run
   `python3 plans/engine/voiceover.py plans/<folder> voiceover-3d.json` and `node plans/engine/render.js plans/<folder> --3d`.
   The 3D view uses three.js r149 (`engine/vendor/three.min.js`, MIT licence in `engine/vendor/three-LICENSE`).

Plans are concept layouts only. Get final drawings checked by a licensed architect against local bylaws.
