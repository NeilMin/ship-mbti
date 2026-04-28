import type { Question } from "../lib/types";

export const questionsEn: Question[] = [
  {
    id: "S1",
    dimension: "S",
    kind: "scenario",
    prompt:
      "When Friday-night grunt work lands on my desk, my first instinct is to let AI like Gemini, Claude, or Copilot spit out a shippable skeleton.",
    agreementPole: "C",
    disagreementPole: "T",
  },
  {
    id: "S2",
    dimension: "S",
    kind: "scenario",
    prompt:
      "When I inherit an unfamiliar task, I would rather ask AI for an 80%-correct scaffold than start by reading docs and old code.",
    agreementPole: "C",
    disagreementPole: "T",
  },
  {
    id: "S3",
    dimension: "S",
    kind: "scenario",
    prompt:
      "When the work is pure boilerplate, I would rather spend time refining a prompt than dirty my own hands typing the same thing again.",
    agreementPole: "C",
    disagreementPole: "T",
  },
  {
    id: "S4",
    dimension: "S",
    kind: "scenario",
    prompt:
      "When a reviewer leaves a nasty CL or PR comment, I am more likely to throw it into a model and ask for comeback language than re-derive the logic myself.",
    agreementPole: "C",
    disagreementPole: "T",
  },
  {
    id: "S5",
    dimension: "S",
    kind: "attitude",
    prompt:
      "Even when AI-generated code already passes tests, I still want to rewrite the core logic by hand or I do not trust it.",
    agreementPole: "T",
    disagreementPole: "C",
  },
  {
    id: "H1",
    dimension: "H",
    kind: "scenario",
    prompt:
      "Even for a tiny internal tool, my brain immediately jumps to decoupling, layering, and future extensibility.",
    agreementPole: "O",
    disagreementPole: "A",
  },
  {
    id: "H2",
    dimension: "H",
    kind: "scenario",
    prompt:
      "Even when something is just CRUD, I still feel the urge to turn it into a platform-level reusable service.",
    agreementPole: "O",
    disagreementPole: "A",
  },
  {
    id: "H3",
    dimension: "H",
    kind: "scenario",
    prompt:
      "Before the feature even lands, I am already thinking about scalability, backward compatibility, and HA.",
    agreementPole: "O",
    disagreementPole: "A",
  },
  {
    id: "H4",
    dimension: "H",
    kind: "scenario",
    prompt:
      "If it can survive the week and make it to prod tonight, I am perfectly willing to ship a tactical patch first.",
    agreementPole: "A",
    disagreementPole: "O",
  },
  {
    id: "H5",
    dimension: "H",
    kind: "attitude",
    prompt:
      "Rather than sit through more design reviews in the name of architecture purity, I would rather release now and clean up debt later.",
    agreementPole: "A",
    disagreementPole: "O",
  },
  {
    id: "I1",
    dimension: "I",
    kind: "scenario",
    prompt:
      "When production breaks, my first move is usually logs, traces, and recent diffs, not a lucky restart.",
    agreementPole: "L",
    disagreementPole: "R",
  },
  {
    id: "I2",
    dimension: "I",
    kind: "scenario",
    prompt:
      "When a bug is nearly impossible to reproduce, I would rather add a defensive restart script than die on the hill of root cause analysis.",
    agreementPole: "R",
    disagreementPole: "L",
  },
  {
    id: "I3",
    dimension: "I",
    kind: "scenario",
    prompt:
      "If everything works locally but production explodes, I usually start by sprinkling print statements or console logs everywhere before reading source.",
    agreementPole: "R",
    disagreementPole: "L",
  },
  {
    id: "I4",
    dimension: "I",
    kind: "attitude",
    prompt:
      "If the service is back up, I can live with not understanding the full root cause of this incident yet.",
    agreementPole: "R",
    disagreementPole: "L",
  },
  {
    id: "I5",
    dimension: "I",
    kind: "attitude",
    prompt:
      "If I do not understand why something broke and why the fix works, I am not really done for the day.",
    agreementPole: "L",
    disagreementPole: "R",
  },
  {
    id: "P1",
    dimension: "P",
    kind: "attitude",
    prompt:
      "Even without perf credit or bonus money, I would still spend weekends building side projects, tools, or weird technical ideas.",
    agreementPole: "G",
    disagreementPole: "W",
  },
  {
    id: "P2",
    dimension: "P",
    kind: "scenario",
    prompt:
      "If my company runs a hackathon, a 20% project, or a new-model pilot, I would genuinely want in rather than just perform enthusiasm.",
    agreementPole: "G",
    disagreementPole: "W",
  },
  {
    id: "P3",
    dimension: "P",
    kind: "attitude",
    prompt:
      "Thoughts of perf review, promo, or getting PIPed motivate me more consistently than the technology itself.",
    agreementPole: "W",
    disagreementPole: "G",
  },
  {
    id: "P4",
    dimension: "P",
    kind: "attitude",
    prompt:
      "H1B, PERM, or layoff pressure materially shapes the kinds of jobs and risks I am willing to take.",
    agreementPole: "W",
    disagreementPole: "G",
  },
  {
    id: "P5",
    dimension: "P",
    kind: "attitude",
    prompt:
      "If I can log off on time, I usually do not volunteer to donate another evening of brainpower to my employer.",
    agreementPole: "W",
    disagreementPole: "G",
  },
];
