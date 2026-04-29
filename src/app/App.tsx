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
import { trackEvent, trackPageView } from "../utils/analytics";

type Screen = "intro" | "questions" | "result";
type ResultViewSource = "quiz_completion" | "shared_link" | "session_restore";

export function App() {
  const [locale, setLocale] = useState<Locale>(() => loadLocale());
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, LikertValue>>({});
  const [sharedResultCode, setSharedResultCode] = useState<ResultCode | null>(null);
  const [resultViewSource, setResultViewSource] = useState<ResultViewSource>("quiz_completion");
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
      setResultViewSource("shared_link");
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

    if (saved.screen === "result") {
      setResultViewSource("session_restore");
    }

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

  useEffect(() => {
    if (!hasRestoredRef.current) {
      return;
    }

    if (screen === "intro") {
      trackPageView("/", {
        locale,
        page_title: "Programmer Personality Test - Intro",
        screen_name: "intro",
      });
      return;
    }

    if (screen === "questions") {
      trackPageView(`/quiz/question-${currentIndex + 1}`, {
        locale,
        page_title: `Programmer Personality Test - Question ${currentIndex + 1}`,
        question_dimension: currentQuestion.dimension,
        question_id: currentQuestion.id,
        question_index: currentIndex + 1,
        screen_name: "questions",
        total_questions: content.questions.length,
      });
      return;
    }

    if (screen === "result" && result) {
      trackPageView(`/result/${result.code}`, {
        locale,
        page_title: `Programmer Personality Test - ${result.code}`,
        personality_type: result.code,
        result_source: resultViewSource,
        screen_name: "result",
      });
    }
  }, [
    content.questions.length,
    currentIndex,
    currentQuestion.dimension,
    currentQuestion.id,
    locale,
    result?.code,
    resultViewSource,
    screen,
  ]);

  useEffect(() => {
    if (!hasRestoredRef.current || screen !== "questions") {
      return;
    }

    trackEvent(
      "view_quiz_question",
      {
        locale,
        question_dimension: currentQuestion.dimension,
        question_id: currentQuestion.id,
        question_index: currentIndex + 1,
        total_questions: content.questions.length,
      },
      `${locale}:${currentQuestion.id}:${currentIndex + 1}`
    );
  }, [
    content.questions.length,
    currentIndex,
    currentQuestion.dimension,
    currentQuestion.id,
    locale,
    screen,
  ]);

  useEffect(() => {
    if (!hasRestoredRef.current || screen !== "result" || !result) {
      return;
    }

    trackEvent(
      "view_personality_result",
      {
        locale,
        personality_type: result.code,
        result_source: resultViewSource,
        source_pole: result.dimensions[0]?.winningPole,
        hierarchy_pole: result.dimensions[1]?.winningPole,
        investigation_pole: result.dimensions[2]?.winningPole,
        purpose_pole: result.dimensions[3]?.winningPole,
      },
      `${resultViewSource}:${locale}:${result.code}`
    );
  }, [locale, result, resultViewSource, screen]);

  const handleStart = () => {
    trackEvent("start_quiz", {
      entry_source: sharedResultCode ? "shared_result" : "landing_page",
      locale,
    });
    setSharedResultCode(null);
    setCurrentIndex(0);
    setResultViewSource("quiz_completion");
    setScreen("questions");
  };

  const handleAnswer = (value: LikertValue) => {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };

    const nextQuestionIndex = Math.min(content.questions.length - 1, currentIndex + 1);
    const progressPercent = Math.round(((currentIndex + 1) / content.questions.length) * 100);

    trackEvent("quiz_progress", {
      answer_value: value,
      locale,
      progress_percent: progressPercent,
      question_dimension: currentQuestion.dimension,
      question_id: currentQuestion.id,
      question_index: currentIndex + 1,
      total_questions: content.questions.length,
    });

    setAnswers(nextAnswers);

    if (currentIndex === content.questions.length - 1) {
      const completedResult = calculateAssessmentResult(
        nextAnswers,
        content.personalities,
        content.questions
      );

      if (completedResult) {
        trackEvent("quiz_completed", {
          locale,
          personality_type: completedResult.code,
          total_questions: content.questions.length,
        });
      }

      setResultViewSource("quiz_completion");
      setScreen("result");
      return;
    }

    setCurrentIndex(nextQuestionIndex);
  };

  const handleBack = () => {
    trackEvent("go_to_previous_question", {
      locale,
      question_index: currentIndex + 1,
    });
    setCurrentIndex((current) => Math.max(0, current - 1));
  };

  const handleRestart = () => {
    trackEvent("restart_quiz", {
      locale,
      personality_type: result?.code,
    });
    setSharedResultCode(null);
    setAnswers({});
    setCurrentIndex(0);
    setResultViewSource("quiz_completion");
    setScreen("intro");
    clearSessionState();
  };

  const handleLocaleChange = (nextLocale: Locale) => {
    trackEvent("change_locale", {
      locale_from: locale,
      locale_to: nextLocale,
      screen_name: screen,
    });
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
