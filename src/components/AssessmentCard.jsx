import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getConditionTheme } from "../uiTheme";

const CARD_TILTS = [-2.2, 1.8, -1.4, 2.5];

export default function AssessmentCard({ assessment, index = 0 }) {
  const theme = getConditionTheme(assessment.id);
  const tilt = CARD_TILTS[index % CARD_TILTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: 0.08 * index,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        y: -10,
        rotate: 0,
        scale: 1.03,
        transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
      }}
      style={{ zIndex: 4 - index }}
    >
      <Link
        to={`/assessment/${assessment.id}/intro`}
        className={`stacked-card stacked-card--${assessment.id}`}
      >
        <div className="stacked-card__icon">
          <FontAwesomeIcon icon={theme.icon} />
        </div>
        <div className="stacked-card__body">
          <h3 className="stacked-card__title">{assessment.title}</h3>
          <p className="stacked-card__desc">{assessment.badge}</p>
        </div>
        <FontAwesomeIcon icon={faArrowRight} className="stacked-card__arrow" />
      </Link>
    </motion.div>
  );
}
