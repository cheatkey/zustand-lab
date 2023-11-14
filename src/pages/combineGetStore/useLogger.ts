import axios from "axios";
import { UseBoundStore, create } from "zustand";
import { combine } from "zustand/middleware";
import { nanoid } from "nanoid";
import { getProductSearchResults } from "./repository";

interface ILoggerStore {
  isLoading: boolean;
  log: { id: string; value: string }[];
  searchInput: string;
  searchedProduct: { thumbnail: string; title: string }[];
}

const initialLoggerState: ILoggerStore = {
  isLoading: false,
  log: [],
  searchInput: "",
  searchedProduct: [],
};

const useLogger = create(
  combine(initialLoggerState, (set, _get) => {
    const get = _get as () => ZustandGetType<typeof useLogger>;

    return {
      addLog: (value: string) => {
        set((state) => ({
          log: [...state.log, { value, id: nanoid() }],
        }));
      },
      setLoading: (value: boolean) => {
        set({
          isLoading: value,
        });
      },
      setSearchInput: (value: string) => {
        set({
          searchInput: value,
        });
      },
      searchProduct: async () => {
        const { searchInput, setLoading } = get();
        get().addLog(searchInput);

        setLoading(true);
        const products = await getProductSearchResults(searchInput);

        set({
          searchedProduct: products.products.map((item) => ({
            title: item.title,
            thumbnail: item.thumbnail,
          })),
        });

        setLoading(false);
      },
    };
  })
);

export default useLogger;

type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

export type ZustandGetType<T> = ExtractState<
  T extends UseBoundStore<infer U> ? U : T
>;
