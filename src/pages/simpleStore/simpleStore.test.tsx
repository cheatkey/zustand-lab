import { render, screen, renderHook, act } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import SimpleStorePage from ".";
import { useBearStore } from "./useBearStore";

describe("Counter", () => {
  test("increase 버튼 클릭시 카운트의 값이 1씩 증가해야 한다", async () => {
    const user = userEvent.setup();

    render(<SimpleStorePage />);
    expect(await screen.findByText("count: 0")).toBeInTheDocument();
    await user.click(await screen.findByRole("button", { name: /increase/ }));

    expect(await screen.findByText("count: 1")).toBeInTheDocument();
  });

  test("increase 함수 호출 시 bears 값이 증가해야 한다", async () => {
    const { result } = renderHook(() => useBearStore());
    expect(result.current.bears).toEqual(0);

    act(() => {
      result.current.increase(1);
    });
    expect(result.current.bears).toEqual(1);
    act(() => {
      result.current.increase(2);
    });

    expect(result.current.bears).toEqual(3);
  });
});
