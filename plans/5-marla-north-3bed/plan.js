// 5 Marla (25' x 45' = 1125 sq ft), North facing, 3 bedrooms + car porch.
// Coordinates are in feet: x = 0 (west) .. 25 (east), y = 0 (north / road) .. 45 (south / rear).
// Walls are 9" thick. Room rectangles use wall centre lines; clear sizes are computed automatically.
window.PLAN = {
  title: "5 MARLA HOUSE PLAN",
  subtitle: "25' × 45'  |  NORTH FACING  |  3 BED + CAR PORCH",
  plot: { w: 25, d: 45 },
  scale: 30,
  road: "ROAD  ·  NORTH",
  footer: "Concept layout only · Get final drawings approved by a licensed architect",
  // 3D video settings (plans/engine/3d.html)
  view3d: {
    title: "5 MARLA HOUSE",
    subtitle: "25' × 45'  |  NORTH FACING  |  3D VIEW",
    footer: "Concept 3D visual · Get final drawings approved by an architect",
    endLine1: "3 BED  ·  3 BATH  ·  CAR PORCH",
    endLine2: "Which plot size next? Comment below!",
    button: "FOLLOW FOR MORE PLANS"
  },
  // Timeline synced to the Urdu voiceover (voiceover.json). Room times follow the order of `rooms` in each floor.
  timing: {
    floors: [
      { start: 0.5, walls: { start: 0.4, span: 4.0, dur: 0.9 },
        rooms: { times: [6.78, 7.52, 8.1, 8.66, 9.1, 9.34, 11.07, 9.97, 13.55] }, openings: { start: 14.6, dur: 1.0 } },
      { start: 18.0, walls: { start: 0.0, span: 0.8, dur: 0.5 },
        rooms: { times: [4.66, 1.38, 2.17, 2.66, 5.14, 5.5, 5.88, 6.61, 7.29, 7.9] }, openings: { start: 8.3, dur: 1.0 } }
    ],
    summary: { start: 27.6, question: 3.6, button: 6.8 },
    duration: 37.5
  },
  floors: [
    {
      name: "GROUND FLOOR",
      // 3D: walls inside these areas are low boundary walls [x1, y1, x2, y2, height ft]
      low: [[11, 0, 25, 5, 4]],
      furniture: [
        { t: "car", x: 5.5, y: 9.0 },
        { t: "tree", x: 23.0, y: 2.6, s: 0.8 }, { t: "plant", x: 13.0, y: 1.6 }, { t: "plant", x: 16.5, y: 1.4 }, { t: "plant", x: 20.0, y: 1.4 },
        { t: "rug", x: 18.0, y: 11.5, w: 8, d: 9, c: "#9c6b4e" },
        { t: "sofa", x: 22.7, y: 11.5, w: 7.5, d: 2.8, rot: -90, c: "#8a8f98" },
        { t: "armchair", x: 13.7, y: 9.2, rot: 90 }, { t: "armchair", x: 13.7, y: 13.8, rot: 90 },
        { t: "ctable", x: 18.2, y: 11.5, w: 2.4, d: 4.2 },
        { t: "plant", x: 23.4, y: 6.4 }, { t: "plant", x: 23.4, y: 16.7 },
        { t: "rug", x: 7.0, y: 24.4, w: 6.5, d: 5.5, c: "#6b7a8f" },
        { t: "sofa", x: 2.2, y: 24.8, w: 5.6, d: 2.8, rot: 90, c: "#4b5563" },
        { t: "ctable", x: 6.6, y: 24.8, w: 2, d: 3.2 },
        { t: "tv", x: 13.0, y: 23.7, w: 4.2, rot: -90 },
        { t: "dining", x: 9.8, y: 28.6, w: 4.5, d: 3 },
        { t: "counter", x: 18.8, y: 26.4, w: 6.85, d: 2, stove: true },
        { t: "counter", x: 23.25, y: 27.4, w: 4.05, d: 2, rot: -90, sink: true },
        { t: "fridge", x: 23.1, y: 30.4, rot: -90 },
        { t: "bed", x: 4.1, y: 38.3, w: 5, d: 6.6, rot: 90, c: "#7c9cbf" },
        { t: "nightstand", x: 1.6, y: 34.9, rot: 90 }, { t: "nightstand", x: 1.6, y: 41.7, rot: 90 },
        { t: "wardrobe", x: 6.5, y: 43.3, w: 6, d: 1.9, rot: 180 },
        { t: "toilet", x: 16.5, y: 38.4, rot: -90 }, { t: "basin", x: 14.5, y: 39.0, rot: 180 },
        { t: "tree", x: 21.8, y: 41.0, s: 0.75 }, { t: "plant", x: 19.4, y: 33.6 }, { t: "plant", x: 14.6, y: 43.4 }, { t: "plant", x: 24.0, y: 43.6 }
      ],
      rooms: [
        { n: "CAR PORCH", r: [0, 0, 11, 18], f: "porch", lab: [5.5, 16.2] },
        { n: "LAWN", r: [11, 0, 25, 5], f: "green", dims: false },
        { n: "DRAWING ROOM", r: [11, 5, 25, 18], f: "drawing" },
        { n: "TV LOUNGE\n& DINING", r: [0, 18, 14, 32], f: "lounge" },
        { n: "STAIRS", r: [14, 18, 25, 25], f: "stair", hideLabel: true },
        { n: "KITCHEN", r: [14, 25, 25, 32], f: "kitchen" },
        { n: "BEDROOM 1", r: [0, 32, 13, 45], f: "bed" },
        { n: "BATH", r: [13, 32, 18, 40], f: "bath", lab: [15.5, 37.4] },
        { n: "COURTYARD", poly: [[13, 40], [18, 40], [18, 32], [25, 32], [25, 45], [13, 45]], f: "green", lab: [21.5, 39.2], sub: "OPEN TO SKY" }
      ],
      walls: [
        { o: "h", c: 0, a: 0, b: 25, g: [{ a: 0.75, b: 10.6, type: "gate" }] },
        { o: "v", c: 0, a: 0, b: 45 },
        { o: "v", c: 25, a: 0, b: 45 },
        { o: "h", c: 45, a: 0, b: 25 },
        { o: "h", c: 5, a: 11, b: 25, g: [{ a: 15, b: 21, type: "window" }] },
        { o: "v", c: 11, a: 5, b: 18, g: [{ a: 13, b: 16, type: "door", h: "b", s: 1 }] },
        { o: "h", c: 18, a: 0, b: 25, g: [{ a: 3, b: 6.5, type: "door", h: "a", s: 1 }] },
        { o: "v", c: 14, a: 18, b: 32, g: [{ a: 18.6, b: 21.4, type: "open" }, { a: 26, b: 30, type: "open" }] },
        { o: "h", c: 25, a: 14, b: 25 },
        { o: "h", c: 32, a: 0, b: 25, g: [{ a: 8.5, b: 11.5, type: "door", h: "b", s: 1 }, { a: 19, b: 21.5, type: "door", h: "a", s: 1 }, { a: 22, b: 24, type: "window" }] },
        { o: "v", c: 13, a: 32, b: 45, g: [{ a: 33, b: 35.5, type: "door", h: "a", s: 1 }, { a: 41, b: 44, type: "window" }] },
        { o: "v", c: 18, a: 32, b: 40, g: [{ a: 35, b: 37, type: "window" }] },
        { o: "h", c: 40, a: 13, b: 18 }
      ],
      stairs: { r: [14, 18, 25, 25], labels: ["UP"] },
      car: { x: 5.5, y: 8.2 }
    },
    {
      name: "FIRST FLOOR",
      low: [[0, 0, 25, 5, 3.5]],
      furniture: [
        { t: "bistro", x: 20.5, y: 2.6 }, { t: "plant", x: 1.6, y: 2.4 }, { t: "plant", x: 24.0, y: 2.4 }, { t: "plant", x: 13.0, y: 1.6 },
        { t: "rug", x: 5.6, y: 11.4, w: 8.5, d: 8, c: "#b08968" },
        { t: "bed", x: 4.2, y: 11.3, w: 6, d: 6.8, rot: 90, c: "#c06c5b" },
        { t: "nightstand", x: 1.6, y: 7.4, rot: 90 }, { t: "nightstand", x: 1.6, y: 15.2, rot: 90 },
        { t: "tv", x: 16.0, y: 11.3, w: 4, rot: -90 },
        { t: "armchair", x: 13.4, y: 7.2, rot: 200, c: "#d4a373" },
        { t: "toilet", x: 23.5, y: 9.0, rot: -90 }, { t: "basin", x: 20.4, y: 10.0, rot: 180 }, { t: "shower", x: 23.0, y: 6.6 },
        { t: "wardrobe", x: 23.3, y: 14.6, w: 5.6, d: 1.9, rot: -90 }, { t: "wardrobe", x: 20.2, y: 16.7, w: 3.8, d: 1.8, rot: 180 },
        { t: "rug", x: 7.0, y: 24.6, w: 6.5, d: 6, c: "#8f7a66" },
        { t: "sofa", x: 2.2, y: 24.8, w: 6.5, d: 2.8, rot: 90, c: "#3f6e70" },
        { t: "ctable", x: 6.6, y: 24.8, w: 2, d: 3.2 },
        { t: "tv", x: 13.0, y: 23.7, w: 4.2, rot: -90 },
        { t: "armchair", x: 4.6, y: 29.8, rot: 160, c: "#c9a46b" },
        { t: "washer", x: 23.2, y: 27.0, rot: -90 }, { t: "washer", x: 23.2, y: 29.3, rot: -90 },
        { t: "shelf", x: 19.0, y: 26.2, w: 5, d: 1.4 },
        { t: "bed", x: 4.1, y: 37.6, w: 5, d: 6.6, rot: 90, c: "#8bb174" },
        { t: "nightstand", x: 1.6, y: 34.3, rot: 90 },
        { t: "wardrobe", x: 6.8, y: 43.3, w: 5.5, d: 1.9, rot: 180 },
        { t: "desk", x: 11.6, y: 40.6, w: 3.6, d: 1.9, rot: -90 },
        { t: "toilet", x: 16.5, y: 38.4, rot: -90 }, { t: "basin", x: 14.5, y: 39.0, rot: 180 }
      ],
      rooms: [
        { n: "BALCONY", r: [0, 0, 25, 5], f: "green", dims: false },
        { n: "MASTER BEDROOM", r: [0, 5, 17, 18], f: "bed" },
        { n: "BATH", r: [17, 5, 25, 11], f: "bath" },
        { n: "DRESSING", r: [17, 11, 25, 18], f: "dress" },
        { n: "FAMILY\nLOUNGE", r: [0, 18, 14, 32], f: "lounge" },
        { n: "STAIRS", r: [14, 18, 25, 25], f: "stair", hideLabel: true },
        { n: "LAUNDRY\n/ STORE", r: [14, 25, 25, 32], f: "dress" },
        { n: "BEDROOM 3", r: [0, 32, 13, 45], f: "bed" },
        { n: "BATH", r: [13, 32, 18, 40], f: "bath", lab: [15.5, 37.4] },
        { n: "OPEN TO SKY", poly: [[13, 40], [18, 40], [18, 32], [25, 32], [25, 45], [13, 45]], f: "void", lab: [21.5, 39.2], sub: "COURTYARD BELOW" }
      ],
      walls: [
        { o: "h", c: 0, a: 0, b: 25, t: 0.35, rail: true },
        { o: "v", c: 0, a: 0, b: 45 },
        { o: "v", c: 25, a: 0, b: 45 },
        { o: "h", c: 45, a: 0, b: 25 },
        { o: "h", c: 5, a: 0, b: 25, g: [{ a: 7, b: 11, type: "slide" }, { a: 19.5, b: 22.5, type: "window" }] },
        { o: "v", c: 17, a: 5, b: 18, g: [{ a: 6.5, b: 9, type: "door", h: "a", s: -1 }, { a: 13, b: 15.5, type: "door", h: "b", s: -1 }] },
        { o: "h", c: 11, a: 17, b: 25 },
        { o: "h", c: 18, a: 0, b: 25, g: [{ a: 4, b: 7, type: "door", h: "a", s: -1 }] },
        { o: "v", c: 14, a: 18, b: 32, g: [{ a: 18.6, b: 21.4, type: "open" }, { a: 26, b: 28.75, type: "door", h: "a", s: 1 }] },
        { o: "h", c: 25, a: 14, b: 25 },
        { o: "h", c: 32, a: 0, b: 25, g: [{ a: 8.5, b: 11.5, type: "door", h: "b", s: 1 }, { a: 20, b: 23, type: "window" }] },
        { o: "v", c: 13, a: 32, b: 45, g: [{ a: 33, b: 35.5, type: "door", h: "a", s: 1 }, { a: 41, b: 44, type: "window" }] },
        { o: "v", c: 18, a: 32, b: 40, g: [{ a: 35, b: 37, type: "window" }] },
        { o: "h", c: 40, a: 13, b: 18 }
      ],
      stairs: { r: [14, 18, 25, 25], labels: ["DN", "UP"] }
    }
  ],
  summary: {
    title: "WHAT YOU GET",
    items: ["3 Bedrooms", "3 Bathrooms", "Car Porch + Front Lawn", "Drawing Room", "TV Lounge + Family Lounge", "Kitchen + Laundry", "Open Courtyard (light & air)"],
    question: "Which plot size should I design next?",
    cta: "Comment below!",
    button: "FOLLOW FOR MORE PLANS"
  }
};
