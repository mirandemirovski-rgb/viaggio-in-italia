// Stagecoach tickets: personal 10-digit codes that unlock the journey after Aosta.
// Only scrambled fingerprints of the codes live here (PBKDF2), never the codes themselves.
const SALT = '51a0ca73b643c12f53fb21a1';
const PRINTS = new Set([
  '1e702e55f2f8f5a6b826fb989e8cb186',
  '9635ff7f5c6aab304623a022d5aa45d9',
  '80c8c479cb4d5e527180d91a7eb1da7a',
  '687245018eeb8d0a4fc490421490402d',
  '8c750939effe3e4fc6b3065b504484c0',
  '61be974b1c03f29c29e0ed3f76619977',
  'ef66e6d0b4a9d1ce06c23777a2fad620',
  '3169fe769435b99f8b159b6c6d041dec',
  '06a9dc7fa13e6975846f89135d4b5e51',
  '5ac1bfe59706b709cba0011c85571a1d',
  '79a3b6f8ef5d14a9f3fad6c9bb0af7eb',
  '151866c222d3d155e1cfa221fa33be44',
  '1e2db61632f9086165d5fdbcb8d73d3d',
  'f08fa370b6e73bdc3c69b1f15000cfa1',
  '8a5f80f0ce3439612dca648f0696b8ed',
  '1047ee0fa91a6f24a669a41fb3330e48',
  '125ebdc72e70a2d6996cb7563a76b825',
  '93c7d6dd81926240817fcf07e6fbdbab',
  'd14db678d4ad2005cc04ef641521318e',
  '7504ae93d64f7da5dac501381bb2854d',
  '4daa2b7b35a33e78d77f923039613a2d',
  'caa02bc1311d4e83177d871506fecd19',
  '64e9ffdfbbfb0ce991bc504f24d907ee',
  '280aba52c7c563981b50ab68480ef9c3',
  '6514c92dc6eaaa0be73f483c742039f1',
  'd7fbaf6c7f2b2744c0b42c717ac5b1f8',
  '921914f5c8dc0d258b255fde7c996d07',
  '754c4487ecc0ad315b846d98d3ded7a8',
  '571b55a50bc5291fd789e2ec3853daa0',
  'dde0fe0dff274282ec8bc02f7b5f9b50',
  '6e5d0513f2b861cf3d11db352d6c15d0',
  '34916bc6526da204985ab62bc76aa7de',
  '92d417e7e1aefe54c8014ae7d1f76a51',
  'f565f012b93ad69b4c84237ee33be3d3',
  '3eda9fd46d8a5f922356228d2aa46af4',
  '1717acca8fce27398d0a813a0daaef71',
  '8adadcbc5d5401534f070e0fcb2ad71e',
  '4e528919302bd38ef4a4bcb0f39434d0',
  '37e23c2021f42f28b14aea221e2091e7',
  '3fc913eedb4cbfe7bd63ffb6a94dd9b7',
  'a6ecf4ffb15c74d1b98855ea67fb9d25',
  '469ac901ded957bf8154d8dc63b65c93',
  'a645166b8ce4136129d08a40b29f07b3',
  'fe2b72ff240caece5684bd75bf091570',
  'd8033a692f22373b26bb0ccbc5e178b3',
  '55ea35120ee98510a64795d4dd60853a',
  'ead4e04db49d2d704beb016aafdfe08a',
  '1f20d79ae8e2cb7dcb92957d614055ea',
  '383a7bdb8851866a64d024033cd53db1',
  'ff1f55d79f561453eed869e9bb54ba5a',
  'c1882493361e39454a55d63f1cb1030e',
]);

export async function checkTicket(raw) {
  const code = String(raw || '').replace(/\D/g, '');
  if (code.length !== 10 || !crypto?.subtle) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(code), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(SALT), iterations: 120000, hash: 'SHA-256' }, key, 128);
  return PRINTS.has([...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join(''));
}
