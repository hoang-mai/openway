import { HTMLAttributes, ReactNode, Ref } from "react";
import type { LinkProps } from "next/link";

/**
 * 12 loại phần tử Typography chuẩn Notion
 */
export type TypographyType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "callout"
  | "blockquote"
  | "code"
  | "kbd"
  | "a";


/**
 * 10 Màu chữ chuẩn Notion Design System & các alias Design System
 */
export type NotionColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "primary"
  | "secondary"
  | "tertiary"
  | "muted"
  | "success"
  | "warning"
  | "error"
  | "danger"
  | "info"
  | "neutral"
  | (string & {});

/**
 * 10 Màu nền highlight (Mark) chuẩn Notion Design System
 */
export type NotionMarkColor =
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "default"
  | boolean;

/**
 * Cỡ chữ hỗ trợ
 */
export type TypographySize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

/**
 * Độ đậm font chữ
 */
export type TypographyWeight = "normal" | "medium" | "semibold" | "bold";

/**
 * Căn lề văn bản
 */
export type TypographyAlign = "left" | "center" | "right" | "justify";

/**
 * Cấu hình sao chép vào Clipboard (Copyable)
 */
export interface CopyConfig {
  /**
   * Nội dung tùy biến cần sao chép (nếu không truyền sẽ lấy children)
   */
  text?: string;

  /**
   * Callback khi sao chép thành công
   */
  onCopy?: (text: string) => void;

  /**
   * Tooltip hiển thị [trước khi bấm, sau khi bấm thành công] hoặc boolean bật/tắt
   * @default ["Sao chép", "Đã sao chép!"]
   */
  tooltips?: [ReactNode, ReactNode] | boolean;

  /**
   * Thời gian chờ hiển thị trạng thái checkmark đã copy (ms)
   * @default 2000
   */
  timeout?: number;

  /**
   * Chỉ hiển thị nút copy khi hover vào khối (Zen Canvas của Notion)
   * @default true
   */
  hoverOnly?: boolean;

  /**
   * Icon tùy biến [icon thường, icon sau khi copy]
   */
  icon?: [ReactNode, ReactNode];
}

/**
 * Cấu hình cắt ngắn dòng (Ellipsis)
 */
export interface EllipsisConfig {
  /**
   * Số dòng tối đa hiển thị trước khi cắt (CSS line-clamp)
   * @default 1
   */
  rows?: number;

  /**
   * Bật nút mở rộng / thu gọn
   * @default false
   */
  expandable?: boolean | "collapsible";

  /**
   * Ký tự / chuỗi hậu tố (ví dụ: "...")
   */
  suffix?: string;

  /**
   * Nhãn / Phần tử nút xem thêm / thu gọn
   */
  symbol?: ReactNode | ((expanded: boolean) => ReactNode);

  /**
   * Callback khi người dùng nhấn nút mở rộng
   */
  onExpand?: (e: React.MouseEvent, info: { expanded: boolean }) => void;

  /**
   * Hiển thị tooltip toàn bộ nội dung khi bị cắt
   */
  tooltip?: boolean | ReactNode;
}

/**
 * TypographyProps - Toàn bộ props được trải thẳng trực tiếp vào một interface duy nhất.
 * Các props đặc thù của từng type được phân tách rõ ràng qua comment bên dưới.
 */
export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /**
   * Ref chuyển tiếp đến phần tử DOM
   */
  ref?: Ref<HTMLElement>;

  /**
   * 12 loại phần tử Typography chuẩn Notion:
   * - Tiêu đề: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
   * - Khối nội dung: "p" | "span" | "callout" | "blockquote" | "code" | "kbd" | "a"
   * @default "span"
   */
  type?: TypographyType;

  /**
   * 10 Màu chữ chuẩn Notion
   */
  color?: NotionColor;

  /**
   * Kích thước văn bản
   */
  size?: TypographySize;

  /**
   * Độ đậm font chữ
   */
  weight?: TypographyWeight;

  /**
   * Căn chỉnh lề văn bản
   */
  align?: TypographyAlign;

  /**
   * Đánh dấu highlight nền pastel theo 10 màu Notion
   */
  mark?: NotionMarkColor;

  /**
   * Định dạng inline code (chữ đỏ #eb5757 trên nền xám ấm nhẹ của Notion)
   */
  code?: boolean;

  /**
   * Định dạng phím bấm bàn phím (Kbd)
   */
  keyboard?: boolean;

  /**
   * Gạch chân văn bản
   */
  underline?: boolean;

  /**
   * Gạch ngang chữ (Delete / Strikethrough)
   */
  isDelete?: boolean;

  /**
   * In đậm chữ (Strong)
   */
  strong?: boolean;

  /**
   * In nghiêng chữ (Italic / Em)
   */
  italic?: boolean;

  /**
   * Kích hoạt số ổn định trong bảng / metrics (font-variant-numeric: tabular-nums)
   */
  tabular?: boolean;

  /**
   * Vô hiệu hóa và làm mờ văn bản
   */
  disabled?: boolean;

  /**
   * Bật tính năng sao chép vào Clipboard
   */
  copyable?: boolean | CopyConfig;

  /**
   * Rút gọn văn bản khi dài quá số dòng chỉ định
   */
  ellipsis?: boolean | EllipsisConfig;

  /**
   * Nội dung hiển thị bên trong
   */
  children?: ReactNode;

  /**
   * ClassName tùy biến bổ sung
   */
  className?: string;

  /* ========================================================================
   * 1. PROPS DÀNH CHO TYPE="a" (Next.js Link & Thẻ liên kết)
   * BẮT ĐẦU TẠI ĐÂY:
   * ======================================================================== */
  /** Đường dẫn liên kết URL đích */
  href?: LinkProps["href"];
  /** Mở trong tab mới (target="_blank"), tự động thêm icon ExternalLinkIcon và rel="noopener noreferrer" */
  external?: boolean;
  /** Target điều hướng (_blank, _self, _parent, _top) */
  target?: string;
  /** Quan hệ liên kết (rel) */
  rel?: string;
  /** Thay thế URL trong history thay vì push */
  replace?: boolean;
  /** Cuộn lên đầu trang sau khi chuyển route */
  scroll?: boolean;
  /** Tải trước route ngầm trong nền */
  prefetch?: boolean;
  /* ==================== KẾT THÚC PROPS TYPE="a" ==================== */

  /* ========================================================================
   * 2. PROPS DÀNH CHO TYPE="callout" (Notion Callout Box)
   * BẮT ĐẦU TẠI ĐÂY:
   * ======================================================================== */
  /** Icon biểu tượng hiển thị bên trái Callout Box (mặc định: LightbulbIcon SVG) */
  icon?: ReactNode;
  /* ==================== KẾT THÚC PROPS TYPE="callout" ==================== */
}
