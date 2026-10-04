import { InputHTMLAttributes, ReactNode, Ref } from "react";

export type ToggleSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ToggleVariant = "filled" | "outline" | "soft" | "other";
export type ToggleColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "neutral";
export type ToggleRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type ToggleLabelPlacement = "right" | "left";

export interface ToggleConfig {
  /**
   * Đánh dấu trường bắt buộc (hiển thị dấu * đỏ cạnh label)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Trạng thái báo lỗi (viền đỏ, aria-invalid="true")
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Trạng thái đang tải (vô hiệu hóa tương tác)
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiển thị biểu tượng xoay spinner bên trong nút trượt (thumb) khi đang ở trạng thái loading
   * @default false
   */
  showSpinner?: boolean;
}

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: ToggleConfig;

  /**
   * Ref chuyển tiếp đến phần tử HTML input (React 19)
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Kích cỡ của toggle switch:
   * - 'xs': track 28x16px, thumb 12px, text 12px
   * - 'sm': track 36x20px, thumb 14px, text 14px
   * - 'md': track 44x24px, thumb 20px, text 14px (mặc định)
   * - 'lg': track 52x28px, thumb 24px, text 16px
   * - 'xl': track 64x36px, thumb 28px, text 18px
   * @default 'md'
   */
  size?: ToggleSize;

  /**
   * Biến thể giao diện của toggle khi bật (checked):
   * - 'filled': nền track màu đặc tương phản cao (mặc định)
   * - 'outline': nền track trong suốt/trắng, viền và thumb mang màu chủ đề
   * - 'soft': nền track pastel dịu nhẹ theo tone màu chủ đề
   * - 'other': không áp dụng style mặc định, tự do tùy biến qua className
   * @default 'filled'
   */
  variant?: ToggleVariant;

  /**
   * Chủ đề màu sắc (primary, secondary, error, success, warning, info, neutral)
   * @default 'primary'
   */
  color?: ToggleColor;

  /**
   * Tùy chỉnh độ bo góc của track:
   * - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   * @default 'full'
   */
  radius?: ToggleRadius;

  /**
   * Tùy chỉnh độ bo góc của nút trượt (thumb):
   * - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   * @default 'full'
   */
  thumbRadius?: ToggleRadius;

  // ==================== LABEL & FORM FIELD ====================
  /**
   * Nhãn văn bản hiển thị cạnh toggle
   */
  label?: ReactNode;

  /**
   * Vị trí đặt nhãn so với toggle:
   * - 'right': Toggle bên trái, nhãn bên phải (mặc định)
   * - 'left': Nhãn bên trái, toggle bên phải
   * @default 'right'
   */
  labelPlacement?: ToggleLabelPlacement;

  /**
   * Đoạn văn bản hướng dẫn/chú thích bên dưới
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi hiển thị bên dưới (khi có errorMessage sẽ tự kích hoạt isInvalid)
   */
  errorMessage?: ReactNode;

  // ==================== SLOTS & ACTIONS ====================
  /**
   * Biểu tượng tùy chỉnh hiển thị bên trong nút trượt (thumb)
   */
  thumbIcon?: ReactNode | ((props: { isChecked: boolean; className: string }) => ReactNode);

  /**
   * Biểu tượng / nội dung hiển thị ở đầu bên trái của track (khi checked)
   */
  startContent?: ReactNode;

  /**
   * Biểu tượng / nội dung hiển thị ở đầu bên phải của track (khi unchecked)
   */
  endContent?: ReactNode;

  // ==================== LAYOUT & CUSTOMIZATION ====================
  /**
   * ClassName tùy biến cho wrapper bọc ngoài (bao gồm cả toggle và label)
   */
  wrapperClassName?: string;

  /**
   * ClassName tùy biến cho thanh trượt (track)
   */
  trackClassName?: string;

  /**
   * ClassName tùy biến cho nút trượt (thumb)
   */
  thumbClassName?: string;

  /**
   * ClassName tùy biến cho phần text nhãn (label)
   */
  labelClassName?: string;

  /**
   * ClassName tùy biến cho phần helper / error message
   */
  helperClassName?: string;
}
