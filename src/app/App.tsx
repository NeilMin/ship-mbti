import { useEffect, useRef, useState } from "react";
import { getAppContent } from "../data/content";
import {
  calculateAssessmentResult,
  getAssessmentResultByCode,
} from "../lib/scoring";
import {
  clearSessionState,
  loadLocale,
  loadSessionState,
  saveLocale,
  saveSessionState,
} from "../lib/storage";
import {
  clearResultCodeFromUrl,
  getResultCodeFromUrl,
  replaceResultCodeInUrl,
} from "../lib/urlState";
import type { LikertValue, Locale, ResultCode } from "../lib/types";
import { IntroScreen } from "../components/IntroScreen";
import { QuestionScreen } from "../components/QuestionScreen";
import { ResultScreen } from "../components/ResultScreen";

type Screen = "intro" | "questions" | "result";

export function App() {
  const [locale, setLocale] = useState<Locale>(() => loadLocale());
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, LikertValue>>({});
  const [sharedResultCode, setSharedResultCode] = useState<ResultCode | null>(null);
  const hasRestoredRef = useRef(false);
  const content = getAppContent(locale);

  const currentQuestion = content.questions[currentIndex];

  useEffect(() => {
    if (hasRestoredRef.current) {
      return;
    }

    const resultCode = getResultCodeFromUrl();
    if (resultCode) {
      setSharedResultCode(resultCode);
      setScreen("result");
      hasRestoredRef.current = true;
      return;
    }

    const saved = loadSessionState();
    if (!saved) {
      hasRestoredRef.current = true;
      return;
    }

    setScreen(saved.screen);
    setCurrentIndex(Math.min(saved.currentIndex, content.questions.length - 1));
    setAnswers(saved.answers as Record<string, LikertValue>);
    hasRestoredRef.current = true;
  }, [content.questions.length]);

  useEffect(() => {
    if (!hasRestoredRef.current) {
      return;
    }

    if (sharedResultCode) {
      return;
    }

    saveSessionState({
      screen,
      currentIndex,
      answers,
    });
  }, [answers, currentIndex, screen, sharedResultCode]);

  const result = sharedResultCode
    ? getAssessmentResultByCode(sharedResultCode, content.personalities)
    : calculateAssessmentResult(answers, content.personalities, content.questions);

  useEffect(() => {
    saveLocale(locale);
  }, [locale]);

  useEffect(() => {
    if (screen === "result" && result) {
      replaceResultCodeInUrl(result.code);
      return;
    }

    clearResultCodeFromUrl();
  }, [result, screen]);

  const handleStart = () => {
    setSharedResultCode(null);
    setCurrentIndex(0);
    setScreen("questions");
  };

  const handleAnswer = (value: LikertValue) => {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: value,
    }));

    if (currentIndex === content.questions.length - 1) {
      setScreen("result");
      return;
    }

    setCurrentIndex((current) =>
      Math.min(content.questions.length - 1, current + 1)
    );
  };

  const handleBack = () => {
    setCurrentIndex((current) => Math.max(0, current - 1));
  };

  const handleRestart = () => {
    setSharedResultCode(null);
    setAnswers({});
    setCurrentIndex(0);
    setScreen("intro");
    clearSessionState();
  };

  const handleLocaleChange = (nextLocale: Locale) => {
    setLocale(nextLocale);
  };

  return (
    <main className="app-shell">
      {screen === "intro" && (
        <IntroScreen
          copy={content.copy}
          dimensions={content.dimensions}
          locale={locale}
          onLocaleChange={handleLocaleChange}
          onStart={handleStart}
        />
      )}
      {screen === "questions" && (
        <QuestionScreen
          copy={content.copy}
          dimension={content.dimensions.find((item) => item.id === currentQuestion.dimension)}
          locale={locale}
          onBack={handleBack}
          onAnswer={handleAnswer}
          onLocaleChange={handleLocaleChange}
          question={currentQuestion}
          questionIndex={currentIndex}
          totalQuestions={content.questions.length}
          value={answers[currentQuestion.id]}
        />
      )}
      {screen === "result" && result && (
        <ResultScreen
          copy={content.copy}
          dimensions={content.dimensions}
          locale={locale}
          onLocaleChange={handleLocaleChange}
          onRestart={handleRestart}
          result={result}
        />
      )}
    </main>
  );
}
