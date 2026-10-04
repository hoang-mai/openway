import { ReactNode, Ref } from "react";
import type { Placement } from "@floating-ui/react";
import type { LabelPlacement } from "../input/types";

/**
 * Kích thước của TimePicker
 * - `xs`: Rất nhỏ (h-6, 24px)
 * - `sm`: Nhỏ (h-8, 32px)
 * - `md`: Chuẩn (h-10, 40px - mặc định)
 * - `lg`: Lớn (h-12, 48px)
 * - `xl`: Rất lớn (h-14, 56px)
 */
export type TimePickerSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Bảng màu chủ đề của TimePicker theo Design System
 */
export type TimePickerColor =
  | "primary"
  | "secondary"
  | "neutral"
  | "error"
  | "success"
  | "warning"
  | "info";

/**
 * Mức độ bo góc viền của ô nhập và popover
 */
export type TimePickerRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Biến thể giao diện của ô nhập TimePicker
 * - `outline`: Viền nét bao quanh (mặc định)
 * - `filled`: Nền xám nhạt có viền mờ
 * - `ghost`: Trong suốt không viền
 * - `other`: Tùy biến tự do qua className
 */
export type TimePickerVariant = "outline" | "filled" | "ghost" | "other";

/**
 * Buổi trong ngày khi dùng chế độ 12 giờ
 */
export type TimePeriod = "AM" | "PM";

/**
 * Giá trị thời gian linh hoạt đầu vào / đầu ra
 * Có thể là chuỗi thời gian (ví dụ '14:30:00'), đối tượng Date, hoặc null.
 */
export type TimeValue = string | Date | null;

/**
 * Đối tượng biểu diễn các thành phần thời gian đã phân tách
 */
export interface TimeObject {
  /** Giờ (0 - 23 hoặc 1 - 12 nếu 12h) */
  hours: number;
  /** Phút (0 - 59) */
  minutes: number;
  /** Giây (0 - 59) */
  seconds: number;
  /** Buổi (AM hoặc PM) */
  period?: TimePeriod;
}

/**
 * Cấu hình một mục trong cột cuộn thời gian
 */
export interface TimeColumnItem {
  /** Giá trị định danh của mục (số hoặc chuỗi) */
  value: number | string;
  /** Chuỗi hiển thị trực quan trên giao diện (ví dụ '01', '02', 'AM') */
  label: string;
  /** Trạng thái bị vô hiệu hóa, không cho phép chọn */
  disabled?: boolean;
}

/**
 * Props cho component TimeColumn (cột danh sách cuộn giờ, phút, giây hoặc AM/PM)
 */
export interface TimeColumnProps {
  /** Danh sách các mục hiển thị trong cột */
  items: TimeColumnItem[];
  /** Giá trị đang được chọn hiện tại */
  selectedValue?: number | string | null;
  /** Callback khi người dùng nhấp hoặc chọn một mục */
  onSelect: (value: number | string) => void;
  /** Nhãn ARIA mô tả chức năng của cột (ví dụ 'Hours', 'Minutes') */
  ariaLabel?: string;
  /** Kích thước hiển thị */
  size?: TimePickerSize;
  /** Màu sắc chủ đề */
  color?: TimePickerColor;
  /** Bo góc của mục */
  radius?: TimePickerRadius;
  /** Class tùy biến cho danh sách container ul */
  className?: string;
  /** Class tùy biến cho từng item li */
  itemClassName?: string;
  /** Class tùy biến cho item đang được chọn */
  selectedItemClassName?: string;
}

/**
 * Props cho component TimeView (bảng điều khiển chọn thời gian dạng lưới cột)
 */
export interface TimeViewProps {
  /** Giá trị Date đang được chọn */
  value?: Date | null;
  /** Nhãn trợ năng cho hộp thoại chọn giờ */
  ariaLabel?: string;
  /** Callback kích hoạt khi giá trị thời gian thay đổi */
  onChange?: (date: Date) => void;
  /** Bật chế độ 12 giờ với cột chọn AM / PM */
  use12Hours?: boolean;
  /** Hiển thị cột chọn giây */
  showSeconds?: boolean;
  /** Bước nhảy cho cột Giờ (ví dụ: 1, 2, 3...) */
  hourStep?: number;
  /** Bước nhảy cho cột Phút (ví dụ: 1, 5, 10, 15...) */
  minuteStep?: number;
  /** Bước nhảy cho cột Giây (ví dụ: 1, 5, 10, 15...) */
  secondStep?: number;
  /** Giới hạn thời gian nhỏ nhất cho phép chọn */
  minTime?: TimeValue;
  /** Giới hạn thời gian lớn nhất cho phép chọn */
  maxTime?: TimeValue;
  /** Hàm trả về danh sách các giờ bị vô hiệu hóa */
  disabledHours?: () => number[];
  /** Hàm trả về danh sách các phút bị vô hiệu hóa theo giờ đã chọn */
  disabledMinutes?: (selectedHour: number) => number[];
  /** Hàm trả về danh sách các giây bị vô hiệu hóa theo giờ và phút đã chọn */
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  /** Kích cỡ bảng chọn thời gian */
  size?: TimePickerSize;
  /** Màu sắc chủ đề */
  color?: TimePickerColor;
  /** Bo góc của khung bảng */
  radius?: TimePickerRadius;
  /** Class CSS tùy biến bổ sung */
  className?: string;
}

/**
 * Cấu hình tập trung các cờ tính năng cho TimePicker
 */
export interface TimePickerConfig {
  /** Đánh dấu trường bắt buộc nhập (hiển thị dấu sao đỏ *) */
  isRequired?: boolean;
  /** Bật trạng thái cảnh báo lỗi (viền đỏ) */
  isInvalid?: boolean;
  /** Đang tải dữ liệu, khóa tương tác */
  isLoading?: boolean;
  /** Hiển thị biểu tượng xoay spinner khi đang tải */
  showSpinner?: boolean;
  /** Hiển thị nút xóa nhanh thời gian đã chọn */
  isClearable?: boolean;
  /**
   * Mở rộng chiều ngang 100% container cha
   * @default true
   */
  isFullWidth?: boolean;
  /** Tự động đóng popover sau khi người dùng chọn xong */
  closeOnSelect?: boolean;
}

/**
 * Props cho component TimePicker
 */
export interface TimePickerProps {
  /** Cấu hình tập trung các cờ tính năng / trạng thái */
  config?: TimePickerConfig;
  /** Ref chuyển tiếp tới thẻ HTML `<input>` */
  ref?: Ref<HTMLInputElement>;
  /** Giá trị thời gian đang chọn (Controlled) */
  value?: TimeValue;
  /** Giá trị thời gian mặc định ban đầu (Uncontrolled) */
  defaultValue?: TimeValue;
  /** Callback khi thay đổi thời gian (trả về chuỗi định dạng theo format, hoặc null khi xóa) */
  onChange?: (time: string | null) => void;
  /** Định dạng dữ liệu chính dùng cho cả input và output (mặc định 'HH:mm:ss') */
  format?: string;
  /** Định dạng chuỗi hiển thị trực quan trên ô input (tùy chọn) */
  displayFormat?: string;
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
  size?: TimePickerSize;
  /** Biến thể viền/nền của ô nhập */
  variant?: TimePickerVariant;
  /** Màu sắc chủ đề */
  color?: TimePickerColor;
  /** Độ bo góc */
  radius?: TimePickerRadius;
  /** Nhãn tiêu đề hiển thị cho ô nhập */
  label?: ReactNode;
  /**
   * Vị trí đặt nhãn tiêu đề
   * @default 'floating'
   */
  labelPlacement?: LabelPlacement;
  /** Văn bản giữ chỗ khi ô input rỗng */
  placeholder?: string;
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
  /** Vị trí hiển thị của popover chọn giờ */
  placement?: Placement;
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
