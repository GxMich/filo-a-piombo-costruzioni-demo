import { useState } from 'react';
import { ArrowsOut } from '@phosphor-icons/react/dist/csr/ArrowsOut';
import { Photo } from './Photo.jsx';
import { Dialog } from './Chrome.jsx';

const examples = [
  { category: 'Interni', title: 'Più luce in soggiorno.', image: 'soggiorno', text: 'Un tramezzo in meno, finestre più grandi e pavimenti nuovi: spesso bastano pochi interventi ben scelti per cambiare come si vive una casa.' },
  { category: 'Esterni', title: 'Intonaco rifatto, colore nuovo.', image: 'demo-facade-after', text: 'Prima si sistema il supporto, poi si curano davanzali, cornici e spigoli, infine si protegge tutto con la finitura. Da fuori si vede il colore; dentro si sente la differenza.' },
  { category: 'Lavorazioni', title: 'La rasatura fatta a mano.', image: 'demo-plaster', text: 'Una parete dritta dipende da come si prepara il fondo e da quante passate si danno. Sono ore di lavoro che non si vedono, ma si notano quando mancano.' },
];

export function Gallery() {
  const [filter, setFilter] = useState('Tutti');
  const [selected, setSelected] = useState(null);
  const visible = examples.filter((item) => filter === 'Tutti' || item.category === filter);
  return (
    <section className="gallery" id="interventi" aria-labelledby="gallery-title">
      <div className="gallery-head">
        <div><p className="kicker">Dentro e fuori casa</p><h2 id="gallery-title">Lavori,<br />visti da vicino.</h2></div>
        <div><p className="lead">Dentro casa e sulla facciata. Tre esempi di lavori che facciamo spesso, per capire da dove partire.</p><p className="small-note">Esempi e immagini illustrative.</p></div>
      </div>
      <div className="gallery-filters" role="group" aria-label="Filtra gli esempi">
        {['Tutti', 'Interni', 'Esterni', 'Lavorazioni'].map((item) => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className={'project-grid ' + (filter !== 'Tutti' ? 'is-filtered' : '')} key={filter} aria-live="polite">
        {visible.map((item) => (
          <article className="project-card" key={item.title}>
            <button className="project-open" onClick={() => setSelected(item)} aria-label={'Apri esempio: ' + item.title}>
              <Photo name={item.image} alt={item.title + ' Immagine illustrativa generata.'} sizes="(max-width: 599px) 600px, 75vw" />
              <span className="project-expand" aria-hidden="true"><ArrowsOut size={21} /></span>
              <span className="project-copy"><span>{item.category}</span><strong>{item.title}</strong></span>
            </button>
          </article>
        ))}
      </div>
      <Dialog id="project" title={selected?.title ?? 'Esempio di intervento'} open={Boolean(selected)} close={() => setSelected(null)}>
        {selected && <><Photo name={selected.image} alt={selected.title + ' Immagine illustrativa.'} sizes="600px" /><p className="project-description">{selected.text}</p><p className="small-note">Esempio dimostrativo con immagine illustrativa: non è un cantiere reale.</p><a className="btn btn-heat project-contact" href="#contatti" onClick={() => setSelected(null)}>Parliamo del tuo progetto</a></>}
      </Dialog>
    </section>
  );
}
