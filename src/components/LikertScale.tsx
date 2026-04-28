import { likertScale } from "../data/questions";
import type { LikertValue } from "../lib/types";

interface LikertScaleProps {
  name: string;
  value?: LikertValue;
  onChange: (value: LikertValue) => void;
}

export function LikertScale({ name, value, onChange }: LikertScaleProps) {
  return (
    <fieldset className="likert-scale">
      <legend className="sr-only">likert scale</legend>
      <div className="likert-scale__labels" aria-hidden="true">
        <span className="likert-scale__label likert-scale__label--agree">强烈同意</span>
        <span className="likert-scale__label likert-scale__label--neutral">中立</span>
        <span className="likert-scale__label likert-scale__label--disagree">强烈反对</span>
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
              onChange={() => onChange(item.value)}
              type="radio"
              value={item.value}
            />
            <span aria-hidden="true" className="likert-option__circle" />
            <span className="sr-only">{item.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
