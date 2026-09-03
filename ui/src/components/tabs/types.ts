import { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";

/**
 * Kích thước hiển thị của Tabs (sm: nhỏ, md: vừa, lg: lớn)
 */
export type TabSize = "sm" | "md" | "lg";

/**
 * Biến thể kiểu dáng hiển thị của Tabs và Sliding Indicator:
 * - `line`: Thanh gạch dưới/bên trượt mượt mà (mặc định)
 * - `solid`: Khối pill nền đậm nổi bật
 * - `bordered`: Bao khung viền quanh tab
 * - `flat`: Khối pill nền mềm nhạt (soft pill)
 * - `other`: Không áp dụng kiểu dáng mặc định, tự do tùy biến class
 */
export type TabVariant = "line" | "solid" | "bordered" | "flat" | "other";

/**
 * Chủ đề màu sắc của Tabs:
 * - `primary` | `secondary` | `neutral` | `error` | `success` | `warning` | `info`
 */
export type TabColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

/**
 * Tùy chỉnh độ bo góc của Tab và Sliding Indicator:
 * - `none`: Không bo góc
 * - `sm`: Bo góc nhỏ
 * - `md`: Bo góc vừa
 * - `lg`: Bo góc lớn
 * - `xl`: Bo góc rất lớn
 * - `full`: Bo tròn hoàn toàn (dạng pill)
 */
export type TabRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Chiều hiển thị danh sách Tabs:
 * - `horizontal`: Nằm ngang (mặc định)
 * - `vertical`: Nằm dọc
 */
export type TabOrientation = "horizontal" | "vertical";

/**
 * Vị trí đặt thanh danh sách Tabs so với nội dung panel:
 * - `top` | `bottom` khi `orientation="horizontal"`
 * - `left` | `right` khi `orientation="vertical"`
 */
export type TabPlacement = "top" | "bottom" | "left" | "right";

/**
 * Props cho component container gốc `<Tabs>`
 */
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Ref chuyển tiếp đến phần tử HTML container Tabs
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Khóa của tab đang active (sử dụng trong Controlled mode)
   */
  activeKey?: string | number;

  /**
   * Khóa của tab active mặc định ban đầu khi khởi tạo (sử dụng trong Uncontrolled mode)
   */
  defaultActiveKey?: string | number;

  /**
   * Callback kích hoạt khi người dùng thay đổi tab được chọn
   * @param key - Khóa định danh của tab vừa được chọn
   */
  onChange?: (key: string | number) => void;

  /**
   * Callback kích hoạt khi người dùng bấm nút đóng/xóa một tab (closable)
   * @param key - Khóa định danh của tab được yêu cầu đóng
   */
  onClose?: (key: string | number) => void;

  /**
   * Kích thước giao diện chung cho các tab con (sm, md, lg)
   * @default 'md'
   */
  size?: TabSize;

  /**
   * Biến thể kiểu dáng hiển thị của tab list & indicator:
   * - `line`: Thanh gạch dưới trượt (mặc định)
   * - `solid`: Khối pill nền đậm nổi bật
   * - `bordered`: Bao khung viền quanh tab
   * - `flat`: Khối nền mềm nhạt (soft pill)
   * - `other`: Tự do tùy biến class
   * @default 'line'
   */
  variant?: TabVariant;

  /**
   * Chủ đề màu sắc áp dụng cho các tab và indicator
   * @default 'primary'
   */
  color?: TabColor;

  /**
   * Độ bo góc của tab và indicator (none, sm, md, lg, xl, full)
   * @default 'md'
   */
  radius?: TabRadius;

  /**
   * Chiều hiển thị: 'horizontal' (ngang) hoặc 'vertical' (dọc)
   * @default 'horizontal'
   */
  orientation?: TabOrientation;

  /**
   * Vị trí đặt thanh tab list so với nội dung panel:
   * - `top` | `bottom` khi orientation='horizontal'
   * - `left` | `right` khi orientation='vertical'
   * @default 'top'
   */
  placement?: TabPlacement;

  /**
   * Tự động giãn đều chiều rộng các tab vừa khớp 100% container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Vô hiệu hóa toàn bộ tabs trong nhóm
   * @default false
   */
  disabled?: boolean;

  /**
   * Tự động unmount nội dung của tab khỏi DOM khi tab không active
   * @default false
   */
  destroyInactiveTabPane?: boolean;

  /**
   * Các compound components con (`TabList`, `TabPanels`, v.v.)
   */
  children?: ReactNode;
}

/**
 * Props cho component thanh danh sách chứa các tab `<TabList>`
 */
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML tablist
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Danh sách các phần tử `<Tab>` con
   */
  children?: ReactNode;

  /**
   * Class CSS tùy biến bổ sung cho TabList
   */
  className?: string;

  /**
   * Nội dung hoặc nút hành động phụ đặt ở góc thanh tab list
   */
  extra?: ReactNode;

  /**
   * Canh giữa danh sách các tab trong container (áp dụng khi orientation="horizontal")
   * @default false
   */
  centered?: boolean;
}

/**
 * Props cho component nút tab đơn lẻ `<Tab>`
 */
export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /**
   * Ref chuyển tiếp đến phần tử HTML button của tab
   */
  ref?: Ref<HTMLButtonElement>;

  /**
   * Khóa định danh duy nhất của tab để quản lý trạng thái active và liên kết với TabPanel
   */
  value: string | number;

  /**
   * Tiêu đề hiển thị của tab
   */
  label?: ReactNode;

  /**
   * Icon hoặc phần tử hiển thị trước tiêu đề tab
   */
  startIcon?: ReactNode;

  /**
   * Icon hoặc phần tử hiển thị sau tiêu đề tab
   */
  endIcon?: ReactNode;

  /**
   * Huy hiệu hoặc số lượng hiển thị trên tab
   */
  badge?: ReactNode;

  /**
   * Vô hiệu hóa riêng tab này
   * @default false
   */
  disabled?: boolean;

  /**
   * Cho phép hiển thị nút đóng (xóa) tab và hỗ trợ phím Delete/Backspace
   * @default false
   */
  closable?: boolean;

  /**
   * Callback khi người dùng bấm nút đóng trên tab này
   */
  onClose?: (e: React.MouseEvent) => void;

  /**
   * Class CSS tùy biến cho tab button
   */
  className?: string;

  /**
   * Nội dung tùy biến thay thế cho prop `label`
   */
  children?: ReactNode;
}

/**
 * Props cho component container chứa các panel nội dung `<TabPanels>`
 */
export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML container TabPanels
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Danh sách các component `<TabPanel>` con
   */
  children?: ReactNode;

  /**
   * Class CSS tùy biến cho TabPanels container
   */
  className?: string;
}

/**
 * Props cho component khung nội dung tương ứng của từng tab `<TabPanel>`
 */
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref chuyển tiếp đến phần tử HTML tabpanel
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Khóa định danh liên kết trực tiếp với `value` của `<Tab>` tương ứng
   */
  value: string | number;

  /**
   * Nội dung giao diện hiển thị khi tab tương ứng đang active
   */
  children?: ReactNode;

  /**
   * Class CSS tùy biến cho panel nội dung
   */
  className?: string;

  /**
   * Tự động unmount nội dung khỏi DOM khi tab không active (ghi đè cấu hình từ `<Tabs>`)
   */
  destroyInactiveTabPane?: boolean;
}
