import { SelectSize, SelectRadius, SelectVariant, SelectColor, LabelPlacement } from "./types";
import { BadgeRadius, BadgeSize } from "@/components/badge/types";

export const sizeConfig: Record<
  SelectSize,
  {
    trigger: string;
    input: string;
    text: string;
    icon: string;
    option: string;
    gap: string;
    badgeSize: BadgeSize;
    defaultRadius: SelectRadius;
    helper: string;
  }
> = {
  xs: {
    trigger: "min-h-6 text-[11px] px-2 py-0.5",
    input: "text-[11px] leading-tight",
    text: "text-[11px]",
    icon: "size-3",
    option: "px-2 py-1 text-[11px] min-h-6",
    gap: "gap-1",
    badgeSize: "xs",
    defaultRadius: "sm",
    helper: "text-[9px] mt-0.5",
  },
  sm: {
    trigger: "min-h-8 text-xs px-2.5 py-1",
    input: "text-xs leading-normal",
    text: "text-xs",
    icon: "size-3.5",
    option: "px-2.5 py-1.5 text-xs min-h-7",
    gap: "gap-1",
    badgeSize: "xs",
    defaultRadius: "md",
    helper: "text-[10px] mt-0.5",
  },
  md: {
    trigger: "min-h-10 text-sm px-3.5 py-1.5",
    input: "text-sm leading-normal",
    text: "text-sm",
    icon: "size-[18px]",
    option: "px-3 py-2 text-sm min-h-9",
    gap: "gap-1.5",
    badgeSize: "sm",
    defaultRadius: "lg",
    helper: "text-[11px] mt-1",
  },
  lg: {
    trigger: "min-h-12 text-base px-4 py-2",
    input: "text-base leading-normal",
    text: "text-base",
    icon: "size-5",
    option: "px-3.5 py-2.5 text-base min-h-11",
    gap: "gap-2",
    badgeSize: "md",
    defaultRadius: "xl",
    helper: "text-xs mt-1",
  },
  xl: {
    trigger: "min-h-14 text-lg px-5 py-2.5",
    input: "text-lg leading-normal",
    text: "text-lg",
    icon: "size-6",
    option: "px-4 py-3 text-lg min-h-12",
    gap: "gap-2",
    badgeSize: "lg",
    defaultRadius: "xl",
    helper: "text-sm mt-1",
  },
};

export const radiusConfig: Record<SelectRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

/**
 * Cấu hình bo góc chuyên biệt cho popup menu của Select (không có rounded-full)
 */
export const menuRadiusConfig: Record<SelectRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-2xl",
};

export const badgeRadiusMap: Record<SelectRadius, BadgeRadius> = {
  none: "none",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  full: "full",
};

/**
 * Cấu hình màu sắc của Select đồng bộ 100% với Input (theo colors.ts và variantColorConfig của Input)
 */
export const variantColorConfig: Record<Exclude<SelectVariant, "other">, Record<SelectColor, string>> = {
  outline: {
    primary:
      "bg-neutral-white border-neutral-200 hover:border-neutral-300 focus-within:border-primary-500 focus-within:hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/25 data-[state=open]:border-primary-500 data-[state=open]:hover:border-primary-500 data-[state=open]:ring-2 data-[state=open]:ring-primary-500/25 aria-expanded:border-primary-500 aria-expanded:hover:border-primary-500 aria-expanded:ring-2 aria-expanded:ring-primary-500/25 text-neutral-900",
    secondary:
      "bg-neutral-white border-neutral-200 hover:border-neutral-300 focus-within:border-secondary-500 focus-within:hover:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/25 data-[state=open]:border-secondary-500 data-[state=open]:hover:border-secondary-500 data-[state=open]:ring-2 data-[state=open]:ring-secondary-500/25 aria-expanded:border-secondary-500 aria-expanded:hover:border-secondary-500 aria-expanded:ring-2 aria-expanded:ring-secondary-500/25 text-neutral-900",
    error:
      "bg-neutral-white border-error-400 hover:border-error-500 focus-within:border-error-500 focus-within:hover:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20 data-[state=open]:border-error-500 data-[state=open]:hover:border-error-500 data-[state=open]:ring-2 data-[state=open]:ring-error-500/20 aria-expanded:border-error-500 aria-expanded:hover:border-error-500 aria-expanded:ring-2 aria-expanded:ring-error-500/20 text-neutral-900",
    success:
      "bg-neutral-white border-success-400 hover:border-success-500 focus-within:border-success-500 focus-within:hover:border-success-500 focus-within:ring-2 focus-within:ring-success-500/25 data-[state=open]:border-success-500 data-[state=open]:hover:border-success-500 data-[state=open]:ring-2 data-[state=open]:ring-success-500/25 aria-expanded:border-success-500 aria-expanded:hover:border-success-500 aria-expanded:ring-2 aria-expanded:ring-success-500/25 text-neutral-900",
    warning:
      "bg-neutral-white border-warning-400 hover:border-warning-500 focus-within:border-warning-500 focus-within:hover:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/25 data-[state=open]:border-warning-500 data-[state=open]:hover:border-warning-500 data-[state=open]:ring-2 data-[state=open]:ring-warning-500/25 aria-expanded:border-warning-500 aria-expanded:hover:border-warning-500 aria-expanded:ring-2 aria-expanded:ring-warning-500/25 text-neutral-900",
    info: "bg-neutral-white border-info-400 hover:border-info-500 focus-within:border-info-500 focus-within:hover:border-info-500 focus-within:ring-2 focus-within:ring-info-500/25 data-[state=open]:border-info-500 data-[state=open]:hover:border-info-500 data-[state=open]:ring-2 data-[state=open]:ring-info-500/25 aria-expanded:border-info-500 aria-expanded:hover:border-info-500 aria-expanded:ring-2 aria-expanded:ring-info-500/25 text-neutral-900",
    neutral:
      "bg-neutral-white border-neutral-200 hover:border-neutral-300 focus-within:border-neutral-600 focus-within:hover:border-neutral-600 focus-within:ring-2 focus-within:ring-neutral-500/25 data-[state=open]:border-neutral-600 data-[state=open]:hover:border-neutral-600 data-[state=open]:ring-2 data-[state=open]:ring-neutral-500/25 aria-expanded:border-neutral-600 aria-expanded:hover:border-neutral-600 aria-expanded:ring-2 aria-expanded:ring-neutral-500/25 text-neutral-900",
  },

  filled: {
    primary:
      "bg-neutral-100 border-neutral-200 hover:bg-neutral-200/70 focus-within:bg-neutral-white focus-within:border-primary-500 focus-within:hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-primary-500 data-[state=open]:hover:border-primary-500 data-[state=open]:ring-2 data-[state=open]:ring-primary-500/20 aria-expanded:bg-neutral-white aria-expanded:border-primary-500 aria-expanded:hover:border-primary-500 aria-expanded:ring-2 aria-expanded:ring-primary-500/20 text-neutral-900",
    secondary:
      "bg-neutral-100 border-neutral-200 hover:bg-neutral-200/70 focus-within:bg-neutral-white focus-within:border-secondary-500 focus-within:hover:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-secondary-500 data-[state=open]:hover:border-secondary-500 data-[state=open]:ring-2 data-[state=open]:ring-secondary-500/20 aria-expanded:bg-neutral-white aria-expanded:border-secondary-500 aria-expanded:hover:border-secondary-500 aria-expanded:ring-2 aria-expanded:ring-secondary-500/20 text-neutral-900",
    error:
      "bg-error-50/70 border-error-300 hover:border-error-400 focus-within:bg-neutral-white focus-within:border-error-500 focus-within:hover:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-error-500 data-[state=open]:hover:border-error-500 data-[state=open]:ring-2 data-[state=open]:ring-error-500/20 aria-expanded:bg-neutral-white aria-expanded:border-error-500 aria-expanded:hover:border-error-500 aria-expanded:ring-2 aria-expanded:ring-error-500/20 text-neutral-900",
    success:
      "bg-success-50/70 border-success-300 hover:border-success-400 focus-within:bg-neutral-white focus-within:border-success-500 focus-within:hover:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-success-500 data-[state=open]:hover:border-success-500 data-[state=open]:ring-2 data-[state=open]:ring-success-500/20 aria-expanded:bg-neutral-white aria-expanded:border-success-500 aria-expanded:hover:border-success-500 aria-expanded:ring-2 aria-expanded:ring-success-500/20 text-neutral-900",
    warning:
      "bg-warning-50/70 border-warning-300 hover:border-warning-400 focus-within:bg-neutral-white focus-within:border-warning-500 focus-within:hover:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-warning-500 data-[state=open]:hover:border-warning-500 data-[state=open]:ring-2 data-[state=open]:ring-warning-500/20 aria-expanded:bg-neutral-white aria-expanded:border-warning-500 aria-expanded:hover:border-warning-500 aria-expanded:ring-2 aria-expanded:ring-warning-500/20 text-neutral-900",
    info: "bg-info-50/70 border-info-300 hover:border-info-400 focus-within:bg-neutral-white focus-within:border-info-500 focus-within:hover:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-info-500 data-[state=open]:hover:border-info-500 data-[state=open]:ring-2 data-[state=open]:ring-info-500/20 aria-expanded:bg-neutral-white aria-expanded:border-info-500 aria-expanded:hover:border-info-500 aria-expanded:ring-2 aria-expanded:ring-info-500/20 text-neutral-900",
    neutral:
      "bg-neutral-100 border-neutral-200 hover:bg-neutral-200/70 focus-within:bg-neutral-white focus-within:border-neutral-600 focus-within:hover:border-neutral-600 focus-within:ring-2 focus-within:ring-neutral-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-neutral-600 data-[state=open]:hover:border-neutral-600 data-[state=open]:ring-2 data-[state=open]:ring-neutral-500/20 aria-expanded:bg-neutral-white aria-expanded:border-neutral-600 aria-expanded:hover:border-neutral-600 aria-expanded:ring-2 aria-expanded:ring-neutral-500/20 text-neutral-900",
  },
  ghost: {
    primary:
      "bg-transparent border-transparent hover:bg-neutral-100/70 focus-within:bg-neutral-white focus-within:border-primary-500 focus-within:hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-primary-500 data-[state=open]:hover:border-primary-500 data-[state=open]:ring-2 data-[state=open]:ring-primary-500/20 aria-expanded:bg-neutral-white aria-expanded:border-primary-500 aria-expanded:hover:border-primary-500 aria-expanded:ring-2 aria-expanded:ring-primary-500/20 text-neutral-900",
    secondary:
      "bg-transparent border-transparent hover:bg-neutral-100/70 focus-within:bg-neutral-white focus-within:border-secondary-500 focus-within:hover:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-secondary-500 data-[state=open]:hover:border-secondary-500 data-[state=open]:ring-2 data-[state=open]:ring-secondary-500/20 aria-expanded:bg-neutral-white aria-expanded:border-secondary-500 aria-expanded:hover:border-secondary-500 aria-expanded:ring-2 aria-expanded:ring-secondary-500/20 text-neutral-900",
    error:
      "bg-transparent border-transparent hover:bg-error-50 focus-within:bg-neutral-white focus-within:border-error-500 focus-within:hover:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-error-500 data-[state=open]:hover:border-error-500 data-[state=open]:ring-2 data-[state=open]:ring-error-500/20 aria-expanded:bg-neutral-white aria-expanded:border-error-500 aria-expanded:hover:border-error-500 aria-expanded:ring-2 aria-expanded:ring-error-500/20 text-neutral-900",
    success:
      "bg-transparent border-transparent hover:bg-success-50 focus-within:bg-neutral-white focus-within:border-success-500 focus-within:hover:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-success-500 data-[state=open]:hover:border-success-500 data-[state=open]:ring-2 data-[state=open]:ring-success-500/20 aria-expanded:bg-neutral-white aria-expanded:border-success-500 aria-expanded:hover:border-success-500 aria-expanded:ring-2 aria-expanded:ring-success-500/20 text-neutral-900",
    warning:
      "bg-transparent border-transparent hover:bg-warning-50 focus-within:bg-neutral-white focus-within:border-warning-500 focus-within:hover:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-warning-500 data-[state=open]:hover:border-warning-500 data-[state=open]:ring-2 data-[state=open]:ring-warning-500/20 aria-expanded:bg-neutral-white aria-expanded:border-warning-500 aria-expanded:hover:border-warning-500 aria-expanded:ring-2 aria-expanded:ring-warning-500/20 text-neutral-900",
    info: "bg-transparent border-transparent hover:bg-info-50 focus-within:bg-neutral-white focus-within:border-info-500 focus-within:hover:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-info-500 data-[state=open]:hover:border-info-500 data-[state=open]:ring-2 data-[state=open]:ring-info-500/20 aria-expanded:bg-neutral-white aria-expanded:border-info-500 aria-expanded:hover:border-info-500 aria-expanded:ring-2 aria-expanded:ring-info-500/20 text-neutral-900",
    neutral:
      "bg-transparent border-transparent hover:bg-neutral-100/70 focus-within:bg-neutral-white focus-within:border-neutral-600 focus-within:hover:border-neutral-600 focus-within:ring-2 focus-within:ring-neutral-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-neutral-600 data-[state=open]:hover:border-neutral-600 data-[state=open]:ring-2 data-[state=open]:ring-neutral-500/20 aria-expanded:bg-neutral-white aria-expanded:border-neutral-600 aria-expanded:hover:border-neutral-600 aria-expanded:ring-2 aria-expanded:ring-neutral-500/20 text-neutral-900",
  },
};

export const optionSelectedColorConfig: Record<SelectColor, string> = {
  primary: "bg-primary-50 text-primary-700 font-medium",
  secondary: "bg-secondary-50 text-secondary-700 font-medium",
  error: "bg-error-50 text-error-700 font-medium",
  success: "bg-success-50 text-success-700 font-medium",
  warning: "bg-warning-50 text-warning-700 font-medium",
  info: "bg-info-50 text-info-700 font-medium",
  neutral: "bg-neutral-100 text-neutral-900 font-medium",
};

export const optionActiveColorConfig: Record<SelectColor, string> = {
  primary: "bg-primary-50/60",
  secondary: "bg-secondary-50/60",
  error: "bg-error-50/60",
  success: "bg-success-50/60",
  warning: "bg-warning-50/60",
  info: "bg-info-50/60",
  neutral: "bg-neutral-100",
};

export const labelPlacementConfig: Record<
  LabelPlacement,
  {
    container: string;
    label: string;
  }
> = {
  top: {
    container: "flex flex-col gap-1.5",
    label: "text-sm font-bold text-neutral-700 mb-1",
  },
  left: {
    container: "flex flex-row items-center gap-3",
    label: "text-sm font-bold text-neutral-700 shrink-0",
  },
  floating: {
    container: "relative",
    label:
      "absolute left-3 -top-2.5 bg-neutral-white px-1.5 text-xs font-bold text-neutral-600 z-10 transition-all pointer-events-none rounded-sm",
  },
};

/**
 * Cấu hình kích thước thanh filter bar, chip và popover trong SelectMenuFilter theo chuẩn Notion
 */
export const filterSizeConfig: Record<
  SelectSize,
  {
    container: string;
    chip: string;
    chipText: string;
    button: string;
    buttonIcon: string;
    chevronIcon: string;
    closeIcon: string;
    resetButton: string;
    popoverHeader: string;
    popoverFooter: string;
  }
> = {
  xs: {
    container: "px-1.5 py-0.5 gap-0.5",
    chip: "h-4 text-[9px] gap-0.5 px-1 rounded-xs",
    chipText: "text-[9px]",
    button: "h-4 px-1 text-[9px] gap-0.5 rounded-xs",
    buttonIcon: "size-2",
    chevronIcon: "size-2",
    closeIcon: "size-2",
    resetButton: "text-[9px] px-1 py-0.25 rounded-xs",
    popoverHeader: "text-[10px]",
    popoverFooter: "text-[9px]",
  },
  sm: {
    container: "px-1.5 py-0.5 gap-0.5",
    chip: "h-4.5 text-[10px] gap-0.5 px-1 rounded-xs",
    chipText: "text-[10px]",
    button: "h-4.5 px-1 text-[10px] gap-0.5 rounded-xs",
    buttonIcon: "size-2",
    chevronIcon: "size-2",
    closeIcon: "size-2",
    resetButton: "text-[9px] px-1 py-0.5 rounded-xs",
    popoverHeader: "text-[10px]",
    popoverFooter: "text-[9px]",
  },
  md: {
    container: "px-1.5 py-1 gap-1",
    chip: "h-5 text-[10.5px] gap-1 px-1.5 rounded-xs",
    chipText: "text-[10.5px]",
    button: "h-5 px-1.5 text-[10.5px] gap-1 rounded-xs",
    buttonIcon: "size-2.5",
    chevronIcon: "size-2",
    closeIcon: "size-2",
    resetButton: "text-[10px] px-1 py-0.5 rounded-xs",
    popoverHeader: "text-[11px]",
    popoverFooter: "text-[10px]",
  },
  lg: {
    container: "px-2 py-1 gap-1",
    chip: "h-5.5 text-[11px] gap-1 px-2 rounded-xs",
    chipText: "text-[11px]",
    button: "h-5.5 px-1.5 text-[11px] gap-1 rounded-xs",
    buttonIcon: "size-2.5",
    chevronIcon: "size-2",
    closeIcon: "size-2.5",
    resetButton: "text-[10px] px-1.5 py-0.5 rounded-xs",
    popoverHeader: "text-xs",
    popoverFooter: "text-[10px]",
  },
  xl: {
    container: "px-2.5 py-1 gap-1",
    chip: "h-6 text-xs gap-1 px-2 rounded-xs",
    chipText: "text-xs",
    button: "h-6 px-2 text-xs gap-1 rounded-xs",
    buttonIcon: "size-3",
    chevronIcon: "size-2.5",
    closeIcon: "size-2.5",
    resetButton: "text-[11px] px-1.5 py-0.5 rounded-xs",
    popoverHeader: "text-xs",
    popoverFooter: "text-[11px]",
  },
};

