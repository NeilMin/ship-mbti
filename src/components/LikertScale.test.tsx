import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LikertScale } from "./LikertScale";

describe("LikertScale", () => {
  it("renders a horizontal 7-point scale with visible endpoint labels", () => {
    render(<LikertScale name="S1" onChange={vi.fn()} />);

    expect(screen.getAllByRole("radio")).toHaveLength(7);
    expect(screen.getByText("强烈同意")).toBeInTheDocument();
    expect(screen.getByText("中立")).toBeInTheDocument();
    expect(screen.getByText("强烈反对")).toBeInTheDocument();
  });

  it("updates the selected value when a circle is clicked", () => {
    const onChange = vi.fn();

    render(<LikertScale name="S1" onChange={onChange} value={4} />);

    fireEvent.click(screen.getByLabelText("Strongly Disagree"));

    expect(onChange).toHaveBeenCalledWith(7);
  });
});
