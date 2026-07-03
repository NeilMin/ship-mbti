import type { Question } from "../lib/types";

export const questionsEn: Question[] = [
  {
    id: "S1",
    dimension: "S",
    kind: "scenario",
    prompt:
      "When work lands on my desk Friday afternoon, I toss it to AI first and see what comes back.",
    agreementPole: "C",
    disagreementPole: "T",
  },
  {
    id: "S2",
    dimension: "S",
    kind: "scenario",
    prompt:
      "Not just code — where to eat, how to travel: I ask AI for a plan first.",
    agreementPole: "C",
    disagreementPole: "T",
  },
  {
    id: "S3",
    dimension: "S",
    kind: "scenario",
    prompt:
      "Assembling furniture or fixing small appliances, I enjoy doing it with my own hands.",
    agreementPole: "T",
    disagreementPole: "C",
  },
  {
    id: "S4",
    dimension: "S",
    kind: "scenario",
    prompt:
      "When a reviewer pushes back, I paste the comment into AI and ask for a comeback.",
    agreementPole: "C",
    disagreementPole: "T",
  },
  {
    id: "S5",
    dimension: "S",
    kind: "attitude",
    prompt:
      "If AI wrote the core logic, I can't ship it until I've rewritten it by hand.",
    agreementPole: "T",
    disagreementPole: "C",
  },
  {
    id: "H1",
    dimension: "H",
    kind: "scenario",
    prompt:
      "When I travel, I build an hour-by-hour itinerary — with a Plan B.",
    agreementPole: "O",
    disagreementPole: "A",
  },
  {
    id: "H2",
    dimension: "H",
    kind: "scenario",
    prompt:
      "It's just CRUD, but I'm already planning how it becomes a platform.",
    agreementPole: "O",
    disagreementPole: "A",
  },
  {
    id: "H3",
    dimension: "H",
    kind: "scenario",
    prompt:
      "The feature isn't approved yet, and I'm already worried about scaling it three years out.",
    agreementPole: "O",
    disagreementPole: "A",
  },
  {
    id: "H4",
    dimension: "H",
    kind: "scenario",
    prompt:
      "If it can ship tonight and survive the week, it's a good version.",
    agreementPole: "A",
    disagreementPole: "O",
  },
  {
    id: "H5",
    dimension: "H",
    kind: "attitude",
    prompt:
      "No itineraries for me: book the flight, figure it out after landing.",
    agreementPole: "A",
    disagreementPole: "O",
  },
  {
    id: "I1",
    dimension: "I",
    kind: "scenario",
    prompt:
      "When prod breaks, I go straight to logs and recent diffs — never a blind restart.",
    agreementPole: "L",
    disagreementPole: "R",
  },
  {
    id: "I2",
    dimension: "I",
    kind: "scenario",
    prompt:
      "For a bug I can't reproduce, I'll write a scheduled-restart script as a stopgap.",
    agreementPole: "R",
    disagreementPole: "L",
  },
  {
    id: "I3",
    dimension: "I",
    kind: "scenario",
    prompt:
      "Works locally, explodes in prod — my first move is console.log everywhere.",
    agreementPole: "R",
    disagreementPole: "L",
  },
  {
    id: "I4",
    dimension: "I",
    kind: "attitude",
    prompt: "Weird noise in the car? Turn the music up.",
    agreementPole: "R",
    disagreementPole: "L",
  },
  {
    id: "I5",
    dimension: "I",
    kind: "attitude",
    prompt:
      "If I don't know why it broke and why the fix works, I can't call it a day.",
    agreementPole: "L",
    disagreementPole: "R",
  },
  {
    id: "P1",
    dimension: "P",
    kind: "attitude",
    prompt:
      "No perf credit, no pay — I'd still build things for fun on weekends.",
    agreementPole: "G",
    disagreementPole: "W",
  },
  {
    id: "P2",
    dimension: "P",
    kind: "scenario",
    prompt:
      "NAS, home router, smart home — my homelab gets more of me than my job does.",
    agreementPole: "G",
    disagreementPole: "W",
  },
  {
    id: "P3",
    dimension: "P",
    kind: "attitude",
    prompt:
      "What keeps me working isn't passion. It's perf, promo, and PIP.",
    agreementPole: "W",
    disagreementPole: "G",
  },
  {
    id: "P4",
    dimension: "P",
    kind: "attitude",
    prompt:
      "Visa and layoff pressure genuinely shape which risks I take.",
    agreementPole: "W",
    disagreementPole: "G",
  },
  {
    id: "P5",
    dimension: "P",
    kind: "attitude",
    prompt:
      "Two hours in line at a new restaurant beats one more look at code.",
    agreementPole: "W",
    disagreementPole: "G",
  },
];
