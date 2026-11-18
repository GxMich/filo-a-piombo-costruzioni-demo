import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from '@phosphor-icons/react/dist/csr/ArrowDown';
import { COMPANY } from '../content.js';
import { prefersReducedMotion } from '../lib/motion.js';
import { Photo } from './Photo.jsx';

export function Hero() {
  const root = useRef(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 960px)', () => {
      gsap.to(root.current.querySelector('.hero-photo img'), {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="inizio" className="hero" ref={root} aria-labelledby="hero-title">
      <figure className="hero-photo">
        <Photo name="demo-facade-after" alt="Casa con facciata rinnovata e finiture minerali, immagine illustrativa." hero sizes="(max-width: 959px) 1300px, 100vw" />
        <figcaption>Immagine illustrativa</figcaption>
      </figure>
      <div className="hero-copy">
        <p className="hero-context">Impresa edile a Montebrina</p>
        <h1 id="hero-title"><span>Muri dritti,</span><span>case che</span><span>durano.</span></h1>
        <p className="hero-text">Cappotto, ristrutturazioni e facciate.<br />Una sola impresa dal sopralluogo all’ultima mano di colore.</p>
        <div className="hero-actions">
          <a className="btn btn-heat" href="#contatti">Richiedi un sopralluogo</a>
          <a className="hero-discover" href="#servizi">Esplora i servizi <ArrowDown size={19} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="hero-foundation">
        <p><span>Sede e magazzino</span><strong>{COMPANY.city}</strong></p>
        <p><span>Cantieri dal</span><strong>{COMPANY.founded}</strong></p>
        <p><span>Un solo referente</span><strong>Dal sopralluogo alla consegna</strong></p>
      </div>
    </section>
  );
}
