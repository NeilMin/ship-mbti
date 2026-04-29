import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "../app/App";

const trackEventMock = vi.fn();
const trackPageViewMock = vi.fn();

vi.mock("../utils/analytics", () => ({
  trackEvent: (...args: unknown[]) => trackEventMock(...args),
  trackPageView: (...args: unknown[]) => trackPageViewMock(...args),
}));

describe("App", () => {
  afterEach(() => {
    window.history.replaceState({}, "", "/");
    localStorage.clear();
    trackEventMock.mockClear();
    trackPageViewMock.mockClear();
  });

  it("renders the landing call to action", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /开始测试/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "程序员人格测试" })).toBeInTheDocument();
    expect(screen.getByText("一个有趣的程序员人格测试。")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /programmer personality cast illustration/i })).toBeInTheDocument();
  });

  it("switches the experience to English when the locale toggle is used", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "English" }));

    expect(screen.getByRole("heading", { name: "Programmer Personality Test" })).toBeInTheDocument();
    expect(screen.getByText("A fun personality test for programmers.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start Test" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Start Test" }));

    expect(
      screen.getByText(/When Friday-night grunt work lands on my desk/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText("Strongly Agree").length).toBeGreaterThan(0);
  });

  it("shows the first question after starting the assessment", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /开始测试/i }));

    expect(screen.getByText(/周五傍晚突然塞来脏活/i)).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(7);
  });

  it("moves to the next question immediately after answering", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /开始测试/i }));
    fireEvent.click(screen.getAllByRole("radio")[0]);

    expect(screen.getByText(/接到陌生需求时/i)).toBeInTheDocument();
  });

  it("does not carry the previous answer into the next question", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /开始测试/i }));
    fireEvent.click(screen.getAllByRole("radio")[0]);

    expect(screen.getByText(/接到陌生需求时/i)).toBeInTheDocument();
    expect(screen.getAllByRole("radio").every((radio) => !(radio as HTMLInputElement).checked)).toBe(true);
  });

  it("keeps the previous answer when navigating back", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /开始测试/i }));
    fireEvent.click(screen.getAllByRole("radio")[0]);
    fireEvent.click(screen.getByRole("button", { name: /上一题/i }));

    expect(screen.getByText(/周五傍晚突然塞来脏活/i)).toBeInTheDocument();
    expect(screen.getAllByRole("radio")[0]).toBeChecked();
  });

  it("shows a result screen after answering all questions", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /开始测试/i }));

    for (let index = 0; index < 19; index += 1) {
      fireEvent.click(screen.getAllByRole("radio")[0]);
    }

    fireEvent.click(screen.getAllByRole("radio")[0]);

    expect(screen.getAllByText("COPW").length).toBeGreaterThan(0);
  });

  it("shows a shared result directly from the query string", () => {
    window.history.replaceState({}, "", "/?result=CAPW");

    render(<App />);

    expect(screen.getAllByText("CAPW").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/敏捷燃尽火化师/i).length).toBeGreaterThan(0);
  });

  it("tracks quiz start and progress events", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /开始测试/i }));
    fireEvent.click(screen.getAllByRole("radio")[0]);

    expect(trackEventMock).toHaveBeenCalledWith(
      "start_quiz",
      expect.objectContaining({
        entry_source: "landing_page",
        locale: "zh",
      })
    );
    expect(trackEventMock).toHaveBeenCalledWith(
      "quiz_progress",
      expect.objectContaining({
        answer_value: 1,
        progress_percent: 5,
        question_id: "S1",
        question_index: 1,
      })
    );
  });

  it("tracks shared-link result views with the result code", () => {
    window.history.replaceState({}, "", "/?result=CAPW");

    render(<App />);

    expect(trackEventMock).toHaveBeenCalledWith(
      "view_personality_result",
      expect.objectContaining({
        personality_type: "CAPW",
        result_source: "shared_link",
      }),
      "shared_link:zh:CAPW"
    );
    expect(trackPageViewMock).toHaveBeenCalledWith(
      "/result/CAPW",
      expect.objectContaining({
        personality_type: "CAPW",
        result_source: "shared_link",
      })
    );
  });
});
