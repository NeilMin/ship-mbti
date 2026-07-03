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

const MIRROR: Record<string, string> = {
  C: "T",
  T: "C",
  O: "A",
  A: "O",
  L: "P",
  P: "L",
  G: "W",
  W: "G",
};

describe("personality social hooks", () => {
  for (const [locale, set] of Object.entries(locales)) {
    it(`${locale} gives every personality a subtitle`, () => {
      for (const item of set) {
        expect(item.subtitle.trim().length, item.code).toBeGreaterThan(0);
      }
    });

    it(`${locale} points nemesis at the four-letter mirror type`, () => {
      for (const item of set) {
        const mirror = item.code
          .split("")
          .map((letter) => MIRROR[letter])
          .join("");
        expect(item.nemesis.code, item.code).toBe(mirror);
        expect(item.nemesis.note.trim().length, item.code).toBeGreaterThan(0);
      }
    });

    it(`${locale} keeps soulmate pairs symmetric and not self`, () => {
      const byCode = new Map(set.map((item) => [item.code, item]));
      for (const item of set) {
        expect(item.soulmate.code, item.code).not.toBe(item.code);
        const partner = byCode.get(item.soulmate.code);
        expect(partner, item.soulmate.code).toBeDefined();
        expect(partner?.soulmate.code, item.code).toBe(item.code);
        expect(item.soulmate.note.trim().length, item.code).toBeGreaterThan(0);
      }
    });
  }
});
