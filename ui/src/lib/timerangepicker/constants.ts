import { TimeRangePickerColor } from "./types";
import {
  timePickerSizeConfig,
  timePickerRadiusConfig,
  timeViewRadiusConfig,
  timePickerVariantStyles,
} from "../timepicker/constants";

/**
 * Re-export & alias các cấu hình kích thước từ timepicker
 */
export const timeRangePickerSizeConfig = timePickerSizeConfig;

/**
 * Re-export & alias cấu hình bo góc từ timepicker
 */
export const timeRangePickerRadiusConfig = timePickerRadiusConfig;

/**
 * Re-export & alias cấu hình bo góc cho khung bảng TimeView
 */
export const timeRangeViewRadiusConfig = timeViewRadiusConfig;

/**
 * Re-export & alias cấu hình biến thể từ timepicker
 */
export const timeRangePickerVariantStyles = timePickerVariantStyles;

/**
 * Cấu hình màu chữ của nhãn label theo màu chủ đề
 */
export const labelColorConfig: Record<TimeRangePickerColor, string> = {
  primary:
    "text-neutral-700 group-focus-within/timerangepicker:text-primary-600 group-data-[state=open]/timerangepicker:text-primary-600 group-data-[state=open]/field:text-primary-600 group-data-[state=open]:text-primary-600 group-aria-expanded/timerangepicker:text-primary-600",
  secondary:
    "text-neutral-700 group-focus-within/timerangepicker:text-secondary-600 group-data-[state=open]/timerangepicker:text-secondary-600 group-data-[state=open]/field:text-secondary-600 group-data-[state=open]:text-secondary-600 group-aria-expanded/timerangepicker:text-secondary-600",
  error:
    "text-error-600 group-focus-within/timerangepicker:text-error-600 group-data-[state=open]/timerangepicker:text-error-600 group-data-[state=open]/field:text-error-600 group-data-[state=open]:text-error-600 group-aria-expanded/timerangepicker:text-error-600",
  success:
    "text-neutral-700 group-focus-within/timerangepicker:text-success-600 group-data-[state=open]/timerangepicker:text-success-600 group-data-[state=open]/field:text-success-600 group-data-[state=open]:text-success-600 group-aria-expanded/timerangepicker:text-success-600",
  warning:
    "text-neutral-700 group-focus-within/timerangepicker:text-warning-600 group-data-[state=open]/timerangepicker:text-warning-600 group-data-[state=open]/field:text-warning-600 group-data-[state=open]:text-warning-600 group-aria-expanded/timerangepicker:text-warning-600",
  info:
    "text-neutral-700 group-focus-within/timerangepicker:text-info-600 group-data-[state=open]/timerangepicker:text-info-600 group-data-[state=open]/field:text-info-600 group-data-[state=open]:text-info-600 group-aria-expanded/timerangepicker:text-info-600",
  neutral:
    "text-neutral-700 group-focus-within/timerangepicker:text-neutral-900 group-data-[state=open]/timerangepicker:text-neutral-900 group-data-[state=open]/field:text-neutral-900 group-data-[state=open]:text-neutral-900 group-aria-expanded/timerangepicker:text-neutral-900",
};
