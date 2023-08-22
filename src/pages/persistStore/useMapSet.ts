import { create } from "zustand";
import {
  StorageValue,
  combine,
  createJSONStorage,
  persist,
} from "zustand/middleware";
import superjson from "superjson";
import { cloneDeep } from "lodash";

export type UserInfoKey = "email" | "username";

interface IMapSetStore {
  favoriteLanguages: Set<string>;
  userInfo: Map<UserInfoKey, string>;
}

const initialMapSetState: IMapSetStore = {
  favoriteLanguages: new Set([]),
  userInfo: new Map([
    ["email", ""],
    ["username", ""],
  ]),
};

const useMapSet = create(
  persist(
    combine(initialMapSetState, (set, get) => ({
      setFavoriteLanguages: (langs: Set<string>) => {
        set({
          favoriteLanguages: langs,
        });
      },
      setUserInfo: (key: UserInfoKey, value: string) => {
        set((state) => {
          const newUserInfo = cloneDeep(state.userInfo);
          newUserInfo.set(key, value);

          return {
            userInfo: newUserInfo,
          };
        });
      },
    })),
    {
      name: "mapset-storage",
      storage: {
        getItem: (name) => {
          return {
            state: superjson.parse<StorageValue<IMapSetStore>>(
              localStorage.getItem(name) as string
            ).state,
          };
        },
        setItem: (name, value) => {
          localStorage.setItem(name, superjson.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export default useMapSet;
