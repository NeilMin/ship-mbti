import type { Locale, Question } from "../lib/types";
import { questionsEn } from "./questions.en";
import { questionsZh } from "./questions.zh";

export const likertScale = [
  { value: 1, label: "Strongly Agree" },
  { value: 2, label: "Agree" },
  { value: 3, label: "Slightly Agree" },
  { value: 4, label: "Neutral" },
  { value: 5, label: "Slightly Disagree" },
  { value: 6, label: "Disagree" },
  { value: 7, label: "Strongly Disagree" },
] as const;

export const questionSets: Record<Locale, Question[]> = {
  zh: questionsZh,
  en: questionsEn,
};

export const questions = questionSets.zh;
