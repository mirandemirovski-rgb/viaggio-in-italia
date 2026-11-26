// The Pergamena map: layers, pan & zoom, cards, lantern, opening sequence.
import { GEO } from './geo.js';
import * as P from './places.js';
import { el, rnd, reseed, mountain, hill, tree, cypress, town, LANDMARK, ship, serpent, rose, rhumbs, gattoMatto } from './glyphs.js';

const RAD = Math.PI / 180;
export function project(lon, lat) {
  return [GEO.tx + GEO.s * lon * RAD, GEO.ty - GEO.s * Math.log(Math.tan(Math.PI / 4 + lat * RAD / 2))];
}
const pp = (pts) => pts.map(([lo, la]) => project(lo, la));
const r1 = (n) => Math.round(n * 10) / 10;

// Catmull-Rom → cubic Bézier, for rivers and lakes
function smooth(pts, closed) {
  const p = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${r1(p[1][0])},${r1(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    d += `C${r1(p1[0] + (p2[0] - p0[0]) / 6)},${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)},${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])},${r1(p2[1])}`;
  }
  return d + (closed ? 'Z' : '');
}

function along(pts, step) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [a, b] = pts[i], [c, d] = pts[i + 1];
    const n = Math.max(1, Math.round(Math.hypot(c - a, d - b) / step));
    for (let k = 0; k < n; k++) out.push([a + (c - a) * k / n, b + (d - b) * k / n]);
  }
  out.push(pts[pts.length - 1]);
  return out;
}

const AOSTA_KEYS = ['stop:aosta', 'lm:arco', 'city:aosta'];
const ease = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function createMap(svg, { onCard, onHideCard, onEnter }) {
  const W = GEO.W, H = GEO.H;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  svg.innerHTML = '';
  reseed(20261125);

  /* ---------- defs ---------- */
  const defs = el(svg, 'defs');
  const waves = el(defs, 'pattern', { id: 'waves', width: 74, height: 48, patternUnits: 'userSpaceOnUse' });
  el(waves, 'path', { class: 'wave', d: 'M8,14q3,-3 6,0t6,0M44,38q3,-3 6,0t6,0' });
  const waves2 = el(defs, 'pattern', { id: 'waves2', width: 118, height: 86, patternUnits: 'userSpaceOnUse', patternTransform: 'translate(31 19)' });
  el(waves2, 'path', { class: 'wave', d: 'M10,20q2.5,-2.5 5,0t5,0t5,0M70,62q2.5,-2.5 5,0t5,0' });
  const hatch = el(defs, 'pattern', { id: 'hatch', width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(35)' });
  el(hatch, 'path', { class: 'hatch', d: 'M0,0V6' });
  const clip = el(defs, 'clipPath', { id: 'landClip' });
  el(clip, 'path', { d: GEO.italy });
  const lg = el(defs, 'radialGradient', { id: 'lampGrad' });
  el(lg, 'stop', { offset: '0', 'stop-color': '#fff' });
  el(lg, 'stop', { offset: '.55', 'stop-color': '#fff', 'stop-opacity': '.85' });
  el(lg, 'stop', { offset: '1', 'stop-color': '#000' });
  const mask = el(defs, 'mask', { id: 'lampMask', maskUnits: 'userSpaceOnUse', x: -2000, y: -2000, width: 6000, height: 6000 });
  el(mask, 'rect', { x: -2000, y: -2000, width: 6000, height: 6000, fill: '#000' });
  const lamp = el(mask, 'circle', { cx: -999, cy: -999, r: 120, fill: 'url(#lampGrad)' });

  const [ax, ay] = project(P.STOPS[0].lon, P.STOPS[0].lat);
  const [tox, toy] = project(7.69, 45.07);
  const fade = el(defs, 'linearGradient', { id: 'routeFade', gradientUnits: 'userSpaceOnUse', x1: ax, y1: ay, x2: ax + (tox - ax) * .55, y2: ay + (toy - ay) * .55 });
  el(fade, 'stop', { offset: '0', 'stop-color': 'var(--wax)', 'stop-opacity': '.9' });
  el(fade, 'stop', { offset: '1', 'stop-color': 'var(--wax)', 'stop-opacity': '0' });

  /* ---------- layers ---------- */
  const L = (cls) => el(svg, 'g', { class: cls });
  const gSea = L('L-sea');
  const gCoast = L('L-land');
  const gCoastLine = L('L-coastline');
  const gFog = L('L-land');
  const gLand = L('L-land');
  const gWater = L('L-relief');
  const gRegions = L('L-relief');
  const gRelief = L('L-relief');
  const gMarks = L('L-towns');
  const gTowns = L('L-towns');
  const gSeaDeco = L('L-deco');
  const gLabels = L('L-towns');
  const gRoute = L('L-route');
  const gGM = L('L-gm');
  const gInk = el(svg, 'g', { class: 'hidden-ink', mask: 'url(#lampMask)' });

  // sea
  el(gSea, 'rect', { class: 'sea', x: -2000, y: -2000, width: W + 4000, height: H + 4000 });
  el(gSea, 'rect', { x: -2000, y: -2000, width: W + 4000, height: H + 4000, fill: 'url(#waves)' });
  el(gSea, 'rect', { x: -2000, y: -2000, width: W + 4000, height: H + 4000, fill: 'url(#waves2)' });
  const rs = project(P.ROSE.lon, P.ROSE.lat), rs2 = project(P.ROSE2.lon, P.ROSE2.lat);
  rhumbs(gSea, rs[0], rs[1], 2400);
  rhumbs(gSea, rs2[0], rs2[1], 2400);
  // the folds of an old sheet
  el(gSea, 'path', { class: 'fold-hi', d: `M${W / 2},-2000V${H + 2000}M-2000,${H / 2}H${W + 2000}` });
  el(gSea, 'path', { class: 'fold-lo', d: `M${W / 2 + 1.4},-2000V${H + 2000}M-2000,${H / 2 + 1.4}H${W + 2000}` });

  // neighbouring lands, faded: terra incognita
  for (const f of GEO.fog) {
    el(gFog, 'path', { class: 'fog', d: f.d });
    el(gFog, 'path', { d: f.d, fill: 'url(#hatch)' });
  }
  for (const f of P.FOG_LABELS) {
    const [x, y] = project(f.lon, f.lat);
    el(gFog, 'text', { class: f.small ? 'fog-lbl small' : 'fog-lbl', x: r1(x), y: r1(y), 'text-anchor': 'middle' }, f.t);
  }

  // water-lining around the coast, the way old engravers did it
  for (let i = 6; i >= 1; i--) {
    el(gCoast, 'path', { class: 'wl-ink', d: GEO.italy, 'stroke-width': i * 5.2 + 1, style: `stroke-opacity:${(.42 * (1 - (i - 1) / 6.5)).toFixed(2)}` });
    el(gCoast, 'path', { class: 'wl-sea', d: GEO.italy, 'stroke-width': i * 5.2 });
  }

  // Italy
  el(gLand, 'path', { class: 'land', d: GEO.italy });
  const tint = el(gLand, 'g', { 'clip-path': 'url(#landClip)' });
  el(tint, 'path', { class: 'coast-tint', d: GEO.italy });
  if (GEO.sanMarino) el(gLand, 'path', { class: 'land sm', d: GEO.sanMarino, 'data-card': 'lm:sanmarino' });
  el(gCoastLine, 'path', { class: 'coast', d: GEO.italy, pathLength: 1 });
  const landPath = el(defs, 'path', { d: GEO.italy });
  const inside = (x, y) => { try { return landPath.isPointInFill(new DOMPoint(x, y)); } catch { return true; } };

  // rivers and lakes
  P.RIVERS.forEach((rv, i) => {
    el(gWater, 'path', { class: 'river', d: smooth(pp(rv.pts)), 'data-card': 'river:' + i });
    const [lx, ly] = project(...rv.label);
    el(gWater, 'text', { class: 'river-lbl', x: r1(lx), y: r1(ly), 'text-anchor': 'middle', 'data-card': 'river:' + i }, rv.it.replace(/^il |^l’/, ''));
  });
  P.LAKES.forEach((lk, i) => el(gWater, 'path', { class: 'lake', d: smooth(pp(lk.pts), true), 'data-card': 'lake:' + i }));

  // regions
  for (const [name, lon, lat] of P.REGIONS) {
    const [x, y] = project(lon, lat);
    el(gRegions, 'text', { class: 'region', x: r1(x), y: r1(y), 'text-anchor': 'middle' }, name);
  }

  /* ---------- relief, woods, vineyards: drawn back to front ---------- */
  const avoid = [];
  P.CITIES.forEach(c => avoid.push([...project(c.lon, c.lat), c.size >= 3 ? 20 : 15]));
  P.LANDMARKS.forEach(l => { if (l.g !== 'none') avoid.push([...project(l.lon, l.lat), 20]); });
  avoid.push([ax + 17, ay - 10, 24]);
  P.LAKES.forEach(lk => pp(lk.pts).forEach(([x, y]) => avoid.push([x, y, 5])));
  const free = (x, y, pad = 0) => avoid.every(([ax2, ay2, r]) => Math.hypot(x - ax2, y - ay2) > r + pad);

  const ops = [];
  along(pp(P.ALPS), 8).forEach(([x, y], i) => {
    if (rnd() < .12) return;
    const jx = x + (rnd() - .5) * 6, jy = y + (i % 3 === 0 ? 5 : i % 3 === 1 ? -3 : 1) + (rnd() - .5) * 4;
    const h = rnd() < .2 ? 24 + rnd() * 8 : 13 + rnd() * 9;
    if (free(jx, jy, 4) && inside(jx, jy + 2)) ops.push([jy, () => mountain(gRelief, jx, jy, h, h * (.45 + rnd() * .2), true)]);
  });
  along(pp(P.PREALPS), 10).forEach(([x, y]) => {
    const jx = x + (rnd() - .5) * 5, jy = y + (rnd() - .5) * 4;
    if (free(jx, jy, 2) && inside(jx, jy)) ops.push([jy, () => mountain(gRelief, jx, jy, 9 + rnd() * 5, 6 + rnd() * 3, false)]);
  });
  along(pp(P.APENNINES), 10.5).forEach(([x, y], i) => {
    const jx = x + (i % 2 ? 3 : -3) + (rnd() - .5) * 3, jy = y + (rnd() - .5) * 3;
    if (!free(jx, jy, 2) || !inside(jx, jy)) return;
    const big = Math.hypot(jx - project(13.57, 42.47)[0], jy - project(13.57, 42.47)[1]) < 22;
    ops.push([jy, big ? () => mountain(gRelief, jx, jy, 17, 9, true) : () => hill(gRelief, jx, jy, 7 + rnd() * 2.5, 4 + rnd() * 2)]);
  });
  P.ISLAND_HILLS.forEach(line => along(pp(line), 11).forEach(([x, y]) => {
    if (free(x, y, 2) && inside(x, y)) ops.push([y, () => hill(gRelief, x, y, 7, 4.5)]);
  }));
  for (const [lon, lat, n] of P.FORESTS) {
    const [cx, cy] = project(lon, lat);
    for (let k = 0; k < n; k++) {
      const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * (8 + n * 1.1);
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * .7;
      if (inside(x, y) && free(x, y)) ops.push([y, () => tree(gRelief, x, y, 3.6 + rnd() * 1.4)]);
    }
  }
  for (const [lon, lat] of P.CYPRESSES) {
    const [cx, cy] = project(lon, lat);
    for (let k = 0; k < 3; k++) {
      const x = cx + k * 3.4 + rnd() * 1.5, y = cy + rnd() * 2;
      if (inside(x, y) && free(x, y)) ops.push([y, () => cypress(gRelief, x, y, 3.4 + rnd())]);
    }
  }
  // a few lonely trees across the land
  for (let k = 0; k < 220; k++) {
    const x = 380 + rnd() * 840, y = 60 + rnd() * 1060;
    if (inside(x, y) && free(x, y, 6)) ops.push([y, () => tree(gRelief, x, y, 3 + rnd())]);
  }
  ops.sort((a, b) => a[0] - b[0]).forEach(([, fn]) => fn());

  /* ---------- landmarks and towns ---------- */
  const lmById = Object.fromEntries(P.LANDMARKS.map(l => [l.id, l]));
  for (const l of P.LANDMARKS) {
    if (l.g === 'none' || l.id === 'arco') continue;
    const [x, y] = project(l.lon, l.lat);
    const g = el(gMarks, 'g', { class: 'lm', 'data-card': 'lm:' + l.id });
    LANDMARK[l.g](g, x, y);
    el(g, 'circle', { class: 'hit', cx: r1(x), cy: r1(y - 8), r: 15 });
  }
  for (const l of P.LANDMARKS.filter(l => l.g === 'none')) {
    const [x, y] = project(l.lon, l.lat);
    el(gMarks, 'circle', { class: 'hit', cx: r1(x), cy: r1(y), r: 9, 'data-card': 'lm:' + l.id });
  }

  const landmarkAt = (c) => c.lm || P.LANDMARKS.find(l => l.g !== 'none' && Math.abs(l.lon - c.lon) < .03 && Math.abs(l.lat - c.lat) < .03)?.id;
  const sizes = [0, 11, 13, 15, 19];
  for (const c of P.CITIES) {
    const [x, y] = project(c.lon, c.lat);
    const hasLm = landmarkAt(c);
    if (c.id === 'aosta') {
      const g = el(gTowns, 'g', { class: 'lm', 'data-card': 'lm:arco' });
      LANDMARK.arch(g, x, y);
      el(g, 'circle', { class: 'hit', cx: x, cy: y - 8, r: 13 });
    } else if (!hasLm) {
      const g = el(gTowns, 'g', { 'data-card': 'city:' + c.id });
      town(g, x, y, c.size);
      el(g, 'circle', { class: 'hit', cx: r1(x), cy: r1(y - 5), r: 11 });
    }
    const anchor = c.anchor || 'start';
    const dx = c.dx ?? 10, dy = c.dy ?? 5;
    el(gLabels, 'text', { class: 'city-lbl', x: r1(x + dx), y: r1(y + dy), 'text-anchor': anchor, 'font-size': sizes[c.size], 'data-card': 'city:' + c.id }, c.it);
  }

  // seas
  P.SEAS.forEach((s, i) => {
    const [x, y] = project(s.lon, s.lat);
    el(gSeaDeco, 'text', { class: 'sea-lbl', x: r1(x), y: r1(y), 'font-size': s.size, 'text-anchor': 'middle', transform: s.rot ? `rotate(${s.rot} ${r1(x)} ${r1(y)})` : undefined, 'data-card': 'sea:' + i }, s.it);
  });

  // wind roses
  rose(el(gSeaDeco, 'g', { class: 'rose' }), rs[0], rs[1], P.ROSE.r, P.WINDS);
  rose(el(gSeaDeco, 'g', { class: 'rose small' }), rs2[0], rs2[1], P.ROSE2.r);

  // sea serpent and ships
  const [sx, sy] = project(P.SERPENT.lon, P.SERPENT.lat);
  const serp = el(gSeaDeco, 'g', { class: 'serpent', 'data-card': 'serpent' });
  serpent(serp, sx, sy);
  el(serp, 'rect', { class: 'hit', x: sx - 46, y: sy - 26, width: 90, height: 30 });
  const ships = P.SHIPS.map(s => {
    const pts = pp(s.pts);
    const segs = []; let total = 0;
    for (let i = 0; i < pts.length - 1; i++) { const len = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); segs.push([pts[i], pts[i + 1], len]); total += len; }
    const g = el(gSeaDeco, 'g', { class: 'ship', 'data-card': 'ship' });
    const inner = el(g, 'g');
    ship(inner);
    el(inner, 'rect', { class: 'hit', x: -16, y: -26, width: 32, height: 32 });
    return { g, inner, segs, total, dur: s.dur * 1000, off: rnd() };
  });

  // cartouche
  drawCartouche(el(gSeaDeco, 'g', { class: 'cartouche' }), 1040, 36, 404, 228);
  drawScale(el(gSeaDeco, 'g', { class: 'scalebar' }), 1150, 1150);

  /* ---------- the route so far ---------- */
  const [gx, gy] = project(P.START.lon, P.START.lat);
  el(gRoute, 'path', { class: 'route-walked', d: `M${r1(gx)},${r1(gy)}Q${r1(gx + 2)},${r1(gy + 10)} ${r1(ax - 3)},${r1(ay - 4)}` });
  el(gRoute, 'path', { class: 'route-next', d: `M${r1(ax)},${r1(ay + 4)}Q${r1(ax + 6)},${r1(ay + 40)} ${r1(tox)},${r1(toy)}` });
  const seal = el(gRoute, 'g', { class: 'seal', 'data-card': 'stop:aosta', tabindex: 0, role: 'button', 'aria-label': 'Aosta, tappa 1. Entra' });
  el(seal, 'circle', { class: 'seal-pulse', cx: r1(ax), cy: r1(ay + 9), r: 7 });
  el(seal, 'circle', { class: 'seal-wax', cx: r1(ax), cy: r1(ay + 9), r: 6.6 });
  el(seal, 'circle', { class: 'seal-ring', cx: r1(ax), cy: r1(ay + 9), r: 4.6 });
  el(seal, 'text', { class: 'seal-num', x: r1(ax), y: r1(ay + 11.6), 'text-anchor': 'middle' }, 'I');
  seal.addEventListener('click', (e) => { e.stopPropagation(); if (!dragged && e.pointerType !== 'touch') onEnter('aosta'); });
  seal.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onEnter('aosta'); } });

  // Orfeo, at the pass first
  const gm = gattoMatto(gGM, gx, gy + 2, .12);
  const gmTarget = [ax + 17, ay + 3];

  /* ---------- invisible ink ---------- */
  for (const h of P.HIDDEN) {
    const [x, y] = project(h.lon, h.lat);
    const t = el(gInk, 'text', { class: 'ink', x: r1(x), y: r1(y), 'font-size': h.size, 'text-anchor': 'middle',
      transform: `${h.rot ? `rotate(${h.rot} ${r1(x)} ${r1(y)}) ` : ''}${h.mirror ? `translate(${r1(2 * x)} 0) scale(-1 1)` : ''}`.trim() || undefined }, h.t);
    if (h.mark) {
      el(gInk, 'path', { class: 'ink-mark', d: `M${x - 18},${y + 16}c6,-10 12,10 18,0s12,10 18,0M${x - 18},${y + 22}c6,-10 12,10 18,0s12,10 18,0M${x - 18},${y + 28}c6,-10 12,10 18,0s12,10 18,0` });
      el(gInk, 'circle', { class: 'ink-mark', cx: x, cy: y + 22, r: 26 });
    }
  }

  /* ---------- view: pan & zoom ---------- */
  const view = { x: 0, y: 0, w: W, h: H };
  const ITALY = { x: 360, y: 50, w: 880, h: 1150 };
  let lampR = 120;
  const box = () => svg.getBoundingClientRect();
  function aspect() { const r = box(); return Math.max(1, r.width) / Math.max(1, r.height); }
  function apply() {
    svg.setAttribute('viewBox', `${r1(view.x)} ${r1(view.y)} ${r1(view.w)} ${r1(view.h)}`);
    const px = view.w / Math.max(1, box().width);
    lampR = 150 * px;
    lamp.setAttribute('r', r1(lampR));
    svg.style.setProperty('--px', px);
  }
  function clamp(v) {
    const a = aspect();
    v.h = v.w / a;
    const maxW = Math.max(W * 1.25, H * 1.25 * a), minW = 240;
    if (v.w > maxW) { const cx = v.x + v.w / 2, cy = v.y + v.h / 2; v.w = maxW; v.h = v.w / a; v.x = cx - v.w / 2; v.y = cy - v.h / 2; }
    if (v.w < minW) { const cx = v.x + v.w / 2, cy = v.y + v.h / 2; v.w = minW; v.h = v.w / a; v.x = cx - v.w / 2; v.y = cy - v.h / 2; }
    const mx = 260, my = 220;
    v.x = Math.min(Math.max(v.x, -mx - Math.max(0, v.w - W) / 2), W + mx - v.w + Math.max(0, v.w - W) / 2);
    v.y = Math.min(Math.max(v.y, -my - Math.max(0, v.h - H) / 2), H + my - v.h + Math.max(0, v.h - H) / 2);
    return v;
  }
  function fitBox(b, pad = 1.04) {
    const a = aspect();
    let w = b.w * pad, h = b.h * pad;
    if (w / h < a) w = h * a; else h = w / a;
    return clamp({ x: b.x + b.w / 2 - w / 2, y: b.y + b.h / 2 - h / 2, w, h });
  }
  let anim = null, skipped = false;
  function animateTo(target, dur = 1400) {
    if (reduced || skipped || dur === 0) { Object.assign(view, target); apply(); return Promise.resolve(); }
    const from = { ...view };
    const t0 = performance.now();
    cancelAnimationFrame(anim);
    return new Promise(res => {
      const step = (t) => {
        const k = ease(Math.min(1, (t - t0) / dur));
        for (const key of ['x', 'y', 'w', 'h']) view[key] = from[key] + (target[key] - from[key]) * k;
        apply();
        if (k < 1) anim = requestAnimationFrame(step); else res();
      };
      anim = requestAnimationFrame(step);
    });
  }
  const toWorld = (cx, cy) => {
    const r = svg.getBoundingClientRect();
    return [view.x + (cx - r.left) / r.width * view.w, view.y + (cy - r.top) / r.height * view.h];
  };
  function zoomAt(cx, cy, f) {
    const [wx, wy] = toWorld(cx, cy);
    const nw = view.w / f;
    const r = svg.getBoundingClientRect();
    const fx = (cx - r.left) / r.width, fy = (cy - r.top) / r.height;
    const v = clamp({ x: wx - fx * nw, y: wy - fy * (nw / aspect()), w: nw, h: nw / aspect() });
    Object.assign(view, v); apply();
  }

  svg.addEventListener('wheel', (e) => {
    e.preventDefault(); cancelAnimationFrame(anim);
    zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * (e.ctrlKey ? .01 : .0016)));
  }, { passive: false });

  const ptrs = new Map();
  let dragged = false, startDist = 0, startW = 0, last = null, downAt = null;
  svg.addEventListener('pointerdown', (e) => {
    ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    cancelAnimationFrame(anim);
    dragged = false; downAt = [e.clientX, e.clientY];
    last = [e.clientX, e.clientY];
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; startDist = Math.hypot(a[0] - b[0], a[1] - b[1]); startW = view.w; }
    if (e.pointerType !== 'mouse') moveLamp(e.clientX, e.clientY);
  });
  svg.addEventListener('pointermove', (e) => {
    moveLamp(e.clientX, e.clientY);
    if (!ptrs.has(e.pointerId)) { hover(e); return; }
    ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()];
      const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      const cx = (a[0] + b[0]) / 2, cy = (a[1] + b[1]) / 2;
      zoomAt(cx, cy, view.w / (startW * startDist / d));
      dragged = true;
      return;
    }
    const dx = e.clientX - last[0], dy = e.clientY - last[1];
    if (!dragged && Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) < 6) return;
    if (!svg.hasPointerCapture?.(e.pointerId)) { try { svg.setPointerCapture(e.pointerId); } catch { /* */ } }
    if (Math.abs(dx) + Math.abs(dy) > 0) {
      const r = svg.getBoundingClientRect();
      view.x -= dx / r.width * view.w; view.y -= dy / r.height * view.h;
      clamp(view); apply();
      last = [e.clientX, e.clientY];
      if (Math.abs(dx) + Math.abs(dy) > 2) { dragged = true; svg.classList.add('dragging'); onHideCard(); }
    }
  });
  const up = (e) => {
    ptrs.delete(e.pointerId);
    svg.classList.remove('dragging');
    if (ptrs.size === 1) last = [...ptrs.values()][0];
    if (!dragged && e.type === 'pointerup' && e.pointerType !== 'mouse') {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const t = el?.closest?.('[data-card]');
      if (t && AOSTA_KEYS.includes(t.dataset.card)) { onEnter('aosta'); return; }
      hover({ target: el || svg, clientX: e.clientX, clientY: e.clientY }, true);
    }
  };
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);
  svg.addEventListener('pointerleave', () => { lamp.setAttribute('cx', -999); onHideCard(); document.body.style.setProperty('--lx', '-999px'); });
  svg.addEventListener('click', (e) => {
    if (dragged || e.pointerType === 'touch' || e.pointerType === 'pen') return;
    const t = e.target.closest('[data-card]');
    if (t && AOSTA_KEYS.includes(t.dataset.card)) onEnter('aosta');
  });

  function moveLamp(cx, cy) {
    const [x, y] = toWorld(cx, cy);
    lamp.setAttribute('cx', r1(x)); lamp.setAttribute('cy', r1(y));
    document.body.style.setProperty('--lx', cx + 'px');
    document.body.style.setProperty('--ly', cy + 'px');
  }
  let lastKey = null;
  function hover(e, tap) {
    const t = e.target.closest && e.target.closest('[data-card]');
    const key = t ? t.dataset.card : null;
    if (!key) { if (lastKey) onHideCard(); lastKey = null; return; }
    lastKey = key;
    onCard(key, e.clientX, e.clientY, tap);
  }

  window.addEventListener('resize', () => { clamp(view); apply(); });

  /* ---------- ships, alive ---------- */
  function tick(t) {
    for (const s of ships) {
      let d = ((t / s.dur + s.off) % 1) * s.total, i = 0;
      while (i < s.segs.length - 1 && d > s.segs[i][2]) { d -= s.segs[i][2]; i++; }
      const [a, b, len] = s.segs[i];
      const k = Math.min(1, d / len);
      const x = a[0] + (b[0] - a[0]) * k, y = a[1] + (b[1] - a[1]) * k;
      const dir = b[0] < a[0] ? -1 : 1;
      s.g.setAttribute('transform', `translate(${r1(x)} ${r1(y)})`);
      s.inner.setAttribute('transform', `scale(${dir} 1) rotate(${(Math.sin(t / 900 + s.off * 9) * 3).toFixed(2)})`);
    }
    requestAnimationFrame(tick);
  }
  if (!reduced) requestAnimationFrame(tick); else tick(0);

  /* ---------- opening sequence ---------- */
  function walkGM(dur = 2600) {
    if (skipped) dur = 1;
    const from = [gx, gy + 2], to = gmTarget, t0 = performance.now();
    gm.classList.add('walking');
    return new Promise(res => {
      const step = (t) => {
        const k = reduced || skipped ? 1 : Math.min(1, (t - t0) / dur);
        const e2 = ease(k);
        const x = from[0] + (to[0] - from[0]) * e2, y = from[1] + (to[1] - from[1]) * e2 + Math.sin(k * Math.PI * 7) * .6;
        gm.setAttribute('transform', `translate(${r1(x - 12)} ${r1(y - 34.8)}) scale(.12)`);
        if (k < 1) requestAnimationFrame(step); else { gm.classList.remove('walking'); res(); }
      };
      requestAnimationFrame(step);
    });
  }
  const aostaView = () => aspect() < 1 ? fitBox({ x: ax - 120, y: ay - 120, w: 260, h: 260 }, 1) : fitBox({ x: ax - 230, y: ay - 150, w: 560, h: 360 }, 1);

  async function intro(full) {
    const wait = (ms) => new Promise(r => setTimeout(r, reduced || skipped ? 0 : ms));
    Object.assign(view, fitBox(ITALY)); apply();
    if (!full || reduced) {
      svg.classList.add('ready', 's1', 's2', 's3', 's4', 's5');
      gm.setAttribute('transform', `translate(${r1(gmTarget[0] - 12)} ${r1(gmTarget[1] - 34.8)}) scale(.12)`);
      svg.classList.add('s6');
      if (!reduced) await animateTo(aostaView(), 1800);
      else Object.assign(view, aostaView()), apply();
      return;
    }
    svg.classList.add('intro');
    await wait(150); svg.classList.add('s1');
    await wait(1500); svg.classList.add('s2');
    await wait(1100); svg.classList.add('s3');
    await wait(900); svg.classList.add('s4');
    await wait(900); svg.classList.add('s5');
    await wait(900);
    await animateTo(aostaView(), 2600);
    svg.classList.add('s6');
    await wait(500);
    await walkGM();
    svg.classList.remove('intro'); svg.classList.add('ready');
  }

  return {
    intro,
    skip() { skipped = true; svg.classList.add('s1', 's2', 's3', 's4', 's5', 's6'); svg.classList.remove('intro'); },
    setSealed() { seal.classList.add('stamped'); },
    home: () => animateTo(fitBox(ITALY), 1200),
    zoomBy: (f) => { const r = svg.getBoundingClientRect(); const v = { ...view }; const nw = v.w / f; animateTo(clamp({ x: v.x + v.w / 2 - nw / 2, y: v.y + v.h / 2 - nw / aspect() / 2, w: nw, h: nw / aspect() }), 400); },
    focusAosta: () => animateTo(aostaView(), 1200),
    zoomIntoAosta: () => animateTo(fitBox({ x: ax - 140, y: ay - 90, w: 280, h: 180 }, 1), 1100),
    lookup: (key) => lookup(key, lmById),
  };
}

function lookup(key, lmById) {
  const [kind, id] = key.split(':');
  if (kind === 'city' || kind === 'stop') {
    const c = P.CITIES.find(x => x.id === id);
    return { it: c.it, en: id === 'aosta' ? 'Tappa 1 · Valle d’Aosta' : '', txt: c.txt, enter: id === 'aosta' };
  }
  if (kind === 'lm') { const l = lmById[id]; return { it: l.it, en: l.en, txt: l.txt, enter: id === 'arco' }; }
  if (kind === 'sea') { const s = P.SEAS[+id]; return { it: s.it, en: 'sea', txt: s.txt }; }
  if (kind === 'river') { const r = P.RIVERS[+id]; return { it: r.it, en: 'river', txt: r.txt }; }
  if (kind === 'lake') { const l = P.LAKES[+id]; return { it: l.it, en: 'lake', txt: l.txt }; }
  if (kind === 'wind') { const w = P.WINDS.find(x => x.it === id); return { it: w.it, en: 'wind', txt: w.txt }; }
  if (kind === 'serpent') return { it: 'il serpente di mare', en: 'the sea serpent', txt: 'Old maps drew monsters where the sea was unknown. Hic sunt dracones: here be dragons.' };
  if (kind === 'ship') return { it: 'la nave', en: 'the ship', txt: 'The red cross on white is the flag of Genova, once a great sea republic.' };
  return null;
}

function drawCartouche(g, x, y, w, h) {
  el(g, 'path', { class: 'cart-shadow', d: `M${x + 6},${y + 8}h${w - 4}v${h - 4}h-${w - 4}Z` });
  el(g, 'rect', { class: 'cart', x, y, width: w, height: h });
  el(g, 'rect', { class: 'k', x: x + 7, y: y + 7, width: w - 14, height: h - 14 });
  el(g, 'rect', { class: 'kt', x: x + 11, y: y + 11, width: w - 22, height: h - 22 });
  for (const [cx, side] of [[x, -1], [x + w, 1]]) {
    el(g, 'ellipse', { class: 'cart-roll', cx, cy: y + h / 2, rx: 11, ry: h / 2 + 4 });
    el(g, 'ellipse', { class: 'kt', cx: cx + side * 2, cy: y + h / 2, rx: 5, ry: h / 2 - 6 });
    el(g, 'path', { class: 'k', d: `M${cx},${y - 4}q${side * 14},-6 ${side * 10},10M${cx},${y + h + 4}q${side * 14},6 ${side * 10},-10` });
  }
  const mx = x + w / 2;
  el(g, 'path', { class: 'k', d: `M${mx - 40},${y + 22}q20,-10 40,0q20,-10 40,0` });
  el(g, 'text', { class: 'cart-title', x: mx, y: y + 84, 'text-anchor': 'middle' }, 'Viaggio in Italia');
  el(g, 'text', { class: 'cart-sub', x: mx, y: y + 116, 'text-anchor': 'middle' }, 'ovvero l’Incantesimo di Orfeo');
  el(g, 'path', { class: 'k', d: `M${mx - 90},${y + 132}H${mx - 8}M${mx + 8},${y + 132}H${mx + 90}` });
  el(g, 'path', { class: 'wax-fill', d: `M${mx},${y + 127}l5,5l-5,5l-5,-5Z` });
  el(g, 'text', { class: 'cart-line', x: mx, y: y + 156, 'text-anchor': 'middle' }, 'Carta per chi impara la lingua del Bel Paese');
  el(g, 'text', { class: 'cart-line it', x: mx, y: y + 176, 'text-anchor': 'middle' }, 'dal livello A1 al livello B1');
  el(g, 'text', { class: 'cart-credit', x: mx, y: y + h - 20, 'text-anchor': 'middle' }, 'Miran Demirovski invenit et delineavit');
}

function drawScale(g, x, y) {
  const u = 15.8; // ≈ 10 nautical miles at mid-Italy latitude
  el(g, 'text', { class: 'scale-lbl', x: x + u * 2.5, y: y - 12, 'text-anchor': 'middle' }, 'Scala di miglia marine');
  for (let i = 0; i < 5; i++) el(g, 'rect', { class: i % 2 ? 'kf' : 'kd-rect', x: x + i * u, y: y - 6, width: u, height: 4 });
  for (let i = 0; i <= 5; i++) el(g, 'text', { class: 'scale-num', x: x + i * u, y: y + 9, 'text-anchor': 'middle' }, String(i * 10));
}
