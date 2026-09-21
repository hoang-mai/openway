import { DatePickerColor, DatePickerRadius, DatePickerSize, DatePickerVariant } from "./types";

export const datePickerSizeConfig: Record<
  DatePickerSize,
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

export const labelColorConfig: Record<DatePickerColor, string> = {
  primary:
    "text-neutral-700 group-focus-within/datepicker:text-primary-600 group-data-[state=open]/datepicker:text-primary-600 group-data-[state=open]/field:text-primary-600 group-data-[state=open]:text-primary-600 group-aria-expanded/datepicker:text-primary-600",
  secondary:
    "text-neutral-700 group-focus-within/datepicker:text-secondary-600 group-data-[state=open]/datepicker:text-secondary-600 group-data-[state=open]/field:text-secondary-600 group-data-[state=open]:text-secondary-600 group-aria-expanded/datepicker:text-secondary-600",
  error:
    "text-error-600 group-focus-within/datepicker:text-error-600 group-data-[state=open]/datepicker:text-error-600 group-data-[state=open]/field:text-error-600 group-data-[state=open]:text-error-600 group-aria-expanded/datepicker:text-error-600",
  success:
    "text-neutral-700 group-focus-within/datepicker:text-success-600 group-data-[state=open]/datepicker:text-success-600 group-data-[state=open]/field:text-success-600 group-data-[state=open]:text-success-600 group-aria-expanded/datepicker:text-success-600",
  warning:
    "text-neutral-700 group-focus-within/datepicker:text-warning-600 group-data-[state=open]/datepicker:text-warning-600 group-data-[state=open]/field:text-warning-600 group-data-[state=open]:text-warning-600 group-aria-expanded/datepicker:text-warning-600",
  info:
    "text-neutral-700 group-focus-within/datepicker:text-info-600 group-data-[state=open]/datepicker:text-info-600 group-data-[state=open]/field:text-info-600 group-data-[state=open]:text-info-600 group-aria-expanded/datepicker:text-info-600",
  neutral:
    "text-neutral-700 group-focus-within/datepicker:text-neutral-900 group-data-[state=open]/datepicker:text-neutral-900 group-data-[state=open]/field:text-neutral-900 group-data-[state=open]:text-neutral-900 group-aria-expanded/datepicker:text-neutral-900",
};

export const datePickerRadiusConfig: Record<DatePickerRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const calendarRadiusConfig: Record<DatePickerRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-2xl",
};

export const datePickerColorConfig: Record<
  DatePickerColor,
  {
    selected: string;
    selectedText: string;
    rangeBg: string;
    rangeText: string;
    hoverBg: string;
    todayRing: string;
    activeText: string;
    accentBg: string;
  }
> = {
  primary: {
    selected: "bg-primary-500 text-neutral-white hover:bg-primary-600",
    selectedText: "text-neutral-white",
    rangeBg: "bg-primary-100 text-primary-900",
    rangeText: "text-primary-900",
    hoverBg: "hover:bg-primary-200 hover:text-primary-900",
    todayRing: "border-primary-500 text-primary-500",
    activeText: "text-primary-500",
    accentBg: "bg-primary-500",
  },
  secondary: {
    selected: "bg-secondary-500 text-neutral-white hover:bg-secondary-600",
    selectedText: "text-neutral-white",
    rangeBg: "bg-secondary-100 text-secondary-900",
    rangeText: "text-secondary-900",
    hoverBg: "hover:bg-secondary-200 hover:text-secondary-900",
    todayRing: "border-secondary-500 text-secondary-500",
    activeText: "text-secondary-500",
    accentBg: "bg-secondary-500",
  },
  neutral: {
    selected: "bg-neutral-800 text-neutral-white hover:bg-neutral-900",
    selectedText: "text-neutral-white",
    rangeBg: "bg-neutral-200 text-neutral-900",
    rangeText: "text-neutral-900",
    hoverBg: "hover:bg-neutral-300 hover:text-neutral-900",
    todayRing: "border-neutral-600 text-neutral-600",
    activeText: "text-neutral-800",
    accentBg: "bg-neutral-800",
  },
  error: {
    selected: "bg-error-500 text-neutral-white hover:bg-error-600",
    selectedText: "text-neutral-white",
    rangeBg: "bg-error-100 text-error-900",
    rangeText: "text-error-900",
    hoverBg: "hover:bg-error-200 hover:text-error-900",
    todayRing: "border-error-500 text-error-500",
    activeText: "text-error-500",
    accentBg: "bg-error-500",
  },
  success: {
    selected: "bg-success-500 text-neutral-white hover:bg-success-600",
    selectedText: "text-neutral-white",
    rangeBg: "bg-success-100 text-success-900",
    rangeText: "text-success-900",
    hoverBg: "hover:bg-success-200 hover:text-success-900",
    todayRing: "border-success-500 text-success-500",
    activeText: "text-success-500",
    accentBg: "bg-success-500",
  },
  warning: {
    selected: "bg-warning-500 text-neutral-950 hover:bg-warning-600",
    selectedText: "text-neutral-950",
    rangeBg: "bg-warning-100 text-warning-900",
    rangeText: "text-warning-900",
    hoverBg: "hover:bg-warning-200 hover:text-warning-900",
    todayRing: "border-warning-500 text-warning-500",
    activeText: "text-warning-500",
    accentBg: "bg-warning-500",
  },
  info: {
    selected: "bg-info-500 text-neutral-white hover:bg-info-600",
    selectedText: "text-neutral-white",
    rangeBg: "bg-info-100 text-info-900",
    rangeText: "text-info-900",
    hoverBg: "hover:bg-info-200 hover:text-info-900",
    todayRing: "border-info-500 text-info-500",
    activeText: "text-info-500",
    accentBg: "bg-info-500",
  },
};

export const datePickerVariantStyles: Record<Exclude<DatePickerVariant, "other">, Record<DatePickerColor, string>> = {
  outline: {
    primary:
      "bg-neutral-white border-neutral-200 hover:border-neutral-300 focus-within:border-primary-500 focus-within:hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/25 data-[state=open]:border-primary-500 data-[state=open]:hover:border-primary-500 data-[state=open]:ring-2 data-[state=open]:ring-primary-500/25 aria-expanded:border-primary-500 aria-expanded:hover:border-primary-500 aria-expanded:ring-2 aria-expanded:ring-primary-500/25",
    secondary:
      "bg-neutral-white border-neutral-200 hover:border-neutral-300 focus-within:border-secondary-500 focus-within:hover:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/25 data-[state=open]:border-secondary-500 data-[state=open]:hover:border-secondary-500 data-[state=open]:ring-2 data-[state=open]:ring-secondary-500/25 aria-expanded:border-secondary-500 aria-expanded:hover:border-secondary-500 aria-expanded:ring-2 aria-expanded:ring-secondary-500/25",
    error:
      "bg-neutral-white border-error-400 hover:border-error-500 focus-within:border-error-500 focus-within:hover:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20 data-[state=open]:border-error-500 data-[state=open]:hover:border-error-500 data-[state=open]:ring-2 data-[state=open]:ring-error-500/20 aria-expanded:border-error-500 aria-expanded:hover:border-error-500 aria-expanded:ring-2 aria-expanded:ring-error-500/20",
    success:
      "bg-neutral-white border-success-400 hover:border-success-500 focus-within:border-success-500 focus-within:hover:border-success-500 focus-within:ring-2 focus-within:ring-success-500/25 data-[state=open]:border-success-500 data-[state=open]:hover:border-success-500 data-[state=open]:ring-2 data-[state=open]:ring-success-500/25 aria-expanded:border-success-500 aria-expanded:hover:border-success-500 aria-expanded:ring-2 aria-expanded:ring-success-500/25",
    warning:
      "bg-neutral-white border-warning-400 hover:border-warning-500 focus-within:border-warning-500 focus-within:hover:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/25 data-[state=open]:border-warning-500 data-[state=open]:hover:border-warning-500 data-[state=open]:ring-2 data-[state=open]:ring-warning-500/25 aria-expanded:border-warning-500 aria-expanded:hover:border-warning-500 aria-expanded:ring-2 aria-expanded:ring-warning-500/25",
    info: "bg-neutral-white border-info-400 hover:border-info-500 focus-within:border-info-500 focus-within:hover:border-info-500 focus-within:ring-2 focus-within:ring-info-500/25 data-[state=open]:border-info-500 data-[state=open]:hover:border-info-500 data-[state=open]:ring-2 data-[state=open]:ring-info-500/25 aria-expanded:border-info-500 aria-expanded:hover:border-info-500 aria-expanded:ring-2 aria-expanded:ring-info-500/25",
    neutral:
      "bg-neutral-white border-neutral-200 hover:border-neutral-300 focus-within:border-neutral-600 focus-within:hover:border-neutral-600 focus-within:ring-2 focus-within:ring-neutral-500/25 data-[state=open]:border-neutral-600 data-[state=open]:hover:border-neutral-600 data-[state=open]:ring-2 data-[state=open]:ring-neutral-500/25 aria-expanded:border-neutral-600 aria-expanded:hover:border-neutral-600 aria-expanded:ring-2 aria-expanded:ring-neutral-500/25",
  },

  filled: {
    primary:
      "bg-neutral-100 border-neutral-200 hover:bg-neutral-200/70 focus-within:bg-neutral-white focus-within:border-primary-500 focus-within:hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-primary-500 data-[state=open]:hover:border-primary-500 data-[state=open]:ring-2 data-[state=open]:ring-primary-500/20 aria-expanded:bg-neutral-white aria-expanded:border-primary-500 aria-expanded:hover:border-primary-500 aria-expanded:ring-2 aria-expanded:ring-primary-500/20",
    secondary:
      "bg-neutral-100 border-neutral-200 hover:bg-neutral-200/70 focus-within:bg-neutral-white focus-within:border-secondary-500 focus-within:hover:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-secondary-500 data-[state=open]:hover:border-secondary-500 data-[state=open]:ring-2 data-[state=open]:ring-secondary-500/20 aria-expanded:bg-neutral-white aria-expanded:border-secondary-500 aria-expanded:hover:border-secondary-500 aria-expanded:ring-2 aria-expanded:ring-secondary-500/20",
    neutral:
      "bg-neutral-100 border-neutral-200 hover:bg-neutral-200/70 focus-within:bg-neutral-white focus-within:border-neutral-600 focus-within:hover:border-neutral-600 focus-within:ring-2 focus-within:ring-neutral-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-neutral-600 data-[state=open]:hover:border-neutral-600 data-[state=open]:ring-2 data-[state=open]:ring-neutral-500/20 aria-expanded:bg-neutral-white aria-expanded:border-neutral-600 aria-expanded:hover:border-neutral-600 aria-expanded:ring-2 aria-expanded:ring-neutral-500/20",
    error:
      "bg-error-50/70 border-error-300 hover:border-error-400 focus-within:bg-neutral-white focus-within:border-error-500 focus-within:hover:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-error-500 data-[state=open]:hover:border-error-500 data-[state=open]:ring-2 data-[state=open]:ring-error-500/20 aria-expanded:bg-neutral-white aria-expanded:border-error-500 aria-expanded:hover:border-error-500 aria-expanded:ring-2 aria-expanded:ring-error-500/20",
    success:
      "bg-success-50/70 border-success-300 hover:border-success-400 focus-within:bg-neutral-white focus-within:border-success-500 focus-within:hover:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-success-500 data-[state=open]:hover:border-success-500 data-[state=open]:ring-2 data-[state=open]:ring-success-500/20 aria-expanded:bg-neutral-white aria-expanded:border-success-500 aria-expanded:hover:border-success-500 aria-expanded:ring-2 aria-expanded:ring-success-500/20",
    warning:
      "bg-warning-50/70 border-warning-300 hover:border-warning-400 focus-within:bg-neutral-white focus-within:border-warning-500 focus-within:hover:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-warning-500 data-[state=open]:hover:border-warning-500 data-[state=open]:ring-2 data-[state=open]:ring-warning-500/20 aria-expanded:bg-neutral-white aria-expanded:border-warning-500 aria-expanded:hover:border-warning-500 aria-expanded:ring-2 aria-expanded:ring-warning-500/20",
    info: "bg-info-50/70 border-info-300 hover:border-info-400 focus-within:bg-neutral-white focus-within:border-info-500 focus-within:hover:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-info-500 data-[state=open]:hover:border-info-500 data-[state=open]:ring-2 data-[state=open]:ring-info-500/20 aria-expanded:bg-neutral-white aria-expanded:border-info-500 aria-expanded:hover:border-info-500 aria-expanded:ring-2 aria-expanded:ring-info-500/20",
  },
  ghost: {
    primary:
      "bg-transparent border-transparent hover:bg-neutral-100/70 focus-within:bg-neutral-white focus-within:border-primary-500 focus-within:hover:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-primary-500 data-[state=open]:hover:border-primary-500 data-[state=open]:ring-2 data-[state=open]:ring-primary-500/20 aria-expanded:bg-neutral-white aria-expanded:border-primary-500 aria-expanded:hover:border-primary-500 aria-expanded:ring-2 aria-expanded:ring-primary-500/20",
    secondary:
      "bg-transparent border-transparent hover:bg-neutral-100/70 focus-within:bg-neutral-white focus-within:border-secondary-500 focus-within:hover:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-secondary-500 data-[state=open]:hover:border-secondary-500 data-[state=open]:ring-2 data-[state=open]:ring-secondary-500/20 aria-expanded:bg-neutral-white aria-expanded:border-secondary-500 aria-expanded:hover:border-secondary-500 aria-expanded:ring-2 aria-expanded:ring-secondary-500/20",
    neutral:
      "bg-transparent border-transparent hover:bg-neutral-100/70 focus-within:bg-neutral-white focus-within:border-neutral-600 focus-within:hover:border-neutral-600 focus-within:ring-2 focus-within:ring-neutral-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-neutral-600 data-[state=open]:hover:border-neutral-600 data-[state=open]:ring-2 data-[state=open]:ring-neutral-500/20 aria-expanded:bg-neutral-white aria-expanded:border-neutral-600 aria-expanded:hover:border-neutral-600 aria-expanded:ring-2 aria-expanded:ring-neutral-500/20",
    error:
      "bg-transparent border-transparent hover:bg-error-50 focus-within:bg-neutral-white focus-within:border-error-500 focus-within:hover:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-error-500 data-[state=open]:hover:border-error-500 data-[state=open]:ring-2 data-[state=open]:ring-error-500/20 aria-expanded:bg-neutral-white aria-expanded:border-error-500 aria-expanded:hover:border-error-500 aria-expanded:ring-2 aria-expanded:ring-error-500/20",
    success:
      "bg-transparent border-transparent hover:bg-success-50 focus-within:bg-neutral-white focus-within:border-success-500 focus-within:hover:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-success-500 data-[state=open]:hover:border-success-500 data-[state=open]:ring-2 data-[state=open]:ring-success-500/20 aria-expanded:bg-neutral-white aria-expanded:border-success-500 aria-expanded:hover:border-success-500 aria-expanded:ring-2 aria-expanded:ring-success-500/20",
    warning:
      "bg-transparent border-transparent hover:bg-warning-50 focus-within:bg-neutral-white focus-within:border-warning-500 focus-within:hover:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-warning-500 data-[state=open]:hover:border-warning-500 data-[state=open]:ring-2 data-[state=open]:ring-warning-500/20 aria-expanded:bg-neutral-white aria-expanded:border-warning-500 aria-expanded:hover:border-warning-500 aria-expanded:ring-2 aria-expanded:ring-warning-500/20",
    info: "bg-transparent border-transparent hover:bg-info-50 focus-within:bg-neutral-white focus-within:border-info-500 focus-within:hover:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20 data-[state=open]:bg-neutral-white data-[state=open]:border-info-500 data-[state=open]:hover:border-info-500 data-[state=open]:ring-2 data-[state=open]:ring-info-500/20 aria-expanded:bg-neutral-white aria-expanded:border-info-500 aria-expanded:hover:border-info-500 aria-expanded:ring-2 aria-expanded:ring-info-500/20",
  },
};
