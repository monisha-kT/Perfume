import { motion } from "framer-motion";
import { scrollToId } from "../../lib/scroll";

const LINKS = [
  { id: "notes", label: "Notes" },
  { id: "craft", label: "Craft" },
  { id: "cta", label: "Acquire" },
];

export default function Header() {
  return (
    <motion.header
      className="site-header"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        className="brand"
        data-cursor="hover"
        onClick={() => scrollToId("hero")}
      >
        NOCTURNE
      </button>
      <nav className="site-nav">
        {LINKS.map((link) => (
          <button
            key={link.id}
            data-cursor="hover"
            onClick={() => scrollToId(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </motion.header>
  );
}
