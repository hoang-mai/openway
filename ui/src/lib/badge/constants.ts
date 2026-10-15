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
    badge: "h-5 px-2 text-[0.6875rem] gap-1",
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
  default: "bg-ui-default",
  gray: "bg-ui-gray",
  brown: "bg-ui-brown",
  orange: "bg-ui-orange",
  yellow: "bg-ui-yellow",
  green: "bg-ui-green",
  blue: "bg-ui-blue",
  purple: "bg-ui-purple",
  pink: "bg-ui-pink",
  red: "bg-ui-red",
};

export const variantColorConfig: Record<Exclude<BadgeVariant, "other">, Record<BadgeColor, string>> = {
  soft: {
    primary:
      "bg-primary-50 text-primary-700 border border-primary-200/60 hover:bg-primary-100/70 dark:bg-primary-950/60 dark:text-primary-300 dark:border-primary-800/60 dark:hover:bg-primary-900/50",
    secondary:
      "bg-secondary-50 text-secondary-700 border border-secondary-200/60 hover:bg-secondary-100/70 dark:bg-secondary-950/60 dark:text-secondary-300 dark:border-secondary-800/60 dark:hover:bg-secondary-900/50",
    error:
      "bg-error-50 text-error-700 border border-error-200/60 hover:bg-error-100/70 dark:bg-error-950/60 dark:text-error-300 dark:border-error-800/60 dark:hover:bg-error-900/50",
    success:
      "bg-success-50 text-success-700 border border-success-200/60 hover:bg-success-100/70 dark:bg-success-950/60 dark:text-success-300 dark:border-success-800/60 dark:hover:bg-success-900/50",
    warning:
      "bg-warning-50 text-warning-800 border border-warning-200/60 hover:bg-warning-100/70 dark:bg-warning-950/60 dark:text-warning-300 dark:border-warning-800/60 dark:hover:bg-warning-900/50",
    info:
      "bg-info-50 text-info-700 border border-info-200/60 hover:bg-info-100/70 dark:bg-info-950/60 dark:text-info-300 dark:border-info-800/60 dark:hover:bg-info-900/50",
    neutral:
      "bg-neutral-100 text-neutral-700 border border-neutral-200/60 hover:bg-neutral-200 dark:bg-neutral-50/80 dark:text-neutral-700 dark:border-neutral-200/60 dark:hover:bg-neutral-100/80",
    default: "bg-ui-bg-default text-ui-default border border-ui-default/20 hover:bg-ui-bg-default/80",
    gray: "bg-ui-bg-gray text-ui-gray border border-ui-gray/20 hover:bg-ui-bg-gray/80",
    brown: "bg-ui-bg-brown text-ui-brown border border-ui-brown/20 hover:bg-ui-bg-brown/80",
    orange: "bg-ui-bg-orange text-ui-orange border border-ui-orange/20 hover:bg-ui-bg-orange/80",
    yellow: "bg-ui-bg-yellow text-ui-yellow border border-ui-yellow/20 hover:bg-ui-bg-yellow/80",
    green: "bg-ui-bg-green text-ui-green border border-ui-green/20 hover:bg-ui-bg-green/80",
    blue: "bg-ui-bg-blue text-ui-blue border border-ui-blue/20 hover:bg-ui-bg-blue/80",
    purple: "bg-ui-bg-purple text-ui-purple border border-ui-purple/20 hover:bg-ui-bg-purple/80",
    pink: "bg-ui-bg-pink text-ui-pink border border-ui-pink/20 hover:bg-ui-bg-pink/80",
    red: "bg-ui-bg-red text-ui-red border border-ui-red/20 hover:bg-ui-bg-red/80",
  },
  filled: {
    primary: "bg-primary-600 text-white border-transparent hover:bg-primary-700 active:bg-primary-800",
    secondary: "bg-secondary-500 text-white border-transparent hover:bg-secondary-600 active:bg-secondary-700",
    error: "bg-error-500 text-white border-transparent hover:bg-error-600 active:bg-error-700",
    success: "bg-success-500 text-white border-transparent hover:bg-success-600 active:bg-success-700",
    warning: "bg-warning-500 text-white border-transparent hover:bg-warning-600 active:bg-warning-700",
    info: "bg-info-700 text-white border-transparent hover:bg-info-800 active:bg-info-900",
    neutral:
      "bg-neutral-800 text-neutral-white border-transparent hover:bg-neutral-900 active:bg-neutral-950 dark:bg-neutral-200 dark:text-neutral-900",
    default: "bg-ui-default text-white dark:text-neutral-50 border-transparent hover:opacity-90 active:opacity-80",
    gray: "bg-ui-gray text-white dark:text-neutral-950 border-transparent hover:opacity-90 active:opacity-80",
    brown: "bg-ui-brown text-white dark:text-neutral-950 border-transparent hover:opacity-90 active:opacity-80",
    orange: "bg-ui-orange text-white dark:text-neutral-950 border-transparent hover:opacity-90 active:opacity-80",
    yellow: "bg-ui-yellow text-white border-transparent hover:opacity-90 active:opacity-80",
    green: "bg-ui-green text-white dark:text-neutral-950 border-transparent hover:opacity-90 active:opacity-80",
    blue: "bg-ui-blue text-white dark:text-neutral-950 border-transparent hover:opacity-90 active:opacity-80",
    purple: "bg-ui-purple text-white dark:text-neutral-950 border-transparent hover:opacity-90 active:opacity-80",
    pink: "bg-ui-pink text-white dark:text-neutral-950 border-transparent hover:opacity-90 active:opacity-80",
    red: "bg-ui-red text-white dark:text-neutral-950 border-transparent hover:opacity-90 active:opacity-80",
  },
  outline: {
    primary:
      "bg-transparent text-primary-700 border border-primary-300 hover:bg-primary-50/70 dark:text-primary-300 dark:border-primary-700 dark:hover:bg-primary-950/50",
    secondary:
      "bg-transparent text-secondary-700 border border-secondary-300 hover:bg-secondary-50/70 dark:text-secondary-300 dark:border-secondary-700 dark:hover:bg-secondary-950/50",
    error:
      "bg-transparent text-error-700 border border-error-300 hover:bg-error-50/70 dark:text-error-300 dark:border-error-700 dark:hover:bg-error-950/50",
    success:
      "bg-transparent text-success-700 border border-success-300 hover:bg-success-50/70 dark:text-success-300 dark:border-success-700 dark:hover:bg-success-950/50",
    warning:
      "bg-transparent text-warning-800 border border-warning-300 hover:bg-warning-50/70 dark:text-warning-300 dark:border-warning-700 dark:hover:bg-warning-950/50",
    info:
      "bg-transparent text-info-700 border border-info-300 hover:bg-info-50/70 dark:text-info-300 dark:border-info-700 dark:hover:bg-info-950/50",
    neutral:
      "bg-transparent text-neutral-700 border border-neutral-300 hover:bg-neutral-100/70 dark:text-neutral-700 dark:border-neutral-300/80 dark:hover:bg-neutral-100/20",
    default: "bg-transparent text-ui-default border border-ui-default/40 hover:bg-ui-bg-default",
    gray: "bg-transparent text-ui-gray border border-ui-gray/40 hover:bg-ui-bg-gray",
    brown: "bg-transparent text-ui-brown border border-ui-brown/40 hover:bg-ui-bg-brown",
    orange: "bg-transparent text-ui-orange border border-ui-orange/40 hover:bg-ui-bg-orange",
    yellow: "bg-transparent text-ui-yellow border border-ui-yellow/40 hover:bg-ui-bg-yellow",
    green: "bg-transparent text-ui-green border border-ui-green/40 hover:bg-ui-bg-green",
    blue: "bg-transparent text-ui-blue border border-ui-blue/40 hover:bg-ui-bg-blue",
    purple: "bg-transparent text-ui-purple border border-ui-purple/40 hover:bg-ui-bg-purple",
    pink: "bg-transparent text-ui-pink border border-ui-pink/40 hover:bg-ui-bg-pink",
    red: "bg-transparent text-ui-red border border-ui-red/40 hover:bg-ui-bg-red",
  },
  ghost: {
    primary:
      "bg-transparent text-primary-700 border-transparent hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-primary-950/50",
    secondary:
      "bg-transparent text-secondary-700 border-transparent hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-950/50",
    error:
      "bg-transparent text-error-700 border-transparent hover:bg-error-50 dark:text-error-300 dark:hover:bg-error-950/50",
    success:
      "bg-transparent text-success-700 border-transparent hover:bg-success-50 dark:text-success-300 dark:hover:bg-success-950/50",
    warning:
      "bg-transparent text-warning-800 border-transparent hover:bg-warning-50 dark:text-warning-300 dark:hover:bg-warning-950/50",
    info:
      "bg-transparent text-info-700 border-transparent hover:bg-info-50 dark:text-info-300 dark:hover:bg-info-950/50",
    neutral:
      "bg-transparent text-neutral-700 border-transparent hover:bg-neutral-50 dark:text-neutral-700 dark:hover:bg-neutral-50/20",
    default: "bg-transparent text-ui-default border-transparent hover:bg-ui-bg-default",
    gray: "bg-transparent text-ui-gray border-transparent hover:bg-ui-bg-gray",
    brown: "bg-transparent text-ui-brown border-transparent hover:bg-ui-bg-brown",
    orange: "bg-transparent text-ui-orange border-transparent hover:bg-ui-bg-orange",
    yellow: "bg-transparent text-ui-yellow border-transparent hover:bg-ui-bg-yellow",
    green: "bg-transparent text-ui-green border-transparent hover:bg-ui-bg-green",
    blue: "bg-transparent text-ui-blue border-transparent hover:bg-ui-bg-blue",
    purple: "bg-transparent text-ui-purple border-transparent hover:bg-ui-bg-purple",
    pink: "bg-transparent text-ui-pink border-transparent hover:bg-ui-bg-pink",
    red: "bg-transparent text-ui-red border-transparent hover:bg-ui-bg-red",
  },
};
