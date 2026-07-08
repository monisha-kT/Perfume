import { motion } from "framer-motion";
import { getVh } from "../../lib/scroll";
import MagneticButton from "../ui/MagneticButton";

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Cta() {
  return (
    <section id="cta" className="section cta" style={{ minHeight: `${getVh("cta")}vh` }}>
      <motion.div
        className="cta-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        variants={reveal}
      >
        <span className="eyebrow">Own the Night</span>
        <h2 className="cta-title serif">NOCTURNE</h2>
        <p className="cta-price">$285 &middot; 100ml</p>

        <MagneticButton className="cta-button" onClick={() => {}}>
          Add to Bag
        </MagneticButton>

        <p className="cta-note">Free engraving on every bottle. Ships worldwide.</p>
      </motion.div>

      <footer className="site-footer">
        <span>&copy; {new Date().getFullYear()} Nocturne Parfums</span>
        <div className="footer-links">
          <a href="#" data-cursor="hover">Instagram</a>
          <a href="#" data-cursor="hover">Journal</a>
          <a href="#" data-cursor="hover">Contact</a>
        </div>
      </footer>
    </section>
  );
}
