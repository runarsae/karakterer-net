import { createContext as newContext } from "react";

export function createContext<T>() {
  return newContext<T | undefined>(undefined);
}
