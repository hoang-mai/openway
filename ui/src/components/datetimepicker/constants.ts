import {
  DateTimePickerColor,
  DateTimePickerRadius,
  DateTimePickerSize,
  DateTimePickerVariant,
} from "./types";

/**
 * Cấu hình bo góc cho ô nhập liệu DateTimePicker
 */
export const dateTimePickerRadiusConfig: Record<DateTimePickerRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

/**
 * Cấu hình bo góc cho khung popover bảng chọn DateTimePicker
 */
export const dateTimeViewRadiusConfig: Record<DateTimePickerRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-2xl",
};

/**
 * Cấu hình kích cỡ, khoảng đệm, typography và kích thước icon cho DateTimePicker
 */
export const dateTimePickerSizeConfig: Record<
  DateTimePickerSize,
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
    calendarPadding: "p-4",
    cellSize: "w-12 h-12",
    cellText: "text-lg",
    headerText: "text-lg font-semibold",
    headerButtonSize: "h-10 w-10",
    label: "text-lg mb-2",
    floatingLabel: "text-sm",
    helper: "text-sm mt-1.5",
  },
};

/**
 * Cấu hình màu chữ của nhãn label theo màu chủ đề
 */
export const labelColorConfig: Record<DateTimePickerColor, string> = {
  primary: "text-primary-500 group-focus-within/datetimepicker:text-primary-600",
  secondary: "text-secondary-500 group-focus-within/datetimepicker:text-secondary-600",
  error: "text-error-500 group-focus-within/datetimepicker:text-error-600",
  success: "text-success-500 group-focus-within/datetimepicker:text-success-600",
  warning: "text-warning-500 group-focus-within/datetimepicker:text-warning-600",
  info: "text-info-500 group-focus-within/datetimepicker:text-info-600",
  neutral: "text-neutral-500 group-focus-within/datetimepicker:text-neutral-600",
};

/**
 * Cấu hình style viền và nền ô input cho 3 variant (outline, filled, ghost)
 */
export const dateTimePickerVariantStyles: Record<
  Exclude<DateTimePickerVariant, "other">,
  Record<DateTimePickerColor, string>
> = {
  outline: {
    primary:
      "bg-neutral-white border-2 border-neutral-300 hover:border-primary-400 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-neutral-white border-2 border-neutral-300 hover:border-secondary-400 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    error:
      "bg-neutral-white border-2 border-error-500 hover:border-error-600 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-neutral-white border-2 border-neutral-300 hover:border-success-400 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-neutral-white border-2 border-neutral-300 hover:border-warning-400 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-neutral-white border-2 border-neutral-300 hover:border-info-400 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
    neutral:
      "bg-neutral-white border-2 border-neutral-300 hover:border-neutral-400 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/20",
  },
  filled: {
    primary:
      "bg-primary-50/60 border-2 border-transparent hover:bg-primary-100/60 focus-within:bg-primary-100/60 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-secondary-50/60 border-2 border-transparent hover:bg-secondary-100/60 focus-within:bg-secondary-100/60 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    error:
      "bg-error-50/60 border-2 border-transparent hover:border-error-600 hover:bg-error-100/60 focus-within:bg-error-100/60 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-success-50/60 border-2 border-transparent hover:bg-success-100/60 focus-within:bg-success-100/60 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-warning-50/60 border-2 border-transparent hover:bg-warning-100/60 focus-within:bg-warning-100/60 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-info-50/60 border-2 border-transparent hover:bg-info-100/60 focus-within:bg-info-100/60 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
    neutral:
      "bg-neutral-50/60 border-2 border-transparent hover:bg-neutral-200/60 focus-within:bg-neutral-200/60 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/20",
  },
  ghost: {
    primary:
      "bg-transparent border-2 border-transparent hover:bg-primary-50/50 focus-within:bg-primary-50/50 focus-within:border-primary-200/20 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-transparent border-2 border-transparent hover:bg-secondary-50/50 focus-within:bg-secondary-50/50 focus-within:border-secondary-200/20 focus-within:ring-2 focus-within:ring-secondary-500/20",
    error:
      "bg-transparent border-2 border-transparent hover:bg-error-50/50 focus-within:bg-error-50/50 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-transparent border-2 border-transparent hover:bg-success-50/50 focus-within:bg-success-50/50 focus-within:border-success-200/20 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-transparent border-2 border-transparent hover:bg-warning-50/50 focus-within:bg-warning-50/50 focus-within:border-warning-200/20 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-transparent border-2 border-transparent hover:bg-info-50/50 focus-within:bg-info-50/50 focus-within:border-info-200/20 focus-within:ring-2 focus-within:ring-info-500/20",
    neutral:
      "bg-transparent border-2 border-transparent hover:bg-neutral-50/50 focus-within:bg-neutral-50/50 focus-within:border-neutral-200/20 focus-within:ring-2 focus-within:ring-neutral-500/20",
  },
};
