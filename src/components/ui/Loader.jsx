import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The scene is entirely procedural (no textures/models to fetch), so there's
// nothing for drei's useProgress to report — we drive the bar on a fixed
// cinematic timeline instead and let the fonts/canvas warm up underneath it.
export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    let raf;
    const DURATION = 1800;

    const tick = (t) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const pct = Math.min(100, (elapsed / DURATION) * 100);
      setDisplayProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (displayProgress >= 100) {
      const t = setTimeout(() => {
        setVisible(false);
        onDone?.();
      }, 550);
      return () => clearTimeout(t);
    }
  }, [displayProgress, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            className="loader-panel loader-panel--left"
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="loader-panel loader-panel--right"
            exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="loader-content"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
          >
            <span className="eyebrow">Eau de Parfum</span>
            <h1 className="loader-mark serif">NOCTURNE</h1>
            <div className="loader-bar">
              <motion.div
                className="loader-bar-fill"
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            <span className="loader-pct">{Math.floor(displayProgress)}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
