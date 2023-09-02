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

const myWrapper =
  <S>(setApi: NamedSet<S>) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  <T extends Record<string, (set: SetState<S>) => Function>>(methods: T) => {
    const a = getEntries(methods).map(([functionName, methodFn]) => {
      const originMethodFn = methodFn;

      const newMethodFn = (...args) => {
        const setter = (
          props: Parameters<NamedSet<S>>[0],
          replace: Parameters<NamedSet<S>>[1]
        ) => {
          setApi(props, replace, {
            type: functionName,
            date: "heello",
            ...args,
          });
        };

        console.log("래핑됨", args);
        return originMethodFn(setter)(...args);
      };

      return [functionName, newMethodFn];
    });

    return Object.fromEntries(a) as {
      [P in keyof T]: ReturnType<T[P]>;
    };
  };

export const useDebugStoreActionName = create(
  devtools(
    combine(
      {
        count: 0,
      },
      (_set) => {
        return myWrapper(_set)({
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
        });

        // const mapper = <
        //   T extends Record<string, (set: typeof _set) => Function>
        // >(
        //   methods: T
        // ) => {
        //   const b = getEntries(methods);
        //   const a = getEntries(methods).map(([key, method]) => {
        //     const setter = (
        //       props: Parameters<typeof _set>[0],
        //       replace: Parameters<typeof _set>[1]
        //     ) => {
        //       _set(props, replace, {
        //         type: key,
        //       });
        //     };

        //     return [key, method(setter)];
        //   }) as typeof b;

        //   return Object.fromEntries(a) as {
        //     [P in keyof T]: ReturnType<T[P]>;
        //   };
        // };

        // return mapper({
        //   increase: (set) => (by: number) => {
        //     set((state) => ({
        //       bears: state.bears + by,
        //     }));
        //   },
        //   decrease: (set) => (by: number) => {
        //     set((state) => ({
        //       bears: state.bears - by,
        //     }));
        //   },
        // });
      }
    )
  )
);
