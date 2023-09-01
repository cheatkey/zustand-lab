import { create } from "zustand";
import { combine } from "zustand/middleware";

interface IBearState {
  bears: number;
}

const initialBearState: IBearState = { bears: 0 };

export const useBearStore = create(
  combine(initialBearState, (set, get) => ({
    increase: (by: number) => {
      const nextBears = get().bears + by;
      if (nextBears >= 10) {
        alert("카운터는 10을 넘을 수 없습니다.");
        return;
      }

      set({
        bears: nextBears,
      });
    },
  }))
);

// export type CounterStore = {
//   bears: number;
//   increase: (by: number) => void;
// };

// export const useBearStore = create<CounterStore>()((set) => ({
//   bears: 0,
//   increase: (by) => set((state) => ({ bears: state.bears + by })),
// }));
