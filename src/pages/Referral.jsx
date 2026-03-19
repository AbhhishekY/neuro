import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faArrowUpRightFromSquare,
  faUserDoctor,
  faBrain,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { staggerContainer, fadeInUp } from "../animations";

const helplines = [
  {
    name: "Tele-MANAS",
    note: "Government of India tele-mental health support line with referral pathways.",
    phone: "14416 / 1-800-891-4416",
    href: "https://telemanas.mohfw.gov.in/",
  },
  {
    name: "NIMHANS Psychiatry",
    note: "Department of Psychiatry at NIMHANS, Bengaluru for specialist evaluation.",
    phone: "080-26995250",
    href: "https://www.nimhans.ac.in/departments/psychiatry",
  },
  {
    name: "iCALL",
    note: "Counselling, support, and referral through Tata Institute of Social Sciences.",
    phone: "022-25521111 / 9152987821",
    href: "https://icallhelpline.org/",
  },
  {
    name: "Vandrevala Foundation",
    note: "Free 24×7 mental health counselling and crisis support across India.",
    phone: "+91 9999 666 555",
    href: "https://www.vandrevalafoundation.com/free-counseling",
  },
];

const providerCards = [
  {
    icon: faUserDoctor,
    title: "Psychiatrist",
    copy: "Best when you want diagnostic evaluation, medication review, or support for sleep, panic, concentration, or mood symptoms that feel intense.",
  },
  {
    icon: faBrain,
    title: "Clinical Psychologist",
    copy: "Useful for formal testing, neurodevelopmental assessment, therapy planning, and a deeper understanding of patterns across home, work, and relationships.",
  },
  {
    icon: faComments,
    title: "Therapist or Counsellor",
    copy: "Helpful if you want structured support for coping skills, emotional regulation, burnout, grief, anxiety, or depression.",
  },
];

export default function Referral() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="page-shell stack-40"
    >
      <div className="hero-section">
        <motion.p
          className="text-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{ marginBottom: "14px" }}
        >
          Referral and support
        </motion.p>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          style={{ maxWidth: "640px" }}
        >
          Find the right kind of support.
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          NeuroBright points you toward reputable support routes in India and
          helps you understand what kind of clinician to look for.
        </motion.p>
      </div>

      <section className="stack-24">
        <div className="section-header">
          <p className="text-kicker">National and specialist support</p>
          <h2 className="section-title">Helplines and institutions</h2>
        </div>
        <motion.div
          className="helpline-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {helplines.map((h) => (
            <motion.a
              key={h.name}
              href={h.href}
              target="_blank"
              rel="noreferrer"
              className="helpline-card"
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div className="helpline-phone">
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ fontSize: "0.75rem" }}
                />
                {h.phone}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <h3 className="helpline-name">{h.name}</h3>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--color-text-3)",
                    marginTop: "5px",
                    flexShrink: 0,
                  }}
                />
              </div>
              <p className="helpline-note">{h.note}</p>
            </motion.a>
          ))}
        </motion.div>
      </section>

      <section className="stack-24">
        <div className="section-header">
          <p className="text-kicker">What to look for</p>
          <h2 className="section-title">Understanding provider types</h2>
        </div>
        <motion.div
          className="provider-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {providerCards.map((card) => (
            <motion.div key={card.title} className="card" variants={fadeInUp}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "14px",
                  background: "rgba(255, 107, 107, 0.1)",
                  color: "#FF6B6B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  marginBottom: "var(--sp-4)",
                }}
              >
                <FontAwesomeIcon icon={card.icon} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 700,
                  color: "var(--color-text-1)",
                  marginBottom: "var(--sp-2)",
                }}
              >
                {card.title}
              </h3>
              <p className="text-body" style={{ fontSize: "var(--text-sm)" }}>
                {card.copy}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}
