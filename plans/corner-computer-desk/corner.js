// Corner makeover: L-shaped computer desk with shelves, 6' x 6' corner, white + wood.
// Units are feet. Back wall is the plane z = 0 (x runs along it), left wall is x = 0 (z runs along it), floor y = 0.
// Each item: at (start s), dur, anim ("drop" | "slide" | "pop" | "sweep"), optional tag, build(group, H).
(function () {
  const OAK = () => H.wood("#CFA472", "#8a5a2e");
  const WHITE = () => H.mat("#F7F7F5", { roughness: 0.5 });
  const BLACK = () => H.mat("#1c1f24", { roughness: 0.45 });
  const BOOK = ["#c44536", "#283d3b", "#197278", "#edddd4", "#772e25", "#e9c46a", "#264653", "#9a8c98", "#f4a261"];

  function books(g, x, z, y, width, depth, alongZ, maxH) {
    let p = 0;
    while (p < width - 0.12) {
      const th = 0.09 + H.rand() * 0.09, h = maxH * (0.7 + H.rand() * 0.3), m = H.mat(BOOK[Math.floor(H.rand() * BOOK.length)], { roughness: 0.7 });
      if (p + th > width) break;
      if (alongZ) H.box(g, x, x + depth, y, y + h, z + p, z + p + th, m);
      else H.box(g, x + p, x + p + th, y, y + h, z, z + depth, m);
      p += th + 0.01;
    }
  }
  function plant(g, x, y, z, s, potColor) {
    H.cyl(g, x, y, z, 0.32 * s, 0.55 * s, H.mat(potColor || "#ffffff", { roughness: 0.4 }), { rTop: 0.38 * s });
    const leaf = H.mat("#3f7d20"), leaf2 = H.mat("#5a9e2f");
    H.sph(g, x, y + 0.95 * s, z, 0.45 * s, leaf, 1.1);
    H.sph(g, x + 0.22 * s, y + 0.8 * s, z + 0.12 * s, 0.32 * s, leaf2);
    H.sph(g, x - 0.2 * s, y + 0.85 * s, z - 0.1 * s, 0.3 * s, leaf2);
  }

  window.CORNER = {
    title: "CORNER MAKEOVER",
    subtitle: "COMPUTER TABLE + SHELVES  |  6' × 6' CORNER",
    footer: "Concept 3D design · Check your room size before buying",
    endLine1: "WORK + STUDY CORNER",
    endLine2: "Which corner should I design next?",
    button: "FOLLOW FOR MORE",
    duration: 38.5,
    night: [23.5, 1.3],
    slider: [27.8, 31.8],
    end: 32.0,
    beforeAt: 0.5,
    pills: [[0, 5.0, "BEFORE"], [5.0, 23.5, "MAKEOVER"], [23.5, 27.8, "AFTER"], [31.8, 99, "AFTER"]],
    stills: [{ name: "before.png", t: 2.5 }, { name: "after-day.png", t: 23.3 }, { name: "after-night.png", t: 27.3 }, { name: "slider.png", t: 29.6 }],
    // [t, azimuth°, elevation°, radius, target x, target y, target z, rest?]  (azimuth 45 = looking straight into the corner)
    camera: [
      [0, 42, 15, 21, 3.4, 3.4, 2.4, true], [5.0, 44, 16, 20.5, 3.4, 3.4, 2.4], [14, 49, 17, 19.5, 3.45, 3.5, 2.4],
      [23.5, 52, 16, 19, 3.45, 3.5, 2.4, true], [27.8, 41, 13, 19.5, 3.45, 3.6, 2.4, true],
      [31.8, 41, 13, 19.5, 3.45, 3.6, 2.4, true], [38.5, 45, 14, 20.5, 3.45, 3.6, 2.4, true]
    ],
    items: [
      // ---- BEFORE clutter (shrinks away) ----
      { beforeOnly: true, at: 4.5, dur: 0.6, build(g) {
        const card = H.mat("#b48a5a", { roughness: 0.9 });
        H.box(g, 1.8, 3.4, 0, 1.2, 0.8, 2.0, card); H.box(g, 1.8, 3.4, 1.2, 1.24, 1.38, 1.42, H.mat("#d9c29b"));
        H.box(g, 2.2, 3.2, 1.2, 1.9, 1.0, 1.8, card);
        const plastic = H.mat("#3a7bd5", { roughness: 0.5 });
        H.box(g, 4.0, 5.2, 1.4, 1.55, 3.0, 4.2, plastic);
        [[4.1, 3.1], [5.1, 3.1], [4.1, 4.1], [5.1, 4.1]].forEach(([x, z]) => H.box(g, x - 0.05, x + 0.05, 0, 1.4, z - 0.05, z + 0.05, plastic));
      } },

      // ---- 1. wood slat accent wall ----
      { at: 5.2, dur: 2.2, anim: "sweep", tag: { text: "WOOD SLAT WALL", size: "6' wide", pos: [3.1, 7.2, 0.3] }, build(g) {
        H.box(g, 0, 6.2, 0, 8.6, 0.0, 0.05, H.mat("#2a2622", { roughness: 0.9 }), { cast: false });
        for (let x = 0.04; x < 6.15; x += 0.22) H.box(g, x, x + 0.14, 0, 8.6, 0.05, 0.13, OAK());
      } },

      // ---- 2. L-shaped desk ----
      { at: 8.5, dur: 0.9, anim: "drop", tag: { text: "L-SHAPE DESK", size: "6' × 5'", pos: [4.6, 2.9, 1.4] }, build(g) {
        H.box(g, 0, 6.0, 2.38, 2.5, 0.14, 2.14, OAK());                 // back wing
        H.box(g, 0.06, 2.06, 2.38, 2.5, 2.14, 5.0, OAK());              // left wing
        H.box(g, 5.82, 5.98, 0, 2.38, 0.2, 2.1, WHITE());               // panel leg
        H.box(g, 0.2, 5.82, 1.8, 2.38, 0.16, 0.24, WHITE());            // modesty panel
        H.box(g, 0.12, 5.9, 2.36, 2.39, 0.12, 0.2, H.led("#ffb35c", 0.2, 2.6)); // hidden LED under back edge
        H.glowLine(g, [0.4, 2.3, 0.3], [5.6, 2.3, 0.3], 10, 1.5, "#ffb35c", 0.55);
      } },

      // ---- 3. drawer unit ----
      { at: 10.2, dur: 0.8, anim: "slide", from: [0, 0, 5], tag: { text: "3 DRAWERS", pos: [1.6, 1.6, 4.4] }, build(g) {
        H.box(g, 0.12, 1.62, 0, 2.36, 3.4, 4.9, WHITE());
        for (let i = 0; i < 3; i++) {
          const y = 0.12 + i * 0.75;
          H.box(g, 1.62, 1.64, y, y + 0.68, 3.45, 4.85, H.mat("#ECECEA", { roughness: 0.5 }));
          H.box(g, 1.64, 1.68, y + 0.5, y + 0.55, 3.85, 4.45, BLACK());
        }
      } },

      // ---- 4. floating shelves on the slat wall (with LED underneath) ----
      { at: 12.2, dur: 1.0, anim: "drop", tag: { text: "FLOATING SHELVES", size: "3' each", pos: [4.4, 6.4, 0.6] }, build(g) {
        [4.5, 5.75].forEach(y => {
          H.box(g, 2.9, 5.9, y, y + 0.13, 0.13, 1.0, OAK());
          H.box(g, 3.0, 5.8, y - 0.02, y, 0.75, 0.82, H.led("#ffb35c", 0.2, 2.6), { cast: false });
          H.glowLine(g, [3.1, y - 0.15, 0.8], [5.7, y - 0.15, 0.8], 6, 1.3, "#ffb35c", 0.5);
        });
        H.light(4.4, 4.3, 0.9, "#ffb35c", 1.4, 6);
      } },

      // ---- 5. wall cubbies on the left wall ----
      { at: 13.9, dur: 0.9, anim: "slide", from: [4, 0, 0], tag: { text: "WALL CUBBIES", size: "6 boxes", pos: [1.0, 7.0, 2.8] }, build(g) {
        const m = WHITE(), t = 0.06, x0 = 0.0, x1 = 1.0, z0 = 1.0, z1 = 4.6, y0 = 4.2, y1 = 6.6;
        H.box(g, x0, x1, y0, y0 + t, z0, z1, m); H.box(g, x0, x1, y1 - t, y1, z0, z1, m); H.box(g, x0, x1, (y0 + y1) / 2 - t / 2, (y0 + y1) / 2 + t / 2, z0, z1, m);
        for (let i = 0; i <= 3; i++) { const z = z0 + i * (z1 - z0) / 3; H.box(g, x0, x1, y0, y1, z - t / 2, z + t / 2, m); }
        H.box(g, 0, 0.03, y0, y1, z0, z1, H.mat("#E3E0DA"));
      } },

      // ---- 6. monitor, keyboard, PC ----
      { at: 16.4, dur: 0.7, anim: "pop", pivot: [3.0, 2.5, 0.8], tag: { text: "27\" MONITOR + PC", pos: [3.0, 4.75, 0.7] }, build(g) {
        const screen = new THREE.MeshStandardMaterial({ map: H.canvasTex(512, 300, (c, w, h) => {
          const gr = c.createLinearGradient(0, 0, w, h); gr.addColorStop(0, "#3a1c71"); gr.addColorStop(0.5, "#d76d77"); gr.addColorStop(1, "#ffaf7b");
          c.fillStyle = gr; c.fillRect(0, 0, w, h);
          c.fillStyle = "rgba(255,255,255,.85)"; c.fillRect(40, 40, 200, 130); c.fillStyle = "rgba(20,20,40,.75)"; c.fillRect(270, 70, 200, 160);
          c.fillStyle = "rgba(255,255,255,.6)"; for (let i = 0; i < 5; i++) c.fillRect(60, 60 + i * 20, 150 - i * 15, 8);
          c.fillStyle = "rgba(0,0,0,.55)"; c.fillRect(0, h - 24, w, 24);
        }) });
        screen.emissive = new THREE.Color("#ffffff"); screen.emissiveMap = screen.map; screen.emissiveIntensity = 0.55;
        H.box(g, 2.75, 3.25, 2.5, 2.54, 0.45, 0.95, BLACK()); H.box(g, 2.95, 3.05, 2.54, 3.3, 0.48, 0.58, BLACK());
        H.box(g, 1.85, 4.15, 3.0, 4.35, 0.55, 0.64, BLACK());
        H.box(g, 1.9, 4.1, 3.05, 4.3, 0.64, 0.645, screen, { cast: false });
        H.glow(g, 3.0, 3.7, 0.35, 4.5, "#a66cff", 0.65);
        H.box(g, 2.0, 4.6, 2.5, 2.51, 1.1, 1.95, H.mat("#2d3138", { roughness: 0.9 }), { cast: false });      // desk mat
        H.box(g, 2.35, 3.75, 2.51, 2.56, 1.3, 1.7, H.mat("#e8e8e8", { roughness: 0.5 }));                       // keyboard
        H.box(g, 4.0, 4.22, 2.51, 2.58, 1.4, 1.72, H.mat("#e8e8e8", { roughness: 0.5 }));                       // mouse
        H.box(g, 0.3, 1.05, 2.5, 4.1, 2.45, 3.85, BLACK());                                                     // PC tower
        H.box(g, 1.05, 1.07, 2.6, 4.0, 2.55, 3.75, H.mat("#88aacc", { roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.55 }), { cast: false });
        H.box(g, 1.0, 1.04, 3.0, 3.6, 3.0, 3.06, H.led("#00e5ff", 1.0, 3.0), { cast: false });
        H.box(g, 1.0, 1.04, 3.0, 3.6, 3.25, 3.31, H.led("#ff3df2", 1.0, 3.0), { cast: false });
        H.glow(g, 1.15, 3.3, 3.15, 1.8, "#7c4dff", 0.6);
        H.light(3.0, 3.6, 0.9, "#9b7bff", 0.9, 5);
      } },

      // ---- 7. chair (rolls in) ----
      { at: 18.4, dur: 1.0, anim: "slide", from: [3, 0, 5], tag: { text: "ERGONOMIC CHAIR", pos: [3.3, 5.0, 3.6] }, build(g) {
        H.cyl(g, 3.1, 0, 3.0, 2.0, 0.03, H.mat("#c9bfb2", { roughness: 1 }), { cast: false });                  // round rug
        const ch = new THREE.Group(); ch.position.set(3.1, 0, 3.1); ch.rotation.y = -0.55; g.add(ch); g = ch;    // chair turned a little
        const cx = 0, cz = 0, base = BLACK(), fab = H.mat("#d8d4ce", { roughness: 0.9 });
        for (let i = 0; i < 5; i++) {
          const a = i * Math.PI * 2 / 5, leg = H.box(g, -0.06, 0.06, 0.18, 0.3, 0, 1.0, base);
          leg.geometry.translate(0, 0, 0.5 - 0.5); leg.position.set(cx + Math.sin(a) * 0.5, 0.24, cz + Math.cos(a) * 0.5); leg.rotation.y = a;
          H.sph(g, cx + Math.sin(a) * 0.95, 0.1, cz + Math.cos(a) * 0.95, 0.1, base);
        }
        H.cyl(g, cx, 0.25, cz, 0.09, 1.25, H.mat("#9aa0a8", { metalness: 0.6, roughness: 0.3 }));
        H.box(g, cx - 0.85, cx + 0.85, 1.5, 1.82, cz - 0.85, cz + 0.85, fab);
        const back = H.box(g, cx - 0.78, cx + 0.78, 1.9, 4.5, cz + 0.72, cz + 0.95, fab); back.rotation.x = -0.12;
        H.box(g, cx - 0.5, cx + 0.5, 4.5, 5.0, cz + 0.95, cz + 1.12, fab);
        [-1, 1].forEach(s => { H.box(g, cx + s * 0.95 - 0.07, cx + s * 0.95 + 0.07, 1.8, 2.6, cz - 0.1, cz + 0.1, base); H.box(g, cx + s * 0.95 - 0.12, cx + s * 0.95 + 0.12, 2.6, 2.7, cz - 0.55, cz + 0.4, base); });
      } },

      // ---- 8. books, plants, lamp ----
      { at: 20.3, dur: 0.6, anim: "pop", pivot: [0.5, 5.4, 2.8], tag: { text: "BOOKS + DECOR", pos: [0.9, 7.1, 1.6] }, build(g) {
        const y0 = 4.26, y1 = 5.43, z0 = 1.0, w = 1.2;
        books(g, 0.08, z0 + 0.05, y0, w - 0.1, 0.75, true, 0.95);
        books(g, 0.08, z0 + w + 0.05, y0, w * 0.55, 0.75, true, 0.9);
        plant(g, 0.5, y0, z0 + w * 1.75, 0.8, "#ffffff");
        books(g, 0.08, z0 + 2 * w + 0.05, y0, w - 0.1, 0.75, true, 0.85);
        plant(g, 0.5, y1, z0 + w * 0.5, 0.8, "#2d3138");
        books(g, 0.08, z0 + w + 0.05, y1, w - 0.1, 0.75, true, 0.95);
        H.box(g, 0.2, 0.9, y1, y1 + 0.45, z0 + 2 * w + 0.2, z0 + 3 * w - 0.2, H.mat("#c8b49a", { roughness: 0.9 }));
      } },
      { at: 20.9, dur: 0.6, anim: "pop", pivot: [4.4, 4.6, 0.5], build(g) {
        books(g, 3.05, 0.22, 4.63, 1.3, 0.7, false, 0.9);
        plant(g, 5.3, 4.63, 0.55, 0.75, "#ffffff");
        H.box(g, 3.2, 3.95, 5.88, 6.05, 0.25, 0.85, H.mat("#c44536")); H.box(g, 3.25, 3.9, 6.05, 6.2, 0.28, 0.82, H.mat("#264653"));
        H.box(g, 4.4, 5.3, 5.88, 6.75, 0.2, 0.26, H.mat("#2d3138")); H.box(g, 4.48, 5.22, 5.96, 6.67, 0.26, 0.27, H.mat("#e9c46a"));
        H.cyl(g, 5.55, 5.88, 0.55, 0.16, 0.6, H.mat("#ffffff", { roughness: 0.3 }), { rTop: 0.1 });
      } },
      { at: 21.6, dur: 0.7, anim: "pop", pivot: [0.8, 2.5, 4.4], tag: { text: "DESK LAMP", pos: [1.2, 4.6, 4.5] }, build(g) {
        const m = BLACK();
        H.cyl(g, 0.7, 2.5, 4.5, 0.32, 0.08, m);
        const a1 = H.box(g, -0.04, 0.04, 0, 1.3, -0.04, 0.04, m); a1.geometry.translate(0, 0.65 - 0.65, 0); a1.position.set(0.7, 3.2, 4.5); a1.rotation.x = 0.35;
        const a2 = H.box(g, -0.04, 0.04, 0, 1.0, -0.04, 0.04, m); a2.position.set(0.95, 3.95, 4.15); a2.rotation.z = -1.0;
        H.cyl(g, 1.3, 3.75, 4.15, 0.28, 0.4, m, { rTop: 0.08 });
        H.sph(g, 1.3, 3.72, 4.15, 0.12, H.led("#fff1c1", 0.3, 3.0));
        H.glow(g, 1.3, 3.55, 4.15, 2.4, "#ffd27a", 0.7);
        H.light(1.3, 3.4, 4.15, "#ffd27a", 1.2, 5);
        plant(g, 6.7, 0, 0.75, 2.0, "#ffffff");                                                                // floor plant
      } }
    ]
  };
})();
