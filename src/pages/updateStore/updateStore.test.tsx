import { renderHook, act } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import SimpleStorePage from ".";
import { useTodoStore } from "./useTodo";

describe("Todo", () => {
  test("새로운 todo 아이템 추가 및 변경 시 지정한 값으로 내용이 변경되어야 한다.", async () => {
    const { result } = renderHook(() => useTodoStore());

    expect(result.current.todo).toStrictEqual([]);

    act(() => {
      result.current.addTodo("안녕하세요.");
    });
    const firstItem = result.current.todo[0];
    console.log("firstItem:", firstItem);
    expect(firstItem.value).toBe("안녕하세요.");
    expect(firstItem.status).toBe("backlog");

    act(() => {
      result.current.updateItem(firstItem.id, {
        status: "done",
        value: "Hello, World",
      });
    });

    expect(result.current.todo[0].status).toBe("done");
    expect(result.current.todo[0].value).toBe("Hello, World");
  });
});
