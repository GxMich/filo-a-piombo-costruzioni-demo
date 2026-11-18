import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { ChatText } from '@phosphor-icons/react/dist/csr/ChatText';
import { Phone } from '@phosphor-icons/react/dist/csr/Phone';
import { X } from '@phosphor-icons/react/dist/csr/X';
import { COMPANY, credits } from '../content.js';
import { StatusBadge } from './Status.jsx';

export const NAV = [['servizi', 'Servizi'], ['cappotto', 'Cappotto e facciate'], ['interventi', 'Interventi'], ['azienda', 'Azienda'], ['contatti', 'Contatti']];

export function Header({ status }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const button = useRef(null);
  const menu = useRef(null);

  // La navigazione resta disponibile durante la visita.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const surfaces = [document.querySelector('main'), document.querySelector('.footer'), document.querySelector('.mobile-bar')].filter(Boolean);
    surfaces.forEach((surface) => { surface.inert = open; });
    if (open) menu.current?.querySelector('a')?.focus();
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); button.current?.focus(); }
      if (e.key === 'Tab') {
        const nodes = [button.current, ...menu.current.querySelectorAll('a[href]')];
        if (!e.shiftKey && document.activeElement === nodes.at(-1)) { e.preventDefault(); nodes[0].focus(); }
        if (e.shiftKey && document.activeElement === nodes[0]) { e.preventDefault(); nodes.at(-1).focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; surfaces.forEach((surface) => { surface.inert = false; }); };
  }, [open]);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header-bar">
        <a className="logo" href="#inizio" aria-label="Filo a Piombo, inizio pagina" onClick={() => setOpen(false)}><strong>FILO A PIOMBO</strong><span>Costruzioni</span></a>
        <nav className="nav" aria-label="Navigazione principale">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <StatusBadge status={status} className="header-status" />
        <a className="btn btn-heat btn-small header-call" href={`tel:${COMPANY.phone}`}><Phone size={16} weight="bold" aria-hidden="true" /><span>Chiama</span></a>
        <button ref={button} className="menu-toggle" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Chiudi menu' : 'Apri menu'} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </div>
      <div id="menu" className="menu" ref={menu} hidden={!open}>
        <nav aria-label="Menu">
          {NAV.map(([id, label], i) => <a key={id} href={`#${id}`} style={{ '--i': i }} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <div className="menu-foot">
          <StatusBadge status={status} />
          <a href={`tel:${COMPANY.phone}`}>{COMPANY.phoneLabel}</a>
        </div>
      </div>
    </header>
  );
}

export function Dialog({ id, title, open, close, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog ref={ref} className="info-dialog" aria-labelledby={`${id}-heading`} onCancel={close} onClose={close} onClick={(e) => {
      if (e.target !== e.currentTarget) return;
      const b = e.currentTarget.getBoundingClientRect();
      if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) close();
    }}>
      <div className="dialog-head"><h2 id={`${id}-heading`}>{title}</h2><button className="icon-btn" onClick={close} aria-label={`Chiudi ${title.toLowerCase()}`}><X size={22} weight="bold" aria-hidden="true" /></button></div>
      <div className="dialog-body">{children}</div>
    </dialog>
  );
}

export function CreditsContent() {
  return (
    <>
      <p>Filo a Piombo è un’impresa di fantasia: le fotografie sono illustrative e non mostrano lavori reali. Alcune immagini sono state generate apposta per questa demo; le altre sono fotografie Unsplash, elencate qui sotto.</p>
      <ul className="credits-list">
        {credits.map((c) => (
          <li key={c.url}><span>{c.subject}</span><a href={c.url} target="_blank" rel="noopener noreferrer">{c.author}, {c.license} <ArrowUpRight size={14} weight="bold" aria-hidden="true" /><span className="sr-only"> (nuova scheda)</span></a></li>
        ))}
      </ul>
    </>
  );
}

export function LegalContent() {
  return (
    <div className="legal">
      <h3>Sito dimostrativo</h3>
      <p>{COMPANY.legalName} non esiste: nome, indirizzo ({COMPANY.street}, {COMPANY.city}, {COMPANY.province}), telefono ed email sono inventati. Il sito è una demo realizzata da Michele Modica.</p>
      <h3>Cookie e dati di navigazione</h3>
      <p>Questo sito non usa cookie, strumenti di statistica o pubblicità. Il fornitore dell’hosting registra i dati tecnici necessari al funzionamento e alla sicurezza del servizio, come l’indirizzo IP e l’orario di accesso.</p>
      <h3>Richieste di sopralluogo</h3>
      <p>Il modulo è simulato: prepara il testo del messaggio ma non lo invia a nessuno e non salva niente. In un sito vero il messaggio si aprirebbe su WhatsApp o negli SMS del tuo telefono.</p>
      <h3>Link esterni</h3>
      <p>I crediti fotografici rimandano a Unsplash, che ha una propria informativa.</p>
      <h3>I tuoi diritti</h3>
      <p>Il sito non raccoglie dati personali, quindi non c’è niente da consultare o cancellare.</p>
    </div>
  );
}

export function Footer({ openDialog }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="footer-cta">Hai un edificio da isolare o rinnovare?<a href="#contatti">Richiedi un sopralluogo <ArrowUpRight size={20} weight="bold" aria-hidden="true" /></a></p>
        <nav aria-label="Navigazione secondaria">{NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      </div>
      <div className="footer-mark" aria-hidden="true" />
      <div className="footer-bottom">
        <p className="preview-note">Attività di fantasia: nomi, recapiti, prezzi e recensioni sono inventati. Sito dimostrativo realizzato da <a href="https://www.modicamichele.it">Michele Modica</a>.</p>
        <p>{COMPANY.legalName}, {COMPANY.street}, {COMPANY.city} ({COMPANY.province}). {COMPANY.email}</p>
        <div>
          <button type="button" onClick={() => openDialog('legal')}>Note legali e privacy</button>
          <button type="button" onClick={() => openDialog('credits')}>Crediti fotografici</button>
        </div>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Contatto rapido">
      <a href={`tel:${COMPANY.phone}`}><Phone size={18} weight="bold" aria-hidden="true" />Chiama</a>
      <a href="#contatti"><ChatText size={18} weight="bold" aria-hidden="true" />Richiedi un sopralluogo</a>
    </nav>
  );
}
