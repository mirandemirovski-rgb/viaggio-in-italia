// Hand-inked drawings for the map. Every function draws in world units.
export const NS = 'http://www.w3.org/2000/svg';

export function el(parent, tag, attrs = {}, text) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) if (attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
  if (text !== undefined) e.textContent = text;
  if (parent) parent.appendChild(e);
  return e;
}

// small deterministic random, so the map looks the same on every visit
let seed = 20261125;
export function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
export function reseed(s) { seed = s; }

const R = (n) => Math.round(n * 10) / 10;

/* ---------- land ---------- */

export function mountain(g, x, y, h, w, snow) {
  el(g, 'path', { class: 'kf', d: `M${R(x - w)},${R(y)}Q${R(x - w * .45)},${R(y - h * .55)} ${R(x)},${R(y - h)}Q${R(x + w * .4)},${R(y - h * .5)} ${R(x + w)},${R(y)}` });
  if (snow) el(g, 'path', { class: 'snow', d: `M${R(x - w * .32)},${R(y - h * .64)}L${R(x)},${R(y - h)}L${R(x + w * .28)},${R(y - h * .68)}L${R(x + w * .1)},${R(y - h * .6)}L${R(x - w * .1)},${R(y - h * .7)}Z` });
  let d = '';
  for (let i = 1; i <= 3; i++) d += `M${R(x + w * .08 * i)},${R(y - h * (1 - .22 * i))}L${R(x + w * (.2 + .16 * i))},${R(y - h * .06)}`;
  el(g, 'path', { class: 'kt', d });
}

export function hill(g, x, y, w, h) {
  el(g, 'path', { class: 'kf', d: `M${R(x - w)},${R(y)}Q${R(x)},${R(y - h * 2)} ${R(x + w)},${R(y)}` });
  el(g, 'path', { class: 'kt', d: `M${R(x + w * .2)},${R(y - h * .75)}L${R(x + w * .55)},${R(y - h * .1)}M${R(x + w * .45)},${R(y - h * .5)}L${R(x + w * .75)},${R(y - h * .05)}` });
}

export function tree(g, x, y, s = 4) {
  el(g, 'path', { class: 'kt', d: `M${R(x)},${R(y)}V${R(y - s * .7)}` });
  el(g, 'circle', { class: 'crown', cx: R(x), cy: R(y - s), r: R(s * .55) });
}

export function cypress(g, x, y, s = 4) {
  el(g, 'path', { class: 'cypress', d: `M${R(x)},${R(y - s * 2.4)}Q${R(x + s * .55)},${R(y - s)} ${R(x + s * .12)},${R(y)}L${R(x - s * .12)},${R(y)}Q${R(x - s * .55)},${R(y - s)} ${R(x)},${R(y - s * 2.4)}Z` });
}

export function olive(g, x, y) {
  el(g, 'path', { class: 'kt', d: `M${R(x)},${R(y)}q-1,-2 .5,-4` });
  el(g, 'ellipse', { class: 'olive', cx: R(x), cy: R(y - 5.5), rx: 4.4, ry: 3 });
}

export function lemonTree(g, x, y) {
  tree(g, x, y, 5);
  for (const [dx, dy] of [[-1.6, -5.4], [1.4, -4.6], [0.2, -6.6]]) el(g, 'circle', { class: 'lemon', cx: R(x + dx), cy: R(y + dy), r: 1.05 });
}

export function vines(g, x, y) {
  for (let r = 0; r < 4; r++) {
    const y0 = y - 7 + r * 4.2, x0 = x - 13 + r * 2.2;
    el(g, 'path', { class: 'kt', d: `M${R(x0)},${R(y0)}l22,-2` });
    for (let i = 0; i < 5; i++) el(g, 'circle', { class: 'grape', cx: R(x0 + 2 + i * 4.6), cy: R(y0 - .4 - i * .42), r: .9 });
  }
}

/* ---------- towns ---------- */

export function town(g, x, y, size) {
  const n = [2, 3, 4, 6][size - 1] || 2;
  const unit = 3.4 + size * .5;
  let cx = x - (n * unit) / 2;
  el(g, 'path', { class: 'kt', d: `M${R(cx - 1)},${R(y)}h${R(n * unit + 2)}` });
  for (let i = 0; i < n; i++) {
    const kind = (i * 7 + size) % 3; // 0 house, 1 tower, 2 church
    const w = unit * (kind === 1 ? .72 : .95), h = unit * (kind === 1 ? 2.3 : kind === 2 ? 1.7 : 1.15) + (i % 2) * 1.2;
    const bx = cx + (unit - w) / 2;
    el(g, 'rect', { class: 'kf', x: R(bx), y: R(y - h), width: R(w), height: R(h) });
    if (kind === 1) el(g, 'path', { class: 'kd', d: `M${R(bx - .4)},${R(y - h)}h${R(w + .8)}v-1.2h-${R(w * .28)}v.6h-${R(w * .24)}v-.6h-${R(w * .3)}v.6h-${R(w * .2)}Z` });
    else el(g, 'path', { class: 'roof', d: `M${R(bx - .6)},${R(y - h)}L${R(bx + w / 2)},${R(y - h - unit * (kind === 2 ? .95 : .6))}L${R(bx + w + .6)},${R(y - h)}Z` });
    if (kind === 2) el(g, 'path', { class: 'kt', d: `M${R(bx + w / 2)},${R(y - h - unit * .95)}v-2.4m-1,1h2` });
    cx += unit;
  }
}

/* ---------- landmarks ---------- */

export const LANDMARK = {
  bigpeak(g, x, y) { mountain(g, x - 9, y + 4, 26, 13, true); mountain(g, x + 6, y + 6, 34, 15, true); },
  horn(g, x, y) {
    el(g, 'path', { class: 'kf', d: `M${x - 10},${y + 5}L${x - 2},${y - 22}L${x + 1},${y - 24}L${x + 10},${y + 5}` });
    el(g, 'path', { class: 'snow', d: `M${x - 5},${y - 10}L${x - 2},${y - 22}L${x + 1},${y - 24}L${x + 4},${y - 12}L${x},${y - 14}Z` });
    el(g, 'path', { class: 'kt', d: `M${x + 1},${y - 20}L${x + 6},${y + 3}M${x + 3},${y - 12}L${x + 8},${y + 3}` });
  },
  pass(g, x, y) {
    el(g, 'rect', { class: 'kf', x: x - 5, y: y - 6, width: 10, height: 6 });
    el(g, 'path', { class: 'roof', d: `M${x - 6},${y - 6}L${x},${y - 10}L${x + 6},${y - 6}Z` });
    el(g, 'path', { class: 'kt', d: `M${x},${y - 10}v-4m-1.5,1.5h3` });
  },
  arch(g, x, y) {
    el(g, 'rect', { class: 'kf', x: x - 9, y: y - 15, width: 18, height: 15 });
    el(g, 'rect', { class: 'kf', x: x - 10.5, y: y - 17.5, width: 21, height: 3 });
    el(g, 'path', { class: 'kd', d: `M${x - 4},${y}V${y - 7}A4,4 0 0 1 ${x + 4},${y - 7}V${y}Z` });
  },
  mole(g, x, y) {
    el(g, 'rect', { class: 'kf', x: x - 6, y: y - 9, width: 12, height: 9 });
    el(g, 'path', { class: 'kf', d: `M${x - 6},${y - 9}Q${x},${y - 21} ${x + 6},${y - 9}Z` });
    el(g, 'path', { class: 'k', d: `M${x},${y - 18}V${y - 36}` });
    el(g, 'circle', { class: 'gold', cx: x, cy: y - 37, r: 1.2 });
  },
  duomo(g, x, y) {
    el(g, 'path', { class: 'kf', d: `M${x - 11},${y}V${y - 10}L${x},${y - 15}L${x + 11},${y - 10}V${y}Z` });
    let d = '';
    for (let i = -5; i <= 5; i++) if (i) d += `M${x + i * 2},${y - 10 - (5 - Math.abs(i))}v-${3 + (i % 2 ? 1 : 3)}`;
    el(g, 'path', { class: 'k', d });
    el(g, 'path', { class: 'k', d: `M${x},${y - 15}V${y - 28}` });
    el(g, 'circle', { class: 'gold', cx: x, cy: y - 29, r: 1.4 });
    el(g, 'path', { class: 'kt', d: `M${x - 7},${y}v-5m4,5v-6m6,6v-6m4,6v-5` });
  },
  arena(g, x, y) {
    el(g, 'ellipse', { class: 'kf', cx: x, cy: y - 4, rx: 12, ry: 5.5 });
    el(g, 'ellipse', { class: 'arches', cx: x, cy: y - 4, rx: 12, ry: 5.5 });
    el(g, 'ellipse', { class: 'kf', cx: x, cy: y - 4.6, rx: 6, ry: 2.4 });
  },
  dolomiti(g, x, y) {
    for (const [dx, h, w] of [[-12, 20, 6], [-3, 28, 6], [7, 23, 7]]) {
      el(g, 'path', { class: 'dolo', d: `M${x + dx - w},${y}L${x + dx - w * .5},${y - h * .7}L${x + dx - w * .2},${y - h}L${x + dx + w * .3},${y - h * .92}L${x + dx + w * .6},${y - h * .6}L${x + dx + w},${y}Z` });
      el(g, 'path', { class: 'kt', d: `M${x + dx},${y - h * .9}L${x + dx + 2},${y - 1}M${x + dx + w * .4},${y - h * .6}L${x + dx + w * .6},${y - 1}` });
    }
  },
  gondola(g, x, y) {
    const b = el(g, 'g', { class: 'rock', style: `transform-origin:${x}px ${y}px` });
    el(b, 'path', { class: 'kd', d: `M${x - 15},${y - 1}Q${x},${y + 5} ${x + 14},${y - 3}L${x + 16},${y - 7}L${x + 12.5},${y - 2.2}Q${x},${y + 1.6} ${x - 12},${y - 1.5}Z` });
    el(b, 'path', { class: 'k', d: `M${x + 6},${y - 1.5}V${y - 10}M${x + 6},${y - 7}l5,9` });
    el(b, 'circle', { class: 'kd', cx: x + 6, cy: y - 11.6, r: 1.6 });
    el(g, 'path', { class: 'kt', d: `M${x - 18},${y + 3}q3,-1.5 6,0t6,0M${x + 4},${y + 4}q3,-1.5 6,0t6,0` });
  },
  campanile(g, x, y) {
    el(g, 'rect', { class: 'kf', x: x - 3, y: y - 22, width: 6, height: 22 });
    el(g, 'rect', { class: 'kd', x: x - 1.6, y: y - 20, width: 1.2, height: 3 });
    el(g, 'rect', { class: 'kd', x: x + .4, y: y - 20, width: 1.2, height: 3 });
    el(g, 'path', { class: 'copper', d: `M${x - 3.6},${y - 22}L${x},${y - 33}L${x + 3.6},${y - 22}Z` });
    el(g, 'circle', { class: 'gold', cx: x, cy: y - 34, r: 1.1 });
  },
  pisa(g, x, y) {
    const t = el(g, 'g', { transform: `rotate(5 ${x} ${y})` });
    el(t, 'rect', { class: 'kf', x: x - 4.5, y: y - 24, width: 9, height: 24, rx: 1 });
    el(t, 'path', { class: 'kt', d: `M${x - 4.5},${y - 5}h9M${x - 4.5},${y - 9}h9M${x - 4.5},${y - 13}h9M${x - 4.5},${y - 17}h9M${x - 4.5},${y - 21}h9` });
    el(t, 'rect', { class: 'kf', x: x - 3, y: y - 28, width: 6, height: 4, rx: .8 });
  },
  cupola(g, x, y) {
    el(g, 'rect', { class: 'kf', x: x - 9, y: y - 7, width: 18, height: 7 });
    el(g, 'path', { class: 'dome', d: `M${x - 9},${y - 7}Q${x - 9},${y - 21} ${x},${y - 23}Q${x + 9},${y - 21} ${x + 9},${y - 7}Z` });
    el(g, 'path', { class: 'kt', d: `M${x - 4},${y - 7}Q${x - 4},${y - 18} ${x},${y - 23}M${x + 4},${y - 7}Q${x + 4},${y - 18} ${x},${y - 23}` });
    el(g, 'rect', { class: 'kf', x: x - 1.6, y: y - 27, width: 3.2, height: 4 });
    el(g, 'circle', { class: 'gold', cx: x, cy: y - 28.5, r: 1 });
  },
  colosseo(g, x, y) {
    el(g, 'path', { class: 'kf', d: `M${x - 15},${y}V${y - 13}Q${x - 3},${y - 16} ${x + 5},${y - 14.5}L${x + 8},${y - 10}L${x + 11},${y - 9.5}L${x + 15},${y - 5}V${y}Z` });
    let d = '';
    for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) {
      const ax = x - 13 + i * 4, ay = y - 1.2 - r * 4;
      if (ax > x + 6 && r > 0) continue;
      if (ax > x + 10 && r === 0) continue;
      d += `M${ax},${ay}v-1.6a1.1,1.1 0 0 1 2.2,0v1.6`;
    }
    el(g, 'path', { class: 'k', d });
  },
  castle(g, x, y) {
    const oct = (cx, cy, r) => Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + i * Math.PI / 4; return `${R(cx + r * Math.cos(a))},${R(cy + r * Math.sin(a))}`; }).join(' ');
    el(g, 'polygon', { class: 'kf', points: oct(x, y - 9, 9) });
    for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; el(g, 'polygon', { class: 'kf', points: oct(x + 9 * Math.cos(a), y - 9 + 9 * Math.sin(a), 2.5) }); }
    el(g, 'polygon', { class: 'court', points: oct(x, y - 9, 4) });
  },
  trulli(g, x, y) {
    for (const [dx, s] of [[-8, 1], [0, 1.25], [8, .9]]) {
      el(g, 'rect', { class: 'white', x: x + dx - 3.5 * s, y: y - 4 * s, width: 7 * s, height: 4 * s });
      el(g, 'path', { class: 'stone', d: `M${x + dx - 3.8 * s},${y - 4 * s}L${x + dx},${y - 11 * s}L${x + dx + 3.8 * s},${y - 4 * s}Z` });
      el(g, 'circle', { class: 'white', cx: x + dx, cy: y - 11.4 * s, r: 1.1 });
    }
  },
  sassi(g, x, y) {
    el(g, 'path', { class: 'k', d: `M${x - 14},${y}L${x + 14},${y - 14}` });
    for (let i = 0; i < 6; i++) {
      const bx = x - 12 + i * 4.3, by = y - 3 - i * 2.2 - (i % 2) * 2;
      el(g, 'rect', { class: 'kf', x: bx, y: by - 4, width: 5, height: 4 });
      el(g, 'rect', { class: 'kd', x: bx + 1.8, y: by - 2.2, width: 1.4, height: 2.2 });
    }
  },
  temple(g, x, y) {
    el(g, 'rect', { class: 'kf', x: x - 13, y: y - 2, width: 26, height: 2 });
    el(g, 'path', { class: 'k', d: `M${x - 10},${y - 2}v-10m5,10v-10m5,10v-10m5,10v-10m5,10v-10` });
    el(g, 'rect', { class: 'kf', x: x - 12, y: y - 15, width: 24, height: 3 });
    el(g, 'path', { class: 'kf', d: `M${x - 12.5},${y - 15}L${x},${y - 21}L${x + 12.5},${y - 15}Z` });
  },
  nuraghe(g, x, y) {
    el(g, 'path', { class: 'kf', d: `M${x - 8},${y}L${x - 5},${y - 16}L${x + 5},${y - 16}L${x + 8},${y}Z` });
    el(g, 'path', { class: 'kt', d: `M${x - 7.4},${y - 3.5}h14.8M${x - 6.7},${y - 7}h13.4M${x - 6},${y - 10.5}h12M${x - 5.4},${y - 13.6}h10.8` });
    el(g, 'path', { class: 'kd', d: `M${x - 1.6},${y}v-4.5h3.2v4.5Z` });
  },
  cinque(g, x, y) {
    el(g, 'path', { class: 'kf', d: `M${x - 13},${y + 2}L${x - 9},${y - 14}L${x + 4},${y - 20}L${x + 13},${y - 9}L${x + 13},${y + 2}Z` });
    const cols = ['#D9A13A', '#C9706A', '#E2C044', '#8E9F68', '#B5603A'];
    cols.forEach((c, i) => {
      const bx = x - 9 + i * 4, by = y - 6 - Math.sin(i * .9) * 6;
      el(g, 'rect', { x: bx, y: by - 4, width: 3.6, height: 4.5, fill: c, class: 'kfc' });
    });
    el(g, 'path', { class: 'kt', d: `M${x - 16},${y + 4}q3,-1.5 6,0t6,0t6,0t6,0` });
  },
  volcano(g, x, y) { volcano(g, x, y, 22, 17, false); },
  etna(g, x, y) { volcano(g, x, y, 28, 22, true); },
  'island-volcano'(g, x, y) {
    volcano(g, x, y, 13, 10, true);
    el(g, 'path', { class: 'kt', d: `M${x - 14},${y + 2}q3,-1.5 6,0t6,0t6,0t6,0` });
  },
  lemons(g, x, y) { lemonTree(g, x - 5, y + 2); lemonTree(g, x + 3, y - 2); lemonTree(g, x + 9, y + 3); },
  olives(g, x, y) { for (const [dx, dy] of [[-9, 2], [0, -3], [8, 3], [-3, 6]]) olive(g, x + dx, y + dy); },
  vines(g, x, y) { vines(g, x, y); },
  none() {},
};

function volcano(g, x, y, h, w, ember) {
  el(g, 'path', { class: 'kf', d: `M${x - w},${y}Q${x - w * .4},${y - h * .5} ${x - w * .16},${y - h}L${x + w * .16},${y - h}Q${x + w * .4},${y - h * .5} ${x + w},${y}` });
  el(g, 'path', { class: 'kt', d: `M${x + w * .1},${y - h * .9}L${x + w * .3},${y - 1}M${x + w * .3},${y - h * .6}L${x + w * .55},${y - 1}` });
  if (ember) el(g, 'ellipse', { class: 'ember', cx: x, cy: y - h, rx: w * .16, ry: 1.2 });
  const s = el(g, 'g', { class: 'smoke' });
  for (let i = 0; i < 4; i++) el(s, 'circle', { class: 'puff', cx: x + 1, cy: y - h - 3, r: 2.6 + i * .5, style: `animation-delay:${-i * 1.6}s` });
}

/* ---------- sea ---------- */

export function ship(g) {
  el(g, 'path', { class: 'kt', d: 'M-22,3q3,-1.5 6,0t6,0M10,4q3,-1.5 6,0' });
  el(g, 'path', { class: 'hull', d: 'M-13,-1Q0,6 13,-1L11,-4H-11Z' });
  el(g, 'path', { class: 'k', d: 'M-3,-4V-24M6,-4V-19M-11,-4L-14,-12' });
  el(g, 'path', { class: 'kf', d: 'M-9,-21Q-3,-19 3,-21L4,-9Q-3,-7 -10,-9Z' });
  el(g, 'path', { class: 'cross', d: 'M-3,-20V-9M-9.4,-15H3.6' });
  el(g, 'path', { class: 'kf', d: 'M2,-17Q6,-15.5 10,-17L10.6,-8Q6,-7 1.6,-8Z' });
  el(g, 'path', { class: 'pennant', d: 'M-3,-24l6,1.5l-6,1.4Z' });
}

export function serpent(g, x, y) {
  const humps = [[-30, 9], [-12, 11], [6, 8]];
  humps.forEach(([dx, r], i) => {
    const h = el(g, 'g', { class: 'hump', style: `animation-delay:${-i * 1.1}s` });
    el(h, 'path', { class: 'scales', d: `M${x + dx - r},${y}A${r},${r * 1.1} 0 0 1 ${x + dx + r},${y}` });
    el(h, 'path', { class: 'kt', d: `M${x + dx - r * .5},${y - r * .7}l2,2M${x + dx},${y - r}l2,2M${x + dx + r * .5},${y - r * .7}l2,2` });
  });
  const head = el(g, 'g', { class: 'hump', style: 'animation-delay:-3.3s' });
  el(head, 'path', { class: 'scales', d: `M${x + 18},${y}Q${x + 18},${y - 18} ${x + 26},${y - 22}Q${x + 36},${y - 24} ${x + 38},${y - 17}Q${x + 31},${y - 16} ${x + 28},${y - 12}Q${x + 25},${y - 6} ${x + 26},${y}` });
  el(head, 'circle', { class: 'kd', cx: x + 30, cy: y - 19.5, r: 1 });
  el(head, 'path', { class: 'fin', d: `M${x + 22},${y - 16}l-6,-6l2,7l-5,-2l5,5` });
  el(g, 'path', { class: 'kt', d: `M${x - 44},${y + 1}q4,-2 8,0t8,0t8,0t8,0t8,0t8,0t8,0t8,0t8,0t8,0` });
}

export function rose(g, x, y, r, winds, onWind) {
  for (let i = 0; i < 32; i++) {
    const a = i * Math.PI / 16;
    el(g, 'path', { class: 'kt', d: `M${R(x + Math.sin(a) * r * .93)},${R(y - Math.cos(a) * r * .93)}L${R(x + Math.sin(a) * r)},${R(y - Math.cos(a) * r)}` });
  }
  el(g, 'circle', { class: 'k', cx: x, cy: y, r });
  el(g, 'circle', { class: 'k', cx: x, cy: y, r: r * .93 });
  el(g, 'circle', { class: 'kt', cx: x, cy: y, r: r * .38 });
  // half-wind points (short)
  for (let i = 0; i < 8; i++) {
    const a = Math.PI / 8 + i * Math.PI / 4, L = r * .62, wd = r * .09;
    const tip = [x + Math.sin(a) * L, y - Math.cos(a) * L];
    const l = [x + Math.sin(a - Math.PI / 2) * wd, y - Math.cos(a - Math.PI / 2) * wd];
    const rr = [x + Math.sin(a + Math.PI / 2) * wd, y - Math.cos(a + Math.PI / 2) * wd];
    el(g, 'path', { class: 'kf', d: `M${R(l[0])},${R(l[1])}L${R(tip[0])},${R(tip[1])}L${R(rr[0])},${R(rr[1])}Z` });
  }
  // main winds (long), half ink half paper
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4, L = r * (i % 2 ? .78 : .96), wd = r * .13;
    const tip = [x + Math.sin(a) * L, y - Math.cos(a) * L];
    const l = [x + Math.sin(a - Math.PI / 2) * wd, y - Math.cos(a - Math.PI / 2) * wd];
    const rr = [x + Math.sin(a + Math.PI / 2) * wd, y - Math.cos(a + Math.PI / 2) * wd];
    el(g, 'path', { class: 'kf', d: `M${R(x)},${R(y)}L${R(l[0])},${R(l[1])}L${R(tip[0])},${R(tip[1])}Z` });
    el(g, 'path', { class: 'kd', d: `M${R(x)},${R(y)}L${R(rr[0])},${R(rr[1])}L${R(tip[0])},${R(tip[1])}Z` });
  }
  el(g, 'circle', { class: 'gold', cx: x, cy: y, r: r * .05 });
  // fleur at north, cross at east (old roses pointed east towards the Holy Land)
  const ny = y - r * .96;
  el(g, 'path', { class: 'wax-fill', d: `M${x},${ny - 1}C${x - 5},${ny - 6} ${x - 2},${ny - 12} ${x},${ny - 15}C${x + 2},${ny - 12} ${x + 5},${ny - 6} ${x},${ny - 1}ZM${x - 1},${ny - 4}C${x - 7},${ny - 4} ${x - 9},${ny - 9} ${x - 7},${ny - 12}C${x - 6},${ny - 8} ${x - 4},${ny - 6} ${x},${ny - 5}ZM${x + 1},${ny - 4}C${x + 7},${ny - 4} ${x + 9},${ny - 9} ${x + 7},${ny - 12}C${x + 6},${ny - 8} ${x + 4},${ny - 6} ${x},${ny - 5}Z` });
  el(g, 'path', { class: 'k', d: `M${x + r * .96 + 3},${y}h8m-4,-4v8` });
  if (winds) {
    for (const w of winds) {
      const a = w.dir * Math.PI / 180, rr = r + 13;
      const tx = x + Math.sin(a) * rr, ty = y - Math.cos(a) * rr + 4;
      const t = el(g, 'text', { class: 'wind', x: R(tx), y: R(ty), 'text-anchor': Math.abs(Math.sin(a)) < .2 ? 'middle' : Math.sin(a) > 0 ? 'start' : 'end', 'data-card': 'wind:' + w.it }, w.it);
      if (onWind) onWind(t, w);
    }
  }
}

export function rhumbs(g, x, y, len) {
  for (let i = 0; i < 16; i++) {
    const a = i * Math.PI / 8;
    const cls = i % 2 ? 'rh-half' : 'rh-main';
    el(g, 'path', { class: cls, d: `M${R(x)},${R(y)}L${R(x + Math.sin(a) * len)},${R(y - Math.cos(a) * len)}` });
  }
  for (let i = 0; i < 16; i++) {
    const a = Math.PI / 16 + i * Math.PI / 8;
    el(g, 'path', { class: 'rh-quarter', d: `M${R(x)},${R(y)}L${R(x + Math.sin(a) * len)},${R(y - Math.cos(a) * len)}` });
  }
}

/* ---------- the traveller ---------- */

// GattoMatto: half cat, half fox, in a long coat, lantern in hand. Drawn in a 200x300 box, feet at y=288.
export const GATTOMATTO = `
<path d="M64,234Q30,244 18,216Q12,192 30,178Q28,204 46,214Q58,220 72,214Z"/>
<path d="M86,96Q60,90 30,104Q50,108 60,112Q44,120 24,134Q60,126 90,106Z"/>
<path d="M80,96Q100,88 120,96L128,120Q132,170 140,210Q146,240 152,258L120,253L104,259L84,253L56,259Q40,263 28,258Q50,236 60,200Q70,150 72,120Z"/>
<path d="M80,98L74,78L92,92Z"/><path d="M120,98L128,78L110,92Z"/>
<ellipse cx="100" cy="72" rx="17" ry="18"/>
<path d="M85,62L83,38L99,55Z"/><path d="M103,55L119,37L117,64Z"/>
<path d="M111,70Q124,74 131,82Q122,88 109,86Z"/>
<path d="M88,252L86,286L98,286L99,254Z"/><path d="M106,254L110,286L122,286L118,252Z"/>
<path d="M82,284h18v6h-20Z"/><path d="M108,284h18v6h-18Z"/>
<path d="M122,116Q138,148 141,176L135,179Q128,152 116,126Z"/>`;

export function gattoMatto(g, x, y, sc, { glow = true } = {}) {
  const wrap = el(g, 'g', { class: 'gm', transform: `translate(${R(x - 100 * sc)} ${R(y - 290 * sc)}) scale(${sc})` });
  if (glow) el(wrap, 'circle', { class: 'lamp-glow', cx: 139, cy: 197, r: 46 });
  const body = el(wrap, 'g', { class: 'gm-body' });
  body.innerHTML = GATTOMATTO;
  el(wrap, 'path', { class: 'whisk', d: 'M121,79L148,73M122,82L150,82M121,85L146,91' });
  el(wrap, 'ellipse', { class: 'eye', cx: 112, cy: 70, rx: 2.8, ry: 1.4 });
  const lan = el(wrap, 'g', { class: 'lantern', style: 'transform-origin:139px 178px' });
  el(lan, 'path', { d: 'M139,178V188', stroke: '#2A1D10', 'stroke-width': 1.6 });
  el(lan, 'rect', { x: 132, y: 188, width: 14, height: 18, rx: 2, fill: '#FFD27A', stroke: '#2A1D10', 'stroke-width': 1.6 });
  el(lan, 'path', { d: 'M131,188h16M131,206h16', stroke: '#2A1D10', 'stroke-width': 2.4 });
  return wrap;
}

// Rio, the God of Cats: white and ginger, sitting, with sparkling eyes. Paws at (x, y), about 48 units tall.
export function rioCat(g, x, y, sc = 1) {
  const w = el(g, 'g', { class: 'rio', transform: `translate(${R(x)} ${R(y)}) scale(${sc})` });
  el(w, 'path', { class: 'rio-tail', d: 'M9,-2Q21,-1 21,-10Q21,-18 15,-21' });
  el(w, 'path', { class: 'rio-w', d: 'M-10,0Q-14,-14 -8,-24Q-4,-30 0,-30Q4,-30 8,-24Q14,-14 10,0Z' });
  el(w, 'path', { class: 'rio-g', d: 'M4,-25Q12,-15 9,-3Q6,-11 2,-16Z' });
  el(w, 'path', { class: 'rio-w', d: 'M-7,-38L-6,-47L-1,-41ZM7,-38L6,-47L1,-41Z' });
  el(w, 'ellipse', { class: 'rio-w', cx: 0, cy: -34, rx: 8, ry: 7 });
  el(w, 'path', { class: 'rio-g', d: 'M-7,-36Q0,-43 7,-36Q3,-37 0,-35Q-3,-37 -7,-36Z' });
  el(w, 'path', { class: 'rio-line', d: 'M-3,0V-9M3,0V-9' });
  el(w, 'circle', { class: 'rio-eye', cx: -3, cy: -34, r: 1.4 });
  el(w, 'circle', { class: 'rio-eye', cx: 3, cy: -34, r: 1.4, style: 'animation-delay:.4s' });
  return w;
}
