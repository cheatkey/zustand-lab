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
import { diff } from "deep-object-diff";

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
  name: string;
}

const initialState: IDebugStoreState = {
  count: 0,
  name: "",
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
        setName: (set) => (payload: string) => {
          set((state) => ({
            name: payload,
          }));
        },
      })
    )
  )
);

useDebugStoreActionName.subscribe((state, prevState) => {
  const getState = (obj: object) =>
    Object.fromEntries(
      Object.entries(obj).filter((item) => typeof item[1] !== "function")
    );
  if (!!state && !!prevState)
    console.log(diff(getState(prevState), getState(state)));
});
