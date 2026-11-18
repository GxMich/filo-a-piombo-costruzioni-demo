// Dati dell'impresa e testi del sito.
// Attività di fantasia: nome, indirizzo, recapiti, orari e anno di avvio sono inventati.

export const COMPANY = {
  name: 'Filo a Piombo',
  legalName: 'Filo a Piombo Costruzioni',
  founded: 2009,
  street: 'Via dei Fornaciai 14',
  city: 'Montebrina',
  province: 'Piemonte',
  phone: '+390000000000',
  phoneLabel: '+39 000 000 0000',
  email: 'info@filo-a-piombo-costruzioni.example',
};

// Orari di ufficio (inventati). Minuti dalla mezzanotte, ora di Roma.
export const HOURS = {
  1: [[480, 750], [810, 1050]],
  2: [[480, 750], [810, 1050]],
  3: [[480, 750], [810, 1050]],
  4: [[480, 750], [810, 1050]],
  5: [[480, 750], [810, 1050]],
  6: [[540, 720]],
  0: [],
};

export const DAY_NAMES = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

export const services = [
  {
    id: 'cappotto-termico',
    title: 'Cappotto termico',
    summary: 'Isoliamo pareti e facciate dall’esterno: la casa disperde meno e resta più stabile tra estate e inverno.',
    image: 'demo-insulation',
    alt: 'Due operai posano pannelli isolanti grigi su una facciata, immagine illustrativa generata.',
    includes: [
      'Controllo del supporto e dei punti deboli della parete',
      'Pannelli isolanti incollati e tassellati',
      'Rasatura con rete in fibra di vetro',
      'Finitura colorata, anche silossanica',
    ],
  },
  {
    id: 'ristrutturazioni',
    title: 'Ristrutturazioni',
    summary: 'Appartamenti, case e negozi da ripensare: partiamo da come userai gli spazi, poi organizziamo i lavori.',
    image: 'soggiorno',
    alt: 'Soggiorno luminoso con poltrone chiare e grandi finestre.',
    includes: [
      'Ristrutturazione completa di case e appartamenti',
      'Demolizioni, tramezzi e rifacimenti interni',
      'Intonaci, massetti e sottofondi',
      'Un solo referente per tutte le lavorazioni',
    ],
  },
  {
    id: 'costruzioni',
    title: 'Costruzioni edili',
    summary: 'Murature, ampliamenti e nuovi volumi, per privati e piccole attività.',
    image: 'cantiere',
    alt: 'Un operaio con il casco giallo lavora sulla struttura di un edificio in costruzione.',
    includes: [
      'Opere murarie e strutturali',
      'Ampliamenti e sopraelevazioni',
      'Lavori edili per privati e attività',
    ],
  },
  {
    id: 'facciate-finiture',
    title: 'Facciate e finiture',
    summary: 'Intonaci, rasature e tinte per esterni che respingono l’acqua e lasciano respirare il muro.',
    image: 'demo-finish',
    alt: 'Artigiano che controlla con la mano una parete appena rifinita, immagine illustrativa generata.',
    includes: [
      'Intonaci esterni e interni rifatti',
      'Rasature e preparazione dei fondi',
      'Tinteggiature con pitture silossaniche',
      'Ripristino di cornicioni e parti degradate',
    ],
  },
  {
    id: 'bagni-cucine',
    title: 'Bagni e cucine',
    summary: 'Le stanze che si usano di più, rifatte con un calendario chiaro e meno giorni di disagio.',
    image: 'soggiorno',
    alt: 'Interno luminoso con arredi chiari, fotografia illustrativa.',
    includes: ['Smontaggi e preparazione degli ambienti', 'Rifacimento di pareti e sottofondi', 'Posa di rivestimenti e pavimenti', 'Coordinamento con idraulico ed elettricista'],
  },
  {
    id: 'manutenzioni',
    title: 'Manutenzioni e ripristini',
    summary: 'Piccoli interventi fatti bene: crepe, intonaci che si staccano, pareti da rimettere in sesto.',
    image: 'demo-finish',
    alt: 'Artigiano al lavoro su una parete interna, immagine illustrativa generata.',
    includes: ['Ripristino di intonaci', 'Stuccature e rasature', 'Tinteggiature interne ed esterne', 'Piccole opere murarie'],
  },
];

// Stratigrafia di un sistema a cappotto, dall'interno verso l'esterno.
export const layers = [
  { id: 'muratura', title: 'Muratura esistente', text: 'Il muro di casa. Prima di tutto lo controlliamo: se è dritto, se è umido, se l’intonaco tiene.' },
  { id: 'collante', title: 'Collante', text: 'Una malta adesiva stesa sul retro del pannello, perché aderisca alla parete senza vuoti.' },
  { id: 'isolante', title: 'Pannello isolante', text: 'La parte che isola davvero. Polistirene, lana di roccia o fibra di legno: si sceglie in base all’edificio.' },
  { id: 'tasselli', title: 'Tasselli', text: 'Ancorano i pannelli al muro e lavorano insieme al collante.' },
  { id: 'rasatura', title: 'Rasatura armata', text: 'Uno strato di rasante con dentro una rete in fibra di vetro: regge gli urti e tiene lontane le crepe.' },
  { id: 'finitura', title: 'Finitura silossanica', text: 'Il colore che si vede da fuori. Fa scivolare via la pioggia e lascia uscire il vapore.' },
];

export const steps = [
  { title: 'Ci spieghi cosa ti serve', text: 'Al telefono o con il modulo: che lavoro, dove, entro quando.' },
  { title: 'Sopralluogo', text: 'Veniamo a vedere: misure, stato delle pareti, spazio per il ponteggio e per i materiali.' },
  { title: 'Preventivo scritto', text: 'Ti lasciamo un preventivo voce per voce, da leggere con calma e confrontare.' },
  { title: 'Cantiere e consegna', text: 'Un calendario concordato e una persona di riferimento fino all’ultimo giorno.' },
];

export const faqs = [
  { q: 'Come chiedo un preventivo?', a: `Telefona al ${COMPANY.phoneLabel} oppure compila il modulo in fondo alla pagina. Prima del preventivo facciamo sempre un sopralluogo: senza vedere l’immobile i numeri sarebbero inventati.` },
  { q: 'Posso restare in casa mentre fate il cappotto?', a: 'Quasi sempre sì. Il cappotto si posa dall’esterno, dal ponteggio, e le stanze restano abitabili. Gli orari dei lavori più rumorosi li concordiamo prima.' },
  { q: 'Cosa sono le pitture silossaniche?', a: 'Pitture per esterni a base di resine silossaniche. Respingono l’acqua ma lasciano passare il vapore, per questo si usano su facciate e cappotti.' },
  { q: 'Ci sono detrazioni fiscali?', a: 'Per ristrutturazioni e risparmio energetico spesso sì, ma le regole cambiano di anno in anno. Prima di firmare, chiedi conferma al tuo commercialista o a un tecnico.' },
  { q: 'Dove lavorate?', a: `Siamo a ${COMPANY.city}, in ${COMPANY.street}. Lavoriamo in paese e nei comuni vicini: per cantieri più lontani chiamaci e ne parliamo.` },
];

export const credits = [
  { subject: 'Soggiorno con poltrone e grandi finestre', author: 'Francesca Tosolini', url: 'https://unsplash.com/photos/tHkJAMcO3QE', license: 'Unsplash License' },
  { subject: 'Lavoro in cantiere', author: 'Tinky', url: 'https://unsplash.com/photos/a-construction-worker-with-a-yellow-helmet-on-CCUlYlOF5Lk', license: 'Unsplash License' },
  { subject: 'Muratura in blocchi con cazzuola', author: 'Solømen', url: 'https://unsplash.com/photos/a-person-is-putting-cement-on-a-brick-wall-i6V6diaf71A', license: 'Unsplash License' },
];
