import { CollapseSize, CollapseVariant, CollapseRadius, CollapseColor } from "./types";

export const sizeConfig: Record<
  CollapseSize,
  {
    header: string;
    content: string;
    title: string;
    description: string;
    icon: string;
    startIcon: string;
    gap: string;
  }
> = {
  sm: {
    header: "py-2.5 px-3.5 text-sm",
    content: "px-3.5 pb-3 text-sm text-neutral-700 leading-relaxed",
    title: "font-medium leading-snug",
    description: "text-xs text-neutral-600 mt-0.5",
    icon: "size-4",
    startIcon: "size-4",
    gap: "gap-2.5",
  },
  md: {
    header: "py-3.5 px-4 text-base",
    content: "px-4 pb-4 text-sm text-neutral-700 leading-relaxed",
    title: "font-semibold leading-snug",
    description: "text-xs text-neutral-600 mt-1",
    icon: "size-4.5",
    startIcon: "size-4.5",
    gap: "gap-3",
  },
  lg: {
    header: "py-4.5 px-5 text-lg",
    content: "px-5 pb-5 text-base text-neutral-700 leading-relaxed",
    title: "font-semibold leading-snug",
    description: "text-sm text-neutral-600 mt-1",
    icon: "size-5",
    startIcon: "size-5",
    gap: "gap-3.5",
  },
};

export const radiusConfig: Record<CollapseRadius, string> = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  full: "rounded-3xl",
};

export const variantContainerConfig: Record<
  Exclude<CollapseVariant, "other">,
  Record<CollapseColor, string>
> = {
  outlined: {
    primary:
      "border border-primary-200 dark:border-primary-800/60 bg-neutral-white divide-y divide-primary-100 dark:divide-primary-900/50 overflow-hidden",
    secondary:
      "border border-secondary-200 dark:border-secondary-800/60 bg-neutral-white divide-y divide-secondary-100 dark:divide-secondary-900/50 overflow-hidden",
    neutral:
      "border border-neutral-200 dark:border-neutral-300/80 bg-neutral-white divide-y divide-neutral-200 dark:divide-neutral-300/80 overflow-hidden",
    error:
      "border border-error-200 dark:border-error-800/60 bg-neutral-white divide-y divide-error-100 dark:divide-error-900/50 overflow-hidden",
    success:
      "border border-success-200 dark:border-success-800/60 bg-neutral-white divide-y divide-success-100 dark:divide-success-900/50 overflow-hidden",
    warning:
      "border border-warning-200 dark:border-warning-800/60 bg-neutral-white divide-y divide-warning-100 dark:divide-warning-900/50 overflow-hidden",
    info:
      "border border-info-200 dark:border-info-800/60 bg-neutral-white divide-y divide-info-100 dark:divide-info-900/50 overflow-hidden",
  },
  filled: {
    primary:
      "bg-primary-50/40 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-900/40 divide-y divide-primary-100/80 dark:divide-primary-900/40 overflow-hidden",
    secondary:
      "bg-secondary-50/40 dark:bg-secondary-950/30 border border-secondary-100 dark:border-secondary-900/40 divide-y divide-secondary-100/80 dark:divide-secondary-900/40 overflow-hidden",
    neutral:
      "bg-neutral-50 dark:bg-neutral-50/60 border border-neutral-200/60 dark:border-neutral-300/60 divide-y divide-neutral-200/60 dark:divide-neutral-300/60 overflow-hidden",
    error:
      "bg-error-50/40 dark:bg-error-950/30 border border-error-100 dark:border-error-900/40 divide-y divide-error-100/80 dark:divide-error-900/40 overflow-hidden",
    success:
      "bg-success-50/40 dark:bg-success-950/30 border border-success-100 dark:border-success-900/40 divide-y divide-success-100/80 dark:divide-success-900/40 overflow-hidden",
    warning:
      "bg-warning-50/40 dark:bg-warning-950/30 border border-warning-100 dark:border-warning-900/40 divide-y divide-warning-100/80 dark:divide-warning-900/40 overflow-hidden",
    info:
      "bg-info-50/40 dark:bg-info-950/30 border border-info-100 dark:border-info-900/40 divide-y divide-info-100/80 dark:divide-info-900/40 overflow-hidden",
  },
  separated: {
    primary: "bg-transparent border-0 space-y-3",
    secondary: "bg-transparent border-0 space-y-3",
    neutral: "bg-transparent border-0 space-y-3",
    error: "bg-transparent border-0 space-y-3",
    success: "bg-transparent border-0 space-y-3",
    warning: "bg-transparent border-0 space-y-3",
    info: "bg-transparent border-0 space-y-3",
  },
  ghost: {
    primary: "bg-transparent border-0 divide-y divide-neutral-200/70 dark:divide-neutral-300/60",
    secondary: "bg-transparent border-0 divide-y divide-neutral-200/70 dark:divide-neutral-300/60",
    neutral: "bg-transparent border-0 divide-y divide-neutral-200/70 dark:divide-neutral-300/60",
    error: "bg-transparent border-0 divide-y divide-neutral-200/70 dark:divide-neutral-300/60",
    success: "bg-transparent border-0 divide-y divide-neutral-200/70 dark:divide-neutral-300/60",
    warning: "bg-transparent border-0 divide-y divide-neutral-200/70 dark:divide-neutral-300/60",
    info: "bg-transparent border-0 divide-y divide-neutral-200/70 dark:divide-neutral-300/60",
  },
};

export const variantPanelConfig: Record<
  Exclude<CollapseVariant, "other">,
  Record<CollapseColor, string>
> = {
  outlined: { primary: "", secondary: "", neutral: "", error: "", success: "", warning: "", info: "" },
  filled: { primary: "", secondary: "", neutral: "", error: "", success: "", warning: "", info: "" },
  ghost: { primary: "", secondary: "", neutral: "", error: "", success: "", warning: "", info: "" },
  separated: {
    primary:
      "bg-neutral-white border border-primary-200 dark:border-primary-800/60 shadow-xs dark:shadow-none overflow-hidden",
    secondary:
      "bg-neutral-white border border-secondary-200 dark:border-secondary-800/60 shadow-xs dark:shadow-none overflow-hidden",
    neutral:
      "bg-neutral-white border border-neutral-200 dark:border-neutral-300/80 shadow-xs dark:shadow-none overflow-hidden",
    error:
      "bg-neutral-white border border-error-200 dark:border-error-800/60 shadow-xs dark:shadow-none overflow-hidden",
    success:
      "bg-neutral-white border border-success-200 dark:border-success-800/60 shadow-xs dark:shadow-none overflow-hidden",
    warning:
      "bg-neutral-white border border-warning-200 dark:border-warning-800/60 shadow-xs dark:shadow-none overflow-hidden",
    info:
      "bg-neutral-white border border-info-200 dark:border-info-800/60 shadow-xs dark:shadow-none overflow-hidden",
  },
};

export const variantHeaderConfig: Record<
  Exclude<CollapseVariant, "other">,
  Record<CollapseColor, string>
> = {
  outlined: {
    primary: "bg-primary-50/40 hover:bg-primary-50/70 dark:bg-primary-950/40 dark:hover:bg-primary-950/60",
    secondary: "bg-secondary-50/40 hover:bg-secondary-50/70 dark:bg-secondary-950/40 dark:hover:bg-secondary-950/60",
    neutral: "bg-neutral-50/80 hover:bg-neutral-100/80 dark:bg-neutral-50/80 dark:hover:bg-neutral-100/80",
    error: "bg-error-50/40 hover:bg-error-50/70 dark:bg-error-950/40 dark:hover:bg-error-950/60",
    success: "bg-success-50/40 hover:bg-success-50/70 dark:bg-success-950/40 dark:hover:bg-success-950/60",
    warning: "bg-warning-50/40 hover:bg-warning-50/70 dark:bg-warning-950/40 dark:hover:bg-warning-950/60",
    info: "bg-info-50/40 hover:bg-info-50/70 dark:bg-info-950/40 dark:hover:bg-info-950/60",
  },
  filled: {
    primary: "bg-primary-50/80 hover:bg-primary-100/70 dark:bg-primary-950/60 dark:hover:bg-primary-900/50",
    secondary: "bg-secondary-50/80 hover:bg-secondary-100/70 dark:bg-secondary-950/60 dark:hover:bg-secondary-900/50",
    neutral: "bg-neutral-100/70 hover:bg-neutral-200/60 dark:bg-neutral-100/70 dark:hover:bg-neutral-200/60",
    error: "bg-error-50/80 hover:bg-error-100/70 dark:bg-error-950/60 dark:hover:bg-error-900/50",
    success: "bg-success-50/80 hover:bg-success-100/70 dark:bg-success-950/60 dark:hover:bg-success-900/50",
    warning: "bg-warning-50/80 hover:bg-warning-100/70 dark:bg-warning-950/60 dark:hover:bg-warning-900/50",
    info: "bg-info-50/80 hover:bg-info-100/70 dark:bg-info-950/60 dark:hover:bg-info-900/50",
  },
  separated: {
    primary: "bg-primary-50/40 hover:bg-primary-50/70 dark:bg-primary-950/40 dark:hover:bg-primary-950/60",
    secondary: "bg-secondary-50/40 hover:bg-secondary-50/70 dark:bg-secondary-950/40 dark:hover:bg-secondary-950/60",
    neutral: "bg-neutral-50/80 hover:bg-neutral-100/80 dark:bg-neutral-50/80 dark:hover:bg-neutral-100/80",
    error: "bg-error-50/40 hover:bg-error-50/70 dark:bg-error-950/40 dark:hover:bg-error-950/60",
    success: "bg-success-50/40 hover:bg-success-50/70 dark:bg-success-950/40 dark:hover:bg-success-950/60",
    warning: "bg-warning-50/40 hover:bg-warning-50/70 dark:bg-warning-950/40 dark:hover:bg-warning-950/60",
    info: "bg-info-50/40 hover:bg-info-50/70 dark:bg-info-950/40 dark:hover:bg-info-950/60",
  },
  ghost: {
    primary: "bg-transparent hover:bg-primary-50/50 dark:hover:bg-primary-950/30",
    secondary: "bg-transparent hover:bg-secondary-50/50 dark:hover:bg-secondary-950/30",
    neutral: "bg-transparent hover:bg-neutral-100/50 dark:hover:bg-neutral-100/50",
    error: "bg-transparent hover:bg-error-50/50 dark:hover:bg-error-950/30",
    success: "bg-transparent hover:bg-success-50/50 dark:hover:bg-success-950/30",
    warning: "bg-transparent hover:bg-warning-50/50 dark:hover:bg-warning-950/30",
    info: "bg-transparent hover:bg-info-50/50 dark:hover:bg-info-950/30",
  },
};

export const colorConfig: Record<
  CollapseColor,
  {
    focusRing: string;
    title: string;
    activeIndicator: string;
  }
> = {
  primary: {
    focusRing: "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
    title: "text-primary-700 dark:text-primary-300",
    activeIndicator: "text-primary-600 dark:text-primary-400",
  },
  secondary: {
    focusRing: "focus-visible:ring-secondary-500 dark:focus-visible:ring-secondary-400",
    title: "text-secondary-700 dark:text-secondary-300",
    activeIndicator: "text-secondary-600 dark:text-secondary-400",
  },
  neutral: {
    focusRing: "focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-400",
    title: "text-neutral-900",
    activeIndicator: "text-neutral-700",
  },
  error: {
    focusRing: "focus-visible:ring-error-500 dark:focus-visible:ring-error-400",
    title: "text-error-700 dark:text-error-300",
    activeIndicator: "text-error-600 dark:text-error-400",
  },
  success: {
    focusRing: "focus-visible:ring-success-500 dark:focus-visible:ring-success-400",
    title: "text-success-700 dark:text-success-300",
    activeIndicator: "text-success-600 dark:text-success-400",
  },
  warning: {
    focusRing: "focus-visible:ring-warning-500 dark:focus-visible:ring-warning-400",
    title: "text-warning-700 dark:text-warning-300",
    activeIndicator: "text-warning-600 dark:text-warning-400",
  },
  info: {
    focusRing: "focus-visible:ring-info-500 dark:focus-visible:ring-info-400",
    title: "text-info-700 dark:text-info-300",
    activeIndicator: "text-info-600 dark:text-info-400",
  },
};
