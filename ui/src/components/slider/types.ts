import { ReactNode, Ref } from "react";

export type SliderSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SliderVariant = "filled" | "soft" | "outline" | "other";
export type SliderColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "neutral";
export type SliderRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type SliderOrientation = "horizontal" | "vertical";
export type SliderLabelPlacement = "top" | "left" | "right";
export type SliderTooltipPlacement = "top" | "bottom" | "left" | "right";
export type SliderTooltipMode = "none" | "hover" | "active" | "always";

export type SliderValue = number | [number, number];

export interface SliderMark {
  value: number;
  label?: ReactNode;
}

export interface SliderConfig {
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
   * Hiển thị biểu tượng xoay spinner khi đang ở trạng thái loading
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Hiển thị các chấm nấc bước (step dots) trên track
   * @default false
   */
  showSteps?: boolean;

  /**
   * Hiển thị giá trị văn bản bên cạnh label
   * @default false
   */
  showValue?: boolean;

  /**
   * Mở rộng chiều rộng 100% của container chứa
   * @default true
   */
  isFullWidth?: boolean;
}

export interface SliderProps {
  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: SliderConfig;

  /**
   * Ref chuyển tiếp đến container ngoài cùng của Slider (React 19)
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Giá trị hiện tại của slider (Controlled mode).
   * - `number`: Single slider
   * - `[number, number]`: Range slider
   */
  value?: SliderValue;

  /**
   * Giá trị mặc định ban đầu của slider (Uncontrolled mode).
   * - `number`: Single slider
   * - `[number, number]`: Range slider
   */
  defaultValue?: SliderValue;

  /**
   * Giá trị nhỏ nhất có thể chọn
   * @default 0
   */
  min?: number;

  /**
   * Giá trị lớn nhất có thể chọn
   * @default 100
   */
  max?: number;

  /**
   * Bước nhảy giá trị giữa các nấc
   * @default 1
   */
  step?: number;

  /**
   * Khoảng cách tối thiểu giữa 2 thumbs trong chế độ Range
   * @default 0
   */
  minStepsBetweenThumbs?: number;

  /**
   * Đảo ngược chiều thanh trượt
   * @default false
   */
  inverted?: boolean;

  /**
   * Kích cỡ của slider:
   * - 'xs': track 4px, thumb 12px, font 12px
   * - 'sm': track 6px, thumb 16px, font 13px
   * - 'md': track 8px, thumb 20px, font 14px (mặc định)
   * - 'lg': track 10px, thumb 24px, font 16px
   * - 'xl': track 12px, thumb 28px, font 18px
   * @default 'md'
   */
  size?: SliderSize;

  /**
   * Biến thể giao diện của slider:
   * - 'filled': thanh trượt và fill màu đặc tương phản cao (mặc định)
   * - 'soft': nền track dịu nhẹ pastel theo tone màu chủ đề
   * - 'outline': thumb và track viền theo màu chủ đề
   * - 'other': không áp dụng style mặc định, tự do tùy biến qua className
   * @default 'filled'
   */
  variant?: SliderVariant;

  /**
   * Chủ đề màu sắc (primary, secondary, error, success, warning, info, neutral)
   * @default 'primary'
   */
  color?: SliderColor;

  /**
   * Bo góc của thanh trượt (track):
   * - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   * @default 'full'
   */
  radius?: SliderRadius;

  /**
   * Bo góc của nút kéo (thumb):
   * - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   * @default 'full'
   */
  thumbRadius?: SliderRadius;

  /**
   * Hướng trượt của slider:
   * - 'horizontal': nằm ngang (mặc định)
   * - 'vertical': thẳng đứng
   * @default 'horizontal'
   */
  orientation?: SliderOrientation;

  // ==================== LABEL & FORM FIELD ====================
  /**
   * Nhãn văn bản hiển thị cho slider
   */
  label?: ReactNode;

  /**
   * Vị trí đặt nhãn so với thanh slider:
   * - 'top': phía trên (mặc định)
   * - 'left': bên trái
   * - 'right': bên phải
   * @default 'top'
   */
  labelPlacement?: SliderLabelPlacement;

  /**
   * Hàm tùy biến định dạng hiển thị giá trị văn bản (ví dụ: `$${val}`, `${val}%`)
   */
  formatValue?: (value: SliderValue) => ReactNode;

  /**
   * Đoạn văn bản hướng dẫn/chú thích bên dưới
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi hiển thị bên dưới (khi có errorMessage sẽ tự kích hoạt isInvalid)
   */
  errorMessage?: ReactNode;

  // ==================== TOOLTIP & MARKS ====================
  /**
   * Chế độ hiển thị Tooltip giá trị trên nút trượt (thumb):
   * - 'none': không hiển thị (mặc định)
   * - 'hover': hiển thị khi rê chuột vào thumb
   * - 'active': hiển thị khi đang tương tác / kéo thumb
   * - 'always': luôn luôn hiển thị
   * @default 'none'
   */
  showTooltip?: SliderTooltipMode;

  /**
   * Vị trí đặt Tooltip so với thumb
   * - 'top' | 'bottom' | 'left' | 'right'
   */
  tooltipPlacement?: SliderTooltipPlacement;

  /**
   * Hàm tùy biến định dạng nội dung Tooltip cho từng thumb
   */
  formatTooltip?: (value: number) => ReactNode;

  /**
   * Danh sách các mốc đánh dấu trên slider hoặc boolean (tự tạo mốc theo step)
   */
  marks?: SliderMark[] | boolean;

  // ==================== SLOTS & ACTIONS ====================
  /**
   * Biểu tượng / nội dung hiển thị ở đầu bên trái (hoặc dưới cùng) của slider
   */
  startContent?: ReactNode;

  /**
   * Biểu tượng / nội dung hiển thị ở đầu bên phải (hoặc trên cùng) của slider
   */
  endContent?: ReactNode;

  /**
   * Trạng thái vô hiệu hóa toàn bộ tương tác
   * @default false
   */
  disabled?: boolean;

  /**
   * Trạng thái chỉ đọc (không thể kéo thay đổi giá trị)
   * @default false
   */
  readOnly?: boolean;

  /**
   * Tên định danh trường phục vụ Form submission
   */
  name?: string;

  /**
   * ID tùy biến cho slider element
   */
  id?: string;

  /**
   * Callback kích hoạt liên tục khi giá trị thay đổi trong quá trình kéo
   */
  onChange?: (value: SliderValue) => void;

  /**
   * Callback kích hoạt khi kết thúc thao tác kéo (thả chuột / ngón tay) hoặc nhả phím
   */
  onChangeEnd?: (value: SliderValue) => void;

  // ==================== CUSTOM CLASS NAMES ====================
  /**
   * Custom className cho container ngoài cùng
   */
  className?: string;

  /**
   * Custom className cho container bọc toàn bộ (bao gồm label, track, helper)
   */
  wrapperClassName?: string;

  /**
   * Custom className cho vùng track + thumb wrapper
   */
  trackWrapperClassName?: string;

  /**
   * Custom className cho thanh ray (track)
   */
  trackClassName?: string;

  /**
   * Custom className cho dải màu được kích hoạt (filler bar / range)
   */
  fillerClassName?: string;

  /**
   * Custom className cho nút trượt (thumb)
   */
  thumbClassName?: string;

  /**
   * Custom className cho nhãn (label)
   */
  labelClassName?: string;

  /**
   * Custom className cho phần hiển thị giá trị văn bản
   */
  valueClassName?: string;

  /**
   * Custom className cho phần helper/error message
   */
  helperClassName?: string;

  /**
   * Custom className cho tooltip
   */
  tooltipClassName?: string;

  /**
   * Custom className cho các mốc đánh dấu (marks)
   */
  markClassName?: string;
}
