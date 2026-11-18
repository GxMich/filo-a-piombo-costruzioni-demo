import { useState } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { Plus } from '@phosphor-icons/react/dist/csr/Plus';
import { services } from '../content.js';
import { Photo } from './Photo.jsx';

export function Services() {
  const [active, setActive] = useState(0);
  const selected = services[active];
  return (
    <section id="servizi" className="svc" aria-labelledby="svc-title">
      <div className="section-head">
        <div><p className="kicker">Cosa possiamo fare per te</p><h2 id="svc-title">Sei lavori,<br />una squadra.</h2></div>
        <p className="lead">Dall’isolamento della facciata al bagno da rifare. Scegli un servizio per vedere cosa comprende.</p>
      </div>
      <div className="services-layout">
        <figure className="service-display" key={selected.image}>
          <Photo name={selected.image} alt={selected.alt} sizes="(max-width: 599px) 600px, (max-width: 959px) 900px, 75vw" />
          <figcaption><span>{selected.title}</span><small>Immagine illustrativa</small></figcaption>
        </figure>
        <div className="service-menu">
          <ul className="svc-list">
            {services.map((service, index) => (
              <li id={service.id} key={service.id} className={'svc-row ' + (active === index ? 'is-open' : '')}>
                <h3><button type="button" aria-expanded={active === index} aria-controls={service.id + '-detail'} onClick={() => setActive(index)}>
                  <span>{service.title}</span><Plus size={22} aria-hidden="true" />
                </button></h3>
                <div className="svc-detail" id={service.id + '-detail'} inert={active !== index ? true : undefined}>
                  <div><p>{service.summary}</p><ul className="svc-includes">{service.includes.map((item) => <li key={item}>{item}</li>)}</ul></div>
                </div>
              </li>
            ))}
          </ul>
          <a className="service-link" href="#contatti">Descrivici il lavoro <ArrowUpRight size={19} aria-hidden="true" /></a>
          <p className="small-note">Servizi di un’impresa di fantasia, a scopo dimostrativo.</p>
        </div>
      </div>
    </section>
  );
}
