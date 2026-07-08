import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ children, className = "", onClick, as = "button", href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      href={href}
      className={`magnetic-btn ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      data-cursor="hover"
    >
      {children}
    </Component>
  );
}
