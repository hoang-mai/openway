import { HTMLAttributes, ReactNode, Ref } from "react";

export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BadgeVariant = "soft" | "filled" | "outline" | "ghost" | "other";
export type BadgeUIColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
export type BadgeColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "neutral" | BadgeUIColor;
export type BadgeRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML span
   */
  ref?: Ref<HTMLSpanElement>;

  /**
   * Kích cỡ của badge (5 sizes: xs, sm, md, lg, xl)
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Biến thể giao diện của badge:
   * - 'soft': nền nhạt pastel, viền mờ, chữ đậm (mặc định)
   * - 'filled': nền màu đậm, chữ tương phản
   * - 'outline': viền nét 1px, nền trong suốt
   * - 'ghost': không viền, nền trong suốt
   * - 'other': không áp dụng style màu mặc định, tự do tùy biến qua className
   * @default 'soft'
   */
  variant?: BadgeVariant;

  /**
   * Chủ đề màu sắc (primary, secondary, error, success, warning, info, neutral)
   * @default 'primary'
   */
  color?: BadgeColor;

  /**
   * Tùy chỉnh độ bo góc:
   * - 'none': góc vuông 0px
   * - 'sm': bo góc nhỏ
   * - 'md': bo góc vừa
   * - 'lg': bo góc lớn
   * - 'xl': bo góc rất lớn
   * - 'full': bo tròn hoàn toàn (Pill)
   * @default 'full'
   */
  radius?: BadgeRadius;

  /**
   * Hiển thị chấm tròn trạng thái (Status indicator dot)
   * @default false
   */
  dot?: boolean;

  /**
   * Hiệu ứng radar ping nhấp nháy cho chấm trạng thái (khi dot=true)
   * @default false
   */
  dotPing?: boolean;

  /**
   * Icon hoặc phần tử hiển thị phía trước nội dung
   */
  leftIcon?: ReactNode;

  /**
   * Icon hoặc phần tử hiển thị phía sau nội dung
   */
  rightIcon?: ReactNode;

  /**
   * Callback khi người dùng bấm nút xóa (x) để đóng / gỡ bỏ badge/chip
   */
  onDelete?: () => void;

  /**
   * Nhãn accessibility cho nút đóng onDelete
   * @default 'Remove'
   */
  deleteAriaLabel?: string;

  /**
   * Nội dung bên trong badge
   */
  children?: ReactNode;
}
