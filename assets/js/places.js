// Everything drawn on the map, in longitude / latitude.
// Cards: `it` is the Italian name shown big, `en` a short gloss, `txt` the curiosity.

export const START = { lon: 7.17, lat: 45.87 }; // Colle del Gran San Bernardo

// Journey stops. Only Aosta is open; the route ahead stays hidden on purpose.
export const STOPS = [
  { id: 'aosta', lon: 7.32, lat: 45.74, n: 1, open: true },
];

export const CITIES = [
  { id: 'aosta', it: 'Aosta', lon: 7.32, lat: 45.74, size: 2, dx: -10, dy: 26, anchor: 'end',
    txt: 'Il viaggio comincia qui. The Romans founded this town in the Alps. Its old name, Augusta, slowly became Aosta.' },
  { id: 'torino', it: 'Torino', lon: 7.69, lat: 45.07, size: 3, txt: 'Italy’s first capital, in 1861. Elegant arcades, cafés and chocolate.' },
  { id: 'milano', it: 'Milano', lon: 9.19, lat: 45.46, size: 3, txt: 'The capital of fashion and design. Il Duomo stands at its heart.' },
  { id: 'como', it: 'Como', lon: 9.09, lat: 45.81, size: 1, dx: -8, anchor: 'end', txt: 'A lake town at the foot of the Alps, famous for silk.' },
  { id: 'bergamo', it: 'Bergamo', lon: 9.67, lat: 45.70, size: 1, txt: 'Two cities in one: Città Alta on the hill, Città Bassa below.' },
  { id: 'genova', it: 'Genova', lon: 8.93, lat: 44.41, size: 3, dy: 20, txt: 'Pesto alla genovese was born here. A great sea republic of the Middle Ages.' },
  { id: 'bolzano', it: 'Bolzano', lon: 11.35, lat: 46.50, size: 1, txt: 'Street signs here speak two languages: Italian and German.' },
  { id: 'trento', it: 'Trento', lon: 11.12, lat: 46.07, size: 1, dx: -8, anchor: 'end', txt: 'A mountain city between vineyards and apple orchards.' },
  { id: 'verona', it: 'Verona', lon: 10.99, lat: 45.44, size: 2, dy: 20, txt: 'The city of Romeo and Juliet.' },
  { id: 'padova', it: 'Padova', lon: 11.88, lat: 45.41, size: 1, dy: 17, dx: 4, txt: 'Galileo Galilei taught at its university.' },
  { id: 'venezia', it: 'Venezia', lon: 12.33, lat: 45.44, size: 3, dy: -14, txt: 'More than a hundred small islands, joined by hundreds of bridges.' },
  { id: 'trieste', it: 'Trieste', lon: 13.78, lat: 45.65, size: 2, dx: -8, dy: 20, anchor: 'end', txt: 'A city of coffee and of la Bora, a wind that can blow at over 100 km/h.' },
  { id: 'bologna', it: 'Bologna', lon: 11.34, lat: 44.49, size: 3, txt: 'La dotta, la grassa, la rossa: the learned, the fat, the red. For its old university, its food and its roofs.' },
  { id: 'ravenna', it: 'Ravenna', lon: 12.20, lat: 44.42, size: 1, txt: 'Golden Byzantine mosaics shine inside its churches.' },
  { id: 'firenze', it: 'Firenze', lon: 11.26, lat: 43.77, size: 3, dx: 12, dy: 4, txt: 'The cradle of the Renaissance.' },
  { id: 'pisa', it: 'Pisa', lon: 10.40, lat: 43.72, size: 1, dx: -10, anchor: 'end', txt: 'A sea republic long before it was famous for a tower.' },
  { id: 'siena', it: 'Siena', lon: 11.33, lat: 43.32, size: 2, txt: 'Twice every summer, il Palio: a wild horse race around the main square, il Campo.' },
  { id: 'perugia', it: 'Perugia', lon: 12.39, lat: 43.11, size: 1, txt: 'A city of chocolate: the Baci were born here.' },
  { id: 'ancona', it: 'Ancona', lon: 13.52, lat: 43.62, size: 1, txt: 'A port on the Adriatic, built on a hill shaped like an elbow. Ankon means elbow in Greek.' },
  { id: 'roma', it: 'Roma', lon: 12.50, lat: 41.90, size: 4, dx: -14, dy: 6, anchor: 'end', txt: 'La Città Eterna, the Eternal City. Inside it lies another country: the Vatican.' },
  { id: 'pescara', it: 'Pescara', lon: 14.21, lat: 42.46, size: 1, txt: 'A beach city on the Adriatic, with the Apennines just behind it.' },
  { id: 'napoli', it: 'Napoli', lon: 14.27, lat: 40.85, size: 3, dx: -10, dy: -2, anchor: 'end', lm: 'vesuvio', txt: 'Pizza is its pride. The margherita was named after a queen.' },
  { id: 'bari', it: 'Bari', lon: 16.87, lat: 41.12, size: 2, txt: 'Saint Nicholas, the saint behind Santa Claus, rests here.' },
  { id: 'matera', it: 'Matera', lon: 16.60, lat: 40.67, size: 1, dx: -10, anchor: 'end', txt: 'One of the oldest cities in the world still lived in.' },
  { id: 'lecce', it: 'Lecce', lon: 18.17, lat: 40.35, size: 1, dy: 18, dx: -4, anchor: 'end', txt: 'The Florence of the South, carved from soft golden stone.' },
  { id: 'reggio', it: 'Reggio Calabria', lon: 15.65, lat: 38.11, size: 2, dx: 10, dy: 4, txt: 'Home of the Riace Bronzes: two Greek warriors found in the sea in 1972.' },
  { id: 'palermo', it: 'Palermo', lon: 13.36, lat: 38.12, size: 3, dy: -12, dx: -4, anchor: 'end', txt: 'Arab, Norman and Baroque, all in one city. Its street markets are loud and ancient.' },
  { id: 'catania', it: 'Catania', lon: 15.09, lat: 37.50, size: 2, txt: 'A city built with black lava stone, at the foot of Etna.' },
  { id: 'siracusa', it: 'Siracusa', lon: 15.29, lat: 37.08, size: 2, txt: 'Once one of the greatest cities of ancient Greece. Archimedes was born here.' },
  { id: 'cagliari', it: 'Cagliari', lon: 9.11, lat: 39.22, size: 2, dy: 20, txt: 'Pink flamingos live in the lagoons around the city.' },
  { id: 'nuoro', it: 'Nuoro', lon: 9.33, lat: 40.32, size: 1, txt: 'In the wild heart of Sardinia. Something here is older than the roads.' },
  { id: 'alghero', it: 'Alghero', lon: 8.32, lat: 40.56, size: 1, dx: -10, anchor: 'end', txt: 'People here still speak a form of Catalan.' },
];

export const LANDMARKS = [
  { id: 'montebianco', g: 'bigpeak', lon: 6.87, lat: 45.83, it: 'Monte Bianco', en: 'Mont Blanc', txt: 'The highest mountain in the Alps. Bianco means white: it stays white all year.' },
  { id: 'gsb', g: 'pass', lon: 7.17, lat: 45.87, it: 'Gran San Bernardo', en: 'the Great St Bernard pass', txt: 'For centuries, pilgrims crossed the Alps here on their way to Rome. GattoMatto came this way too, in the snow.' },
  { id: 'arco', g: 'arch', lon: 7.32, lat: 45.74, it: 'l’Arco d’Augusto', en: 'the Arch of Augustus', txt: 'A Roman arch, over 2,000 years old, still standing in Aosta.' },
  { id: 'mole', g: 'mole', lon: 7.69, lat: 45.07, it: 'la Mole Antonelliana', en: 'Torino’s tower', txt: 'The symbol of Torino. Today it houses the National Museum of Cinema.' },
  { id: 'duomo', g: 'duomo', lon: 9.19, lat: 45.46, it: 'il Duomo di Milano', en: 'Milan Cathedral', txt: 'It took almost six centuries to finish. A golden statue, la Madonnina, watches the city from the top.' },
  { id: 'cinqueterre', g: 'cinque', lon: 9.72, lat: 44.12, it: 'le Cinque Terre', en: 'the Five Lands', txt: 'Five villages of coloured houses clinging to the cliffs. Cinque means five.' },
  { id: 'arena', g: 'arena', lon: 10.99, lat: 45.44, it: 'l’Arena di Verona', en: 'the Roman arena', txt: 'A Roman amphitheatre where operas are still performed every summer.' },
  { id: 'dolomiti', g: 'dolomiti', lon: 11.85, lat: 46.45, it: 'le Dolomiti', en: 'the Dolomites', txt: 'At sunset these peaks turn pink. The locals have a word for it: l’enrosadira.' },
  { id: 'gondola', g: 'gondola', lon: 12.55, lat: 45.30, it: 'la gondola', en: 'the gondola', txt: 'Gondolas are black by tradition. The gondolier rows standing, with a single oar.' },
  { id: 'campanile', g: 'campanile', lon: 12.33, lat: 45.44, it: 'il Campanile di San Marco', en: 'St Mark’s bell tower', txt: 'Venice’s tallest tower. It collapsed in 1902 and was rebuilt exactly as it was.' },
  { id: 'pisa', g: 'pisa', lon: 10.40, lat: 43.72, it: 'la Torre di Pisa', en: 'the Leaning Tower', txt: 'It began to lean while it was being built, in the 12th century. The ground was too soft.' },
  { id: 'cupola', g: 'cupola', lon: 11.26, lat: 43.77, it: 'la Cupola del Brunelleschi', en: 'Florence’s great dome', txt: 'Finished in 1436, it is still the largest brick dome ever built.' },
  { id: 'vinci', g: 'none', lon: 10.93, lat: 43.79, it: 'Vinci', en: 'a small hill town', txt: 'Leonardo was born near this village in 1452. That is why we call him Leonardo da Vinci: Leonardo from Vinci.' },
  { id: 'chianti', g: 'vines', lon: 11.65, lat: 43.47, it: 'il Chianti', en: 'wine hills', txt: 'Hills of vineyards and cypresses. Its symbol is a black rooster: il gallo nero.' },
  { id: 'langhe', g: 'vines', lon: 8.05, lat: 44.62, it: 'le Langhe', en: 'wine hills', txt: 'Rolling hills where Barolo wine is born, and where white truffles hide underground.' },
  { id: 'sanmarino', g: 'none', lon: 12.45, lat: 43.94, it: 'San Marino', en: 'a country inside Italy', txt: 'A tiny independent country on a mountain, and one of the oldest republics in the world.' },
  { id: 'colosseo', g: 'colosseo', lon: 12.49, lat: 41.89, it: 'il Colosseo', en: 'the Colosseum', txt: 'Opened in the year 80. Tens of thousands of Romans came here to watch the games.' },
  { id: 'vesuvio', g: 'volcano', lon: 14.43, lat: 40.82, it: 'il Vesuvio', en: 'Mount Vesuvius', txt: 'In the year 79 it erupted and buried Pompeii under ash. It is still awake.' },
  { id: 'amalfi', g: 'lemons', lon: 14.62, lat: 40.60, it: 'la Costiera Amalfitana', en: 'the Amalfi Coast', txt: 'Famous for its lemons, i limoni, and for limoncello. Lemon juice is also the oldest invisible ink: heat makes it appear.' },
  { id: 'casteldelmonte', g: 'castle', lon: 16.27, lat: 41.08, it: 'Castel del Monte', en: 'an octagonal castle', txt: 'A perfect octagon built for Emperor Frederick II. You may carry it in your pocket: it is on the Italian 1-cent coin.' },
  { id: 'trulli', g: 'trulli', lon: 17.24, lat: 40.78, it: 'i trulli', en: 'stone cone houses', txt: 'In Alberobello, white houses with cone roofs, built from stone without mortar.' },
  { id: 'sassi', g: 'sassi', lon: 16.61, lat: 40.67, it: 'i Sassi di Matera', en: 'the cave town', txt: 'Homes carved into the rock and lived in for thousands of years.' },
  { id: 'olivi', g: 'olives', lon: 17.55, lat: 40.55, it: 'gli ulivi', en: 'olive trees', txt: 'Puglia produces more olive oil than any other region of Italy. Some of its trees are older than a thousand years.' },
  { id: 'stromboli', g: 'island-volcano', lon: 15.21, lat: 38.79, it: 'lo Stromboli', en: 'a volcano island', txt: 'It erupts every few minutes. Sailors call it il Faro del Mediterraneo: the lighthouse of the Mediterranean.' },
  { id: 'etna', g: 'etna', lon: 15.00, lat: 37.75, it: 'l’Etna', en: 'Mount Etna', txt: 'The highest active volcano in Europe. Sicilians simply call it a Muntagna: the mountain.' },
  { id: 'templi', g: 'temple', lon: 13.59, lat: 37.29, it: 'la Valle dei Templi', en: 'the Valley of the Temples', txt: 'Greek temples that have stood in Sicily for about 2,500 years.' },
  { id: 'nuraghe', g: 'nuraghe', lon: 8.99, lat: 39.71, it: 'i nuraghi', en: 'Bronze Age towers', txt: 'Stone towers built more than 3,000 years ago. Thousands still stand across Sardinia. Who built them, and why, is still a mystery.' },
];

export const SEAS = [
  { it: 'Mar Ligure', lon: 8.55, lat: 43.62, size: 22, rot: -12, txt: 'Named after the Ligures, an ancient people of this coast.' },
  { it: 'Mar Tirreno', lon: 12.2, lat: 40.85, size: 30, rot: 0, txt: 'Named after the Tyrrhenians: the Greek name for the Etruscans.' },
  { it: 'Mar Adriatico', lon: 15.15, lat: 43.05, size: 28, rot: 38, txt: 'Named after Adria, an ancient port town in the Veneto.' },
  { it: 'Mar Ionio', lon: 18.7, lat: 38.6, size: 28, rot: 0, txt: 'The deep sea between the toe of Italy and Greece.' },
  { it: 'Mare di Sardegna', lon: 7.05, lat: 40.15, size: 18, rot: -82, txt: 'The open sea west of Sardinia, swept by the Maestrale wind.' },
  { it: 'Canale di Sicilia', lon: 12.25, lat: 37.0, size: 17, rot: -18, txt: 'The narrow sea between Sicily and Africa.' },
  { it: 'Mar Mediterraneo', lon: 9.9, lat: 37.75, size: 20, rot: 0, txt: 'Mediterraneo: “in the middle of the lands”.' },
];

export const FOG_LABELS = [
  { t: 'Gallia', lon: 5.55, lat: 44.6 }, { t: 'Helvetia', lon: 8.3, lat: 46.72 },
  { t: 'Noricum', lon: 13.3, lat: 47.05 }, { t: 'Illyricum', lon: 14.75, lat: 45.95 },
  { t: 'Dalmatia', lon: 16.55, lat: 43.85 }, { t: 'Pannonia', lon: 17.6, lat: 46.4 },
  { t: 'Epirus', lon: 20.0, lat: 40.75 }, { t: 'Graecia', lon: 21.6, lat: 39.1 },
  { t: 'Africa', lon: 9.6, lat: 36.0 }, { t: 'Numidia', lon: 6.2, lat: 36.35 },
  { t: 'Corsica', lon: 9.05, lat: 42.15, small: true }, { t: 'Melita', lon: 14.45, lat: 35.75, small: true },
];

export const REGIONS = [
  ['Piemonte', 7.8, 44.72], ['Lombardia', 9.9, 45.82], ['Trentino', 11.05, 46.32], ['Veneto', 11.75, 45.72],
  ['Friuli', 13.05, 46.2], ['Liguria', 8.2, 44.18], ['Emilia-Romagna', 10.9, 44.73], ['Toscana', 11.05, 43.25],
  ['Umbria', 12.45, 42.88], ['Marche', 13.05, 43.4], ['Lazio', 12.95, 42.12], ['Abruzzo', 13.85, 42.08],
  ['Molise', 14.55, 41.68], ['Campania', 14.9, 41.13], ['Puglia', 16.1, 41.42], ['Basilicata', 16.1, 40.42],
  ['Calabria', 16.35, 39.25], ['Sicilia', 14.15, 37.55], ['Sardegna', 9.0, 40.05],
];

export const RIVERS = [
  { it: 'il Po', txt: 'The longest river in Italy, from the Alps to the Adriatic.', label: [9.9, 45.13],
    pts: [[7.1, 44.68], [7.45, 44.82], [7.69, 45.07], [7.89, 45.19], [8.45, 45.13], [8.66, 45.02], [9.15, 45.12], [9.69, 45.05], [10.02, 45.13], [10.42, 44.99], [10.75, 45.05], [11.13, 45.07], [11.6, 44.9], [11.95, 44.96], [12.3, 44.96], [12.52, 44.94]] },
  { it: 'l’Adige', txt: 'It flows from the Alps through Bolzano, Trento and Verona.', label: [11.0, 46.25],
    pts: [[10.52, 46.82], [10.9, 46.66], [11.16, 46.67], [11.35, 46.5], [11.18, 46.2], [11.12, 46.07], [11.04, 45.89], [10.86, 45.62], [10.99, 45.44], [11.31, 45.19], [11.8, 45.13], [12.3, 45.15]] },
  { it: 'l’Arno', txt: 'It crosses Firenze and Pisa, under the Ponte Vecchio.', label: [10.8, 43.66],
    pts: [[11.7, 43.87], [11.82, 43.72], [11.85, 43.52], [11.62, 43.62], [11.43, 43.77], [11.26, 43.77], [10.95, 43.72], [10.62, 43.7], [10.4, 43.72], [10.28, 43.68]] },
  { it: 'il Tevere', txt: 'Rome grew on its banks. The legend says Romulus and Remus were found by its waters.', label: [12.55, 42.6],
    pts: [[12.07, 43.78], [12.24, 43.46], [12.35, 43.1], [12.41, 42.78], [12.38, 42.46], [12.55, 42.15], [12.47, 41.9], [12.24, 41.74]] },
];

export const LAKES = [
  { it: 'il Lago di Garda', txt: 'The largest lake in Italy.', pts: [[10.84, 45.88], [10.89, 45.77], [10.8, 45.62], [10.73, 45.52], [10.68, 45.44], [10.6, 45.44], [10.52, 45.47], [10.57, 45.56], [10.67, 45.64], [10.77, 45.76], [10.82, 45.86]] },
  { it: 'il Lago Maggiore', txt: 'Maggiore means bigger. Its northern tip lies in Switzerland.', pts: [[8.8, 46.17], [8.73, 46.06], [8.67, 45.96], [8.62, 45.86], [8.57, 45.76], [8.53, 45.78], [8.57, 45.9], [8.63, 46.01], [8.74, 46.13]] },
  { it: 'il Lago di Como', txt: 'Shaped like an upside-down Y.', pts: [[9.38, 46.16], [9.3, 46.03], [9.4, 45.86], [9.37, 45.85], [9.26, 45.96], [9.09, 45.81], [9.06, 45.83], [9.22, 45.99], [9.28, 46.06], [9.33, 46.16]] },
  { it: 'il Lago Trasimeno', txt: 'Here, in 217 BC, Hannibal defeated a Roman army.', pts: [[11.98, 43.16], [12.06, 43.21], [12.18, 43.19], [12.22, 43.12], [12.15, 43.07], [12.03, 43.08]] },
  { it: 'il Lago di Bolsena', txt: 'A lake born inside an old volcano.', pts: [[11.86, 42.63], [11.93, 42.68], [12.02, 42.64], [12.01, 42.56], [11.93, 42.53], [11.86, 42.57]] },
];

// Mountain ridges as lon/lat polylines; glyphs are spread along them.
export const ALPS = [[7.05, 44.2], [6.95, 44.55], [7.0, 45.0], [7.05, 45.45], [7.35, 45.92], [8.0, 46.12], [8.7, 46.32], [9.4, 46.42], [10.2, 46.44], [10.9, 46.68], [11.7, 46.7], [12.45, 46.62], [13.2, 46.45], [13.62, 46.35]];
export const PREALPS = [[7.4, 45.25], [7.75, 45.65], [8.4, 45.92], [9.2, 46.05], [9.9, 46.1], [10.5, 46.05], [11.2, 46.22], [12.1, 46.25], [12.8, 46.2], [13.3, 46.2]];
export const APENNINES = [[8.35, 44.35], [9.2, 44.55], [10.15, 44.3], [10.95, 44.06], [11.65, 43.86], [12.35, 43.5], [12.95, 43.02], [13.55, 42.5], [14.0, 42.0], [14.5, 41.5], [15.1, 41.0], [15.6, 40.5], [15.9, 40.02], [16.15, 39.45], [16.05, 38.75], [15.88, 38.2]];
export const ISLAND_HILLS = [
  [[13.85, 37.88], [14.25, 37.88], [14.65, 37.95]],
  [[9.15, 40.85], [9.3, 40.4], [9.3, 39.98], [9.45, 39.6]],
];

export const FORESTS = [[16.5, 39.33, 22], [11.78, 43.8, 12], [15.98, 41.82, 14], [9.5, 46.2, 18], [12.0, 46.35, 16], [8.0, 45.55, 10], [10.9, 44.15, 10], [13.4, 42.85, 10], [15.9, 40.15, 10], [9.2, 39.95, 10]];
export const CYPRESSES = [[11.2, 43.42], [11.45, 43.4], [11.55, 43.15], [11.05, 43.55], [11.7, 43.28], [11.3, 43.05], [10.85, 43.4]];

export const WINDS = [
  { it: 'Tramontana', dir: 0, txt: 'The cold north wind, from “beyond the mountains”: tra i monti.' },
  { it: 'Grecale', dir: 45, txt: 'The north-east wind, blowing from Greece.' },
  { it: 'Levante', dir: 90, txt: 'The east wind, from where the sun rises: levare, to rise.' },
  { it: 'Scirocco', dir: 135, txt: 'The hot, damp wind from the Sahara. It makes everyone tired.' },
  { it: 'Ostro', dir: 180, txt: 'The south wind, from the Latin auster.' },
  { it: 'Libeccio', dir: 225, txt: 'The south-west wind, the wind “from Libya”.' },
  { it: 'Ponente', dir: 270, txt: 'The west wind, from where the sun sets: porre, to set down.' },
  { it: 'Maestrale', dir: 315, txt: 'The master wind from the north-west. It clears the sky over Sardinia.' },
];
export const ROSE = { lon: 11.7, lat: 39.3, r: 66 };
export const ROSE2 = { lon: 18.9, lat: 37.15, r: 34 };

// Invisible ink: only visible under the lantern.
export const HIDDEN = [
  { lon: 7.0, lat: 46.25, t: 'Comincia dove la neve non dorme mai.', size: 15, rot: -8 },
  { lon: 9.2, lat: 40.75, t: 'I fili di Dio', size: 26, rot: -6, mark: true },
  { lon: 10.9, lat: 41.6, t: 'ottaM ottaG', size: 30, mirror: true, rot: 4 },
  { lon: 12.85, lat: 41.6, t: 'Tutte le strade…', size: 15, rot: -10 },
  { lon: 10.55, lat: 44.0, t: 'Leonardo scriveva al contrario.', size: 14, rot: 6, mirror: true },
  { lon: 17.9, lat: 39.4, t: 'Qualcuno ti segue.', size: 18, rot: -4 },
  { lon: 13.7, lat: 44.55, t: 'Conta gli archi.', size: 16, rot: 12 },
  { lon: 8.1, lat: 38.45, t: 'Il segreto non è oro.', size: 16, rot: -3 },
];

// Ships sail between these points (lon/lat), looping.
export const SHIPS = [
  { pts: [[9.4, 43.6], [10.4, 42.6], [11.2, 41.4], [10.6, 40.4], [9.95, 41.9], [9.4, 43.6]], dur: 160 },
  { pts: [[14.2, 44.3], [15.2, 43.3], [16.8, 42.4], [17.6, 41.8], [16.3, 43.1], [14.2, 44.3]], dur: 140 },
];
export const SERPENT = { lon: 17.35, lat: 37.55 };
