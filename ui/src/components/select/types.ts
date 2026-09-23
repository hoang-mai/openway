import { ReactNode, Ref } from "react";
import { Placement } from "@floating-ui/react";
import { EmptyProps } from "@/components/empty/types";
import type { CheckboxGroupProps, CheckboxOptionItem, CheckboxSearchMode } from "../checkbox/types";
import type { DatePickerProps } from "../datepicker/types";
import type { DateRangePickerProps } from "../daterangepicker/types";
import type { InputProps, NumberInputProps } from "../input/types";

export type SelectSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SelectVariant = "outline" | "filled" | "ghost" | "other";
export type SelectColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "neutral";
export type SelectRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type SelectSearchMode = "client" | "server";

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

/**
 * Thuộc tính cơ sở dùng chung cho tất cả các loại trường lọc trong Select Menu
 */
export interface BaseSelectFilterField<TValue = unknown> {
  /** Tên định danh trường lọc (dùng làm key trong object filters) */
  name: string;
  /** Nhãn hiển thị của bộ lọc */
  label?: ReactNode;
  /** Placeholder cho input hoặc ô tìm kiếm */
  placeholder?: string;
  /** Giá trị mặc định ban đầu */
  defaultValue?: TValue;
  /** Giá trị điều khiển (khi controlled) */
  value?: TValue;
}

/**
 * Trường lọc dạng văn bản / chuỗi (String / Text)
 */
export interface SelectStringFilterField extends BaseSelectFilterField<string> {
  type: "string" | "text";
  /** Props tùy biến truyền thêm vào Input */
  props?: Partial<InputProps>;
}

/**
 * Trường lọc dạng số (Number)
 */
export interface SelectNumberFilterField extends BaseSelectFilterField<number | string> {
  type: "number";
  /** Giá trị nhỏ nhất */
  min?: number;
  /** Giá trị lớn nhất */
  max?: number;
  /** Bước nhảy */
  step?: number;
  /** Props tùy biến truyền thêm vào NumberInput */
  props?: Partial<NumberInputProps>;
}

/**
 * Trường lọc dạng chọn 1 ngày (DatePicker)
 */
export interface SelectDateFilterField extends BaseSelectFilterField<Date | null> {
  type: "date";
  /** Giới hạn ngày nhỏ nhất có thể chọn */
  minDate?: Date;
  /** Giới hạn ngày lớn nhất có thể chọn */
  maxDate?: Date;
  /** Props tùy biến truyền thêm vào DatePicker */
  props?: Partial<DatePickerProps>;
}

/**
 * Trường lọc dạng khoảng ngày (DateRangePicker)
 */
export interface SelectDateRangeFilterField extends BaseSelectFilterField<[Date | null, Date | null]> {
  type: "date-range";
  /**
   * Tên trường cho ngày kết thúc (bắt buộc).
   * Trường name lưu ngày bắt đầu, endName lưu ngày kết thúc (ví dụ: name='startDate', endName='endDate').
   */
  endName: string;
  /** Props tùy biến truyền thêm vào DateRangePicker */
  props?: Partial<DateRangePickerProps>;
}

/**
 * Trường lọc dạng nhóm Checkbox (CheckboxGroup), hỗ trợ cả Client mode & Server mode
 */
export interface SelectCheckboxGroupFilterField<TData = unknown> extends BaseSelectFilterField<(string | number)[]> {
  type: "checkbox-group";
  /** Danh sách các options lựa chọn */
  options?: CheckboxOptionItem<TData>[];
  /** Bật ô tìm kiếm bên trong danh sách checkbox */
  searchable?: boolean;
  /** Chế độ tìm kiếm: 'client' (mặc định) hoặc 'server' */
  searchMode?: CheckboxSearchMode;
  /** Placeholder cho ô tìm kiếm checkbox */
  searchPlaceholder?: string;
  /** Callback kích hoạt khi người dùng gõ tìm kiếm (Server mode) */
  onSearch?: (query: string, ...args: unknown[]) => void | Promise<void>;
  /** Callback khi từ khóa tìm kiếm thay đổi */
  onSearchChange?: (value: string) => void;
  /** Trạng thái đang tải dữ liệu từ server (hiển thị skeleton) */
  isLoading?: boolean;
  /** Giữ lại các checkbox đã chọn khi kết quả tìm kiếm server thay đổi */
  preserveSelected?: boolean;
  /** Phần tử hiển thị ở đáy danh sách (ví dụ: Sentinel / Skeleton cho Infinite Scroll) */
  listFooter?: ReactNode;
  /** Chiều cao tối đa cho danh sách cuộn */
  maxHeight?: number | string;
  /** Số lượng dòng Skeleton hiển thị khi đang tải dữ liệu */
  skeletonCount?: number;
  /** Props tùy biến truyền thêm vào CheckboxGroup */
  props?: Partial<CheckboxGroupProps<TData>>;
}

/**
 * Trường lọc tùy biến giao diện render (Custom)
 */
export interface SelectCustomFilterField<TValue = unknown> extends BaseSelectFilterField<TValue> {
  type: "custom";
  /** Props tùy biến */
  props?: Record<string, unknown>;
  /** Hàm render tùy biến giao diện trường lọc */
  render: (fieldState: { value: TValue | undefined; onChange: (val: TValue) => void }) => ReactNode;
}

/**
 * Discriminated Union tập hợp tất cả các loại trường lọc khả dụng trong Select Menu
 */
export type SelectFilterField<TData = unknown, TValue = unknown> =
  | SelectStringFilterField
  | SelectNumberFilterField
  | SelectDateFilterField
  | SelectDateRangeFilterField
  | SelectCheckboxGroupFilterField<TData>
  | SelectCustomFilterField<TValue>;

export interface SelectConfig {
  /**
   * Đánh dấu trường bắt buộc nhập (hiển thị dấu * đỏ cạnh label)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Trạng thái báo lỗi (viền đỏ)
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Trạng thái đang tải dữ liệu
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiển thị biểu tượng xoay spinner khi đang ở trạng thái loading
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Hiển thị nút xóa nhanh nội dung khi select có giá trị
   * @default false
   */
  isClearable?: boolean;

  /**
   * Mở rộng chiều rộng 100% của container chứa
   * @default true
   */
  isFullWidth?: boolean;
}

export interface BaseSelectProps<TData = unknown, TFilters extends Record<string, unknown> = Record<string, unknown>> {
  /** Ref chuyển tiếp tới root wrapper element */
  ref?: Ref<HTMLDivElement>;

  /** Cấu hình tập trung các cờ trạng thái / tính năng */
  config?: SelectConfig;

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
  /** Vị trí nhãn: top, left, floating. Mặc định 'floating' */
  labelPlacement?: LabelPlacement;
  /** ClassName tùy biến cho nhãn */
  labelClassName?: string;
  /** Văn bản gợi ý khi chưa chọn */
  placeholder?: string;
  /** Văn bản hướng dẫn bên dưới */
  helperText?: ReactNode;
  /** Thông báo lỗi khi không hợp lệ */
  errorMessage?: ReactNode;
  /** Vô hiệu hóa Select */
  isDisabled?: boolean;
  /** Chỉ đọc, không cho phép thay đổi */
  readOnly?: boolean;

  /** Tên trường form HTML để submit */
  name?: string;

  /** Nhãn trợ năng cho screen readers */
  "aria-label"?: string;
  /** ID phần tử làm nhãn trợ năng */
  "aria-labelledby"?: string;

  // ==================== SEARCH & TRIGGER ====================
  /** Cho phép tìm kiếm. Mặc định false */
  searchable?: boolean;
  /** Chế độ tìm kiếm: 'client' (fuzzy search) hoặc 'server' (debounce + API). Mặc định 'client' */
  searchMode?: SelectSearchMode;
  /** Placeholder cho ô tìm kiếm */
  searchPlaceholder?: string;
  /**
   * Trường của option dùng để tìm kiếm ở Client mode (mặc định ['label', 'value']).
   * Hỗ trợ string, mảng hoặc hàm accessor.
   */
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


  // ==================== CLIENT FILTER FUNCTION ====================
  /** Hàm custom predicate lọc options ở chế độ client */
  filterFn?: (option: SelectOptionItem<TData>, query: string, filters: TFilters) => boolean;

  // ==================== EMPTY STATE & LOADING ====================
  /** Trạng thái đang tải dữ liệu danh sách options từ API/query */
  isLoading?: boolean;
  /** Số lượng Skeleton placeholder hiển thị khi options đang tải lần đầu. Mặc định 4 */
  skeletonCount?: number;
  /** Hàm tùy biến render Skeleton placeholder */
  renderSkeleton?: () => ReactNode;
  /** Văn bản hiển thị khi không có dữ liệu */
  emptyText?: ReactNode;
  /** Props tùy biến chuyển tiếp đến component Empty */
  emptyProps?: Partial<EmptyProps>;

  // ==================== ACTIONS & STATES ====================
  /**
   * Có render menu qua Portal lơ lửng (Floating Popover) hay không.
   * - `true` (mặc định): Dropdown popover trôi nổi, bấm trigger để mở menu.
   * - `false`: Chế độ Inline Listbox tĩnh (tương tự DatePicker). Không cần bấm trigger, danh sách options luôn hiển thị cố định ngay bên dưới và ẩn icon Chevron.
   * @default true
   */
  portal?: boolean;
  /** Container để gắn portal menu vào (mặc định document.body, tự động nhận diện `<dialog>` nếu Select nằm trong Modal/Confirm) */
  portalRoot?: HTMLElement | null | React.RefObject<HTMLElement | null>;
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
  /** ClassName cho phần thông báo helper/error text */
  helperClassName?: string;
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
