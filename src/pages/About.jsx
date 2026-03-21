import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faXmark,
  faClipboardList,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { staggerContainer, fadeInUp } from "../animations";

const sections = [
  {
    icon: faCircleInfo,
    title: "What MindCompass is",
    copy: "A frontend-only screening and referral experience designed to make the first step toward mental health support feel calmer, clearer, and more human.",
  },
  {
    icon: faXmark,
    title: "What MindCompass is not",
    copy: "Not a diagnosis engine, not a substitute for a clinician, and not a data collection product. Your answers are used only in the live browser session.",
  },
  {
    icon: faClipboardList,
    title: "Why these screeners",
    copy: "PHQ-9, GAD-7, AQ-10, and the public ASRS-v1.1 screener are widely used tools for structured self-screening and referral decisions. They create a shared language for follow-up conversations with a professional.",
  },
  {
    icon: faShieldHalved,
    title: "Privacy commitment",
    copy: "No login, no backend, no cloud storage. Theme preference is saved locally so dark mode persists, but assessment answers and results are not sent anywhere.",
  },
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="page-shell medium stack-32"
    >
      <div className="hero-section">
        <motion.p
          className="text-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{ marginBottom: "14px" }}
        >
          About MindCompass
        </motion.p>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          Built to make screening feel calmer.
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          The goal is simple: help people reflect on symptoms with validated
          structure, then move toward real support rather than sitting with
          the result alone.
        </motion.p>
      </div>

      <motion.div
        className="stack-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {sections.map((s) => (
          <motion.div key={s.title} className="about-section" variants={fadeInUp}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--sp-5)",
              }}
            >
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
                  flexShrink: 0,
                }}
              >
                <FontAwesomeIcon icon={s.icon} />
              </div>
              <div>
                <h2 className="about-section-title">{s.title}</h2>
                <p
                  className="text-body"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {s.copy}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
