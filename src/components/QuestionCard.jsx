import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getConditionTheme } from "../uiTheme";

const variants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
  }),
};

export default function QuestionCard({
  assessment,
  direction,
  currentIndex,
  question,
  selectedAnswer,
  onSelect,
}) {
  const theme = getConditionTheme(assessment.id);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <AnimatePresence custom={direction} mode="wait">
        <motion.article
          key={question.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="question-card"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span
              className="question-badge"
              style={{ background: theme.color }}
            >
              <FontAwesomeIcon icon={theme.icon} />
              {assessment.title}
            </span>
            <span className="text-muted">
              Question {currentIndex + 1} of {assessment.questionCount}
            </span>
          </div>

          <h2 className="question-text">{question.text}</h2>

          <div className="answer-options">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer?.index === index;

              return (
                <motion.button
                  key={`${question.id}-${option.label}`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.995 }}
                  type="button"
                  onClick={() => onSelect(option, index)}
                  className={`answer-btn${isSelected ? " selected" : ""}`}
                  style={isSelected ? { "--selected-color": theme.color } : {}}
                >
                  <span>{option.label}</span>
                  <span className="answer-check">
                    {isSelected && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ fontSize: "0.65rem" }}
                      />
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
