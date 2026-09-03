import { TextAreaSize, TextAreaVariant, TextAreaColor, TextAreaRadius, TextAreaResize } from "./types";

export const sizeConfig: Record<
  TextAreaSize,
  {
    textarea: string;
    label: string;
    floatingLabel: string;
    helper: string;
  }
> = {
  xs: {
    textarea: "text-[11px] px-2 py-1 leading-tight",
    label: "text-[11px] mb-1",
    floatingLabel: "text-[10px]",
    helper: "text-[9px] mt-0.5",
  },
  sm: {
    textarea: "text-xs px-2.5 py-1.5 leading-normal",
    label: "text-xs mb-1",
    floatingLabel: "text-[10px]",
    helper: "text-[10px] mt-0.5",
  },
  md: {
    textarea: "text-sm px-3.5 py-2 leading-normal",
    label: "text-sm mb-1.5",
    floatingLabel: "text-[11px]",
    helper: "text-[11px] mt-1",
  },
  lg: {
    textarea: "text-base px-4 py-2.5 leading-normal",
    label: "text-base mb-1.5",
    floatingLabel: "text-xs",
    helper: "text-xs mt-1",
  },
  xl: {
    textarea: "text-lg px-5 py-3 leading-normal",
    label: "text-lg mb-2",
    floatingLabel: "text-xs",
    helper: "text-sm mt-1",
  },
};

export const radiusConfig: Record<TextAreaRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const resizeConfig: Record<TextAreaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

export const variantColorConfig: Record<Exclude<TextAreaVariant, "other">, Record<TextAreaColor, string>> = {
  outline: {
    primary:
      "bg-neutral-white border-primary-300 hover:border-primary-400 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-neutral-white border-secondary-300 hover:border-secondary-400 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    error:
      "bg-neutral-white border-error-300 hover:border-error-400 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-neutral-white border-success-300 hover:border-success-400 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-neutral-white border-warning-300 hover:border-warning-400 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-neutral-white border-info-300 hover:border-info-400 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
    neutral:
      "bg-neutral-white border-neutral-300 hover:border-neutral-400 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/20",
  },
  filled: {
    primary:
      "bg-primary-50/60 border border-primary-300 hover:border-primary-400 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-secondary-50/60 border border-secondary-300 hover:border-secondary-400 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    error:
      "bg-error-50/60 border border-error-300 hover:border-error-400 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-success-50/60 border border-success-300 hover:border-success-400 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-warning-50/60 border border-warning-300 hover:border-warning-400 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-info-50/60 border border-info-300 hover:border-info-400 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
    neutral:
      "bg-neutral-50/60 border border-neutral-300 hover:border-neutral-400 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/20",
  },
  ghost: {
    primary:
      "bg-transparent border border-transparent hover:bg-primary-50/50 focus-within:bg-primary-50/50 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-transparent border border-transparent hover:bg-secondary-50/50 focus-within:bg-secondary-50/50 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    error:
      "bg-transparent border border-transparent hover:bg-error-50/50 focus-within:bg-error-50/50 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-transparent border border-transparent hover:bg-success-50/50 focus-within:bg-success-50/50 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-transparent border border-transparent hover:bg-warning-50/50 focus-within:bg-warning-50/50 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-transparent border border-transparent hover:bg-info-50/50 focus-within:bg-info-50/50 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
    neutral:
      "bg-transparent border border-transparent hover:bg-neutral-100/50 focus-within:bg-neutral-100/50 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/20",
  },
};

export const labelColorConfig: Record<TextAreaColor, string> = {
  primary: "text-primary-500 group-focus-within/field:text-primary-600",
  secondary: "text-secondary-500 group-focus-within/field:text-secondary-600",
  error: "text-error-500 group-focus-within/field:text-error-600",
  success: "text-success-500 group-focus-within/field:text-success-600",
  warning: "text-warning-500 group-focus-within/field:text-warning-600",
  info: "text-info-500 group-focus-within/field:text-info-600",
  neutral: "text-neutral-500 group-focus-within/field:text-neutral-600",
};
