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
    content: "px-3.5 pb-3 text-sm text-neutral-600",
    title: "font-medium leading-snug",
    description: "text-xs text-neutral-500 mt-0.5",
    icon: "size-4",
    startIcon: "size-4",
    gap: "gap-2.5",
  },
  md: {
    header: "py-3.5 px-4 text-base",
    content: "px-4 pb-4 text-sm text-neutral-600",
    title: "font-semibold leading-snug",
    description: "text-xs text-neutral-500 mt-1",
    icon: "size-4.5",
    startIcon: "size-4.5",
    gap: "gap-3",
  },
  lg: {
    header: "py-4.5 px-5 text-lg",
    content: "px-5 pb-5 text-base text-neutral-600",
    title: "font-semibold leading-snug",
    description: "text-sm text-neutral-500 mt-1",
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
    primary: "border border-primary-200 bg-white divide-y divide-primary-100 overflow-hidden",
    secondary: "border border-secondary-200 bg-white divide-y divide-secondary-100 overflow-hidden",
    neutral: "border border-neutral-200 bg-white divide-y divide-neutral-200 overflow-hidden",
    error: "border border-error-200 bg-white divide-y divide-error-100 overflow-hidden",
    success: "border border-success-200 bg-white divide-y divide-success-100 overflow-hidden",
    warning: "border border-warning-200 bg-white divide-y divide-warning-100 overflow-hidden",
    info: "border border-info-200 bg-white divide-y divide-info-100 overflow-hidden",
  },
  filled: {
    primary: "bg-primary-50/40 border border-primary-100 divide-y divide-primary-100/80 overflow-hidden",
    secondary: "bg-secondary-50/40 border border-secondary-100 divide-y divide-secondary-100/80 overflow-hidden",
    neutral: "bg-neutral-50 border border-neutral-200/60 divide-y divide-neutral-200/60 overflow-hidden",
    error: "bg-error-50/40 border border-error-100 divide-y divide-error-100/80 overflow-hidden",
    success: "bg-success-50/40 border border-success-100 divide-y divide-success-100/80 overflow-hidden",
    warning: "bg-warning-50/40 border border-warning-100 divide-y divide-warning-100/80 overflow-hidden",
    info: "bg-info-50/40 border border-info-100 divide-y divide-info-100/80 overflow-hidden",
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
    primary: "bg-transparent border-0 divide-y divide-neutral-200/70",
    secondary: "bg-transparent border-0 divide-y divide-neutral-200/70",
    neutral: "bg-transparent border-0 divide-y divide-neutral-200/70",
    error: "bg-transparent border-0 divide-y divide-neutral-200/70",
    success: "bg-transparent border-0 divide-y divide-neutral-200/70",
    warning: "bg-transparent border-0 divide-y divide-neutral-200/70",
    info: "bg-transparent border-0 divide-y divide-neutral-200/70",
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
    primary: "bg-white border border-primary-200 shadow-xs overflow-hidden",
    secondary: "bg-white border border-secondary-200 shadow-xs overflow-hidden",
    neutral: "bg-white border border-neutral-200 shadow-xs overflow-hidden",
    error: "bg-white border border-error-200 shadow-xs overflow-hidden",
    success: "bg-white border border-success-200 shadow-xs overflow-hidden",
    warning: "bg-white border border-warning-200 shadow-xs overflow-hidden",
    info: "bg-white border border-info-200 shadow-xs overflow-hidden",
  },
};

export const variantHeaderConfig: Record<
  Exclude<CollapseVariant, "other">,
  Record<CollapseColor, string>
> = {
  outlined: {
    primary: "bg-primary-50/40",
    secondary: "bg-secondary-50/40",
    neutral: "bg-neutral-50/80",
    error: "bg-error-50/40",
    success: "bg-success-50/40",
    warning: "bg-warning-50/40",
    info: "bg-info-50/40",
  },
  filled: {
    primary: "bg-primary-50/80",
    secondary: "bg-secondary-50/80",
    neutral: "bg-neutral-100/70",
    error: "bg-error-50/80",
    success: "bg-success-50/80",
    warning: "bg-warning-50/80",
    info: "bg-info-50/80",
  },
  separated: {
    primary: "bg-primary-50/40",
    secondary: "bg-secondary-50/40",
    neutral: "bg-neutral-50/80",
    error: "bg-error-50/40",
    success: "bg-success-50/40",
    warning: "bg-warning-50/40",
    info: "bg-info-50/40",
  },
  ghost: {
    primary: "bg-transparent",
    secondary: "bg-transparent",
    neutral: "bg-transparent",
    error: "bg-transparent",
    success: "bg-transparent",
    warning: "bg-transparent",
    info: "bg-transparent",
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
    focusRing: "focus-visible:ring-primary-500",
    title: "text-primary-700",
    activeIndicator: "text-primary-600",
  },
  secondary: {
    focusRing: "focus-visible:ring-secondary-500",
    title: "text-secondary-700",
    activeIndicator: "text-secondary-600",
  },
  neutral: {
    focusRing: "focus-visible:ring-neutral-500",
    title: "text-neutral-900",
    activeIndicator: "text-neutral-700",
  },
  error: {
    focusRing: "focus-visible:ring-error-500",
    title: "text-error-700",
    activeIndicator: "text-error-600",
  },
  success: {
    focusRing: "focus-visible:ring-success-500",
    title: "text-success-700",
    activeIndicator: "text-success-600",
  },
  warning: {
    focusRing: "focus-visible:ring-warning-500",
    title: "text-warning-700",
    activeIndicator: "text-warning-600",
  },
  info: {
    focusRing: "focus-visible:ring-info-500",
    title: "text-info-700",
    activeIndicator: "text-info-600",
  },
};
