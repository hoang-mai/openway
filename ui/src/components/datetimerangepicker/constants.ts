import {
  DateTimeRangePickerColor,
  DateTimeRangePickerSize,
} from "./types";
/**
 * Cấu hình kích cỡ, khoảng đệm, typography và kích thước chiều rộng tối thiểu thoải mái cho 2 chuỗi ngày giờ
 */
export const dateTimeRangePickerSizeConfig: Record<
  DateTimeRangePickerSize,
  {
    inputHeight: string;
    inputText: string;
    inputPadding: string;
    minWidth: string;
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
    minWidth: "min-w-72",
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
    minWidth: "min-w-80",
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
    minWidth: "min-w-96",
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
    minWidth: "min-w-105",
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
    minWidth: "min-w-120",
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
 * Cấu hình màu chữ của nhãn label theo màu chủ đề với prefix group-focus-within/datetimerangepicker
 */
export const labelColorConfig: Record<DateTimeRangePickerColor, string> = {
  primary:
    "text-neutral-700 group-focus-within/datetimerangepicker:text-primary-600 group-data-[state=open]/datetimerangepicker:text-primary-600 group-data-[state=open]/field:text-primary-600 group-data-[state=open]:text-primary-600 group-aria-expanded/datetimerangepicker:text-primary-600",
  secondary:
    "text-neutral-700 group-focus-within/datetimerangepicker:text-secondary-600 group-data-[state=open]/datetimerangepicker:text-secondary-600 group-data-[state=open]/field:text-secondary-600 group-data-[state=open]:text-secondary-600 group-aria-expanded/datetimerangepicker:text-secondary-600",
  error:
    "text-error-500 group-focus-within/datetimerangepicker:text-error-600 group-data-[state=open]/datetimerangepicker:text-error-600 group-data-[state=open]/field:text-error-600 group-data-[state=open]:text-error-600 group-aria-expanded/datetimerangepicker:text-error-600",
  success:
    "text-success-500 group-focus-within/datetimerangepicker:text-success-600 group-data-[state=open]/datetimerangepicker:text-success-600 group-data-[state=open]/field:text-success-600 group-data-[state=open]:text-success-600 group-aria-expanded/datetimerangepicker:text-success-600",
  warning:
    "text-warning-500 group-focus-within/datetimerangepicker:text-warning-600 group-data-[state=open]/datetimerangepicker:text-warning-600 group-data-[state=open]/field:text-warning-600 group-data-[state=open]:text-warning-600 group-aria-expanded/datetimerangepicker:text-warning-600",
  info:
    "text-info-500 group-focus-within/datetimerangepicker:text-info-600 group-data-[state=open]/datetimerangepicker:text-info-600 group-data-[state=open]/field:text-info-600 group-data-[state=open]:text-info-600 group-aria-expanded/datetimerangepicker:text-info-600",
  neutral:
    "text-neutral-700 group-focus-within/datetimerangepicker:text-neutral-900 group-data-[state=open]/datetimerangepicker:text-neutral-900 group-data-[state=open]/field:text-neutral-900 group-data-[state=open]:text-neutral-900 group-aria-expanded/datetimerangepicker:text-neutral-900",
};

/**
 * Cấu hình màu sắc của nút chuyển bước (Active) và nút Áp dụng theo màu chủ đề (Theme Color)
 */
export const dateTimeRangePickerButtonColorConfig: Record<
  DateTimeRangePickerColor,
  {
    activeStep: string;
    applyButton: string;
  }
> = {
  primary: {
    activeStep: "bg-primary-500 border-primary-500 text-neutral-white shadow-xs",
    applyButton: "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-neutral-white shadow-xs",
  },
  secondary: {
    activeStep: "bg-secondary-500 border-secondary-500 text-neutral-white shadow-xs",
    applyButton: "bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-neutral-white shadow-xs",
  },
  error: {
    activeStep: "bg-error-500 border-error-500 text-neutral-white shadow-xs",
    applyButton: "bg-error-500 hover:bg-error-600 active:bg-error-700 text-neutral-white shadow-xs",
  },
  success: {
    activeStep: "bg-success-500 border-success-500 text-neutral-white shadow-xs",
    applyButton: "bg-success-500 hover:bg-success-600 active:bg-success-700 text-neutral-white shadow-xs",
  },
  warning: {
    activeStep: "bg-warning-500 border-warning-500 text-neutral-950 shadow-xs",
    applyButton: "bg-warning-500 hover:bg-warning-600 active:bg-warning-700 text-neutral-950 shadow-xs",
  },
  info: {
    activeStep: "bg-info-500 border-info-500 text-neutral-white shadow-xs",
    applyButton: "bg-info-500 hover:bg-info-600 active:bg-info-700 text-neutral-white shadow-xs",
  },
  neutral: {
    activeStep: "bg-neutral-800 border-neutral-800 text-neutral-white shadow-xs",
    applyButton: "bg-neutral-800 hover:bg-neutral-900 active:bg-neutral-950 text-neutral-white shadow-xs",
  },
};
