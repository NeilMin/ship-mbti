import { QRCodeSVG } from "qrcode.react";
import type { AppCopy, AssessmentResult, DimensionDefinition } from "../lib/types";
import { getCharacterImageAlt, getCharacterImageSrc } from "../lib/characterImages";
import { getDimensionDisplay } from "../lib/dimensionDisplay";
import { SHARE_HOST_LABEL, SHARE_URL } from "../lib/share";

interface ShareCardProps {
  copy: AppCopy;
  dimensions: DimensionDefinition[];
  result: AssessmentResult;
}

export function ShareCard({ copy, dimensions, result }: ShareCardProps) {
  return (
    <div className="share-card" data-testid="share-card">
      <div className="share-card-header">
        <p className="share-card-kicker">{copy.share.kicker}</p>
        <h2>{result.code}</h2>
        <p className="share-card-title">{result.personality.title}</p>
        <p className="share-card-quote">{result.personality.quote}</p>
      </div>

      <div className="share-card-figure">
        <img
          alt={getCharacterImageAlt(result.code)}
          className="share-card-image"
          src={getCharacterImageSrc(result.code)}
        />
      </div>

      <div className="share-card-metrics">
        {result.dimensions.map((score) => {
          const definition = dimensions.find((item) => item.id === score.dimension);

          if (!definition) {
            return null;
          }

          const { leadLabel, trailLabel, leadPercent, trailPercent } = getDimensionDisplay(
            definition,
            score
          );

          return (
            <article
              className="share-card-dimension"
              data-testid="share-card-dimension"
              key={definition.id}
            >
              <p className="share-card-dimension-kicker">{definition.label}</p>
              <p className="share-card-dimension-score">
                {leadPercent}% {leadLabel} / {trailPercent}% {trailLabel}
              </p>
              <div aria-hidden="true" className="share-card-dimension-track">
                <span className="share-card-dimension-fill" style={{ width: `${leadPercent}%` }} />
              </div>
              <p className="share-card-dimension-description">{definition.description}</p>
            </article>
          );
        })}
      </div>

      <div className="share-card-sections">
        <article className="share-card-section">
          <h3>{copy.resultSections.description}</h3>
          <p>{result.personality.description}</p>
        </article>
        <article className="share-card-section share-card-section--lifestyle">
          <h3>{copy.resultSections.lifestyle}</h3>
          <p>{result.personality.lifestyle}</p>
        </article>
      </div>

      <p className="share-card-cta">{copy.share.cta}</p>

      <div className="share-card-footer">
        <div className="share-card-url">
          <span>{copy.share.visit}</span>
          <strong>{SHARE_HOST_LABEL}</strong>
        </div>
        <div className="share-card-qr" data-testid="share-card-qr">
          <QRCodeSVG bgColor="transparent" fgColor="#173042" size={108} value={SHARE_URL} />
        </div>
      </div>
    </div>
  );
}
