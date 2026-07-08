import { motion } from "framer-motion";
import { getVh } from "../../lib/scroll";

const title = "NOCTURNE";

export default function Hero() {
  return (
    <section id="hero" className="section hero" style={{ minHeight: `${getVh("hero")}vh` }}>
      <div className="hero-inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Eau de Parfum &middot; No. 07
        </motion.span>

        <h1 className="hero-title serif" aria-label={title}>
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              className="hero-title-char"
              initial={{ y: "110%", rotate: 6 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{
                delay: 1.4 + i * 0.045,
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.9 }}
        >
          A fragrance for the hours after midnight — bergamot igniting into
          dark rose, settling into amber and smoke.
        </motion.p>
      </div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <span className="scroll-cue-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
