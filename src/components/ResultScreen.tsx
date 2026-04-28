import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { getCharacterImageAlt, getCharacterImageSrc } from "../lib/characterImages";
import type { AssessmentResult } from "../lib/types";
import { ResultBars } from "./ResultBars";
import { ShareCard } from "./ShareCard";

interface ResultScreenProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
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

      <ResultBars scores={result.dimensions} />

      <div className="result-grid">
        <article className="result-card">
          <h3>长描述</h3>
          <p>{personality.description}</p>
        </article>
        <article className="result-card">
          <h3>核心优势</h3>
          <p>{personality.strengths}</p>
        </article>
        <article className="result-card">
          <h3>致命风险</h3>
          <p>{personality.risks}</p>
        </article>
        <article className="result-card">
          <h3>适宜环境</h3>
          <p>{personality.environment}</p>
        </article>
      </div>

      <article className="result-card result-card--lifestyle">
        <h3>生活与社交侧写</h3>
        <p>{personality.lifestyle}</p>
      </article>

      <div className="result-actions">
        <button className="question-button" onClick={handleExport} type="button">
          {isExporting ? "生成中..." : "保存结果图"}
        </button>
        <button
          className="question-button question-button--secondary"
          onClick={onRestart}
          type="button"
        >
          重新测试
        </button>
      </div>

      {isExporting ? (
        <div className="share-export-shell">
          <div ref={shareCardRef}>
            <ShareCard result={result} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
