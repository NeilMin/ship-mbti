import type { AnswerMap, Locale, LikertValue } from "./types";

const STORAGE_KEY = "ship-mbti-session";
const LOCALE_KEY = "ship-mbti-locale";
const SESSION_VERSION = 1;

const VALID_SCREENS = new Set<SessionState["screen"]>(["intro", "questions", "result"]);

export interface SessionState {
  screen: "intro" | "questions" | "result";
  currentIndex: number;
  answers: AnswerMap;
}

function isLikertValue(value: unknown): value is LikertValue {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 7
  );
}

function parseSession(raw: string): SessionState | null {
  let data: unknown;

  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }

  if (typeof data !== "object" || data === null) {
    return null;
  }

  const record = data as Record<string, unknown>;

  if (record.version !== SESSION_VERSION) {
    return null;
  }

  const { screen, currentIndex, answers } = record;

  if (typeof screen !== "string" || !VALID_SCREENS.has(screen as SessionState["screen"])) {
    return null;
  }

  if (typeof currentIndex !== "number" || !Number.isInteger(currentIndex) || currentIndex < 0) {
    return null;
  }

  if (typeof answers !== "object" || answers === null) {
    return null;
  }

  const validatedAnswers: AnswerMap = {};
  for (const [key, value] of Object.entries(answers as Record<string, unknown>)) {
    if (isLikertValue(value)) {
      validatedAnswers[key] = value;
    }
  }

  return {
    screen: screen as SessionState["screen"],
    currentIndex,
    answers: validatedAnswers,
  };
}

export function loadSessionState(): SessionState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  return parseSession(raw);
}

export function saveSessionState(value: SessionState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: SESSION_VERSION, ...value })
  );
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
