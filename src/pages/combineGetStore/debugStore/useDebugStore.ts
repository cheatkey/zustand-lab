import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";

interface IDebugCounterStore {
  count: number;
}

const initialDebugCounterState: IDebugCounterStore = {
  count: 0,
};

export const useDebugStore = create(
  devtools(
    immer(
      combine(initialDebugCounterState, (set, get) => ({
        reset: () => {
          set(initialDebugCounterState);
        },
        increase: () => {
          set((state) => ({
            count: state.count + 1,
          }));
        },
        decrease: () => {
          set((state) => ({
            count: state.count - 1,
          }));
        },
      }))
    ),
    {
      name: "useDebugStore",
    }
  )
);
