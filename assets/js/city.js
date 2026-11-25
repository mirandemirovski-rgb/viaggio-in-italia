// A city of the journey: seven rooms, exercises, the guardian's test, the seal.
// Nothing is saved: everything lives only while the page is open.
import { speak, canSpeak, hasItalianVoice } from './speech.js';
import { icon, piazzaScene, prologueScene, cityBanner, sealSVG } from './art.js';
import { NATIONS } from './lessons/aosta.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const plain = (s) => String(s).replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1');
const norm = (s) => String(s).toLowerCase().normalize('NFC').replace(/[’']/g, '’').replace(/\s+/g, ' ').replace(/[.!?;,]+$/, '').trim();
const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

// {parola|translation} → a word you can hover, focus and hear
export function md(text) {
  return esc(text).replace(/\{([^{}|]+)\|([^{}]+)\}/g, (_, w, t) => `<span class="w" tabindex="0" role="button" data-t="${t}" data-say="${w}">${w}</span>`);
}

export function createCity(root, L, ctx) {
  const S = ctx.session; // session state, kept in memory only
  S.done = S.done || new Set();
  S.zaino = S.zaino || new Map();
  let current = 0;
  let audioOn = true;

  const fillIn = (t) => t
    .replace(/\{NOME\}/g, S.name || 'GattoMatto')
    .replace(/\{CITTA\}/g, S.city || 'lontano')
    .replace(/\{BENV\}/g, S.gender === 'f' ? 'Benvenuta' : 'Benvenuto')
    .replace(/\{NAZ_IT\}/g, S.nation ? ` Sono ${S.gender === 'f' ? S.nation[2] : S.nation[1]}.` : '')
    .replace(/\{NAZ_EN\}/g, S.nation ? ` I’m ${S.nation[3]}.` : '');

  root.innerHTML = `
  <div class="cv" role="dialog" aria-modal="true" aria-labelledby="cv-title">
    <header class="cv-head">
      ${cityBanner()}
      <div class="cv-titles">
        <p class="cv-kicker">${esc(L.kicker)}</p>
        <h2 id="cv-title">${esc(L.name)}</h2>
        <p class="cv-sub">${esc(L.title)}</p>
      </div>
      <div class="cv-tools">
        <button class="pill" data-act="audio" aria-pressed="true" title="Voice">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10Z"/><path class="wave1" d="M16 9a4 4 0 0 1 0 6"/></svg><span>Voce</span>
        </button>
        <button class="pill" data-act="close">Torna alla mappa</button>
      </div>
    </header>
    <nav class="cv-nav" aria-label="Le stanze di ${esc(L.name)}"><ol></ol></nav>
    <main class="cv-main" tabindex="-1"><div class="room"></div>
      <div class="cv-foot"><button class="btn ghost" data-act="prev">Indietro</button><button class="btn" data-act="next">Avanti</button></div>
    </main>
    <div class="cv-modal" hidden></div>
  </div>`;

  const $ = (s) => root.querySelector(s);
  const room = $('.room');
  const nav = $('.cv-nav ol');
  const modal = $('.cv-modal');

  function drawNav() {
    nav.innerHTML = L.rooms.map((r, i) => `<li><button class="${i === current ? 'on' : ''} ${S.done.has(r.id) ? 'done' : ''}" data-room="${i}" aria-current="${i === current ? 'step' : 'false'}"><span class="n">${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][i]}</span><span class="t">${esc(r.it)}</span><span class="e">${esc(r.en)}</span></button></li>`).join('');
  }
  function markDone(id) { if (!S.done.has(id)) { S.done.add(id); drawNav(); } }

  function go(i) {
    current = Math.max(0, Math.min(L.rooms.length - 1, i));
    drawNav();
    room.innerHTML = '';
    const r = L.rooms[current];
    room.dataset.id = r.id;
    ({ codice, piazza, panetteria, saluti, grammatica, alfabeto, prova })[r.id]();
    $('[data-act="prev"]').disabled = current === 0;
    $('[data-act="next"]').hidden = current === L.rooms.length - 1;
    $('.cv-main').scrollTo({ top: 0 });
    $('.cv-main').focus({ preventScroll: true });
  }

  root.addEventListener('click', (e) => {
    const w = e.target.closest('.w');
    if (w && audioOn) speak(w.dataset.say);
    const b = e.target.closest('[data-act]');
    if (!b) { const rb = e.target.closest('button[data-room]'); if (rb) go(+rb.dataset.room); return; }
    const a = b.dataset.act;
    if (a === 'close') ctx.onClose();
    if (a === 'prev') go(current - 1);
    if (a === 'next') go(current + 1);
    if (a === 'audio') { audioOn = !audioOn; b.setAttribute('aria-pressed', audioOn); b.classList.toggle('off', !audioOn); if (!audioOn) try { speechSynthesis.cancel(); } catch { /* */ } }
    if (a === 'say' && audioOn) speak(b.dataset.say);
  });
  root.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('w')) { e.preventDefault(); if (audioOn) speak(e.target.dataset.say); }
  });
  const say = (t) => { if (audioOn) speak(plain(t)); };
  const sayBtn = (t, label = 'Ascolta') => `<button class="say" data-act="say" data-say="${esc(plain(t))}" aria-label="${label}: ${esc(plain(t))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10Z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg></button>`;
  const h = (html) => { room.insertAdjacentHTML('beforeend', html); return room.lastElementChild; };
  const note = (n) => `<aside class="note"><p class="note-t">${esc(n.t)}</p><p>${md(n.txt)}</p></aside>`;

  /* ================= I. Il codice ================= */
  function codice() {
    const P = L.prologue;
    h(`<section class="r-head"><h3>Il codice</h3><p class="lede">The page in the snow</p></section>`);
    h(`<figure class="scene-wrap">${prologueScene()}</figure>`);
    h(`<div class="prose">${P.story.map(p => `<p>${md(p)}</p>`).join('')}<p class="instr">${esc(P.instruction)}</p></div>`);
    const lines = P.page.map(l => `<p>${md(l.it)}</p>`).join('');
    const box = h(`<div class="mirror">
      <div class="leaf"><div class="txt mirrored" aria-hidden="true">${P.page.map(l => `<p>${esc(plain(l.it))}</p>`).join('')}</div><div class="txt readable">${lines}</div><div class="glass" aria-hidden="true"></div></div>
      <label class="slider"><span>Lo specchio</span><input type="range" min="0" max="100" value="0" step="1" aria-label="Move the mirror across the page"></label>
    </div>`);
    const leaf = box.querySelector('.leaf'), input = box.querySelector('input');
    const after = h(`<div class="after" hidden>
      <div class="translation">${P.page.map(l => `<p><span class="it">${md(l.it)}</span>${sayBtn(l.it)}<span class="en">${esc(l.en)}</span></p>`).join('')}</div>
      <div class="notes">${P.notes.map(note).join('')}</div>
      <p class="next-hint">The first key is in Aosta, under the arch. Go to <button class="link" data-room="1">La piazza</button>.</p>
    </div>`);
    const set = (v) => {
      leaf.style.setProperty('--m', v + '%');
      if (v >= 97 && after.hidden) { after.hidden = false; markDone('codice'); say(P.page.map(l => plain(l.it)).join(' ')); }
    };
    input.addEventListener('input', () => set(+input.value));
    if (S.done.has('codice')) { input.value = 100; set(100); }
  }

  /* ================= II. La piazza ================= */
  function piazza() {
    const P = L.piazza;
    const byId = Object.fromEntries(P.spots.map(s => [s.id, s]));
    S.found = S.found || new Set();
    h(`<section class="r-head"><h3>La piazza</h3><p class="lede">Aosta at dawn</p></section>`);
    h(`<p class="prose">${esc(P.intro)}</p>`);
    const mission = h(`<p class="mission" aria-live="polite"></p>`);
    const fig = h(`<figure class="scene-wrap piazza">${piazzaScene()}</figure>`);
    const card = h(`<div class="spot-card" aria-live="polite"><p class="muted">Hover over or tap anything in the square.</p></div>`);
    const insc = h(`<aside class="note insc" hidden><p class="note-t">L’iscrizione</p><p>${esc(P.inscriptionNote)}</p></aside>`);
    const svg = fig.querySelector('svg');
    // awning stripes
    const aw = svg.querySelector('.awning');
    for (let i = 0; i < 15; i++) aw.insertAdjacentHTML('beforeend', `<rect x="${640 + i * 19.3}" y="326" width="19.3" height="26" fill="${i % 2 ? '#F6EEDF' : '#9B3A2A'}" stroke="#3A2716" stroke-width=".8"/>`);
    // sparkles at each spot
    const sp = svg.querySelector('.sparkles');
    svg.querySelectorAll('.spot').forEach((g, i) => {
      const b = g.getBBox();
      sp.insertAdjacentHTML('beforeend', `<circle class="spark" cx="${b.x + b.width / 2}" cy="${b.y + Math.min(b.height / 2, 40)}" r="5" style="animation-delay:${-i * .37}s"/>`);
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', byId[g.dataset.spot].it);
    });
    const drawMission = () => {
      const left = P.mission.filter(m => !S.found.has(m));
      mission.innerHTML = left.length
        ? `<b>Missione:</b> trova ${P.mission.map(m => `<span class="${S.found.has(m) ? 'got' : ''}">${esc(byId[m].it)}</span>`).join(', ')}.`
        : `<b>Missione compiuta.</b> Something is carved under the arch.`;
      if (!left.length) { svg.querySelector('.inscription').hidden = false; insc.hidden = false; markDone('piazza'); S.inscription = true; }
    };
    const show = (id, hit) => {
      const s = byId[id];
      svg.querySelectorAll('.spot').forEach(g => g.classList.toggle('sel', g.dataset.spot === id));
      const saved = S.zaino.has(id);
      card.innerHTML = `<div class="sc-top"><p class="sc-it">${esc(s.it)}</p>${sayBtn(s.it)}<p class="sc-en">${esc(s.en)}</p>
        <button class="btn small ${saved ? 'saved' : ''}" data-save="${id}">${saved ? 'Nello zaino' : 'Metti nello zaino'}</button></div><p class="sc-txt">${esc(s.txt)}</p>`;
      if (hit) {
        say(s.it);
        if (P.mission.includes(id) && !S.found.has(id)) { S.found.add(id); drawMission(); }
      }
    };
    svg.addEventListener('mouseover', (e) => { const g = e.target.closest('.spot'); if (g) show(g.dataset.spot); });
    svg.addEventListener('click', (e) => { const g = e.target.closest('.spot'); if (g) show(g.dataset.spot, true); });
    svg.addEventListener('keydown', (e) => { const g = e.target.closest('.spot'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(g.dataset.spot, true); } });
    card.addEventListener('click', (e) => {
      const b = e.target.closest('[data-save]'); if (!b) return;
      const s = byId[b.dataset.save];
      S.zaino.set(s.id, { it: s.it, en: s.en, txt: s.txt });
      ctx.onZaino();
      show(s.id);
    });
    drawMission();
  }

  /* ================= III. In panetteria ================= */
  function panetteria() {
    const P = L.panetteria;
    h(`<section class="r-head"><h3>In panetteria</h3><p class="lede">Your first conversations</p></section>`);
    if (!S.name) return setup();
    talk(0);

    function setup() {
      const opts = NATIONS.map((n, i) => `<option value="${i}">${esc(n[0])}</option>`).join('');
      const f = h(`<form class="setup" novalidate>
        <p class="prose">${esc(P.setupIntro)}</p>
        <label><span class="lab">Come ti chiami? <i>What’s your name?</i></span><input name="nome" autocomplete="given-name" maxlength="30" placeholder="Giulia"><span class="err" hidden></span></label>
        <label><span class="lab">Di dove sei? <i>Which city are you from?</i></span><input name="citta" maxlength="40" placeholder="Atene"><span class="fhint">If your city has an Italian name, use it: Londra, Parigi, Atene, Lisbona.</span><span class="err" hidden></span></label>
        <label><span class="lab">Nazionalità <i>Nationality (optional)</i></span><select name="nation"><option value="">Preferisco non dirlo</option>${opts}</select></label>
        <fieldset><legend class="lab">In Italian, some words change for men and women. Which form should people use with you?</legend>
          <label class="radio"><input type="radio" name="g" value="m"> <span>Benvenuto! <i>masculine</i></span></label>
          <label class="radio"><input type="radio" name="g" value="f"> <span>Benvenuta! <i>feminine</i></span></label>
          <span class="err" hidden></span></fieldset>
        <button class="btn wax" type="submit">Entra in panetteria</button>
      </form>`);
      const errAt = (el, msg) => { const e = (el.closest('fieldset') || el.closest('label')).querySelector('.err'); e.textContent = msg; e.hidden = !msg; };
      f.addEventListener('input', (e) => { if (e.target.name) errAt(e.target, ''); });
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = f.elements.nome.value.trim(), city = f.elements.citta.value.trim(), g = f.querySelector('[name=g]:checked');
        let ok = true;
        if (!/^[\p{L}][\p{L}\s’'.-]{0,29}$/u.test(name)) { errAt(f.elements.nome, 'Write your name, using letters only.'); ok = false; }
        if (!/^[\p{L}][\p{L}\s’'.-]{0,39}$/u.test(city)) { errAt(f.elements.citta, 'Write the name of your city, using letters only.'); ok = false; }
        if (!g) { errAt(f.querySelector('[name=g]'), 'Choose one of the two forms.'); ok = false; }
        if (!ok) return;
        const cap = (s) => s.replace(/(^|[\s’'-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());
        S.name = cap(name); S.city = cap(city); S.gender = g.value;
        S.nation = f.elements.nation.value === '' ? null : NATIONS[+f.elements.nation.value];
        ctx.onProfile?.();
        room.innerHTML = '';
        h(`<section class="r-head"><h3>In panetteria</h3><p class="lede">Your first conversations</p></section>`);
        talk(0);
      });
    }

    function talk(di) {
      const D = P.dialogues[di];
      const box = h(`<section class="dialogue"><h4>${esc(D.title)}</h4><p class="d-en">${esc(D.en)}</p><p class="prose small">${md(D.scene)}</p><div class="lines" aria-live="polite"></div><div class="choices"></div></section>`);
      const lines = box.querySelector('.lines'), choices = box.querySelector('.choices');
      let i = 0;
      const line = (who, it, en) => {
        const me = who === 'tu';
        lines.insertAdjacentHTML('beforeend', `<div class="ln ${me ? 'me' : ''}"><span class="who">${me ? esc(S.name) : esc(who)}</span><p class="it">${md(fillIn(it))} ${sayBtn(fillIn(it))}</p><p class="en">${esc(fillIn(en))}</p></div>`);
      };
      const step = () => {
        choices.innerHTML = '';
        if (i >= D.lines.length) return finish();
        const l = D.lines[i];
        if (l.who !== 'tu') { line(l.who, l.it, l.en); say(fillIn(l.it)); i++; setTimeout(step, 450); return; }
        choices.innerHTML = `<p class="ch-q">Choose your answer. <i>${esc(fillIn(l.en))}</i></p>` + shuffle(l.options).map((o, k) => `<button class="choice" data-k="${l.options.indexOf(o)}">${esc(fillIn(plain(o.it)))}</button>`).join('') + '<p class="why" hidden></p>';
      };
      choices.addEventListener('click', (e) => {
        const b = e.target.closest('.choice'); if (!b) return;
        const l = D.lines[i], o = l.options[+b.dataset.k];
        if (o.ok) { line('tu', o.it, l.en); say(fillIn(plain(o.it))); i++; step(); }
        else { b.classList.add('wrong'); b.disabled = true; const w = choices.querySelector('.why'); w.innerHTML = md(fillIn(o.why)); w.hidden = false; }
      });
      const finish = () => {
        if (di + 1 < P.dialogues.length) {
          choices.innerHTML = `<button class="btn" data-next>Continua: ${esc(P.dialogues[di + 1].title)}</button>`;
          choices.querySelector('[data-next]').addEventListener('click', () => { choices.innerHTML = ''; talk(di + 1); }, { once: true });
        } else {
          h(`<section class="compare"><h4>Tu o Lei?</h4><p class="prose small">The same questions, informal and formal.</p>
            <table><thead><tr><th>tu <i>informal</i></th><th>Lei <i>formal</i></th><th></th></tr></thead><tbody>
            ${P.compare.map(r => `<tr><td>${esc(r[0])} ${sayBtn(r[0])}</td><td>${esc(r[1])} ${sayBtn(r[1].split(' / ')[0])}</td><td class="en">${esc(r[2])}</td></tr>`).join('')}
            </tbody></table></section>`);
          markDone('panetteria');
        }
      };
      step();
    }
  }

  /* ================= IV. Saluti e gesti ================= */
  function saluti() {
    const P = L.saluti;
    h(`<section class="r-head"><h3>Saluti e gesti</h3><p class="lede">The right greeting at the right time</p></section>`);
    h(`<p class="prose">${esc(P.intro)}</p>`);
    const dial = h(`<div class="day">
      <svg viewBox="0 0 600 180" class="sky" aria-hidden="true"><rect class="sky-bg" width="600" height="180"/><path class="arc" d="M40,170A260,150 0 0 1 560,170"/><g class="body"><circle r="16"/></g>
      <path d="M0,170L60,140L110,158L170,128L230,160L290,136L350,162L420,132L480,158L540,138L600,160V180H0Z" fill="#3A2716" opacity=".85"/></svg>
      <label class="slider"><span class="clock">9:00</span><input type="range" min="0" max="23" value="9" step="1" aria-label="Time of day"></label>
      <div class="greet"><div><p class="gl">Arrivi <i>you arrive</i></p><p class="gi arrive"></p></div><div><p class="gl">Vai via <i>you leave</i></p><p class="gi leave"></p></div></div>
      <p class="pnote muted"></p></div>`);
    const inp = dial.querySelector('input');
    const setHour = (hr) => {
      const per = P.periods.find(p => p.from <= p.to ? hr >= p.from && hr <= p.to : hr >= p.from || hr <= p.to);
      dial.querySelector('.clock').textContent = `${hr}:00, ${per.name}`;
      dial.querySelector('.arrive').innerHTML = `${esc(per.arrive)} ${sayBtn(per.arrive.split(' / ')[0])}`;
      dial.querySelector('.leave').innerHTML = `${esc(per.leave)} ${sayBtn(per.leave)} <span class="en">${esc(per.leaveEn)}</span>`;
      dial.querySelector('.pnote').textContent = per.note || '';
      const day = hr >= 6 && hr <= 19;
      const t = day ? (hr - 6) / 13 : ((hr + 24 - 20) % 24) / 10;
      const a = Math.PI * (1 - t), x = 300 + Math.cos(a) * 260, y = 170 - Math.sin(a) * 150;
      const body = dial.querySelector('.body');
      body.setAttribute('transform', `translate(${x.toFixed(0)} ${y.toFixed(0)})`);
      body.classList.toggle('moon', !day);
      const sky = [[0, '#1B2438'], [5, '#3B4660'], [6, '#E6B98A'], [8, '#EAD9B0'], [12, '#EFE3C1'], [17, '#E8C995'], [19, '#C98A62'], [20, '#4A4560'], [22, '#1F2840']];
      let c = sky[0][1]; for (const [h0, col] of sky) if (hr >= h0) c = col;
      dial.querySelector('.sky-bg').setAttribute('fill', c);
    };
    inp.addEventListener('input', () => setHour(+inp.value));
    setHour(9);
    h(`<p class="always">${md(P.always)}</p>`);

    // sort: arrival or departure
    const sort = h(`<section class="sorter"><h4>Arrivo o partenza?</h4><p class="prose small">${esc(P.sort.q)}</p><div class="rows"></div><button class="btn" data-check>Controlla</button><p class="err" hidden></p><p class="result" aria-live="polite"></p></section>`);
    const rows = sort.querySelector('.rows');
    P.sort.items.forEach(([t, bin], k) => rows.insertAdjacentHTML('beforeend', `<div class="row" data-k="${k}"><span class="it">${esc(t)} ${sayBtn(t)}</span><span class="opts">${P.sort.bins.map(([id, en]) => `<button class="opt" data-bin="${id}" aria-pressed="false">${esc(en)}</button>`).join('')}</span></div>`));
    rows.addEventListener('click', (e) => {
      const b = e.target.closest('.opt'); if (!b) return;
      b.parentElement.querySelectorAll('.opt').forEach(o => o.setAttribute('aria-pressed', o === b));
      b.closest('.row').classList.remove('ok', 'no');
      sort.querySelector('.err').hidden = true;
    });
    sort.querySelector('[data-check]').addEventListener('click', () => {
      const all = [...rows.querySelectorAll('.row')];
      const missing = all.filter(r => !r.querySelector('[aria-pressed="true"]'));
      if (missing.length) { const e = sort.querySelector('.err'); e.textContent = 'Choose an answer for every expression first.'; e.hidden = false; return; }
      let good = 0;
      all.forEach(r => { const it = P.sort.items[+r.dataset.k]; const ok = r.querySelector('[aria-pressed="true"]').dataset.bin === it[1]; r.classList.toggle('ok', ok); r.classList.toggle('no', !ok); good += ok; });
      sort.querySelector('.result').textContent = good === all.length ? 'Perfetto! All correct.' : `${good} of ${all.length} correct. Change the red ones and check again.`;
      if (good === all.length) { sort.dataset.done = 1; check(); }
    });

    // tu or Lei
    const tl = h(`<section class="tulei"><h4>Tu o Lei?</h4><p class="prose small">Who do you speak to with tu, and who with Lei?</p><ul></ul><p class="result" aria-live="polite"></p></section>`);
    const ul = tl.querySelector('ul');
    P.tuLei.forEach(([who, a], k) => ul.insertAdjacentHTML('beforeend', `<li data-k="${k}"><span>${esc(who)}</span><span class="opts"><button class="opt" data-a="tu">tu</button><button class="opt" data-a="Lei">Lei</button></span><span class="fb"></span></li>`));
    let answered = 0, right = 0;
    ul.addEventListener('click', (e) => {
      const b = e.target.closest('.opt'); if (!b) return;
      const li = b.closest('li'); if (li.dataset.done) return;
      const a = P.tuLei[+li.dataset.k][1], ok = b.dataset.a === a;
      li.dataset.done = 1; answered++; right += ok;
      li.classList.add(ok ? 'ok' : 'no');
      li.querySelector('.fb').textContent = ok ? 'Giusto' : `With them you use ${a}.`;
      li.querySelectorAll('.opt').forEach(o => o.disabled = true);
      if (answered === P.tuLei.length) { tl.querySelector('.result').textContent = `${right} of ${P.tuLei.length} correct.`; tl.dataset.done = 1; check(); }
    });
    h(`<div class="notes">${P.notes.map(note).join('')}</div>`);
    function check() { if (sort.dataset.done && tl.dataset.done) markDone('saluti'); }
  }

  /* ================= V. Grammatica ================= */
  function grammatica() {
    const P = L.grammatica;
    h(`<section class="r-head"><h3>Grammatica</h3><p class="lede">The building blocks of your first sentences</p></section>`);
    h(`<div class="cards">${P.cards.map(c => `<article class="gcard"><h4>${esc(c.t)}</h4><p class="g-en">${esc(c.en)}</p>
      <table>${c.table.map(([a, b]) => `<tr><td class="it">${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}</table><p class="g-note">${md(c.note)}</p></article>`).join('')}</div>`);
    h(`<section class="practice"><h4>Esercizio</h4><p class="prose small">Fifteen questions. If you make a mistake, the question comes back at the end.</p><div class="drill-host"></div></section>`);
    drill(room.querySelector('.drill-host'), P.drill, { mode: 'practice', onDone: (r) => { S.drill = r; markDone('grammatica'); } });
  }

  /* ================= VI. Alfabeto e numeri ================= */
  function alfabeto() {
    const P = L.alfabeto;
    h(`<section class="r-head"><h3>Alfabeto e numeri</h3><p class="lede">Spell, count, and read the arch</p></section>`);
    h(`<p class="prose">${esc(P.intro)}</p>`);
    h(`<div class="abc">${P.letters.map(([l, n, c]) => `<button class="letter" data-act="say" data-say="${esc(n)}"><b>${l}</b><span>${esc(n)}</span><i>${esc(c)}</i></button>`).join('')}</div>`);
    h(`<p class="prose small">Letters in foreign words:</p><div class="abc foreign">${P.foreign.map(([l, n, c]) => `<button class="letter" data-act="say" data-say="${esc(n)}"><b>${l}</b><span>${esc(n)}</span><i>${esc(c)}</i></button>`).join('')}</div>`);
    h(`<aside class="note"><p class="note-t">Come si scrive?</p><p>${esc(P.spellingNote)}</p></aside>`);
    const sp = h(`<section class="speller"><h4>Il tuo nome, al telefono</h4><label><span class="lab">Write a name</span><input maxlength="24" value="${esc(S.name || 'GattoMatto')}"></label><p class="spelled"></p><button class="btn small" data-spell>Ascolta</button></section>`);
    const map = Object.fromEntries([...P.letters, ...P.foreign].map(([l, n, c]) => [l, [n, c]]));
    const spell = (word) => [...word.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase()].filter(ch => map[ch]).map(ch => `${ch} come ${map[ch][1]}`);
    const upd = () => { sp.querySelector('.spelled').textContent = spell(sp.querySelector('input').value).join(', ') || '…'; };
    sp.querySelector('input').addEventListener('input', upd); upd();
    sp.querySelector('[data-spell]').addEventListener('click', () => say(spell(sp.querySelector('input').value).join(', ')));

    h(`<section class="sounds"><h4>La pronuncia</h4><p class="prose small">Italian is read the way it is written, once you know these rules. Click the words to hear them.</p>
      <table>${P.sounds.map(s => `<tr><td class="rule">${esc(s.rule)}</td><td>${esc(s.en)}</td><td class="ex">${s.ex.map(x => `<button class="chip" data-act="say" data-say="${esc(x.replace(' / ', ', '))}">${esc(x)}</button>`).join('')}</td></tr>`).join('')}</table></section>`);
    h(`<section class="nums"><h4>I numeri da 0 a 20</h4><div class="numgrid">${P.numbers.map((n, i) => `<button class="num" data-act="say" data-say="${n}"><b>${i}</b><span>${n}</span></button>`).join('')}</div><p class="prose small">${esc(P.numbersNote)}</p></section>`);
    h(`<section class="practice"><h4>Ascolta e scegli</h4><p class="prose small">Listen to the number and choose it.</p><div class="drill-host"></div></section>`);
    const items = P.listen.map(([n, opts]) => ({ type: 'listen', say: P.numbers[n], q: 'Which number?', options: opts.map(String), a: String(n) }));
    let listenDone = S.done.has('alfabeto');
    drill(room.querySelector('.drill-host'), items, { mode: 'practice', onDone: () => { listenDone = true; maybe(); } });

    const C = P.cipher;
    const ci = h(`<section class="cipher"><h4>Il codice dell’arco</h4><p class="prose small">${esc(C.intro)}</p>
      <div class="c-row">${L.piazza.inscription.map((w, k) => `<label class="c-cell"><span>${esc(w)}</span><input inputmode="numeric" maxlength="2" data-k="${k}" aria-label="${esc(w)} in numbers"></label>`).join('')}</div>
      <button class="btn" data-c1>Controlla i numeri</button><p class="err" hidden></p>
      <div class="c2" hidden><p class="prose small">${esc(C.step2)}</p><div class="key">${P.letters.map(([l], k) => `<span><b>${k + 1}</b>${l}</span>`).join('')}</div>
      <label><span class="lab">The hidden word</span><input class="word" maxlength="12" autocomplete="off"></label><button class="btn wax" data-c2>Apri il codice</button><p class="err e2" hidden></p></div>
      <div class="c3" hidden></div></section>`);
    if (!S.inscription) ci.querySelector('.prose').insertAdjacentHTML('afterend', '<p class="muted small">Tip: first complete the mission in La piazza to find the inscription. You can still try it now.</p>');
    const target = L.piazza.inscription.map(w => P.numbers.indexOf(w));
    ci.querySelector('[data-c1]').addEventListener('click', () => {
      const ins = [...ci.querySelectorAll('.c-cell input')], err = ci.querySelector('.err');
      if (ins.some(i => !i.value.trim())) { err.textContent = 'Write a number in every box.'; err.hidden = false; return; }
      let ok = true;
      ins.forEach((i, k) => { const good = +i.value === target[k]; i.classList.toggle('no', !good); i.classList.toggle('ok', good); ok = ok && good; });
      if (!ok) { err.textContent = 'Some numbers are not right yet. Look at the red boxes.'; err.hidden = false; return; }
      err.hidden = true; ci.querySelector('.c2').hidden = false;
    });
    ci.querySelector('.c-row').addEventListener('input', () => { ci.querySelector('.err').hidden = true; });
    const solve = () => {
      ci.querySelector('.c2').hidden = false;
      ci.querySelector('.c3').hidden = false;
      ci.querySelector('.c3').innerHTML = `<p class="codeword">${C.answer.split('').map(c => `<span>${c}</span>`).join('')}</p><p class="prose">${md(C.reveal)}</p>`;
      S.cipher = true; maybe();
    };
    ci.querySelector('[data-c2]').addEventListener('click', () => {
      const v = ci.querySelector('.word').value.trim().toUpperCase(), e2 = ci.querySelector('.e2');
      if (!v) { e2.textContent = 'Write the word first.'; e2.hidden = false; return; }
      if (v !== C.answer) { e2.textContent = 'Not yet. Count again: A is 1, and remember there is no J or K.'; e2.hidden = false; return; }
      e2.hidden = true; solve(); say('semola');
    });
    ci.querySelector('.word').addEventListener('input', () => { ci.querySelector('.e2').hidden = true; });
    if (S.cipher) { ci.querySelectorAll('.c-cell input').forEach((i, k) => { i.value = target[k]; }); solve(); }
    function maybe() { if (listenDone && S.cipher) markDone('alfabeto'); }
  }

  /* ================= VII. La prova ================= */
  function prova() {
    const P = L.prova;
    h(`<section class="r-head"><h3>La prova del custode</h3><p class="lede">Fifteen questions for the seal of Aosta</p></section>`);
    h(`<p class="prose">${md(P.intro)}</p>`);
    if (S.test?.passed) return sealed();
    const start = h(`<div class="start"><p class="prose small">You need ${P.pass} correct answers out of ${P.items.length}. There are no hints during the test: you will see the corrections at the end.</p><button class="btn wax">Comincia la prova</button></div>`);
    start.querySelector('button').addEventListener('click', () => {
      start.remove();
      const host = h('<div class="drill-host test"></div>');
      drill(host, shuffle(P.items), { mode: 'test', onDone: (r) => results(r, host) });
    });
  }
  function results(r, host) {
    const P = L.prova;
    const passed = r.score >= P.pass;
    S.test = { score: r.score, total: r.total, passed };
    host.innerHTML = `<div class="results ${passed ? 'pass' : 'fail'}"><p class="score">${r.score} / ${r.total}</p>
      <p class="prose">${passed ? 'Ottimo! The guardian nods and lifts his wooden key.' : `You need ${P.pass} correct answers. Look at the corrections and try again: the questions will be shuffled.`}</p>
      ${r.wrong.length ? `<h4>Le correzioni</h4><ul class="fixes">${r.wrong.map(w => `<li><p class="q">${esc(w.q)}</p><p><span class="no">${esc(w.given || '(no answer)')}</span> <span class="yes">${esc(w.a)}</span></p>${w.why ? `<p class="small muted">${esc(w.why)}</p>` : ''}</li>`).join('')}</ul>` : ''}
      ${passed ? '<button class="btn wax" data-seal>Ricevi il sigillo</button>' : '<button class="btn" data-retry>Riprova</button>'}</div>`;
    host.querySelector('[data-retry]')?.addEventListener('click', () => go(current));
    host.querySelector('[data-seal]')?.addEventListener('click', () => { markDone('prova'); ctx.onSeal?.(); go(current); });
  }
  function sealed() {
    const box = h(`<section class="sealed"><div class="seal-stage">${sealSVG(L.roman)}</div>
      <h4>Il sigillo di Aosta è tuo.</h4>
      <p class="prose">${esc(S.name || 'GattoMatto')}, you passed the guardian’s test with ${S.test.score} out of ${S.test.total}.${S.cipher ? ' And the first word of the code is yours: <b>SEMOLA</b>.' : ' The inscription under the arch still waits for you in “Alfabeto e numeri”.'}</p>
      <p class="prose small">Keep the seal safe: the last door of the journey opens only for those who carry every seal. Your notebook holds everything you learned in Aosta: words, expressions, grammar, your conversations and the curiosities you saved. It is yours to keep.</p>
      <div class="sealed-actions"><button class="btn wax" data-pdf>Scarica il quaderno (PDF)</button><button class="btn" data-onward>Continua il viaggio</button></div>
      <p class="err" hidden></p></section>`);
    box.querySelector('[data-pdf]').addEventListener('click', () => pdf(box));
    box.querySelector('[data-onward]').addEventListener('click', onward);
    setTimeout(onward, 2600);
  }
  async function pdf(box) {
    const b = box.querySelector('[data-pdf]'), err = box.querySelector('.err');
    b.disabled = true; b.textContent = 'Preparo il quaderno…'; err.hidden = true;
    try {
      const m = await import('./pdf.js');
      await m.makeNotebook(L, S);
      b.textContent = 'Quaderno scaricato';
    } catch (e) {
      console.error(e);
      err.textContent = 'The notebook could not be created. Please try again.'; err.hidden = false;
      b.textContent = 'Scarica il quaderno (PDF)';
    }
    b.disabled = false;
  }

  /* ---------- the stagecoach to the next city ---------- */
  let onwardShown = false;
  function onward() {
    if (onwardShown) return; onwardShown = true;
    modal.hidden = false;
    modal.innerHTML = `<div class="sheet small bus" role="dialog" aria-modal="true" aria-labelledby="bus-t">
      <svg class="coach-art" viewBox="0 0 320 110" aria-hidden="true">
        <path d="M8,96h304" stroke="#3A2716" stroke-width="1.4"/>
        <g class="horses">
          <g class="horse h2" fill="#5A4330"><path d="M74,48Q80,42 104,44Q116,45 118,54Q118,62 110,64L78,64Q70,62 70,56Z"/><path d="M74,50L64,32Q62,26 56,28L48,34Q46,38 50,39L58,38L68,56Z"/><path d="M118,52q10,4 8,18" fill="none" stroke="#5A4330" stroke-width="3" stroke-linecap="round"/><path d="M78,63l-2,30M86,64l2,29M104,64l-2,29M112,62l4,31" stroke="#5A4330" stroke-width="3.2" stroke-linecap="round"/></g>
          <g class="horse h1" fill="#2A1D10"><path d="M48,52Q54,46 78,48Q90,49 92,58Q92,66 84,68L52,68Q44,66 44,60Z"/><path d="M48,54L38,36Q36,30 30,32L22,38Q20,42 24,43L32,42L42,60Z"/><path d="M92,56q10,4 8,18" fill="none" stroke="#2A1D10" stroke-width="3" stroke-linecap="round"/><path d="M52,67l-2,27M60,68l2,26M78,68l-2,26M86,66l4,28" stroke="#2A1D10" stroke-width="3.2" stroke-linecap="round"/><path d="M40,38l6,-4M44,42l6,-4" stroke="#C99A45" stroke-width="1.4"/></g>
        </g>
        <path d="M118,60L150,66" stroke="#3A2716" stroke-width="2"/>
        <g class="coach">
          <path d="M150,26h96q10,0 10,10v38h-116v-38q0,-10 10,-10z" fill="#8E2A1E" stroke="#3A2716" stroke-width="1.8"/>
          <path d="M146,26h108" stroke="#B08A3E" stroke-width="3"/>
          <rect x="160" y="34" width="30" height="22" fill="#F3E6C6" stroke="#3A2716" stroke-width="1.4"/>
          <rect x="200" y="34" width="22" height="38" fill="#7A2318" stroke="#B08A3E" stroke-width="1.4"/>
          <circle cx="217" cy="54" r="1.6" fill="#B08A3E"/>
          <rect x="232" y="34" width="16" height="22" fill="#F3E6C6" stroke="#3A2716" stroke-width="1.4"/>
          <rect x="176" y="12" width="40" height="14" rx="2" fill="#6A4A2C" stroke="#3A2716" stroke-width="1.4"/>
          <path d="M140,46h-8v8h8" fill="none" stroke="#3A2716" stroke-width="1.6"/>
          <g class="wheel" style="transform-origin:168px 82px"><circle cx="168" cy="82" r="14" fill="none" stroke="#3A2716" stroke-width="2.4"/><path d="M168,68v28M154,82h28M158,72l20,20M178,72l-20,20" stroke="#3A2716" stroke-width="1.2"/></g>
          <g class="wheel" style="transform-origin:236px 78px"><circle cx="236" cy="78" r="18" fill="none" stroke="#3A2716" stroke-width="2.4"/><path d="M236,60v36M218,78h36M223,65l26,26M249,65l-26,26" stroke="#3A2716" stroke-width="1.2"/></g>
        </g>
        <g class="dust"><circle cx="268" cy="90" r="5" fill="#E2D6BC"/><circle cx="282" cy="86" r="7" fill="#E9DFC8"/><circle cx="296" cy="90" r="4" fill="#E2D6BC"/></g>
      </svg>
      <p class="kicker">Tappa compiuta</p>
      <h3 id="bus-t">La diligenza per ${esc(L.next)} sta per partire.</h3>
      <p class="lead">Vuoi scoprire dove arriverà GattoMatto?</p>
      <p class="small muted">The stagecoach to ${esc(L.next)} is about to leave. Do you want to see where GattoMatto ends up next?</p>
      <div class="bus-actions"><button class="btn wax" data-yes>Sì</button><button class="btn" data-exit>Esci</button></div>
      <p class="bus-pdf"><button class="link" data-pdf2>Scarica il quaderno di Aosta (PDF)</button></p>
    </div>`;
    modal.querySelector('[data-yes]').focus();
    modal.querySelector('[data-yes]').addEventListener('click', contact);
    modal.querySelector('[data-exit]').addEventListener('click', () => { modal.hidden = true; ctx.onClose(); });
    modal.querySelector('[data-pdf2]').addEventListener('click', async (e) => { const b = e.currentTarget; b.textContent = 'Preparo il quaderno…'; try { const m = await import('./pdf.js'); await m.makeNotebook(L, S); b.textContent = 'Quaderno scaricato'; } catch (err) { console.error(err); b.textContent = 'Riprova a scaricare il quaderno'; } });
  }
  function contact() {
    const sheet = modal.querySelector('.sheet');
    const addr = 'ti.oohay@iksvorimednarim'.split('').reverse().join(''); // kept scrambled, never shown on the page
    const subject = `Viaggio in Italia: voglio continuare dopo ${L.name}`;
    const body = `Ciao!\n\nHo finito la tappa di ${L.name}${S.test ? ` (prova del custode: ${S.test.score}/${S.test.total})` : ''}.\nVoglio sapere dove andrà GattoMatto.\n\n${S.name || ''}`;
    location.href = `mailto:${addr}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    sheet.innerHTML = `<p class="kicker">Il viaggio continua</p><h3>A presto!</h3>
      <p class="prose small">Your email app should open with a message ready to send. If it does not open, copy the address and write from your usual email.</p>
      <div class="bus-actions"><button class="btn" data-copy>Copia l’indirizzo</button><button class="btn" data-exit>Torna alla mappa</button></div>
      <p class="status" aria-live="polite"></p>`;
    sheet.querySelector('[data-exit]').addEventListener('click', () => { modal.hidden = true; ctx.onClose(); });
    sheet.querySelector('[data-copy]').addEventListener('click', async () => {
      const st = sheet.querySelector('.status');
      try { await navigator.clipboard.writeText(addr); st.textContent = 'Indirizzo copiato.'; }
      catch { st.textContent = 'The address could not be copied. Try again.'; }
    });
  }

  /* ================= exercises ================= */
  function drill(host, items, { mode, onDone }) {
    const queue = items.map((it, k) => ({ ...it, k, retry: false }));
    const firstTry = new Map();
    const wrong = [];
    let pos = 0, total = items.length;
    const render = () => {
      if (pos >= queue.length) {
        const score = [...firstTry.values()].filter(Boolean).length;
        if (mode === 'practice') host.innerHTML = `<div class="drill-end"><p class="score">${score} / ${total}</p><p class="prose small">${score === total ? 'Perfetto: everything right at the first try.' : 'Done. The questions you missed came back, and now you know them.'}</p><button class="btn small" data-again>Ricomincia</button></div>`;
        host.querySelector('[data-again]')?.addEventListener('click', () => drill(host, items, { mode, onDone }));
        onDone({ score, total, wrong });
        return;
      }
      const it = queue[pos];
      const opts = it.options ? (it.type === 'order' ? [] : shuffle(it.options)) : [];
      host.innerHTML = `<div class="q ${it.type}">
        <p class="q-n">${Math.min(pos + 1, queue.length)} / ${queue.length}${it.retry ? ' <span class="again">again</span>' : ''}</p>
        ${it.img ? `<div class="q-img">${icon(it.img)}</div>` : ''}
        ${it.type === 'listen' ? `<button class="btn listen" data-play><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10Z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg> Ascolta</button>` : ''}
        <p class="q-text">${esc(it.q)}</p>
        ${it.type === 'input' ? `<div class="q-input"><input autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer"><button class="btn" data-ok>Controlla</button></div>` : ''}
        ${it.type === 'order' ? `<p class="built" aria-live="polite"></p><div class="tiles">${shuffle(it.tiles).map(t => `<button class="tile">${esc(t)}</button>`).join('')}</div><div class="q-input"><button class="btn small ghost" data-clear>Cancella</button><button class="btn" data-ok>Controlla</button></div>` : ''}
        ${opts.length ? `<div class="opts">${opts.map(o => `<button class="choice">${esc(o)}</button>`).join('')}</div>` : ''}
        <p class="err" hidden></p><div class="fb" aria-live="polite"></div></div>`;
      const q = host.querySelector('.q');
      if (it.type === 'listen') { say(it.say); q.querySelector('[data-play]').addEventListener('click', () => speak(it.say, .85)); }
      const built = [];
      if (it.type === 'order') {
        q.querySelector('.tiles').addEventListener('click', (e) => { const t = e.target.closest('.tile'); if (!t || t.disabled) return; built.push(t.textContent); t.disabled = true; q.querySelector('.built').textContent = built.join(' '); q.querySelector('.err').hidden = true; });
        q.querySelector('[data-clear]').addEventListener('click', () => { built.length = 0; q.querySelectorAll('.tile').forEach(t => t.disabled = false); q.querySelector('.built').textContent = ''; });
      }
      const answer = (given, btn) => {
        const accepted = (Array.isArray(it.a) ? it.a : [it.a]).map(norm);
        const ok = accepted.includes(norm(given));
        if (!firstTry.has(it.k)) firstTry.set(it.k, ok);
        if (!ok && !wrong.find(w => w.k === it.k)) wrong.push({ k: it.k, q: it.q, given, a: Array.isArray(it.a) ? it.a[0] : it.a, why: it.why });
        if (mode === 'test') { pos++; render(); return; }
        q.querySelectorAll('.choice, .tile, input, [data-ok], [data-clear]').forEach(x => x.disabled = true);
        if (btn) btn.classList.add(ok ? 'right' : 'wrong');
        if (!ok) { q.querySelectorAll('.choice').forEach(c => { if (norm(c.textContent) === accepted[0]) c.classList.add('right'); }); if (!it.retry) queue.push({ ...it, retry: true }); }
        q.querySelector('.fb').innerHTML = `<p class="${ok ? 'yes' : 'no'}">${ok ? 'Giusto!' : `The answer is: <b>${esc(Array.isArray(it.a) ? it.a[0] : it.a)}</b>`}</p>${it.why ? `<p class="small muted">${esc(it.why)}</p>` : ''}<button class="btn small" data-go>Avanti</button>`;
        if (ok && it.type !== 'listen') { const a1 = Array.isArray(it.a) ? it.a[0] : it.a; const itPart = it.q.includes('? ___') ? it.q.split('? ')[1] : it.q; say(itPart.includes('___') ? itPart.replace('___', a1).replace('l’ ', 'l’') : a1); }
        const go2 = q.querySelector('[data-go]'); go2.focus(); go2.addEventListener('click', () => { pos++; render(); });
      };
      q.querySelector('.opts')?.addEventListener('click', (e) => { const b = e.target.closest('.choice'); if (b) answer(b.textContent, b); });
      q.querySelector('[data-ok]')?.addEventListener('click', () => {
        const v = it.type === 'order' ? built.join(' ') : q.querySelector('input').value;
        if (!v.trim()) { const er = q.querySelector('.err'); er.textContent = it.type === 'order' ? 'Tap the words to build the sentence first.' : 'Write an answer first.'; er.hidden = false; return; }
        answer(v);
      });
      q.querySelector('.q-input input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') q.querySelector('[data-ok]').click(); });
      q.querySelector('.q-input input')?.addEventListener('input', () => { q.querySelector('.err').hidden = true; });
      (q.querySelector('input') || q.querySelector('.choice') || q.querySelector('.tile'))?.focus({ preventScroll: true });
    };
    render();
  }

  if (canSpeak() && !hasItalianVoice()) setTimeout(() => { if (!hasItalianVoice()) $('[data-act="audio"]').title = 'No Italian voice found on this device'; }, 1500);
  drawNav();
  go(0);
  return { go };
}
