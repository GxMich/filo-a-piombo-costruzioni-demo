import { useState } from 'react';
import { ArrowsLeftRight } from '@phosphor-icons/react/dist/csr/ArrowsLeftRight';
import { Photo } from './Photo.jsx';

export function Facade() {
  const [position, setPosition] = useState(48);
  return (
    <section id="cappotto" className="facade" aria-labelledby="facade-title">
      <div className="facade-head">
        <div><p className="kicker">Isolamento e facciate</p><h2 id="facade-title">Stessa casa.<br />Un’altra facciata.</h2></div>
        <p className="lead">Con il cappotto la casa disperde meno calore e la facciata torna pulita. Gran parte del lavoro però resta nascosta sotto l’intonaco.</p>
      </div>
      <div className="facade-layout">
        <div>
          <div className="comparison" style={{ '--position': position + '%' }}>
            <Photo name="demo-facade-after" alt="Esempio di facciata dopo il rinnovo, immagine illustrativa generata." sizes="(max-width: 959px) 100vw, 67vw" />
            <div className="comparison-before" style={{ clipPath: 'inset(0 ' + (100 - position) + '% 0 0)' }}>
              <Photo name="demo-facade-before" alt="La stessa facciata con intonaco usurato, simulazione illustrativa prima dei lavori." sizes="(max-width: 959px) 100vw, 67vw" />
            </div>
            <span className="compare-tag compare-tag-before">Prima</span>
            <span className="compare-tag compare-tag-after">Dopo</span>
            <div className="compare-divider" aria-hidden="true"><span><ArrowsLeftRight size={22} /></span></div>
            <input className="compare-range" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Confronta la facciata prima e dopo" aria-valuetext={'Quota della foto prima dei lavori: ' + position + '%'} />
          </div>
          <div className="compare-footer"><p>Trascina per confrontare le due facciate.</p><div className="compare-shortcuts"><button onClick={() => setPosition(100)}>Solo prima</button><button onClick={() => setPosition(0)}>Solo dopo</button></div></div>
          <p className="small-note">Confronto illustrativo generato: non è un cantiere reale.</p>
        </div>
        <div className="facade-benefits">
          <div><h3>Stanze più stabili.</h3><p>D’inverno il calore resta dentro, d’estate entra meno. Le pareti smettono di essere fredde al tatto.</p></div>
          <div><h3>Niente punti scoperti.</h3><p>Lo strato isolante passa davanti a pilastri e solette, dove di solito nascono muffa e condensa.</p></div>
          <div><h3>Facciata nuova.</h3><p>Il sistema si chiude con la finitura colorata: isolamento e tinteggiatura in un solo cantiere.</p></div>
          <a href="#strati">Guarda com’è fatto un cappotto <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}
