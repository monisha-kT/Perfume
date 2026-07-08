import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Single source of truth for the page's vertical rhythm. Every section's
// CSS height and every 3D "story beat" derive their fraction from this list,
// so the camera/bottle choreography always lines up with what's on screen.
export const SECTIONS = [
  { key: "hero", vh: 100 },
  { key: "essence", vh: 95 },
  { key: "notes", vh: 270 },
  { key: "craft", vh: 130 },
  { key: "cta", vh: 115 },
];

const TOTAL_VH = SECTIONS.reduce((sum, s) => sum + s.vh, 0);

export function getVh(key) {
  return SECTIONS.find((s) => s.key === key)?.vh ?? 100;
}

export const BOUNDS = (() => {
  let acc = 0;
  const bounds = {};
  for (const s of SECTIONS) {
    const start = acc / TOTAL_VH;
    acc += s.vh;
    const end = acc / TOTAL_VH;
    bounds[s.key] = [start, end];
  }
  return bounds;
})();

// Mutated every scroll tick, read (never subscribed to) inside useFrame loops.
// Keeping this outside React state avoids re-rendering the component tree
// on every pixel of scroll.
export const scrollState = {
  progress: 0,
  velocity: 0,
  ready: false,
};

let lenis = null;
let tickerFn = null;
let trigger = null;

export function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
  });

  lenis.on("scroll", ScrollTrigger.update);

  tickerFn = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  trigger = ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      scrollState.progress = self.progress;
      scrollState.velocity = self.getVelocity();
    },
  });

  scrollState.ready = true;

  return () => {
    scrollState.ready = false;
    trigger?.kill();
    if (tickerFn) gsap.ticker.remove(tickerFn);
    lenis?.destroy();
    lenis = null;
    trigger = null;
    tickerFn = null;
  };
}

export function getLenis() {
  return lenis;
}

export function stopScroll() {
  lenis?.stop();
}

export function startScroll() {
  lenis?.start();
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) lenis?.scrollTo(el, { offset: 0, duration: 1.4 });
}
