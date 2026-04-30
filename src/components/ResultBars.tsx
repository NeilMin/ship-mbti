import type { DimensionDefinition, DimensionScore } from "../lib/types";
import { getDimensionDisplay } from "../lib/dimensionDisplay";

interface ResultBarsProps {
  dimensions: DimensionDefinition[];
  scores: DimensionScore[];
}

export function ResultBars({ dimensions, scores }: ResultBarsProps) {
  return (
    <section className="result-bars">
      {scores.map((score) => {
        const definition = dimensions.find((item) => item.id === score.dimension);

        if (!definition) {
          return null;
        }

        const { leadLabel, trailLabel, leadPercent, trailPercent } = getDimensionDisplay(
          definition,
          score
        );

        return (
          <article key={score.dimension} className="result-bar-card">
            <div className="result-bar-top">
              <div>
                <p className="result-bar-kicker">{definition.name}</p>
                <h3>{definition.label}</h3>
              </div>
              <p className="result-bar-score">
                {leadPercent}% {leadLabel} / {trailPercent}% {trailLabel}
              </p>
            </div>
            <div aria-hidden="true" className="result-track">
              <span className="result-track-left" style={{ width: `${leadPercent}%` }} />
            </div>
          </article>
        );
      })}
    </section>
  );
}
