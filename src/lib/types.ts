export type Locale = "zh" | "en";
export type Dimension = "S" | "H" | "I" | "P";
export type SourcePole = "C" | "T";
export type HierarchyPole = "O" | "A";
export type InvestigationScorePole = "L" | "R";
export type InvestigationPublicPole = "L" | "P";
export type PurposePole = "G" | "W";
export type ScorePole =
  | SourcePole
  | HierarchyPole
  | InvestigationScorePole
  | PurposePole;
export type LikertValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ResultCode =
  | "COLG"
  | "COLW"
  | "COPG"
  | "COPW"
  | "CALG"
  | "CALW"
  | "CAPG"
  | "CAPW"
  | "TOLG"
  | "TOLW"
  | "TOPG"
  | "TOPW"
  | "TALG"
  | "TALW"
  | "TAPG"
  | "TAPW";

export interface Personality {
  code: ResultCode;
  group: string;
  title: string;
  quote: string;
  description: string;
  strengths: string;
  risks: string;
  lifestyle: string;
  environment: string;
}

export interface Question {
  id: string;
  dimension: Dimension;
  kind: "scenario" | "attitude";
  prompt: string;
  agreementPole: ScorePole;
  disagreementPole: ScorePole;
}

export interface DimensionDefinition {
  id: Dimension;
  name: string;
  label: string;
  description: string;
  leftPole: {
    code: string;
    label: string;
    shortLabel: string;
  };
  rightPole: {
    code: string;
    label: string;
    shortLabel: string;
  };
}

export type AnswerMap = Partial<Record<string, LikertValue>>;

export interface DimensionScore {
  dimension: Dimension;
  rawScore: number;
  leftPercent: number;
  rightPercent: number;
  winningPole: string;
  losingPole: string;
}

export interface ResultParts {
  source: SourcePole;
  hierarchy: HierarchyPole;
  investigation: InvestigationPublicPole;
  purpose: PurposePole;
}

export interface AssessmentResult {
  code: ResultCode;
  personality: Personality;
  dimensions: DimensionScore[];
}

export interface AppCopy {
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  heroNote: string;
  startButton: string;
  languageLabel: string;
  questionLabel: string;
  scaleLabels: {
    strongAgree: string;
    agree: string;
    slightlyAgree: string;
    neutral: string;
    slightlyDisagree: string;
    disagree: string;
    strongDisagree: string;
  };
  backButton: string;
  resultSections: {
    description: string;
    strengths: string;
    risks: string;
    environment: string;
    lifestyle: string;
  };
  resultButtons: {
    saveImage: string;
    generatingImage: string;
    restart: string;
  };
  share: {
    kicker: string;
    cta: string;
    visit: string;
  };
}

export interface AppContent {
  locale: Locale;
  questions: Question[];
  dimensions: DimensionDefinition[];
  personalities: Personality[];
  copy: AppCopy;
}
