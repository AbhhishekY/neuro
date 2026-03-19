import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { medicalDisclaimer } from "../data/assessmentMeta";
import { getAssessment } from "../data";
import { getConditionTheme } from "../uiTheme";

const checklistItems = [
  "Answer based on the instructions shown for this screener.",
  "Choose the option that feels closest, even if none feel perfect.",
  "Your result is best used as a conversation starter with a licensed mental health professional.",
];

export default function Intro() {
  const { type } = useParams();
  const assessment = getAssessment(type);

  if (!assessment) return <Navigate to="/" replace />;

  const theme = getConditionTheme(assessment.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="page-shell medium stack-24"
    >
      <div className="intro-layout">
        <div className="stack-16">
          <div className="card">
            <span
              className={`badge badge--${assessment.id}`}
              style={{ marginBottom: "16px", display: "inline-flex" }}
            >
              <FontAwesomeIcon icon={theme.icon} />
              {assessment.fullTitle}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.35rem, 3vw, 1.85rem)",
                fontWeight: 700,
                marginBottom: "12px",
                lineHeight: 1.25,
                color: "var(--color-text-1)",
              }}
            >
              {assessment.introHeading}
            </h1>
            <p className="text-body" style={{ marginBottom: "var(--sp-5)" }}>
              {assessment.description}
            </p>

            <div
              style={{
                background: "var(--color-surface-alt)",
                borderRadius: "var(--r-lg)",
                padding: "0 var(--sp-4)",
              }}
            >
              <div className="detail-grid">
                <div className="detail-row">
                  <span className="detail-label">Designed for</span>
                  <span className="detail-value">{assessment.designedFor}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Time window</span>
                  <span className="detail-value">
                    {assessment.questionWindow}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Limitations</span>
                  <span className="detail-value">{assessment.limitations}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stack-16">
          <div className="card">
            <p
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text-3)",
                marginBottom: "var(--sp-4)",
              }}
            >
              Before you begin
            </p>
            <div className="before-list">
              {checklistItems.map((item) => (
                <div key={item} className="before-list-item">
                  <div className="before-list-icon">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="disclaimer">
            <strong>This is a screening tool, not a clinical diagnosis. </strong>
            {medicalDisclaimer}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              to={`/assessment/${assessment.id}/quiz`}
              className="btn btn--primary"
              style={{
                background: theme.color,
                borderColor: theme.color,
                flex: 1,
                justifyContent: "center",
                boxShadow: `0 4px 14px 0 ${theme.color}44`,
              }}
            >
              Begin assessment
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/" className="btn btn--outline">
              <FontAwesomeIcon icon={faArrowLeft} />
              Back
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
