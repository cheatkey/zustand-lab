import { create } from "zustand";
import { combine } from "zustand/middleware";
import { nanoid } from "nanoid";

interface ITodoState {
  todo: {
    id: string;
    value: string;
    status: "done" | "inprogress" | "backlog";
  }[];
}

const initialTodoState: ITodoState = { todo: [] };

export const useTodoStore = create(
  combine(initialTodoState, (set, get) => ({
    reset: () => {
      set(initialTodoState);
    },
    addTodo: (payload: string) => {
      set({
        todo: [
          ...get().todo,
          {
            id: nanoid(),
            value: payload,
            status: "backlog",
          },
        ],
      });
    },
    updateItem: (
      id: string,
      payload: Partial<Omit<ITodoState["todo"][number], "id">>
    ) => {
      set((state) => {
        const current = state.todo.find((item) => item.id === id);
        if (current) {
          if (payload.status) {
            current.status = payload.status;
          }
          if (payload.value) {
            current.value = payload.value;
          }
        }
        return state;
      });
    },
  }))
);
