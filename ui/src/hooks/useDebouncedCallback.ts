import { DEFAULT_DEBOUNCE_DELAY } from "@/constants";
import { useRef, useEffect, useCallback } from "react";

/**
 * Custom hook to debounce a callback function by a given delay in milliseconds.
 * Ensures the callback always sees the latest props/state without triggering extra re-renders.
 *
 * @param callback The function to debounce
 * @param delay Delay in milliseconds (default: 300ms)
 * @returns A memoized debounced function with cancel method
 */
export function useDebouncedCallback<Args extends unknown[], R = void>(
  callback: (...args: Args) => R,
  delay: number = DEFAULT_DEBOUNCE_DELAY
): {
  debounced: (...args: Args) => void;
  cancel: () => void;
} {
  const callbackRef = useRef(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cancel;
  }, [cancel]);

  const debounced = useCallback(
    (...args: Args) => {
      cancel();

      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [cancel, delay]
  );

  return {
    debounced,
    cancel,
  };
}

export default useDebouncedCallback;
