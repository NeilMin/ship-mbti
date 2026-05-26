import { afterEach, describe, expect, it } from "vitest";
import { loadSessionState, saveSessionState } from "./storage";

const STORAGE_KEY = "ship-mbti-session";

describe("session storage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("round-trips a valid session", () => {
    saveSessionState({
      screen: "questions",
      currentIndex: 3,
      answers: { S1: 1, H2: 7 },
    });

    expect(loadSessionState()).toEqual({
      screen: "questions",
      currentIndex: 3,
      answers: { S1: 1, H2: 7 },
    });
  });

  it("persists a schema version alongside the state", () => {
    saveSessionState({ screen: "intro", currentIndex: 0, answers: {} });

    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(raw.version).toBe(1);
  });

  it("returns null for malformed JSON", () => {
    localStorage.setItem(STORAGE_KEY, "{not json");
    expect(loadSessionState()).toBeNull();
  });

  it("rejects a session written under a different schema version", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 0, screen: "questions", currentIndex: 1, answers: {} })
    );
    expect(loadSessionState()).toBeNull();
  });

  it("rejects an unknown screen", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, screen: "bogus", currentIndex: 0, answers: {} })
    );
    expect(loadSessionState()).toBeNull();
  });

  it("drops out-of-range answer values but keeps valid ones", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        screen: "questions",
        currentIndex: 2,
        answers: { S1: 1, S2: 9, S3: "x", S4: 4 },
      })
    );

    expect(loadSessionState()).toEqual({
      screen: "questions",
      currentIndex: 2,
      answers: { S1: 1, S4: 4 },
    });
  });
});
