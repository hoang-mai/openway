import { SkeletonObjectFit, SkeletonRadius, SkeletonVariant } from "./types";

/**
 * Animation class theo variant.
 * Variant 'wave' dùng class CSS tùy chỉnh `.skeleton-wave` được định nghĩa trong styles.css.
 */
export const variantConfig: Record<SkeletonVariant, string> = {
  pulse: "animate-pulse",
  wave: "skeleton-wave",
  none: "",
};

/**
 * Bo góc theo radius.
 * Chỉ áp dụng khi shape === 'rectangle'.
 */
export const radiusConfig: Record<SkeletonRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

/**
 * Kiểu căn chỉnh ảnh (object-fit) cho LoadingImage.
 */
export const objectFitConfig: Record<SkeletonObjectFit, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};
