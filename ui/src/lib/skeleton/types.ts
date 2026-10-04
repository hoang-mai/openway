import { Ref } from "react";
import { HTMLAttributes } from "react";
import type { ImageProps } from "next/image";
import type { ServerFile } from "../file-preview/types";

export type SkeletonVariant = "pulse" | "wave" | "none";
export type SkeletonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type SkeletonShape = "rectangle" | "circle";
export type SkeletonObjectFit = "cover" | "contain" | "fill" | "none" | "scale-down";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref trỏ tới phần tử div bên ngoài.
   */
  ref?: Ref<HTMLDivElement>;
  /**
   * Kiểu animation hiển thị:
   * - 'pulse': nhịp thở opacity (mặc định)
   * - 'wave': shimmer chạy từ góc trên-trái xuống góc dưới-phải
   * - 'none': không animation (static placeholder)
   * @default 'pulse'
   */
  variant?: SkeletonVariant;

  /**
   * Hình dạng của skeleton:
   * - 'rectangle': hình chữ nhật, kết hợp với `radius` để bo góc (mặc định)
   * - 'circle': hình tròn hoàn toàn, `width` === `height`, bỏ qua `radius`
   * @default 'rectangle'
   */
  shape?: SkeletonShape;

  /**
   * Độ bo góc, chỉ áp dụng khi `shape === 'rectangle'`
   * @default 'md'
   */
  radius?: SkeletonRadius;

  /**
   * Chiều rộng (CSS string hoặc số px)
   * @example "100%", "200px", 200
   */
  width?: string | number;

  /**
   * Chiều cao (CSS string hoặc số px)
   * @example "1rem", "40px", 40
   * @default "1rem"
   */
  height?: string | number;

  /**
   * Số lượng dòng skeleton xếp theo cột.
   * Khi > 1, dòng cuối cùng sẽ tự động thu hẹp còn 60% width để mô phỏng đoạn văn tự nhiên.
   * @default 1
   */
  lines?: number;

  /**
   * Khoảng cách giữa các dòng khi `lines > 1` (CSS string hoặc số px)
   * @default "0.5rem"
   */
  gap?: string | number;
}

export interface LoadingImageProps extends Omit<ImageProps, "onLoad" | "onError" | "alt" | "src" | "onClick"> {
  /**
   * Đường dẫn ảnh, đối tượng File / Blob hoặc ServerFile ({ src/url, name, ... }). Tùy chọn khi chỉ hiển thị skeleton placeholder.
   */
  src?: ImageProps["src"] | File | Blob | ServerFile;

  /**
   * Văn bản thay thế cho ảnh. Mặc định là chuỗi rỗng.
   * @default ""
   */
  alt?: string;

  /**
   * Kiểu animation của skeleton khi đang tải ảnh.
   * @default 'pulse'
   */
  skeletonVariant?: SkeletonVariant;

  /**
   * Độ bo góc áp dụng đồng thời cho skeleton placeholder và ảnh.
   * @default 'md'
   */
  radius?: SkeletonRadius;

  /**
   * Kiểu căn chỉnh hiển thị ảnh (object-fit).
   * @default 'cover'
   */
  objectFit?: SkeletonObjectFit;

  /**
   * Bật tính năng click vào ảnh để xem trước phóng to qua FilePreview (trong FileContainer modal).
   * @default true
   */
  preview?: boolean;

  /**
   * Class CSS tuỳ thêm cho wrapper bên ngoài.
   */
  wrapperClassName?: string;

  /**
   * Inline style tuỳ thêm cho wrapper bên ngoài.
   */
  wrapperStyle?: React.CSSProperties;

  /**
   * Callback khi người dùng click vào ảnh / wrapper.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Callback được gọi khi ảnh tải thành công.
   */
  onLoad?: ImageProps["onLoad"];

  /**
   * Callback được gọi khi ảnh gặp lỗi tải.
   */
  onError?: ImageProps["onError"];

  /**
   * Ref trỏ tới phần tử wrapper div bên ngoài.
   */
  ref?: Ref<HTMLDivElement>;
}
