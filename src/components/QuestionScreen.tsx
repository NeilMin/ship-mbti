import { dimensions } from "../data/dimensions";
import type { LikertValue, Question } from "../lib/types";
import { LikertScale } from "./LikertScale";
import { ProgressHeader } from "./ProgressHeader";

interface QuestionScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  value?: LikertValue;
  onAnswer: (value: LikertValue) => void;
  onBack: () => void;
}

export function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  value,
  onAnswer,
  onBack,
}: QuestionScreenProps) {
  const dimension = dimensions.find((item) => item.id === question.dimension);

  return (
    <section className="question-card">
      <ProgressHeader current={questionIndex + 1} total={totalQuestions} />
      <p className="question-dimension">
        {dimension?.name} / {dimension?.label}
      </p>
      <h1 className="question-prompt">{question.prompt}</h1>
      <LikertScale key={question.id} name={question.id} onChange={onAnswer} value={value} />
      <div className="question-actions">
        <button
          className="question-button question-button--secondary"
          disabled={questionIndex === 0}
          onClick={onBack}
          type="button"
        >
          上一题
        </button>
      </div>
    </section>
  );
}
