"use client";

import axios from "axios";
import { SWRConfig } from "swr";

export const fetcher = ([url, params]: [string, unknown]) =>
  axios.get(url, { params: params }).then((res) => res.data);

interface SWRProviderProps {
  children: React.ReactNode;
}

export const SWRProvider = ({ children }: SWRProviderProps) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
