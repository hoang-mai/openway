import { TimePickerColor, TimePickerRadius, TimePickerSize, TimePickerVariant } from "./types";

/**
 * Cấu hình kích thước chuẩn hóa cho TimePicker (5 sizes: xs, sm, md, lg, xl)
 */
export const timePickerSizeConfig: Record<
  TimePickerSize,
  {
    inputHeight: string;
    inputText: string;
    inputPadding: string;
    icon: string;
    iconSize: number;
    panelPadding: string;
    columnWidth: string;
    columnHeight: string;
    itemHeight: string;
    itemText: string;
    headerText: string;
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
    panelPadding: "p-1.5",
    columnWidth: "w-12",
    columnHeight: "h-36",
    itemHeight: "h-6",
    itemText: "text-[11px]",
    headerText: "text-[11px] font-semibold",
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
    panelPadding: "p-2",
    columnWidth: "w-14",
    columnHeight: "h-44",
    itemHeight: "h-7",
    itemText: "text-xs",
    headerText: "text-xs font-semibold",
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
    panelPadding: "p-2.5",
    columnWidth: "w-16",
    columnHeight: "h-52",
    itemHeight: "h-8",
    itemText: "text-sm",
    headerText: "text-sm font-semibold",
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
    panelPadding: "p-3",
    columnWidth: "w-18",
    columnHeight: "h-60",
    itemHeight: "h-9",
    itemText: "text-base",
    headerText: "text-base font-semibold",
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
    panelPadding: "p-3.5",
    columnWidth: "w-20",
    columnHeight: "h-68",
    itemHeight: "h-10",
    itemText: "text-base",
    headerText: "text-lg font-semibold",
    label: "text-lg mb-2",
    floatingLabel: "text-xs",
    helper: "text-sm mt-1",
  },
};

/**
 * Cấu hình mức độ bo góc cho ô nhập liệu TimePicker
 */
export const timePickerRadiusConfig: Record<TimePickerRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

/**
 * Cấu hình mức độ bo góc cho khung bảng TimeView (tương tự calendarRadiusConfig)
 */
export const timeViewRadiusConfig: Record<TimePickerRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-2xl",
};

/**
 * Cấu hình mức độ bo góc cho từng mục (item) trong cột TimeColumn
 */
export const timeItemRadiusConfig: Record<TimePickerRadius, string> = {
  none: "rounded-none",
  sm: "rounded-xs",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-lg",
  full: "rounded-full",
};

/**
 * Bảng phối màu chuẩn Design System cho TimePicker (7 chủ đề màu)
 */
export const timePickerColorConfig: Record<
  TimePickerColor,
  {
    selected: string;
    hoverBg: string;
    activeText: string;
    accentBg: string;
  }
> = {
  primary: {
    selected: "bg-primary-500 text-neutral-white font-semibold shadow-xs hover:bg-primary-600",
    hoverBg: "hover:bg-primary-100 hover:text-primary-900",
    activeText: "text-primary-600",
    accentBg: "bg-primary-500",
  },
  secondary: {
    selected: "bg-secondary-500 text-neutral-white font-semibold shadow-xs hover:bg-secondary-600",
    hoverBg: "hover:bg-secondary-100 hover:text-secondary-900",
    activeText: "text-secondary-600",
    accentBg: "bg-secondary-500",
  },
  neutral: {
    selected: "bg-neutral-800 text-neutral-white font-semibold shadow-xs hover:bg-neutral-900",
    hoverBg: "hover:bg-neutral-200 hover:text-neutral-900",
    activeText: "text-neutral-800",
    accentBg: "bg-neutral-800",
  },
  error: {
    selected: "bg-error-500 text-neutral-white font-semibold shadow-xs hover:bg-error-600",
    hoverBg: "hover:bg-error-100 hover:text-error-900",
    activeText: "text-error-600",
    accentBg: "bg-error-500",
  },
  success: {
    selected: "bg-success-500 text-neutral-white font-semibold shadow-xs hover:bg-success-600",
    hoverBg: "hover:bg-success-100 hover:text-success-900",
    activeText: "text-success-600",
    accentBg: "bg-success-500",
  },
  warning: {
    selected: "bg-warning-500 text-neutral-950 font-semibold shadow-xs hover:bg-warning-600",
    hoverBg: "hover:bg-warning-100 hover:text-warning-900",
    activeText: "text-warning-700",
    accentBg: "bg-warning-500",
  },
  info: {
    selected: "bg-info-500 text-neutral-white font-semibold shadow-xs hover:bg-info-600",
    hoverBg: "hover:bg-info-100 hover:text-info-900",
    activeText: "text-info-600",
    accentBg: "bg-info-500",
  },
};

/**
 * Cấu hình màu chữ của nhãn label theo màu chủ đề
 */
export const labelColorConfig: Record<TimePickerColor, string> = {
  primary: "text-primary-500 group-focus-within/timepicker:text-primary-600",
  secondary: "text-secondary-500 group-focus-within/timepicker:text-secondary-600",
  error: "text-error-500 group-focus-within/timepicker:text-error-600",
  success: "text-success-500 group-focus-within/timepicker:text-success-600",
  warning: "text-warning-500 group-focus-within/timepicker:text-warning-600",
  info: "text-info-500 group-focus-within/timepicker:text-info-600",
  neutral: "text-neutral-500 group-focus-within/timepicker:text-neutral-600",
};

/**
 * Cấu hình biến thể giao diện ô nhập (outline, filled, ghost) kết hợp màu chủ đề
 */
export const timePickerVariantStyles: Record<
  Exclude<TimePickerVariant, "other">,
  Record<TimePickerColor, string>
> = {
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
