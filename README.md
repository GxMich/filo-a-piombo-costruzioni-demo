# Filo a Piombo Costruzioni — sito dimostrativo

> **Attività di fantasia.** Filo a Piombo Costruzioni non esiste: nome, indirizzo a Montebrina, telefono,
> email, orari e anno di avvio sono inventati. Il dominio `.example` è riservato e non appartiene a nessuno.
> Tutte le pagine hanno `noindex` e `robots.txt` blocca i motori di ricerca.
> Sito realizzato da [Michele Modica](https://www.modicamichele.it).

Demo online: https://gxmich.github.io/filo-a-piombo-costruzioni-demo/

## Cosa mostra

Il sito a pagina unica di un'impresa edile specializzata in cappotto termico, ristrutturazioni e facciate.

- **Apertura fotografica** con titolo grande, chiamata e richiesta di sopralluogo.
- **Servizi esplorabili**: sei voci espandibili, con la foto che cambia a seconda del servizio scelto.
- **Prima e dopo**: confronto a cursore tra la stessa facciata prima e dopo i lavori (trascinamento, tastiera,
  pulsanti "Solo prima" e "Solo dopo").
- **Spaccato del cappotto**: assonometria in SVG dei sei strati, che si separano durante lo scroll; ogni strato
  si seleziona e mostra la sua spiegazione.
- **Esempi di lavori** con filtri per categoria e scheda di dettaglio in finestra modale.
- **Metodo** in quattro passaggi, **domande frequenti** a fisarmonica.
- **Richiesta di sopralluogo in quattro passaggi** con anteprima del messaggio. È simulata: i pulsanti WhatsApp
  e SMS mostrano solo un avviso, non inviano niente e il sito non salva dati.
- **Stato aperto/chiuso** calcolato in tempo reale dagli orari (ora di Roma).

## Tecnologie

- React 19 e Vite 6, con l'HTML pre-generato al build (`scripts/prerender.mjs`): i contenuti sono leggibili
  anche senza JavaScript e il CSS è in linea.
- GSAP 3 con ScrollTrigger per le poche animazioni legate allo scroll; tutto si spegne con
  `prefers-reduced-motion`.
- Font Archivo variabile in locale, icone Phosphor.
- Nessun backend, nessun cookie, nessun tracker. Pubblicato su GitHub Pages con GitHub Actions.

## Avvio in locale

```bash
npm install
npm run dev
```

Build di produzione: `npm run build` (output in `dist/client`), anteprima con `npm run preview`.
Il percorso base `/filo-a-piombo-costruzioni-demo/` è impostato in `vite.config.mjs`.

## Dove modificare

- `src/content.js`: dati dell'impresa, orari, servizi, strati del cappotto, metodo, domande frequenti, crediti.
- `src/components/`: una sezione per file.
- `src/styles.css`: palette, tipografia, layout e responsive.

Crediti delle immagini: [CREDITI-FOTO.md](CREDITI-FOTO.md).
