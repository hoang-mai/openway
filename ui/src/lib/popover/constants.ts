import { PopoverSize, PopoverRadius } from "./types";

export const sizeConfig: Record<
  PopoverSize,
  {
    container: string;
    header: string;
    body: string;
    footer: string;
  }
> = {
  xs: {
    container: "min-w-44 text-xs",
    header: "px-2.5 py-1.5 text-xs font-semibold",
    body: "px-2.5 py-2 text-xs",
    footer: "px-2.5 py-1.5 text-xs",
  },
  sm: {
    container: "min-w-56 text-xs",
    header: "px-3 py-2 text-xs font-semibold",
    body: "px-3 py-2.5 text-xs",
    footer: "px-3 py-2 text-xs",
  },
  md: {
    container: "min-w-64 text-sm",
    header: "px-4 py-3 text-sm font-semibold",
    body: "px-4 py-3 text-sm",
    footer: "px-4 py-2.5 text-sm",
  },
  lg: {
    container: "min-w-80 text-base",
    header: "px-5 py-3.5 text-base font-semibold",
    body: "px-5 py-4 text-base",
    footer: "px-5 py-3 text-base",
  },
  xl: {
    container: "min-w-96 text-lg",
    header: "px-6 py-4 text-lg font-semibold",
    body: "px-6 py-5 text-lg",
    footer: "px-6 py-4 text-lg",
  },
};

export const radiusConfig: Record<PopoverRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-3xl",
};
