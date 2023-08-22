import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

interface IAuthStore {
  email: string | undefined;
  token: string | undefined;
}

const initialAuthState: IAuthStore = { email: undefined, token: undefined };

const useAuth = create(
  persist(
    combine(initialAuthState, (set, get) => ({
      reset: () => {
        set(initialAuthState);
      },
      login: async (username: string, password: string) => {
        try {
          const { data: credential } = await axios.post<{
            email: string;
            token: string;
          }>("https://dummyjson.com/auth/login", {
            username,
            password,
          });

          toast("로그인 성공");

          set({
            email: credential.email,
            token: credential.token,
          });
        } catch (err) {
          const errMessage = JSON.parse(
            (err as AxiosError).request.response
          ).message;
          toast.error(errMessage);
        }
      },
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
