import { TooltipSize, TooltipVariant, TooltipColor, TooltipRadius } from "./types";

export const sizeConfig: Record<
  TooltipSize,
  {
    box: string;
    arrowWidth: number;
    arrowHeight: number;
  }
> = {
  xs: {
    box: "px-2 py-0.5 text-[11px] leading-tight font-medium",
    arrowWidth: 8,
    arrowHeight: 4,
  },
  sm: {
    box: "px-2.5 py-1 text-xs leading-tight font-medium",
    arrowWidth: 10,
    arrowHeight: 5,
  },
  md: {
    box: "px-3 py-1.5 text-xs leading-normal font-medium",
    arrowWidth: 12,
    arrowHeight: 6,
  },
  lg: {
    box: "px-3.5 py-2 text-sm leading-normal font-medium",
    arrowWidth: 14,
    arrowHeight: 7,
  },
  xl: {
    box: "px-4 py-2.5 text-base leading-normal font-semibold",
    arrowWidth: 16,
    arrowHeight: 8,
  },
};

export const radiusConfig: Record<TooltipRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const variantColorConfig: Record<Exclude<TooltipVariant, "other">, Record<TooltipColor, string>> = {
  filled: {
    primary: "bg-primary-500 text-neutral-white border border-transparent shadow-md",
    secondary: "bg-secondary-500 text-neutral-white border border-transparent shadow-md",
    error: "bg-error-500 text-neutral-white border border-transparent shadow-md",
    success: "bg-success-500 text-neutral-white border border-transparent shadow-md",
    warning: "bg-warning-500 text-neutral-950 border border-transparent shadow-md",
    info: "bg-info-500 text-neutral-white border border-transparent shadow-md",
    neutral: "bg-neutral-800 text-neutral-white border border-transparent shadow-md",
  },
  soft: {
    primary: "bg-primary-100 text-primary-800 border border-primary-200 shadow-sm",
    secondary: "bg-secondary-100 text-secondary-800 border border-secondary-200 shadow-sm",
    error: "bg-error-100 text-error-800 border border-error-200 shadow-sm",
    success: "bg-success-100 text-success-800 border border-success-200 shadow-sm",
    warning: "bg-warning-100 text-warning-800 border border-warning-200 shadow-sm",
    info: "bg-info-100 text-info-800 border border-info-200 shadow-sm",
    neutral: "bg-neutral-100 text-neutral-800 border border-neutral-200 shadow-sm",
  },
  outline: {
    primary: "bg-neutral-white text-primary-700 border border-primary-300 shadow-xs",
    secondary: "bg-neutral-white text-secondary-800 border border-secondary-300 shadow-xs",
    error: "bg-neutral-white text-error-700 border border-error-300 shadow-xs",
    success: "bg-neutral-white text-success-700 border border-success-300 shadow-xs",
    warning: "bg-neutral-white text-warning-800 border border-warning-300 shadow-xs",
    info: "bg-neutral-white text-info-800 border border-info-300 shadow-xs",
    neutral: "bg-neutral-white text-neutral-800 border border-neutral-200 shadow-xs",
  },
};

export const arrowColorConfig: Record<Exclude<TooltipVariant, "other">, Record<TooltipColor, string>> = {
  filled: {
    primary: "fill-primary-500",
    secondary: "fill-secondary-500",
    error: "fill-error-500",
    success: "fill-success-500",
    warning: "fill-warning-500",
    info: "fill-info-500",
    neutral: "fill-neutral-800",
  },
  soft: {
    primary: "fill-primary-100 stroke-primary-200",
    secondary: "fill-secondary-100 stroke-secondary-200",
    error: "fill-error-100 stroke-error-200",
    success: "fill-success-100 stroke-success-200",
    warning: "fill-warning-100 stroke-warning-200",
    info: "fill-info-100 stroke-info-200",
    neutral: "fill-neutral-100 stroke-neutral-200",
  },
  outline: {
    primary: "fill-neutral-white stroke-primary-300",
    secondary: "fill-neutral-white stroke-secondary-300",
    error: "fill-neutral-white stroke-error-300",
    success: "fill-neutral-white stroke-success-300",
    warning: "fill-neutral-white stroke-warning-300",
    info: "fill-neutral-white stroke-info-300",
    neutral: "fill-neutral-white stroke-neutral-200",
  },
};
