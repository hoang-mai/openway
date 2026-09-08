import { TextareaHTMLAttributes, ReactNode, Ref } from "react";
import type { TextareaAutosizeProps } from "react-textarea-autosize";

export type TextAreaSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TextAreaVariant = "outline" | "filled" | "ghost" | "other";
export type TextAreaColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "neutral";
export type TextAreaRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type TextAreaLabelPlacement = "top" | "left" | "floating";
export type TextAreaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextAreaConfig {
  /**
   * Hiển thị dấu sao đỏ (*) biểu thị trường bắt buộc
   * @default false
   */
  isRequired?: boolean;

  /**
   * Trạng thái không hợp lệ (hiển thị viền đỏ báo lỗi)
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Trạng thái đang tải dữ liệu
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiển thị biểu tượng xoay spinner khi đang ở trạng thái loading
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Cho phép hiển thị nút xóa nhanh nội dung khi có văn bản
   * @default false
   */
  isClearable?: boolean;

  /**
   * Tự động co giãn chiều cao theo nội dung
   * @default true
   */
  autoResize?: boolean;

  /**
   * Hiển thị bộ đếm số lượng ký tự ở góc dưới bên phải (vd: 45/500)
   * @default false
   */
  showCount?: boolean;

  /**
   * Chiếm toàn bộ chiều rộng 100% của container cha
   * @default true
   */
  isFullWidth?: boolean;
}

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "style"> {
  /**
   * Ref chuyển tiếp đến phần tử HTML textarea (React 19)
   */
  ref?: Ref<HTMLTextAreaElement>;

  /**
   * Kích cỡ của textarea:
   * - 'xs': text-[11px], padding nhỏ
   * - 'sm': text-xs, padding vừa
   * - 'md': text-sm, padding tiêu chuẩn (mặc định)
   * - 'lg': text-base, padding lớn
   * - 'xl': text-lg, padding rất lớn
   * @default 'md'
   */
  size?: TextAreaSize;

  /**
   * Biến thể giao diện của textarea:
   * - 'outline': viền nét quanh ô (mặc định)
   * - 'filled': nền nhạt pastel, có viền mờ
   * - 'ghost': nền trong suốt, viền tối giản
   * - 'other': không áp dụng style mặc định, tự do tùy biến qua className
   * @default 'outline'
   */
  variant?: TextAreaVariant;

  /**
   * Màu sắc chủ đề:
   * - 'primary' (mặc định) | 'secondary' | 'error' | 'success' | 'warning' | 'info'
   * @default 'primary'
   */
  color?: TextAreaColor;

  /**
   * Bo góc của textarea:
   * - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   */
  radius?: TextAreaRadius;

  /**
   * Nhãn mô tả cho textarea
   */
  label?: ReactNode;

  /**
   * Vị trí của nhãn:
   * - 'floating': nằm cố định chính giữa viền trên (mặc định)
   * - 'top': nằm phía trên textarea
   * - 'left': nằm bên trái textarea
   * @default 'floating'
   */
  labelPlacement?: TextAreaLabelPlacement;

  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: TextAreaConfig;

  /**
   * Đoạn văn bản hướng dẫn/trợ giúp bên dưới textarea
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi khi nhập sai
   */
  errorMessage?: ReactNode;

  /**
   * Callback khi người dùng bấm nút xóa nhanh
   */
  onClear?: () => void;

  /**
   * Số dòng tối thiểu khi autoResize bật
   * @default 3
   */
  minRows?: number;

  /**
   * Số dòng tối đa khi autoResize bật (vượt quá sẽ xuất hiện thanh cuộn)
   */
  maxRows?: number;

  /**
   * Callback được gọi khi chiều cao textarea thay đổi do autoResize
   */
  onHeightChange?: (height: number, meta: { rowHeight: number }) => void;

  /**
   * Bật bộ nhớ đệm kết quả đo chiều cao để tối ưu hiệu năng
   */
  cacheMeasurements?: boolean;

  /**
   * Tùy biến inline style (tương thích react-textarea-autosize)
   */
  style?: TextareaAutosizeProps["style"];

  /**
   * Tùy chọn kéo giãn thủ công
   * @default 'none' khi autoResize = true, 'vertical' khi autoResize = false
   */
  resize?: TextAreaResize;

  /**
   * Tùy biến className cho phần tử bọc ngoài cùng (group container)
   */
  wrapperClassName?: string;

  /**
   * Tùy biến className cho khung viền của textarea (box container)
   */
  textareaWrapperClassName?: string;

  /**
   * Tùy biến className cho phần tử <label>
   */
  labelClassName?: string;

  /**
   * Tùy biến className cho đoạn văn bản helperText hoặc errorMessage
   */
  helperClassName?: string;

  /**
   * Tùy biến className cho bộ đếm ký tự (counter)
   */
  countClassName?: string;
}
