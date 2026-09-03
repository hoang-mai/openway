import { ReactNode, useEffect, useState } from "react";

type UseAnimatedErrorOptions = {
  exitDuration?: number;
};

export function useAnimatedError(errorMessage: ReactNode, options: UseAnimatedErrorOptions = {}) {
  const { exitDuration = 250 } = options;
  const [displayedError, setDisplayedError] = useState<ReactNode>(errorMessage);
  const [isExiting, setIsExiting] = useState(false);
  const [prevErrorMessage, setPrevErrorMessage] = useState<ReactNode>(errorMessage);

  if (errorMessage !== prevErrorMessage) {
    setPrevErrorMessage(errorMessage);
    if (errorMessage) {
      setDisplayedError(errorMessage);
      setIsExiting(false);
    } else {
      setIsExiting(true);
    }
  }

  useEffect(() => {
    if (!isExiting) return;

    const timer = setTimeout(() => {
      setDisplayedError(undefined);
      setIsExiting(false);
    }, exitDuration);

    return () => clearTimeout(timer);
  }, [exitDuration, isExiting]);

  return {
    displayedError,
    isExiting,
  };
}

export default useAnimatedError;
