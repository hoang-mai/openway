import { ReactNode, CSSProperties, HTMLAttributes, ButtonHTMLAttributes, HTMLProps, Ref } from "react";
import { Placement, FloatingContext, ExtendedRefs, ReferenceType } from "@floating-ui/react";

/**
 * Hướng hiển thị của Popover so với phần tử kích hoạt (trigger)
 */
export type PopoverPlacement = Placement;

/**
 * Hành vi kích hoạt mở Popover:
 * - 'click': Mở khi click vào trigger
 * - 'hover': Mở khi rê chuột vào trigger
 */
export type PopoverTriggerType = "click" | "hover";

/**
 * Kích cỡ hiển thị của Popover (5 kích cỡ: xs, sm, md, lg, xl)
 */
export type PopoverSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Độ bo góc của khung Popover:
 * - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
 */
export type PopoverRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Bảng màu chủ đề cho Popover:
 * - 'primary' | 'secondary' | 'neutral' | 'error' | 'success' | 'warning' | 'info'
 */
export type PopoverColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

/**
 * Props của component gốc Popover
 */
export interface PopoverProps {
  /**
   * Các phần tử con bao gồm PopoverTrigger và PopoverContent
   */
  children?: ReactNode;

  /**
   * Trạng thái mở popover (dùng khi ở chế độ Controlled)
   */
  open?: boolean;

  /**
   * Trạng thái mở ban đầu khi ở chế độ Uncontrolled
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback được gọi khi trạng thái đóng/mở popover thay đổi
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Kiểu kích hoạt mở popover ('click' hoặc 'hover')
   * @default 'click'
   */
  trigger?: PopoverTriggerType;

  /**
   * Vị trí hiển thị của popover so với trigger
   * @default 'bottom'
   */
  placement?: PopoverPlacement;

  /**
   * Khoảng cách (px) giữa trigger và popover
   * @default 8
   */
  offset?: number;

  /**
   * Tự động đảo hướng khi popover bị tràn khỏi khung nhìn màn hình
   * @default true
   */
  flip?: boolean;

  /**
   * Tự động dịch chuyển popover để không bị che khuất bởi mép màn hình
   * @default true
   */
  shift?: boolean;

  /**
   * Kích thước của Popover (ảnh hưởng padding, font-size của content)
   * @default 'md'
   */
  size?: PopoverSize;

  /**
   * Độ bo góc của khung popover
   * @default 'md'
   */
  radius?: PopoverRadius;

  /**
   * Tông màu viền hoặc điểm nhấn của Popover
   * @default 'neutral'
   */
  color?: PopoverColor;

  /**
   * Vô hiệu hóa toàn bộ Popover (không thể kích hoạt mở)
   * @default false
   */
  disabled?: boolean;

  /**
   * Bật/tắt hiệu ứng chuyển động khi mở/đóng (Fade & Scale)
   * @default true
   */
  animated?: boolean;

  /**
   * Thời lượng hiệu ứng chuyển động (tính bằng mili-giây ms)
   * @default 150
   */
  animationDuration?: number;

  /**
   * Bật chế độ Modal (khóa tiêu điểm bên trong popover và ngăn tương tác bên ngoài)
   * @default false
   */
  modal?: boolean;

  /**
   * Tự động đóng popover khi nhấn phím Escape
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Tự động đóng popover khi click ra ngoài vùng popup
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * Class tùy biến bổ sung cho wrapper gốc
   */
  className?: string;
}

/**
 * Props cho PopoverTrigger (phần tử kích hoạt popover)
 */
export interface PopoverTriggerProps extends HTMLAttributes<HTMLElement> {
  /**
   * Phần tử con được dùng làm trigger
   */
  children?: ReactNode;

  /**
   * Class tùy biến cho trigger
   */
  className?: string;

  /**
   * Clone trực tiếp phần tử con thay vì bọc thẻ button
   * @default false
   */
  asChild?: boolean;

  /**
   * React 19 Ref trực tiếp vào trigger element
   */
  ref?: Ref<HTMLElement>;
}

/**
 * Props cho PopoverContent (khung hiển thị nội dung)
 */
export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Nội dung bên trong PopoverContent (các subcomponents hoặc JSX tùy ý)
   */
  children?: ReactNode;

  /**
   * Class tùy biến cho khung popover
   */
  className?: string;

  /**
   * Style inline tùy biến cho khung popover
   */
  style?: CSSProperties;

  /**
   * Độ rộng tối thiểu của popover
   */
  minWidth?: string | number;

  /**
   * Độ rộng tối đa của popover
   */
  maxWidth?: string | number;

  /**
   * Thứ tự hiển thị z-index của popover nổi
   * @default 50
   */
  zIndex?: number;

  /**
   * React 19 Ref trực tiếp vào popover content container
   */
  ref?: Ref<HTMLDivElement>;
}

/**
 * Props cho PopoverHeader (tiêu đề của Popover)
 */
export interface PopoverHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Nội dung tiêu đề
   */
  children?: ReactNode;

  /**
   * Class tùy biến cho header
   */
  className?: string;

  /**
   * React 19 Ref trực tiếp vào header
   */
  ref?: Ref<HTMLDivElement>;
}

/**
 * Props cho PopoverBody (phần thân nội dung chính)
 */
export interface PopoverBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Nội dung thân popover
   */
  children?: ReactNode;

  /**
   * Class tùy biến cho body
   */
  className?: string;

  /**
   * React 19 Ref trực tiếp vào body
   */
  ref?: Ref<HTMLDivElement>;
}

/**
 * Props cho PopoverFooter (chân trang chứa các nút bấm)
 */
export interface PopoverFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Nội dung chân trang
   */
  children?: ReactNode;

  /**
   * Class tùy biến cho footer
   */
  className?: string;

  /**
   * React 19 Ref trực tiếp vào footer
   */
  ref?: Ref<HTMLDivElement>;
}

/**
 * Props cho PopoverClose (nút đóng popover)
 */
export interface PopoverCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Nội dung bên trong nút đóng
   */
  children?: ReactNode;

  /**
   * Class tùy biến cho nút đóng
   */
  className?: string;

  /**
   * Clone trực tiếp phần tử con thay vì bọc button
   * @default false
   */
  asChild?: boolean;

  /**
   * React 19 Ref trực tiếp vào close button
   */
  ref?: Ref<HTMLButtonElement>;
}

/**
 * Giá trị được cung cấp qua PopoverContext cho các subcomponents
 */
export interface PopoverContextValue {
  /**
   * Trạng thái popover đang mở hay đóng
   */
  isOpen: boolean;

  /**
   * Hàm cập nhật trạng thái đóng/mở popover
   */
  setIsOpen: (open: boolean) => void;

  /**
   * Object chứa các ref reference và floating từ useFloating
   */
  refs: ExtendedRefs<ReferenceType>;

  /**
   * Style inline vị trí floating do Floating UI tính toán
   */
  floatingStyles: CSSProperties;

  /**
   * Floating context từ useFloating
   */
  context: FloatingContext;

  /**
   * Hàm gắn props và events cho trigger element
   */
  getReferenceProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;

  /**
   * Hàm gắn props và events cho floating popover element
   */
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;

  /**
   * Kích cỡ đang áp dụng
   */
  size: PopoverSize;

  /**
   * Độ bo góc đang áp dụng
   */
  radius: PopoverRadius;

  /**
   * Màu sắc chủ đề đang áp dụng
   */
  color: PopoverColor;

  /**
   * Trạng thái disabled của Popover
   */
  disabled: boolean;

  /**
   * Có áp dụng animation hay không
   */
  animated: boolean;

  /**
   * Thời lượng animation (ms)
   */
  animationDuration: number;

  /**
   * Chế độ modal
   */
  modal: boolean;

  /**
   * Hướng placement thực tế sau khi tính toán flip/shift
   */
  computedPlacement: PopoverPlacement;
}
