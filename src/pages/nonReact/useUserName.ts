import { create } from "zustand";

interface IUserNameStore {
  username: string;
  setUserName: (value: string) => void;
}

const useUserName = create<IUserNameStore>()((set) => ({
  username: "",
  setUserName: (value) => {
    set({ username: value });
  },
}));

export default useUserName;
