import { useRef, useEffect, useCallback } from "react";
import { Middleware, SWRHook } from "swr";

export const laggy: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const laggyDataRef = useRef<unknown>();

    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);

    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined;
    }, []);

    const dataOrLaggyData =
      swr.data === undefined && key !== null ? laggyDataRef.current : swr.data;

    const isLagging =
      swr.data === undefined &&
      key !== null &&
      laggyDataRef.current !== undefined;

    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      resetLaggy,
    });
  };
