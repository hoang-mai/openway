import { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";

/**
 * Kích thước hiển thị của Collapse (header padding, font-size, icon size):
 * - `sm`: Nhỏ gọn, tối ưu không gian
 * - `md`: Tiêu chuẩn (mặc định)
 * - `lg`: Lớn, thoáng đãng
 */
export type CollapseSize = "sm" | "md" | "lg";

/**
 * Biến thể giao diện của Collapse:
 * - `outlined`: Khung viền ngoài và các đường kẻ phân cách mang màu sắc chủ đề (mặc định)
 * - `filled`: Khối nền mang màu sắc chủ đề nhẹ tạo cảm giác liền mạch
 * - `ghost`: Trong suốt, không viền ngoài tối giản
 * - `separated`: Mỗi panel là một thẻ card riêng biệt cách nhau bởi khoảng trống
 * - `other`: Tự do tùy biến class hoàn toàn
 */
export type CollapseVariant = "outlined" | "filled" | "ghost" | "separated" | "other";

/**
 * Chủ đề màu sắc hiển thị (focus ring, viền highlight, màu tiêu đề khi active):
 * - `primary` | `secondary` | `neutral` | `error` | `success` | `warning` | `info`
 */
export type CollapseColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

/**
 * Tùy chỉnh độ bo góc của container và các panel items:
 * - `none`: Không bo góc
 * - `sm`: Bo góc nhỏ
 * - `md`: Bo góc vừa (mặc định)
 * - `lg`: Bo góc lớn
 * - `xl`: Bo góc rất lớn
 * - `full`: Bo tròn hoàn toàn
 */
export type CollapseRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Vị trí hiển thị của icon mũi tên mở rộng:
 * - `left`: Nằm bên trái tiêu đề
 * - `right`: Nằm bên phải tiêu đề (mặc định)
 * - `none`: Không hiển thị icon mũi tên
 */
export type CollapseExpandIconPosition = "left" | "right" | "none";

/**
 * Kiểu dữ liệu của khóa định danh panel đang active:
 * - `string | number`: Trong chế độ Accordion (chỉ 1 panel mở)
 * - `(string | number)[]`: Trong chế độ Multiple (nhiều panel cùng mở)
 */
export type CollapseActiveKey = string | number | (string | number)[];

/**
 * Giá trị và các phương thức điều khiển được cung cấp qua CollapseContext
 */
export interface CollapseContextValue {
  /** Tập hợp các khóa panel đang mở */
  activeKeys: Set<string | number>;
  /** Hàm kích hoạt mở/đóng một panel */
  handleToggle: (key: string | number) => void;
  /** Chế độ chỉ mở 1 panel tại một thời điểm */
  accordion: boolean;
  /** Kích thước chung của collapse */
  size: CollapseSize;
  /** Biến thể giao diện của collapse */
  variant: CollapseVariant;
  /** Màu sắc chủ đề của collapse */
  color: CollapseColor;
  /** Độ bo góc của container và items */
  radius: CollapseRadius;
  /** Vị trí icon mũi tên */
  expandIconPosition: CollapseExpandIconPosition;
  /** Custom render icon mũi tên */
  expandIcon?: ReactNode | ((props: { isActive: boolean; disabled?: boolean }) => ReactNode);
  /** Tự động unmount nội dung khỏi DOM khi đóng */
  destroyInactivePanel: boolean;
}

/**
 * Ngữ cảnh riêng biệt của từng panel item được cung cấp qua CollapsePanelContext
 */
export interface CollapsePanelContextValue {
  /** Khóa định danh duy nhất của panel */
  value: string | number;
  /** Trạng thái panel đang mở hay đóng */
  isActive: boolean;
  /** Trạng thái vô hiệu hóa panel */
  disabled?: boolean;
  /** ID phần tử HTML của header (phục vụ trợ năng WAI-ARIA) */
  headerId: string;
  /** ID phần tử HTML của content (phục vụ trợ năng WAI-ARIA) */
  panelId: string;
  /** Hàm toggle đóng/mở riêng cho panel này */
  onToggle: () => void;
}

/**
 * Props cho component container chính `<Collapse>`
 */
export interface CollapseProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Ref chuyển tiếp đến phần tử HTML root container div
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Khóa của các panel đang mở (Controlled mode)
   */
  activeKey?: CollapseActiveKey;

  /**
   * Khóa của các panel mở mặc định khi khởi tạo (Uncontrolled mode)
   */
  defaultActiveKey?: CollapseActiveKey;

  /**
   * Callback khi thay đổi trạng thái mở/đóng của các panel
   */
  onChange?: (activeKey: CollapseActiveKey) => void;

  /**
   * Chế độ Accordion: chỉ mở tối đa 1 panel tại một thời điểm
   * @default false
   */
  accordion?: boolean;

  /**
   * Kích thước giao diện của component (sm, md, lg)
   * @default "md"
   */
  size?: CollapseSize;

  /**
   * Biến thể kiểu dáng của Collapse
   * @default "outlined"
   */
  variant?: CollapseVariant;

  /**
   * Chủ đề màu sắc (primary, secondary, neutral, error, success, warning, info)
   * @default "primary"
   */
  color?: CollapseColor;

  /**
   * Tùy chỉnh độ bo góc của container và items
   * @default "md"
   */
  radius?: CollapseRadius;

  /**
   * Vị trí hiển thị icon mũi tên mở rộng
   * @default "right"
   */
  expandIconPosition?: CollapseExpandIconPosition;

  /**
   * Custom icon mũi tên hoặc render function nhận vào trạng thái isActive và disabled
   */
  expandIcon?: ReactNode | ((props: { isActive: boolean; disabled?: boolean }) => ReactNode);

  /**
   * Tự động unmount nội dung của tất cả các panel khi bị đóng
   * @default false
   */
  destroyInactivePanel?: boolean;

  /**
   * Danh sách các `<CollapsePanel>` con (theo mô hình Declarative Compound Components)
   */
  children?: ReactNode;
}

/**
 * Props cho từng panel đơn lẻ `<CollapsePanel>`
 */
export interface CollapsePanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref chuyển tiếp đến phần tử DOM của Panel
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Khóa định danh duy nhất cho panel
   */
  value: string | number;

  /**
   * Tiêu đề hiển thị của panel (khi dùng cách khai báo nhanh)
   */
  label?: ReactNode;

  /**
   * Phụ đề mô tả bên dưới tiêu đề
   */
  description?: ReactNode;

  /**
   * Icon hoặc phần tử hiển thị phía trước tiêu đề
   */
  startIcon?: ReactNode;

  /**
   * Nội dung hoặc hành động phụ bên phải header (badge, icon action, tag...).
   * Click vào phần tử này sẽ không kích hoạt toggle mở/đóng panel.
   */
  extra?: ReactNode;

  /**
   * Vô hiệu hóa đóng/mở panel này
   * @default false
   */
  disabled?: boolean;

  /**
   * Tùy chọn hiển thị icon mũi tên mở rộng cho riêng panel này
   * @default true
   */
  showArrow?: boolean;

  /**
   * Class tùy biến cho phần header (nút bấm toggle)
   */
  headerClassName?: string;

  /**
   * Class tùy biến cho phần nội dung (content body)
   */
  contentClassName?: string;

  /**
   * Tự động unmount nội dung khỏi DOM khi panel bị đóng
   */
  destroyInactivePanel?: boolean;

  /**
   * Nội dung bên trong panel hoặc các subcomponents `<CollapseHeader>` & `<CollapseContent>`
   */
  children?: ReactNode;
}

/**
 * Props cho phần tiêu đề kích hoạt mở/đóng `<CollapseHeader>`
 */
export interface CollapseHeaderProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Ref đến nút button trigger */
  ref?: Ref<HTMLButtonElement>;
  /** Icon hiển thị phía trước */
  startIcon?: ReactNode;
  /** Mô tả phụ */
  description?: ReactNode;
  /** Nội dung phụ bên phải (badge, actions) */
  extra?: ReactNode;
  /** Hiển thị mũi tên mở rộng */
  showArrow?: boolean;
  /** Tiêu đề hoặc nội dung JSX tự do */
  children?: ReactNode;
}

/**
 * Props cho khung chứa nội dung trượt mở `<CollapseContent>`
 */
export interface CollapseContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref đến container nội dung */
  ref?: Ref<HTMLDivElement>;
  /** Tự động unmount nội dung khỏi DOM khi đóng */
  destroyInactivePanel?: boolean;
  /** Nội dung bên trong panel */
  children?: ReactNode;
}

/**
 * Props cho component gập mở độc lập `<Collapsible>`
 */
export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML root div
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Trạng thái mở rộng (Controlled mode)
   */
  open?: boolean;

  /**
   * Trạng thái mở rộng mặc định khi khởi tạo (Uncontrolled mode)
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback khi thay đổi trạng thái mở rộng
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Tự động unmount nội dung khỏi DOM khi đóng
   * @default false
   */
  destroyInactivePanel?: boolean;

  /**
   * Nội dung bên trong Collapsible
   */
  children?: ReactNode;
}
