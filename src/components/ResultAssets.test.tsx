import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { copyByLocale } from "../data/copy";
import { dimensionsZh } from "../data/dimensions.zh";
import { describe, expect, it, vi } from "vitest";
import { getAssessmentResultByCode } from "../lib/scoring";
import { ResultScreen } from "./ResultScreen";
import { ShareCard } from "./ShareCard";

const toPngMock = vi.fn();

vi.mock("html-to-image", () => ({
  toPng: (...args: unknown[]) => toPngMock(...args),
}));

describe("Result artwork", () => {
  it("renders the matching character illustration on the result page", () => {
    const result = getAssessmentResultByCode("CAPW");

    const { container } = render(
      <ResultScreen
        copy={copyByLocale.zh}
        dimensions={dimensionsZh}
        locale="zh"
        onLocaleChange={() => {}}
        onRestart={() => {}}
        result={result}
      />
    );

    const image = container.querySelector(".result-hero-image");
    expect(image).not.toBeNull();
    expect(image).toHaveAttribute("src", "/characters/capw.png");
  });

  it("renders the matching character illustration on the share card", () => {
    const result = getAssessmentResultByCode("TOPW");

    render(<ShareCard copy={copyByLocale.zh} dimensions={dimensionsZh} result={result} />);

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

  it("uses the native share sheet when the browser can share files", async () => {
    const result = getAssessmentResultByCode("CAPW");
    const shareMock = vi.fn().mockResolvedValue(undefined);
    const anchorClickMock = vi.fn();

    toPngMock.mockResolvedValue("data:image/png;base64,iVBORw0KGgo=");
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    });
    vi.stubGlobal(
      "navigator",
      Object.assign({}, window.navigator, {
        canShare: () => true,
        share: shareMock,
      })
    );

    const createElementSpy = vi.spyOn(document, "createElement");
    createElementSpy.mockImplementation((tagName: string) => {
      const element = document.createElementNS("http://www.w3.org/1999/xhtml", tagName);
      if (tagName === "a") {
        Object.defineProperty(element, "click", {
          value: anchorClickMock,
          configurable: true,
        });
      }
      return element as HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
    });

    render(
      <ResultScreen
        copy={copyByLocale.zh}
        dimensions={dimensionsZh}
        locale="zh"
        onLocaleChange={() => {}}
        onRestart={() => {}}
        result={result}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "保存结果图" }));

    await waitFor(() => {
      expect(shareMock).toHaveBeenCalledTimes(1);
    });

    expect(anchorClickMock).not.toHaveBeenCalled();

    createElementSpy.mockRestore();
    vi.unstubAllGlobals();
    toPngMock.mockReset();
  });
});
