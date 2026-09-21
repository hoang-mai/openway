import { ReactNode, Ref } from "react";
import type { Placement } from "@floating-ui/react";
import type { LabelPlacement } from "../input/types";

/**
 * Các kích thước khả dụng cho DatePicker & Calendar
 * @values 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 */
export type DatePickerSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Chủ đề màu sắc hiển thị cho DatePicker & Calendar
 * @values 'primary' | 'secondary' | 'neutral' | 'error' | 'success' | 'warning' | 'info'
 */
export type DatePickerColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

/**
 * Mức độ bo tròn góc của DatePicker & Calendar
 * @values 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
 */
export type DatePickerRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Kiểu viền và nền của ô nhập liệu DatePicker
 * @values 'outline' | 'filled' | 'ghost' | 'other'
 */
export type DatePickerVariant = "outline" | "filled" | "ghost" | "other";

/**
 * Chế độ xem hiện tại của bảng lịch
 * - 'days': Xem theo các ngày trong tháng
 * - 'months': Xem danh sách 12 tháng trong năm
 * - 'years': Xem danh sách 12 năm trong thập kỷ
 */
export type CalendarView = "days" | "months" | "years";

/**
 * Kiểu dữ liệu ngày đơn lẻ: Date object, chuỗi định dạng (string), hoặc null
 */
export type DateValue = Date | string | null;

/**
 * Cấu trúc thông tin của một ô ngày trong lưới lịch (`DayGrid`)
 */
export interface CalendarDay {
  /** Đối tượng Date đại diện cho ô ngày */
  date: Date;
  /** Ngày trong tháng (1 - 31) */
  day: number;
  /** Tháng (0 - 11) */
  month: number;
  /** Năm đầy đủ (VD: 2026) */
  year: number;
  /** Thuộc về tháng đang xem hay là ngày lấn sang từ tháng trước/sau */
  isCurrentMonth: boolean;
  /** Có phải là ngày hôm nay không */
  isToday: boolean;
  /** Ngày này có đang được chọn không */
  isSelected: boolean;
  /** Ngày này có bị vô hiệu hóa (disabled) không */
  isDisabled: boolean;
  /** Số thứ tự tuần trong năm (ISO 8601) */
  weekNumber: number;
}

/**
 * Props cho component CalendarHeader (thanh điều hướng lịch)
 */
export interface CalendarHeaderProps {
  /** Tháng/Năm hiện tại đang hiển thị */
  currentMonth: Date;
  /** Chế độ xem hiện tại */
  view: CalendarView;
  /** Callback khi thay đổi chế độ xem (click tiêu đề) */
  onViewChange: (view: CalendarView) => void;
  /** Callback khi click nút chuyển về tháng trước */
  onPrevMonth: () => void;
  /** Callback khi click nút chuyển sang tháng sau */
  onNextMonth: () => void;
  /** Callback khi click nút chuyển về năm trước */
  onPrevYear: () => void;
  /** Callback khi click nút chuyển sang năm sau */
  onNextYear: () => void;
  /** Callback khi click nút chuyển về thập kỷ trước */
  onPrevDecade?: () => void;
  /** Callback khi click nút chuyển sang thập kỷ sau */
  onNextDecade?: () => void;
  /** Kích cỡ hiển thị */
  size?: DatePickerSize;
  /** Màu sắc chủ đề */
  color?: DatePickerColor;
  /** Hiển thị nút điều hướng tháng kế bên */
  showMonthButtons?: boolean;
}

/**
 * Props cho component DayGrid (ma trận 42 ô ngày)
 */
export interface DayGridProps {
  /** Mảng 42 ô ngày đã được sinh sẵn */
  days: CalendarDay[];
  /** Callback khi người dùng chọn một ngày */
  onSelectDate: (date: Date) => void;
  /** Kích cỡ ô ngày */
  size?: DatePickerSize;
  /** Màu sắc chủ đề */
  color?: DatePickerColor;
  /** Độ bo góc của ô ngày */
  radius?: DatePickerRadius;
  /** Ngày đầu tuần (0: Chủ Nhật, 1: Thứ Hai) */
  firstDayOfWeek?: 0 | 1;
  /** Hiển thị cột số thứ tự tuần (ISO week) */
  showWeekNumbers?: boolean;
}

/**
 * Props cho component MonthGrid (lưới chọn 12 tháng)
 */
export interface MonthGridProps {
  /** Tháng/Năm hiện tại */
  currentMonth: Date;
  /** Ngày đang được chọn */
  selectedDate?: Date | null;
  /** Callback khi click chọn một tháng (0 - 11) */
  onSelectMonth: (monthIndex: number) => void;
  /** Kích cỡ hiển thị */
  size?: DatePickerSize;
  /** Màu sắc chủ đề */
  color?: DatePickerColor;
  /** Độ bo góc của ô tháng */
  radius?: DatePickerRadius;
}

/**
 * Props cho component YearGrid (lưới chọn năm theo thập kỷ)
 */
export interface YearGridProps {
  /** Tháng/Năm hiện tại */
  currentMonth: Date;
  /** Ngày đang được chọn */
  selectedDate?: Date | null;
  /** Callback khi click chọn năm */
  onSelectYear: (year: number) => void;
  /** Kích cỡ hiển thị */
  size?: DatePickerSize;
  /** Màu sắc chủ đề */
  color?: DatePickerColor;
  /** Độ bo góc của ô năm */
  radius?: DatePickerRadius;
}

/**
 * Props cho component Calendar (Lịch chọn ngày đơn)
 */
export interface CalendarProps {
  /**
   * Giá trị ngày đang được chọn (đối tượng Date hoặc null)
   */
  value?: Date | null;

  /**
   * Callback khi chọn ngày (trả về Date object)
   */
  onChange?: (date: Date) => void;

  /**
   * Chế độ xem hiện tại ('days' | 'months' | 'years') (Controlled)
   */
  view?: CalendarView;

  /**
   * Chế độ xem mặc định ban đầu ('days' | 'months' | 'years') (Uncontrolled)
   * @default 'days'
   */
  defaultView?: CalendarView;

  /**
   * Callback khi thay đổi chế độ xem
   */
  onViewChange?: (view: CalendarView) => void;

  /**
   * Giới hạn ngày nhỏ nhất cho phép chọn
   */
  minDate?: Date | string;

  /**
   * Giới hạn ngày lớn nhất cho phép chọn
   */
  maxDate?: Date | string;

  /**
   * Hàm kiểm tra ngày có bị vô hiệu hóa không
   */
  isDateDisabled?: (date: Date) => boolean;

  /**
   * Ngày bắt đầu tuần (0: Chủ Nhật, 1: Thứ Hai)
   * @default 1
   */
  firstDayOfWeek?: 0 | 1;

  /**
   * Hiển thị cột số thứ tự tuần (ISO week number)
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Hiển thị thanh Tab chuyển đổi chế độ chọn Ngày / Tháng / Năm
   * @default false
   */
  showViewTabs?: boolean;

  /**
   * Danh sách các tab hiển thị khi bật `showViewTabs`
   * @default ['days', 'months', 'years']
   */
  viewTabs?: CalendarView[];
  size?: DatePickerSize;

  /**
   * Chủ đề màu sắc
   * @default 'primary'
   */
  color?: DatePickerColor;

  /**
   * Độ bo góc
   */
  radius?: DatePickerRadius;

  /**
   * Class CSS bổ sung cho container lịch
   */
  className?: string;

  /**
   * Hiển thị viền ngoài của Calendar
   * @default true
   */
  bordered?: boolean;
}

export interface DatePickerConfig {
  /**
   * Bắt buộc chọn ngày trước khi submit (hiển thị dấu sao đỏ)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Bật trạng thái lỗi không hợp lệ (hiển thị viền lỗi đỏ)
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Đang trong trạng thái tải dữ liệu (hiển thị spinner xoay)
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiện spinner khi isLoading
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Cho phép nút xóa nhanh ngày đã chọn (nút X)
   * @default true
   */
  isClearable?: boolean;

  /**
   * Chiếm toàn bộ 100% chiều rộng container
   * @default true
   */
  isFullWidth?: boolean;

  /**
   * Hiển thị số tuần trong lịch
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Hiển thị thanh Tab chuyển đổi chế độ chọn Ngày / Tháng / Năm
   * @default false
   */
  showViewTabs?: boolean;

  /**
   * Tự động đóng popover sau khi chọn ngày thành công
   * @default true
   */
  closeOnSelect?: boolean;
}

/**
 * Props cho component DatePicker (Input chọn ngày đơn)
 */
export interface DatePickerProps {
  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: DatePickerConfig;

  /**
   * Ref chuyển tiếp đến input element
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Giá trị ngày đang được chọn (Controlled)
   */
  value?: DateValue;

  /**
   * Giá trị ngày mặc định ban đầu (Uncontrolled)
   */
  defaultValue?: DateValue;

  /**
   * Callback kích hoạt khi thay đổi ngày (trả về chuỗi ngày đã được định dạng theo `format`, hoặc `null` khi xóa)
   */
  onChange?: (date: string | null) => void;

  /**
   * Định dạng chuỗi ngày tháng lưu trữ và trả về (Value / Data format)
   * Sử dụng chung cho cả dữ liệu đầu vào (value, defaultValue) và dữ liệu đầu ra (onChange)
   * @default 'DD/MM/YYYY'
   */
  format?: string;

  /**
   * Định dạng chuỗi hiển thị trong ô input cho người dùng xem (UI Display format)
   * @default Tự động theo `format` hoặc theo chế độ xem: 'DD/MM/YYYY' (days), 'MM/YYYY' (months), 'YYYY' (years)
   */
  displayFormat?: string;

  /**
   * Chế độ xem mặc định ('days' | 'months' | 'years')
   * @default 'days'
   */
  defaultView?: CalendarView;

  /**
   * Ngày bắt đầu tuần: 0 (Chủ Nhật) hoặc 1 (Thứ Hai)
   * @default 1
   */
  firstDayOfWeek?: 0 | 1;

  /**
   * Giới hạn ngày nhỏ nhất cho phép chọn
   */
  minDate?: Date | string;

  /**
   * Giới hạn ngày lớn nhất cho phép chọn
   */
  maxDate?: Date | string;

  /**
   * Hàm kiểm tra ngày bị vô hiệu hóa
   */
  isDateDisabled?: (date: Date) => boolean;

  /**
   * Kích cỡ component
   * @default 'md'
   */
  size?: DatePickerSize;

  /**
   * Biến thể viền/nền của ô input
   * @default 'outline'
   */
  variant?: DatePickerVariant;

  /**
   * Chủ đề màu sắc
   * @default 'primary'
   */
  color?: DatePickerColor;

  /**
   * Độ bo góc
   */
  radius?: DatePickerRadius;

  /**
   * Danh sách các tab hiển thị
   * @default ['days', 'months', 'years']
   */
  viewTabs?: CalendarView[];

  /**
   * Chế độ tab chọn hiện tại (Controlled)
   */
  view?: CalendarView;

  /**
   * Callback khi thay đổi chế độ tab chọn
   */
  onViewChange?: (view: CalendarView) => void;

  // Form Field props
  /**
   * Nhãn mô tả trường nhập liệu
   */
  label?: ReactNode;

  /**
   * Vị trí hiển thị của label ('top' | 'left' | 'floating')
   * @default 'floating'
   */
  labelPlacement?: LabelPlacement;

  /**
   * Văn bản gợi ý mờ hiển thị khi ô input trống
   */
  placeholder?: string;

  /**
   * Văn bản trợ giúp bên dưới input
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi (kích hoạt giao diện trạng thái lỗi)
   */
  errorMessage?: ReactNode;

  // Form & a11y props
  /**
   * Tên trường form (form field name)
   */
  name?: string;

  /**
   * Định danh duy nhất cho input element
   */
  id?: string;

  /**
   * Cấu hình gợi ý tự động điền form của trình duyệt
   */
  autoComplete?: string;

  /**
   * Vô hiệu hóa toàn bộ tương tác và làm mờ giao diện
   * @default false
   */
  disabled?: boolean;

  /**
   * Chế độ chỉ đọc (không mở popover và không cho chỉnh sửa)
   * @default false
   */
  readOnly?: boolean;

  /**
   * Callback kích hoạt khi nhấn nút xóa nhanh
   */
  onClear?: () => void;

  // Popover props
  /**
   * Vị trí hiển thị của popover lịch so với ô input
   * @default 'bottom-start'
   */
  placement?: Placement;

  // ClassNames
  /**
   * Class CSS tùy biến cho thẻ input
   */
  className?: string;

  /**
   * Class CSS cho container bọc ngoài cùng (bao gồm cả label và helper text)
   */
  wrapperClassName?: string;

  /**
   * Class CSS cho container bọc trực tiếp ô input
   */
  inputWrapperClassName?: string;

  /**
   * Class CSS tùy biến cho label
   */
  labelClassName?: string;

  /**
   * Class CSS cho phần văn bản trợ giúp / lỗi
   */
  helperClassName?: string;

  /**
   * Class CSS cho popover chứa lịch
   */
  popoverClassName?: string;

  /**
   * Có render popover thông qua Portal (gắn vào document.body) hay không
   * @default true
   */
  portal?: boolean;

  /**
   * Phần tử DOM hoặc Ref dùng làm root container cho FloatingPortal.
   * Mặc định tự động gắn vào dialog của Modal hoặc Confirm nếu đang mở bên trong Modal/Confirm.
   */
  portalRoot?: HTMLElement | null | React.RefObject<HTMLElement | null>;
}
