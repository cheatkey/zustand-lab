import { create } from "zustand";
import {
  PersistStorage,
  StateStorage,
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
  myReg: RegExp;
  now: Date;
}

const initialMapSetState: IMapSetStore = {
  favoriteLanguages: new Set([]),
  userInfo: new Map([
    ["email", ""],
    ["username", ""],
  ]),
  myReg: RegExp("\\d"),
  now: new Date(),
};

const storage: PersistStorage<IMapSetStore> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, superjson.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
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
      storage,
    }
  )
);

export default useMapSet;
