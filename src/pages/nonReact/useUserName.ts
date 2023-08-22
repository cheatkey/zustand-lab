import { toast } from "react-toastify";
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

useUserName.subscribe((state) => {
  const userNameLength = state.username.length;
  if (userNameLength >= 3) {
    toast(`(예시) api 호출 ${userNameLength}`);
  }
});
