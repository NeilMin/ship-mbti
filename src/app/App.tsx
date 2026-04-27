import { useEffect, useRef, useState } from "react";
import { questions } from "../data/questions";
import {
  calculateAssessmentResult,
  getAssessmentResultByCode,
} from "../lib/scoring";
import {
  clearSessionState,
  loadSessionState,
  saveSessionState,
} from "../lib/storage";
import {
  clearResultCodeFromUrl,
  getResultCodeFromUrl,
  replaceResultCodeInUrl,
} from "../lib/urlState";
import type { LikertValue, ResultCode } from "../lib/types";
import { IntroScreen } from "../components/IntroScreen";
import { QuestionScreen } from "../components/QuestionScreen";
import { ResultScreen } from "../components/ResultScreen";

type Screen = "intro" | "questions" | "result";

export function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, LikertValue>>({});
  const [sharedResultCode, setSharedResultCode] = useState<ResultCode | null>(null);
  const hasRestoredRef = useRef(false);

  const currentQuestion = questions[currentIndex];

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
    setCurrentIndex(Math.min(saved.currentIndex, questions.length - 1));
    setAnswers(saved.answers as Record<string, LikertValue>);
    hasRestoredRef.current = true;
  }, []);

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
    ? getAssessmentResultByCode(sharedResultCode)
    : calculateAssessmentResult(answers);

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
  };

  const handleBack = () => {
    setCurrentIndex((current) => Math.max(0, current - 1));
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setScreen("result");
      return;
    }

    setCurrentIndex((current) =>
      Math.min(questions.length - 1, current + 1)
    );
  };

  const handleRestart = () => {
    setSharedResultCode(null);
    setAnswers({});
    setCurrentIndex(0);
    setScreen("intro");
    clearSessionState();
  };

  return (
    <main className="app-shell">
      {screen === "intro" && (
        <IntroScreen onStart={handleStart} />
      )}
      {screen === "questions" && (
        <QuestionScreen
          onBack={handleBack}
          onAnswer={handleAnswer}
          onNext={handleNext}
          question={currentQuestion}
          questionIndex={currentIndex}
          totalQuestions={questions.length}
          value={answers[currentQuestion.id]}
        />
      )}
      {screen === "result" && result && (
        <ResultScreen onRestart={handleRestart} result={result} />
      )}
    </main>
  );
}
