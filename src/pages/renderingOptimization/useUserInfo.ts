import { create } from "zustand";
import { combine } from "zustand/middleware";

interface IUserInfoState {
  name: string;
  age: number;
}

const initialUserInfoState: IUserInfoState = {
  name: "",
  age: 0,
};

export const useUserInfo = create(
  combine(initialUserInfoState, (set, get) => ({
    setName: (payload: string) => {
      set({ name: payload });
    },
    setAge: (payload: number) => {
      set({ age: payload });
    },
  }))
);
