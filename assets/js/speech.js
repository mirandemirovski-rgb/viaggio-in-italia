// Italian voice, from the browser. Nothing is recorded or sent anywhere.
let voice = null;
function pick() {
  try {
    const all = speechSynthesis.getVoices().filter(v => /^it(-|_|$)/i.test(v.lang));
    voice = all.find(v => /google/i.test(v.name)) || all.find(v => /it-IT/i.test(v.lang)) || all[0] || null;
  } catch { voice = null; }
}
try { pick(); speechSynthesis.onvoiceschanged = pick; } catch { /* no speech */ }

export function canSpeak() { return 'speechSynthesis' in window; }
export function hasItalianVoice() { if (!voice) pick(); return !!voice; }

export function speak(text, rate = .92) {
  if (!canSpeak() || !text) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'it-IT'; u.rate = rate;
    if (!voice) pick();
    if (voice) u.voice = voice;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch { /* ignore */ }
}
