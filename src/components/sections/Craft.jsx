import { motion } from "framer-motion";
import { getVh } from "../../lib/scroll";

const STATS = [
  { value: "120", label: "Hours of Blending" },
  { value: "3", label: "Generations of Perfumers" },
  { value: "1", label: "Bottle at a Time" },
];

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Craft() {
  return (
    <section id="craft" className="section craft" style={{ minHeight: `${getVh("craft")}vh` }}>
      <motion.div
        className="craft-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        variants={reveal}
      >
        <span className="eyebrow">The Craft</span>
        <h2 className="craft-title serif">Uncapped, by hand.</h2>
        <p className="craft-body">
          Each flacon is filled, sealed, and finished in a single small-batch
          run — the gold cap set only once the maceration is complete and the
          scent has fully married. Nothing is rushed. Nothing is automated.
        </p>

        <div className="craft-stats">
          {STATS.map((stat) => (
            <div className="craft-stat" key={stat.label}>
              <span className="craft-stat-value serif">{stat.value}</span>
              <span className="craft-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
