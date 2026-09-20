import {
  AnchorHTMLAttributes,
  ElementType,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";

/**
 * Kích thước hiển thị của Breadcrumb (sm: nhỏ, md: chuẩn, lg: lớn)
 */
export type BreadcrumbSize = "sm" | "md" | "lg";

/**
 * Biến thể kiểu dáng của Breadcrumb:
 * - `standard`: Giao diện tối giản chuẩn Notion, hover nền nhẹ hoặc gạch chân (mặc định)
 * - `solid`: Khối pill nền mềm ấm
 * - `bordered`: Bao khung viền hairline siêu mảnh quanh từng mục
 * - `other`: Tự do tùy biến 100% qua className
 */
export type BreadcrumbVariant = "standard" | "solid" | "bordered" | "other";

/**
 * Chủ đề màu sắc của Breadcrumb:
 * - `neutral` (Notion warm neutral mặc định) | `primary` | `secondary` | `error` | `success` | `warning` | `info`
 */
export type BreadcrumbColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "warning"
  | "info";

/**
 * Tùy chỉnh độ bo góc của các mục breadcrumb (áp dụng cho variant solid, bordered hoặc pill hover):
 */
export type BreadcrumbRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Hiệu ứng gạch chân cho link breadcrumb:
 * - `none`: Không gạch chân
 * - `hover`: Chỉ gạch chân khi di chuột (mặc định)
 * - `always`: Luôn luôn gạch chân
 */
export type BreadcrumbUnderline = "none" | "hover" | "always";

/**
 * Hành vi khi click vào nút thu gọn ba chấm (...):
 * - `dropdown`: Mở menu danh sách thả xuống chứa các đường dẫn bị ẩn (mặc định)
 * - `expand`: Mở rộng toàn bộ đường dẫn trên thanh breadcrumb
 * - `none`: Chỉ hiển thị icon ba chấm tĩnh, không tương tác
 */
export type BreadcrumbCollapseMode = "dropdown" | "expand" | "none";

/**
 * Cấu trúc dữ liệu cho từng mục khi sử dụng qua mảng `items` (Data-driven mode)
 */
export interface BreadcrumbItemData {
  /**
   * Khóa định danh duy nhất (tùy chọn)
   */
  id?: string | number;

  /**
   * Nội dung tiêu đề hiển thị của mục
   */
  label: ReactNode;

  /**
   * Đường dẫn URL chuyển hướng (khi có href, component tự dùng thẻ Link của Next.js)
   */
  href?: string;

  /**
   * Icon hoặc phần tử hiển thị phía trước tiêu đề
   */
  icon?: ReactNode;

  /**
   * Icon hoặc phần tử hiển thị phía sau tiêu đề
   */
  endIcon?: ReactNode;

  /**
   * Huy hiệu hoặc số lượng hiển thị kèm theo
   */
  badge?: ReactNode;

  /**
   * Đánh dấu mục này là trang hiện tại đang đứng (active/current page)
   */
  current?: boolean;

  /**
   * Vô hiệu hóa liên kết của mục này
   */
  disabled?: boolean;

  /**
   * Mở liên kết trong tab mới (`target="_blank"`, `rel="noopener noreferrer"`)
   */
  external?: boolean;

  /**
   * Thuộc tính target HTML của thẻ link
   */
  target?: string;

  /**
   * Thuộc tính rel HTML của thẻ link
   */
  rel?: string;

  /**
   * Tùy chọn chuyển hướng của Next.js Link (thay thế lịch sử duyệt thay vì push)
   */
  replace?: boolean;

  /**
   * Cuộn lên đầu trang sau khi chuyển hướng trong Next.js Link
   */
  scroll?: boolean;

  /**
   * Tự động nạp trước tài nguyên trang trong Next.js Link
   */
  prefetch?: boolean;

  /**
   * Callback khi người dùng click vào mục này
   */
  onClick?: (e: React.MouseEvent) => void;

  /**
   * Class CSS tùy biến cho từng mục
   */
  className?: string;
}

/**
 * Giá trị chia sẻ qua React Context của Breadcrumb
 */
export interface BreadcrumbContextValue {
  size: BreadcrumbSize;
  variant: BreadcrumbVariant;
  color: BreadcrumbColor;
  radius: BreadcrumbRadius;
  underline: BreadcrumbUnderline;
  separator: ReactNode;
  disabled?: boolean;
}

/**
 * Props cho component container gốc `<Breadcrumb>`
 */
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML <nav>
   */
  ref?: Ref<HTMLElement>;

  /**
   * Kích thước giao diện (sm, md, lg)
   * @default 'md'
   */
  size?: BreadcrumbSize;

  /**
   * Biến thể kiểu dáng hiển thị (standard, solid, bordered, other)
   * @default 'standard'
   */
  variant?: BreadcrumbVariant;

  /**
   * Chủ đề màu sắc
   * @default 'neutral'
   */
  color?: BreadcrumbColor;

  /**
   * Tùy chỉnh độ bo góc
   * @default 'md'
   */
  radius?: BreadcrumbRadius;

  /**
   * Kiểu gạch chân cho liên kết (none, hover, always)
   * @default 'hover'
   */
  underline?: BreadcrumbUnderline;

  /**
   * Ký hiệu phân cách giữa các mục (mặc định là ChevronRightIcon)
   */
  separator?: ReactNode;

  /**
   * Số lượng mục tối đa hiển thị trước khi tự động rút gọn các mục ở giữa
   */
  maxItems?: number;

  /**
   * Số mục hiển thị ở đầu danh sách trước dấu ba chấm thu gọn
   * @default 1
   */
  itemsBeforeCollapse?: number;

  /**
   * Số mục hiển thị ở cuối danh sách sau dấu ba chấm thu gọn
   * @default 1
   */
  itemsAfterCollapse?: number;

  /**
   * Hành vi tương tác của nút ba chấm thu gọn (dropdown, expand, none)
   * @default 'dropdown'
   */
  collapseMode?: BreadcrumbCollapseMode;

  /**
   * Danh sách dữ liệu các mục (Data-driven API)
   */
  items?: BreadcrumbItemData[];

  /**
   * Vô hiệu hóa tương tác toàn bộ thanh Breadcrumb
   * @default false
   */
  disabled?: boolean;

  /**
   * Nhãn trợ năng cho thẻ <nav>
   * @default 'Breadcrumb'
   */
  ariaLabel?: string;

  /**
   * Nội dung con khi sử dụng theo mô hình Compound Components
   */
  children?: ReactNode;
}

/**
 * Props cho container danh sách `<BreadcrumbList>` (<ol>)
 */
export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {
  /**
   * Ref chuyển tiếp đến thẻ <ol>
   */
  ref?: Ref<HTMLOListElement>;

  /**
   * Danh sách các component con `<BreadcrumbItem>` và `<BreadcrumbSeparator>`
   */
  children?: ReactNode;
}

/**
 * Props cho thẻ mục `<BreadcrumbItem>` (<li>)
 */
export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Ref chuyển tiếp đến thẻ <li>
   */
  ref?: Ref<HTMLLIElement>;

  /**
   * Đánh dấu mục này là trang hiện tại đang đứng (aria-current="page")
   * @default false
   */
  current?: boolean;

  /**
   * Vô hiệu hóa mục này
   * @default false
   */
  disabled?: boolean;

  /**
   * Nội dung bên trong item (Link, Page hoặc text trực tiếp)
   */
  children?: ReactNode;
}

/**
 * Props cho component liên kết `<BreadcrumbLink>` (sử dụng Next.js Link)
 */
export interface BreadcrumbLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> {
  /**
   * Ref chuyển tiếp đến phần tử HTML thẻ liên kết hoặc nút
   */
  ref?: Ref<HTMLAnchorElement | HTMLButtonElement>;

  /**
   * Callback khi click vào liên kết hoặc nút
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;

  /**
   * Đường dẫn điều hướng của Next.js
   */
  href?: string;

  /**
   * Chuyển quyền render sang component con (Slot pattern)
   */
  asChild?: boolean;

  /**
   * Tùy biến thẻ render (ví dụ button hoặc custom component)
   */
  as?: ElementType;

  /**
   * Mở liên kết ở tab mới (tự động gắn rel="noopener noreferrer" và icon mở liên kết)
   * @default false
   */
  external?: boolean;

  /**
   * Icon hiển thị phía trước tiêu đề link
   */
  startIcon?: ReactNode;

  /**
   * Icon hiển thị phía sau tiêu đề link
   */
  endIcon?: ReactNode;

  /**
   * Huy hiệu / số lượng gắn kèm
   */
  badge?: ReactNode;

  /**
   * Vô hiệu hóa liên kết
   * @default false
   */
  disabled?: boolean;

  /**
   * Next.js Link: Thay thế lịch sử duyệt
   */
  replace?: boolean;

  /**
   * Next.js Link: Tự động cuộn lên đầu trang
   */
  scroll?: boolean;

  /**
   * Next.js Link: Nạp trước trang
   */
  prefetch?: boolean;

  /**
   * Nội dung tiêu đề liên kết
   */
  children?: ReactNode;
}

/**
 * Props cho component văn bản trang hiện tại `<BreadcrumbPage>`
 */
export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Ref chuyển tiếp đến thẻ <span>
   */
  ref?: Ref<HTMLSpanElement>;

  /**
   * Icon hiển thị phía trước
   */
  startIcon?: ReactNode;

  /**
   * Icon hiển thị phía sau
   */
  endIcon?: ReactNode;

  /**
   * Huy hiệu / số lượng gắn kèm
   */
  badge?: ReactNode;

  /**
   * Nội dung trang hiện tại
   */
  children?: ReactNode;
}

/**
 * Props cho ký hiệu phân cách `<BreadcrumbSeparator>`
 */
export interface BreadcrumbSeparatorProps
  extends HTMLAttributes<HTMLLIElement> {
  /**
   * Ref chuyển tiếp đến thẻ <li> phân cách
   */
  ref?: Ref<HTMLLIElement>;

  /**
   * Ký hiệu phân cách tùy chỉnh thay cho separator mặc định từ Context
   */
  children?: ReactNode;
}

/**
 * Props cho nút thu gọn ba chấm `<BreadcrumbEllipsis>`
 */
export interface BreadcrumbEllipsisProps
  extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML ellipsis
   */
  ref?: Ref<HTMLSpanElement>;

  /**
   * Danh sách các mục đang bị thu gọn để hiển thị trong Dropdown menu
   */
  items?: BreadcrumbItemData[];

  /**
   * Nhãn trợ năng cho nút thu gọn
   * @default 'Hiển thị thêm đường dẫn'
   */
  ariaLabel?: string;

  /**
   * Callback khi người dùng click vào dấu ba chấm (đối với mode 'expand')
   */
  onExpand?: () => void;
}
