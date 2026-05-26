import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { RESULT_CODES } from "../lib/resultCodes";
import { getCharacterImageSrc } from "../lib/characterImages";
import { personalitiesEn } from "./personalities.en";
import { personalitiesZh } from "./personalities";

const locales = {
  zh: personalitiesZh,
  en: personalitiesEn,
};

describe("personality completeness", () => {
  for (const [locale, set] of Object.entries(locales)) {
    it(`${locale} defines exactly one personality per result code`, () => {
      const codes = set.map((item) => item.code).sort();
      expect(codes).toEqual([...RESULT_CODES].sort());
      expect(new Set(codes).size).toBe(RESULT_CODES.length);
    });
  }

  it("ships a character image for every result code", () => {
    for (const code of RESULT_CODES) {
      const src = getCharacterImageSrc(code).replace(/^\//, "");
      const file = resolve(process.cwd(), "public", src);
      expect(existsSync(file), `missing image for ${code}: ${file}`).toBe(true);
    }
  });
});
