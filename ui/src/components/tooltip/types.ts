import { ReactElement, ReactNode } from "react";
import { Placement } from "@floating-ui/react";

export type TooltipSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TooltipVariant = "filled" | "soft" | "outline" | "other";
export type TooltipColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "neutral";
export type TooltipRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type TooltipPlacement = Placement;

export interface TooltipProps {
  /**
   * Nội dung hiển thị bên trong tooltip
   */
  content: ReactNode;

  /**
   * Phần tử con được bọc để kích hoạt tooltip khi hover hoặc focus
   */
  children: ReactElement;

  /**
   * Hướng hiển thị của tooltip:
   * - 'top' | 'top-start' | 'top-end'
   * - 'bottom' | 'bottom-start' | 'bottom-end'
   * - 'left' | 'left-start' | 'left-end'
   * - 'right' | 'right-start' | 'right-end'
   * @default 'top'
   */
  placement?: TooltipPlacement;

  /**
   * Biến thể giao diện của tooltip:
   * - 'filled': nền màu đậm tương phản cao (mặc định)
   * - 'soft': nền pastel dịu nhẹ theo tone màu
   * - 'outline': nền trắng/trong suốt kèm viền màu
   * - 'other': không áp dụng style mặc định, tự do tùy biến qua className
   * @default 'filled'
   */
  variant?: TooltipVariant;

  /**
   * Chủ đề màu sắc (primary, secondary, error, success, warning, info, neutral)
   * @default 'neutral'
   */
  color?: TooltipColor;

  /**
   * Kích cỡ của tooltip (5 sizes: xs, sm, md, lg, xl)
   * @default 'md'
   */
  size?: TooltipSize;

  /**
   * Tùy chỉnh độ bo góc của khung tooltip:
   * - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   * @default 'md'
   */
  radius?: TooltipRadius;

  /**
   * Hiển thị mũi tên (arrow) chỉ về phần tử kích hoạt
   * @default true
   */
  hasArrow?: boolean;

  /**
   * Khoảng cách (px) từ phần tử kích hoạt đến tooltip
   * @default 8
   */
  offset?: number;

  /**
   * Tự động lật hướng khi tooltip tràn ra ngoài khung nhìn (viewport)
   * @default true
   */
  flip?: boolean;

  /**
   * Tự động dịch chuyển để tooltip luôn nằm trong viewport
   * @default true
   */
  shift?: boolean;

  /**
   * Thời gian trễ hiển thị/ẩn (ms)
   * Có thể truyền số nguyên (vd: 200) hoặc object { open?: 200, close?: 150 }
   * @default { open: 200, close: 150 }
   */
  delay?: number | { open?: number; close?: number };

  /**
   * Vô hiệu hóa tooltip không hiển thị
   * @default false
   */
  disabled?: boolean;

  /**
   * Trạng thái mở/đóng tooltip (Controlled mode)
   */
  open?: boolean;

  /**
   * Trạng thái mở ban đầu (Uncontrolled mode)
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback khi trạng thái hiển thị mở/đóng thay đổi
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * ClassName tùy biến cho khung hộp tooltip
   */
  className?: string;

  /**
   * ClassName tùy biến cho mũi tên định vị
   */
  arrowClassName?: string;

  /**
   * Bật/tắt hiệu ứng chuyển động mượt mà khi xuất hiện và biến mất (Fade + Scale + Subtle Slide)
   * @default true
   */
  animated?: boolean;

  /**
   * Thời lượng hiệu ứng chuyển động xuất hiện/biến mất (ms)
   * @default 150
   */
  animationDuration?: number;

  /**
   * Thuộc tính z-index của khung tooltip
   * @default 50
   */
  zIndex?: number;
}
