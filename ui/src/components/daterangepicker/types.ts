import { ReactNode, Ref } from "react";
import type { Placement } from "@floating-ui/react";
import type { LabelPlacement } from "../input/types";
import type { CalendarView, DateValue, LocaleConfig } from "../datepicker/types";

/**
 * Các kích thước khả dụng cho DateRangePicker & DateRangeCalendar
 * @values 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 */
export type DateRangePickerSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Chủ đề màu sắc hiển thị cho DateRangePicker & DateRangeCalendar
 * @values 'primary' | 'secondary' | 'neutral' | 'error' | 'success' | 'warning' | 'info'
 */
export type DateRangePickerColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

/**
 * Mức độ bo tròn góc của DateRangePicker & DateRangeCalendar
 * @values 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
 */
export type DateRangePickerRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Kiểu viền và nền của ô nhập liệu DateRangePicker
 * @values 'outline' | 'filled' | 'ghost' | 'other'
 */
export type DateRangePickerVariant = "outline" | "filled" | "ghost" | "other";

/**
 * Kiểu giá trị khoảng ngày truyền vào hoặc phát ra: mảng 2 phần tử [DateValue, DateValue]
 */
export type DateRangeValue = [DateValue, DateValue];

/**
 * Kiểu khoảng ngày dưới dạng 2 đối tượng Date chuẩn: [Date | null, Date | null]
 */
export type DateRange = [Date | null, Date | null];

/**
 * Cấu trúc thông tin của một ô ngày trong lưới lịch chọn khoảng (`DateRangeDayGrid`)
 */
export interface DateRangeCalendarDay {
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
  /** Ô ngày này có đang được chọn làm mốc bắt đầu hoặc kết thúc không */
  isSelected: boolean;
  /** Ngày này có bị vô hiệu hóa (disabled) không */
  isDisabled: boolean;
  /** Có phải là ngày bắt đầu khoảng (start date) không */
  isRangeStart: boolean;
  /** Có phải là ngày kết thúc khoảng (end date) không */
  isRangeEnd: boolean;
  /** Có nằm ở giữa khoảng ngày đã chọn hay không */
  isInRange: boolean;
  /** Có nằm trong khoảng ngày đang rê chuột xem trước (hover preview) hay không */
  isHoveredRange: boolean;
  /** Số thứ tự tuần trong năm (ISO 8601) */
  weekNumber: number;
}

/**
 * Props cho component DateRangeHeader (thanh điều hướng của lịch chọn khoảng ngày)
 */
export interface DateRangeHeaderProps {
  /** Tháng/Năm hiển thị cho bảng lịch thứ nhất (bên trái) */
  month1: Date;
  /** Tháng/Năm hiển thị cho bảng lịch thứ hai (bên phải) */
  month2: Date;
  /** Chế độ xem hiện tại */
  view: CalendarView;
  /** Callback khi thay đổi chế độ xem */
  onViewChange: (view: CalendarView) => void;
  /** Callback lùi 1 tháng */
  onPrevMonth: () => void;
  /** Callback tiến 1 tháng */
  onNextMonth: () => void;
  /** Callback lùi 1 năm */
  onPrevYear: () => void;
  /** Callback tiến 1 năm */
  onNextYear: () => void;
  /** Callback lùi 1 thập kỷ (10 năm) */
  onPrevDecade?: () => void;
  /** Callback tiến 1 thập kỷ (10 năm) */
  onNextDecade?: () => void;
  /** Kích cỡ nút và tiêu đề */
  size?: DateRangePickerSize;
  /** Màu sắc chủ đề */
  color?: DateRangePickerColor;
  /** Cấu hình ngôn ngữ */
  locale?: "vi" | "en" | LocaleConfig;
}

/**
 * Props cho component DateRangeDayGrid (lưới hiển thị 42 ô ngày cho lịch chọn khoảng)
 */
export interface DateRangeDayGridProps {
  /** Danh sách 42 ngày đã được tính toán trạng thái */
  days: DateRangeCalendarDay[];
  /** Callback khi bấm chọn một ngày */
  onSelectDate: (date: Date) => void;
  /** Callback khi rê chuột qua một ô ngày (để tạo preview dải ngày) */
  onHoverDate?: (date: Date | null) => void;
  /** Kích cỡ ô ngày */
  size?: DateRangePickerSize;
  /** Màu sắc chủ đề */
  color?: DateRangePickerColor;
  /** Độ bo góc của ô ngày */
  radius?: DateRangePickerRadius;
  /** Cấu hình ngôn ngữ */
  locale?: "vi" | "en" | LocaleConfig;
  /** Ngày đầu tuần (0: Chủ Nhật, 1: Thứ Hai) */
  firstDayOfWeek?: 0 | 1;
  /** Hiển thị cột số thứ tự tuần */
  showWeekNumbers?: boolean;
}

/**
 * Props cho component DateRangeMonthGrid (lưới chọn khoảng tháng trong năm)
 */
export interface DateRangeMonthGridProps {
  /** Tháng/Năm mốc đang hiển thị */
  currentMonth: Date;
  /** Callback khi chọn một tháng */
  onSelectMonth: (monthIndex: number) => void;
  /** Kích cỡ nút tháng */
  size?: DateRangePickerSize;
  /** Màu sắc chủ đề */
  color?: DateRangePickerColor;
  /** Độ bo góc của nút tháng */
  radius?: DateRangePickerRadius;
  /** Cấu hình ngôn ngữ */
  locale?: "vi" | "en" | LocaleConfig;
  /** Ngày bắt đầu khoảng (nếu có) */
  rangeStart?: Date | null;
  /** Ngày kết thúc khoảng (nếu có) */
  rangeEnd?: Date | null;
  /** Ngày đang hover xem trước (nếu có) */
  hoveredDate?: Date | null;
  /** Callback khi rê chuột qua tháng */
  onHoverMonth?: (date: Date | null) => void;
}

/**
 * Props cho component DateRangeYearGrid (lưới chọn khoảng năm trong thập kỷ)
 */
export interface DateRangeYearGridProps {
  /** Tháng/Năm mốc đang hiển thị */
  currentMonth: Date;
  /** Callback khi chọn một năm */
  onSelectYear: (year: number) => void;
  /** Kích cỡ nút năm */
  size?: DateRangePickerSize;
  /** Màu sắc chủ đề */
  color?: DateRangePickerColor;
  /** Độ bo góc của nút năm */
  radius?: DateRangePickerRadius;
  /** Ngày bắt đầu khoảng (nếu có) */
  rangeStart?: Date | null;
  /** Ngày kết thúc khoảng (nếu có) */
  rangeEnd?: Date | null;
  /** Ngày đang hover xem trước (nếu có) */
  hoveredDate?: Date | null;
  /** Callback khi rê chuột qua năm */
  onHoverYear?: (date: Date | null) => void;
}

/**
 * Props cho component DateRangeCalendar (Lịch chọn khoảng ngày dạng tĩnh / Standalone)
 */
export interface DateRangeCalendarProps {
  /** Khoảng ngày đang được chọn: [startDate, endDate] (Controlled) */
  value?: DateRange;
  /** Callback khi chọn xong khoảng ngày hoặc đổi ngày */
  onChange?: (range: DateRange) => void;
  /** Chế độ xem hiện tại của lịch: 'days' | 'months' | 'years' (Controlled) */
  view?: CalendarView;
  /** Chế độ xem mặc định ban đầu (Uncontrolled) */
  defaultView?: CalendarView;
  /** Callback khi người dùng chuyển đổi chế độ xem */
  onViewChange?: (view: CalendarView) => void;
  /** Giới hạn ngày nhỏ nhất cho phép chọn */
  minDate?: Date | string;
  /** Giới hạn ngày lớn nhất cho phép chọn */
  maxDate?: Date | string;
  /** Hàm callback tùy biến kiểm tra ngày cụ thể có bị vô hiệu hóa không */
  isDateDisabled?: (date: Date) => boolean;
  /** Ngôn ngữ hiển thị ('vi' | 'en' hoặc cấu hình LocaleConfig) */
  locale?: "vi" | "en" | LocaleConfig;
  /** Ngày bắt đầu tuần: 0 (Chủ Nhật) hoặc 1 (Thứ Hai) */
  firstDayOfWeek?: 0 | 1;
  /** Hiển thị cột số thứ tự tuần trong năm (ISO 8601) */
  showWeekNumbers?: boolean;
  /** Hiển thị thanh tab chuyển đổi chế độ xem (Ngày / Tháng / Năm) */
  showViewTabs?: boolean;
  /** Danh sách các tab hiển thị trên thanh tab */
  viewTabs?: CalendarView[];
  /** Kích cỡ hiển thị */
  size?: DateRangePickerSize;
  /** Chủ đề màu sắc theo Design System */
  color?: DateRangePickerColor;
  /** Độ bo tròn góc */
  radius?: DateRangePickerRadius;
  /** Custom CSS class cho container */
  className?: string;
  /** Hiển thị viền ngoài của Calendar @default true */
  bordered?: boolean;
}

/**
 * Cấu hình tập trung các cờ tính năng / trạng thái cho DateRangePicker
 */
export interface DateRangePickerConfig {
  /**
   * Bắt buộc chọn khoảng ngày trước khi submit (hiển thị dấu sao đỏ `*` và `aria-required="true"`)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Bật trạng thái lỗi không hợp lệ (hiển thị viền lỗi đỏ và `aria-invalid="true"`)
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Đang trong trạng thái tải dữ liệu (khóa tương tác, bật `aria-busy="true"`)
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiển thị biểu tượng xoay spinner khi `isLoading={true}`
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Cho phép nút xóa nhanh khoảng ngày đã chọn (nút X)
   * @default true
   */
  isClearable?: boolean;

  /**
   * Mở rộng chiếm toàn bộ 100% chiều ngang container cha
   * @default true
   */
  isFullWidth?: boolean;

  /**
   * Hiển thị số thứ tự tuần trong cả 2 bảng lịch
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Hiển thị thanh Tab chuyển đổi chế độ chọn Ngày / Tháng / Năm
   * @default false
   */
  showViewTabs?: boolean;

  /**
   * Tự động đóng popover sau khi chọn xong ngày kết thúc
   * @default true
   */
  closeOnSelect?: boolean;
}

/**
 * Props hoàn chỉnh cho component DateRangePicker
 */
export interface DateRangePickerProps {
  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: DateRangePickerConfig;

  /**
   * Ref chuyển tiếp đến thẻ `<input>` HTML bên dưới
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Khoảng ngày đang được chọn: mảng 2 phần tử `[startDate, endDate]` (Controlled)
   */
  value?: DateRangeValue | null;

  /**
   * Khoảng ngày mặc định ban đầu: `[startDate, endDate]` (Uncontrolled)
   */
  defaultValue?: DateRangeValue;

  /**
   * Callback kích hoạt khi thay đổi khoảng ngày.
   * Trả về mảng 2 chuỗi đã định dạng theo prop `format`: `[startStr, endStr]`, hoặc `null` khi xóa.
   */
  onChange?: (range: [string, string] | null) => void;

  /**
   * Chuỗi ký tự phân cách giữa ngày bắt đầu và ngày kết thúc trên ô input
   * @default " - "
   */
  separator?: string;

  /**
   * Định dạng dữ liệu chuẩn hóa dùng chung cho cả đầu vào (`value`/`defaultValue`) và đầu ra (`onChange`)
   * @default "DD/MM/YYYY"
   */
  format?: string;

  /**
   * Định dạng chuỗi hiển thị trực quan trong ô input cho người xem.
   * Tự động thích ứng theo Tab Ngày (`displayFormat || format`), Tháng (`MM-YYYY`/`MM/YYYY`), Năm (`YYYY`).
   */
  displayFormat?: string;

  /**
   * Chế độ xem mặc định ban đầu khi mở lịch
   * @default "days"
   */
  defaultView?: CalendarView;

  /**
   * Ngôn ngữ hiển thị cho các bảng lịch ('vi' | 'en' hoặc cấu hình LocaleConfig tùy biến)
   * @default "en"
   */
  locale?: "vi" | "en" | LocaleConfig;

  /**
   * Ngày bắt đầu tuần: 0 (Chủ Nhật) hoặc 1 (Thứ Hai)
   * @default 1
   */
  firstDayOfWeek?: 0 | 1;

  /**
   * Giới hạn ngày nhỏ nhất cho phép chọn (các ngày trước minDate sẽ bị disable)
   */
  minDate?: Date | string;

  /**
   * Giới hạn ngày lớn nhất cho phép chọn (các ngày sau maxDate sẽ bị disable)
   */
  maxDate?: Date | string;

  /**
   * Hàm callback tùy biến kiểm tra xem một ngày cụ thể có bị vô hiệu hóa không
   */
  isDateDisabled?: (date: Date) => boolean;

  /**
   * Kích cỡ của ô nhập liệu và các bảng lịch
   * @default "md"
   */
  size?: DateRangePickerSize;

  /**
   * Biến thể giao diện của khung nhập liệu
   * @default "outline"
   */
  variant?: DateRangePickerVariant;

  /**
   * Chủ đề màu sắc theo Design System
   * @default "primary"
   */
  color?: DateRangePickerColor;

  /**
   * Độ bo góc của ô nhập liệu và popover lịch
   */
  radius?: DateRangePickerRadius;

  /**
   * Danh sách các tab hiển thị trên thanh tab khi `config.showViewTabs = true`
   * @default ['days', 'months', 'years']
   */
  viewTabs?: CalendarView[];

  /**
   * Chế độ xem đang kích hoạt (Controlled)
   */
  view?: CalendarView;

  /**
   * Callback kích hoạt khi người dùng chuyển tab chế độ xem
   */
  onViewChange?: (view: CalendarView) => void;

  /**
   * Nhãn tiêu đề hiển thị cho ô nhập liệu
   */
  label?: ReactNode;

  /**
   * Vị trí hiển thị của nhãn tiêu đề
   * @default "floating"
   */
  labelPlacement?: LabelPlacement;

  /**
   * Văn bản giữ chỗ khi chưa chọn khoảng ngày (mặc định hiển thị theo format)
   */
  placeholder?: string;

  /**
   * Đoạn văn bản hướng dẫn / trợ giúp hiển thị bên dưới ô nhập liệu
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi (khi có giá trị sẽ tự động bật viền đỏ và hiệu ứng xuất hiện)
   */
  errorMessage?: ReactNode;

  /**
   * Thuộc tính name của thẻ HTML input ngầm định
   */
  name?: string;

  /**
   * Thuộc tính id của ô nhập liệu
   */
  id?: string;

  /**
   * Thuộc tính autocomplete của thẻ input
   */
  autoComplete?: string;

  /**
   * Vô hiệu hóa toàn bộ tương tác của ô nhập liệu
   * @default false
   */
  disabled?: boolean;

  /**
   * Đặt ô nhập liệu ở chế độ chỉ đọc (không mở popover lịch)
   * @default false
   */
  readOnly?: boolean;

  /**
   * Callback được gọi khi bấm nút xóa nhanh khoảng ngày
   */
  onClear?: () => void;

  /**
   * Vị trí neo mở popover lịch so với ô input (Floating UI)
   * @default "bottom-start"
   */
  placement?: Placement;

  /**
   * CSS class bổ sung cho toàn bộ component container
   */
  className?: string;

  /**
   * CSS class bổ sung cho wrapper ngoài cùng
   */
  wrapperClassName?: string;

  /**
   * CSS class bổ sung cho khung input chính
   */
  inputWrapperClassName?: string;

  /**
   * CSS class bổ sung cho phần nhãn (label)
   */
  labelClassName?: string;

  /**
   * CSS class bổ sung cho phần văn bản trợ giúp (helper/error text)
   */
  helperClassName?: string;

  /**
   * CSS class bổ sung cho khung popover lịch
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
