import React from "react";
import { EmptyPresetImage } from "./types";

/**
 * Danh sách các preset hình ảnh mặc định hỗ trợ bởi Empty component
 */
export const PRESETS: EmptyPresetImage[] = ["default", "search", "error", "folder", "simple"];

/**
 * Kiểm tra xem một giá trị có phải là preset hình ảnh hợp lệ hay không
 */
export function isPresetImage(val: unknown): val is EmptyPresetImage {
  return typeof val === "string" && PRESETS.includes(val as EmptyPresetImage);
}

/**
 * Kiểm tra xem một giá trị có phải là đường dẫn URL / định dạng hình ảnh hay không
 */
export function isUrlString(val: unknown): val is string {
  if (typeof val !== "string") return false;
  return (
    val.startsWith("http://") ||
    val.startsWith("https://") ||
    val.startsWith("/") ||
    val.startsWith("./") ||
    val.startsWith("data:") ||
    /\.(png|jpe?g|svg|webp|gif|avif)$/i.test(val)
  );
}

/**
 * Tạo inline style cho kích thước hình ảnh nếu `imageSize` được cung cấp
 */
export function getImageInlineStyle(imageSize?: number | string): React.CSSProperties {
  if (!imageSize) return {};
  const dimension = typeof imageSize === "number" ? `${imageSize}px` : imageSize;
  return {
    width: dimension,
    height: dimension,
  };
}
