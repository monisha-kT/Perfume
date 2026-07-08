# NOCTURNE — Project Documentation


## Behind the scenes: how it was created

1. **Scaffolded** a React + Vite project and installed the 3D/animation stack: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `gsap`, `lenis`, `framer-motion`.
2. **Designed the narrative** first, not the code: Hero → The Essence → Top/Heart/Base Notes → The Craft → CTA. Each section's scroll height became a fraction of a single 0–1 timeline (`src/lib/scroll.js`).
3. **Built a keyframe "story" system** (`src/lib/story.js`) — a list of camera positions, look-at targets, FOV, bottle rotation, cap-lift amount, and liquid/particle color at specific points along that timeline. A `sampleStory()` helper finds the two surrounding keyframes for the current scroll position and blends between them with a smoothstep curve.
4. **Modeled the bottle procedurally** — no downloaded assets. The glass body and the liquid inside are both `THREE.LatheGeometry` profiles (a 2D silhouette revolved 360°), with drei's `MeshTransmissionMaterial` for real glass refraction and a metallic gold cap built from primitives.
5. **Wrote a custom GLSL particle shader** for the ambient glow field, since off-the-shelf particle components didn't give enough control over per-particle drift, twinkle, and color-crossfade.
6. **Wired scroll to the 3D scene**: Lenis handles the actual smooth-scrolling; GSAP ScrollTrigger watches the document and republishes scroll progress; a `CameraRig` component reads that progress every frame and eases the camera toward the current story keyframe.
7. **Layered the UI**: a timed preloader (the scene has no real assets to wait on, so it's a choreographed reveal rather than a real progress bar), a custom magnetic cursor, per-letter hero title animation, and scroll-triggered text reveals via Framer Motion's `whileInView`.
8. **Tested by actually running it** — launched the dev server, drove it with a headless Chromium session via Playwright, and screenshotted every story beat. This caught three real bugs that were invisible from reading the code alone:
   - The loader never finished (it was waiting on asset-loading progress that never fires, since nothing is actually loaded from disk).
   - The scene was wildly overexposed — lighting intensities and particle sprite sizes needed a full rebalance.
   - A scripted "cap lifts off the bottle" moment during the Craft section was completely cropped out of frame by the camera's field of view.
9. **Iterated against screenshots** until the lighting, glass material, and camera framing all read cleanly at every scroll position.

## How it's used

**Run it locally:**
```bash
npm install
npm run dev
```
Then open the printed local URL (typically `http://localhost:5173`).

**Build for production:**
```bash
npm run build
```
Outputs a static bundle to `dist/`, deployable to any static host (Vercel, Netlify, GitHub Pages, S3, etc).

**Customize it:**
- Brand name, copy, and pricing: `src/components/sections/*.jsx`
- Colors and fonts: CSS variables at the top of `src/index.css`
- The scroll story (camera moves, colors, cap animation): `src/lib/story.js`
- Section heights / pacing: the `SECTIONS` array in `src/lib/scroll.js`
