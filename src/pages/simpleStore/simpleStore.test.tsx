import { render, screen, renderHook, act } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import SimpleStorePage from ".";
import { useBearStore } from "./useBearStore";

const alertFn = vi.fn();

beforeEach(() => {
  window.alert = alertFn;
});

describe("Counter", () => {
  test("increase 버튼 클릭시 카운트의 값이 1씩 증가해야 한다", async () => {
    const user = userEvent.setup();

    render(<SimpleStorePage />);
    expect(await screen.findByText("count: 0")).toBeInTheDocument();
    await user.click(await screen.findByRole("button", { name: /increase/ }));

    expect(await screen.findByText("count: 1")).toBeInTheDocument();
  });

  test("카운트가 9일 때 버튼을 클릭시, 카운트가 증가하지 않는다.", async () => {
    const alertFn = vi.fn();
    window.alert = alertFn;

    useBearStore.setState({ bears: 9 });
    const user = userEvent.setup();

    render(<SimpleStorePage />);
    expect(await screen.findByText("count: 9")).toBeInTheDocument();

    expect(alertFn).toHaveBeenCalledTimes(0);
    await user.click(await screen.findByRole("button", { name: /increase/ }));

    expect(alertFn).toHaveBeenCalledTimes(1);
    expect(await screen.findByText("count: 9")).toBeInTheDocument();
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
