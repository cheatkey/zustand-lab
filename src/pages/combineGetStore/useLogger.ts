import axios from "axios";
import { UseBoundStore, create } from "zustand";
import { combine } from "zustand/middleware";

interface ILoggerStore {
  isLoading: boolean;
  log: string[];
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
          log: [...state.log, value],
        }));
      },
      loadingWrapper: (value: boolean) => {
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
        const { searchInput, loadingWrapper } = get();
        get().addLog(searchInput);

        loadingWrapper(true);
        const { data: result } = await axios<{
          products: {
            title: string;
            thumbnail: string;
          }[];
        }>(`https://dummyjson.com/products/search?q=${searchInput}`);

        set({
          searchedProduct: result.products.map((item) => ({
            title: item.title,
            thumbnail: item.thumbnail,
          })),
        });

        loadingWrapper(false);
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
