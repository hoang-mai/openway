import { BadgeSize, BadgeVariant, BadgeColor, BadgeRadius } from "./types";

export const sizeConfig: Record<
  BadgeSize,
  {
    badge: string;
    icon: string;
    dot: string;
    deleteIcon: string;
  }
> = {
  xs: {
    badge: "h-5 px-2 text-[11px] gap-1",
    icon: "size-3",
    dot: "size-1.5",
    deleteIcon: "size-3",
  },
  sm: {
    badge: "h-6 px-2.5 text-xs gap-1.5",
    icon: "size-3.5",
    dot: "size-1.5",
    deleteIcon: "size-3.5",
  },
  md: {
    badge: "h-7 px-3 text-xs font-medium gap-1.5",
    icon: "size-3.5",
    dot: "w-2 h-2",
    deleteIcon: "size-3.5",
  },
  lg: {
    badge: "h-8 px-3.5 text-sm font-medium gap-2",
    icon: "size-4",
    dot: "size-2.5",
    deleteIcon: "size-4",
  },
  xl: {
    badge: "h-9 px-4 text-sm font-semibold gap-2",
    icon: "size-4.5",
    dot: "size-2.5",
    deleteIcon: "size-4.5",
  },
};

export const radiusConfig: Record<BadgeRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const dotColorConfig: Record<BadgeColor, string> = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  error: "bg-error-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  info: "bg-info-500",
  neutral: "bg-neutral-500",
};

export const variantColorConfig: Record<Exclude<BadgeVariant, "other">, Record<BadgeColor, string>> = {
  soft: {
    primary: "bg-primary-100 text-primary-800 border-primary-200 hover:bg-primary-200",
    secondary: "bg-secondary-100 text-secondary-800 border-secondary-200 hover:bg-secondary-200",
    error: "bg-error-100 text-error-800 border-error-200 hover:bg-error-200",
    success: "bg-success-100 text-success-800 border-success-200 hover:bg-success-200",
    warning: "bg-warning-100 text-warning-800 border-warning-200 hover:bg-warning-200",
    info: "bg-info-100 text-info-800 border-info-200 hover:bg-info-200",
    neutral: "bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-200",
  },
  filled: {
    primary: "bg-primary-500 text-neutral-white border-transparent hover:bg-primary-600 active:bg-primary-700",
    secondary: "bg-secondary-500 text-neutral-white border-transparent hover:bg-secondary-600 active:bg-secondary-700",
    error: "bg-error-500 text-neutral-white border-transparent hover:bg-error-600 active:bg-error-700",
    success: "bg-success-500 text-neutral-white border-transparent hover:bg-success-600 active:bg-success-700",
    warning: "bg-warning-500 text-neutral-950 border-transparent hover:bg-warning-600 active:bg-warning-700",
    info: "bg-info-500 text-neutral-white border-transparent hover:bg-info-600 active:bg-info-700",
    neutral: "bg-neutral-800 text-neutral-white border-transparent hover:bg-neutral-900 active:bg-neutral-950",
  },
  outline: {
    primary: "bg-transparent text-primary-700 border-2 border-primary-400 hover:bg-primary-50/70",
    secondary: "bg-transparent text-secondary-800 border-2 border-secondary-400 hover:bg-secondary-50/70",
    error: "bg-transparent text-error-700 border-2 border-error-400 hover:bg-error-50/70",
    success: "bg-transparent text-success-700 border-2 border-success-400 hover:bg-success-50/70",
    warning: "bg-transparent text-warning-800 border-2 border-warning-400 hover:bg-warning-50/70",
    info: "bg-transparent text-info-800 border-2 border-info-400 hover:bg-info-50/70",
    neutral: "bg-transparent text-neutral-700 border-2 border-neutral-300 hover:bg-neutral-100/70",
  },
  ghost: {
    primary: "bg-transparent text-primary-700 border-transparent hover:bg-primary-50",
    secondary: "bg-transparent text-secondary-800 border-transparent hover:bg-secondary-50",
    error: "bg-transparent text-error-700 border-transparent hover:bg-error-50",
    success: "bg-transparent text-success-700 border-transparent hover:bg-success-50",
    warning: "bg-transparent text-warning-800 border-transparent hover:bg-warning-50",
    info: "bg-transparent text-info-800 border-transparent hover:bg-info-50",
    neutral: "bg-transparent text-neutral-700 border-transparent hover:bg-neutral-50",
  },
};
