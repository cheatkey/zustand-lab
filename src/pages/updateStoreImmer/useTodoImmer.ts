import { create } from "zustand";
import { combine } from "zustand/middleware";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";
import {
  UpdateItemPayload,
  getInitialTodoState,
  getRandomInt,
} from "../updateStore/useTodo";

export const useTodoImmer = create(
  immer(
    combine(getInitialTodoState(), (set, get) => ({
      reset: () => {
        set(getInitialTodoState());
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
