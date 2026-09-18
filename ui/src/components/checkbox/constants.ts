import { CheckboxSize, CheckboxVariant, CheckboxColor, CheckboxRadius, CheckboxGroupOrientation } from "./types";

export const sizeConfig: Record<
  CheckboxSize,
  {
    box: string;
    icon: string;
    label: string;
    gap: string;
    helper: string;
  }
> = {
  xs: {
    box: "size-3.5",
    icon: "size-2.5",
    label: "text-xs leading-4",
    gap: "gap-1.5",
    helper: "text-[10px]",
  },
  sm: {
    box: "size-4",
    icon: "size-3",
    label: "text-sm leading-4",
    gap: "gap-2",
    helper: "text-[11px]",
  },
  md: {
    box: "size-5",
    icon: "size-3.5",
    label: "text-sm leading-5",
    gap: "gap-2.5",
    helper: "text-xs",
  },
  lg: {
    box: "size-6",
    icon: "size-4",
    label: "text-base leading-6",
    gap: "gap-3",
    helper: "text-xs",
  },
  xl: {
    box: "size-7",
    icon: "size-5",
    label: "text-lg leading-7",
    gap: "gap-3.5",
    helper: "text-sm",
  },
};

export const radiusConfig: Record<CheckboxRadius, string> = {
  none: "rounded-none",
  sm: "rounded-2xs",
  md: "rounded-xs",
  lg: "rounded-sm",
  xl: "rounded-md",
  full: "rounded-full",
};

export const variantColorConfig: Record<Exclude<CheckboxVariant, "other">, Record<CheckboxColor, string>> = {
  filled: {
    primary:
      "bg-primary-600 text-neutral-white border-primary-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400 peer-focus-visible:border-primary-500",
    secondary:
      "bg-secondary-600 text-neutral-white border-secondary-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400 peer-focus-visible:border-secondary-500",
    error:
      "bg-error-600 text-neutral-white border-error-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400 peer-focus-visible:border-error-500",
    success:
      "bg-success-600 text-neutral-white border-success-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400 peer-focus-visible:border-success-500",
    warning:
      "bg-warning-500 text-neutral-950 border-warning-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400 peer-focus-visible:border-warning-500",
    info: "bg-info-600 text-neutral-white border-info-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400 peer-focus-visible:border-info-500",
    neutral:
      "bg-neutral-800 text-neutral-white border-neutral-800 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400 peer-focus-visible:border-neutral-500",
  },
  outline: {
    primary:
      "bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-50/50 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400 peer-focus-visible:border-primary-500",
    secondary:
      "bg-transparent text-secondary-600 border-2 border-secondary-600 hover:bg-secondary-50/50 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400 peer-focus-visible:border-secondary-500",
    error:
      "bg-transparent text-error-600 border-2 border-error-600 hover:bg-error-50/50 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400 peer-focus-visible:border-error-500",
    success:
      "bg-transparent text-success-600 border-2 border-success-600 hover:bg-success-50/50 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400 peer-focus-visible:border-success-500",
    warning:
      "bg-transparent text-warning-700 border-2 border-warning-500 hover:bg-warning-50/50 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400 peer-focus-visible:border-warning-500",
    info: "bg-transparent text-info-600 border-2 border-info-600 hover:bg-info-50/50 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400 peer-focus-visible:border-info-500",
    neutral:
      "bg-transparent text-neutral-800 border-2 border-neutral-800 hover:bg-neutral-100/50 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400 peer-focus-visible:border-neutral-500",
  },
  soft: {
    primary:
      "bg-primary-100 text-primary-800 border-primary-300 hover:bg-primary-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400 peer-focus-visible:border-primary-500",
    secondary:
      "bg-secondary-100 text-secondary-800 border-secondary-300 hover:bg-secondary-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400 peer-focus-visible:border-secondary-500",
    error:
      "bg-error-100 text-error-800 border-error-300 hover:bg-error-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400 peer-focus-visible:border-error-500",
    success:
      "bg-success-100 text-success-800 border-success-300 hover:bg-success-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400 peer-focus-visible:border-success-500",
    warning:
      "bg-warning-100 text-warning-900 border-warning-300 hover:bg-warning-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400 peer-focus-visible:border-warning-500",
    info: "bg-info-100 text-info-800 border-info-300 hover:bg-info-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400 peer-focus-visible:border-info-500",
    neutral:
      "bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400 peer-focus-visible:border-neutral-500",
  },
};

export const orientationConfig: Record<CheckboxGroupOrientation, string> = {
  horizontal: "flex flex-row flex-wrap gap-4 items-center",
  vertical: "flex flex-col gap-2.5",
};

export const searchInputSizeConfig: Record<CheckboxSize, "xs" | "sm" | "md" | "lg" | "xl"> = {
  xs: "sm",
  sm: "sm",
  md: "md",
  lg: "md",
  xl: "lg",
};
