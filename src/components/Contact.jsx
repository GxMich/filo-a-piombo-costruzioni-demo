import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft } from '@phosphor-icons/react/dist/csr/ArrowLeft';
import { ChatText } from '@phosphor-icons/react/dist/csr/ChatText';
import { Check } from '@phosphor-icons/react/dist/csr/Check';
import { Copy } from '@phosphor-icons/react/dist/csr/Copy';
import { House } from '@phosphor-icons/react/dist/csr/House';
import { HouseLine } from '@phosphor-icons/react/dist/csr/HouseLine';
import { PaintRoller } from '@phosphor-icons/react/dist/csr/PaintRoller';
import { Stack } from '@phosphor-icons/react/dist/csr/Stack';
import { Wall } from '@phosphor-icons/react/dist/csr/Wall';
import { DotsThree } from '@phosphor-icons/react/dist/csr/DotsThree';
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo';
import { COMPANY } from '../content.js';
import { formatDay } from '../hours.js';
import { prefersReducedMotion } from '../lib/motion.js';
import { Split } from './Split.jsx';
import { StatusBadge } from './Status.jsx';

const WORKS = [
  { label: 'Cappotto termico', icon: Stack },
  { label: 'Ristrutturazione', icon: HouseLine },
  { label: 'Costruzione', icon: Wall },
  { label: 'Facciata e tinteggiatura', icon: PaintRoller },
  { label: 'Altro', icon: DotsThree },
];
const PROPERTIES = ['Casa indipendente', 'Appartamento', 'Condominio', 'Locale commerciale', 'Altro'];
const STEPS = ['Intervento', 'Immobile', 'Dettagli', 'Invio'];
const WEEK = [[1, 'Lun–ven'], [6, 'Sabato'], [0, 'Domenica']];

function compose({ work, property, town, details, name }) {
  return [
    `Buongiorno${name.trim() ? `, sono ${name.trim()}` : ''}.`,
    `Vorrei un sopralluogo per: ${work.toLowerCase()}.`,
    `Immobile: ${property.toLowerCase()} a ${town.trim()}.`,
    details.trim() && `Dettagli: ${details.trim()}`,
  ].filter(Boolean).join('\n');
}

function Wizard() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ work: '', property: '', town: '', details: '', name: '' });
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState('');
  const panel = useRef(null);
  const previousStep = useRef(step);
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    panel.current?.querySelector('h3')?.focus();
    if (!prefersReducedMotion()) gsap.fromTo(panel.current, { autoAlpha: 0, x: 32 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power3.out' });
  }, [step]);

  const set = (field, value) => { setValues((v) => ({ ...v, [field]: value })); setError(''); };
  const message = compose(values);

  function next() {
    if (step === 1 && (!values.property || !values.town.trim())) {
      setError(!values.property ? 'Scegli il tipo di immobile.' : 'Indica il comune dell’immobile.');
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  }

  // Demo: nessun invio. In un sito vero qui si aprirebbe WhatsApp o l'app dei messaggi.
  function send(channel) {
    setSent(channel === 'whatsapp' ? 'WhatsApp' : 'SMS');
  }

  async function copy() {
    try { await navigator.clipboard.writeText(message); setCopied(true); window.setTimeout(() => setCopied(false), 2200); } catch { setCopied(false); }
  }

  return (
    <div className="wizard" id="richiesta">
      <div className="wizard-top">
        <h2 className="wizard-title">Richiedi un sopralluogo</h2>
        <ol className="wizard-progress" aria-label={`Passaggio ${step + 1} di ${STEPS.length}`}>
          {STEPS.map((label, i) => <li key={label} className={i <= step ? 'is-on' : ''} aria-current={i === step ? 'step' : undefined}><span>{label}</span></li>)}
        </ol>
      </div>

      <div className="wizard-panel" ref={panel}>
        {step === 0 && (
          <fieldset>
            <legend><h3 tabIndex={-1}>Che lavoro hai in mente?</h3></legend>
            <div className="work-grid">
              {WORKS.map(({ label, icon: Icon }) => (
                <label key={label} className="work-card">
                  <input type="radio" name="work" value={label} checked={values.work === label} onChange={() => { set('work', label); window.setTimeout(() => setStep(1), 260); }} />
                  <span><Icon size={30} weight="light" aria-hidden="true" />{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend><h3 tabIndex={-1}>Dov’è l’immobile?</h3></legend>
            <div className="chips" role="radiogroup" aria-label="Tipo di immobile">
              {PROPERTIES.map((p) => (
                <label key={p} className="chip"><input type="radio" name="property" value={p} checked={values.property === p} onChange={() => set('property', p)} /><span><House size={16} weight="bold" aria-hidden="true" />{p}</span></label>
              ))}
            </div>
            <label className="field">
              <span>Comune</span>
              <input type="text" value={values.town} autoComplete="address-level2" placeholder="Es. Montebrina" onChange={(e) => set('town', e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); next(); } }} aria-invalid={Boolean(error)} />
            </label>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend><h3 tabIndex={-1}>Qualche dettaglio in più</h3></legend>
            <label className="field">
              <span>Cosa vorresti fare <em>facoltativo</em></span>
              <textarea rows="4" value={values.details} placeholder="Es. cappotto su una casa di due piani, facciata da rifare" onChange={(e) => set('details', e.target.value)} />
            </label>
            <label className="field">
              <span>Il tuo nome <em>facoltativo</em></span>
              <input type="text" value={values.name} autoComplete="name" onChange={(e) => set('name', e.target.value)} />
            </label>
          </fieldset>
        )}

        {step === 3 && (
          <div>
            <h3 tabIndex={-1}>Ecco il tuo messaggio</h3>
            <p className="bubble">{message}</p>
            <div className="send-row">
              <button type="button" className="btn btn-heat" onClick={() => send('whatsapp')}><WhatsappLogo size={20} weight="bold" aria-hidden="true" />Invia su WhatsApp</button>
              <button type="button" className="btn btn-ghost" onClick={() => send('sms')}><ChatText size={20} weight="bold" aria-hidden="true" />Invia SMS</button>
              <button type="button" className="btn btn-text" onClick={copy}>{copied ? <Check size={18} weight="bold" aria-hidden="true" /> : <Copy size={18} weight="bold" aria-hidden="true" />}{copied ? 'Copiato' : 'Copia testo'}</button>
            </div>
            <p className="wizard-note" aria-live="polite">{sent ? `Demo: in un sito vero il messaggio si aprirebbe su ${sent}. Qui non è stato inviato niente.` : 'Sito dimostrativo: i pulsanti non inviano niente e il sito non salva dati.'}</p>
          </div>
        )}
        {error && <p className="field-error" role="alert">{error}</p>}
      </div>

      <div className="wizard-nav">
        {step > 0 ? <button type="button" className="btn-back" onClick={() => setStep((s) => s - 1)}><ArrowLeft size={18} weight="bold" aria-hidden="true" />Indietro</button> : <span />}
        {step === 1 || step === 2 ? <button type="button" className="btn btn-light" onClick={next}>Continua</button> : null}
      </div>
    </div>
  );
}

export function Contact({ status }) {
  return (
    <section id="contatti" className="contact" aria-labelledby="contact-title">
      <div className="contact-info">
        <p className="kicker">Contatti</p>
        <Split id="contact-title" text="Raccontaci il lavoro." />
        <a className="big-phone" href={`tel:${COMPANY.phone}`}>{COMPANY.phoneLabel}</a>
        <StatusBadge status={status} />
        <dl className="hours">
          {WEEK.map(([day, label]) => (
            <div key={label} className={status && (status.day === day || (day === 1 && status.day >= 1 && status.day <= 5)) ? 'is-today' : ''}><dt>{label}</dt><dd>{formatDay(day)}</dd></div>
          ))}
        </dl>
        <address>
          {COMPANY.street}<br />{COMPANY.city} ({COMPANY.province})<br />{COMPANY.email}
        </address>
      </div>
      <div className="contact-form"><Wizard /></div>
    </section>
  );
}
