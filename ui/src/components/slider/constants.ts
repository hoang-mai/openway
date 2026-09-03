import { SliderColor, SliderRadius, SliderSize, SliderVariant } from "./types";
import { TooltipSize } from "../tooltip/types";

export interface SliderSizeStyle {
  trackHorizontal: string;
  trackVertical: string;
  thumb: string;
  thumbSizePx: number;
  label: string;
  value: string;
  helper: string;
  markText: string;
  gap: string;
  stepDot: string;
  tooltipSize: TooltipSize;
}

export const sizeConfig: Record<SliderSize, SliderSizeStyle> = {
  xs: {
    trackHorizontal: "h-1",
    trackVertical: "w-1",
    thumb: "w-3 h-3",
    thumbSizePx: 12,
    label: "text-xs font-medium",
    value: "text-xs font-semibold",
    helper: "text-[11px]",
    markText: "text-[10px]",
    gap: "gap-1",
    stepDot: "w-1 h-1",
    tooltipSize: "xs",
  },
  sm: {
    trackHorizontal: "h-1.5",
    trackVertical: "w-1.5",
    thumb: "w-4 h-4",
    thumbSizePx: 16,
    label: "text-xs font-medium",
    value: "text-xs font-semibold",
    helper: "text-xs",
    markText: "text-[11px]",
    gap: "gap-1.5",
    stepDot: "w-1.5 h-1.5",
    tooltipSize: "xs",
  },
  md: {
    trackHorizontal: "h-2",
    trackVertical: "w-2",
    thumb: "w-5 h-5",
    thumbSizePx: 20,
    label: "text-sm font-medium",
    value: "text-sm font-semibold",
    helper: "text-xs",
    markText: "text-xs",
    gap: "gap-2",
    stepDot: "w-2 h-2",
    tooltipSize: "sm",
  },
  lg: {
    trackHorizontal: "h-2.5",
    trackVertical: "w-2.5",
    thumb: "w-6 h-6",
    thumbSizePx: 24,
    label: "text-base font-medium",
    value: "text-base font-semibold",
    helper: "text-sm",
    markText: "text-xs",
    gap: "gap-2.5",
    stepDot: "w-2.5 h-2.5",
    tooltipSize: "md",
  },
  xl: {
    trackHorizontal: "h-3",
    trackVertical: "w-3",
    thumb: "w-7 h-7",
    thumbSizePx: 28,
    label: "text-lg font-medium",
    value: "text-lg font-semibold",
    helper: "text-sm",
    markText: "text-sm",
    gap: "gap-3",
    stepDot: "w-3 h-3",
    tooltipSize: "md",
  },
};

export const radiusConfig: Record<SliderRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export interface SliderStyleEntry {
  track: string;
  filler: string;
  thumb: string;
}

export const variantColorConfig: Record<SliderVariant, Record<SliderColor, SliderStyleEntry>> = {
  filled: {
    primary: {
      track: "bg-neutral-200 dark:bg-neutral-700",
      filler: "bg-primary-500 dark:bg-primary-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-primary-500 text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500/50 shadow-sm",
    },
    secondary: {
      track: "bg-neutral-200 dark:bg-neutral-700",
      filler: "bg-secondary-500 dark:bg-secondary-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-secondary-500 text-secondary-600 focus-visible:ring-2 focus-visible:ring-secondary-500/50 shadow-sm",
    },
    error: {
      track: "bg-neutral-200 dark:bg-neutral-700",
      filler: "bg-error-500 dark:bg-error-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-error-500 text-error-600 focus-visible:ring-2 focus-visible:ring-error-500/50 shadow-sm",
    },
    success: {
      track: "bg-neutral-200 dark:bg-neutral-700",
      filler: "bg-success-500 dark:bg-success-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-success-500 text-success-600 focus-visible:ring-2 focus-visible:ring-success-500/50 shadow-sm",
    },
    warning: {
      track: "bg-neutral-200 dark:bg-neutral-700",
      filler: "bg-warning-500 dark:bg-warning-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-warning-500 text-warning-600 focus-visible:ring-2 focus-visible:ring-warning-500/50 shadow-sm",
    },
    info: {
      track: "bg-neutral-200 dark:bg-neutral-700",
      filler: "bg-info-500 dark:bg-info-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-info-500 text-info-600 focus-visible:ring-2 focus-visible:ring-info-500/50 shadow-sm",
    },
    neutral: {
      track: "bg-neutral-200 dark:bg-neutral-700",
      filler: "bg-neutral-800 dark:bg-neutral-200",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-neutral-800 dark:border-neutral-200 text-neutral-800 dark:text-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-500/50 shadow-sm",
    },
  },

  soft: {
    primary: {
      track: "bg-primary-100 dark:bg-primary-950/40",
      filler: "bg-primary-400 dark:bg-primary-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-primary-400 text-primary-500 focus-visible:ring-2 focus-visible:ring-primary-400/50 shadow-sm",
    },
    secondary: {
      track: "bg-secondary-100 dark:bg-secondary-950/40",
      filler: "bg-secondary-400 dark:bg-secondary-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-secondary-400 text-secondary-500 focus-visible:ring-2 focus-visible:ring-secondary-400/50 shadow-sm",
    },
    error: {
      track: "bg-error-100 dark:bg-error-950/40",
      filler: "bg-error-400 dark:bg-error-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-error-400 text-error-500 focus-visible:ring-2 focus-visible:ring-error-400/50 shadow-sm",
    },
    success: {
      track: "bg-success-100 dark:bg-success-950/40",
      filler: "bg-success-400 dark:bg-success-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-success-400 text-success-500 focus-visible:ring-2 focus-visible:ring-success-400/50 shadow-sm",
    },
    warning: {
      track: "bg-warning-100 dark:bg-warning-950/40",
      filler: "bg-warning-400 dark:bg-warning-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-warning-400 text-warning-500 focus-visible:ring-2 focus-visible:ring-warning-400/50 shadow-sm",
    },
    info: {
      track: "bg-info-100 dark:bg-info-950/40",
      filler: "bg-info-400 dark:bg-info-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-info-400 text-info-500 focus-visible:ring-2 focus-visible:ring-info-400/50 shadow-sm",
    },
    neutral: {
      track: "bg-neutral-200 dark:bg-neutral-800",
      filler: "bg-neutral-600 dark:bg-neutral-400",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-neutral-600 dark:border-neutral-400 text-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-400/50 shadow-sm",
    },
  },

  outline: {
    primary: {
      track: "bg-transparent border border-neutral-300 dark:border-neutral-700",
      filler: "bg-primary-500 dark:bg-primary-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-primary-500 text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500/50 shadow-sm",
    },
    secondary: {
      track: "bg-transparent border border-neutral-300 dark:border-neutral-700",
      filler: "bg-secondary-500 dark:bg-secondary-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-secondary-500 text-secondary-600 focus-visible:ring-2 focus-visible:ring-secondary-500/50 shadow-sm",
    },
    error: {
      track: "bg-transparent border border-neutral-300 dark:border-neutral-700",
      filler: "bg-error-500 dark:bg-error-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-error-500 text-error-600 focus-visible:ring-2 focus-visible:ring-error-500/50 shadow-sm",
    },
    success: {
      track: "bg-transparent border border-neutral-300 dark:border-neutral-700",
      filler: "bg-success-500 dark:bg-success-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-success-500 text-success-600 focus-visible:ring-2 focus-visible:ring-success-500/50 shadow-sm",
    },
    warning: {
      track: "bg-transparent border border-neutral-300 dark:border-neutral-700",
      filler: "bg-warning-500 dark:bg-warning-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-warning-500 text-warning-600 focus-visible:ring-2 focus-visible:ring-warning-500/50 shadow-sm",
    },
    info: {
      track: "bg-transparent border border-neutral-300 dark:border-neutral-700",
      filler: "bg-info-500 dark:bg-info-500",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-info-500 text-info-600 focus-visible:ring-2 focus-visible:ring-info-500/50 shadow-sm",
    },
    neutral: {
      track: "bg-transparent border border-neutral-300 dark:border-neutral-700",
      filler: "bg-neutral-800 dark:bg-neutral-200",
      thumb:
        "bg-white dark:bg-neutral-900 border-2 border-neutral-800 dark:border-neutral-200 text-neutral-800 dark:text-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-500/50 shadow-sm",
    },
  },

  other: {
    primary: { track: "", filler: "", thumb: "" },
    secondary: { track: "", filler: "", thumb: "" },
    error: { track: "", filler: "", thumb: "" },
    success: { track: "", filler: "", thumb: "" },
    warning: { track: "", filler: "", thumb: "" },
    info: { track: "", filler: "", thumb: "" },
    neutral: { track: "", filler: "", thumb: "" },
  },
};


