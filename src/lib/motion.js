import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const getLenis = () => null;
export function setupMotion() { return () => {}; }

export function setupReveals(root = document) {
  if (prefersReducedMotion()) return () => {};
  const context = gsap.context(() => {
    root.querySelectorAll('[data-enter]').forEach((element) => {
      gsap.from(element, { opacity: 0.65, y: 14, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
    });
  });
  return () => context.revert();
}

export function afterPaint(contextSafe, setup) {
  let cleanup;
  const timer = window.setTimeout(contextSafe(() => {
    cleanup = setup();
    ScrollTrigger.refresh();
  }), 60);
  return () => { window.clearTimeout(timer); if (typeof cleanup === 'function') cleanup(); };
}
