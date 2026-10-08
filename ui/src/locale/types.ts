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
  /** Nhãn aria-label chọn ngày */
  chooseDate?: string;
  /** Nhãn aria-label xóa ngày */
  clearDate?: string;
  /** Nhãn aria-label chọn khoảng ngày */
  chooseDateRange?: string;
  /** Nhãn aria-label xóa khoảng ngày */
  clearDateRange?: string;
  /** Nhãn aria-label chọn ngày giờ */
  chooseDateTime?: string;
  /** Nhãn aria-label xóa ngày giờ */
  clearDateTime?: string;
  /** Nhãn aria-label chọn khoảng ngày giờ */
  chooseDateTimeRange?: string;
  /** Nhãn aria-label xóa khoảng ngày giờ */
  clearDateTimeRange?: string;
  /** Nhãn aria-label chọn tháng */
  selectMonth?: string;
  /** Nhãn aria-label chọn năm */
  selectYear?: string;
  /** Nhãn nút áp dụng / hoàn tất */
  apply?: string;
}

/**
 * Cấu hình ngôn ngữ cho hộp thoại xác nhận (Confirm modal)
 */
export interface ConfirmLocale {
  /** Nhãn nút xác nhận */
  confirmText: string;
  /** Nhãn nút hủy / bỏ qua */
  cancelText: string;
  /** Nhãn aria-label đóng hộp thoại */
  closeAriaLabel?: string;
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
  /** Nhãn aria-label chọn tất cả các dòng trên trang này */
  selectAllRows?: string;
  /** Hàm tạo nhãn aria-label chọn một dòng */
  selectRow?: (id: string | number) => string;
  /** Hàm tạo nhãn aria-label mở rộng dòng */
  expandRow?: (id: string | number) => string;
  /** Hàm tạo nhãn aria-label thu gọn dòng */
  collapseRow?: (id: string | number) => string;
  /** Tiêu đề nút đóng popover bộ lọc */
  close?: string;
  /** Nhãn nút xóa bộ lọc */
  clearFilter?: string;
  /** Nhãn nút hoàn thành chỉnh sửa bộ lọc */
  done?: string;
  /** Placeholder mặc định cho trường nhập từ khóa */
  keywordPlaceholder?: string;
  /** Placeholder mặc định cho trường nhập số */
  numberPlaceholder?: string;
  /** Placeholder mặc định cho trường chọn ngày */
  datePlaceholder?: string;
  /** Placeholder mặc định cho trường chọn khoảng ngày */
  dateRangePlaceholder?: string;
  /** Placeholder ô tìm kiếm tùy chọn lọc */
  searchOptionsPlaceholder?: string;
  /** Hàm tạo aria-label nút xóa bộ lọc */
  deleteFilterAriaLabel?: (fieldLabel: string) => string;
}

/**
 * Cấu hình ngôn ngữ cho trạng thái rỗng (Empty)
 */
export interface EmptyLocale {
  /** Văn bản mô tả trạng thái rỗng */
  description: string;
  /** Nhãn alt mặc định cho ảnh trạng thái rỗng */
  imageAlt?: string;
}

/**
 * Cấu hình ngôn ngữ cho nhóm checkbox (CheckboxGroup)
 */
export interface CheckboxLocale {
  /** Văn bản hiển thị khi không tìm thấy lựa chọn */
  emptyText: string;
  /** Placeholder ô tìm kiếm checkbox */
  searchPlaceholder?: string;
  /** Hàm tạo aria-label ô tìm kiếm checkbox */
  searchAriaLabel?: (label?: string) => string;
}

/**
 * Cấu hình ngôn ngữ cho nhóm radio (RadioGroup)
 */
export interface RadioLocale {
  /** Văn bản hiển thị khi không tìm thấy lựa chọn */
  emptyText: string;
  /** Placeholder ô tìm kiếm radio */
  searchPlaceholder?: string;
  /** Hàm tạo aria-label ô tìm kiếm radio */
  searchAriaLabel?: (label?: string) => string;
}

/**
 * Cấu hình ngôn ngữ cho component Select
 */
export interface SelectLocale {
  /** Placeholder mặc định của ô chọn */
  placeholder?: string;
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
  /** Nhãn nút xóa lựa chọn đã chọn */
  clearSelection?: string;
  /** Nhãn aria-label ô tìm kiếm */
  searchAriaLabel?: string;
  /** Tiêu đề nút đóng popover lọc */
  close?: string;
  /** Nhãn nút xóa bộ lọc */
  clearFilter?: string;
  /** Nhãn nút hoàn thành chỉnh sửa bộ lọc */
  done?: string;
  /** Placeholder mặc định cho trường nhập từ khóa */
  keywordPlaceholder?: string;
  /** Placeholder mặc định cho trường nhập số */
  numberPlaceholder?: string;
  /** Placeholder mặc định cho trường chọn ngày */
  datePlaceholder?: string;
  /** Placeholder mặc định cho trường chọn khoảng ngày */
  dateRangePlaceholder?: string;
  /** Placeholder ô tìm kiếm tùy chọn lọc */
  searchOptionsPlaceholder?: string;
  /** Hàm tạo aria-label nút xóa bộ lọc */
  deleteFilterAriaLabel?: (fieldLabel: string) => string;
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
  /** Nhãn aria-label tải lên ảnh đại diện */
  uploadAvatarAriaLabel?: string;
  /** Nhãn aria-label xem trước ảnh đại diện */
  previewAvatarAriaLabel?: string;
  /** Tiêu đề tooltip xem trước */
  preview?: string;
  /** Nhãn aria-label cắt ảnh đại diện */
  cropAvatarAriaLabel?: string;
  /** Tiêu đề tooltip cắt ảnh */
  crop?: string;
  /** Nhãn aria-label xóa ảnh đại diện */
  removeAvatarAriaLabel?: string;
  /** Tiêu đề tooltip xóa ảnh */
  remove?: string;
  /** Nhãn trạng thái đang tải */
  loading?: string;
  /** Nhãn nút chọn ảnh khác trong crop */
  chooseAnotherImage?: string;
  /** Nhãn phóng to */
  zoomIn?: string;
  /** Nhãn thu nhỏ */
  zoomOut?: string;
  /** Nhãn xoay ngược chiều kim đồng hồ */
  rotateCcw?: string;
  /** Nhãn xoay theo chiều kim đồng hồ */
  rotateCw?: string;
  /** Nhãn lật ngang */
  flipHorizontal?: string;
  /** Hàm tạo aria-label biểu tượng định dạng tệp */
  fileFormatIcon?: (label: string) => string;
  /** Nhãn aria-label vùng tải tệp thu gọn */
  compactDropzoneAriaLabel?: string;
  /** Nhãn aria-label vùng kéo thả tải tệp tin */
  dropzoneAriaLabel?: string;
  /** Nhãn trạng thái đang xử lý tệp */
  processingFile?: string;
  /** Nhãn aria-label danh sách tệp tin đã tải lên */
  fileListAriaLabel?: string;
  /** Hàm tạo aria-label cho từng tệp tin */
  fileAriaLabel?: (fileName: string) => string;
  /** Thông báo lỗi tải lên */
  uploadError?: string;
  /** Nhãn trạng thái đang tải lên */
  uploading?: string;
  /** Hàm tạo aria-label thử lại tải lên */
  retryAriaLabel?: (fileName: string) => string;
  /** Tiêu đề nút thử lại */
  retry?: string;
  /** Hàm tạo aria-label xem trước tệp */
  previewFileAriaLabel?: (fileName: string) => string;
  /** Hàm tạo aria-label tải xuống tệp */
  downloadFileAriaLabel?: (fileName: string) => string;
  /** Tiêu đề nút tải xuống */
  download?: string;
  /** Hàm tạo aria-label xóa tệp */
  removeFileAriaLabel?: (fileName: string) => string;
  /** Tiêu đề nút xóa tệp */
  removeFile?: string;
  /** Nhãn aria-label vùng kéo thả tải ảnh */
  imageDropzoneAriaLabel?: string;
  /** Nhãn aria-label thay đổi ảnh */
  replaceImageAriaLabel?: string;
  /** Tiêu đề nút thay đổi ảnh */
  replaceImage?: string;
  /** Nhãn aria-label xóa ảnh */
  removeImageAriaLabel?: string;
  /** Tiêu đề nút xóa ảnh */
  removeImage?: string;
  /** Nhãn trạng thái đang xử lý hình ảnh */
  processingImage?: string;
  /** Nhãn gợi ý thả ảnh để thay thế */
  dropToReplace?: string;
  /** Nhãn aria-label danh sách hình ảnh đã tải lên */
  imageListAriaLabel?: string;
  /** Hàm tạo aria-label cho hình ảnh */
  imageAriaLabel?: (itemName: string) => string;
  /** Nhãn aria-label thêm hình ảnh */
  addImageAriaLabel?: string;
  /** Tiêu đề nút thêm hình ảnh */
  addImage?: string;
  /** Hàm tạo mô tả hình ảnh đơn đã tải lên */
  uploadedImageAriaLabel?: (itemName: string) => string;
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
  /** Nhãn aria-label nút xóa thời gian */
  clearAriaLabel?: string;
  /** Nhãn aria-label nút chọn thời gian */
  chooseTime?: string;
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
 * Cấu hình ngôn ngữ cho Alert
 */
export interface AlertLocale {
  /** Nhãn aria-label nút đóng cảnh báo */
  closeAriaLabel: string;
}

/**
 * Cấu hình ngôn ngữ cho Breadcrumb
 */
export interface BreadcrumbLocale {
  /** Nhãn aria-label nút thu gọn ba chấm */
  ellipsisAriaLabel: string;
}

/**
 * Cấu hình ngôn ngữ cho Carousel
 */
export interface CarouselLocale {
  /** Nhãn aria-label vùng băng chuyền */
  carouselAriaLabel: string;
  /** Nhãn aria-label phân trang băng chuyền */
  paginationAriaLabel: string;
  /** Hàm tạo nhãn aria-label cho từng slide */
  slideAriaLabel: (index: number) => string;
  /** Nhãn aria-label slide trước */
  prevSlide: string;
  /** Nhãn aria-label slide tiếp theo */
  nextSlide: string;
}

/**
 * Cấu hình ngôn ngữ cho FilePreview & ImagePreview
 */
export interface FilePreviewLocale {
  /** Thông báo định dạng file chưa hỗ trợ xem trực tiếp */
  unsupportedFormat: string;
  /** Nhãn nút tải xuống file */
  downloadFile: string;
  /** Nhãn nút phóng to */
  zoomIn: string;
  /** Nhãn nút thu nhỏ */
  zoomOut: string;
  /** Nhãn thanh trượt thu phóng */
  zoomSlider: string;
  /** Nhãn đặt lại kích thước ban đầu */
  reset: string;
  /** Nhãn xoay ngược chiều kim đồng hồ */
  rotateCcw: string;
  /** Nhãn xoay theo chiều kim đồng hồ */
  rotateCw: string;
  /** Nhãn lật ảnh theo chiều ngang */
  flipHorizontal: string;
  /** Nhãn nút tải ảnh xuống */
  download: string;
}

/**
 * Cấu hình ngôn ngữ cho các input (Input, PasswordInput, MultiInput, OtpInput)
 */
export interface InputLocale {
  /** Nhãn nút xóa nội dung trong Input */
  clearAriaLabel: string;
  /** Nhãn nút ẩn/hiện mật khẩu trong PasswordInput */
  togglePassword: string;
  /** Placeholder mặc định trong MultiInput */
  multiInputPlaceholder: string;
  /** Nhãn nút thêm thẻ trong MultiInput */
  addTagAriaLabel: string;
  /** Nhãn trạng thái đang tải */
  loading: string;
  /** Nhãn nút xóa tất cả thẻ trong MultiInput */
  clearAllTagsAriaLabel: string;
  /** Hàm tạo nhãn aria-label từng ô nhập OTP */
  otpCharAriaLabel: (index: number, length: number) => string;
  /** Nhãn aria-label nhóm ô nhập OTP */
  otpAriaLabel?: string;
}

/**
 * Cấu hình ngôn ngữ cho Modal
 */
export interface ModalLocale {
  /** Nhãn aria-label nút đóng modal */
  closeAriaLabel: string;
}

/**
 * Cấu hình ngôn ngữ cho OtpModal
 */
export interface OtpModalLocale {
  /** Tiêu đề modal xác thực OTP */
  title: string;
  /** Câu thông báo số điện thoại/email nhận OTP */
  phonePromptText: string;
  /** Nhãn nút gửi xác nhận */
  submitText: string;
  /** Thông báo lỗi khi chưa nhập đủ ký tự */
  errorDigitsText: string;
  /** Nhãn nút đóng modal */
  closeAriaLabel: string;
  /** Đoạn chữ đếm ngược gửi lại mã */
  resendInText: string;
  /** Đoạn hỏi chưa nhận được mã */
  dontReceiveText: string;
  /** Nhãn nút bấm gửi lại OTP */
  resendText: string;
}

/**
 * Cấu hình ngôn ngữ cho Skeleton & LoadingImage
 */
export interface SkeletonLocale {
  /** Nhãn trạng thái đang tải */
  loading: string;
  /** Thông báo lỗi tải ảnh */
  imageError: string;
  /** Tiêu đề nút mở xem ảnh */
  viewImage: string;
}

/**
 * Cấu hình ngôn ngữ cho Tabs
 */
export interface TabsLocale {
  /** Nhãn nút đóng tab */
  closeTab: string;
  /** Nhãn nút cuộn tab sang trái */
  scrollLeft: string;
  /** Nhãn nút cuộn tab sang phải */
  scrollRight: string;
}

/**
 * Cấu hình ngôn ngữ cho TextArea
 */
export interface TextAreaLocale {
  /** Nhãn nút xóa nội dung văn bản */
  clearAriaLabel: string;
}

/**
 * Cấu hình ngôn ngữ cho Typography
 */
export interface TypographyLocale {
  /** Nhãn nút sao chép */
  copy: string;
  /** Nhãn thông báo đã sao chép */
  copied: string;
  /** Nhãn nút xem thêm */
  expand: string;
  /** Nhãn nút thu gọn */
  collapse: string;
}

/**
 * Định nghĩa toàn bộ schema ngôn ngữ cho hệ sinh thái OpenWay UI
 */
export interface OpenWayLocale {
  /** Mã ngôn ngữ (ví dụ: 'en-US', 'vi-VN') */
  locale: string;
  /** Cảnh báo Alert */
  alert: AlertLocale;
  /** Đường dẫn Breadcrumb */
  breadcrumb: BreadcrumbLocale;
  /** Băng chuyền Carousel */
  carousel: CarouselLocale;
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
  /** Xem trước tệp & ảnh */
  filePreview: FilePreviewLocale;
  /** Bộ chọn ngày */
  datePicker: DatePickerLocale;
  /** Bộ chọn thời gian */
  timePicker: TimePickerLocale;
  /** Các thành phần Input */
  input: InputLocale;
  /** Hộp thoại Modal */
  modal: ModalLocale;
  /** Modal xác thực OTP */
  otpModal: OtpModalLocale;
  /** Khung tải Skeleton & LoadingImage */
  skeleton: SkeletonLocale;
  /** Điều hướng Tabs */
  tabs: TabsLocale;
  /** Ô nhập văn bản nhiều dòng TextArea */
  textarea: TextAreaLocale;
  /** Định dạng văn bản Typography */
  typography: TypographyLocale;
  /** Lỗi Mutation */
  mutation: MutationLocale;
}
