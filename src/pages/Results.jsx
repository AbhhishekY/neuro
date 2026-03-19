import React from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faPhone,
  faArrowRight,
  faRotateLeft,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import ResultMeter from "../components/ResultMeter";
import { useAppContext } from "../context/AppContext";
import { medicalDisclaimer } from "../data/assessmentMeta";
import { calculateAssessment, getAssessment } from "../data";
import { getConditionTheme } from "../uiTheme";

const crisisResources = [
  { title: "Tele-MANAS", contact: "14416", href: "tel:14416" },
  {
    title: "Vandrevala Foundation",
    contact: "+91 9999 666 555",
    href: "tel:+919999666555",
  },
  { title: "Emergency", contact: "112", href: "tel:112" },
];

export default function Results() {
  const { type } = useParams();
  const navigate = useNavigate();
  const assessment = getAssessment(type);
  const { responses, results, resetAssessment, saveResult } = useAppContext();
  const answers = responses[type] ?? {};

  if (!assessment) return <Navigate to="/" replace />;

  const computedResult = calculateAssessment(type, answers);
  const result = results[type] ?? computedResult;
  const theme = getConditionTheme(assessment.id);

  React.useEffect(() => {
    if (computedResult?.completed && !results[type]) {
      saveResult(type, computedResult);
    }
  }, [computedResult, results, saveResult, type]);

  if (!result?.completed) {
    return <Navigate to={`/assessment/${type}/intro`} replace />;
  }

  const flaggedSelfHarmItem =
    type === "depression" &&
    typeof answers["depression-9"]?.value === "number" &&
    answers["depression-9"].value > 0;

  function handleRetake() {
    resetAssessment(type);
    navigate(`/assessment/${type}/quiz`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="page-shell stack-24"
    >
      <div className="results-layout">
        <ResultMeter
          score={result.score}
          maxScore={result.maxScore}
          label={result.range.label}
          caption={result.range.summary}
          assessmentId={assessment.id}
        />

        <div className="stack-24">
          <div className="card">
            <span
              className={`badge badge--${assessment.id}`}
              style={{ marginBottom: "var(--sp-4)", display: "inline-flex" }}
            >
              {assessment.fullTitle}
            </span>

            <div
              style={{
                background: "var(--color-surface-alt)",
                borderRadius: "var(--r-lg)",
                padding: "0 var(--sp-4)",
              }}
            >
              <div className="detail-grid">
                <div className="detail-row">
                  <span className="detail-label">Your score</span>
                  <span className="detail-value">
                    {result.score} / {result.maxScore}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Use this as</span>
                  <span className="detail-value">
                    A starting point for a clinical conversation
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Best next move</span>
                  <span className="detail-value">
                    Review support options if symptoms are affecting daily life
                  </span>
                </div>
              </div>
            </div>
          </div>

          {flaggedSelfHarmItem && (
            <div className="crisis-alert">
              <p className="crisis-alert-title">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                Please reach out now if you feel unsafe.
              </p>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-danger-text)",
                  lineHeight: 1.65,
                }}
              >
                You marked the PHQ-9 item about self-harm above zero. If you
                may act on these thoughts, contact an urgent support line or
                local emergency services now.
              </p>
              <div className="crisis-links">
                {crisisResources.map((r) => (
                  <a
                    key={r.title}
                    href={r.href}
                    className="btn btn--danger btn--sm"
                  >
                    <FontAwesomeIcon icon={faPhone} />
                    {r.title}: {r.contact}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="disclaimer">
            <strong>Important disclaimer: </strong>
            {medicalDisclaimer}
          </div>

          <div className="results-ctas">
            <Link
              to="/referral"
              className="btn btn--primary"
              style={{
                background: theme.color,
                borderColor: theme.color,
                boxShadow: `0 4px 14px 0 ${theme.color}44`,
              }}
            >
              Find Support Near You
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <button
              type="button"
              onClick={handleRetake}
              className="btn btn--outline"
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              Retake this assessment
            </button>
            <Link to="/" className="btn btn--ghost">
              <FontAwesomeIcon icon={faHouse} />
              Try another assessment
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
