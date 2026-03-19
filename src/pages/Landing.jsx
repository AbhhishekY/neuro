import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import AssessmentCard from "../components/AssessmentCard";
import { medicalDisclaimer } from "../data/assessmentMeta";
import { getAssessmentList } from "../data";

export default function Landing() {
  const assessments = getAssessmentList();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="landing"
    >
      <div className="landing-shape landing-shape--1" aria-hidden="true" />
      <div className="landing-shape landing-shape--2" aria-hidden="true" />
      <div className="landing-shape landing-shape--3" aria-hidden="true" />
      <div className="landing-shape landing-shape--4" aria-hidden="true" />

      <section className="landing-hero">
        <motion.p
          className="landing-greeting"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          hey, you.
        </motion.p>

        <motion.h1
          className="landing-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          your brain is{" "}
          <span className="landing-headline-accent">pretty amazing.</span>
        </motion.h1>

        <motion.p
          className="landing-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          free & private screening for ADHD, autism, depression & anxiety
        </motion.p>

        <motion.a
          href="#assessments"
          className="landing-scroll-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          aria-label="Scroll to assessments"
        >
          <span className="landing-scroll-label">peek below</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="landing-scroll-icon"
          />
        </motion.a>
      </section>

      <section id="assessments" className="landing-cards">
        <motion.p
          className="landing-cards-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          pick what speaks to you
        </motion.p>
        <div className="card-stack">
          {assessments.map((assessment, index) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              index={index}
            />
          ))}
        </div>
      </section>

      <footer className="landing-footer">{medicalDisclaimer}</footer>
    </motion.div>
  );
}
