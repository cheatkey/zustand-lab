import { create } from "zustand";
import { combine } from "zustand/middleware";
import { nanoid } from "nanoid";

export interface ITodoState {
  isLoading: boolean;
  todo: {
    id: string;
    value: string;
    status: "done" | "inprogress" | "backlog";
  }[];
}

export type UpdateItemPayload = Partial<Omit<ITodoState["todo"][number], "id">>;
export const getInitialTodoState = (): ITodoState => ({
  isLoading: false,
  todo: [
    {
      id: nanoid(),
      value: "새로운 action item",
      status: "inprogress",
    },
  ],
});

export const useTodoStore = create(
  combine(getInitialTodoState(), (set, get) => ({
    reset: () => {
      set(getInitialTodoState());
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
        return { todo };
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
    updateItem: (id: string, payload: UpdateItemPayload) => {
      set((_state) => {
        const state: ITodoState = { ..._state };
        // JSON.parse(JSON.stringify(_state));

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
    addItemFromJsonPlaceholder: async () => {
      set({
        isLoading: true,
      });

      const data = await (
        await fetch(
          `https://jsonplaceholder.typicode.com/todos/${getRandomInt()}`
        )
      ).json();

      set((state) => {
        const todo: ITodoState["todo"] = [
          ...state.todo,
          {
            id: nanoid(),
            value: data.title,
            status: "backlog",
          },
        ];
        return { todo, isLoading: false };
      });
    },
  }))
);

export const getRandomInt = () => {
  return Math.floor(Math.random() * 200) + 1;
};
