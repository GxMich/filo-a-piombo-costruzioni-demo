import { useEffect, useState } from 'react';
import { useOfficeStatus } from './components/Status.jsx';
import { CreditsContent, Dialog, Footer, Header, LegalContent, MobileBar } from './components/Chrome.jsx';
import { Hero } from './components/Hero.jsx';
import { Services } from './components/Services.jsx';
import { Gallery } from './components/Gallery.jsx';
import { Facade } from './components/Facade.jsx';
import { Layers } from './components/Layers.jsx';
import { setupReveals } from './lib/motion.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Company, Faq, Method } from './components/Sections.jsx';
import { Contact } from './components/Contact.jsx';

export function App() {
  const status = useOfficeStatus();
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    const stop = setupReveals();
    let active = true;
    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => { active = false; stop(); window.removeEventListener('load', refresh); };
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenuto">Vai al contenuto</a>
      <Header status={status} />
      <main id="contenuto">
        <Hero />
        <Services />
        <Facade />
        <Layers />
        <Gallery />
        <Method />
        <Company />
        <Faq />
        <Contact status={status} />
      </main>
      <Footer openDialog={setDialog} />
      <MobileBar />
      <Dialog id="credits" title="Crediti fotografici" open={dialog === 'credits'} close={() => setDialog(null)}><CreditsContent /></Dialog>
      <Dialog id="legal" title="Note legali e privacy" open={dialog === 'legal'} close={() => setDialog(null)}><LegalContent /></Dialog>
    </>
  );
}
