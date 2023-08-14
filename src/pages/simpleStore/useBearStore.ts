import { create } from "zustand";
import { combine } from "zustand/middleware";

interface IBearState {
  bears: number;
}

const initialBearState: IBearState = { bears: 0 };

export const useBearStore = create(
  combine(initialBearState, (set) => ({
    increase: (by: number) => set((state) => ({ bears: state.bears + by })),
  }))
);
