import { HTMLAttributes, ReactNode, Ref } from "react";

export type EmptySize = "sm" | "md" | "lg";
export type EmptyPresetImage = "default" | "search" | "error" | "folder" | "simple";
export type EmptyLayout = "vertical" | "horizontal";

export interface EmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Ref chuyển tiếp đến phần tử HTML div
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Kích cỡ của Empty component:
   * - 'sm': Nhỏ gọn, thích hợp cho dropdown, popover, bảng nhỏ
   * - 'md': Tiêu chuẩn, thích hợp cho card, section, modal
   * - 'lg': Lớn, thích hợp cho toàn trang, dashboard
   * @default 'md'
   */
  size?: EmptySize;

  /**
   * Bố cục hiển thị:
   * - 'vertical': Xếp dọc ảnh -> tiêu đề -> mô tả -> hành động
   * - 'horizontal': Dàn ngang ảnh bên trái, nội dung & hành động bên phải
   * @default 'vertical'
   */
  layout?: EmptyLayout;

  /**
   * Ảnh hoặc minh họa:
   * - Tên preset: 'default' | 'search' | 'error' | 'folder' | 'simple'
   * - URL hình ảnh (string bắt đầu bằng http://, https://, /, hoặc ./)
   * - ReactNode tùy biến (SVG icon, custom component, v.v.)
   * @default 'default'
   */
  image?: EmptyPresetImage | (string & {}) | ReactNode;

  /**
   * Kích thước tùy chỉnh cho ảnh / illustration (pixel hoặc chuỗi kích thước CSS)
   */
  imageSize?: number | string;

  /**
   * Class tùy biến cho phần bao ngoài của ảnh
   */
  imageClassName?: string;

  /**
   * Thuộc tính alt cho hình ảnh khi truyền URL
   * @default 'Empty'
   */
  imageAlt?: string;

  /**
   * Tiêu đề của trạng thái rỗng
   */
  title?: ReactNode;

  /**
   * Class tùy biến cho tiêu đề
   */
  titleClassName?: string;

  /**
   * Đoạn văn bản mô tả chi tiết hoặc hướng dẫn thao tác
   */
  description?: ReactNode;

  /**
   * Class tùy biến cho phần mô tả
   */
  descriptionClassName?: string;

  /**
   * Nút bấm hoặc nhóm hành động bên dưới (Call-to-Action)
   */
  actions?: ReactNode;

  /**
   * Class tùy biến cho khu vực chứa actions
   */
  actionsClassName?: string;

  /**
   * Nội dung bổ sung tùy biến bên dưới hoặc thay thế
   */
  children?: ReactNode;
}
