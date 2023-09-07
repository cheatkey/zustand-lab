import { create } from "zustand";
import { combine } from "zustand/middleware";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";
import {
  UpdateItemPayload,
  getInitialTodoState,
  getRandomInt,
} from "../updateStore/useTodo";
import { shallow } from "zustand/shallow";

export const useTodoBase = create(
  immer(
    combine(getInitialTodoState(), (set, get) => ({
      reset: () => {
        set(getInitialTodoState());
      },
      computedValue: () => {
        const backlogTasks = get().todo.filter(
          (item) => item.status === "backlog"
        );
        const doneTasks = get().todo.filter((item) => item.status === "done");
        const inprogressTasks = get().todo.filter(
          (item) => item.status === "inprogress"
        );

        return `백로그 ${backlogTasks.length}건, 진행중 ${inprogressTasks.length}, 완료 ${doneTasks.length}건`;
      },
      addTodo: () => {
        set((state) => {
          state.todo.push({
            id: nanoid(),
            value: "새로운 action item",
            status: "backlog",
          });
        });
      },
      updateItem: (id: string, payload: UpdateItemPayload) => {
        set((state) => {
          const current = state.todo.find((item) => item.id === id);
          if (current) {
            if (payload.status !== undefined) current.status = payload.status;
            if (payload.value !== undefined) {
              current.value = payload.value;
            }
          }
        });
      },
      deleteItem: (id: string) => {
        set((state) => {
          state.todo = state.todo.filter((item) => item.id !== id);
        });
      },
      addItemFromJsonPlaceholder: async () => {
        set((state) => {
          state.isLoading = true;
        });

        const data = await (
          await fetch(
            `https://jsonplaceholder.typicode.com/todos/${getRandomInt()}`
          )
        ).json();

        set((state) => {
          state.todo.push({
            id: nanoid(),
            value: data.title,
            status: "backlog",
          });
          state.isLoading = false;
        });
      },
    }))
  )
);

export const useTodoIDList = () => {
  const todoIDList = useTodoBase(
    (state) => state.todo.map((item) => item.id),
    shallow
  );
  return todoIDList;
};

export const useTodoItem = (id: string) => {
  const todoItem = useTodoBase((state) =>
    state.todo.find((item) => item.id === id)
  );

  return todoItem;
};
