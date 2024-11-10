import { Context, useContext as fetchContext } from "react";

export function useContext<T>(c: Context<T | undefined>) {
  const context = fetchContext(c);

  if (context === undefined) {
    throw new Error("Use of context must be within context provider");
  }

  return context;
}
