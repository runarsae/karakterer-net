import useSWR, { Key, SWRResponse } from "swr";
import { laggy } from "./laggy";

export type WithLaggy<Response extends SWRResponse = SWRResponse> = Response & {
  isLagging: boolean;
  resetLaggy: () => void;
};

export const useSWRWithLaggy = <T>(key: Key) => {
  const res = useSWR<T>(key, { use: [laggy] });
  return res as WithLaggy<typeof res>;
};
