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
  primary: "text-primary-500 group-focus-within/timerangepicker:text-primary-600",
  secondary: "text-secondary-500 group-focus-within/timerangepicker:text-secondary-600",
  error: "text-error-500 group-focus-within/timerangepicker:text-error-600",
  success: "text-success-500 group-focus-within/timerangepicker:text-success-600",
  warning: "text-warning-500 group-focus-within/timerangepicker:text-warning-600",
  info: "text-info-500 group-focus-within/timerangepicker:text-info-600",
  neutral: "text-neutral-500 group-focus-within/timerangepicker:text-neutral-600",
};
