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
