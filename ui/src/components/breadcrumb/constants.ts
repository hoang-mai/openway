import {
  BreadcrumbColor,
  BreadcrumbRadius,
  BreadcrumbSize,
  BreadcrumbUnderline,
  BreadcrumbVariant,
} from "./types";

/**
 * Cấu hình kích thước của các phần tử trong Breadcrumb
 */
export const sizeConfig: Record<
  BreadcrumbSize,
  {
    list: string;
    item: string;
    link: string;
    page: string;
    icon: string;
    separator: string;
    ellipsis: string;
    badge: string;
  }
> = {
  sm: {
    list: "gap-1 text-xs",
    item: "gap-1 text-xs",
    link: "px-1.5 py-0.5 text-xs gap-1 min-h-[24px]",
    page: "px-1.5 py-0.5 text-xs gap-1 min-h-[24px]",
    icon: "size-3.5",
    separator: "size-3.5 text-neutral-400",
    ellipsis: "size-6 text-xs",
    badge: "text-[10px]",
  },
  md: {
    list: "gap-1.5 text-sm",
    item: "gap-1.5 text-sm",
    link: "px-2 py-1 text-sm gap-1.5 min-h-[28px]",
    page: "px-2 py-1 text-sm gap-1.5 min-h-[28px]",
    icon: "size-4",
    separator: "size-4 text-neutral-400",
    ellipsis: "size-7 text-sm",
    badge: "text-xs",
  },
  lg: {
    list: "gap-2 text-base",
    item: "gap-2 text-base",
    link: "px-2.5 py-1 text-base gap-2 min-h-[32px]",
    page: "px-2.5 py-1 text-base gap-2 min-h-[32px]",
    icon: "size-4.5",
    separator: "size-4.5 text-neutral-400",
    ellipsis: "size-8 text-base",
    badge: "text-xs",
  },
};

/**
 * Cấu hình độ bo góc
 */
export const radiusConfig: Record<BreadcrumbRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

/**
 * Cấu hình kiểu gạch chân khi tương tác
 */
export const underlineConfig: Record<BreadcrumbUnderline, string> = {
  none: "no-underline hover:no-underline",
  hover: "hover:underline underline-offset-4",
  always: "underline underline-offset-4",
};

/**
 * Vòng hào quang focus-visible chuẩn OpenWay (chỉ kích hoạt khi tab bàn phím)
 */
export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/35 transition-shadow";

/**
 * Cấu hình màu sắc & biến thể cho liên kết BreadcrumbLink
 */
export const variantColorConfig: Record<
  Exclude<BreadcrumbVariant, "other">,
  Record<BreadcrumbColor, string>
> = {
  standard: {
    neutral:
      "text-neutral-500 hover:text-neutral-900 active:text-neutral-950",
    primary:
      "text-neutral-500 hover:text-primary-600 active:text-primary-700",
    secondary:
      "text-neutral-500 hover:text-secondary-600 active:text-secondary-700",
    error:
      "text-neutral-500 hover:text-error-600 active:text-error-700",
    success:
      "text-neutral-500 hover:text-success-600 active:text-success-700",
    warning:
      "text-neutral-500 hover:text-warning-800 active:text-warning-900",
    info:
      "text-neutral-500 hover:text-info-600 active:text-info-700",
  },
  solid: {
    neutral:
      "bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80 hover:text-neutral-900 active:bg-neutral-300/80",
    primary:
      "bg-primary-50 text-primary-700 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200",
    secondary:
      "bg-secondary-50 text-secondary-700 hover:bg-secondary-100 hover:text-secondary-800 active:bg-secondary-200",
    error:
      "bg-error-50 text-error-700 hover:bg-error-100 hover:text-error-800 active:bg-error-200",
    success:
      "bg-success-50 text-success-700 hover:bg-success-100 hover:text-success-800 active:bg-success-200",
    warning:
      "bg-warning-50 text-warning-800 hover:bg-warning-100 hover:text-warning-900 active:bg-warning-200",
    info:
      "bg-info-50 text-info-700 hover:bg-info-100 hover:text-info-800 active:bg-info-200",
  },
  bordered: {
    neutral:
      "border border-neutral-200/80 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900",
    primary:
      "border border-primary-200/80 text-primary-700 hover:border-primary-300 hover:bg-primary-50/60",
    secondary:
      "border border-secondary-200/80 text-secondary-700 hover:border-secondary-300 hover:bg-secondary-50/60",
    error:
      "border border-error-200/80 text-error-700 hover:border-error-300 hover:bg-error-50/60",
    success:
      "border border-success-200/80 text-success-700 hover:border-success-300 hover:bg-success-50/60",
    warning:
      "border border-warning-200/80 text-warning-800 hover:border-warning-300 hover:bg-warning-50/60",
    info:
      "border border-info-200/80 text-info-700 hover:border-info-300 hover:bg-info-50/60",
  },
};

/**
 * Cấu hình màu sắc của trang hiện tại (BreadcrumbPage / Current item)
 */
export const currentPageColorConfig: Record<
  BreadcrumbColor,
  string
> = {
  neutral: "text-neutral-900 font-medium",
  primary: "text-primary-700 font-semibold",
  secondary: "text-secondary-700 font-semibold",
  error: "text-error-700 font-semibold",
  success: "text-success-700 font-semibold",
  warning: "text-warning-900 font-semibold",
  info: "text-info-700 font-semibold",
};
