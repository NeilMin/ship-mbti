import type { AppCopy, Locale } from "../lib/types";

export const copyByLocale: Record<Locale, AppCopy> = {
  zh: {
    heroKicker: "Programmer Personality Test",
    heroTitle: "程序员人格测试",
    heroSubtitle: "20 道题，鉴定你是哪一种码农。准到你想举报。",
    heroNote:
      "AI 依赖、架构洁癖、排错玄学、上班动机——四个维度交叉出 16 种码农。测完拿到你的行为观察报告、你的天敌，和你的灵魂搭子。",
    startButton: "开始鉴定",
    languageLabel: "语言",
    questionLabel: "问题",
    scaleLabels: {
      strongAgree: "强烈同意",
      agree: "同意",
      slightlyAgree: "稍微同意",
      neutral: "中立",
      slightlyDisagree: "稍微反对",
      disagree: "反对",
      strongDisagree: "强烈反对",
    },
    backButton: "上一题",
    resultSections: {
      description: "行为观察报告",
      strengths: "公司还留着你的理由",
      risks: "迟早要出的事故",
      environment: "适合关押你的地方",
      lifestyle: "下班后目击报告",
      nemesis: "天敌",
      soulmate: "灵魂搭子",
    },
    resultButtons: {
      saveImage: "保存海报",
      generatingImage: "生成中...",
      restart: "再测一次",
    },
    share: {
      kicker: "Programmer Personality Test",
      cta: "扫码鉴定你是哪种码农",
      visit: "Visit",
    },
  },
  en: {
    heroKicker: "Programmer Personality Test",
    heroTitle: "Programmer Personality Test",
    heroSubtitle: "A fun personality test for programmers.",
    heroNote:
      "From AI dependence and architecture overthinking to debugging superstition and after-hours motivation, this test gives you an answer that feels suspiciously real.",
    startButton: "Start Test",
    languageLabel: "Language",
    questionLabel: "Question",
    scaleLabels: {
      strongAgree: "Strongly Agree",
      agree: "Agree",
      slightlyAgree: "Slightly Agree",
      neutral: "Neutral",
      slightlyDisagree: "Slightly Disagree",
      disagree: "Disagree",
      strongDisagree: "Strongly Disagree",
    },
    backButton: "Previous",
    resultSections: {
      description: "Overview",
      strengths: "Strengths",
      risks: "Risks",
      environment: "Best Environment",
      lifestyle: "Lifestyle & Social Profile",
      nemesis: "Nemesis",
      soulmate: "Soulmate",
    },
    resultButtons: {
      saveImage: "Save Result Poster",
      generatingImage: "Rendering...",
      restart: "Retake Test",
    },
    share: {
      kicker: "Programmer Personality Test",
      cta: "Take the test and see which kind of programmer you are.",
      visit: "Visit",
    },
  },
};
