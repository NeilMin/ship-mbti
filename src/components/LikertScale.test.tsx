import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LikertScale } from "./LikertScale";

describe("LikertScale", () => {
  it("renders a horizontal 7-point scale with visible endpoint labels", () => {
    render(
      <LikertScale
        labels={{
          strongAgree: "Strongly Agree",
          agree: "Agree",
          slightlyAgree: "Slightly Agree",
          neutral: "Neutral",
          slightlyDisagree: "Slightly Disagree",
          disagree: "Disagree",
          strongDisagree: "Strongly Disagree",
        }}
        name="S1"
        onChange={vi.fn()}
      />
    );

    expect(screen.getAllByRole("radio")).toHaveLength(7);
    expect(screen.getAllByText("Strongly Agree").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Neutral").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Strongly Disagree").length).toBeGreaterThan(0);
  });

  it("updates the selected value when a circle is clicked", () => {
    const onChange = vi.fn();

    render(
      <LikertScale
        labels={{
          strongAgree: "Strongly Agree",
          agree: "Agree",
          slightlyAgree: "Slightly Agree",
          neutral: "Neutral",
          slightlyDisagree: "Slightly Disagree",
          disagree: "Disagree",
          strongDisagree: "Strongly Disagree",
        }}
        name="S1"
        onChange={onChange}
        value={4}
      />
    );

    fireEvent.click(screen.getByLabelText("Strongly Disagree"));

    expect(onChange).toHaveBeenCalledWith(7);
  });
});
