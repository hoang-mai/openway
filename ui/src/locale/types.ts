/**
 * Cấu hình ngôn ngữ cho DatePicker & Calendar
 */
export interface DatePickerLocale {
  /** Danh sách tên đầy đủ của 12 tháng */
  months: string[];
  /** Danh sách tên viết tắt của 12 tháng */
  monthsShort: string[];
  /** Danh sách tên đầy đủ của 7 ngày trong tuần */
  weekdays: string[];
  /** Danh sách tên viết tắt của 7 ngày trong tuần */
  weekdaysShort: string[];
  /** Danh sách ký hiệu tối giản của 7 ngày trong tuần */
  weekdaysMin: string[];
  /** Nhãn nút 'Hôm nay' */
  todayText: string;
  /** Nhãn nút 'Xóa' */
  clearText: string;
  /** Nhãn cột số tuần */
  weekText: string;
  /** Tên hiển thị các tab chế độ xem */
  viewTabs: {
    days: string;
    months: string;
    years: string;
  };
  /** Nhãn nút chuyển về tháng trước */
  prevMonth?: string;
  /** Nhãn nút chuyển sang tháng sau */
  nextMonth?: string;
  /** Nhãn nút chuyển về năm trước */
  prevYear?: string;
  /** Nhãn nút chuyển sang năm sau */
  nextYear?: string;
  /** Nhãn chuyển đổi chế độ xem lịch */
  switchView?: string;
}

/**
 * Cấu hình ngôn ngữ cho hộp thoại xác nhận (Confirm modal)
 */
export interface ConfirmLocale {
  /** Nhãn nút xác nhận */
  confirmText: string;
  /** Nhãn nút hủy / bỏ qua */
  cancelText: string;
}

/**
 * Cấu hình ngôn ngữ cho bảng dữ liệu (DataTable / Table)
 */
export interface TableLocale {
  /** Placeholder ô tìm kiếm toàn cục */
  searchPlaceholder: string;
  /** Nhãn aria-label nút xóa tìm kiếm */
  clearSearch: string;
  /** Nhãn aria-label / tooltip nút làm mới dữ liệu */
  refresh: string;
  /** Nhãn nút mở menu ẩn/hiện cột */
  columns: string;
  /** Tiêu đề popover cấu hình hiển thị cột */
  columnVisibility: string;
  /** Nhãn chọn số dòng mỗi trang */
  rowsPerPage: string;
  /** Nhãn aria-label nút về trang đầu */
  firstPage: string;
  /** Nhãn aria-label nút về trang trước */
  previousPage: string;
  /** Nhãn aria-label nút sang trang sau */
  nextPage: string;
  /** Nhãn aria-label nút đến trang cuối */
  lastPage: string;
  /** Hàm tạo nhãn aria-label cho từng số trang */
  pageLabel: (page: number) => string;
  /** Thông báo mặc định khi bảng không có dữ liệu */
  emptyText: string;
  /** Thông báo khi tìm kiếm hoặc lọc không có kết quả */
  emptyFilteredText: string;
  /** Nhãn nút mở menu thêm bộ lọc */
  filter: string;
  /** Tiêu đề danh sách chọn trường cần lọc */
  selectFilterField: string;
  /** Trạng thái trường đang được áp dụng lọc */
  filtering: string;
  /** Nhãn nút đặt lại một hoặc toàn bộ bộ lọc */
  resetFilter: string;
  /** Tiêu đề tooltip nút đặt lại toàn bộ bộ lọc */
  resetAllFilters: string;
  /** Giá trị hiển thị khi trường chưa nhập dữ liệu */
  notEntered: string;
  /** Giá trị hiển thị khi trường chưa chọn dữ liệu */
  notSelected: string;
}

/**
 * Cấu hình ngôn ngữ cho trạng thái rỗng (Empty)
 */
export interface EmptyLocale {
  /** Văn bản mô tả trạng thái rỗng */
  description: string;
}

/**
 * Cấu hình ngôn ngữ cho nhóm checkbox (CheckboxGroup)
 */
export interface CheckboxLocale {
  /** Văn bản hiển thị khi không tìm thấy lựa chọn */
  emptyText: string;
}

/**
 * Cấu hình ngôn ngữ cho nhóm radio (RadioGroup)
 */
export interface RadioLocale {
  /** Văn bản hiển thị khi không tìm thấy lựa chọn */
  emptyText: string;
}

/**
 * Cấu hình ngôn ngữ cho component Select
 */
export interface SelectLocale {
  /** Placeholder ô tìm kiếm tùy chọn */
  searchPlaceholder: string;
  /** Văn bản khi không tìm thấy kết quả */
  emptyText: string;
  /** Nhãn nút mở menu thêm bộ lọc */
  filter: string;
  /** Tiêu đề danh sách chọn trường cần lọc */
  selectFilterField: string;
  /** Trạng thái trường đang được áp dụng lọc */
  filtering: string;
  /** Nhãn nút đặt lại bộ lọc */
  resetFilter: string;
  /** Tiêu đề tooltip nút đặt lại toàn bộ bộ lọc */
  resetAllFilters: string;
  /** Giá trị hiển thị khi trường chưa nhập dữ liệu */
  notEntered: string;
  /** Giá trị hiển thị khi trường chưa chọn dữ liệu */
  notSelected: string;
}

/**
 * Cấu hình ngôn ngữ cho các components tải lên tệp/ảnh (UploadFile, UploadImage, UploadAvatar)
 */
export interface UploadLocale {
  /** Nhãn kéo thả tệp */
  dragDropText: string;
  /** Mô tả định dạng hỗ trợ cho vùng tải tệp (UploadFile) */
  dropzoneDescription: string;
  /** Mô tả định dạng hỗ trợ cho vùng tải ảnh (UploadImage) */
  imageDropzoneDescription: string;
  /** Nhãn nút bấm chọn tệp từ máy tính */
  browseButton: string;
  /** Tiêu đề modal cắt ảnh (crop avatar/image) */
  cropTitle: string;
  /** Nút áp dụng / xác nhận cắt ảnh */
  cropConfirm: string;
  /** Nút hủy bỏ cắt ảnh */
  cropCancel: string;
  /** Nhãn thanh thu phóng */
  zoom: string;
  /** Nhãn nút xoay ảnh */
  rotate: string;
  /** Nhãn nút đặt lại trạng thái ban đầu */
  reset: string;
  /** Thông báo lỗi xử lý tệp */
  processingError: (fileName: string) => string;
  /** Thông báo lỗi vượt quá dung lượng cho phép */
  maxSizeError: (maxSize: string) => string;
  /** Thông báo lỗi định dạng tệp không hợp lệ */
  invalidTypeError: string;
  /** Thông báo lỗi vượt quá số lượng tệp cho phép */
  maxCountError: (maxCount: number) => string;
  /** Thông báo lỗi vượt quá số lượng hình ảnh cho phép */
  imageMaxCountError: (maxCount: number) => string;
  /** Thông báo hỗ trợ màn hình (SR) khi thêm tệp mới thành công */
  filesAddedSr: (addedCount: number, totalCount: number) => string;
  /** Thông báo hỗ trợ màn hình (SR) khi xóa tệp */
  fileRemovedSr: (fileName: string, remainingCount?: number) => string;
  /** Thông báo hỗ trợ màn hình (SR) khi thêm hình ảnh mới thành công */
  imagesAddedSr: (addedCount: number, totalCount: number) => string;
  /** Thông báo hỗ trợ màn hình (SR) khi xóa hình ảnh */
  imageRemovedSr: (fileName: string, remainingCount?: number) => string;
  /** Thông báo hỗ trợ màn hình (SR) khi gặp lỗi tệp */
  fileErrorSr: (errorMessage: string) => string;
  /** Thông báo hỗ trợ màn hình (SR) khi xóa ảnh đại diện */
  avatarRemovedSr: string;
  /** Thông báo hỗ trợ màn hình (SR) khi tải ảnh đại diện thành công */
  avatarUploadedSr: string;
  /** Thông báo hỗ trợ màn hình (SR) khi cập nhật ảnh đại diện thành công */
  avatarUpdatedSr: string;
}

/**
 * Cấu hình ngôn ngữ cho bộ chọn thời gian (TimePicker / TimeRangePicker)
 */
export interface TimePickerLocale {
  /** Placeholder ô nhập thời gian */
  placeholder: string;
  /** Nhãn nút xóa thời gian */
  clearText: string;
  /** Nhãn nút chọn giờ hiện tại */
  nowText: string;
  /** Nhãn nút xác nhận chọn */
  okText: string;
  /** Nhãn cột giờ */
  hours: string;
  /** Nhãn cột phút */
  minutes: string;
  /** Nhãn cột giây */
  seconds: string;
  /** Nhãn cột buổi (AM/PM) */
  period: string;
  /** Nhãn thời gian bắt đầu trong TimeRangePicker */
  startTime: string;
  /** Nhãn thời gian kết thúc trong TimeRangePicker */
  endTime: string;
}

/**
 * Cấu hình thông báo lỗi mạng và HTTP cho hook useMutationApp
 */
export interface MutationLocale {
  /** Tiêu đề thông báo lỗi mặc định */
  errorTitle: string;
  /** Lời nhắn lỗi chung khi không xác định được mã lỗi */
  defaultError: string;
  /** Lỗi 400 dữ liệu yêu cầu không hợp lệ */
  badRequest: string;
  /** Lỗi 401 hết hạn phiên hoặc chưa đăng nhập */
  unauthorized: string;
  /** Lỗi 403 không có quyền truy cập */
  forbidden: string;
  /** Lỗi 404 không tìm thấy tài nguyên */
  notFound: string;
  /** Lỗi 409 xung đột dữ liệu */
  conflict: string;
  /** Lỗi 422 định dạng không hợp lệ */
  unprocessable: string;
  /** Lỗi 500 lỗi máy chủ nội bộ */
  serverError: string;
  /** Lỗi không thể kết nối máy chủ (502, 503, 504 hoặc rớt mạng) */
  networkError: string;
  /** Lỗi quá thời gian quy định (timeout) */
  timeout: string;
}

/**
 * Định nghĩa toàn bộ schema ngôn ngữ cho hệ sinh thái OpenWay UI
 */
export interface OpenWayLocale {
  /** Mã ngôn ngữ (ví dụ: 'en-US', 'vi-VN') */
  locale: string;
  /** Hộp thoại xác nhận */
  confirm: ConfirmLocale;
  /** Bảng dữ liệu */
  table: TableLocale;
  /** Trạng thái rỗng */
  empty: EmptyLocale;
  /** Checkbox */
  checkbox: CheckboxLocale;
  /** Radio */
  radio: RadioLocale;
  /** Select */
  select: SelectLocale;
  /** Upload */
  upload: UploadLocale;
  /** Bộ chọn ngày */
  datePicker: DatePickerLocale;
  /** Bộ chọn thời gian */
  timePicker: TimePickerLocale;
  /** Lỗi Mutation */
  mutation: MutationLocale;
}
