import { motion } from "framer-motion";
import { getVh } from "../../lib/scroll";

const NOTES = [
  {
    index: "01",
    name: "Top",
    align: "left",
    tint: "gold",
    desc: "The opening — bright and unguarded. A citrus spark that lasts just long enough to make an entrance.",
    chips: ["Bergamot", "Pink Pepper", "Cardamom"],
  },
  {
    index: "02",
    name: "Heart",
    align: "right",
    tint: "rose",
    desc: "Where the fragrance settles into itself — dark rose and oud, velvet-heavy and a little dangerous.",
    chips: ["Damask Rose", "Oud", "Iris"],
  },
  {
    index: "03",
    name: "Base",
    align: "left",
    tint: "amber",
    desc: "What lingers on skin long after midnight — amber, musk, and a trace of smoke.",
    chips: ["Amber", "Cashmeran", "Smoked Vetiver"],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

export default function Notes() {
  return (
    <section id="notes" className="section notes" style={{ minHeight: `${getVh("notes")}vh` }}>
      <div className="notes-heading">
        <span className="eyebrow">The Notes</span>
      </div>

      {NOTES.map((note) => (
        <div className={`note-block note-block--${note.align}`} key={note.index}>
          <motion.div
            className={`note-card note-card--${note.tint}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            variants={reveal}
          >
            <span className="note-index serif">{note.index}</span>
            <h3 className="note-name serif">{note.name} Notes</h3>
            <p className="note-desc">{note.desc}</p>
            <ul className="note-chips">
              {note.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
