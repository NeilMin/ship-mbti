import { likertScale } from "../data/questions";
import type { LikertValue } from "../lib/types";

interface LikertScaleProps {
  labels: {
    strongAgree: string;
    agree: string;
    slightlyAgree: string;
    neutral: string;
    slightlyDisagree: string;
    disagree: string;
    strongDisagree: string;
  };
  name: string;
  value?: LikertValue;
  onChange: (value: LikertValue) => void;
}

export function LikertScale({ labels, name, value, onChange }: LikertScaleProps) {
  const optionLabels = [
    labels.strongAgree,
    labels.agree,
    labels.slightlyAgree,
    labels.neutral,
    labels.slightlyDisagree,
    labels.disagree,
    labels.strongDisagree,
  ];

  return (
    <fieldset className="likert-scale">
      <legend className="sr-only">likert scale</legend>
      <div className="likert-scale__labels" aria-hidden="true">
        <span className="likert-scale__label likert-scale__label--agree">{labels.strongAgree}</span>
        <span className="likert-scale__label likert-scale__label--neutral">{labels.neutral}</span>
        <span className="likert-scale__label likert-scale__label--disagree">{labels.strongDisagree}</span>
      </div>
      <div className="likert-scale__options">
        {likertScale.map((item, index) => (
          <label
            key={item.value}
            className={`likert-option likert-option--${index + 1}`}
          >
            <input
              checked={value === item.value}
              name={name}
              onClick={() => onChange(item.value)}
              onChange={() => {}}
              type="radio"
              value={item.value}
            />
            <span aria-hidden="true" className="likert-option__circle" />
            <span className="sr-only">{optionLabels[index]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
