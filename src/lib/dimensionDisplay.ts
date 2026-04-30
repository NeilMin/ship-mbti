import type { DimensionDefinition, DimensionScore } from "./types";

export function getDimensionDisplay(
  definition: DimensionDefinition,
  score: DimensionScore
) {
  const winnerOnLeft = score.winningPole === definition.leftPole.code;
  const leadLabel = winnerOnLeft ? definition.leftPole.label : definition.rightPole.label;
  const trailLabel = winnerOnLeft ? definition.rightPole.label : definition.leftPole.label;
  const leadPercent = winnerOnLeft ? score.leftPercent : score.rightPercent;
  const trailPercent = winnerOnLeft ? score.rightPercent : score.leftPercent;

  return {
    leadLabel,
    trailLabel,
    leadPercent,
    trailPercent,
  };
}
