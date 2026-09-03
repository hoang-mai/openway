import { FloatingContext, useTransitionStyles } from "@floating-ui/react";

export interface UseFloatingTransitionOptions {
  /**
   * Transition duration in milliseconds.
   * Can be a number or an object with `open` and `close` durations.
   * @default 150
   */
  duration?: number | { open?: number; close?: number };
  /**
   * Distance offset in pixels to translate from initially and when closing.
   * @default 4
   */
  offset?: number;
  /**
   * Scale factor when closed / unmounted.
   * @default 0.96
   */
  scale?: number;
  /**
   * Whether transitions should animate. If false, duration is 0.
   * @default true
   */
  animated?: boolean;
}

export function useFloatingTransition(
  context: FloatingContext,
  options: UseFloatingTransitionOptions = {}
) {
  const { duration = 150, offset = 4, scale = 0.96, animated = true } = options;

  return useTransitionStyles(context, {
    duration: animated ? duration : 0,
    initial: ({ side }) => ({
      opacity: 0,
      transform:
        side === "top"
          ? `translateY(${offset}px) scale(${scale})`
          : side === "bottom"
            ? `translateY(-${offset}px) scale(${scale})`
            : side === "left"
              ? `translateX(${offset}px) scale(${scale})`
              : `translateX(-${offset}px) scale(${scale})`,
    }),
    open: {
      opacity: 1,
      transform: "translate(0px, 0px) scale(1)",
    },
    close: ({ side }) => ({
      opacity: 0,
      transform:
        side === "top"
          ? `translateY(${offset}px) scale(${scale})`
          : side === "bottom"
            ? `translateY(-${offset}px) scale(${scale})`
            : side === "left"
              ? `translateX(${offset}px) scale(${scale})`
              : `translateX(-${offset}px) scale(${scale})`,
    }),
  });
}

export default useFloatingTransition;
