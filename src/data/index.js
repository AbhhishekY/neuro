import adhdQuestions from "./adhd.json";
import anxietyQuestions from "./anxiety.json";
import autismQuestions from "./autism.json";
import depressionQuestions from "./depression.json";
import { assessmentMeta } from "./assessmentMeta";

const questionBank = {
  adhd: adhdQuestions,
  autism: autismQuestions,
  depression: depressionQuestions,
  anxiety: anxietyQuestions,
};

export const assessmentTypes = Object.keys(questionBank);

export function isValidAssessmentType(type) {
  return assessmentTypes.includes(type);
}

export function getAssessment(type) {
  if (!isValidAssessmentType(type)) {
    return null;
  }

  const questions = questionBank[type];
  const maxScore = questions.reduce(
    (total, question) =>
      total +
      question.options.reduce(
        (optionTotal, option) => Math.max(optionTotal, option.value),
        0,
      ),
    0,
  );

  return {
    ...assessmentMeta[type],
    questions,
    questionCount: questions.length,
    maxScore,
  };
}

export function getAssessmentList() {
  return assessmentTypes.map((type) => getAssessment(type));
}

export function calculateAssessment(type, answers = {}) {
  const assessment = getAssessment(type);

  if (!assessment) {
    return null;
  }

  const score = assessment.questions.reduce((total, question) => {
    const answerValue = answers[question.id];
    return total + (typeof answerValue?.value === "number" ? answerValue.value : 0);
  }, 0);

  const answeredCount = assessment.questions.filter(
    (question) => typeof answers[question.id]?.value === "number",
  ).length;

  const range =
    assessment.ranges.find(
      (entry) => score >= entry.min && score <= entry.max,
    ) ?? assessment.ranges[assessment.ranges.length - 1];

  return {
    assessment,
    score,
    maxScore: assessment.maxScore,
    answeredCount,
    completed: answeredCount === assessment.questionCount,
    range,
  };
}

export function findNextUnansweredIndex(type, answers = {}) {
  const assessment = getAssessment(type);

  if (!assessment) {
    return 0;
  }

  const nextIndex = assessment.questions.findIndex(
    (question) => typeof answers[question.id]?.value !== "number",
  );

  return nextIndex === -1 ? assessment.questionCount - 1 : nextIndex;
}
