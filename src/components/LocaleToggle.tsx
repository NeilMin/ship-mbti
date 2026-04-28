import type { Locale } from "../lib/types";

interface LocaleToggleProps {
  locale: Locale;
  label: string;
  onChange: (locale: Locale) => void;
}

export function LocaleToggle({ locale, label, onChange }: LocaleToggleProps) {
  return (
    <div className="locale-toggle" role="group" aria-label={label}>
      <button
        className={`locale-toggle__button${locale === "zh" ? " locale-toggle__button--active" : ""}`}
        onClick={() => onChange("zh")}
        type="button"
      >
        中文
      </button>
      <button
        className={`locale-toggle__button${locale === "en" ? " locale-toggle__button--active" : ""}`}
        onClick={() => onChange("en")}
        type="button"
      >
        English
      </button>
    </div>
  );
}
