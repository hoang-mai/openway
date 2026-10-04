import { HTMLAttributes, ReactNode, Ref } from "react";

/**
 * Các kích cỡ tiêu chuẩn của Alert:
 * - 'xs': Siêu nhỏ (text-xs, padding p-2)
 * - 'sm': Nhỏ (text-xs, title text-sm, padding p-2.5)
 * - 'md': Vừa - mặc định (text-sm, padding p-3.5)
 * - 'lg': Lớn (text-base, padding p-4)
 * - 'xl': Rất lớn (text-lg, padding p-5)
 */
export type AlertSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Các biến thể giao diện và phong cách hiển thị màu sắc của Alert:
 * - 'soft': Nền nhạt pastel, viền mờ 2px, chữ đậm (mặc định)
 * - 'filled': Nền màu đậm, chữ trắng tương phản cao
 * - 'outline': Nền trắng, viền rõ nét theo màu chủ đề
 * - 'accent-left': Nền pastel kèm viền nhấn dày 4px bên trái
 * - 'ghost': Nền và viền trong suốt
 * - 'other': Bỏ qua màu mặc định, tự do styling qua className
 */
export type AlertVariant = "soft" | "filled" | "outline" | "accent-left" | "ghost" | "other";

/**
 * 7 chủ đề màu sắc theo Design System:
 * - 'primary': Màu chủ đạo
 * - 'secondary': Màu phụ
 * - 'neutral': Màu trung tính
 * - 'error': Màu đỏ cảnh báo lỗi nguy cấp
 * - 'success': Màu xanh lá thông báo thành công
 * - 'warning': Màu vàng/cam cảnh báo
 * - 'info': Màu xanh dương thông tin (mặc định)
 */
export type AlertColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

/**
 * Độ bo góc của khung thông báo Alert:
 * - 'none': Góc vuông phẳng (rounded-none)
 * - 'sm': Bo góc nhỏ (rounded-sm)
 * - 'md': Bo góc vừa (rounded-md)
 * - 'lg': Bo góc lớn (rounded-lg - mặc định)
 * - 'xl': Bo góc rất lớn (rounded-xl)
 * - 'full': Bo tròn hoàn toàn (rounded-2xl)
 */
export type AlertRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props cho component `Alert`.
 */
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Ref chuyển tiếp đến phần tử HTML div của Alert
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Kích cỡ của Alert (5 sizes: xs, sm, md, lg, xl)
   * @default 'md'
   */
  size?: AlertSize;

  /**
   * Biến thể giao diện của Alert:
   * - 'soft': nền nhạt pastel, viền mờ, chữ đậm tương ứng (mặc định)
   * - 'filled': nền màu đậm, chữ tương phản cao
   * - 'outline': nền trắng, viền rõ nét theo màu chủ đề
   * - 'accent-left': viền nhấn dày bên trái, nền pastel
   * - 'ghost': nền và viền trong suốt
   * - 'other': không áp dụng style màu mặc định, tự do tùy biến qua className
   * @default 'soft'
   */
  variant?: AlertVariant;

  /**
   * Chủ đề màu sắc (primary, secondary, neutral, error, success, warning, info)
   * @default 'info'
   */
  color?: AlertColor;

  /**
   * Tùy chỉnh độ bo góc:
   * - 'none': góc vuông 0px
   * - 'sm': bo góc nhỏ
   * - 'md': bo góc vừa
   * - 'lg': bo góc lớn (mặc định)
   * - 'xl': bo góc rất lớn
   * - 'full': bo tròn hoàn toàn
   * @default 'lg'
   */
  radius?: AlertRadius;

  /**
   * Tiêu đề của Alert
   */
  title?: ReactNode;

  /**
   * Nội dung mô tả chi tiết của Alert (có thể truyền qua prop description hoặc children)
   */
  description?: ReactNode;

  /**
   * Icon hiển thị ở đầu thông báo:
   * - `true` (hoặc không truyền): tự động hiển thị icon theo `color`
   * - `false`: ẩn icon
   * - `ReactNode`: icon tùy chỉnh
   * @default true
   */
  icon?: ReactNode | boolean;

  /**
   * Phần tử hành động phụ (Action slot, ví dụ: Nút bấm, liên kết thao tác)
   */
  action?: ReactNode;

  /**
   * Hiển thị nút đóng (Close button x) để người dùng có thể tắt thông báo. Tự động ẩn Alert khi click.
   * @default true
   */
  closable?: boolean;

  /**
   * Callback khi người dùng bấm nút đóng
   */
  onClose?: () => void;

  /**
   * Nhãn accessibility cho nút đóng
   * @default 'Close alert'
   */
  closeAriaLabel?: string;

  /**
   * Chế độ Banner: Full width, không bo góc (`rounded-none`), không viền 2 bên (`border-x-0`), thích hợp gắn cố định trên cùng màn hình
   * @default false
   */
  banner?: boolean;

  /**
   * Class tùy biến cho phần tiêu đề (title)
   */
  titleClassName?: string;

  /**
   * Class tùy biến cho phần nội dung mô tả (description / children)
   */
  descriptionClassName?: string;

  /**
   * Class tùy biến cho vùng action slot
   */
  actionClassName?: string;

  /**
   * Class tùy biến cho icon wrapper
   */
  iconClassName?: string;

  /**
   * Class tùy biến cho nút đóng
   */
  closeButtonClassName?: string;

  /**
   * Class tùy biến cho container bao ngoài
   */
  className?: string;

  /**
   * Nội dung tùy biến bên trong Alert
   */
  children?: ReactNode;
}
