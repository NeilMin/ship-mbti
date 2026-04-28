import type { DimensionDefinition } from "../lib/types";

export const dimensionsEn: DimensionDefinition[] = [
  {
    id: "S",
    name: "Source",
    label: "Code Source",
    description: "Whether you trust AI and generated scaffolding more, or your own hands on the keyboard.",
    leftPole: {
      code: "C",
      label: "Copilot",
      shortLabel: "Copilot",
    },
    rightPole: {
      code: "T",
      label: "Typecraft",
      shortLabel: "Typecraft",
    },
  },
  {
    id: "H",
    name: "Hierarchy",
    label: "Architecture Taste",
    description: "Whether you naturally think in future systems, or prefer a version that can survive this week first.",
    leftPole: {
      code: "O",
      label: "Overdesign",
      shortLabel: "Overdesign",
    },
    rightPole: {
      code: "A",
      label: "ASAP",
      shortLabel: "ASAP",
    },
  },
  {
    id: "I",
    name: "Investigation",
    label: "Debug Mysticism",
    description: "Whether you debug through logs and source tracing, or through restarts, trial and error, and quiet prayer.",
    leftPole: {
      code: "L",
      label: "Logic",
      shortLabel: "Logic",
    },
    rightPole: {
      code: "P",
      label: "Pray",
      shortLabel: "Pray",
    },
  },
  {
    id: "P",
    name: "Purpose",
    label: "Work Motivation",
    description: "Whether you are driven by technical fascination, or by survival inside the North American tech labor market.",
    leftPole: {
      code: "G",
      label: "Geek",
      shortLabel: "Geek",
    },
    rightPole: {
      code: "W",
      label: "Worker",
      shortLabel: "Worker",
    },
  },
];
