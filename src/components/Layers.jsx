import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { afterPaint } from '../lib/motion.js';
import { layers } from '../content.js';
import { prefersReducedMotion } from '../lib/motion.js';
import { Split } from './Split.jsx';

// Assonometria isometrica: r lungo la parete, d nello spessore (verso chi guarda), v in altezza.
const O = { x: 352, y: 260 };
const H = 220;
const point = (r, d, v) => `${(O.x + r * 0.866 - d * 0.866).toFixed(1)},${(O.y + r * 0.5 + d * 0.5 - v).toFixed(1)}`;
const SLABS = [
  { id: 'muratura', length: 300, t: 56, front: '#9b5f48', top: '#b5775d', side: '#714535', brick: true },
  { id: 'collante', length: 268, t: 8, front: '#ada99a', top: '#c8c3b4', side: '#8f8a7a' },
  { id: 'isolante', length: 236, t: 64, front: '#f5f1df', top: '#fffef6', side: '#d8d1ba' },
  { id: 'tasselli', length: 236, t: 0 },
  { id: 'rasatura', length: 204, t: 10, front: '#b9b7ae', top: '#d4d1c8', side: '#949288', mesh: true },
  { id: 'finitura', length: 172, t: 8, front: '#c6ad7e', top: '#ddd0b0', side: '#a48a57' },
];
const DOWELS = [[44, 0.3], [118, 0.3], [192, 0.3], [44, 0.72], [118, 0.72], [192, 0.72]];

function geometry(gap) {
  let d = 0;
  return SLABS.map((slab, index) => {
    const d0 = d + index * gap;
    d += slab.t;
    const d1 = d0 + slab.t;
    const L = slab.length;
    return {
      ...slab,
      d0,
      front: [point(0, d1, 0), point(L, d1, 0), point(L, d1, H), point(0, d1, H)].join(' '),
      top: [point(0, d0, H), point(L, d0, H), point(L, d1, H), point(0, d1, H)].join(' '),
      side: [point(L, d0, 0), point(L, d1, 0), point(L, d1, H), point(L, d0, H)].join(' '),
    };
  });
}

const dowelPos = (d, r, v) => point(r, d, H * v).split(',').map(Number);

function draw(svg, gap) {
  geometry(gap).forEach((slab) => {
    const g = svg.querySelector(`[data-layer="${slab.id}"]`);
    if (slab.id === 'tasselli') {
      g.querySelectorAll('[data-dowel]').forEach((node, i) => {
        const [r, v] = DOWELS[i];
        const [x, y] = dowelPos(slab.d0 + 4, r, v);
        const [x2, y2] = dowelPos(slab.d0 - 60, r, v);
        node.querySelector('line').setAttribute('x1', x); node.querySelector('line').setAttribute('y1', y);
        node.querySelector('line').setAttribute('x2', x2); node.querySelector('line').setAttribute('y2', y2);
        node.querySelector('ellipse').setAttribute('cx', x); node.querySelector('ellipse').setAttribute('cy', y);
      });
      return;
    }
    ['front', 'top', 'side'].forEach((face) => g.querySelector(`.${face}`).setAttribute('points', slab[face]));
  });
}

const START_GAP = 28;

export function Layers() {
  const root = useRef(null);
  const svg = useRef(null);
  const [active, setActive] = useState(2);
  const slabs = geometry(START_GAP);

  useGSAP((context, contextSafe) => afterPaint(contextSafe, () => {
    if (prefersReducedMotion()) return;
    const state = { gap: START_GAP };
    const redraw = () => draw(svg.current, state.gap);
    gsap.fromTo(state, { gap: 0 }, {
      gap: START_GAP, ease: 'none', onUpdate: redraw,
      scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'center 40%', scrub: 0.7 },
    });
  }), { scope: root });

  const id = layers[active].id;
  return (
    <section id="strati" className="layers" ref={root} aria-labelledby="layers-title">
      <div className="layers-pin">
        <div className="layers-head">
          <p className="kicker">Sotto l’intonaco</p>
          <Split id="layers-title" text="Sei strati, nessuno da saltare." />
          <p className="lead">Se uno strato è posato male, il cappotto rende meno. Questa è la parete vista in sezione, dal muro verso l’esterno.</p>
        </div>
        <figure className="layers-visual">
          <svg ref={svg} viewBox="0 0 640 520" role="img" aria-label="Spaccato esploso di un sistema a cappotto: muratura, collante, pannello isolante, tasselli, rasatura armata e finitura">
            <defs>
              <pattern id="iso-brick" width="24" height="12" patternUnits="userSpaceOnUse" patternTransform="skewY(30)">
                <path d="M0 0 H24 M0 6 H24 M6 0 V6 M18 6 V12" stroke="#cca58f" strokeWidth="1" fill="none" />
              </pattern>
              <pattern id="iso-mesh" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="skewY(30)">
                <path d="M0 0 H8 M0 0 V8" stroke="#6f9f8c" strokeWidth="0.9" fill="none" />
              </pattern>
            </defs>
            {slabs.map((slab, index) => (
              <g key={slab.id} data-layer={slab.id} className={`iso-layer ${slab.id === id ? 'is-active' : ''}`} onPointerEnter={() => setActive(index)} onClick={() => setActive(index)}>
                {slab.id === 'tasselli' ? DOWELS.map(([r, v], i) => {
                  const [x, y] = dowelPos(slab.d0 + 4, r, v);
                  const [x2, y2] = dowelPos(slab.d0 - 60, r, v);
                  return (
                    <g key={i} data-dowel="">
                      <line x1={x} y1={y} x2={x2} y2={y2} className="dowel-shaft" />
                      <ellipse cx={x} cy={y} rx="8" ry="8" className="dowel-head" />
                    </g>
                  );
                }) : (
                  <>
                    <polygon className="side" points={slab.side} fill={SLABS[index].side} />
                    <polygon className="top" points={slab.top} fill={SLABS[index].top} />
                    <polygon className="front" points={slab.front} fill={SLABS[index].front} />
                    {slab.brick && <polygon className="front texture" points={slab.front} fill="url(#iso-brick)" />}
                    {slab.mesh && <polygon className="front texture" points={slab.front} fill="url(#iso-mesh)" />}
                  </>
                )}
              </g>
            ))}
          </svg>
          <figcaption>Schema indicativo, spessori non in scala.</figcaption>
        </figure>
        <ol className="layers-list">
          {layers.map((layer, index) => (
            <li key={layer.id} className={index === active ? 'is-active' : ''}>
              <button type="button" aria-expanded={index === active} aria-controls={`strato-${layer.id}`} onClick={() => setActive(index)}>
                <span className="n" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span>{layer.title}</span>
              </button>
              <p id={`strato-${layer.id}`} hidden={index !== active}>{layer.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
