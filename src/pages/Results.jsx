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
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../context/AppContext";
import { medicalDisclaimer } from "../data/assessmentMeta";
import { calculateAssessment, getAssessment } from "../data";
import { getConditionTheme } from "../uiTheme";

const crisisResources = [
  { title: "Tele-MANAS", contact: "14416", href: "tel:14416" },
  { title: "Vandrevala", contact: "+91 9999 666 555", href: "tel:+919999666555" },
  { title: "Emergency", contact: "112", href: "tel:112" },
];

/* ── Print-only summary (invisible on screen) ─────────────────── */
function PrintSummary({ assessment, result, answers, aiMessage, theme }) {
  const date = new Date().toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
  return (
    <div className="print-summary" id="print-summary">
      <div className="print-header">
        <div>
          <div className="print-logo">🧠 MindCompass</div>
          <div className="print-tagline">Self-Screening Summary</div>
        </div>
        <div className="print-date">Date: {date}</div>
      </div>
      <hr className="print-divider" />
      <div className="print-banner" style={{ borderLeft: `4px solid ${theme.color}` }}>
        <p className="print-banner-title" style={{ color: theme.color }}>{assessment.fullTitle} — {result.range.label}</p>
        <p className="print-banner-score">Score: <strong>{result.score} / {result.maxScore}</strong></p>
        <p className="print-banner-note">{result.range.summary}</p>
      </div>
      {aiMessage && (
        <div className="print-ai-section">
          <p className="print-section-label">A note generated for you</p>
          <p className="print-ai-text">"{aiMessage}"</p>
        </div>
      )}
      <div>
        <p className="print-section-label">Your responses</p>
        <table className="print-table">
          <thead><tr><th>Question</th><th>Your Answer</th></tr></thead>
          <tbody>
            {assessment.questions.map((q) => (
              <tr key={q.id}>
                <td>{q.text}</td>
                <td>{answers[q.id]?.label ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="print-conversation">
        <p className="print-section-label">Conversation starters for your doctor</p>
        <ul>
          <li>"I completed a validated {assessment.fullTitle} screener and scored {result.score}/{result.maxScore}, which is the <em>{result.range.label}</em> range."</li>
          <li>"I'd like to discuss whether these symptoms are consistent with a clinical picture worth exploring."</li>
          <li>"Can you help me understand what formal assessment or next steps would be appropriate?"</li>
        </ul>
      </div>
      <div className="print-disclaimer">
        <strong>Medical disclaimer: </strong>{medicalDisclaimer}
      </div>
    </div>
  );
}

/* ── Score ring visual ─────────────────────────────────────────── */
function ScoreRing({ score, maxScore, color }) {
  const pct = Math.max(0, Math.min(1, score / maxScore));
  const r = 42;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;

  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
      <circle
        cx="55" cy="55" r={r} fill="none"
        stroke="white" strokeWidth="10"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform="rotate(-90 55 55)"
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <text x="55" y="51" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="Arial">{score}</text>
      <text x="55" y="66" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="Arial">/ {maxScore}</text>
    </svg>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
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

  const [aiMessage, setAiMessage] = React.useState(null);
  const [isAiLoading, setIsAiLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    async function fetchInsights() {
      try {
        setIsAiLoading(true);
        const { generateResultInsights } = await import("../services/llmService.js");
        const msg = await generateResultInsights(assessment, result, answers);
        if (active) setAiMessage(msg);
      } catch {
        if (active) setAiMessage("You took a brave step today by being here. Whatever your results show — you deserve care, support, and kindness. 💛");
      } finally {
        if (active) setIsAiLoading(false);
      }
    }
    if (result?.completed && !aiMessage && isAiLoading) fetchInsights();
    return () => { active = false; };
  }, [assessment, result, answers, aiMessage, isAiLoading]);

  // Scroll to top on mount to avoid inheriting scroll position from the quiz page
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  React.useEffect(() => {
    if (computedResult?.completed && !results[type]) saveResult(type, computedResult);
  }, [computedResult, results, saveResult, type]);

  if (!result?.completed) return <Navigate to={`/assessment/${type}/intro`} replace />;

  const flaggedSelfHarm =
    type === "depression" &&
    typeof answers["depression-9"]?.value === "number" &&
    answers["depression-9"].value > 0;

  function handleRetake() {
    resetAssessment(type);
    navigate(`/assessment/${type}/quiz`);
  }

  return (
    <>
      <PrintSummary assessment={assessment} result={result} answers={answers} aiMessage={aiMessage} theme={theme} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="rp-shell no-print"
      >
        {/* ── Hero banner ─────────────────────────────── */}
        <motion.div
          className="rp-hero"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ background: `linear-gradient(135deg, ${theme.color} 0%, ${theme.colorDark ?? theme.color}cc 100%)` }}
        >
          <div className="rp-hero-left">
            <span className="rp-hero-kicker">{assessment.fullTitle}</span>
            <h1 className="rp-hero-label">{result.range.label}</h1>
            <p className="rp-hero-summary">{result.range.summary}</p>
          </div>
          <div className="rp-hero-right">
            <ScoreRing score={result.score} maxScore={result.maxScore} color={theme.color} />
          </div>
        </motion.div>

        {/* ── Body ────────────────────────────────────── */}
        <div className="rp-body">

          {/* Left: AI note */}
          <div className="rp-left">
            <motion.div
              className="rp-ai-card"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <p className="rp-ai-eyebrow">✨ A note just for you</p>
              {isAiLoading ? (
                <div className="rp-ai-loading">
                  <span className="rp-ai-dot" />
                  Writing something warm for you…
                </div>
              ) : (
                <p className="rp-ai-text">{aiMessage}</p>
              )}
            </motion.div>

            {/* Crisis */}
            {flaggedSelfHarm && (
              <motion.div
                className="rp-crisis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <p className="rp-crisis-title">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  Please reach out if you feel unsafe
                </p>
                <p className="rp-crisis-body">You indicated thoughts related to self-harm. Please contact a support line or emergency services right away.</p>
                <div className="rp-crisis-links">
                  {crisisResources.map((r) => (
                    <a key={r.title} href={r.href} className="rp-crisis-btn">
                      <FontAwesomeIcon icon={faPhone} />
                      {r.title} {r.contact}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Details + actions */}
          <div className="rp-right">
            {/* Score breakdown */}
            <div className="rp-details">
              <div className="rp-details-row">
                <span className="rp-details-label">Score</span>
                <span className="rp-details-val" style={{ color: theme.color, fontWeight: 700 }}>{result.score} / {result.maxScore}</span>
              </div>
              <div className="rp-details-row">
                <span className="rp-details-label">Severity</span>
                <span className="rp-details-val" style={{ color: theme.color, fontWeight: 700 }}>{result.range.label}</span>
              </div>
              <div className="rp-details-row">
                <span className="rp-details-label">Use this as</span>
                <span className="rp-details-val">A conversation starter with your doctor</span>
              </div>
              <div className="rp-details-row" style={{ borderBottom: "none" }}>
                <span className="rp-details-label">Next step</span>
                <span className="rp-details-val">Seek professional support if symptoms affect daily life</span>
              </div>
            </div>

            {/* Actions */}
            <div className="rp-actions">
              <Link
                to="/referral?auto=true"
                className="rp-btn-primary"
                style={{ background: theme.color, boxShadow: `0 4px 20px ${theme.color}55` }}
              >
                Find Support Near You 📍
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <button onClick={() => window.print()} className="rp-btn-outline">
                <FontAwesomeIcon icon={faPrint} />
                Print doctor's summary
              </button>
              <button onClick={handleRetake} className="rp-btn-ghost">
                <FontAwesomeIcon icon={faRotateLeft} />
                Retake
              </button>
              <Link to="/" className="rp-btn-ghost">
                <FontAwesomeIcon icon={faHouse} />
                Try another
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="rp-disclaimer">{medicalDisclaimer}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
