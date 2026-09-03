import { ButtonHTMLAttributes, ReactNode, Ref } from "react";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "filled" | "soft" | "ghost" | "text" | "outline" | "other";
export type ButtonColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

export type ButtonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Ref được chuyển tiếp đến phần tử HTML button
   */
  ref?: Ref<HTMLButtonElement>;
  /**
   * Kích cỡ của button (5 sizes: xs, sm, md, lg, xl)
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Biến thể giao diện của button:
   * - 'filled', 'soft', 'ghost', 'text', 'outline': có sẵn style theo theme tokens
   * - 'other': không áp dụng style màu/nền/viền mặc định, cho phép bên ngoài tự do tùy biến 100% qua className
   * @default 'filled'
   */
  variant?: ButtonVariant;

  /**
   * Chủ đề màu sắc (primary, secondary, neutral, error, success, warning, info) - áp dụng cho các variant có sẵn
   * @default 'primary'
   */
  color?: ButtonColor;

  /**
   * Tùy chỉnh độ bo góc của button:
   * - 'none': không bo góc (góc vuông 0px)
   * - 'sm': bo góc nhỏ (rounded-sm)
   * - 'md': bo góc vừa (rounded-md)
   * - 'lg': bo góc lớn (rounded-lg)
   * - 'xl': bo góc rất lớn (rounded-xl)
   * - 'full': bo tròn hoàn toàn dạng viên thuốc / hình tròn (rounded-full / Pill shape)
   * @default bo góc theo từng `size` (xs: rounded, sm: rounded-md, md: rounded-lg, lg: rounded-xl, xl: rounded-2xl)
   */
  radius?: ButtonRadius;

  /**
   * Icon hiển thị ở phía trước văn bản
   */
  leftIcon?: ReactNode;

  /**
   * Icon hiển thị ở phía sau văn bản
   */
  rightIcon?: ReactNode;

  /**
   * Trạng thái đang tải (vô hiệu hóa tương tác)
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiển thị biểu tượng xoay spinner khi đang ở trạng thái loading
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Văn bản hiển thị thay thế khi đang ở trạng thái loading
   */
  loadingText?: ReactNode;

  /**
   * Mở rộng chiều rộng 100% của container chứa
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * Nội dung bên trong button
   */
  children?: ReactNode;
}

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * Ref được chuyển tiếp đến phần tử HTML button
   */
  ref?: Ref<HTMLButtonElement>;

  /**
   * Icon hiển thị chính giữa nút
   */
  icon: ReactNode;

  /**
   * Nhãn mô tả hành động dành cho Screen Reader / Accessibility (bắt buộc)
   */
  "aria-label": string;

  /**
   * Kích cỡ của icon button (xs: 24px, sm: 32px, md: 40px, lg: 48px, xl: 56px)
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Biến thể giao diện của icon button
   * @default 'filled'
   */
  variant?: ButtonVariant;

  /**
   * Chủ đề màu sắc (primary, secondary, neutral, error, success, warning, info)
   * @default 'primary'
   */
  color?: ButtonColor;

  /**
   * Tùy chỉnh độ bo góc của icon button
   * @default 'full' (mặc định bo tròn hoàn toàn thành hình tròn)
   */
  radius?: ButtonRadius;

  /**
   * Trạng thái đang tải (vô hiệu hóa tương tác)
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiển thị biểu tượng xoay spinner khi đang ở trạng thái loading (thay thế cho icon chính)
   * @default false
   */
  showSpinner?: boolean;
}
