import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { getCharacterImageAlt, getCharacterImageSrc } from "../lib/characterImages";
import type { AppCopy, AssessmentResult, DimensionDefinition, Locale } from "../lib/types";
import { LocaleToggle } from "./LocaleToggle";
import { ResultBars } from "./ResultBars";
import { ShareCard } from "./ShareCard";

interface ResultScreenProps {
  copy: AppCopy;
  dimensions: DimensionDefinition[];
  locale: Locale;
  result: AssessmentResult;
  onRestart: () => void;
  onLocaleChange: (locale: Locale) => void;
}

export function ResultScreen({
  copy,
  dimensions,
  locale,
  result,
  onRestart,
  onLocaleChange,
}: ResultScreenProps) {
  const { personality } = result;
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (isExporting) {
      return;
    }

    setIsExporting(true);

    try {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });

      if (!shareCardRef.current) {
        return;
      }

      const dataUrl = await toPng(shareCardRef.current, {
        backgroundColor: "#edf2f7",
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `${result.code}-programmer-mbti.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="result-shell">
      <div className="result-toolbar">
        <LocaleToggle label={copy.languageLabel} locale={locale} onChange={onLocaleChange} />
      </div>
      <div className="result-hero">
        <div className="result-hero-copy">
          <p className="result-kicker">{personality.group}</p>
          <h1 className="result-code">{result.code}</h1>
          <h2 className="result-title">{personality.title}</h2>
          <p className="result-quote">“{personality.quote}”</p>
        </div>
        <div className="result-hero-figure">
          <img
            alt={getCharacterImageAlt(result.code)}
            className="result-hero-image"
            src={getCharacterImageSrc(result.code)}
          />
        </div>
      </div>

      <ResultBars dimensions={dimensions} scores={result.dimensions} />

      <div className="result-grid">
        <article className="result-card">
          <h3>{copy.resultSections.description}</h3>
          <p>{personality.description}</p>
        </article>
        <article className="result-card">
          <h3>{copy.resultSections.strengths}</h3>
          <p>{personality.strengths}</p>
        </article>
        <article className="result-card">
          <h3>{copy.resultSections.risks}</h3>
          <p>{personality.risks}</p>
        </article>
        <article className="result-card">
          <h3>{copy.resultSections.environment}</h3>
          <p>{personality.environment}</p>
        </article>
      </div>

      <article className="result-card result-card--lifestyle">
        <h3>{copy.resultSections.lifestyle}</h3>
        <p>{personality.lifestyle}</p>
      </article>

      <div className="result-actions">
        <button className="question-button" onClick={handleExport} type="button">
          {isExporting ? copy.resultButtons.generatingImage : copy.resultButtons.saveImage}
        </button>
        <button
          className="question-button question-button--secondary"
          onClick={onRestart}
          type="button"
        >
          {copy.resultButtons.restart}
        </button>
      </div>

      {isExporting ? (
        <div className="share-export-shell">
          <div ref={shareCardRef}>
            <ShareCard copy={copy} dimensions={dimensions} result={result} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
