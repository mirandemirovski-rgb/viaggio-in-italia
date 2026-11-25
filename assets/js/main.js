import { createMap } from './map.js';

const KEY = 'viaggio-in-italia-v1';
const state = Object.assign({ introSeen: false, seals: [], zaino: [] }, safeRead());
function safeRead() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } }
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode */ } }

const $ = (s) => document.querySelector(s);
const svg = $('#map');
const card = $('#card');
let cardFor = null;

const map = createMap(svg, {
  onCard(key, x, y, tap) {
    const c = map.lookup(key);
    if (!c) return;
    if (cardFor !== key) {
      cardFor = key;
      card.innerHTML = `<p class="c-it">${c.it}</p>${c.en ? `<p class="c-en">${c.en}</p>` : ''}<p class="c-txt">${c.txt}</p>${c.enter ? '<button class="btn wax" data-enter="aosta">Entra ad Aosta</button>' : ''}`;
    }
    card.hidden = false;
    card.classList.toggle('pinned', !!tap || !!c.enter);
    place(x, y);
  },
  onHideCard() { if (!card.matches(':hover')) { card.hidden = true; cardFor = null; } },
  onEnter: enterCity,
});

function place(x, y) {
  const r = card.getBoundingClientRect(), pad = 14;
  let left = x + 18, top = y + 18;
  if (left + r.width > innerWidth - pad) left = x - r.width - 18;
  if (top + r.height > innerHeight - pad) top = y - r.height - 18;
  card.style.left = Math.max(pad, left) + 'px';
  card.style.top = Math.max(pad, top) + 'px';
}
card.addEventListener('click', (e) => { const b = e.target.closest('[data-enter]'); if (b) enterCity(b.dataset.enter); });
card.addEventListener('mouseleave', () => { card.hidden = true; cardFor = null; });

/* ---------- city gate (lessons arrive in the next step) ---------- */
async function enterCity(id) {
  card.hidden = true;
  $('#hint').classList.remove('show');
  if (location.hash !== '#/' + id) history.pushState(null, '', '#/' + id);
  document.body.classList.add('entering');
  await map.zoomIntoAosta();
  openPanel('#city');
  document.body.classList.remove('entering');
}
function leaveCity() {
  closePanel('#city');
  if (location.hash) history.pushState(null, '', location.pathname);
  map.focusAosta();
}
window.addEventListener('popstate', () => {
  if (location.hash === '#/aosta') enterCity('aosta'); else if (!$('#city').hidden) leaveCity();
});

/* ---------- panels ---------- */
let lastFocus = null;
function openPanel(sel) {
  const p = $(sel);
  lastFocus = document.activeElement;
  p.hidden = false;
  requestAnimationFrame(() => p.classList.add('open'));
  p.querySelector('[data-close]')?.focus({ preventScroll: true });
}
function closePanel(sel) {
  const p = $(sel);
  p.classList.remove('open');
  setTimeout(() => { p.hidden = true; }, 350);
  lastFocus?.focus?.({ preventScroll: true });
}
document.addEventListener('click', (e) => {
  const o = e.target.closest('[data-open]');
  if (o) openPanel(o.dataset.open);
  const c = e.target.closest('[data-close]');
  if (c) { const p = c.closest('.panel'); if (p.id === 'city') leaveCity(); else closePanel('#' + p.id); }
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = [...document.querySelectorAll('.panel.open')].pop();
  if (open) { if (open.id === 'city') leaveCity(); else closePanel('#' + open.id); }
  card.hidden = true;
});

/* ---------- controls ---------- */
$('#zin').addEventListener('click', () => map.zoomBy(1.6));
$('#zout').addEventListener('click', () => map.zoomBy(1 / 1.6));
$('#zhome').addEventListener('click', () => map.home());
$('#seal-count').textContent = state.seals.length;
$('#zaino-count').textContent = state.zaino.length;

/* ---------- start ---------- */
const params = new URLSearchParams(location.search);
const wholeItaly = params.get('vista') === 'italia';
const firstTime = !state.introSeen && !wholeItaly;
document.body.classList.add('loaded');
map.intro(firstTime).then(async () => {
  if (wholeItaly) await map.home();
  state.introSeen = true; save();
  const hint = $('#hint');
  if (matchMedia('(pointer: coarse)').matches) {
    hint.querySelector('p').textContent = 'Tocca la mappa: alcune cose si vedono solo alla luce della lanterna.';
    hint.querySelector('.en').textContent = 'Tap the map: some things only appear in the lantern’s light. Tap the red seal to begin.';
  }
  hint.hidden = false;
  requestAnimationFrame(() => hint.classList.add('show'));
  setTimeout(() => hint.classList.remove('show'), 8000);
  if (location.hash === '#/aosta') enterCity('aosta');
});
$('#hint').addEventListener('click', (e) => e.currentTarget.classList.remove('show'));
