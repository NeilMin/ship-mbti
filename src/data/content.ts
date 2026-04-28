import type { AppContent, Locale } from "../lib/types";
import { copyByLocale } from "./copy";
import { dimensionSets } from "./dimensions";
import { personalitySets } from "./personalities";
import { questionSets } from "./questions";

export function getAppContent(locale: Locale): AppContent {
  return {
    locale,
    questions: questionSets[locale],
    dimensions: dimensionSets[locale],
    personalities: personalitySets[locale],
    copy: copyByLocale[locale],
  };
}
