/* eslint-disable @typescript-eslint/ban-types */
import {
  Mutate,
  SetState,
  State,
  StateCreator,
  StoreApi,
  StoreMutatorIdentifier,
  create,
} from "zustand";
import { devtools, persist, combine, NamedSet } from "zustand/middleware";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

const actionAutoMatcher =
  <S>(setApi: NamedSet<S>) =>
  <T extends Record<string, (set: SetState<S>) => Function>>(methods: T) => {
    const Store = getEntries(methods).map(([functionName, methodFn]) => {
      const originMethodFn = methodFn;

      const newMethodFn = (...args: unknown[]) => {
        const setter = (
          props: Parameters<NamedSet<S>>[0],
          replace: Parameters<NamedSet<S>>[1]
        ) => {
          setApi(props, replace, {
            type: functionName,
            ...args,
          });
        };

        return originMethodFn(setter)(...args);
      };

      return [functionName, newMethodFn];
    });

    return Object.fromEntries(Store) as {
      [P in keyof T]: ReturnType<T[P]>;
    };
  };

interface IDebugStoreState {
  count: number;
}

const initialState: IDebugStoreState = {
  count: 0,
};

export const useDebugStoreActionName = create(
  devtools(
    combine(initialState, (_set) =>
      actionAutoMatcher(_set)({
        increase: (set) => (name: string, age: number) => {
          set((state) => ({
            count: state.count + 1,
          }));
        },
        decrease: (set) => () => {
          set((state) => ({
            count: state.count - 1,
          }));
          return true;
        },
      })
    )
  )
);
