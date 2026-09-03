import {
  ReactNode,
  CSSProperties,
  MouseEvent,
  HTMLAttributes,
  ButtonHTMLAttributes,
  RefObject,
  HTMLProps,
  Ref,
} from "react";
import { Placement, FloatingContext, ExtendedRefs, ReferenceType } from "@floating-ui/react";

/**
 * Hướng hiển thị của Dropdown menu so với phần tử kích hoạt (trigger)
 */
export type DropdownPlacement = Placement;

/**
 * Hành vi kích hoạt mở Dropdown:
 * - 'click': Mở khi click vào trigger
 * - 'hover': Mở khi rê chuột vào trigger
 */
export type DropdownTriggerType = "click" | "hover";

/**
 * Kích cỡ hiển thị của Dropdown (5 kích cỡ: xs, sm, md, lg, xl)
 */
export type DropdownSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Độ bo góc của menu và các item:
 * - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
 */
export type DropdownRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Bảng màu chủ đề cho Dropdown:
 * - 'primary' | 'secondary' | 'neutral' | 'error' | 'success' | 'warning' | 'info'
 */
export type DropdownColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

/**
 * Props của component gốc Dropdown
 */
export interface DropdownProps {
  /**
   * Các phần tử con bao gồm DropdownTrigger và DropdownMenu
   */
  children?: ReactNode;

  /**
   * Trạng thái mở menu (dùng khi ở chế độ Controlled)
   */
  open?: boolean;

  /**
   * Trạng thái mở ban đầu khi ở chế độ Uncontrolled
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback được gọi khi trạng thái đóng/mở menu thay đổi
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Kiểu kích hoạt mở dropdown menu ('click' hoặc 'hover')
   * @default 'click'
   */
  trigger?: DropdownTriggerType;

  /**
   * Vị trí hiển thị của menu so với trigger
   * @default 'bottom-start'
   */
  placement?: DropdownPlacement;

  /**
   * Khoảng cách (px) giữa trigger và menu
   * @default 4
   */
  offset?: number;

  /**
   * Tự động đảo hướng khi menu bị tràn khỏi khung nhìn màn hình
   * @default true
   */
  flip?: boolean;

  /**
   * Tự động dịch chuyển menu để không bị che khuất bởi mép màn hình
   * @default true
   */
  shift?: boolean;

  /**
   * Kích thước của Dropdown (ảnh hưởng padding, font-size của items và menu)
   * @default 'md'
   */
  size?: DropdownSize;

  /**
   * Độ bo góc của khung menu
   * @default 'md'
   */
  radius?: DropdownRadius;

  /**
   * Tông màu chủ đạo khi item được active hoặc hover
   * @default 'primary'
   */
  color?: DropdownColor;

  /**
   * Vô hiệu hóa toàn bộ Dropdown (không thể click mở menu)
   * @default false
   */
  disabled?: boolean;

  /**
   * Bật/tắt hiệu ứng chuyển động khi mở/đóng menu (Fade & Scale)
   * @default true
   */
  animated?: boolean;

  /**
   * Thời lượng hiệu ứng chuyển động (tính bằng mili-giây ms)
   * @default 150
   */
  animationDuration?: number;

  /**
   * Tự động đóng menu sau khi người dùng click chọn 1 DropdownItem
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Class tùy biến bổ sung cho wrapper gốc (nếu có)
   */
  className?: string;
}

/**
 * Props cho DropdownTrigger (phần tử kích hoạt menu)
 */
export interface DropdownTriggerProps extends HTMLAttributes<HTMLElement> {
  /**
   * Phần tử con được dùng làm trigger (Button, Icon, thẻ HTML bất kỳ)
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
   * React 19 Ref trực tiếp vào element trigger
   */
  ref?: Ref<HTMLElement>;
}

/**
 * Props cho DropdownMenu (khung popup chứa các items)
 */
export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Danh sách các DropdownItem, DropdownHeader, DropdownGroup, DropdownSeparator
   */
  children?: ReactNode;

  /**
   * Class tùy biến cho khung menu
   */
  className?: string;

  /**
   * Style inline tùy biến cho khung menu
   */
  style?: CSSProperties;

  /**
   * Độ rộng tối thiểu của menu (ví dụ: 200, '220px', 'min-w-48')
   */
  minWidth?: string | number;

  /**
   * Thứ tự hiển thị z-index của menu nổi
   * @default 50
   */
  zIndex?: number;

  /**
   * React 19 Ref trực tiếp vào menu container
   */
  ref?: Ref<HTMLDivElement>;
}

/**
 * Props cho từng mục chọn DropdownItem
 */
export interface DropdownItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> {
  /**
   * Nội dung văn bản hoặc ReactNode hiển thị bên trong item
   */
  children?: ReactNode;

  /**
   * Callback được gọi khi người dùng click vào item
   */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;

  /**
   * Vô hiệu hóa item này (không thể click, keyboard navigation sẽ bỏ qua)
   * @default false
   */
  disabled?: boolean;

  /**
   * Định dạng item này là hành động nguy hiểm/xóa dữ liệu (chữ và hover màu đỏ cảnh báo)
   * @default false
   */
  danger?: boolean;

  /**
   * Trạng thái item đang được chọn sẵn (hiển thị highlight background)
   * @default false
   */
  selected?: boolean;

  /**
   * Icon hiển thị ở đầu bên trái của item
   */
  startIcon?: ReactNode;

  /**
   * Icon hiển thị ở cuối bên phải của item
   */
  endIcon?: ReactNode;

  /**
   * Ký hiệu phím tắt (shortcut/hotkey) hiển thị dưới dạng thẻ kbd (ví dụ: '⌘P', 'Ctrl+S')
   */
  shortcut?: string;

  /**
   * Dòng mô tả phụ bổ sung bên dưới tiêu đề chính của item
   */
  description?: ReactNode;

  /**
   * Class tùy biến bổ sung cho item
   */
  className?: string;

  /**
   * Ghi đè cấu hình tự động đóng menu cho riêng item này
   */
  closeOnSelect?: boolean;

  /**
   * React 19 Ref trực tiếp vào item button
   */
  ref?: Ref<HTMLButtonElement>;
}

/**
 * Props cho DropdownGroup (nhóm các items liên quan)
 */
export interface DropdownGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Các DropdownItem con thuộc nhóm
   */
  children?: ReactNode;

  /**
   * Tiêu đề của nhóm (tự động render bên trong DropdownHeader)
   */
  label?: ReactNode;

  /**
   * Class tùy biến cho nhóm
   */
  className?: string;

  /**
   * React 19 Ref trực tiếp vào group element
   */
  ref?: Ref<HTMLDivElement>;
}

/**
 * Props cho DropdownHeader (tiêu đề phân vùng)
 */
export interface DropdownHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Nội dung tiêu đề phân nhóm
   */
  children?: ReactNode;

  /**
   * Class tùy biến cho tiêu đề
   */
  className?: string;

  /**
   * React 19 Ref trực tiếp vào header element
   */
  ref?: Ref<HTMLDivElement>;
}

/**
 * Props cho DropdownSeparator (đường kẻ phân cách)
 */
export interface DropdownSeparatorProps extends HTMLAttributes<HTMLHRElement> {
  /**
   * Class tùy biến cho đường kẻ phân cách
   */
  className?: string;

  /**
   * React 19 Ref trực tiếp vào separator element
   */
  ref?: Ref<HTMLHRElement>;
}

/**
 * Giá trị được cung cấp qua DropdownContext cho các component con
 */
export interface DropdownContextValue {
  /**
   * Trạng thái menu đang mở hay đóng
   */
  isOpen: boolean;

  /**
   * Hàm cập nhật trạng thái đóng/mở menu
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
   * Hàm gắn props và events cho floating menu element
   */
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;

  /**
   * Hàm gắn props và events cho từng item trong menu
   */
  getItemProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;

  /**
   * Ref lưu trữ danh sách các phần tử item trong menu
   */
  elementsRef: RefObject<(HTMLElement | null)[]>;

  /**
   * Ref lưu trữ danh sách nhãn text của items dùng cho Typeahead
   */
  labelsRef: RefObject<(string | null)[]>;

  /**
   * Vị trí index của item hiện đang được active/focus bởi bàn phím
   */
  activeIndex: number | null;

  /**
   * Hàm set active index cho keyboard navigation
   */
  setActiveIndex: (index: number | null) => void;

  /**
   * Kích cỡ đang áp dụng
   */
  size: DropdownSize;

  /**
   * Độ bo góc đang áp dụng
   */
  radius: DropdownRadius;

  /**
   * Màu sắc chủ đề đang áp dụng
   */
  color: DropdownColor;

  /**
   * Trạng thái disabled của Dropdown
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
   * Có đóng menu khi chọn item hay không
   */
  closeOnSelect: boolean;

  /**
   * Hướng placement thực tế sau khi tính toán flip/shift
   */
  computedPlacement: DropdownPlacement;
}
