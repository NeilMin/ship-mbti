import type { AppCopy, Locale } from "../lib/types";

export const copyByLocale: Record<Locale, AppCopy> = {
  zh: {
    heroKicker: "Programmer Personality Test",
    heroTitle: "程序员人格测试",
    heroSubtitle: "一个有趣的程序员人格测试。",
    heroNote:
      "从 AI 依赖、架构洁癖、排错玄学，到你到底是技术理想主义者还是准点下班派，这套测试会给你一个很像真的答案。",
    startButton: "开始测试",
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
      description: "长描述",
      strengths: "核心优势",
      risks: "致命风险",
      environment: "适宜环境",
      lifestyle: "生活与社交侧写",
    },
    resultButtons: {
      saveImage: "保存结果图",
      generatingImage: "生成中...",
      restart: "重新测试",
    },
    share: {
      kicker: "Programmer Personality Test",
      cta: "你也来测测你的程序员人格",
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
