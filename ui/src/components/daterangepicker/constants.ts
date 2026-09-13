import {
  DateRangePickerColor,
  DateRangePickerRadius,
  DateRangePickerSize,
  DateRangePickerVariant,
} from "./types";

export const dateRangePickerSizeConfig: Record<
  DateRangePickerSize,
  {
    inputHeight: string;
    inputText: string;
    inputPadding: string;
    icon: string;
    iconSize: number;
    calendarPadding: string;
    cellSize: string;
    cellText: string;
    headerText: string;
    headerButtonSize: string;
    label: string;
    floatingLabel: string;
    helper: string;
  }
> = {
  xs: {
    inputHeight: "h-6",
    inputText: "text-[11px]",
    inputPadding: "px-2",
    icon: "size-3",
    iconSize: 12,
    calendarPadding: "p-2",
    cellSize: "w-7 h-7",
    cellText: "text-[11px]",
    headerText: "text-xs font-semibold",
    headerButtonSize: "h-6 w-6",
    label: "text-[11px] mb-1",
    floatingLabel: "text-[10px]",
    helper: "text-[9px] mt-0.5",
  },
  sm: {
    inputHeight: "h-8",
    inputText: "text-xs",
    inputPadding: "px-2.5",
    icon: "size-3.5",
    iconSize: 14,
    calendarPadding: "p-2.5",
    cellSize: "w-8 h-8",
    cellText: "text-xs",
    headerText: "text-xs font-semibold",
    headerButtonSize: "h-7 w-7",
    label: "text-xs mb-1",
    floatingLabel: "text-[10px]",
    helper: "text-[10px] mt-0.5",
  },
  md: {
    inputHeight: "h-10",
    inputText: "text-sm",
    inputPadding: "px-3",
    icon: "size-[18px]",
    iconSize: 16,
    calendarPadding: "p-3",
    cellSize: "w-9 h-9",
    cellText: "text-sm",
    headerText: "text-sm font-semibold",
    headerButtonSize: "h-8 w-8",
    label: "text-sm mb-1.5",
    floatingLabel: "text-[11px]",
    helper: "text-[11px] mt-1",
  },
  lg: {
    inputHeight: "h-12",
    inputText: "text-base",
    inputPadding: "px-3.5",
    icon: "size-5",
    iconSize: 18,
    calendarPadding: "p-4",
    cellSize: "w-10 h-10",
    cellText: "text-base",
    headerText: "text-base font-semibold",
    headerButtonSize: "h-9 w-9",
    label: "text-base mb-1.5",
    floatingLabel: "text-xs",
    helper: "text-xs mt-1",
  },
  xl: {
    inputHeight: "h-14",
    inputText: "text-lg",
    inputPadding: "px-4",
    icon: "size-6",
    iconSize: 20,
    calendarPadding: "p-4.5",
    cellSize: "w-11 h-11",
    cellText: "text-base",
    headerText: "text-lg font-semibold",
    headerButtonSize: "h-10 w-10",
    label: "text-lg mb-2",
    floatingLabel: "text-xs",
    helper: "text-sm mt-1",
  },
};

export const dateRangePickerRadiusConfig: Record<DateRangePickerRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const dateRangeCalendarRadiusConfig: Record<DateRangePickerRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-2xl",
};

export const dateRangePickerColorConfig: Record<
  DateRangePickerColor,
  {
    selected: string;
    rangeBg: string;
    rangeText: string;
    hoverBg: string;
    todayRing: string;
    activeText: string;
    badge: string;
  }
> = {
  primary: {
    selected: "bg-primary-500 text-neutral-white hover:bg-primary-600",
    rangeBg: "bg-primary-100",
    rangeText: "text-primary-900",
    hoverBg: "hover:bg-primary-200 hover:text-primary-900",
    todayRing: "ring-primary-500 text-primary-600",
    activeText: "text-primary-600",
    badge: "bg-primary-100 text-primary-700",
  },
  secondary: {
    selected: "bg-secondary-500 text-neutral-white hover:bg-secondary-600",
    rangeBg: "bg-secondary-100",
    rangeText: "text-secondary-900",
    hoverBg: "hover:bg-secondary-200 hover:text-secondary-900",
    todayRing: "ring-secondary-500 text-secondary-600",
    activeText: "text-secondary-600",
    badge: "bg-secondary-100 text-secondary-700",
  },
  neutral: {
    selected: "bg-neutral-800 text-neutral-white hover:bg-neutral-900",
    rangeBg: "bg-neutral-200",
    rangeText: "text-neutral-900",
    hoverBg: "hover:bg-neutral-300 hover:text-neutral-900",
    todayRing: "ring-neutral-800 text-neutral-800",
    activeText: "text-neutral-800",
    badge: "bg-neutral-200 text-neutral-800",
  },
  error: {
    selected: "bg-error-500 text-neutral-white hover:bg-error-600",
    rangeBg: "bg-error-100",
    rangeText: "text-error-900",
    hoverBg: "hover:bg-error-200 hover:text-error-900",
    todayRing: "ring-error-500 text-error-600",
    activeText: "text-error-600",
    badge: "bg-error-100 text-error-700",
  },
  success: {
    selected: "bg-success-500 text-neutral-white hover:bg-success-600",
    rangeBg: "bg-success-100",
    rangeText: "text-success-900",
    hoverBg: "hover:bg-success-200 hover:text-success-900",
    todayRing: "ring-success-500 text-success-600",
    activeText: "text-success-600",
    badge: "bg-success-100 text-success-700",
  },
  warning: {
    selected: "bg-warning-500 text-neutral-950 hover:bg-warning-600",
    rangeBg: "bg-warning-100",
    rangeText: "text-warning-900",
    hoverBg: "hover:bg-warning-200 hover:text-warning-900",
    todayRing: "ring-warning-500 text-warning-700",
    activeText: "text-warning-700",
    badge: "bg-warning-100 text-warning-700",
  },
  info: {
    selected: "bg-info-500 text-neutral-white hover:bg-info-600",
    rangeBg: "bg-info-100",
    rangeText: "text-info-900",
    hoverBg: "hover:bg-info-200 hover:text-info-900",
    todayRing: "ring-info-500 text-info-600",
    activeText: "text-info-600",
    badge: "bg-info-100 text-info-700",
  },
};

export const dateRangePickerVariantStyles: Record<
  DateRangePickerVariant,
  Record<DateRangePickerColor, string>
> = {
  outline: {
    primary:
      "bg-neutral-white border-neutral-300 hover:border-neutral-400 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-neutral-white border-neutral-300 hover:border-neutral-400 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    error:
      "bg-neutral-white border-error-400 hover:border-error-500 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-neutral-white border-success-400 hover:border-success-500 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-neutral-white border-warning-400 hover:border-warning-500 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-neutral-white border-info-400 hover:border-info-500 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
    neutral:
      "bg-neutral-white border-neutral-300 hover:border-neutral-400 focus-within:border-neutral-600 focus-within:ring-2 focus-within:ring-neutral-500/20",
  },
  filled: {
    primary:
      "bg-neutral-100 border-neutral-200 hover:bg-neutral-200/70 focus-within:bg-neutral-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-neutral-100 border-neutral-200 hover:bg-neutral-200/70 focus-within:bg-neutral-white focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    neutral:
      "bg-neutral-100 border-neutral-200 hover:bg-neutral-200/70 focus-within:bg-neutral-white focus-within:border-neutral-600 focus-within:ring-2 focus-within:ring-neutral-500/20",
    error:
      "bg-error-50/70 border-error-300 hover:border-error-400 focus-within:bg-neutral-white focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-success-50/70 border-success-300 hover:border-success-400 focus-within:bg-neutral-white focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-warning-50/70 border-warning-300 hover:border-warning-400 focus-within:bg-neutral-white focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-info-50/70 border-info-300 hover:border-info-400 focus-within:bg-neutral-white focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
  },
  ghost: {
    primary:
      "bg-transparent border-transparent hover:bg-neutral-100/70 focus-within:bg-neutral-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-transparent border-transparent hover:bg-neutral-100/70 focus-within:bg-neutral-white focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    neutral:
      "bg-transparent border-transparent hover:bg-neutral-100/70 focus-within:bg-neutral-white focus-within:border-neutral-600 focus-within:ring-2 focus-within:ring-neutral-500/20",
    error:
      "bg-transparent border-transparent hover:bg-error-50 focus-within:bg-neutral-white focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-transparent border-transparent hover:bg-success-50 focus-within:bg-neutral-white focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-transparent border-transparent hover:bg-warning-50 focus-within:bg-neutral-white focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-transparent border-transparent hover:bg-info-50 focus-within:bg-neutral-white focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
  },
  other: {
    primary: "",
    secondary: "",
    neutral: "",
    error: "",
    success: "",
    warning: "",
    info: "",
  },
};

export const labelColorConfig: Record<DateRangePickerColor, string> = {
  primary: "text-neutral-700 group-focus-within/field:text-primary-600",
  secondary: "text-neutral-700 group-focus-within/field:text-secondary-600",
  error: "text-error-600 group-focus-within/field:text-error-600",
  success: "text-neutral-700 group-focus-within/field:text-success-600",
  warning: "text-neutral-700 group-focus-within/field:text-warning-600",
  info: "text-neutral-700 group-focus-within/field:text-info-600",
  neutral: "text-neutral-700 group-focus-within/field:text-neutral-900",
};
