import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getConditionTheme } from "../uiTheme";
import useCountUp from "../hooks/useCountUp";

export default function ResultMeter({
  score,
  maxScore,
  label,
  caption,
  assessmentId,
}) {
  const theme = getConditionTheme(assessmentId);
  const scorePercent = maxScore ? (score / maxScore) * 100 : 0;
  const animatedScore = useCountUp(score, 1200);

  return (
    <div className="result-meter">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: 64,
          height: 64,
          borderRadius: "22px",
          background: theme.colorLight,
          color: theme.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.6rem",
          margin: "0 auto var(--sp-5)",
        }}
      >
        <FontAwesomeIcon icon={theme.icon} />
      </motion.div>

      <p
        style={{
          fontSize: "var(--text-xs)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "var(--color-text-3)",
          marginBottom: "var(--sp-2)",
        }}
      >
        Your score
      </p>

      <div className="result-score" style={{ color: theme.color }}>
        {animatedScore}
        <span className="result-max"> / {maxScore}</span>
      </div>

      <div
        className="progress-track"
        style={{ margin: "var(--sp-5) 0 var(--sp-4)" }}
      >
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${scorePercent}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          style={{ background: theme.color }}
        />
      </div>

      <motion.p
        className="result-label"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        {label}
      </motion.p>
      <motion.p
        className="result-caption"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        {caption}
      </motion.p>
    </div>
  );
}
