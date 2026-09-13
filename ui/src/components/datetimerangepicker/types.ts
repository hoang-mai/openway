import { ReactNode, Ref } from "react";
import type { Placement } from "@floating-ui/react";
import type { LabelPlacement } from "../input/types";
import type { CalendarView, LocaleConfig } from "../datepicker/types";
import type { TimeValue } from "../timepicker/types";
import type { DateTimeValue } from "../datetimepicker/types";

export type DateTimeRangePickerSize = "xs" | "sm" | "md" | "lg" | "xl";

export type DateTimeRangePickerColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

export type DateTimeRangePickerRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export type DateTimeRangePickerVariant = "outline" | "filled" | "ghost" | "other";

export type DateTimeRangePickerLayout = "side-by-side" | "stacked";

export type DateTimeRange = [Date | null, Date | null];

export type DateTimeRangeValue = [DateTimeValue, DateTimeValue] | null;

/**
 * Nhóm cấu hình tập trung các cờ trạng thái / tính năng của DateTimeRangePicker
 */
export interface DateTimeRangePickerConfig {
  /**
   * Bắt buộc chọn khoảng ngày giờ trước khi submit (hiển thị dấu sao đỏ)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Bật trạng thái lỗi không hợp lệ (hiển thị viền lỗi đỏ)
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Đang trong trạng thái tải dữ liệu
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiện spinner khi isLoading
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Cho phép nút xóa nhanh khoảng ngày giờ đã chọn (nút X)
   * @default true
   */
  isClearable?: boolean;

  /**
   * Chiếm toàn bộ 100% chiều rộng container
   * @default true
   */
  isFullWidth?: boolean;

  /**
   * Tự động đóng popover sau khi chọn xong cả 2 mốc
   * @default false
   */
  closeOnSelect?: boolean;

  /**
   * Hiển thị số tuần trong lịch
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Hiển thị thanh Tab chuyển đổi chế độ xem Ngày / Tháng / Năm
   * @default false
   */
  showViewTabs?: boolean;
}

/**
 * Props cho component DateTimeRangePicker
 */
export interface DateTimeRangePickerProps {
  /**
   * Ref chuyển tiếp đến thẻ <input> HTML bên dưới
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: DateTimeRangePickerConfig;

  /**
   * Giá trị khoảng ngày giờ đang được chọn: [Start, End] (Controlled)
   */
  value?: DateTimeRangeValue;

  /**
   * Giá trị khoảng ngày giờ mặc định ban đầu: [Start, End] (Uncontrolled)
   */
  defaultValue?: DateTimeRangeValue;

  /**
   * Callback khi thay đổi khoảng ngày giờ (trả về [string, string] theo format hoặc null khi xóa)
   */
  onChange?: (range: [string, string] | null) => void;

  /**
   * Định dạng chuỗi ngày giờ lưu trữ và trả về (Value / Data format)
   * @default 'DD/MM/YYYY HH:mm:ss'
   */
  format?: string;

  /**
   * Định dạng chuỗi hiển thị trực quan trong ô input (Display format)
   */
  displayFormat?: string;

  /**
   * Ký tự phân cách giữa Start DateTime và End DateTime
   * @default ' - '
   */
  separator?: string;

  /**
   * Nhãn tiêu đề mốc bắt đầu
   * @default 'Start time'
   */
  startLabel?: string;

  /**
   * Nhãn tiêu đề mốc kết thúc
   * @default 'End time'
   */
  endLabel?: string;

  /**
   * Bố cục hiển thị trong bảng chọn: 'side-by-side' (ngang) hoặc 'stacked' (dọc)
   * @default 'side-by-side'
   */
  layout?: DateTimeRangePickerLayout;

  /**
   * Cấu hình ngôn ngữ ('vi' | 'en' hoặc đối tượng LocaleConfig)
   * @default 'vi'
   */
  locale?: "vi" | "en" | LocaleConfig;

  // ==================== Calendar Props ====================
  /**
   * Chế độ xem mặc định ban đầu của lịch ('days' | 'months' | 'years')
   * @default 'days'
   */
  defaultView?: CalendarView;

  /**
   * Ngày đầu tuần (0: Chủ Nhật, 1: Thứ Hai)
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
   * Danh sách tab xem cho lịch
   * @default ['days', 'months', 'years']
   */
  viewTabs?: CalendarView[];

  // ==================== TimeView Props ====================
  /**
   * Bật chế độ 12 giờ kèm cột AM / PM
   * @default false
   */
  use12Hours?: boolean;

  /**
   * Hiển thị cột chọn giây
   * @default true
   */
  showSeconds?: boolean;

  /**
   * Bước nhảy cho cột Giờ
   * @default 1
   */
  hourStep?: number;

  /**
   * Bước nhảy cho cột Phút
   * @default 1
   */
  minuteStep?: number;

  /**
   * Bước nhảy cho cột Giây
   * @default 1
   */
  secondStep?: number;

  /**
   * Giới hạn thời gian nhỏ nhất cho phép chọn
   */
  minTime?: TimeValue;

  /**
   * Giới hạn thời gian lớn nhất cho phép chọn
   */
  maxTime?: TimeValue;

  /**
   * Hàm trả về danh sách giờ bị vô hiệu hóa
   */
  disabledHours?: () => number[];

  /**
   * Hàm trả về danh sách phút bị vô hiệu hóa
   */
  disabledMinutes?: (hour: number) => number[];

  /**
   * Hàm trả về danh sách giây bị vô hiệu hóa
   */
  disabledSeconds?: (hour: number, minute: number) => number[];

  // ==================== Appearance & Styles ====================
  /**
   * Kích cỡ ô nhập liệu và popover
   * @default 'md'
   */
  size?: DateTimeRangePickerSize;

  /**
   * Biến thể viền/nền của ô nhập
   * @default 'outline'
   */
  variant?: DateTimeRangePickerVariant;

  /**
   * Chủ đề màu sắc theo Design System
   * @default 'primary'
   */
  color?: DateTimeRangePickerColor;

  /**
   * Độ bo góc của ô nhập và popover
   */
  radius?: DateTimeRangePickerRadius;

  // ==================== Form Field & Layout ====================
  /**
   * Nhãn tiêu đề hiển thị
   */
  label?: ReactNode;

  /**
   * Vị trí nhãn ('top' | 'left' | 'floating')
   * @default 'floating'
   */
  labelPlacement?: LabelPlacement;

  /**
   * Văn bản giữ chỗ khi ô input rỗng
   */
  placeholder?: string;

  /**
   * Văn bản giữ chỗ riêng cho Start và End
   */
  placeholders?: [string, string];

  /**
   * Đoạn văn bản hướng dẫn/trợ giúp
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi
   */
  errorMessage?: ReactNode;

  /**
   * Thuộc tính name của thẻ HTML input
   */
  name?: string;

  /**
   * ID tùy chỉnh cho ô input
   */
  id?: string;

  /**
   * Thuộc tính autocomplete
   */
  autoComplete?: string;

  /**
   * Khóa toàn bộ tương tác
   * @default false
   */
  disabled?: boolean;

  /**
   * Chế độ chỉ đọc
   * @default false
   */
  readOnly?: boolean;

  /**
   * Callback khi người dùng nhấn nút xóa (nút X)
   */
  onClear?: () => void;

  /**
   * Vị trí mở popover chọn ngày giờ (Floating UI)
   * @default 'bottom-start'
   */
  placement?: Placement;

  // ==================== ClassNames ====================
  className?: string;
  wrapperClassName?: string;
  inputWrapperClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
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
