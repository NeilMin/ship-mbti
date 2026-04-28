# SHIP MBTI

A serious-looking, meme-heavy programmer personality test for the North American Chinese tech context.

Live site: [https://mbti.neilmin.com/](https://mbti.neilmin.com/)

This project is intentionally built as a pure frontend static app:

- no backend
- no database
- no auth
- no server-side rendering

Everything runs in the browser and deploys to GitHub Pages for zero hosting cost.

## What This Project Is

This is not a clinical personality test, and it does not attempt to imitate MBTI theory itself.

Instead, it uses a custom framework called `SHIP` to measure software-engineer work style across four satirical but behavior-based dimensions:

- `S = Source`
  - `C` = Copilot
  - `T` = Typecraft
- `H = Hierarchy`
  - `O` = Overdesign
  - `A` = ASAP
- `I = Investigation`
  - `L` = Logic
  - `P` = Pray
- `P = Purpose`
  - `G` = Geek
  - `W` = Worker

The result is a four-letter code like `CAPW` plus a long-form persona writeup.

## Product Constraints We Optimized For

These constraints drove most of the engineering decisions:

- The UI should feel polished and professional, closer to a serious assessment product than a joke page.
- The content should still be funny, specific, and recognizable to programmers.
- The app should work well as a single static site on GitHub Pages.
- The result should be easy to share as an image on mobile-first social platforms.
- Chinese and English should share one scoring engine and one result-code system, but the English copy should not be forced into literal translation.

## Stack

- React 19
- TypeScript
- Vite
- Vitest + Testing Library
- `html-to-image` for poster export
- `qrcode.react` for share QR codes
- GitHub Pages Actions for deployment

## Why The Architecture Is Simple

This repo deliberately avoids several things that would be common in a larger app:

- No React Router
- No i18n framework
- No state library
- No API layer
- No CMS

Those were explicit tradeoffs, not omissions.

### Why no React Router

Version 1 is effectively a single-flow assessment app:

- intro
- questions
- result

We keep screen transitions in React state rather than route transitions. This avoids GitHub Pages SPA deep-link headaches and keeps deployment trivial.

The only URL state we preserve is `?result=CODE`, so a shared result can open directly to a result screen.

### Why no i18n framework

The app only needs two locales, and the copy is highly opinionated. A generic translation framework would add indirection without buying much.

Instead, we use:

- a lightweight `locale: "zh" | "en"` app state
- locale-specific data files
- a single `getAppContent(locale)` entry point

This keeps all content explicit and easy for humans or AI tools to edit.

### Why no backend

The app does not need persistent accounts or analytics-backed scoring. The state is:

- current screen
- current question index
- current answers
- current locale

That all fits naturally in browser memory + `localStorage`.

## High-Level Architecture

The app is split into four layers:

### 1. App Flow Layer

File:

- `src/app/App.tsx`

Responsibilities:

- owns the active screen state
- owns locale state
- restores saved session state
- restores shared result code from URL
- passes locale-specific content into presentation components
- computes the final result using the shared scoring engine

This is the orchestration layer. It should stay small and mostly declarative.

### 2. Data Layer

Files:

- `src/data/questions.zh.ts`
- `src/data/questions.en.ts`
- `src/data/dimensions.zh.ts`
- `src/data/dimensions.en.ts`
- `src/data/personalities.ts`
- `src/data/personalities.en.ts`
- `src/data/copy.ts`
- `src/data/content.ts`

Responsibilities:

- holds all copy and test data
- keeps Chinese and English content separated
- exposes a single locale-aware content bundle via `getAppContent(locale)`

Important decision:

- the two languages share the same result codes and scoring structure
- they do not need to share the exact same sentence structure or tone

That means English content can be written naturally instead of mirroring the Chinese line by line.

### 3. Domain / Logic Layer

Files:

- `src/lib/scoring.ts`
- `src/lib/types.ts`
- `src/lib/storage.ts`
- `src/lib/urlState.ts`
- `src/lib/share.ts`
- `src/lib/characterImages.ts`

Responsibilities:

- score Likert answers into SHIP dimensions
- produce result codes and percentages
- serialize browser session state
- manage `?result=CODE`
- centralize share URL constants
- map result codes to character image assets

This layer is intentionally framework-light and mostly pure functions.

### 4. Presentation Layer

Files:

- `src/components/IntroScreen.tsx`
- `src/components/QuestionScreen.tsx`
- `src/components/LikertScale.tsx`
- `src/components/ResultScreen.tsx`
- `src/components/ResultBars.tsx`
- `src/components/ShareCard.tsx`
- `src/components/LocaleToggle.tsx`
- `src/components/ProgressHeader.tsx`

Responsibilities:

- render the assessment UI
- keep layout stable across languages
- generate the exportable vertical result poster

The presentation layer is intentionally dumb: locale-aware strings and structured data are passed in from above.

## Project Structure

```text
src/
  app/
    App.tsx
    app.css
  components/
    IntroScreen.tsx
    QuestionScreen.tsx
    LikertScale.tsx
    ResultScreen.tsx
    ResultBars.tsx
    ShareCard.tsx
    LocaleToggle.tsx
    ...
  data/
    copy.ts
    content.ts
    questions.ts
    questions.zh.ts
    questions.en.ts
    dimensions.ts
    dimensions.zh.ts
    dimensions.en.ts
    personalities.ts
    personalities.en.ts
  lib/
    scoring.ts
    storage.ts
    urlState.ts
    share.ts
    characterImages.ts
    types.ts
  test/
    setup.ts

public/
  characters/
  hero/

scripts/
  split_character_sheet.py
  test_split_character_sheet.py
  generate_intro_cast.py
```

## Scoring Algorithm

The scoring model is intentionally simple and transparent.

### Input Model

Each question:

- belongs to exactly one dimension: `S`, `H`, `I`, or `P`
- uses a 7-point Likert scale
- defines which pole agreement supports

Example idea:

- agreeing with a question may push toward `C`
- disagreeing with the same question pushes toward `T`

### Likert Weight Mapping

The scale is converted to numeric weights:

```text
1 -> +3
2 -> +2
3 -> +1
4 ->  0
5 -> -1
6 -> -2
7 -> -3
```

This gives directional intensity without overcomplicating the math.

### Per-Dimension Score

For a given dimension:

1. collect the 5 questions in that dimension
2. convert each answer to a Likert weight
3. apply orientation:
   - if agreement points to the left pole, use the weight as-is
   - if agreement points to the right pole, invert the sign
4. sum the weighted values into a dimension `rawScore`

In code, this lives in:

- `calculateDimensionScore()` in `src/lib/scoring.ts`

### Result Code

After all four dimension scores are computed:

- non-negative score -> left pole wins
- negative score -> right pole wins

That yields one pole per dimension, which becomes the 4-letter result code:

```text
Source + Hierarchy + Investigation + Purpose
```

Example:

- `C`
- `A`
- `P`
- `W`

becomes:

- `CAPW`

### Percentage Bars

The app also shows a percentage split for each dimension.

Because each dimension has 5 questions and each question contributes between `-3` and `+3`, the theoretical raw score range is:

```text
-15 to +15
```

We map that to percentages with:

```text
leftPercent = round(((rawScore + 15) / 30) * 100)
rightPercent = 100 - leftPercent
```

This is not a psychometric claim. It is a UI-friendly way to express directional strength consistently.

### Why We Chose This Algorithm

We intentionally did **not** use a nearest-neighbor or Manhattan-distance personality matching system.

Reasons:

- the product has exactly 4 binary dimensions, so a direct 4-letter composition is more natural
- the logic is easier to explain, test, and maintain
- it matches the UI expectation of dimension bars better
- it avoids the "mysterious black box" feel of vector matching

This repo favors transparency over fake complexity.

## Locale Model

The bilingual implementation uses one scoring engine and one set of result codes, but two content layers.

Locale is stored in:

- React state while the app is open
- `localStorage` via `src/lib/storage.ts`

The active locale selects:

- UI copy
- dimension labels
- questions
- personalities
- share poster text

The active locale does **not** change:

- result code structure
- scoring math
- URL result format

That split is intentional. It keeps the behavioral model stable while allowing each language to feel native.

## Session, URL State, and Sharing

### Session persistence

The app stores in-progress work in `localStorage`:

- current screen
- current question index
- answer map
- selected locale

This allows refresh-safe continuation without needing a backend.

### Shared result URL

The app uses `?result=CODE`.

Examples:

- `/?result=CAPW`
- `/?result=TOLG`

If a valid result code is present, the app opens directly to the result screen.

Important behavior:

- the shared link is only for viewing a result
- the QR code in the exported poster points to the homepage, not a specific result

That was a deliberate product choice: the poster should pull new people into the test, not just replay the sharer's output.

## Share Poster Design

The exported poster is intentionally different from the main result page.

Main result page:

- optimized for reading
- full report layout

Share poster:

- optimized for mobile sharing
- vertical poster format
- generated only when the user clicks export

The poster includes:

- result code
- title
- quote
- character illustration
- four dimension summaries
- long description
- lifestyle/social profile
- QR code
- site URL

Important implementation choice:

- we do **not** permanently render a visible poster preview below the page
- we mount the exportable poster only when needed for image generation

This keeps the result page clean while still exporting a full asset.

## Character Illustration Pipeline

The project uses AI-generated mascot sheets, then post-processes them locally.

### Why this pipeline exists

Generating 16 character illustrations one by one is expensive and inconsistent.

Instead, we:

1. generate character sheets in a shared illustration style
2. cut them into individual transparent PNGs
3. compose special-purpose assets like the homepage cast image from those cutouts

### Scripts

- `scripts/split_character_sheet.py`
  - splits raw character sheets into named transparent PNGs
- `scripts/test_split_character_sheet.py`
  - verifies the splitter logic
- `scripts/generate_intro_cast.py`
  - creates the homepage hero image from selected character assets

### Asset locations

- raw sheets: `artwork/character-sheets/`
- cut characters: `public/characters/`
- homepage group image: `public/hero/intro-cast.png`

This pipeline makes it easy to regenerate assets later without rewriting app code.

## UI Decisions Worth Preserving

These were explicit design decisions, not incidental implementation details:

- The app should feel closer to a serious assessment tool than to a meme generator.
- The content gets sharper as the user goes deeper; the homepage stays relatively broad.
- The 7-point horizontal Likert scale is core to the experience.
- Answering a question auto-advances to the next one.
- Users can still go back and edit prior answers.
- The result page is the full report.
- The exported poster is a separate, mobile-first artifact.
- The homepage hero uses a precomposed image, not four individually positioned floating character nodes.

If you redesign the app later, preserve those decisions unless there is a strong product reason not to.

## Running Locally

```bash
npm install
npm run dev
```

### Tests

```bash
npm run test -- --run
```

### Production build

```bash
npm run build
```

## Deployment

This repo deploys directly to GitHub Pages through:

- `.github/workflows/deploy.yml`

Build output:

- `dist/`

Vite base:

- `/`

Custom domain:

- `mbti.neilmin.com`

Because the app lives on its own subdomain, we can use root-relative asset paths without subpath hacks.

## If You Need To Change The Test

The safest order is:

1. edit locale-specific data in `src/data/*`
2. keep `ResultCode` values stable unless you are intentionally changing the result model
3. update or add tests in:
   - `src/lib/scoring.test.ts`
   - `src/components/App.test.tsx`
   - component-specific tests if needed
4. run:
   - `npm run test -- --run`
   - `npm run build`

If you change the result code structure, you are no longer making a copy edit. You are changing the domain model.

## If You Are An AI Coding Tool Reading This Repo

Start here:

1. `src/app/App.tsx`
2. `src/data/content.ts`
3. `src/lib/scoring.ts`
4. `src/components/ResultScreen.tsx`
5. `src/components/ShareCard.tsx`

Then inspect:

- `src/lib/types.ts` for the data model
- `src/lib/storage.ts` and `src/lib/urlState.ts` for browser persistence
- `src/components/App.test.tsx` for the critical user flow

The biggest maintenance traps are:

- accidentally breaking the bilingual content wiring
- reintroducing route complexity that GitHub Pages does not need
- changing result code semantics without updating data, tests, and shared URLs consistently
- turning a deliberately simple scoring model into unnecessary abstraction
