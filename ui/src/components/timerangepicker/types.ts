import { ReactNode, Ref } from "react";
import type { Placement } from "@floating-ui/react";
import type { LabelPlacement } from "../input/types";
import type {
  TimePickerSize,
  TimePickerColor,
  TimePickerRadius,
  TimePickerVariant,
  TimeValue,
} from "../timepicker/types";

/**
 * Re-export các types cơ bản từ timepicker để tái sử dụng
 */
export type TimeRangePickerSize = TimePickerSize;
export type TimeRangePickerColor = TimePickerColor;
export type TimeRangePickerRadius = TimePickerRadius;
export type TimeRangePickerVariant = TimePickerVariant;

/**
 * Giá trị khoảng thời gian đầu vào / đầu ra linh hoạt dạng mảng 2 phần tử `[Start, End]`
 */
export type TimeRangeValue = [TimeValue, TimeValue];

/**
 * Giá trị khoảng thời gian dạng mảng 2 đối tượng `Date`
 */
export type TimeRange = [Date | null, Date | null];

/**
 * Cấu hình tập trung các cờ tính năng cho TimeRangePicker
 */
export interface TimeRangePickerConfig {
  /** Đánh dấu trường bắt buộc nhập (hiển thị dấu sao đỏ *) */
  isRequired?: boolean;
  /** Bật trạng thái cảnh báo lỗi (viền đỏ) */
  isInvalid?: boolean;
  /** Đang tải dữ liệu, khóa tương tác */
  isLoading?: boolean;
  /** Hiển thị biểu tượng xoay spinner khi đang tải */
  showSpinner?: boolean;
  /** Hiển thị nút xóa nhanh khoảng thời gian đã chọn */
  isClearable?: boolean;
  /** Mở rộng chiều ngang 100% container cha */
  isFullWidth?: boolean;
  /** Tự động đóng popover sau khi người dùng chọn xong cả 2 mốc */
  closeOnSelect?: boolean;
}

/**
 * Props cho component TimeRangePicker (ô chọn khoảng thời gian Start - End)
 */
export interface TimeRangePickerProps {
  /** Cấu hình tập trung các cờ tính năng / trạng thái */
  config?: TimeRangePickerConfig;
  /** Ref chuyển tiếp tới thẻ HTML `<input>` */
  ref?: Ref<HTMLInputElement>;
  /** Giá trị khoảng thời gian đang chọn (Controlled) */
  value?: TimeRangeValue;
  /** Giá trị khoảng thời gian mặc định ban đầu (Uncontrolled) */
  defaultValue?: TimeRangeValue;
  /** Callback khi thay đổi khoảng thời gian (trả về mảng 2 chuỗi định dạng hoặc null khi xóa) */
  onChange?: (range: [string, string] | null) => void;
  /** Định dạng dữ liệu chính dùng cho cả input và output (mặc định 'HH:mm:ss') */
  format?: string;
  /** Định dạng chuỗi hiển thị trực quan trên ô input (tùy chọn) */
  displayFormat?: string;
  /** Ký tự hoặc chuỗi phân cách giữa Start Time và End Time (mặc định ' - ') */
  separator?: string;
  /** Nhãn tiêu đề cho bảng chọn giờ bắt đầu (mặc định 'Start time') */
  startLabel?: string;
  /** Nhãn tiêu đề cho bảng chọn giờ kết thúc (mặc định 'End time') */
  endLabel?: string;
  /** Bật chế độ 12 giờ kèm cột AM / PM */
  use12Hours?: boolean;
  /** Hiển thị cột chọn giây */
  showSeconds?: boolean;
  /** Bước nhảy cho cột Giờ (mặc định 1) */
  hourStep?: number;
  /** Bước nhảy cho cột Phút (mặc định 1) */
  minuteStep?: number;
  /** Bước nhảy cho cột Giây (mặc định 1) */
  secondStep?: number;
  /** Thời gian nhỏ nhất cho phép chọn */
  minTime?: TimeValue;
  /** Thời gian lớn nhất cho phép chọn */
  maxTime?: TimeValue;
  /** Hàm xác định danh sách giờ bị vô hiệu hóa */
  disabledHours?: () => number[];
  /** Hàm xác định danh sách phút bị vô hiệu hóa */
  disabledMinutes?: (selectedHour: number) => number[];
  /** Hàm xác định danh sách giây bị vô hiệu hóa */
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  /** Kích thước ô nhập liệu */
  size?: TimeRangePickerSize;
  /** Biến thể viền/nền của ô nhập */
  variant?: TimeRangePickerVariant;
  /** Màu sắc chủ đề */
  color?: TimeRangePickerColor;
  /** Độ bo góc */
  radius?: TimeRangePickerRadius;
  /** Nhãn tiêu đề hiển thị cho ô nhập */
  label?: ReactNode;
  /** Vị trí đặt nhãn tiêu đề */
  labelPlacement?: LabelPlacement;
  /** Văn bản giữ chỗ khi ô input rỗng */
  placeholder?: string;
  /** Văn bản giữ chỗ riêng biệt cho Start và End `[StartPlaceholder, EndPlaceholder]` */
  placeholders?: [string, string];
  /** Văn bản hướng dẫn/trợ giúp bên dưới ô */
  helperText?: ReactNode;
  /** Thông báo lỗi (tự động bật viền đỏ và animation) */
  errorMessage?: ReactNode;
  /** Tên trường form input */
  name?: string;
  /** Định danh HTML của ô input */
  id?: string;
  /** Thuộc tính gợi ý tự động điền autoComplete */
  autoComplete?: string;
  /** Khóa toàn bộ tương tác của ô nhập */
  disabled?: boolean;
  /** Chỉ cho phép xem, không mở popover chọn giờ */
  readOnly?: boolean;
  /** Callback kích hoạt khi nhấn nút xóa dữ liệu */
  onClear?: () => void;
  /** Vị trí hiển thị của popover */
  placement?: Placement;
  /** Render popover qua FloatingPortal vào body (mặc định true) */
  portal?: boolean;
  /** Class CSS tùy biến cho thẻ input */
  className?: string;
  /** Class CSS tùy biến cho wrapper ngoài cùng */
  wrapperClassName?: string;
  /** Class CSS tùy biến cho container bao bọc input */
  inputWrapperClassName?: string;
  /** Class CSS tùy biến cho nhãn label */
  labelClassName?: string;
  /** Class CSS tùy biến cho dòng helper/error */
  helperClassName?: string;
  /** Class CSS tùy biến cho popover */
  popoverClassName?: string;
}
