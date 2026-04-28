import type { AppCopy, DimensionDefinition, Locale } from "../lib/types";
import { LocaleToggle } from "./LocaleToggle";

interface IntroScreenProps {
  copy: AppCopy;
  dimensions: DimensionDefinition[];
  locale: Locale;
  onStart: () => void;
  onLocaleChange: (locale: Locale) => void;
}

export function IntroScreen({
  copy,
  dimensions,
  locale,
  onStart,
  onLocaleChange,
}: IntroScreenProps) {
  return (
    <section className="hero-card">
      <div className="hero-toolbar">
        <LocaleToggle label={copy.languageLabel} locale={locale} onChange={onLocaleChange} />
      </div>
      <div className="hero-layout">
        <div className="hero-main">
          <p className="hero-kicker">{copy.heroKicker}</p>
          <h1>{copy.heroTitle}</h1>
          <p className="hero-copy">{copy.heroSubtitle}</p>
          <p className="hero-note">{copy.heroNote}</p>
          <button className="hero-button" type="button" onClick={onStart}>
            {copy.startButton}
          </button>
        </div>

        <div className="hero-visual">
          <img
            alt="Programmer personality cast illustration"
            className="hero-cast-image"
            src="/hero/intro-cast.png"
          />
        </div>
      </div>

      <div className="hero-dimensions">
        {dimensions.map((dimension) => (
          <article key={dimension.id} className="hero-dimension-card">
            <p className="hero-dimension-kicker">
              {dimension.name} / {dimension.label}
            </p>
            <h2>
              {dimension.leftPole.label} vs {dimension.rightPole.label}
            </h2>
            <p>{dimension.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
