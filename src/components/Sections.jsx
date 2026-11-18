import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Plus } from '@phosphor-icons/react/dist/csr/Plus';
import { COMPANY, faqs, steps } from '../content.js';
import { prefersReducedMotion } from '../lib/motion.js';
import { Photo } from './Photo.jsx';

export function Method() {
  const root = useRef(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(root.current.querySelector('.method-line i'), { scaleX: 0 }, {
      scaleX: 1, duration: 1.3, ease: 'power2.inOut',
      scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
    });
  }, { scope: root });
  return (
    <section id="metodo" className="method" ref={root} aria-labelledby="method-title">
      <div className="section-head"><div><p className="kicker">Come lavoriamo</p><h2 id="method-title">Quattro passaggi,<br />nessuna sorpresa.</h2></div><p className="lead">Prima capiamo cosa ti serve, poi mettiamo per iscritto lavori e tempi. Da lì in avanti sai sempre a chi chiedere.</p></div>
      <div className="method-line" aria-hidden="true"><i /></div>
      <ol className="method-track">
        {steps.map((step, index) => <li key={step.title} className="step"><span className="step-n">{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
      </ol>
    </section>
  );
}

export function Company() {
  return (
    <section id="azienda" className="company" aria-labelledby="company-title">
      <div className="company-copy">
        <p className="kicker">Filo a Piombo, {COMPANY.city}</p>
        <h2 id="company-title">Il nome<br />viene dal mestiere.</h2>
        <p className="lead">Il filo a piombo è il primo attrezzo che si tira fuori in cantiere: dice se un muro è dritto. Siamo un’impresa edile di {COMPANY.city} e lavoriamo dal {COMPANY.founded}.</p>
        <p className="company-text">Costruiamo, isoliamo e ristrutturiamo case di paese, villette e piccoli condomini. Ogni lavoro parte da un sopralluogo, perché due case uguali non esistono.</p>
        <div className="company-details"><p><span>Sede</span><strong>{COMPANY.street}<br />{COMPANY.city} ({COMPANY.province})</strong></p><a className="btn btn-ghost" href="#contatti">Conosciamoci</a></div>
      </div>
      <figure className="company-photo" data-enter="">
        <Photo name="muratura" alt="Mani che posano un blocco di cemento su un muro in costruzione, con la cazzuola piena di malta." sizes="(max-width: 599px) 900px, (max-width: 959px) 1200px, 90vw" />
        <div className="company-year"><span>Dal</span><strong>{COMPANY.founded}</strong><span>in cantiere.</span></div>
        <figcaption>Fotografia di Solømen, Unsplash.</figcaption>
      </figure>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="domande" className="faq" aria-labelledby="faq-title">
      <div className="faq-aside"><p className="kicker">Prima del cantiere</p><h2 id="faq-title">Le domande<br />che ci fanno di più.</h2><p className="lead">Se la tua non c’è, chiama il <a href={'tel:' + COMPANY.phone}>{COMPANY.phoneLabel}</a>.</p></div>
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return <div key={faq.q} className={'faq-item ' + (isOpen ? 'is-open' : '')}>
            <h3><button type="button" aria-expanded={isOpen} aria-controls={'faq-' + index} onClick={() => setOpen(isOpen ? null : index)}><span>{faq.q}</span><span className="faq-icon" aria-hidden="true"><Plus size={22} /></span></button></h3>
            <div className="faq-answer" id={'faq-' + index} role="region" aria-label={faq.q} inert={!isOpen ? true : undefined}><div><p>{faq.a}</p></div></div>
          </div>;
        })}
      </div>
    </section>
  );
}
