import { describe, expect, it } from "vitest";
import {
  calculateDimensionScore,
  getAssessmentResultByCode,
  getLikertWeight,
  getResultCode,
} from "./scoring";

describe("getLikertWeight", () => {
  it("maps the seven-point scale to signed weights", () => {
    expect(getLikertWeight(1)).toBe(3);
    expect(getLikertWeight(4)).toBe(0);
    expect(getLikertWeight(7)).toBe(-3);
  });
});

describe("getResultCode", () => {
  it("uses P as the public letter for the Pray side", () => {
    expect(
      getResultCode({
        source: "C",
        hierarchy: "A",
        investigation: "P",
        purpose: "W",
      })
    ).toBe("CAPW");
  });
});

describe("calculateDimensionScore", () => {
  it("treats reverse-coded questions as weight toward the right-side pole", () => {
    expect(
      calculateDimensionScore("S", {
        S5: 1,
      }).winningPole
    ).toBe("T");
  });
});

describe("getAssessmentResultByCode", () => {
  it("hydrates a shareable result from a result code", () => {
    const result = getAssessmentResultByCode("CAPW");

    expect(result.code).toBe("CAPW");
    expect(result.personality.title).toContain("敏捷燃尽火化师");
    expect(result.dimensions.map((item) => item.winningPole)).toEqual([
      "C",
      "A",
      "P",
      "W",
    ]);
  });
});
