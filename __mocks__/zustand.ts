import { afterEach, vi } from "vitest";
import * as zustand from "zustand";
import { act } from "@testing-library/react";

const { create: actualCreate } = await vi.importActual<typeof zustand>(
  "zustand"
);

export const storeResetFns = new Set<() => void>();

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = ((
  combinedStateCreator?: zustand.StateCreator<unknown>
) => {
  if (combinedStateCreator) {
    const store = actualCreate(combinedStateCreator);
    const initialState = store.getState();
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    return store;
  }

  return (stateCreator: zustand.StateCreator<unknown>) => {
    console.log("mocked", stateCreator);
    const store = actualCreate(stateCreator);
    const initialState = store.getState();
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    return store;
  };
}) as typeof zustand.create;

afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
