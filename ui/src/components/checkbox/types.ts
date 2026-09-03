import { InputHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";

export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CheckboxVariant = "filled" | "outline" | "soft" | "other";
export type CheckboxColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "neutral";
export type CheckboxRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type CheckboxLabelPlacement = "right" | "left";
export type CheckboxGroupOrientation = "horizontal" | "vertical";
export type CheckboxSearchMode = "client" | "server";

/**
 * Đại diện cho một phần tử tùy chọn checkbox trong danh sách options của CheckboxGroup
 */
export interface CheckboxOptionItem<TData = unknown> {
  /** Giá trị định danh duy nhất của checkbox */
  value: string;
  /** Nhãn hiển thị chính của checkbox */
  label: ReactNode;
  /** Đoạn mô tả/chú thích phụ hiển thị bên dưới nhãn */
  description?: ReactNode;
  /** Vô hiệu hóa tương tác của ô checkbox này */
  disabled?: boolean;
  /** Chế độ chỉ đọc cho ô checkbox này */
  isReadOnly?: boolean;
  /** Trạng thái gạch ngang (indeterminate) */
  indeterminate?: boolean;
  /** Dữ liệu gốc đính kèm (dùng khi tìm kiếm hoặc lưu trữ ngữ cảnh nâng cao) */
  data?: TData;
  /** Cho phép mở rộng các trường tùy biến phục vụ tìm kiếm theo searchField */
  [key: string]: unknown;
}

/**
 * Cấu hình tập trung các cờ trạng thái / tính năng của Checkbox
 */
export interface CheckboxConfig {
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
   * Trạng thái đang tải (vô hiệu hóa tương tác, aria-busy="true")
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiển thị biểu tượng xoay spinner khi đang ở trạng thái loading
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Trạng thái trung gian (indeterminate / gạch ngang) - thường dùng cho "Chọn tất cả"
   * @default false
   */
  indeterminate?: boolean;
}

/**
 * Cấu hình tập trung các cờ trạng thái / tính năng của CheckboxGroup
 */
export interface CheckboxGroupConfig {
  /**
   * Đánh dấu trường bắt buộc chọn
   * @default false
   */
  isRequired?: boolean;

  /**
   * Trạng thái báo lỗi cho cả nhóm
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Trạng thái đang tải cho cả nhóm
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiển thị spinner cho các checkbox con đang tải
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Chế độ chỉ đọc cho cả nhóm
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * Kích hoạt thanh tìm kiếm tích hợp
   * @default false
   */
  searchable?: boolean;

  /**
   * Trạng thái đang tải tìm kiếm (Server mode)
   * @default false
   */
  isSearching?: boolean;

  /**
   * Tự động bảo lưu các mục đã chọn khi lọc tìm kiếm
   * @default true
   */
  preserveSelected?: boolean;
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng (isRequired, isInvalid, isLoading, indeterminate,...)
   */
  config?: CheckboxConfig;

  /**
   * Ref chuyển tiếp đến phần tử HTML input (React 19)
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Kích cỡ của checkbox:
   * - 'xs': box 14px, icon 10px, text 12px
   * - 'sm': box 16px, icon 12px, text 14px
   * - 'md': box 20px, icon 14px, text 14px (mặc định)
   * - 'lg': box 24px, icon 16px, text 16px
   * - 'xl': box 28px, icon 20px, text 18px
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * Biến thể giao diện của checkbox khi checked:
   * - 'filled': nền màu đặc tương phản cao (mặc định)
   * - 'outline': nền trắng / trong suốt, viền và icon mang màu chủ đề
   * - 'soft': nền pastel dịu nhẹ theo tone màu chủ đề
   * - 'other': không áp dụng style mặc định, tự do tùy biến qua className
   * @default 'filled'
   */
  variant?: CheckboxVariant;

  /**
   * Chủ đề màu sắc (primary, secondary, error, success, warning, info, neutral)
   * @default 'primary'
   */
  color?: CheckboxColor;

  /**
   * Tùy chỉnh độ bo góc của ô checkbox:
   * - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   * @default 'md'
   */
  radius?: CheckboxRadius;


  /**
   * Nhãn văn bản hiển thị cạnh ô checkbox
   */
  label?: ReactNode;

  /**
   * Đoạn văn bản hướng dẫn/chú thích bên dưới
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi hiển thị bên dưới (khi có errorMessage sẽ tự kích hoạt isInvalid)
   */
  errorMessage?: ReactNode;

  /**
   * Vị trí đặt nhãn so với ô checkbox:
   * - 'right': Ô checkbox bên trái, nhãn bên phải (mặc định)
   * - 'left': Nhãn bên trái, ô checkbox bên phải
   * @default 'right'
   */
  labelPlacement?: CheckboxLabelPlacement;

  /**
   * Icon tùy chỉnh thay thế cho icon dấu tích khi checked
   */
  icon?: ReactNode;

  /**
   * Icon tùy chỉnh thay thế cho icon gạch ngang khi indeterminate
   */
  indeterminateIcon?: ReactNode;

  /**
   * Tùy biến className cho container bọc toàn bộ (label, checkbox, error/helper text)
   */
  wrapperClassName?: string;

  /**
   * Tùy biến className cho riêng ô checkbox hình vuông (hoặc tròn)
   */
  boxClassName?: string;

  /**
   * Tùy biến className cho phần tử văn bản label
   */
  labelClassName?: string;

  /**
   * Tùy biến className cho helperText hoặc errorMessage
   */
  helperClassName?: string;
}

export interface CheckboxGroupProps<TData = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: CheckboxGroupConfig;

  /**
   * Ref chuyển tiếp đến container thẻ div của nhóm (React 19)
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Danh sách các tùy chọn checkbox dạng mảng dữ liệu (Data-driven)
   * @default []
   */
  options?: CheckboxOptionItem<TData>[];


  /**
   * Chế độ tìm kiếm: 'client' (lọc tại chỗ) hoặc 'server' (gọi API sau debounce)
   * @default 'client'
   */
  searchMode?: CheckboxSearchMode;

  /**
   * Placeholder hiển thị trong ô tìm kiếm
   * @default 'Tìm kiếm...'
   */
  searchPlaceholder?: string;

  /**
   * Giá trị từ khóa tìm kiếm (khi kiểm soát Controlled)
   */
  searchValue?: string;

  /**
   * Giá trị từ khóa tìm kiếm mặc định ban đầu (Uncontrolled)
   */
  defaultSearchValue?: string;

  /**
   * Callback kích hoạt khi từ khóa tìm kiếm thay đổi
   */
  onSearchChange?: (value: string) => void;

  /**
   * Tùy biến className cho ô input tìm kiếm
   */
  searchClassName?: string;

  /**
   * Trường dữ liệu để so khớp khi tìm kiếm ở mode client.
   * - Có thể truyền 1 field (string, ví dụ 'label', 'email', 'code')
   * - Hoặc nhiều fields (string[], ví dụ ['label', 'email', 'description']) để tìm kiếm mở rộng (OR).
   * @default 'label'
   */
  searchField?: string | string[];

  /**
   * Hàm tùy biến lọc dữ liệu ở mode client
   */
  filterFn?: (option: CheckboxOptionItem<TData>, query: string) => boolean;

  /**
   * Callback được gọi sau khi debounce khi người dùng gõ tìm kiếm (ở Server mode).
   * Có thể trả về Promise danh sách options mới hoặc cập nhật prop options từ ngoài.
   */
  onSearch?: (query: string) => void | Promise<CheckboxOptionItem<TData>[] | void>;

  /**
   * Thời gian trì hoãn debounce tính theo mili-giây (Server mode).
   * @default 300
   */
  debounceMs?: number;


  /**
   * Nội dung hiển thị khi không có kết quả tìm kiếm
   * @default 'Không tìm thấy kết quả'
   */
  emptyText?: ReactNode;

  /**
   * Mảng các giá trị được chọn (Controlled mode)
   */
  value?: string[];

  /**
   * Mảng các giá trị mặc định được chọn ban đầu (Uncontrolled mode)
   */
  defaultValue?: string[];

  /**
   * Callback kích hoạt khi danh sách checkbox được chọn thay đổi
   */
  onChange?: (values: string[]) => void;

  /**
   * Kích cỡ áp dụng chung cho tất cả các checkbox con
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * Màu sắc áp dụng chung cho tất cả các checkbox con
   * @default 'primary'
   */
  color?: CheckboxColor;

  /**
   * Biến thể áp dụng chung cho tất cả các checkbox con
   * @default 'filled'
   */
  variant?: CheckboxVariant;

  /**
   * Độ bo góc áp dụng chung cho tất cả các checkbox con
   */
  radius?: CheckboxRadius;

  /**
   * Vô hiệu hóa toàn bộ các checkbox trong nhóm
   * @default false
   */
  disabled?: boolean;


  /**
   * Tiêu đề / Nhãn chung cho cả nhóm checkbox
   */
  label?: ReactNode;

  /**
   * Hướng sắp xếp các checkbox:
   * - 'vertical': Sắp xếp theo chiều dọc (mặc định)
   * - 'horizontal': Sắp xếp theo chiều ngang
   * @default 'vertical'
   */
  orientation?: CheckboxGroupOrientation;

  /**
   * Vị trí đặt nhãn của các checkbox con trong nhóm
   * @default 'right'
   */
  labelPlacement?: CheckboxLabelPlacement;

  /**
   * Đoạn văn bản hướng dẫn/chú thích cho nhóm
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi hiển thị cho cả nhóm (sẽ tự động kích hoạt isInvalid)
   */
  errorMessage?: ReactNode;

  /**
   * Tùy biến className cho container bọc ngoài cùng của nhóm
   */
  wrapperClassName?: string;

  /**
   * Tùy biến className cho tiêu đề nhãn của nhóm
   */
  labelClassName?: string;

  /**
   * Tùy biến className cho helperText hoặc errorMessage của nhóm
   */
  helperClassName?: string;
}
