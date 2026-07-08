import * as THREE from "three";
import { BOUNDS } from "./scroll";

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const C = (hex) => new THREE.Color(hex);

const [heroS, heroE] = BOUNDS.hero;
const [, essenceE] = BOUNDS.essence;
const [notesS, notesE] = BOUNDS.notes;
const [, craftE] = BOUNDS.craft;
const [ctaS, ctaE] = BOUNDS.cta;

const notesSpan = notesE - notesS;
const n0 = notesS;
const n1 = notesS + notesSpan / 3;
const n2 = notesS + (notesSpan * 2) / 3;
const n3 = notesE;

const GOLD = C("#e8c98a");
const ROSE = C("#e39aa3");
const AMBER = C("#c9863f");
const DUSK = C("#8a6a8f");

// Each beat: point in scroll-space (p, 0..1) + the full scene pose at that
// point. sampleStory() finds the two beats straddling the current scroll
// progress and returns them plus a smoothstepped blend factor; consumers
// (CameraRig, Bottle, Particles) lerp whichever fields they care about.
export const KEYFRAMES = [
  { p: heroS, cam: V(0, 0.55, 7.6), look: V(0, 0.15, 0), rotY: -0.4, cap: 0, liquid: GOLD, particle: GOLD, fov: 34, glow: 0.5 },
  { p: heroE, cam: V(0, 0.2, 6.1), look: V(0, 0.12, 0), rotY: Math.PI * 0.18, cap: 0, liquid: GOLD, particle: GOLD, fov: 32, glow: 0.65 },
  { p: essenceE, cam: V(2.3, 0.35, 5.3), look: V(0, 0.05, 0), rotY: Math.PI * 0.62, cap: 0, liquid: GOLD, particle: GOLD, fov: 29, glow: 0.8 },
  { p: n0, cam: V(-3.2, 0.5, 6.0), look: V(0, 0.12, 0), rotY: Math.PI * 0.9, cap: 0, liquid: GOLD, particle: GOLD, fov: 30, glow: 1.0 },
  { p: n1, cam: V(3.4, 0.1, 5.4), look: V(0, 0.02, 0), rotY: Math.PI * 1.55, cap: 0, liquid: ROSE, particle: ROSE, fov: 29, glow: 1.15 },
  { p: n2, cam: V(-2.8, -0.25, 5.1), look: V(0, -0.08, 0), rotY: Math.PI * 2.2, cap: 0, liquid: AMBER, particle: AMBER, fov: 29, glow: 1.2 },
  { p: n3, cam: V(0, 0.3, 6.4), look: V(0, 0.08, 0), rotY: Math.PI * 2.5, cap: 0, liquid: AMBER, particle: AMBER, fov: 30, glow: 1.05 },
  { p: craftE, cam: V(1.8, 0.6, 7.2), look: V(0, 0.25, 0), rotY: Math.PI * 2.85, cap: 1, liquid: DUSK, particle: GOLD, fov: 34, glow: 1.3 },
  { p: ctaS + (ctaE - ctaS) * 0.35, cam: V(0, 0.15, 6.6), look: V(0, 0.1, 0), rotY: Math.PI * 3.05, cap: 0, liquid: GOLD, particle: GOLD, fov: 31, glow: 1.4 },
  { p: ctaE, cam: V(0, 0.02, 5.6), look: V(0, 0.05, 0), rotY: Math.PI * 3.25, cap: 0, liquid: GOLD, particle: GOLD, fov: 29, glow: 1.7 },
];

export function sampleStory(t) {
  const kf = KEYFRAMES;
  let i = 0;
  while (i < kf.length - 2 && t > kf[i + 1].p) i++;
  const a = kf[i];
  const b = kf[i + 1];
  const span = b.p - a.p || 1e-6;
  const lt = THREE.MathUtils.clamp((t - a.p) / span, 0, 1);
  const s = lt * lt * (3 - 2 * lt);
  return { a, b, s };
}

export function damp(current, target, lambda, dt) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

export function damp3(vec, target, lambda, dt) {
  vec.x = damp(vec.x, target.x, lambda, dt);
  vec.y = damp(vec.y, target.y, lambda, dt);
  vec.z = damp(vec.z, target.z, lambda, dt);
}
