import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch.current) return;

    const move = (e) => {
      setHidden(false);
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      setHovering(!!e.target.closest("[data-cursor='hover']"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (isTouch.current) return null;

  return (
    <div className={`cursor-layer ${hidden ? "cursor-layer--hidden" : ""}`}>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div
        className={`cursor-ring ${hovering ? "cursor-ring--hover" : ""}`}
        style={{ x: ringX, y: ringY }}
      />
    </div>
  );
}
