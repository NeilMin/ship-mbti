import type { AppCopy, DimensionDefinition, LikertValue, Locale, Question } from "../lib/types";
import { LikertScale } from "./LikertScale";
import { LocaleToggle } from "./LocaleToggle";
import { ProgressHeader } from "./ProgressHeader";

interface QuestionScreenProps {
  copy: AppCopy;
  dimension: DimensionDefinition | undefined;
  locale: Locale;
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  value?: LikertValue;
  onAnswer: (value: LikertValue) => void;
  onBack: () => void;
  onLocaleChange: (locale: Locale) => void;
}

export function QuestionScreen({
  copy,
  dimension,
  locale,
  question,
  questionIndex,
  totalQuestions,
  value,
  onAnswer,
  onBack,
  onLocaleChange,
}: QuestionScreenProps) {
  return (
    <section className="question-card">
      <div className="question-toolbar">
        <LocaleToggle label={copy.languageLabel} locale={locale} onChange={onLocaleChange} />
      </div>
      <ProgressHeader current={questionIndex + 1} label={copy.questionLabel} total={totalQuestions} />
      <p className="question-dimension">
        {dimension?.name} / {dimension?.label}
      </p>
      <h1 className="question-prompt">{question.prompt}</h1>
      <LikertScale
        key={question.id}
        labels={copy.scaleLabels}
        name={question.id}
        onChange={onAnswer}
        value={value}
      />
      <div className="question-actions">
        <button
          className="question-button question-button--secondary"
          disabled={questionIndex === 0}
          onClick={onBack}
          type="button"
        >
          {copy.backButton}
        </button>
      </div>
    </section>
  );
}
