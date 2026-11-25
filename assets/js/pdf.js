// "Il quaderno di viaggio": a PDF with everything learned in a city, made in the browser.
import { GATTOMATTO } from './glyphs.js';

const INK = '#3A2716', WAX = '#8E2A1E', SOFT = '#6B5038', PAPER = '#FBF5E6', LINE = '#CDBB95';
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
const plain = (s) => String(s).replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1');

function loadScript(src) {
  return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
}
async function b64(url) {
  const buf = new Uint8Array(await (await fetch(url)).arrayBuffer());
  let s = '';
  for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
  return btoa(s);
}
function svgToPng(svg, w, h) {
  return new Promise((res, rej) => {
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url); res(c.toDataURL('image/png'));
    };
    img.onerror = rej; img.src = url;
  });
}
const coverArt = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520">
  <rect width="800" height="520" fill="#FBF5E6"/>
  <path d="M0,300L120,170L190,230L320,90L410,200L500,140L600,230L700,150L800,220V520H0Z" fill="#E4DCC4" stroke="#3A2716" stroke-width="2"/>
  <path d="M320,90L292,128L308,122L322,136L338,120L354,130ZM700,150L676,182L690,177L702,189L716,175L730,184ZM120,170L98,200L110,196L120,206L130,194L142,200Z" fill="#FFFFFF"/>
  <path d="M0,400Q400,360 800,395V520H0Z" fill="#F1E5C8" stroke="#3A2716" stroke-width="2"/>
  <g transform="translate(330 200)"><path d="M0,220V40H240V220H190V130A70,70 0 0 0 50,130V220Z" fill="#E6D8B8" stroke="#3A2716" stroke-width="2.4"/><rect x="-14" y="16" width="268" height="26" fill="#EDE2C7" stroke="#3A2716" stroke-width="2.4"/><path d="M50,220V130A70,70 0 0 1 190,130V220Z" fill="#DCE3D2" stroke="#3A2716" stroke-width="2"/></g>
  <circle cx="246" cy="420" r="70" fill="#F2B544" opacity=".35"/>
  <g transform="translate(150 230) scale(.72)"><g fill="#120D0A">${GATTOMATTO}</g><path d="M121,79L148,73M122,82L150,82M121,85L146,91" stroke="#C99A45" stroke-width="2" fill="none"/><ellipse cx="112" cy="70" rx="2.8" ry="1.4" fill="#FFC24A"/><path d="M139,178V188" stroke="#2A1D10" stroke-width="2"/><rect x="132" y="188" width="14" height="18" rx="2" fill="#FFD27A" stroke="#2A1D10" stroke-width="2"/></g>
</svg>`;

export async function makeNotebook(L, S) {
  if (!window.jspdf) await loadScript('assets/vendor/jspdf.umd.min.js');
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const fonts = [['fell.ttf', 'Fell', 'normal'], ['fell-italic.ttf', 'Fell', 'italic'], ['garamond.ttf', 'Garamond', 'normal'], ['garamond-italic.ttf', 'Garamond', 'italic'], ['garamond-500.ttf', 'Garamond', 'bold']];
  const data = await Promise.all(fonts.map(([f]) => b64('assets/fonts/pdf/' + f)));
  fonts.forEach(([f, n, st], i) => { doc.addFileToVFS(f, data[i]); doc.addFont(f, n, st); });
  const cover = await svgToPng(coverArt(), 1600, 1040);

  const W = 210, H = 297, M = 24, CW = W - 2 * M, BOTTOM = H - 26;
  const nome = S.name || 'GattoMatto';
  const now = new Date();
  const data_it = `${now.getDate()} ${MESI[now.getMonth()]} ${now.getFullYear()}`;
  let y = 0;

  const paper = () => {
    doc.setFillColor(PAPER); doc.rect(0, 0, W, H, 'F');
    doc.setDrawColor(INK); doc.setLineWidth(.5); doc.rect(10, 10, W - 20, H - 20);
    doc.setLineWidth(.2); doc.rect(12, 12, W - 24, H - 24);
  };
  const newPage = () => { doc.addPage(); paper(); y = M + 6; };
  const need = (h) => { if (y + h > BOTTOM) newPage(); };
  const font = (f, st, size, color = INK) => { doc.setFont(f, st); doc.setFontSize(size); doc.setTextColor(color); };
  const lh = (size, k = 1.38) => size * .3528 * k;

  const h1 = (t, sub) => {
    need(30);
    font('Fell', 'normal', 24); doc.text(t, M, y); y += 7;
    if (sub) { font('Garamond', 'italic', 12, SOFT); doc.text(sub, M, y); y += 4; }
    doc.setDrawColor(WAX); doc.setLineWidth(.6); doc.line(M, y + 1, M + 28, y + 1); y += 10;
  };
  const h2 = (t, sub) => {
    need(18);
    font('Fell', 'normal', 15); doc.text(t, M, y);
    if (sub) { const w = doc.getTextWidth(t); font('Garamond', 'italic', 11, SOFT); doc.text(sub, M + w + 3, y); }
    y += 6.5;
  };
  const para = (t, { size = 11.5, style = 'normal', color = INK, indent = 0, after = 3 } = {}) => {
    font('Garamond', style, size, color);
    const lines = doc.splitTextToSize(plain(t), CW - indent);
    for (const ln of lines) { need(lh(size)); doc.text(ln, M + indent, y); y += lh(size); }
    y += after;
  };
  // rows: [[left, right], ...]; left in Garamond bold-ish (Italian), right italic (English)
  const table = (rows, { col = .46, size = 11, head } = {}) => {
    const c1 = CW * col, pad = 2.2;
    if (head) {
      need(9);
      font('Fell', 'italic', 10.5, SOFT);
      doc.text(head[0], M + pad, y); doc.text(head[1], M + c1 + pad, y);
      y += 2.5; doc.setDrawColor(INK); doc.setLineWidth(.3); doc.line(M, y, M + CW, y); y += 4.6;
    }
    for (const [a, b] of rows) {
      font('Garamond', 'bold', size);
      const la = doc.splitTextToSize(plain(a), c1 - 2 * pad);
      font('Garamond', 'italic', size, SOFT);
      const lb = doc.splitTextToSize(plain(b), CW - c1 - 2 * pad);
      const rh = Math.max(la.length, lb.length) * lh(size) + 2.2;
      need(rh + 1);
      font('Garamond', 'bold', size); la.forEach((t, i) => doc.text(t, M + pad, y + i * lh(size)));
      font('Garamond', 'italic', size, SOFT); lb.forEach((t, i) => doc.text(t, M + c1 + pad, y + i * lh(size)));
      y += rh;
      doc.setDrawColor(LINE); doc.setLineWidth(.2); doc.line(M, y - lh(size) + .6, M + CW, y - lh(size) + .6);
    }
    y += 4;
  };
  const box = (title, lines, { color = WAX } = {}) => {
    font('Garamond', 'normal', 11);
    const wrapped = lines.flatMap(l => doc.splitTextToSize(plain(l), CW - 12));
    const hgt = 10 + wrapped.length * lh(11) + 4;
    need(hgt + 2);
    doc.setDrawColor(color); doc.setLineWidth(.4); doc.rect(M, y - 4, CW, hgt);
    font('Fell', 'italic', 12, color); doc.text(title, M + 6, y + 2.5);
    font('Garamond', 'normal', 11);
    let yy = y + 9;
    wrapped.forEach(t => { doc.text(t, M + 6, yy); yy += lh(11); });
    y += hgt + 4;
  };
  const seal = (cx, cy, r) => {
    doc.setFillColor(WAX); doc.setDrawColor('#5E1A12'); doc.setLineWidth(.5); doc.circle(cx, cy, r, 'FD');
    doc.setDrawColor('#D9927F'); doc.setLineWidth(.4); doc.circle(cx, cy, r * .76);
    doc.setDrawColor('#5E1A12'); doc.setLineWidth(.2); doc.circle(cx, cy, r * .66);
    font('Fell', 'normal', r * 1.5, '#F4DCC8'); doc.text(L.name.toUpperCase(), cx, cy - r * .3, { align: 'center' });
    font('Fell', 'normal', r * 2.6, '#F4DCC8'); doc.text(L.roman, cx, cy + r * .45, { align: 'center' });
  };

  /* ---------- cover ---------- */
  paper();
  font('Fell', 'normal', 34); doc.text('Viaggio in Italia', W / 2, 44, { align: 'center' });
  font('Fell', 'italic', 14, WAX); doc.text('ovvero il Codice di GattoMatto', W / 2, 53, { align: 'center' });
  doc.setDrawColor(INK); doc.setLineWidth(.3); doc.line(W / 2 - 38, 59, W / 2 - 4, 59); doc.line(W / 2 + 4, 59, W / 2 + 38, 59);
  doc.setFillColor(WAX); doc.triangle(W / 2, 57, W / 2 + 2, 59, W / 2, 61, 'F'); doc.triangle(W / 2, 57, W / 2 - 2, 59, W / 2, 61, 'F');
  doc.addImage(cover, 'PNG', M, 70, CW, CW * 520 / 800);
  doc.setDrawColor(INK); doc.setLineWidth(.4); doc.rect(M, 70, CW, CW * 520 / 800);
  let cy = 70 + CW * 520 / 800 + 18;
  font('Garamond', 'italic', 13, SOFT); doc.text('Il quaderno di viaggio di', W / 2, cy, { align: 'center' });
  font('Fell', 'normal', 28); doc.text(nome, W / 2, cy + 12, { align: 'center' });
  font('Fell', 'normal', 16); doc.text(`Tappa ${L.roman}: ${L.name}`, W / 2, cy + 26, { align: 'center' });
  font('Garamond', 'italic', 12.5, SOFT); doc.text(`${L.title}, livello ${L.level}`, W / 2, cy + 33, { align: 'center' });
  if (S.test?.passed) seal(W / 2, cy + 52, 11);
  font('Garamond', 'normal', 11, SOFT);
  doc.text(data_it, W / 2, H - 42, { align: 'center' });
  if (S.test) doc.text(`Prova del custode: ${S.test.score} su ${S.test.total}`, W / 2, H - 36.5, { align: 'center' });
  font('Fell', 'italic', 11.5); doc.text('Concept and Web Design by Miran Demirovski', W / 2, H - 24, { align: 'center' });

  /* ---------- 1. what you can do now ---------- */
  newPage();
  h1('Ora sai…', 'What you can do now');
  L.goals.forEach(([it, en]) => {
    need(14);
    doc.setFillColor(WAX); doc.circle(M + 1.5, y - 1.3, .9, 'F');
    font('Garamond', 'bold', 12); doc.text(it, M + 6, y); y += lh(12);
    font('Garamond', 'italic', 11, SOFT); doc.text(en, M + 6, y); y += lh(11) + 2.4;
  });
  y += 4;
  h2('Il codice', 'the page in the snow');
  L.prologue.page.forEach(l => { need(12); font('Fell', 'italic', 13); doc.text(plain(l.it), M + 4, y); y += lh(13); font('Garamond', 'normal', 10.5, SOFT); doc.text(l.en, M + 4, y); y += lh(10.5) + 1.6; });
  y += 3;
  box('La prima parola del codice', S.cipher
    ? ['Under the arch: XVII · V · XI · XIII · X · I. In Italian words: diciassette, cinque, undici, tredici, dieci, uno. With the Italian alphabet (A = 1, B = 2…) they become: S E M O L A.', 'La semola is the flour of durum wheat, the flour of pasta. Why would an ancient secret begin with flour?']
    : ['The inscription under the arch is still waiting for you. Go back to Aosta, to “Alfabeto e numeri”, and read it.']);

  /* ---------- 2. vocabulary ---------- */
  newPage();
  h1('Il vocabolario', 'The words of Aosta');
  L.vocab.forEach(g => { h2(g.t, g.en); table(g.words); });
  const saved = [...(S.zaino?.values?.() || [])];
  h2(saved.length ? `Lo zaino di ${nome}` : 'Le curiosità di Aosta', saved.length ? 'the curiosities you saved' : 'curiosities from the square');
  (saved.length ? saved : L.piazza.spots).forEach(s => {
    need(16);
    font('Garamond', 'bold', 11.5); doc.text(s.it, M, y);
    const w = doc.getTextWidth(s.it); font('Garamond', 'italic', 11, SOFT); doc.text(s.en, M + w + 2.5, y); y += lh(11.5);
    para(s.txt, { size: 10.5, after: 2.4 });
  });

  /* ---------- 3. expressions ---------- */
  newPage();
  h1('Le espressioni', 'What to say, and when');
  L.expressions.forEach(g => { h2(g.t, g.en); table(g.rows); });
  h2('Tu o Lei?', 'informal or formal');
  table(L.panetteria.compare.map(r => [`${r[0]}   /   ${r[1]}`, r[2]]), { col: .62, head: ['tu   /   Lei', 'English'] });
  h2('Salutare durante il giorno', 'greetings through the day');
  table(L.saluti.periods.map(p => [`${p.name}: ${p.arrive}`, `when you leave: ${p.leave}`]), { col: .5 });
  L.saluti.notes.forEach(n => para(`${n.t}. ${n.txt}`, { size: 10.5, after: 1.8 }));

  /* ---------- 4. grammar ---------- */
  newPage();
  h1('La grammatica', 'The building blocks');
  L.grammatica.cards.forEach(c => { h2(c.t, c.en); table(c.table, { col: .4, size: 10.5 }); para(c.note, { size: 10.5, style: 'italic', color: SOFT, after: 5 }); });

  /* ---------- 5. dialogues ---------- */
  if (S.name) {
    newPage();
    h1('I tuoi dialoghi', 'Your conversations in Aosta');
    const fill = (t) => plain(t)
      .replace(/\{NOME\}/g, S.name).replace(/\{CITTA\}/g, S.city || '')
      .replace(/\{BENV\}/g, S.gender === 'f' ? 'Benvenuta' : 'Benvenuto')
      .replace(/\{NAZ_IT\}/g, S.nation ? ` Sono ${S.gender === 'f' ? S.nation[2] : S.nation[1]}.` : '')
      .replace(/\{NAZ_EN\}/g, S.nation ? ` I’m ${S.nation[3]}.` : '');
    L.panetteria.dialogues.forEach(D => {
      h2(D.title, D.register === 'Lei' ? 'formal, with Lei' : 'informal, with tu');
      D.lines.forEach(l => {
        const it = l.who === 'tu' ? l.options.find(o => o.ok).it : l.it;
        const who = l.who === 'tu' ? S.name : l.who;
        need(13);
        font('Fell', 'italic', 10.5, l.who === 'tu' ? WAX : SOFT); doc.text(who, M, y);
        font('Garamond', 'bold', 11.5);
        const lines = doc.splitTextToSize(fill(it), CW - 26); lines.forEach((t, i) => doc.text(t, M + 24, y + i * lh(11.5)));
        y += lines.length * lh(11.5);
        font('Garamond', 'italic', 10.5, SOFT); doc.text(fill(l.en), M + 24, y); y += lh(10.5) + 2;
      });
      y += 4;
    });
  }

  /* ---------- 6. alphabet, sounds, numbers ---------- */
  newPage();
  h1('Alfabeto, pronuncia, numeri', 'Spelling, sounds and counting');
  const A = L.alfabeto;
  h2('L’alfabeto', '21 letters, and five for foreign words');
  const cells = [...A.letters, ...A.foreign];
  const cols = 3, cw = CW / cols, rh = 6.6;
  need(Math.ceil(cells.length / cols) * rh + 4);
  cells.forEach(([l, n, c], i) => {
    const cx = M + (i % cols) * cw, yy = y + Math.floor(i / cols) * rh;
    font('Fell', 'normal', 13, i >= A.letters.length ? SOFT : INK); doc.text(l, cx, yy);
    font('Garamond', 'bold', 10.5); doc.text(n, cx + 7, yy);
    font('Garamond', 'italic', 10, SOFT); doc.text(`come ${c}`, cx + 7 + doc.getTextWidth(n) + 2, yy);
  });
  y += Math.ceil(cells.length / cols) * rh + 4;
  para(A.spellingNote, { size: 10.5, style: 'italic', color: SOFT, after: 5 });
  h2('La pronuncia', 'how Italian sounds');
  table(A.sounds.map(s => [`${s.rule}: ${s.ex.join(', ')}`, s.en]), { col: .52, size: 10.5 });
  h2('I numeri da 0 a 20');
  const ncols = 3, nrh = 6.2;
  need(Math.ceil(A.numbers.length / ncols) * nrh + 4);
  A.numbers.forEach((n, i) => {
    const col = Math.floor(i / 7), row = i % 7;
    const cx = M + col * (CW / ncols), yy = y + row * nrh;
    font('Fell', 'normal', 12, WAX); doc.text(String(i), cx + 6, yy, { align: 'right' });
    font('Garamond', 'normal', 11.5); doc.text(n, cx + 10, yy);
  });
  y += 7 * nrh + 3;
  para(A.numbersNote, { size: 10.5, style: 'italic', color: SOFT });

  /* ---------- closing ---------- */
  need(70);
  y += 6;
  doc.setDrawColor(INK); doc.setLineWidth(.3); doc.line(M, y, M + CW, y); y += 10;
  font('Fell', 'normal', 18); doc.text('Il viaggio continua', M, y); y += 7;
  para(`La diligenza per ${L.next} sta per partire. GattoMatto has the first word of the code in his pocket. The next stop is waiting.`, { size: 11.5, style: 'italic', color: SOFT });
  para('The lessons of Viaggio in Italia follow the CEFR levels of the Council of Europe, the reference syllabi of the Italian certification bodies (CILS, CELI, PLIDA, CERT.IT) and the progression of the major coursebooks for Italian as a foreign language. All texts are original.', { size: 9.5, color: SOFT });
  font('Fell', 'italic', 12); doc.text('Concept and Web Design by Miran Demirovski', M, y + 4);

  /* ---------- footers ---------- */
  const pages = doc.internal.getNumberOfPages();
  for (let p = 2; p <= pages; p++) {
    doc.setPage(p);
    font('Fell', 'italic', 9, SOFT);
    doc.text(`Viaggio in Italia. Tappa ${L.roman}: ${L.name}`, M, H - 15);
    doc.text(`${p - 1}`, W - M, H - 15, { align: 'right' });
    doc.text(`Il quaderno di ${nome}`, W / 2, H - 15, { align: 'center' });
  }

  const safe = nome.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-');
  doc.save(`Viaggio-in-Italia-${L.name}-${safe}.pdf`);
  return doc;
}
