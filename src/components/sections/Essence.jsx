import { motion } from "framer-motion";
import { getVh } from "../../lib/scroll";

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Essence() {
  return (
    <section id="essence" className="section essence" style={{ minHeight: `${getVh("essence")}vh` }}>
      <motion.div
        className="essence-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        variants={reveal}
      >
        <span className="eyebrow">The Essence</span>
        <p className="essence-quote serif">
          Every scent tells two stories — the one you choose,
          <br />
          and the one that chooses <em>you</em>.
        </p>
        <p className="essence-body">
          Nocturne was composed as a study in contrast: the sharp brightness
          of the first hour against the slow-burning warmth of the last.
          Wear it and it changes with you, note by note, through the night.
        </p>
      </motion.div>
    </section>
  );
}
