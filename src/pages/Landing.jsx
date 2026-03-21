import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import AssessmentCard from "../components/AssessmentCard";
import { medicalDisclaimer } from "../data/assessmentMeta";
import { getAssessmentList } from "../data";
import { useState, useEffect } from "react";
import { fetchLlmStats } from "../services/llmService";

const highlights = ["Free", "Private", "Browser-only"];

export default function Landing() {
  const assessments = getAssessmentList();
  const [llmCallsCount, setLlmCallsCount] = useState("...");

  useEffect(() => {
    fetchLlmStats().then((count) => {
      if (count) setLlmCallsCount(count.toLocaleString());
    });
  }, []);

  const stats = [
    { value: "4", label: "validated screeners" },
    { value: "2-4", label: "minutes each" },
    { value: llmCallsCount, label: "tests taken" },
  ];

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
        <motion.div
          className="landing-badge-row"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          {highlights.map((item) => (
            <span key={item} className="landing-pill">
              {item}
            </span>
          ))}
        </motion.div>

        <motion.h1
          className="landing-headline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
        >
          Understand your mind,
          <span className="landing-headline-accent">gently.</span>
        </motion.h1>

        <motion.p
          className="landing-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.34 }}
        >
          MindCompass gives you short, colorful, low-pressure check-ins for
          ADHD, autism, depression, and anxiety with clear next steps.
        </motion.p>

        <motion.div
          className="landing-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.48 }}
        >
          <a href="#assessments" className="btn btn--primary landing-primary-cta">
            Start screening
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
          <Link to="/about" className="btn btn--ghost">
            How it works
          </Link>
        </motion.div>

        <motion.div
          className="landing-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.58 }}
        >
          {stats.map((item) => (
            <div key={item.label} className="landing-stat">
              <span className="landing-stat-value">{item.value}</span>
              <span className="landing-stat-label">{item.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#assessments"
          className="landing-scroll-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.7 }}
          aria-label="Scroll to assessments"
        >
          <span className="landing-scroll-label">Explore screeners</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="landing-scroll-icon"
          />
        </motion.a>
      </section>

      <section id="assessments" className="landing-cards">
        <motion.div
          className="landing-cards-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="landing-cards-label">Choose your check-in</p>
          <h2 className="landing-cards-title">
            Four short paths, each designed to feel clear and low-pressure.
          </h2>
        </motion.div>

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
