import React from "react";
import { motion } from "framer-motion";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { useAppContext } from "../context/AppContext";
import {
  calculateAssessment,
  findNextUnansweredIndex,
  getAssessment,
} from "../data";
import { getConditionTheme } from "../uiTheme";

const encouragementMessages = [
  "You're doing great — keep going.",
  "Take all the time you need.",
  "Almost there — stay with it.",
];

export default function Quiz() {
  const { type } = useParams();
  const navigate = useNavigate();
  const assessment = getAssessment(type);
  const { responses, setAnswer, saveResult } = useAppContext();
  const answers = responses[type] ?? {};

  const [direction, setDirection] = React.useState(1);
  const [encouragement, setEncouragement] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(() => {
    if (!assessment) return 0;
    return Math.min(
      findNextUnansweredIndex(type, answers),
      assessment.questionCount - 1
    );
  });

  React.useEffect(() => {
    if (!assessment) return;
    setCurrentIndex((c) => Math.min(c, assessment.questionCount - 1));
  }, [assessment]);

  React.useEffect(() => {
    if (Math.random() < 1 / 3) {
      setEncouragement(
        encouragementMessages[
          Math.floor(Math.random() * encouragementMessages.length)
        ]
      );
    } else {
      setEncouragement(null);
    }
  }, [currentIndex]);

  if (!assessment) return <Navigate to="/" replace />;

  const theme = getConditionTheme(assessment.id);
  const currentQuestion = assessment.questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const answeredCount = assessment.questions.filter(
    (q) => typeof answers[q.id]?.value === "number"
  ).length;
  const progress = (answeredCount / assessment.questionCount) * 100;

  function handleSelect(option, optionIndex) {
    setAnswer(type, currentQuestion.id, { ...option, index: optionIndex });
  }

  function handleBack() {
    if (currentIndex === 0) {
      navigate(`/assessment/${type}/intro`);
      return;
    }
    setDirection(-1);
    setCurrentIndex((c) => c - 1);
  }

  function handleNext() {
    if (!selectedAnswer) return;
    if (currentIndex === assessment.questionCount - 1) {
      const result = calculateAssessment(type, answers);
      saveResult(type, result);
      navigate(`/assessment/${type}/results`);
      return;
    }
    setDirection(1);
    setCurrentIndex((c) => c + 1);
  }

  return (
    <section className="quiz-container">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
      >
        <div className="quiz-header">
          <div>
            <p className="text-kicker">{assessment.fullTitle}</p>
            <p className="quiz-step">
              Question {currentIndex + 1} of {assessment.questionCount}
            </p>
          </div>
          <span className="quiz-progress-label">{Math.round(progress)}% done</span>
        </div>
        <ProgressBar progress={progress} accentHex={theme.color} />
      </motion.div>

      <QuestionCard
        assessment={assessment}
        direction={direction}
        currentIndex={currentIndex}
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelect}
      />

      {encouragement && (
        <p className="quiz-encouragement">{encouragement}</p>
      )}

      <div className="quiz-actions">
        <button type="button" onClick={handleBack} className="btn btn--outline">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="btn btn--primary"
          style={
            selectedAnswer
              ? {
                  background: theme.color,
                  borderColor: theme.color,
                  boxShadow: `0 4px 14px 0 ${theme.color}44`,
                }
              : {}
          }
        >
          {currentIndex === assessment.questionCount - 1
            ? "See my result"
            : "Next question"}
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </section>
  );
}
