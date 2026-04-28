import type { AnswerMap, Locale } from "./types";

const STORAGE_KEY = "ship-mbti-session";
const LOCALE_KEY = "ship-mbti-locale";

export interface SessionState {
  screen: "intro" | "questions" | "result";
  currentIndex: number;
  answers: AnswerMap;
}

export function loadSessionState(): SessionState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as SessionState;
  } catch {
    return null;
  }
}

export function saveSessionState(value: SessionState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function clearSessionState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function loadLocale(): Locale {
  if (typeof window === "undefined") {
    return "zh";
  }

  return window.localStorage.getItem(LOCALE_KEY) === "en" ? "en" : "zh";
}

export function saveLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCALE_KEY, locale);
}
