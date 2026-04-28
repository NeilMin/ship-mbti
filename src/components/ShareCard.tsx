import { QRCodeSVG } from "qrcode.react";
import { dimensions } from "../data/dimensions";
import type { AssessmentResult } from "../lib/types";
import { getCharacterImageAlt, getCharacterImageSrc } from "../lib/characterImages";
import { SHARE_HOST_LABEL, SHARE_URL } from "../lib/share";

interface ShareCardProps {
  result: AssessmentResult;
}

export function ShareCard({ result }: ShareCardProps) {
  return (
    <div className="share-card" data-testid="share-card">
      <div className="share-card-header">
        <p className="share-card-kicker">Programmer Personality Test</p>
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

          const winnerOnLeft = score.winningPole === definition.leftPole.code;
          const leadLabel = winnerOnLeft ? definition.leftPole.label : definition.rightPole.label;
          const trailLabel = winnerOnLeft ? definition.rightPole.label : definition.leftPole.label;
          const leadPercent = winnerOnLeft ? score.leftPercent : score.rightPercent;
          const trailPercent = winnerOnLeft ? score.rightPercent : score.leftPercent;

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
                <span className="share-card-dimension-fill" style={{ width: `${score.leftPercent}%` }} />
              </div>
              <p className="share-card-dimension-description">{definition.description}</p>
            </article>
          );
        })}
      </div>

      <div className="share-card-sections">
        <article className="share-card-section">
          <h3>长描述</h3>
          <p>{result.personality.description}</p>
        </article>
        <article className="share-card-section share-card-section--lifestyle">
          <h3>生活与社交侧写</h3>
          <p>{result.personality.lifestyle}</p>
        </article>
      </div>

      <p className="share-card-cta">你也来测测你的程序员人格</p>

      <div className="share-card-footer">
        <div className="share-card-url">
          <span>Visit</span>
          <strong>{SHARE_HOST_LABEL}</strong>
        </div>
        <div className="share-card-qr" data-testid="share-card-qr">
          <QRCodeSVG bgColor="transparent" fgColor="#173042" size={108} value={SHARE_URL} />
        </div>
      </div>
    </div>
  );
}
