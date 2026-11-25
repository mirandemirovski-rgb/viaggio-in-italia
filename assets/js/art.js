// Ink drawings for the lessons: exercise icons and city scenes.
import { GATTOMATTO } from './glyphs.js';

const I = {
  pane: '<path class="is" fill="#D7A05A" d="M7 41c0-12 11-21 25-21s25 9 25 21c0 4-3 6-7 6H14c-4 0-7-2-7-6z"/><path class="ik" d="M20 29l5 9M30 26l5 10M41 28l4 8"/>',
  cornetto: '<path class="is" fill="#D7A05A" d="M6 40c4-10 14-17 26-17s22 7 26 17c-6 4-14 2-17-2-3 4-15 4-18 0-3 4-11 6-17 2z"/><path class="ik" d="M22 26l2 12M32 24v14M42 26l-2 12"/>',
  zaino: '<path class="is" fill="#8E6B45" d="M17 22c0-7 6-12 15-12s15 5 15 12v26c0 3-2 5-5 5H22c-3 0-5-2-5-5z"/><path class="is" fill="#A88257" d="M17 25c4 4 26 4 30 0v9c-4 3-26 3-30 0z"/><rect class="is" fill="#C9A26B" x="26" y="38" width="12" height="9" rx="2"/><path class="ik" d="M25 10c0-4 14-4 14 0"/>',
  chiave: '<circle class="is" fill="#C49A45" cx="18" cy="32" r="11"/><circle class="is" fill="#F3E6C6" cx="18" cy="32" r="5"/><path class="is" fill="#C49A45" d="M28 29h28v6h-4v6h-5v-6h-3v5h-5v-5H28z"/>',
  arco: '<path class="is" fill="#E6D8B8" d="M10 56V20h44v36H40V40a8 8 0 0 0-16 0v16z"/><rect class="is" fill="#EDE2C7" x="7" y="13" width="50" height="8"/><path class="ik" d="M14 28h6M44 28h6M14 36h6M44 36h6"/>',
  fontana: '<path class="is" fill="#E6D8B8" d="M8 44h48l-4 10H12z"/><rect class="is" fill="#E6D8B8" x="28" y="20" width="8" height="24"/><path class="is" fill="#E6D8B8" d="M22 18h20l-3 5H25z"/><path d="M36 26q10 2 10 16" fill="none" stroke="#5F8E9B" stroke-width="2.4" stroke-linecap="round"/><path d="M14 46h36" stroke="#7FA7B0" stroke-width="3"/>',
  gatto: '<path fill="#2F2622" d="M20 54c-6 0-8-6-6-12 2-7 5-12 5-18l-2-12 7 6c3-1 7-1 10 0l7-6-2 12c0 6 4 11 5 17 1 7-1 13-7 13z"/><path d="M47 52c8 0 10-6 6-12" fill="none" stroke="#2F2622" stroke-width="4" stroke-linecap="round"/><ellipse cx="25" cy="22" rx="2" ry="1.2" fill="#F0C75E"/><ellipse cx="35" cy="22" rx="2" ry="1.2" fill="#F0C75E"/>',
  acqua: '<path class="is" fill="#F6EFE0" d="M18 12h28l-4 42H22z"/><path fill="#9FC0C8" d="M20 28h24l-2.6 24H22.6z"/><path class="ik" d="M18 12h28l-4 42H22z"/>',
  sole: '<circle class="is" fill="#E7B84A" cx="32" cy="32" r="12"/><path class="ik" d="M32 6v8M32 50v8M6 32h8M50 32h8M13 13l6 6M45 45l6 6M51 13l-6 6M19 45l-6 6"/>',
  neve: '<path class="ik w3" d="M32 8v48M11 20l42 24M53 20L11 44"/><path class="ik" d="M26 12l6 5 6-5M26 52l6-5 6 5M10 27l8 1-1-8M54 37l-8-1 1 8M54 27l-8 1 1-8M10 37l8-1-1 8"/>',
  zucchero: '<path class="is" fill="#FBF8F0" d="M10 34l12-6 12 6v12l-12 6-12-6z"/><path class="ik" d="M10 34l12 6 12-6M22 40v12"/><path class="is" fill="#FBF8F0" d="M30 26l12-6 12 6v12l-12 6-12-6z"/><path class="ik" d="M30 26l12 6 12-6M42 32v12"/>',
  caffe: '<path class="is" fill="#F6EFE0" d="M14 30h30v8c0 8-6 13-15 13S14 46 14 38z"/><path class="ik" d="M44 32c7 0 7 9 0 9"/><ellipse class="is" fill="#F6EFE0" cx="29" cy="53" rx="20" ry="4"/><ellipse cx="29" cy="31" rx="13" ry="2.4" fill="#5A3A22"/><path class="ik" d="M24 24q-3-5 0-10M33 24q3-5 0-10"/>',
  lanterna: '<path class="ik" d="M32 6v8"/><rect class="is" fill="#FFD27A" x="22" y="16" width="20" height="30" rx="3"/><path class="ik w3" d="M19 16h26M19 46h26"/><path class="ik" d="M27 16v30M37 16v30"/>',
  montagna: '<path class="is" fill="#C9CDB8" d="M4 54l20-34 10 14 8-10 18 30z"/><path fill="#FBF8F0" d="M24 20l-6 10 6-2 4 4 3-4zM42 24l-4 6 4-1 3 3 2-3z"/>',
  chiesa: '<rect class="is" fill="#E6D8B8" x="24" y="20" width="16" height="36"/><path class="is" fill="#B06A45" d="M22 20l10-14 10 14z"/><path class="ik" d="M29 28h6v8h-6zM29 44h6v12h-6z"/>',
};

export function icon(name, cls = '') {
  return `<svg class="icon ${cls}" viewBox="0 0 64 64" aria-hidden="true">${I[name] || ''}</svg>`;
}

/* ---------- the explorable square of Aosta ---------- */
export function piazzaScene() {
  let cob = '';
  for (let r = 0; r < 6; r++) for (let c = 0; c < 26; c++) {
    const x = c * 38 + (r % 2) * 19 - 10, y = 452 + r * 16;
    cob += `<path d="M${x},${y}q17,-5 34,0" />`;
  }
  return `<svg class="scene" viewBox="0 0 960 540" role="img" aria-label="La piazza di Aosta all’alba">
  <rect width="960" height="540" fill="#F1E3C1"/>
  <rect width="960" height="200" fill="#EADBB5"/>
  <g class="spot" data-spot="sole" tabindex="0"><circle cx="820" cy="86" r="30" fill="#E7B84A" class="ink1"/><path class="ink1" d="M820,38v-14M820,148v-14M772,86h-14M882,86h-14M786,52l-10-10M854,120l10,10M854,52l10-10M786,120l-10,10"/></g>
  <g class="spot" data-spot="montagna" tabindex="0">
    <path class="ink1" fill="#CBCFB9" d="M0,250L90,120L150,180L250,70L330,170L400,120L470,200L560,90L650,190L720,140L800,210L890,130L960,190V300H0Z"/>
    <path class="ink05" d="M250,70L262,150M262,96L276,170M560,90L572,170M572,118L588,190M90,120L100,200"/>
  </g>
  <g class="spot" data-spot="neve" tabindex="0">
    <path class="ink05" fill="#FBF8F0" d="M250,70L222,110L236,104L250,118L264,102L280,112ZM560,90L534,126L548,120L562,132L576,118L590,128ZM90,120L70,150L82,146L92,156L102,144L112,150Z"/>
  </g>
  <path class="ink1" fill="#B9C0A4" d="M0,300L120,230L220,280L330,240L450,290L560,250L700,300L820,260L960,300V340H0Z"/>
  <g class="ink1">
    <path fill="#E2C48F" d="M0,250h120v120H0z"/><path fill="#B06A45" d="M-6,250L60,214L126,250Z"/>
    <path fill="#E8CFA0" d="M470,262h120v110H470z"/><path fill="#A85E3C" d="M464,262L530,230L596,262Z"/>
  </g>
  <g class="spot" data-spot="chiesa" tabindex="0">
    <rect class="ink1" fill="#E6D8B8" x="604" y="140" width="46" height="170"/>
    <path class="ink1" fill="#8E9C84" d="M598,140L627,64L656,140Z"/>
    <path class="ink1" fill="#3A2716" d="M616,158h8v18h-8zM630,158h8v18h-8zM616,206h22v14h-22z"/>
    <path class="ink05" d="M604,190h46M604,240h46"/>
    <path class="ink1" d="M627,64v-14m-5,5h10"/>
  </g>
  <g class="spot" data-spot="arco" tabindex="0">
    <path class="ink1" fill="#E6D8B8" d="M222,430V200H438V430H372V318A42,42 0 0 0 288,318V430Z"/>
    <rect class="ink1" fill="#EDE2C7" x="210" y="182" width="240" height="22"/>
    <rect class="ink1" fill="#EDE2C7" x="216" y="170" width="228" height="14"/>
    <path class="ink05" d="M236,214v206M256,214v206M404,214v206M424,214v206M222,250h50M388,250h50M222,300h50M388,300h50M222,360h50M388,360h50"/>
    <path fill="#D9E0CF" class="ink1" d="M288,430V318A42,42 0 0 1 372,318V430Z"/>
    <path class="ink05" d="M300,430l20,-60M360,430l-20,-60M330,370v60"/>
  </g>
  <g class="inscription" hidden>
    <rect class="ink1" fill="#D8C9A6" x="258" y="234" width="144" height="34"/>
    <text x="330" y="256" text-anchor="middle" class="carve">XVII · V · XI · XIII · X · I</text>
  </g>
  <g class="spot" data-spot="panetteria" tabindex="0">
    <rect class="ink1" fill="#E9C394" x="640" y="270" width="290" height="180"/>
    <path class="ink1" fill="#9B4A33" d="M632,262h306v12H632z"/>
    <g class="awning"></g>
    <rect class="ink1" fill="#7A4A28" x="840" y="352" width="58" height="98"/>
    <circle cx="887" cy="402" r="3" fill="#E7B84A"/>
  </g>
  <g class="spot" data-spot="cartello" tabindex="0">
    <rect class="ink1" fill="#5A3A1E" x="690" y="282" width="190" height="40" rx="3"/>
    <text x="785" y="301" text-anchor="middle" class="sign-big">PANETTERIA</text>
    <text x="785" y="316" text-anchor="middle" class="sign-small">BOULANGERIE</text>
  </g>
  <g class="spot" data-spot="pane" tabindex="0">
    <rect class="ink1" fill="#F7E6C4" x="662" y="364" width="160" height="70"/>
    <path class="ink1" fill="#C98A44" d="M680,418c0-12 10-18 22-18s22,6 22,18z"/><path class="ink1" fill="#B87835" d="M728,420c0-14 12-22 26-22s26,8 26,22z"/><path class="ink1" fill="#D19A55" d="M778,418c0-10 9-15 18-15s18,5 18,15z"/>
    <path class="ink05" d="M690,406l4,8M700,403l4,9M738,404l5,10M752,401l5,11"/>
  </g>
  <g class="spot" data-spot="gatto" tabindex="0">
    <path fill="#2F2622" d="M870,262c-14,0-20-4-20-10c0-7 8-10 14-10l3-10 5,7c3,0 6,0 8,1l4-7 2,10c4,2 6,6 6,10c0,6-8,9-22,9z"/>
    <path d="M850,254q-14,-2 -12,-16" fill="none" stroke="#2F2622" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="884" cy="245" rx="1.6" ry="1" fill="#F0C75E"/>
  </g>
  <g class="cobbles">${cob}</g>
  <g class="spot" data-spot="fontana" tabindex="0">
    <ellipse class="ink1" fill="#E6D8B8" cx="486" cy="470" rx="80" ry="18"/>
    <path class="ink1" fill="#E6D8B8" d="M406,470v26c0,10 160,10 160,0v-26"/>
    <ellipse fill="#9FC0C8" cx="486" cy="472" rx="68" ry="12"/>
    <rect class="ink1" fill="#E6D8B8" x="476" y="390" width="20" height="82"/>
    <path class="ink1" fill="#E6D8B8" d="M462,386h48l-6,10h-36z"/>
    <path d="M496,402q26,4 26,58" fill="none" stroke="#5F8E9B" stroke-width="3" stroke-linecap="round" class="water"/>
  </g>
  <g class="spot" data-spot="caffe" tabindex="0">
    <ellipse class="ink1" fill="#F3EEE4" cx="610" cy="470" rx="44" ry="10"/>
    <rect fill="#5B4A3A" x="606" y="470" width="8" height="56"/>
    <ellipse fill="#5B4A3A" cx="610" cy="527" rx="20" ry="5"/>
    <ellipse class="ink1" fill="#FFFFFF" cx="604" cy="462" rx="16" ry="4"/>
    <path class="ink1" fill="#FFFFFF" d="M594,444h20v10c0,6-4,9-10,9s-10-3-10-9z"/>
    <path class="ink1" d="M614,447c6,0 6,8 0,8"/>
    <path class="steam" d="M600,438q-4,-7 0,-14M608,438q4,-7 0,-14"/>
  </g>
  <g class="spot" data-spot="lanterna" tabindex="0">
    <circle cx="183" cy="440" r="40" fill="#F2B544" class="glow"/>
    <g transform="translate(92 340) scale(.62)"><g fill="#120D0A">${GATTOMATTO}</g><path d="M121,79L148,73M122,82L150,82M121,85L146,91" stroke="#E7B865" stroke-width="1.6" fill="none"/><ellipse cx="112" cy="70" rx="2.8" ry="1.4" fill="#FFC24A"/><path d="M139,178V188" stroke="#2A1D10" stroke-width="2"/><rect x="132" y="188" width="14" height="18" rx="2" fill="#FFD27A" stroke="#2A1D10" stroke-width="2"/></g>
  </g>
  <g class="sparkles"></g>
</svg>`;
}

/* ---------- the prologue: night on the pass ---------- */
export function prologueScene() {
  let stars = '', flakes = '';
  let s = 7; const r = () => (s = s * 16807 % 2147483647) / 2147483647;
  for (let i = 0; i < 70; i++) stars += `<circle cx="${(r() * 960).toFixed(0)}" cy="${(r() * 220).toFixed(0)}" r="${(r() * 1.2 + .3).toFixed(1)}" style="animation-delay:${(-r() * 4).toFixed(1)}s"/>`;
  for (let i = 0; i < 60; i++) flakes += `<circle cx="${(r() * 960).toFixed(0)}" cy="${(r() * -420).toFixed(0)}" r="${(r() * 1.8 + .8).toFixed(1)}" style="animation-duration:${(6 + r() * 6).toFixed(1)}s;animation-delay:${(-r() * 12).toFixed(1)}s"/>`;
  return `<svg class="scene night" viewBox="0 0 960 400" role="img" aria-label="Notte sul passo del Gran San Bernardo">
  <rect width="960" height="400" fill="#18233A"/>
  <g class="stars" fill="#E9E2CC">${stars}</g>
  <circle cx="790" cy="70" r="26" fill="#EDE6D0"/><circle cx="800" cy="62" r="23" fill="#18233A"/>
  <path d="M0,260L120,140L190,200L300,90L390,190L470,130L560,210L660,110L760,200L860,150L960,210V400H0Z" fill="#2B3A55" stroke="#5B6F8F" stroke-width="1.2"/>
  <path d="M300,90L272,128L288,122L302,136L318,120L334,130ZM660,110L634,146L648,140L662,152L676,138L690,148Z" fill="#DCE3EA"/>
  <path d="M0,330Q240,290 480,320T960,310V400H0Z" fill="#DCE3EA"/>
  <path d="M0,330Q240,290 480,320T960,310" fill="none" stroke="#9AA9BE" stroke-width="1.4"/>
  <g class="page-glint"><rect x="610" y="318" width="44" height="30" rx="2" fill="#F3E6C6" transform="rotate(-8 632 333)"/><path d="M616,326h30M616,333h26M616,340h28" stroke="#7A3B12" stroke-width="1.2" transform="rotate(-8 632 333)"/><circle cx="632" cy="333" r="30" fill="#F2B544" opacity=".25" class="glow"/></g>
  <circle cx="395" cy="300" r="56" fill="#F2B544" class="glow"/>
  <g transform="translate(300 196) scale(.55)"><g fill="#0B0E16" stroke="#E6A243" stroke-width="1.2">${GATTOMATTO}</g><path d="M121,79L148,73M122,82L150,82M121,85L146,91" stroke="#E7B865" stroke-width="1.6" fill="none"/><ellipse cx="112" cy="70" rx="2.8" ry="1.4" fill="#FFC24A"/><path d="M139,178V188" stroke="#2A1D10" stroke-width="2"/><rect x="132" y="188" width="14" height="18" rx="2" fill="#FFD27A" stroke="#2A1D10" stroke-width="2"/></g>
  <g class="flakes" fill="#FFFFFF">${flakes}</g>
</svg>`;
}

/* ---------- city header ---------- */
export function cityBanner() {
  return `<svg class="banner" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <rect width="1200" height="200" fill="#EADBB5"/>
  <path d="M0,150L110,60L180,110L300,20L390,100L470,60L560,120L680,30L770,110L860,70L960,130L1060,60L1200,120V200H0Z" fill="#CBCFB9" stroke="#3A2716" stroke-width="1.4"/>
  <path d="M300,20L276,52L290,47L302,59L316,45L330,54ZM680,30L656,62L670,57L682,69L696,55L710,64ZM1060,60L1040,88L1052,84L1062,94L1074,82L1086,90Z" fill="#FBF8F0"/>
  <path d="M0,170Q300,140 600,165T1200,160V200H0Z" fill="#F1E3C1" stroke="#3A2716" stroke-width="1.2"/>
  <g transform="translate(520 64)"><path d="M0,104V20H120V104H86V64A26,26 0 0 0 34,64V104Z" fill="#E6D8B8" stroke="#3A2716" stroke-width="1.4"/><rect x="-6" y="8" width="132" height="14" fill="#EDE2C7" stroke="#3A2716" stroke-width="1.4"/></g>
  <g transform="translate(700 52)"><rect width="22" height="92" fill="#E6D8B8" stroke="#3A2716" stroke-width="1.4"/><path d="M-3,0L11,-36L25,0Z" fill="#8E9C84" stroke="#3A2716" stroke-width="1.4"/></g>
</svg>`;
}

/* ---------- the seal of a city ---------- */
export function sealSVG(roman = 'I') {
  return `<svg class="wax-seal" viewBox="0 0 120 120" role="img" aria-label="Il sigillo di Aosta">
  <path d="M60,6C78,4 92,14 104,26C116,40 118,58 114,74C110,92 96,108 76,113C58,118 38,114 24,102C10,90 4,72 6,54C8,34 20,16 38,9C45,7 52,6 60,6Z" fill="#8E2A1E" stroke="#5E1A12" stroke-width="2"/>
  <circle cx="60" cy="60" r="40" fill="none" stroke="#C7685A" stroke-width="2"/>
  <circle cx="60" cy="60" r="34" fill="none" stroke="#5E1A12" stroke-width="1"/>
  <path d="M42,78V48H78V78H69V64A9,9 0 0 0 51,64V78Z" fill="#B0463A" stroke="#F2D9C4" stroke-width="1.6"/>
  <rect x="39" y="42" width="42" height="6" fill="#B0463A" stroke="#F2D9C4" stroke-width="1.6"/>
  <text x="60" y="34" text-anchor="middle" font-family="Fell" font-size="10" fill="#F2D9C4" letter-spacing="2">AOSTA</text>
  <text x="60" y="96" text-anchor="middle" font-family="Fell" font-size="12" fill="#F2D9C4">${roman}</text>
</svg>`;
}
