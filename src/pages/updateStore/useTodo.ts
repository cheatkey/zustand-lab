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

const initialTodoState: ITodoState = {
  todo: [
    {
      id: nanoid(),
      value: "새로운 action item",
      status: "inprogress",
    },
  ],
};

export const useTodoStore = create(
  combine(initialTodoState, (set, get) => ({
    reset: () => {
      set(initialTodoState);
    },
    addTodoByPush: () => {
      set((state) => {
        state.todo.push({
          id: nanoid(),
          value: "새로운 action item",
          status: "backlog",
        });
        return state;
      });
    },
    addTodoBySpread: () => {
      set((state) => {
        const todo: ITodoState["todo"] = [
          ...state.todo,
          {
            id: nanoid(),
            value: "새로운 action item",
            status: "backlog",
          },
        ];
        return { state, todo };
      });
    },
    addTodoBySpreadDirect: () => {
      set((state) => {
        const todo: ITodoState["todo"] = [
          ...state.todo,
          {
            id: nanoid(),
            value: "새로운 action item",
            status: "backlog",
          },
        ];
        state.todo = todo;
        return state;
      });
    },
    addTodoBySpreadGet: () => {
      set({
        todo: [
          ...get().todo,
          {
            id: nanoid(),
            value: "새로운 action item",
            status: "backlog",
          },
        ],
      });
    },
    updateItem: (
      id: string,
      payload: Partial<Omit<ITodoState["todo"][number], "id">>
    ) => {
      set((_state) => {
        const state = JSON.parse(JSON.stringify(_state));

        const current = state.todo.findIndex((item) => item.id === id);
        if (current !== -1) {
          if (payload.status !== undefined)
            state.todo[current].status = payload.status;
          if (payload.value !== undefined) {
            state.todo[current].value = payload.value;
          }
        }
        console.log(state.todo[current]);
        return state;
      });
    },
    deleteItem: (id: string) => {
      set((state) => {
        const todo = state.todo.filter((item) => item.id !== id);
        return { todo };
      });
    },
  }))
);
