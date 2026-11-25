// Tappa I: Aosta. Livello A1, "Primi contatti".
// Order of contents: CEFR A1; first unit of the main coursebooks (greetings, introductions,
// origin, tu/Lei, essere/avere/chiamarsi, definite article, nationalities, alphabet, numbers 0–20).
// Markup in Italian lines: {parola|translation} becomes a word you can hover and hear.
// Placeholders: {NOME} name, {CITTA} city, {NAZ} nationality, {BENV} Benvenuto/Benvenuta.

export const AOSTA = {
  id: 'aosta',
  name: 'Aosta',
  roman: 'I',
  level: 'A1',
  title: 'Primi contatti',
  kicker: 'Prima tappa, livello A1',
  next: 'Torino',
  goals: [
    ['Salutare e congedarsi, in modo formale e informale', 'Greet people and say goodbye, formally and informally'],
    ['Presentarsi e chiedere il nome a qualcuno', 'Introduce yourself and ask someone’s name'],
    ['Dire di dove sei e chiederlo agli altri', 'Say where you are from, and ask others'],
    ['Scegliere tra tu e Lei', 'Choose between tu and Lei'],
    ['Fare lo spelling e contare da 0 a 20', 'Spell words and count from 0 to 20'],
  ],

  rooms: [
    { id: 'codice', it: 'Il codice', en: 'The code' },
    { id: 'piazza', it: 'La piazza', en: 'The square' },
    { id: 'panetteria', it: 'In panetteria', en: 'At the bakery' },
    { id: 'saluti', it: 'Saluti e gesti', en: 'Greetings and gestures' },
    { id: 'grammatica', it: 'Grammatica', en: 'Grammar' },
    { id: 'alfabeto', it: 'Alfabeto e numeri', en: 'Alphabet and numbers' },
    { id: 'prova', it: 'La prova del custode', en: 'The guardian’s test' },
  ],

  /* ---------- I. Il codice ---------- */
  prologue: {
    story: [
      'Night on the {Gran San Bernardo|the Great St Bernard pass}. Up here, the snow never sleeps.',
      'GattoMatto walks down towards Italy. In his hand, {la lanterna|the lantern} swings in the wind.',
      'Something shines under the snow: an old {pagina|page}. The words run backwards, as if in a mirror. Leonardo da Vinci wrote his notebooks this way.',
    ],
    instruction: 'Slide the mirror across the page to read it.',
    page: [
      { it: '{Ciao|Hello}, {viaggiatore|traveller}.', en: 'Hello, traveller.' },
      { it: '{Io sono|I am} {il Codice|the Code}.', en: 'I am the Code.' },
      { it: '{Non sono|I am not} {oro|gold} {e|and} {non sono|I am not} {argento|silver}.', en: 'I am not gold and I am not silver.' },
      { it: '{Sono|I am} {un segreto|a secret} {antico|ancient}.', en: 'I am an ancient secret.' },
      { it: '{Il segreto|The secret} {è|is} {lontano|far away}, {oltre il mare|beyond the sea}.', en: 'The secret is far away, beyond the sea.' },
      { it: '{La prima chiave|The first key} {è|is} {ad Aosta|in Aosta}, {sotto l’arco|under the arch}.', en: 'The first key is in Aosta, under the arch.' },
      { it: '{Impara le parole|Learn the words}: {le parole aprono le porte|words open doors}.', en: 'Learn the words: words open doors.' },
    ],
    notes: [
      { t: 'Lo sapevi?', txt: 'Leonardo da Vinci wrote most of his notes from right to left, in mirror writing.' },
      { t: 'è oppure e?', txt: '{è|is}, with the accent, is the verb “is”: {Il segreto è lontano|The secret is far away}. {e|and}, without the accent, means “and”.' },
      { t: 'ad Aosta', txt: 'Before a word that begins with a, the preposition {a|to, in} often becomes {ad|to, in}: {ad Aosta|in Aosta}, {ad Ancona|in Ancona}.' },
    ],
  },

  /* ---------- II. La piazza ---------- */
  piazza: {
    intro: 'GattoMatto reaches Aosta at dawn, under the Roman arch. Explore the square: hover over or tap what you see. Save the words you want to keep: they will be in your notebook at the end.',
    mission: ['gatto', 'fontana', 'arco'],
    spots: [
      { id: 'arco', it: 'l’arco', en: 'the arch', txt: 'L’Arco d’Augusto was built in 25 BC, when the Romans founded the city, in honour of the emperor Augustus. Aosta is called “la piccola Roma delle Alpi”, the little Rome of the Alps.' },
      { id: 'montagna', it: 'la montagna', en: 'the mountain', txt: 'Valle d’Aosta is the smallest region of Italy, but some of the highest mountains in Europe stand around it: il Monte Bianco, il Cervino, il Monte Rosa.' },
      { id: 'neve', it: 'la neve', en: 'the snow', txt: 'On the highest peaks there is snow all year round. La neve ends in -e but it is feminine: la neve.' },
      { id: 'sole', it: 'il sole', en: 'the sun', txt: 'Buongiorno literally means “good day”: buon + giorno. Il sole ends in -e but it is masculine: il sole.' },
      { id: 'panetteria', it: 'la panetteria', en: 'the bakery', txt: 'Pane (bread) + -eria (shop). The same trick gives pizzeria and gelateria. Careful: a libreria is a bookshop, not a library.' },
      { id: 'pane', it: 'il pane', en: 'the bread', txt: 'Words ending in -e can be masculine or feminine: il pane, but la chiave. Always learn a new word together with its article.' },
      { id: 'caffe', it: 'il caffè', en: 'the coffee', txt: 'In Valle d’Aosta friends share caffè alla valdostana from the coppa dell’amicizia, a wooden cup with several spouts. Tradition says it passes from hand to hand without touching the table.' },
      { id: 'gatto', it: 'il gatto', en: 'the cat', txt: '“Siamo quattro gatti”, we are four cats, means: there are very few of us.' },
      { id: 'fontana', it: 'la fontana', en: 'the fountain', txt: 'In many Italian towns, public fountains give fresh drinking water, free for everyone.' },
      { id: 'chiesa', it: 'la chiesa', en: 'the church', txt: 'Near here stands the church of Sant’Orso. Every 30 and 31 January the Fiera di Sant’Orso fills Aosta with wooden crafts. It is more than a thousand years old.' },
      { id: 'cartello', it: 'il cartello', en: 'the sign', txt: 'In Valle d’Aosta French is an official language too. Many signs are in both languages: Panetteria and Boulangerie, Buongiorno and Bonjour.' },
      { id: 'lanterna', it: 'la lanterna', en: 'the lantern', txt: 'GattoMatto’s lantern. Its light shows what others cannot see.' },
    ],
    inscription: ['diciassette', 'cinque', 'undici', 'tredici', 'dieci', 'uno'],
    inscriptionNote: 'Under the arch, carved in the stone, GattoMatto finds six Roman numbers. He copies them into his notebook, in Italian words: diciassette, cinque, undici, tredici, dieci, uno. You will learn to read them in “Alfabeto e numeri”.',
  },

  /* ---------- III. In panetteria ---------- */
  panetteria: {
    setupIntro: 'Before you go in, tell us about yourself. Your answers will appear in the conversations and in your notebook.',
    dialogues: [
      {
        id: 'rina', title: 'Dalla signora Rina', en: 'At Mrs Rina’s bakery: formal, with Lei', register: 'Lei',
        scene: 'The bakery smells of warm bread. Behind the counter, la signora Rina, the baker. You have never met her: you use {Lei|formal “you”}.',
        lines: [
          { who: 'Rina', it: '{Buongiorno|Good morning}!', en: 'Good morning!' },
          { who: 'tu', en: 'Good morning, madam.', options: [
            { it: 'Buongiorno, signora.', ok: true },
            { it: 'Buonanotte, signora.', why: '{Buonanotte|good night} is only for saying goodbye late at night, or before going to sleep.' },
          ] },
          { who: 'Rina', it: '{Lei non è di qui|You are not from here}, {vero|are you}? {Come si chiama|What is your name}?', en: 'You’re not from here, are you? What’s your name?' },
          { who: 'tu', en: 'My name is {NOME}. And you?', options: [
            { it: 'Mi chiamo {NOME}. E Lei?', ok: true },
            { it: 'Ti chiami {NOME}. E tu?', why: 'For yourself you say {mi chiamo|my name is}. And with someone you do not know, you use {Lei|formal “you”}, not {tu|informal “you”}.' },
          ] },
          { who: 'Rina', it: '{Io mi chiamo Rina|My name is Rina}. {Piacere|Nice to meet you}!', en: 'My name is Rina. Nice to meet you!' },
          { who: 'tu', en: 'Nice to meet you!', options: [
            { it: 'Piacere!', ok: true },
            { it: 'Prego!', why: '{Prego|you’re welcome} is the answer to {grazie|thank you}. When you meet someone, you answer {Piacere|nice to meet you} with {Piacere|nice to meet you}.' },
          ] },
          { who: 'Rina', it: '{E di dov’è|And where are you from}?', en: 'And where are you from?' },
          { who: 'tu', en: 'I’m from {CITTA}.{NAZ_EN}', options: [
            { it: 'Sono di {CITTA}.{NAZ_IT}', ok: true },
            { it: 'Sono a {CITTA}.', why: '{Sono a|I am in} means where you are right now. For where you come from, use {Sono di|I am from}.' },
          ] },
          { who: 'Rina', it: '{{BENV} ad Aosta|Welcome to Aosta}!', en: 'Welcome to Aosta!' },
          { who: 'tu', en: 'Thank you! A croissant, please.', options: [
            { it: 'Grazie! Un cornetto, per favore.', ok: true },
            { it: 'Prego! Un cornetto, per favore.', why: '{Grazie|thank you} is what you say to thank. {Prego|you’re welcome} is the answer to it.' },
          ] },
          { who: 'Rina', it: '{Ecco a Lei|Here you are}.', en: 'Here you are.' },
          { who: 'tu', en: 'Thank you. Goodbye!', options: [
            { it: 'Grazie. Arrivederci!', ok: true },
            { it: 'Grazie. Benvenuta!', why: '{Benvenuto|welcome} and {benvenuta|welcome} are for someone who arrives, not for saying goodbye.' },
          ] },
          { who: 'Rina', it: '{Arrivederci|Goodbye}, {buona giornata|have a nice day}!', en: 'Goodbye, have a nice day!' },
        ],
      },
      {
        id: 'matteo', title: 'Alla fontana con Matteo', en: 'At the fountain with Matteo: informal, with tu', register: 'tu',
        scene: 'Outside, at the fountain, a boy is filling a bottle. He is about your age and he smiles: you use {tu|informal “you”}.',
        lines: [
          { who: 'Matteo', it: '{Ciao|Hi}! {Io sono Matteo|I’m Matteo}. {E tu, come ti chiami|And you, what’s your name}?', en: 'Hi! I’m Matteo. And you, what’s your name?' },
          { who: 'tu', en: 'Hi! My name is {NOME}.', options: [
            { it: 'Ciao! Mi chiamo {NOME}.', ok: true },
            { it: 'Ciao! Si chiama {NOME}.', why: '{Si chiama|his, her or your (formal) name is} talks about someone else. For yourself: {mi chiamo|my name is}.' },
          ] },
          { who: 'Matteo', it: '{Piacere|Nice to meet you}! {Di dove sei|Where are you from}?', en: 'Nice to meet you! Where are you from?' },
          { who: 'tu', en: 'I’m from {CITTA}. And you?', options: [
            { it: 'Sono di {CITTA}. E tu?', ok: true },
            { it: 'Sono di {CITTA}. E Lei?', why: 'Matteo uses {tu|informal “you”} with you. Answer him with {tu|informal “you”} too.' },
          ] },
          { who: 'Matteo', it: '{Io sono di qui|I’m from here}, {di Aosta|from Aosta}. {Come stai|How are you}?', en: 'I’m from here, from Aosta. How are you?' },
          { who: 'tu', en: 'Fine, thanks! And you?', options: [
            { it: 'Bene, grazie! E tu?', ok: true },
            { it: 'Bene, prego! E tu?', why: 'To say thank you, use {grazie|thank you}. {Prego|you’re welcome} is the answer to it.' },
          ] },
          { who: 'Matteo', it: '{Benissimo|Very well}! {Ciao, a presto|Bye, see you soon}!', en: 'Very well! Bye, see you soon!' },
          { who: 'tu', en: 'Bye, see you soon!', options: [
            { it: 'Ciao, a presto!', ok: true },
            { it: 'Benvenuto, a presto!', why: '{Benvenuto|welcome} is for someone who arrives. To say goodbye: {ciao|bye}, {a presto|see you soon}.' },
          ] },
        ],
      },
    ],
    compare: [
      ['Come ti chiami?', 'Come si chiama?', 'What’s your name?'],
      ['Di dove sei?', 'Di dov’è?', 'Where are you from?'],
      ['Come stai?', 'Come sta?', 'How are you?'],
      ['E tu?', 'E Lei?', 'And you?'],
      ['Ciao!', 'Buongiorno! / Buonasera!', 'Hello!'],
      ['Ciao!', 'Arrivederci!', 'Goodbye!'],
    ],
  },

  /* ---------- IV. Saluti e gesti ---------- */
  saluti: {
    intro: 'In Italian, the right greeting depends on the time of day and on who you are talking to. Move the sun across the sky.',
    periods: [
      { from: 5, to: 12, name: 'la mattina', en: 'the morning', arrive: 'Buongiorno!', leave: 'Arrivederci, buona giornata!', leaveEn: 'Goodbye, have a nice day!' },
      { from: 13, to: 17, name: 'il pomeriggio', en: 'the afternoon', arrive: 'Buongiorno! / Buonasera!', leave: 'Arrivederci, buon pomeriggio!', leaveEn: 'Goodbye, have a nice afternoon!', note: 'There is no fixed hour: in many regions Italians switch from buongiorno to buonasera after lunch, in others later in the afternoon.' },
      { from: 18, to: 22, name: 'la sera', en: 'the evening', arrive: 'Buonasera!', leave: 'Arrivederci, buona serata!', leaveEn: 'Goodbye, have a nice evening!' },
      { from: 23, to: 4, name: 'la notte', en: 'the night', arrive: 'Buonasera!', leave: 'Buonanotte!', leaveEn: 'Good night!', note: 'Buonanotte is only for saying goodbye at night, or before going to sleep. Never when you arrive.' },
    ],
    always: 'With friends, at any hour: {Ciao|hi, bye}! It works both when you arrive and when you leave.',
    sort: {
      q: 'When do you say it? Choose for each expression.',
      bins: [['arrivo', 'When you arrive'], ['partenza', 'When you leave'], ['entrambi', 'Both']],
      items: [
        ['Ciao!', 'entrambi'], ['Buongiorno!', 'entrambi'], ['Buonasera!', 'entrambi'],
        ['Arrivederci!', 'partenza'], ['A presto!', 'partenza'], ['A domani!', 'partenza'],
        ['Buonanotte!', 'partenza'], ['Benvenuto!', 'arrivo'],
      ],
    },
    tuLei: [
      ['Matteo, a boy at the fountain', 'tu'],
      ['La signora Rina, the baker you meet for the first time', 'Lei'],
      ['Your best friend', 'tu'],
      ['A police officer', 'Lei'],
      ['A professor at the university', 'Lei'],
      ['Your sister', 'tu'],
      ['A classmate at your Italian course', 'tu'],
      ['An elderly gentleman who asks you for directions', 'Lei'],
    ],
    notes: [
      { t: 'Ciao', txt: '{Ciao|hi, bye} comes from the old Venetian {s-ciào vostro|I am your servant}. Today it is the friendliest word in Italian.' },
      { t: 'Due baci', txt: 'Friends and family often greet each other with two kisses, one on each cheek. With people you do not know, a handshake: {una stretta di mano|a handshake}.' },
      { t: 'Signore, signora', txt: 'Before a name, {signore|sir, Mr} loses its final -e: {Buongiorno, signor Rossi|Good morning, Mr Rossi}. {Signora|madam, Mrs} does not change: {Buongiorno, signora Rina|Good morning, Mrs Rina}.' },
      { t: 'Salve', txt: '{Salve|hello} is a polite, neutral hello. It is useful when you are not sure whether to use {tu|informal “you”} or {Lei|formal “you”}.' },
      { t: 'Bonjour', txt: 'In Valle d’Aosta you will also hear {Bonjour|hello, in French}: French is an official language here, next to Italian.' },
    ],
  },

  /* ---------- V. Grammatica ---------- */
  grammatica: {
    cards: [
      { id: 'pronomi', t: 'I pronomi soggetto', en: 'Subject pronouns',
        table: [['io', 'I'], ['tu', 'you (informal)'], ['lui / lei', 'he / she'], ['Lei', 'you (formal)'], ['noi', 'we'], ['voi', 'you (plural)'], ['loro', 'they']],
        note: 'Italians often leave the pronoun out, because the verb already tells you who it is: {Sono di Aosta|I am from Aosta} = {Io sono di Aosta|I am from Aosta}.' },
      { id: 'essere', t: 'Il verbo essere', en: 'to be',
        table: [['io sono', 'I am'], ['tu sei', 'you are'], ['lui / lei / Lei è', 'he / she is, you (formal) are'], ['noi siamo', 'we are'], ['voi siete', 'you (plural) are'], ['loro sono', 'they are']],
        note: '{è|is} always has its accent. Without it, {e|and} means “and”.' },
      { id: 'avere', t: 'Il verbo avere', en: 'to have',
        table: [['io ho', 'I have'], ['tu hai', 'you have'], ['lui / lei / Lei ha', 'he / she has, you (formal) have'], ['noi abbiamo', 'we have'], ['voi avete', 'you (plural) have'], ['loro hanno', 'they have']],
        note: 'The h is silent, but it changes the meaning: {ho|I have} and {o|or}, {hai|you have} and {ai|to the}, {ha|he, she has} and {a|to, at}, {hanno|they have} and {anno|year}.' },
      { id: 'chiamarsi', t: 'Il verbo chiamarsi', en: 'to be called',
        table: [['io mi chiamo', 'my name is'], ['tu ti chiami', 'your name is'], ['lui / lei / Lei si chiama', 'his / her / your (formal) name is'], ['noi ci chiamiamo', 'our names are'], ['voi vi chiamate', 'your (plural) names are'], ['loro si chiamano', 'their names are']],
        note: 'Literally “I call myself”: {Come ti chiami|What is your name}? {Mi chiamo GattoMatto|My name is GattoMatto}.' },
      { id: 'articoli', t: 'L’articolo determinativo', en: 'The definite article, singular',
        table: [['il', 'masculine, before a consonant: il pane, il gatto'], ['lo', 'masculine, before z, gn, ps or s + consonant: lo zaino, lo studente'], ['l’', 'masculine or feminine, before a vowel: l’arco, l’acqua'], ['la', 'feminine, before a consonant: la chiave, la fontana']],
        note: 'Nouns in -o are usually masculine, nouns in -a usually feminine. Nouns in -e can be both: {il pane|the bread}, {la chiave|the key}. Learn every word with its article.' },
      { id: 'nazionalita', t: 'Gli aggettivi di nazionalità', en: 'Nationality adjectives',
        table: [['-o / -a', 'italiano, italiana; greco, greca; spagnolo, spagnola'], ['-e / -e', 'inglese, francese, portoghese: the same for men and women']],
        note: 'In Italian, nationalities are written with a small letter: {Matteo è italiano|Matteo is Italian}. {Anna è inglese|Anna is English}.' },
      { id: 'domande', t: 'Le domande e il non', en: 'Questions and the negative',
        table: [['Come?', 'How? What?'], ['Di dove?', 'Where from?'], ['Chi?', 'Who?'], ['Qual è…?', 'What is…? (no apostrophe!)'], ['non + verbo', 'Non sono di Aosta: I am not from Aosta']],
        note: '{Qual è|What is} is written without an apostrophe: never “qual’è”. It is one of the most common mistakes, even among Italians.' },
    ],
    drill: [
      { type: 'choice', q: 'Io ___ di Aosta.', options: ['sono', 'sei', 'è'], a: 'sono', why: 'io sono' },
      { type: 'choice', q: 'Tu ___ italiano?', options: ['sono', 'sei', 'è'], a: 'sei', why: 'tu sei' },
      { type: 'choice', q: 'Rina ___ la fornaia.', options: ['è', 'e', 'ha'], a: 'è', why: '“è” with the accent is the verb: lei è.' },
      { type: 'choice', q: 'Come ___ chiami?', options: ['ti', 'mi', 'si'], a: 'ti', why: 'tu ti chiami' },
      { type: 'choice', q: 'Signora, come si ___?', options: ['chiama', 'chiami', 'chiamo'], a: 'chiama', why: 'Lei si chiama: the formal “you” takes the same form as lui and lei.' },
      { type: 'choice', q: 'GattoMatto ___ una lanterna.', options: ['ha', 'a', 'ho'], a: 'ha', why: 'lui ha. “a” without h means “to, at”.' },
      { type: 'choice', q: 'Io ___ una domanda.', options: ['ho', 'o', 'hai'], a: 'ho', why: 'io ho. “o” without h means “or”.' },
      { type: 'pick', q: 'Which article? ___ zaino', img: 'zaino', options: ['il', 'lo', 'la', 'l’'], a: 'lo', why: 'lo before z: lo zaino.' },
      { type: 'pick', q: 'Which article? ___ chiave', img: 'chiave', options: ['il', 'lo', 'la', 'l’'], a: 'la', why: 'chiave ends in -e but it is feminine: la chiave.' },
      { type: 'pick', q: 'Which article? ___ arco', img: 'arco', options: ['il', 'lo', 'la', 'l’'], a: 'l’', why: 'l’ before a vowel: l’arco.' },
      { type: 'pick', q: 'Which article? ___ pane', img: 'pane', options: ['il', 'lo', 'la', 'l’'], a: 'il', why: 'pane ends in -e and it is masculine: il pane.' },
      { type: 'choice', q: 'Anna è di Londra. È ___.', options: ['inglese', 'inglesa', 'Inglese'], a: 'inglese', why: 'Adjectives in -e are the same for men and women, and they take a small letter.' },
      { type: 'choice', q: 'Rina è ___.', options: ['italiana', 'italiano', 'Italiana'], a: 'italiana', why: 'Rina is a woman: italiana, with a small letter.' },
      { type: 'choice', q: '___ il tuo nome?', options: ['Qual è', 'Qual’è', 'Quali è'], a: 'Qual è', why: 'Qual è, without the apostrophe.' },
      { type: 'choice', q: 'Io ___ sono di Roma.', options: ['non', 'no', 'né'], a: 'non', why: 'The negative is “non”, before the verb.' },
    ],
  },

  /* ---------- VI. Alfabeto e numeri ---------- */
  alfabeto: {
    intro: 'The Italian alphabet has 21 letters. Five more letters appear only in foreign words. Click a letter to hear its name.',
    letters: [
      ['A', 'a', 'Ancona'], ['B', 'bi', 'Bologna'], ['C', 'ci', 'Como'], ['D', 'di', 'Domodossola'], ['E', 'e', 'Empoli'],
      ['F', 'effe', 'Firenze'], ['G', 'gi', 'Genova'], ['H', 'acca', 'hotel'], ['I', 'i', 'Imola'], ['L', 'elle', 'Livorno'],
      ['M', 'emme', 'Milano'], ['N', 'enne', 'Napoli'], ['O', 'o', 'Otranto'], ['P', 'pi', 'Palermo'], ['Q', 'cu', 'quadro'],
      ['R', 'erre', 'Roma'], ['S', 'esse', 'Savona'], ['T', 'ti', 'Torino'], ['U', 'u', 'Udine'], ['V', 'vu', 'Venezia'], ['Z', 'zeta', 'Zara'],
    ],
    foreign: [['J', 'i lunga', 'jolly'], ['K', 'cappa', 'kiwi'], ['W', 'doppia vu', 'Washington'], ['X', 'ics', 'xilofono'], ['Y', 'ipsilon', 'yogurt']],
    spellingNote: 'On the phone, Italians spell with the names of cities: “Come si scrive?” “R come Roma, I come Imola, N come Napoli, A come Ancona.” Some letters have more than one city: S come Siena, P come Pisa.',
    sounds: [
      { rule: 'c + e, i', en: 'soft, like “ch” in “cheese”', ex: ['cena', 'ciao', 'cinque'] },
      { rule: 'c + a, o, u and ch + e, i', en: 'hard, like “k”', ex: ['casa', 'Como', 'chiave'] },
      { rule: 'g + e, i', en: 'soft, like “j” in “jet”', ex: ['gelato', 'Genova', 'gita'] },
      { rule: 'g + a, o, u and gh + e, i', en: 'hard, like “g” in “go”', ex: ['gatto', 'gondola', 'spaghetti'] },
      { rule: 'gn', en: 'like “ny” in “canyon”', ex: ['gnocchi', 'montagna', 'Bologna'] },
      { rule: 'gli', en: 'like “lli” in “million”', ex: ['famiglia', 'aglio', 'luglio'] },
      { rule: 'sc + e, i', en: 'like “sh” in “shop”', ex: ['pesce', 'scena', 'uscire'] },
      { rule: 'h', en: 'always silent', ex: ['ho', 'hanno', 'hotel'] },
      { rule: 'doppie', en: 'double consonants last longer', ex: ['sete / sette', 'caro / carro', 'pala / palla'] },
    ],
    numbers: ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove', 'venti'],
    numbersNote: 'From 11 to 16 the numbers end in -dici: undici, dodici, tredici, quattordici, quindici, sedici. From 17 to 19 they begin with dici-: diciassette, diciotto, diciannove.',
    listen: [[3, [3, 13, 20]], [7, [17, 7, 11]], [11, [1, 12, 11]], [13, [3, 16, 13]], [16, [6, 16, 12]], [19, [9, 10, 19]]],
    cipher: {
      intro: 'Now you can read the inscription under the arch. GattoMatto copied it in Italian words: turn each word into a number.',
      step2: 'Each number is a letter of the Italian alphabet: A = 1, B = 2, C = 3… Remember: the Italian alphabet has 21 letters, without J, K, W, X and Y.',
      answer: 'SEMOLA',
      reveal: '{La semola|semolina} is the flour of durum wheat: the flour of pasta. Why would an ancient secret begin with flour? GattoMatto writes the word in his notebook.',
    },
  },

  /* ---------- VII. La prova del custode ---------- */
  prova: {
    intro: 'Evening falls on Aosta. Under the arch, an old man waits with a wooden key: {il custode|the guardian}. “{Buonasera|Good evening}. {Rispondi alle mie domande|Answer my questions} {e avrai il sigillo di Aosta|and you will have the seal of Aosta}. {Senza i sigilli|Without the seals}, {l’ultima porta non si apre|the last door does not open}.”',
    pass: 12,
    items: [
      { type: 'listen', say: 'Buonasera', q: 'Listen. What does the guardian say?', options: ['Buonasera', 'Buongiorno', 'Buonanotte'], a: 'Buonasera' },
      { type: 'pick', img: 'chiave', q: 'What is it?', options: ['il chiave', 'la chiave', 'lo chiave'], a: 'la chiave', why: 'chiave is feminine: la chiave.' },
      { type: 'choice', q: 'It is nine in the morning. You walk into a shop. You say:', options: ['Buonanotte!', 'Buongiorno!', 'Arrivederci!'], a: 'Buongiorno!' },
      { type: 'choice', q: 'You meet an elderly gentleman and ask his name:', options: ['Come ti chiami?', 'Come si chiama?', 'Come mi chiamo?'], a: 'Come si chiama?', why: 'With a stranger you use Lei: come si chiama?' },
      { type: 'choice', q: '“Di dove sei?” Your answer:', options: ['Sono di Napoli.', 'Sono a Napoli.', 'Ho di Napoli.'], a: 'Sono di Napoli.', why: 'Origin: sono di + city.' },
      { type: 'input', q: 'Write the number 14 in letters.', a: ['quattordici'] },
      { type: 'listen', say: 'diciannove', q: 'Listen. Which number?', options: ['9', '19', '10'], a: '19' },
      { type: 'choice', q: 'Sofia è di Atene. È ___.', options: ['greca', 'greco', 'Greca'], a: 'greca', why: 'Sofia is a woman: greca, with a small letter.' },
      { type: 'choice', q: 'Tu ___ italiano?', options: ['sei', 'è', 'sono'], a: 'sei' },
      { type: 'choice', q: 'Loro ___ di Torino.', options: ['sono', 'siamo', 'siete'], a: 'sono' },
      { type: 'pick', img: 'zucchero', q: 'Which article? ___ zucchero', options: ['il', 'lo', 'l’'], a: 'lo', why: 'lo before z: lo zucchero.' },
      { type: 'choice', q: 'Io ___ un gatto.', options: ['ho', 'o', 'ha'], a: 'ho' },
      { type: 'choice', q: 'Which one is written correctly?', options: ['Qual è il tuo nome?', 'Qual’è il tuo nome?', 'Quale’è il tuo nome?'], a: 'Qual è il tuo nome?' },
      { type: 'order', q: 'Put the words in order: “I am not from Aosta.”', tiles: ['non', 'Io', 'di', 'sono', 'Aosta.'], a: 'Io non sono di Aosta.' },
      { type: 'input', q: 'Spelling on the phone: “B come …?” Write the city.', a: ['Bologna', 'Bari'] },
    ],
  },

  /* ---------- the notebook (PDF) ---------- */
  vocab: [
    { t: 'In piazza', en: 'In the square', words: [
      ['l’arco', 'the arch'], ['la montagna', 'the mountain'], ['la neve', 'the snow'], ['il sole', 'the sun'],
      ['la piazza', 'the square'], ['la chiesa', 'the church'], ['la fontana', 'the fountain'], ['l’acqua', 'the water'],
      ['il cartello', 'the sign'], ['il gatto', 'the cat'], ['la lanterna', 'the lantern'], ['lo zaino', 'the backpack'], ['la chiave', 'the key'],
    ] },
    { t: 'In panetteria', en: 'At the bakery', words: [
      ['la panetteria', 'the bakery'], ['il pane', 'the bread'], ['il cornetto', 'the croissant'], ['il caffè', 'the coffee'],
      ['lo zucchero', 'the sugar'], ['il fornaio, la fornaia', 'the baker (m., f.)'],
    ] },
    { t: 'Le persone', en: 'People', words: [
      ['il signore, la signora', 'the gentleman, the lady'], ['il ragazzo, la ragazza', 'the boy, the girl'],
      ['l’amico, l’amica', 'the friend (m., f.)'], ['il viaggiatore, la viaggiatrice', 'the traveller (m., f.)'],
    ] },
  ],
  expressions: [
    { t: 'Salutare', en: 'Greeting', rows: [
      ['Ciao!', 'Hi! / Bye! (informal)'], ['Salve!', 'Hello! (polite, neutral)'], ['Buongiorno!', 'Good morning! Good day!'],
      ['Buonasera!', 'Good evening!'], ['Buonanotte!', 'Good night! (only when leaving)'], ['Arrivederci!', 'Goodbye!'],
      ['A presto!', 'See you soon!'], ['A domani!', 'See you tomorrow!'], ['Buona giornata!', 'Have a nice day!'], ['Buona serata!', 'Have a nice evening!'],
      ['Benvenuto! Benvenuta!', 'Welcome! (to a man, to a woman)'],
    ] },
    { t: 'Presentarsi', en: 'Introducing yourself', rows: [
      ['Come ti chiami? / Come si chiama?', 'What’s your name? (tu / Lei)'], ['Mi chiamo…', 'My name is…'],
      ['Piacere!', 'Nice to meet you!'], ['Di dove sei? / Di dov’è?', 'Where are you from? (tu / Lei)'],
      ['Sono di…', 'I’m from… (city)'], ['Come stai? / Come sta?', 'How are you? (tu / Lei)'], ['Bene, grazie. E tu? / E Lei?', 'Fine, thanks. And you?'],
      ['Qual è il tuo numero di telefono?', 'What’s your phone number?'],
    ] },
    { t: 'Parole gentili', en: 'Polite words', rows: [
      ['Per favore.', 'Please.'], ['Grazie!', 'Thank you!'], ['Prego!', 'You’re welcome!'], ['Ecco a Lei.', 'Here you are. (formal)'],
    ] },
  ],
};

// Nationalities offered in the bakery: country, masculine, feminine, English
export const NATIONS = [
  ['Albania', 'albanese', 'albanese', 'Albanian'], ['Argentina', 'argentino', 'argentina', 'Argentinian'],
  ['Australia', 'australiano', 'australiana', 'Australian'], ['Austria', 'austriaco', 'austriaca', 'Austrian'],
  ['Brasile', 'brasiliano', 'brasiliana', 'Brazilian'], ['Bulgaria', 'bulgaro', 'bulgara', 'Bulgarian'],
  ['Canada', 'canadese', 'canadese', 'Canadian'], ['Cina', 'cinese', 'cinese', 'Chinese'],
  ['Colombia', 'colombiano', 'colombiana', 'Colombian'], ['Croazia', 'croato', 'croata', 'Croatian'],
  ['Danimarca', 'danese', 'danese', 'Danish'], ['Egitto', 'egiziano', 'egiziana', 'Egyptian'],
  ['Filippine', 'filippino', 'filippina', 'Filipino'], ['Francia', 'francese', 'francese', 'French'],
  ['Germania', 'tedesco', 'tedesca', 'German'], ['Ghana', 'ghanese', 'ghanese', 'Ghanaian'],
  ['Giappone', 'giapponese', 'giapponese', 'Japanese'], ['Grecia', 'greco', 'greca', 'Greek'],
  ['India', 'indiano', 'indiana', 'Indian'], ['Inghilterra', 'inglese', 'inglese', 'English'],
  ['Irlanda', 'irlandese', 'irlandese', 'Irish'], ['Italia', 'italiano', 'italiana', 'Italian'],
  ['Macedonia del Nord', 'macedone', 'macedone', 'Macedonian'], ['Marocco', 'marocchino', 'marocchina', 'Moroccan'],
  ['Messico', 'messicano', 'messicana', 'Mexican'], ['Nigeria', 'nigeriano', 'nigeriana', 'Nigerian'],
  ['Norvegia', 'norvegese', 'norvegese', 'Norwegian'], ['Paesi Bassi', 'olandese', 'olandese', 'Dutch'],
  ['Perù', 'peruviano', 'peruviana', 'Peruvian'], ['Polonia', 'polacco', 'polacca', 'Polish'],
  ['Portogallo', 'portoghese', 'portoghese', 'Portuguese'], ['Romania', 'romeno', 'romena', 'Romanian'],
  ['Russia', 'russo', 'russa', 'Russian'], ['Scozia', 'scozzese', 'scozzese', 'Scottish'],
  ['Serbia', 'serbo', 'serba', 'Serbian'], ['Slovenia', 'sloveno', 'slovena', 'Slovenian'],
  ['Spagna', 'spagnolo', 'spagnola', 'Spanish'], ['Stati Uniti', 'americano', 'americana', 'American'],
  ['Svezia', 'svedese', 'svedese', 'Swedish'], ['Svizzera', 'svizzero', 'svizzera', 'Swiss'],
  ['Turchia', 'turco', 'turca', 'Turkish'], ['Ucraina', 'ucraino', 'ucraina', 'Ukrainian'],
  ['Ungheria', 'ungherese', 'ungherese', 'Hungarian'],
];
