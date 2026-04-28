import type { DimensionDefinition, Locale } from "../lib/types";
import { dimensionsEn } from "./dimensions.en";
import { dimensionsZh } from "./dimensions.zh";

export const dimensionSets: Record<Locale, DimensionDefinition[]> = {
  zh: dimensionsZh,
  en: dimensionsEn,
};

export const dimensions = dimensionSets.zh;
