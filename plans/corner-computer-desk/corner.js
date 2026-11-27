// Corner makeover: L-shaped computer desk with shelves, 6' x 6' corner, white + wood (realistic version).
// Units are feet. Back wall is the plane z = 0 (x runs along it), left wall is x = 0 (z runs along it), floor y = 0.
// Every piece is placed so nothing intersects: run `node plans/engine/render.js plans/corner-computer-desk --check`.
(function () {
  const OAK = () => H.wood("#C9A27A", { tile: 3, clearcoat: 0.3 });
  const OAK_Z = () => H.wood("#C9A27A", { tile: 3, clearcoat: 0.3, rot: Math.PI / 2 });   // grain along z
  const SLAT = () => H.wood("#B98A5E", { tile: 3, rot: Math.PI / 2, dark: "#5e3a1c" });
  const WHITE = () => H.phys("#F6F5F2", { roughness: 0.32, clearcoat: 0.35, clearcoatRoughness: 0.25 });
  const BLACK = () => H.phys("#17191d", { roughness: 0.35, clearcoat: 0.2 });
  const CHROME = () => H.mat("#d6d9de", { metalness: 1, roughness: 0.22 });
  const PAL = ["#8c2f2b", "#1f3b4d", "#2f6b62", "#e8dcc8", "#6b3e26", "#c9a24a", "#3d405b", "#a3a380", "#d08c60", "#5b7065"];
  const obj = name => { H.curObj = name; };
  function rod(g, a, b, r, m) {
    const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b), len = va.distanceTo(vb);
    const mesh = H.cyl(g, 0, 0, 0, r, len, m, { seg: 16 });
    mesh.position.copy(va).add(vb).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vb.clone().sub(va).normalize());
    return mesh;
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
      { id: "clutter", beforeOnly: true, at: 4.5, dur: 0.6, build(g) {
        const card = H.mat("#b08657", { roughness: 0.95 }), tape = H.mat("#d8c39c", { roughness: 0.6 });
        H.rbox(g, 1.8, 3.4, 0, 1.2, 0.8, 2.0, card, 0.02); H.box(g, 1.8, 3.4, 1.2, 1.205, 1.36, 1.44, tape);
        H.rbox(g, 2.2, 3.2, 1.2, 1.9, 1.0, 1.8, card, 0.02);
        const plastic = H.phys("#3a7bd5", { roughness: 0.35, clearcoat: 0.5 });
        H.rbox(g, 4.0, 5.2, 1.4, 1.55, 3.0, 4.2, plastic, 0.05);
        [[4.1, 3.1], [5.1, 3.1], [4.1, 4.1], [5.1, 4.1]].forEach(([x, z]) => H.cyl(g, x, 0, z, 0.06, 1.4, plastic, { rTop: 0.05 }));
        H.contact(g, 2.6, 1.4, 2.4, 1.8, 0.5); H.contact(g, 4.6, 3.6, 1.8, 1.8, 0.35);
      } },

      // ---- 1. wood slat accent wall ----
      { id: "slats", at: 5.2, dur: 2.2, anim: "sweep", tag: { text: "WOOD SLAT WALL", size: "6' wide", pos: [3.1, 7.2, 0.3] }, build(g) {
        H.box(g, 0, 6.2, 0, 8.6, 0.0, 0.05, H.mat("#24201c", { roughness: 0.95 }), { cast: false });
        for (let x = 0.04; x < 6.15; x += 0.22) H.rbox(g, x, x + 0.14, 0, 8.6, 0.05, 0.13, SLAT(), 0.012);
      } },

      // ---- 2. L-shaped desk ----
      { id: "desk", at: 8.5, dur: 0.9, anim: "drop", tag: { text: "L-SHAPE DESK", size: "6' × 5'", pos: [4.6, 2.9, 1.4] }, build(g) {
        H.rbox(g, 0, 6.0, 2.38, 2.5, 0.13, 2.13, OAK(), 0.035);
        H.rbox(g, 0, 2.0, 2.38, 2.5, 2.13, 5.0, OAK_Z(), 0.035);
        H.rbox(g, 5.84, 5.98, 0, 2.38, 0.2, 2.06, WHITE(), 0.02);
        H.rbox(g, 2.1, 5.84, 1.55, 2.38, 0.16, 0.22, WHITE(), 0.015);
        H.box(g, 0.25, 5.75, 2.33, 2.37, 0.135, 0.155, H.led("#ffb35c", 0.15, 2.6), { cast: false, noCheck: true });
        H.glowLine(g, [0.5, 2.15, 0.3], [5.5, 2.15, 0.3], 10, 1.4, "#ffb35c", 0.5);
        H.contact(g, 5.91, 1.13, 0.6, 2.4, 0.45);
      } },

      // ---- 3. drawer unit under the left wing ----
      { id: "drawers", at: 10.2, dur: 0.8, anim: "slide", from: [0, 0, 5], tag: { text: "3 DRAWERS", pos: [1.7, 1.7, 4.3] }, build(g) {
        H.rbox(g, 0.1, 1.6, 0, 2.37, 3.45, 4.95, WHITE(), 0.03);
        for (let i = 0; i < 3; i++) {
          const y = 0.1 + i * 0.75;
          H.rbox(g, 1.6, 1.66, y, y + 0.7, 3.5, 4.9, H.phys("#EFEEEB", { roughness: 0.3, clearcoat: 0.35 }), 0.015);
          H.rbox(g, 1.66, 1.71, y + 0.52, y + 0.57, 3.95, 4.45, CHROME(), 0.012);
        }
        H.contact(g, 0.9, 4.2, 2.2, 2.2, 0.5);
      } },

      // ---- 4. floating shelves with LED ----
      { id: "shelves", at: 12.2, dur: 1.0, anim: "drop", tag: { text: "FLOATING SHELVES", size: "3' each", pos: [4.4, 6.4, 0.6] }, build(g) {
        [4.5, 5.75].forEach(y => {
          H.rbox(g, 2.9, 5.9, y, y + 0.13, 0.13, 1.0, OAK(), 0.025);
          H.box(g, 3.0, 5.8, y - 0.02, y, 0.72, 0.78, H.led("#ffb35c", 0.15, 2.6), { cast: false, noCheck: true });
          H.glowLine(g, [3.1, y - 0.15, 0.8], [5.7, y - 0.15, 0.8], 6, 1.2, "#ffb35c", 0.45);
        });
        H.light(4.4, 4.3, 0.9, "#ffb35c", 1.4, 6);
      } },

      // ---- 5. wall cubbies (3 x 2) on the left wall ----
      { id: "cubbies", at: 13.9, dur: 0.9, anim: "slide", from: [4, 0, 0], tag: { text: "WALL CUBBIES", size: "6 boxes", pos: [1.0, 7.0, 2.8] }, build(g) {
        const m = WHITE();
        H.box(g, 0, 0.03, 4.2, 6.6, 1.0, 4.6, H.phys("#E9E6E0", { roughness: 0.5 }));
        [[4.2, 4.26], [5.37, 5.43], [6.54, 6.6]].forEach(([a, b]) => H.rbox(g, 0.03, 1.0, a, b, 1.0, 4.6, m, 0.012));
        [1.0, 2.2, 3.4, 4.54].forEach(z => H.rbox(g, 0.03, 1.0, 4.26, 6.54, z, z + 0.06, m, 0.012));
      } },

      // ---- 6. monitor, keyboard, mouse, PC ----
      { id: "monitor", at: 16.4, dur: 0.7, anim: "pop", pivot: [3.4, 2.5, 0.8], tag: { text: "27\" MONITOR + PC", pos: [3.4, 4.75, 0.7] }, build(g) {
        obj("monitor");
        H.rbox(g, 3.1, 3.7, 2.5, 2.54, 0.35, 0.85, CHROME(), 0.02);
        H.rbox(g, 3.33, 3.47, 2.54, 3.3, 0.4, 0.5, CHROME(), 0.03);
        H.rbox(g, 2.25, 4.55, 3.0, 4.35, 0.5, 0.6, BLACK(), 0.03);
        const wall = H.canvasTex(1024, 600, (c, w, h) => {
          const sky = c.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, "#1b2a4a"); sky.addColorStop(0.55, "#e0786a"); sky.addColorStop(1, "#f6c28b");
          c.fillStyle = sky; c.fillRect(0, 0, w, h);
          c.fillStyle = "#f9e1a8"; c.beginPath(); c.arc(w * 0.68, h * 0.55, 46, 0, Math.PI * 2); c.fill();
          [["#3b2f4a", 0.62], ["#2a2238", 0.74], ["#1a1626", 0.86]].forEach(([col, base], k) => {
            c.fillStyle = col; c.beginPath(); c.moveTo(0, h);
            for (let x = 0; x <= w; x += 32) c.lineTo(x, h * base - Math.abs(Math.sin(x * 0.006 + k * 2)) * h * 0.16 - Math.sin(x * 0.02 + k) * 10);
            c.lineTo(w, h); c.fill();
          });
          c.fillStyle = "rgba(10,10,20,.55)"; c.fillRect(0, h - 26, w, 26);
          c.fillStyle = "rgba(255,255,255,.9)"; for (let i = 0; i < 6; i++) c.fillRect(w / 2 - 110 + i * 40, h - 20, 24, 14);
        });
        const screen = new THREE.MeshStandardMaterial({ map: wall, emissive: new THREE.Color("#ffffff"), emissiveMap: wall, emissiveIntensity: 0.75, roughness: 0.25 });
        H.plane(g, 2.24, 1.29, screen, [3.4, 3.675, 0.6015], [0, 0, 0], { noCheck: true });
        H.glow(g, 3.4, 3.7, 0.32, 4.2, "#a66cff", 0.6);
        H.contact(g, 3.4, 0.6, 1.0, 0.8, 0.35, 2.501);
        obj("deskmat"); H.rbox(g, 2.2, 4.9, 2.5, 2.515, 1.1, 1.95, H.fabric("#2b2f36"), 0.005);
        obj("keyboard"); H.rbox(g, 2.75, 4.15, 2.515, 2.565, 1.3, 1.72, H.phys("#f1f1ef", { roughness: 0.4 }), 0.018);
        const keys = H.canvasTex(512, 160, (c, w, h) => { c.fillStyle = "#e9e9e6"; c.fillRect(0, 0, w, h); c.fillStyle = "#fbfbfa"; c.strokeStyle = "#cfcfcb";
          for (let r = 0; r < 5; r++) for (let k = 0; k < 15; k++) { const x = 8 + k * 33, y = 8 + r * 30; c.fillRect(x, y, 28, 25); c.strokeRect(x, y, 28, 25); } });
        H.plane(g, 1.34, 0.38, H.mat("#ffffff", { map: keys, roughness: 0.5 }), [3.45, 2.5665, 1.51], [-Math.PI / 2, 0, 0], { noCheck: true });
        obj("mouse"); H.sph(g, 4.45, 2.551, 1.5, 0.1, H.phys("#f1f1ef", { roughness: 0.35, clearcoat: 0.4 }), [0.62, 0.35, 1]);
        obj("mug"); H.cyl(g, 5.25, 2.5, 1.35, 0.14, 0.34, H.phys("#2f6b62", { roughness: 0.3, clearcoat: 0.6 }));
        H.torus(g, 5.41, 2.67, 1.35, 0.07, 0.018, H.phys("#2f6b62", { roughness: 0.3, clearcoat: 0.6 }), [0, 0, 0]);
        H.cyl(g, 5.25, 2.8, 1.35, 0.125, 0.01, H.mat("#3b2416", { roughness: 0.2 }), { cast: false, noCheck: true });
        // PC tower with glass side + RGB fans
        obj("pc");
        H.rbox(g, 0.3, 1.05, 2.5, 4.05, 2.45, 3.85, BLACK(), 0.035);
        [[3.05, 2.9], [3.55, 2.9], [3.05, 3.4], [3.55, 3.4]].forEach(([y, z], k) => {
          H.cyl(g, 1.055, y, z, 0.18, 0.012, H.mat("#0d0d10", { roughness: 0.5 }), { axis: "x", noCheck: true });
          H.torus(g, 1.06, y, z, 0.19, 0.016, H.led(k % 2 ? "#ff3df2" : "#00e5ff", 0.9, 3.0), [0, Math.PI / 2, 0], { noCheck: true });
        });
        H.plane(g, 1.3, 1.45, H.phys("#7f99b3", { roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.28 }), [1.075, 3.27, 3.15], [0, Math.PI / 2, 0], { noCheck: true });
        H.glow(g, 1.25, 3.3, 3.15, 1.8, "#7c4dff", 0.55);
        H.light(3.4, 3.6, 0.9, "#9b7bff", 0.9, 5);
      } },

      // ---- 7. ergonomic chair (rolls in) + round rug ----
      { id: "chair", at: 18.4, dur: 1.0, anim: "slide", from: [3, 0, 5], tag: { text: "ERGONOMIC CHAIR", pos: [3.5, 5.3, 3.8] }, build(g) {
        obj("rug"); H.cyl(g, 3.45, 0, 3.45, 1.75, 0.02, H.fabric("#cfc6b8"), { seg: 64, cast: false });
        obj("chair");
        const ch = new THREE.Group(); ch.position.set(3.45, 0.02, 3.45); ch.rotation.y = 0.2; g.add(ch);
        const fab = H.fabric("#3a3d42"), mesh = H.fabric("#4a4e55"), base = BLACK(), chrome = CHROME();
        for (let i = 0; i < 5; i++) {
          const a = i * Math.PI * 2 / 5, leg = new THREE.Group(); leg.rotation.y = a; ch.add(leg);
          H.rbox(leg, -0.06, 0.06, 0.14, 0.24, 0.1, 0.9, chrome, 0.03);
          H.sph(leg, 0, 0.09, 0.9, 0.09, base);
        }
        H.cyl(ch, 0, 0.12, 0, 0.13, 0.14, chrome);
        H.cyl(ch, 0, 0.26, 0, 0.075, 1.14, chrome);
        H.rbox(ch, -0.35, 0.35, 1.32, 1.45, -0.3, 0.3, base, 0.03);
        H.rbox(ch, -0.85, 0.85, 1.45, 1.77, -0.85, 0.8, fab, 0.14);
        H.rbox(ch, -0.1, 0.1, 1.5, 2.1, 0.62, 0.8, base, 0.04);
        const back = H.rbox(ch, -0.78, 0.78, 1.95, 4.25, 0.8, 0.98, mesh, 0.1); back.rotation.x = -0.08;
        H.rbox(ch, -0.45, 0.45, 4.36, 4.8, 0.98, 1.14, fab, 0.08);
        [-1, 1].forEach(s => {
          H.rbox(ch, s * 0.92 - 0.06, s * 0.92 + 0.06, 1.7, 2.55, -0.05, 0.15, base, 0.03);
          H.rbox(ch, s * 0.92 - 0.12, s * 0.92 + 0.12, 2.55, 2.65, -0.45, 0.35, base, 0.04);
        });
        H.contact(g, 3.45, 3.45, 2.4, 2.4, 0.4, 0.025);
      } },

      // ---- 8. decor: cubbies ----
      { id: "cubbydecor", at: 20.3, dur: 0.6, anim: "pop", pivot: [0.5, 5.4, 2.8], tag: { text: "BOOKS + DECOR", pos: [1.0, 7.1, 1.6] }, build(g) {
        obj("books-c1"); H.books(g, "z", 1.1, 2.14, 4.26, 0.1, 0.8, 0.95, PAL);
        obj("books-c2"); H.books(g, "z", 2.27, 2.82, 4.26, 0.1, 0.8, 0.9, PAL);
        obj("plant-c2"); H.pottedPlant(g, 0.5, 4.26, 3.12, { potR: 0.17, potH: 0.3, spread: 0.22, height: 0.55, leaves: 16, leafSize: 0.16 });
        obj("basket"); H.rbox(g, 0.12, 0.92, 4.26, 4.86, 3.52, 4.46, H.fabric("#b89b72"), 0.05);
        obj("plant-c4"); H.pottedPlant(g, 0.52, 5.43, 1.6, { potR: 0.22, potH: 0.36, pot: "#2e3136", spread: 0.4, height: 0.6, leaves: 24, leafSize: 0.2 });
        obj("books-c5"); H.books(g, "z", 2.27, 3.33, 5.43, 0.1, 0.8, 0.92, PAL);
        obj("stack-c6"); ["#8c2f2b", "#e8dcc8", "#1f3b4d", "#c9a24a"].forEach((c, k) => H.rbox(g, 0.15, 0.9, 5.43 + k * 0.1, 5.53 + k * 0.1, 3.62 - k * 0.02, 4.32 + k * 0.02, H.bookMats(c).cover, 0.01));
        obj("vase-c6"); H.sph(g, 0.52, 5.99, 3.97, 0.14, H.phys("#e6dccd", { roughness: 0.3, clearcoat: 0.5 }), [1, 1.1, 1]);
      } },
      // ---- 9. decor: floating shelves ----
      { id: "shelfdecor", at: 20.9, dur: 0.6, anim: "pop", pivot: [4.4, 4.6, 0.5], build(g) {
        obj("books-s1"); H.books(g, "x", 3.0, 4.3, 4.63, 0.16, 0.75, 0.9, PAL);
        obj("plant-s1"); H.pottedPlant(g, 5.3, 4.63, 0.58, { potR: 0.2, potH: 0.3, spread: 0.32, height: 0.45, leaves: 20, leafSize: 0.17 });
        obj("stack-s2"); ["#3d405b", "#d08c60", "#e8dcc8"].forEach((c, k) => H.rbox(g, 3.1 - k * 0.02, 3.9 + k * 0.02, 5.88 + k * 0.1, 5.98 + k * 0.1, 0.25, 0.85, H.bookMats(c).cover, 0.01));
        obj("frame-s2");
        H.rbox(g, 4.2, 5.1, 5.88, 6.78, 0.25, 0.33, H.wood("#2b211a", { tile: 1, roughness: 0.4 }), 0.015);
        const art = H.canvasTex(256, 256, (c, w, h) => { c.fillStyle = "#f3eee6"; c.fillRect(0, 0, w, h); c.fillStyle = "#d08c60"; c.beginPath(); c.arc(w * 0.42, h * 0.45, 62, 0, Math.PI * 2); c.fill(); c.fillStyle = "#2f6b62"; c.fillRect(w * 0.5, h * 0.5, 90, 80); c.strokeStyle = "#1f3b4d"; c.lineWidth = 6; c.beginPath(); c.moveTo(30, 210); c.bezierCurveTo(90, 150, 160, 240, 230, 180); c.stroke(); });
        H.plane(g, 0.72, 0.72, H.mat("#ffffff", { map: art, roughness: 0.8 }), [4.65, 6.33, 0.3315], [0, 0, 0], { noCheck: true });
        obj("vase-s2"); H.cyl(g, 5.55, 5.88, 0.6, 0.13, 0.5, H.phys("#f2efe9", { roughness: 0.3, clearcoat: 0.5 }), { rTop: 0.08 });
        [[-0.05, 0.02], [0.04, -0.03], [0.0, 0.05], [0.06, 0.04]].forEach(([dx, dz], k) => rod(g, [5.55, 6.3, 0.6], [5.55 + dx * 6, 7.1 + k * 0.08, 0.6 + dz * 6], 0.012, H.mat("#c8b28a", { roughness: 0.9 })));
      } },
      // ---- 10. desk lamp + floor plant ----
      { id: "lamp", at: 21.6, dur: 0.7, anim: "pop", pivot: [1.25, 2.5, 4.45], tag: { text: "DESK LAMP", pos: [2.1, 4.15, 4.4] }, build(g) {
        const m = BLACK();
        obj("lamp");
        H.cyl(g, 1.25, 2.5, 4.45, 0.28, 0.06, m);
        rod(g, [1.25, 2.56, 4.45], [1.45, 3.55, 4.32], 0.028, m);
        rod(g, [1.45, 3.55, 4.32], [1.95, 3.78, 4.22], 0.028, m);
        H.sph(g, 1.45, 3.55, 4.32, 0.05, m);
        const shade = H.cyl(g, 0, 0, 0, 0.2, 0.32, H.phys("#17191d", { roughness: 0.3, side: THREE.DoubleSide }), { rTop: 0.07, open: true });
        shade.position.set(2.0, 3.62, 4.2); shade.rotation.z = 0.35;
        H.sph(g, 2.03, 3.5, 4.2, 0.07, H.led("#fff1c1", 0.3, 3.0), [1, 1, 1], { noCheck: true });
        H.glow(g, 2.05, 3.35, 4.2, 2.2, "#ffd27a", 0.65);
        H.light(2.05, 3.3, 4.2, "#ffd27a", 1.2, 5);
        obj("floorplant"); H.snakePlant(g, 6.75, 0, 0.95, { potR: 0.5, potH: 1.0, height: 2.9, blades: 12 });
        H.contact(g, 6.75, 0.95, 1.5, 1.5, 0.45);
      } }
    ]
  };
})();
