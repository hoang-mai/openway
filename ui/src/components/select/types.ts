import { ReactNode, Ref } from "react";
import { Placement } from "@floating-ui/react";
import { EmptyProps } from "@/components/empty/types";

export type SelectSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SelectVariant = "outline" | "filled" | "ghost" | "other";
export type SelectColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "neutral";
export type SelectRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type SelectSearchMode = "client" | "server";

export type SelectSearchPlacement = "trigger" | "menu" | "both";
export type SelectFilterLayout = "vertical" | "grid";
export type LabelPlacement = "top" | "left" | "floating";

export interface SelectOptionItem<TData = unknown> {
  value: string | number;
  label: string;
  disabled?: boolean;
  description?: ReactNode;
  icon?: ReactNode;
  data?: TData;
}

export type SelectFilterType = "string" | "text" | "number" | "date" | "date-range" | "checkbox-group" | "custom";

export interface SelectFilterField<TValue = unknown> {
  /** Tên định danh trường lọc (dùng làm key trong object filters) */
  name: string;
  /** Loại component lọc */
  type: SelectFilterType;
  /** Nhãn hiển thị của bộ lọc */
  label?: ReactNode;
  /** Placeholder cho input */
  placeholder?: string;
  /** Giá trị mặc định */
  defaultValue?: TValue;
  /** Giá trị điều khiển */
  value?: TValue;
  /** Số cột chiếm trong grid layout (1, 2, 3...) */
  colSpan?: number;
  /** Danh sách options (dùng cho checkbox-group hoặc select con) */
  options?: { label: ReactNode; value: string | number; disabled?: boolean }[];
  /** Props truyền thêm vào component tương ứng (InputProps, DatePickerProps, ...) */
  props?: Record<string, unknown>;
  /** Custom render khi type="custom" */
  render?: (fieldState: { value: TValue | undefined; onChange: (val: TValue) => void }) => ReactNode;
}

export interface BaseSelectProps<TData = unknown, TFilters extends Record<string, unknown> = Record<string, unknown>> {
  /** Ref chuyển tiếp tới root wrapper element */
  ref?: Ref<HTMLDivElement>;

  // ==================== THEME & APPEARANCE ====================
  /** Kích thước: xs, sm, md, lg, xl. Mặc định 'md' */
  size?: SelectSize;
  /** Biến thể giao diện: outline, filled, ghost, other. Mặc định 'outline' */
  variant?: SelectVariant;
  /** Chủ đề màu sắc: primary, secondary, error, success, warning, info, neutral. Mặc định 'primary' */
  color?: SelectColor;
  /** Độ bo góc: none, sm, md, lg, xl, full */
  radius?: SelectRadius;

  // ==================== OPTIONS ====================
  /** Danh sách các tùy chọn */
  options: SelectOptionItem<TData>[];

  // ==================== LABEL & FORM ====================
  /** ID định danh cho Select */
  id?: string;
  /** Nhãn tiêu đề của Select */
  label?: ReactNode;
  /** Vị trí nhãn: top, left, floating. Mặc định 'top' */
  labelPlacement?: LabelPlacement;
  /** ClassName tùy biến cho nhãn */
  labelClassName?: string;
  /** Văn bản gợi ý khi chưa chọn */
  placeholder?: string;
  /** Văn bản hướng dẫn bên dưới */
  helperText?: ReactNode;
  /** Thông báo lỗi khi không hợp lệ */
  errorMessage?: ReactNode;
  /** Trạng thái không hợp lệ */
  isInvalid?: boolean;
  /** Bắt buộc chọn */
  isRequired?: boolean;
  /** Vô hiệu hóa Select */
  isDisabled?: boolean;
  /** Chỉ đọc, không cho phép thay đổi */
  readOnly?: boolean;

  /** Tên trường form HTML để submit */
  name?: string;

  // ==================== SEARCH & TRIGGER ====================
  /** Cho phép tìm kiếm. Mặc định false */
  searchable?: boolean;
  /** Chế độ tìm kiếm: 'client' (fuzzy search) hoặc 'server' (debounce + API). Mặc định 'client' */
  searchMode?: SelectSearchMode;
  /** Vị trí ô tìm kiếm: 'trigger' (trên trigger), 'menu' (trong dropdown), 'both'. Mặc định 'trigger' */
  searchPlacement?: SelectSearchPlacement;
  /** Placeholder cho ô tìm kiếm */
  searchPlaceholder?: string;
  /** Trường dùng để tìm kiếm (mặc định ['label', 'value']), hỗ trợ string, mảng hoặc hàm accessor tương tự CheckboxGroup */
  searchField?:
    | (keyof SelectOptionItem<TData> | string | ((item: SelectOptionItem<TData>) => string | undefined | null))[]
    | (keyof SelectOptionItem<TData> | string);
  /** Giá trị từ khóa tìm kiếm (khi controlled) */
  searchValue?: string;
  /** Callback khi từ khóa thay đổi */
  onSearchChange?: (value: string) => void;

  // ==================== MULTI-FIELD MENU FILTERS ====================
  /** Cấu hình danh sách các bộ lọc hiển thị bên trong dropdown menu */
  menuFilters?: SelectFilterField<unknown>[];
  /** Giá trị điều khiển cho các bộ lọc trong menu */
  menuFilterValues?: Partial<TFilters>;
  /** Bố cục danh sách bộ lọc: 'vertical' hoặc 'grid'. Mặc định 'vertical' */
  menuFilterLayout?: SelectFilterLayout;
  /** Số cột khi menuFilterLayout='grid'. Mặc định 2 */
  menuFilterGridCols?: number;
  /** Hiển thị nút Reset / Xóa bộ lọc. Mặc định true khi có menuFilters */
  showResetFilters?: boolean;
  /** Văn bản nút Reset bộ lọc. Mặc định 'Xoá bộ lọc' */
  resetFiltersText?: ReactNode;
  /** Callback khi bất kỳ filter nào trong menu thay đổi */
  onMenuFilterChange?: (filters: TFilters) => void;
  /** Nội dung tùy biến trên đầu menu (trước hoặc thay thế filter) */
  menuHeader?: ReactNode;
  /** Nội dung tùy biến dưới đáy menu */
  menuFooter?: ReactNode;
  /** Nội dung tùy biến ở đáy danh sách tùy chọn bên trong vùng cuộn (ví dụ: Sentinel/Skeleton/Spinner khi phân trang Infinite Scroll) */
  listFooter?: ReactNode;

  // ==================== SERVER SEARCH CALLBACK & DEBOUNCE ====================
  /** Callback được gọi sau khi debounce khi search query hoặc menu filters thay đổi (ở Server mode) */
  onSearch?: (query: string, filters: TFilters) => void | Promise<void>;
  /** Thời gian trì hoãn debounce tính theo ms. Mặc định 300 */
  debounceMs?: number;

  // ==================== CLIENT FILTER FUNCTION ====================
  /** Hàm custom predicate lọc options ở chế độ client */
  filterFn?: (option: SelectOptionItem<TData>, query: string, filters: TFilters) => boolean;

  // ==================== EMPTY STATE & LOADING ====================
  /** Trạng thái đang tải dữ liệu */
  isLoading?: boolean;
  /** Văn bản hiển thị khi không có dữ liệu */
  emptyText?: ReactNode;
  /** Props tùy biến chuyển tiếp đến component Empty */
  emptyProps?: Partial<EmptyProps>;

  // ==================== ACTIONS & STATES ====================
  /** Hiển thị nút xoá nhanh toàn bộ giá trị đã chọn */
  clearable?: boolean;
  /** Render menu qua Portal để tránh bị che bởi overflow hidden. Mặc định true */
  portal?: boolean;
  /** Vị trí hiển thị của popup dropdown. Mặc định 'bottom-start' */
  placement?: Placement;
  /** Chiều cao tối đa của vùng cuộn menu. Mặc định 280px */
  maxMenuHeight?: number | string;

  // ==================== ANIMATION ====================
  /** Bật/tắt animation khi dropdown menu xuất hiện/biến mất. Mặc định true */
  animated?: boolean;
  /** Thời lượng hiệu ứng tính bằng mili-giây (ms). Mặc định 150 */
  animationDuration?: number;

  // ==================== CUSTOM RENDER & ADDONS ====================
  /** Icon hoặc nội dung ở đầu trigger */
  startContent?: ReactNode;
  /** Icon hoặc nội dung ở cuối trigger */
  endContent?: ReactNode;
  /** Tùy biến render từng option trong menu */
  renderOption?: (option: SelectOptionItem<TData>, state: { selected: boolean; active: boolean }) => ReactNode;

  // ==================== CLASSNAMES ====================
  /** ClassName tùy biến cho wrapper ngoài cùng */
  className?: string;
  /** ClassName cho phần trigger box */
  triggerClassName?: string;
  /** ClassName cho popup dropdown menu */
  menuClassName?: string;
}

/** Props cho component Select (Single Select) */
export interface SelectProps<
  TData = unknown,
  TFilters extends Record<string, unknown> = Record<string, unknown>,
> extends BaseSelectProps<TData, TFilters> {
  /** Giá trị đã chọn (controlled) */
  value?: string | number | null;
  /** Giá trị mặc định ban đầu (uncontrolled) */
  defaultValue?: string | number | null;
  /** Callback khi giá trị thay đổi */
  onChange?: (value: string | number | null, option?: SelectOptionItem<TData> | null) => void;
  /** Tùy biến render giá trị hiển thị trên trigger */
  renderValue?: (selected: SelectOptionItem<TData>) => ReactNode;
}

/** Alias cho SelectProps */
export type SingleSelectProps<
  TData = unknown,
  TFilters extends Record<string, unknown> = Record<string, unknown>,
> = SelectProps<TData, TFilters>;

/** Props cho component MultiSelect */
export interface MultiSelectProps<
  TData = unknown,
  TFilters extends Record<string, unknown> = Record<string, unknown>,
> extends BaseSelectProps<TData, TFilters> {
  /** Danh sách giá trị đã chọn (controlled) */
  value?: (string | number)[];
  /** Danh sách giá trị mặc định ban đầu (uncontrolled) */
  defaultValue?: (string | number)[];
  /** Callback khi giá trị thay đổi */
  onChange?: (values: (string | number)[], options?: SelectOptionItem<TData>[]) => void;
  /** Giới hạn số lượng tag Badge hiển thị trước khi gom thành +N */
  maxTagCount?: number;
  /** Tự động ghim bảo lưu các mục đã chọn khi tìm kiếm (tương tự CheckboxGroup). Mặc định true */
  preserveSelected?: boolean;
  /** Tùy biến render giá trị hiển thị trên trigger */
  renderValue?: (selected: SelectOptionItem<TData>[]) => ReactNode;
}
