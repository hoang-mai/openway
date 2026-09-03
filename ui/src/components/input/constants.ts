import { InputSize, InputVariant, InputColor, InputRadius } from "./types";
import type { BadgeRadius, BadgeSize } from "@/components/badge/types";

export const sizeConfig: Record<
  InputSize,
  {
    wrapper: string;
    input: string;
    icon: string;
    iconPaddingLeft: string;
    iconPaddingRight: string;
    label: string;
    floatingLabel: string;
    helper: string;
  }
> = {
  xs: {
    wrapper: "h-6 text-[11px]",
    input: "px-2 py-0.5 text-[11px] leading-tight",
    icon: "size-3",
    iconPaddingLeft: "pl-6",
    iconPaddingRight: "pr-6",
    label: "text-[11px] mb-1",
    floatingLabel: "text-[10px]",
    helper: "text-[9px] mt-0.5",
  },
  sm: {
    wrapper: "h-8 text-xs",
    input: "px-2.5 py-1 text-xs leading-normal",
    icon: "size-3.5",
    iconPaddingLeft: "pl-7.5",
    iconPaddingRight: "pr-7.5",
    label: "text-xs mb-1",
    floatingLabel: "text-[10px]",
    helper: "text-[10px] mt-0.5",
  },
  md: {
    wrapper: "h-10 text-sm",
    input: "px-3.5 py-2 text-sm leading-normal",
    icon: "size-[18px]",
    iconPaddingLeft: "pl-9",
    iconPaddingRight: "pr-9",
    label: "text-sm mb-1.5",
    floatingLabel: "text-[11px]",
    helper: "text-[11px] mt-1",
  },
  lg: {
    wrapper: "h-12 text-base",
    input: "px-4 py-2.5 text-base leading-normal",
    icon: "size-5",
    iconPaddingLeft: "pl-11",
    iconPaddingRight: "pr-11",
    label: "text-base mb-1.5",
    floatingLabel: "text-xs",
    helper: "text-xs mt-1",
  },
  xl: {
    wrapper: "h-14 text-lg",
    input: "px-5 py-3 text-lg leading-normal",
    icon: "size-6",
    iconPaddingLeft: "pl-13",
    iconPaddingRight: "pr-13",
    label: "text-lg mb-2",
    floatingLabel: "text-xs",
    helper: "text-sm mt-1",
  },
};

export const radiusConfig: Record<InputRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const badgeRadiusMap: Record<InputRadius, BadgeRadius> = {
  none: "none",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  full: "full",
};

export const multiInputSizeConfig: Record<
  InputSize,
  {
    wrapper: string;
    input: string;
    gap: string;
    badgeSize: BadgeSize;
    icon: string;
    label: string;
    floatingLabel: string;
    helper: string;
  }
> = {
  xs: {
    wrapper: "min-h-6 text-[11px] px-1.5 py-0.5",
    input: "text-[11px] leading-tight min-w-[50px]",
    gap: "gap-1",
    badgeSize: "xs",
    icon: "size-3",
    label: "text-[11px] mb-1",
    floatingLabel: "text-[10px]",
    helper: "text-[9px] mt-0.5",
  },
  sm: {
    wrapper: "min-h-8 text-xs px-2 py-1",
    input: "text-xs leading-normal min-w-[60px]",
    gap: "gap-1",
    badgeSize: "xs",
    icon: "size-3.5",
    label: "text-xs mb-1",
    floatingLabel: "text-[10px]",
    helper: "text-[10px] mt-0.5",
  },
  md: {
    wrapper: "min-h-10 text-sm px-2.5 py-1.5",
    input: "text-sm leading-normal min-w-[70px]",
    gap: "gap-1.5",
    badgeSize: "sm",
    icon: "size-[18px]",
    label: "text-sm mb-1.5",
    floatingLabel: "text-[11px]",
    helper: "text-[11px] mt-1",
  },
  lg: {
    wrapper: "min-h-12 text-base px-3 py-2",
    input: "text-base leading-normal min-w-[80px]",
    gap: "gap-1.5",
    badgeSize: "md",
    icon: "size-5",
    label: "text-base mb-1.5",
    floatingLabel: "text-xs",
    helper: "text-xs mt-1",
  },
  xl: {
    wrapper: "min-h-14 text-lg px-3.5 py-2.5",
    input: "text-lg leading-normal min-w-[90px]",
    gap: "gap-2",
    badgeSize: "lg",
    icon: "size-6",
    label: "text-lg mb-2",
    floatingLabel: "text-xs",
    helper: "text-sm mt-1",
  },
};

export const variantColorConfig: Record<Exclude<InputVariant, "other">, Record<InputColor, string>> = {
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
      "bg-primary-50/60 border-primary-200 hover:bg-primary-100/60 focus-within:bg-primary-100/60 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-secondary-50/60 border-secondary-200 hover:bg-secondary-100/60 focus-within:bg-secondary-100/60 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    neutral:
      "bg-neutral-50/60 border-neutral-200 hover:bg-neutral-200/60 focus-within:bg-neutral-200/60 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/20",
    error:
      "bg-error-50/60 border-error-500 hover:border-error-600 hover:bg-error-100/60 focus-within:bg-error-100/60 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-success-50/60 border-success-200 hover:bg-success-100/60 focus-within:bg-success-100/60 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-warning-50/60 border-warning-200 hover:bg-warning-100/60 focus-within:bg-warning-100/60 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-info-50/60 border-info-200 hover:bg-info-100/60 focus-within:bg-info-100/60 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
  },
  ghost: {
    primary:
      "bg-transparent border-transparent hover:bg-primary-50/50 focus-within:bg-primary-50/50 focus-within:border-primary-200/20 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-transparent border-transparent hover:bg-secondary-50/50 focus-within:bg-secondary-50/50 focus-within:border-secondary-200/20 focus-within:ring-2 focus-within:ring-secondary-500/20",
    neutral:
      "bg-transparent border-transparent hover:bg-neutral-50/50 focus-within:bg-neutral-50/50 focus-within:border-neutral-200/20 focus-within:ring-2 focus-within:ring-neutral-500/20",
    error:
      "bg-transparent border-transparent hover:bg-error-50/50 focus-within:bg-error-50/50 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-transparent border-transparent hover:bg-success-50/50 focus-within:bg-success-50/50 focus-within:border-success-200/20 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-transparent border-transparent hover:bg-warning-50/50 focus-within:bg-warning-50/50 focus-within:border-warning-200/20 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-transparent border-transparent hover:bg-info-50/50 focus-within:bg-info-50/50 focus-within:border-info-200/20 focus-within:ring-2 focus-within:ring-info-500/20",
  },
};

export const labelColorConfig: Record<InputColor, string> = {
  primary: "text-primary-500 group-focus-within/field:text-primary-600",
  secondary: "text-secondary-500 group-focus-within/field:text-secondary-600",
  error: "text-error-500 group-focus-within/field:text-error-600",
  success: "text-success-500 group-focus-within/field:text-success-600",
  warning: "text-warning-500 group-focus-within/field:text-warning-600",
  info: "text-info-500 group-focus-within/field:text-info-600",
  neutral: "text-neutral-500 group-focus-within/field:text-neutral-600",
};

export const otpSlotSizeConfig: Record<
  InputSize,
  {
    slot: string;
    text: string;
    gap: string;
    label: string;
    helper: string;
  }
> = {
  xs: {
    slot: "size-6 min-w-6",
    text: "text-xs",
    gap: "gap-1",
    label: "text-[11px] mb-1",
    helper: "text-[9px] mt-0.5",
  },
  sm: {
    slot: "size-8 min-w-8",
    text: "text-sm",
    gap: "gap-1.5",
    label: "text-xs mb-1",
    helper: "text-[10px] mt-0.5",
  },
  md: {
    slot: "size-10 min-w-10",
    text: "text-base font-semibold",
    gap: "gap-2",
    label: "text-sm mb-1.5",
    helper: "text-[11px] mt-1",
  },
  lg: {
    slot: "size-12 min-w-12",
    text: "text-lg font-semibold",
    gap: "gap-2.5",
    label: "text-base mb-1.5",
    helper: "text-xs mt-1",
  },
  xl: {
    slot: "size-14 min-w-14",
    text: "text-xl font-bold",
    gap: "gap-3",
    label: "text-lg mb-2",
    helper: "text-sm mt-1",
  },
};
