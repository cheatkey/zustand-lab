import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import SimpleStorePage from ".";

describe("Counter", () => {
  test("should increase count by clicking a button", async () => {
    const user = userEvent.setup();

    render(<SimpleStorePage />);
    expect(await screen.findByText("0")).toBeDefined();
    await user.click(await screen.findByRole("button", { name: /increase/ }));

    expect(await screen.findByText("1")).toBeDefined();
  });
});
