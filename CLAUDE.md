# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A pure-frontend, static bilingual (zh/en) "programmer personality test". No backend, no router, no state library, no API. Screen flow (intro → questions → result) is React state in `src/app/App.tsx`; the only persisted URL state is `?result=CODE`. Deploys to GitHub Pages on push to `main`. See `README.md` for the full product rationale and scoring write-up.

## Commands

```bash
npm run dev            # Vite dev server
npm run build          # Production build to dist/ (vite build only — does NOT typecheck)
npm run lint           # ESLint (flat config; react-hooks rules-of-hooks is an error)
npm run typecheck      # tsc --noEmit (build does not typecheck, so run this separately)
npm run test           # Run all tests once (vitest run)
npm run test:watch     # Vitest watch mode

# Single test file / single test by name
npm run test -- src/lib/scoring.test.ts
npx vitest run -t "maps the seven-point scale"

# Python character-art pipeline tests (needs Pillow installed)
cd scripts && python -m unittest test_split_character_sheet
```

CI (`.github/workflows/deploy.yml`) gates deploy on `lint` → `typecheck` → `test` → `build`, all on Node 20. Note: on Node 22+ jsdom's `window.localStorage` is absent, so `src/test/setup.ts` installs an in-memory shim to keep the suite runnable locally.

## Architecture: the load-bearing pieces

The result of the test is a 4-letter `ResultCode` (e.g. `CAPW`), one pole per dimension: **S**ource(C/T) **H**ierarchy(O/A) **I**nvestigation(L/P) **P**urpose(G/W). All 16 codes are enumerated in `src/lib/types.ts` and must each have a `Personality` entry in both `personalities.ts` (zh) and `personalities.en.ts`.

**Locale is a content swap over one shared engine.** `getAppContent(locale)` in `src/data/content.ts` is the single entry point; it bundles locale-specific `questions`, `dimensions`, `personalities`, and `copy`. `App.tsx` always passes `content.questions` / `content.personalities` into the scoring functions. Locale changes copy and data only — it never changes result-code structure, scoring math, or the `?result=` URL format. Keep zh and en question sets structurally parallel (same ids, dimensions, agreement poles), because scoring runs against whichever set the active locale supplies.

**Scoring defaults are a trap.** `calculateDimensionScore` / `calculateResultParts` / `calculateAssessmentResult` in `src/lib/scoring.ts` default to the `questions`/`personalities` re-exports, which are the **zh** sets (`src/data/questions.ts` → `questionSets.zh`). App code overrides these with the locale set, so the defaults mostly matter only in tests. Don't rely on the defaults in app paths.

**The `R` → `P` pole quirk.** Internally the Investigation right pole is `ScorePole "R"`, but the public/result letter is `P`. `toPublicPole()` does this mapping (`R` → `P`). When editing scoring or questions, an Investigation `agreementPole` of `"R"` surfaces as `P` in codes and bars. Don't "fix" this by renaming `R` to `P` in the internal types — `P` is already taken by the Purpose dimension key.

**Per-dimension math:** 5 questions/dimension, 7-point Likert mapped `1→+3 … 7→-3`, sign-inverted when agreement points to the right pole, summed to `rawScore` in `[-15,+15]`. `rawScore >= 0` → left pole wins. Bars: `leftPercent = round(((rawScore+15)/30)*100)`. `getAssessmentResultByCode` (used for shared `?result=` links) fabricates `rawScore = ±9` since it only has the code, not the answers.

**Analytics (`src/utils/analytics.ts`) is gated.** It initializes only when `import.meta.env.PROD` is true AND `VITE_GA_MEASUREMENT_ID` is set, so events are silent in dev/test. GA4 funnel events fire from `App.tsx` effects/handlers (`start_quiz`, `quiz_progress`, `view_personality_result`, etc.) with dedupe keys to avoid double-counting.

## Editing the test safely

1. Edit locale data in `src/data/*` (questions, dimensions, personalities, copy). Keep zh/en parallel.
2. Treat `ResultCode` values as the domain model — changing them means updating `types.ts`, both personality sets, tests, and shared-link semantics together, not a copy edit.
3. Run `npm run test` and `npm run build` before considering a change done.

Key tests to keep green: `src/lib/scoring.test.ts`, `src/components/App.test.tsx` (critical user flow), `src/components/LikertScale.test.tsx`, `src/components/ResultAssets.test.tsx`.

## Share poster & character art

The exportable poster (`src/components/ShareCard.tsx`) is a separate vertical artifact mounted only on export (via `html-to-image`), not a persistent preview. Its QR code points to the homepage, not the specific result — deliberate, so shares pull in new testers. Character PNGs in `public/characters/` are produced by the Python pipeline in `scripts/` (split AI-generated sheets in `artwork/` → named transparent PNGs → composed hero image); `src/lib/characterImages.ts` maps result codes to assets.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml` (build → GitHub Pages). Vite `base` is `/` because the app lives on its own subdomain (`mbti.neilmin.com`), so use root-relative asset paths. `dist/` is the build output.
