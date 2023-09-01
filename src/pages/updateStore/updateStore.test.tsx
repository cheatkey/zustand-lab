import { renderHook, act } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import SimpleStorePage from ".";
import { useTodoStore } from "./useTodo";

describe("Todo", () => {
  test("새로운 todo 아이템 추가 및 변경 시 지정한 값으로 내용이 변경되어야 한다.", async () => {
    const { result } = renderHook(() => useTodoStore());
    expect(result.current.todo.length).toEqual(1);
    act(() => {
      result.current.addTodoBySpread();
    });
    const createdItem = result.current.todo[1];
    expect(createdItem.value).toBe("새로운 action item");
    expect(createdItem.status).toBe("backlog");
    act(() => {
      result.current.updateItem(createdItem.id, {
        status: "done",
        value: "Hello, World",
      });
    });
    expect(result.current.todo[1].status).toBe("done");
    expect(result.current.todo[1].value).toBe("Hello, World");
  });
});
