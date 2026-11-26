import { createMap } from './map.js';
import { createCity } from './city.js';
import { AOSTA } from './lessons/aosta.js';

// Nothing is saved: every visit is a new journey. The session lives only in memory.
const session = { done: new Set(), zaino: new Map(), seals: [] };

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

/* ---------- the city ---------- */
const cityRoot = $('#city');
let city = null, entering = false;
async function enterCity(id) {
  if (entering || !cityRoot.hidden) return;
  entering = true;
  card.hidden = true;
  $('#hint').classList.remove('show');
  if (location.hash !== '#/' + id) history.pushState(null, '', '#/' + id);
  await map.zoomIntoAosta();
  if (!city) {
    city = createCity(cityRoot, AOSTA, {
      session,
      onClose: leaveCity,
      onZaino: drawZaino,
      onSeal() { if (!session.seals.includes('aosta')) session.seals.push('aosta'); $('#seal-count').textContent = `${session.seals.length} / 50`; map.setSealed('aosta'); drawZaino(); },
    });
  }
  cityRoot.hidden = false;
  requestAnimationFrame(() => cityRoot.classList.add('open'));
  document.body.classList.add('in-city');
  cityRoot.querySelector('.cv-main')?.focus({ preventScroll: true });
  entering = false;
}
function leaveCity() {
  if (cityRoot.hidden) return;
  cityRoot.classList.remove('open');
  document.body.classList.remove('in-city');
  try { speechSynthesis.cancel(); } catch { /* */ }
  setTimeout(() => { cityRoot.hidden = true; }, 400);
  if (location.hash) history.pushState(null, '', location.pathname + location.search);
  map.focusAosta();
}
window.addEventListener('popstate', () => {
  if (location.hash === '#/aosta') enterCity('aosta'); else leaveCity();
});

/* ---------- the backpack ---------- */
function drawZaino() {
  const items = [...session.zaino.values()];
  $('#zaino-count').textContent = items.length;
  const body = $('#zaino .zaino-body');
  if (!items.length && !session.seals.length) {
    body.innerHTML = '<p class="lead">Il tuo zaino è vuoto.</p><p>In each city, save the words and curiosities you like: they wait for you here, and in the notebook you can download at the end of the city.</p>';
    return;
  }
  body.innerHTML = (session.seals.length ? `<p class="lead">Sigilli: ${session.seals.length} / 50</p>` : '') +
    (items.length ? `<ul class="zlist">${items.map(i => `<li><p class="z-it">${i.it}</p><p class="z-en">${i.en}</p><p class="z-txt">${i.txt}</p></li>`).join('')}</ul>` : '') +
    '<p class="note">Nothing is saved after you close the page. Download your notebook at the end of the city to keep everything.</p>';
}
drawZaino();

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
  const c = e.target.closest('.panel [data-close]');
  if (c) closePanel('#' + c.closest('.panel').id);
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = [...document.querySelectorAll('.panel.open')].pop();
  if (open) closePanel('#' + open.id);
  else if (!cityRoot.hidden && cityRoot.querySelector('.cv-modal')?.hidden !== false) leaveCity();
  card.hidden = true;
});

/* ---------- controls ---------- */
$('#zin').addEventListener('click', () => map.zoomBy(1.6));
$('#zout').addEventListener('click', () => map.zoomBy(1 / 1.6));
$('#zhome').addEventListener('click', () => map.home());

/* ---------- start ---------- */
const params = new URLSearchParams(location.search);
const wholeItaly = params.get('vista') === 'italia';
const skip = $('#skip');
skip.hidden = wholeItaly;
skip.addEventListener('click', () => { map.skip(); skip.hidden = true; });
document.body.classList.add('loaded');
map.intro(!wholeItaly).then(async () => {
  skip.hidden = true;
  if (wholeItaly) await map.home();
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
