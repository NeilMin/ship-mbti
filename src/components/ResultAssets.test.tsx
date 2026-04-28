import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getAssessmentResultByCode } from "../lib/scoring";
import { ResultScreen } from "./ResultScreen";
import { ShareCard } from "./ShareCard";

describe("Result artwork", () => {
  it("renders the matching character illustration on the result page", () => {
    const result = getAssessmentResultByCode("CAPW");

    const { container } = render(<ResultScreen result={result} onRestart={() => {}} />);

    const image = container.querySelector(".result-hero-image");
    expect(image).not.toBeNull();
    expect(image).toHaveAttribute("src", "/characters/capw.png");
  });

  it("renders the matching character illustration on the share card", () => {
    const result = getAssessmentResultByCode("TOPW");

    render(<ShareCard result={result} />);

    const image = screen.getByRole("img", { name: /TOPW character illustration/i });
    expect(image).toHaveAttribute("src", "/characters/topw.png");
    expect(screen.getAllByTestId("share-card-dimension")).toHaveLength(4);
    expect(screen.getByText("代码来源")).toBeInTheDocument();
    expect(screen.getByText("你更依赖 AI 和现成骨架，还是更相信自己亲手把逻辑敲出来。")).toBeInTheDocument();
    expect(screen.getByText("80% Pray / 20% Logic")).toBeInTheDocument();
    expect(screen.getByText("80% Worker / 20% Geek")).toBeInTheDocument();
    expect(screen.getByText("长描述")).toBeInTheDocument();
    expect(screen.getByText("生活与社交侧写")).toBeInTheDocument();
    expect(screen.getByText("mbti.neilmin.com")).toBeInTheDocument();
    expect(screen.getByTestId("share-card-qr")).toBeInTheDocument();
  });
});
