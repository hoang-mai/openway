import { ButtonSize, ButtonVariant, ButtonColor, ButtonRadius } from "./types";

export const sizeConfig: Record<
  ButtonSize,
  {
    button: string;
    iconOnly: string;
    icon: string;
  }
> = {
  xs: {
    button: "h-6 px-2.5 text-[11px] gap-1",
    iconOnly: "size-6 p-0",
    icon: "size-3",
  },
  sm: {
    button: "h-8 px-3 text-xs gap-1.5",
    iconOnly: "size-8 p-0",
    icon: "size-3.5",
  },
  md: {
    button: "h-10 px-4 text-sm gap-2",
    iconOnly: "size-10 p-0",
    icon: "size-4",
  },
  lg: {
    button: "h-12 px-5 text-base gap-2.5",
    iconOnly: "size-12 p-0",
    icon: "size-5",
  },
  xl: {
    button: "h-14 px-6 text-lg gap-3",
    iconOnly: "size-14 p-0",
    icon: "size-6",
  },
};

export const radiusConfig: Record<ButtonRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const variantColorConfig: Record<Exclude<ButtonVariant, "other">, Record<ButtonColor, string>> = {
  filled: {
    primary:
      "bg-primary-500 text-neutral-white shadow-xs border-transparent hover:bg-primary-600 hover:shadow-sm active:bg-primary-700 active:shadow-none focus-visible:ring-primary-700",
    secondary:
      "bg-secondary-500 text-neutral-white shadow-xs border-transparent hover:bg-secondary-600 hover:shadow-sm active:bg-secondary-700 active:shadow-none focus-visible:ring-secondary-700",
    neutral:
      "bg-neutral-800 text-neutral-white shadow-xs border-transparent hover:bg-neutral-900 hover:shadow-sm active:bg-neutral-950 active:shadow-none focus-visible:ring-neutral-700",
    error:
      "bg-error-500 text-neutral-white shadow-xs border-transparent hover:bg-error-600 hover:shadow-sm active:bg-error-700 active:shadow-none focus-visible:ring-error-700",
    success:
      "bg-success-500 text-neutral-white shadow-xs border-transparent hover:bg-success-600 hover:shadow-sm active:bg-success-700 active:shadow-none focus-visible:ring-success-700",
    warning:
      "bg-warning-500 text-neutral-white shadow-xs border-transparent hover:bg-warning-600 hover:shadow-sm active:bg-warning-700 active:shadow-none focus-visible:ring-warning-700",
    info: "bg-info-500 text-neutral-white shadow-xs border-transparent hover:bg-info-600 hover:shadow-sm active:bg-info-700 active:shadow-none focus-visible:ring-info-700",
  },
  soft: {
    primary:
      "bg-primary-50 text-primary-700 border-primary-200/60 hover:bg-primary-100/70 hover:text-primary-800 active:bg-primary-200 focus-visible:ring-primary-700",
    secondary:
      "bg-secondary-50 text-secondary-700 border-secondary-200/60 hover:bg-secondary-100/70 hover:text-secondary-800 active:bg-secondary-200 focus-visible:ring-secondary-700",
    neutral:
      "bg-neutral-100 text-neutral-800 border-neutral-200/60 hover:bg-neutral-200 hover:text-neutral-900 active:bg-neutral-300 focus-visible:ring-neutral-700",
    error:
      "bg-error-50 text-error-700 border-error-200/60 hover:bg-error-100/70 hover:text-error-800 active:bg-error-200 focus-visible:ring-error-700",
    success:
      "bg-success-50 text-success-700 border-success-200/60 hover:bg-success-100/70 hover:text-success-800 active:bg-success-200 focus-visible:ring-success-700",
    warning:
      "bg-warning-50 text-warning-800 border-warning-200/60 hover:bg-warning-100/70 hover:text-warning-900 active:bg-warning-200 focus-visible:ring-warning-700",
    info: "bg-info-50 text-info-700 border-info-200/60 hover:bg-info-100/70 hover:text-info-800 active:bg-info-200 focus-visible:ring-info-700",
  },
  ghost: {
    primary:
      "bg-transparent text-primary-700 border-transparent hover:bg-primary-50 hover:text-primary-800 active:bg-primary-100 focus-visible:ring-primary-700",
    secondary:
      "bg-transparent text-secondary-700 border-transparent hover:bg-secondary-50 hover:text-secondary-800 active:bg-secondary-100 focus-visible:ring-secondary-700",
    neutral:
      "bg-transparent text-neutral-700 border-transparent hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 focus-visible:ring-neutral-700",
    error:
      "bg-transparent text-error-700 border-transparent hover:bg-error-50 hover:text-error-800 active:bg-error-100 focus-visible:ring-error-700",
    success:
      "bg-transparent text-success-700 border-transparent hover:bg-success-50 hover:text-success-800 active:bg-success-100 focus-visible:ring-success-700",
    warning:
      "bg-transparent text-warning-700 border-transparent hover:bg-warning-50 hover:text-warning-800 active:bg-warning-100 focus-visible:ring-warning-700",
    info: "bg-transparent text-info-700 border-transparent hover:bg-info-50 hover:text-info-800 active:bg-info-100 focus-visible:ring-info-700",
  },
  text: {
    primary:
      "bg-transparent text-primary-600 border-transparent px-1 hover:text-primary-700 active:text-primary-800 focus-visible:ring-primary-700",
    secondary:
      "bg-transparent text-secondary-600 border-transparent px-1 hover:text-secondary-700 active:text-secondary-800 focus-visible:ring-secondary-700",
    neutral:
      "bg-transparent text-neutral-700 border-transparent px-1 hover:text-neutral-800 active:text-neutral-900 focus-visible:ring-neutral-700",
    error:
      "bg-transparent text-error-600 border-transparent px-1 hover:text-error-700 active:text-error-800 focus-visible:ring-error-700",
    success:
      "bg-transparent text-success-600 border-transparent px-1 hover:text-success-700 active:text-success-800 focus-visible:ring-success-700",
    warning:
      "bg-transparent text-warning-600 border-transparent px-1 hover:text-warning-700 active:text-warning-800 focus-visible:ring-warning-700",
    info: "bg-transparent text-info-600 border-transparent px-1 hover:text-info-700 active:text-info-800 focus-visible:ring-info-700",
  },
  outline: {
    primary:
      "bg-transparent text-primary-700 border-primary-300 hover:bg-primary-50/70 hover:border-primary-500 hover:text-primary-800 active:bg-primary-100 focus-visible:ring-primary-700",
    secondary:
      "bg-transparent text-secondary-700 border-secondary-300 hover:bg-secondary-50/70 hover:border-secondary-500 hover:text-secondary-800 active:bg-secondary-100 focus-visible:ring-secondary-700",
    neutral:
      "bg-transparent text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 hover:text-neutral-900 active:bg-neutral-100 focus-visible:ring-neutral-700",
    error:
      "bg-transparent text-error-700 border-error-300 hover:bg-error-50/70 hover:border-error-500 hover:text-error-800 active:bg-error-100 focus-visible:ring-error-700",
    success:
      "bg-transparent text-success-700 border-success-300 hover:bg-success-50/70 hover:border-success-500 hover:text-success-800 active:bg-success-100 focus-visible:ring-success-700",
    warning:
      "bg-transparent text-warning-700 border-warning-300 hover:bg-warning-50/70 hover:border-warning-500 hover:text-warning-800 active:bg-warning-100 focus-visible:ring-warning-700",
    info: "bg-transparent text-info-700 border-info-300 hover:bg-info-50/70 hover:border-info-500 hover:text-info-800 active:bg-info-100 focus-visible:ring-info-700",
  },
};
