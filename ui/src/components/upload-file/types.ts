import { PreviewFile } from "@/components/file-preview/types";
import { ReactNode } from "react";
import type { Accept, DropzoneRootProps } from "react-dropzone";

/**
 * Hình dạng khung hiển thị tệp tin
 * - 'rectangle': Khung chữ nhật (mặc định cho Dropzone)
 * - 'square': Khung vuông tỷ lệ 1:1
 */
export type UploadFileShape = "rectangle" | "square";

/**
 * Chế độ hiển thị giao diện tải tệp tin
 * - 'dropzone': Khung kéo thả lớn kèm tiêu đề và mô tả trực quan
 * - 'button': Nút bấm kích hoạt tải tệp gọn gàng
 * - 'compact': Khung kéo thả thu nhỏ dạng thanh ngang
 */
export type UploadFileViewMode = "dropzone" | "button" | "compact";

/**
 * Kiểu hiển thị danh sách tệp tin
 * - 'list': Danh sách dạng hàng ngang chi tiết (tên, icon, dung lượng, hành động)
 * - 'grid': Dạng thẻ card gọn gàng bố cục lưới
 */
export type UploadFileListType = "list" | "grid";

/**
 * 5 mức kích thước chuẩn trong Design System
 */
export type UploadFileSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Bảng màu chủ đề trong Design System
 */
export type UploadFileColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

/**
 * Độ bo góc theo token hệ thống
 */
export type UploadFileRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Biến thể kiểu dáng hiển thị
 */
export type UploadFileVariant = "outline" | "filled" | "ghost" | "other";

/**
 * Trạng thái kéo thả tệp trên vùng Dropzone
 * - 'idle': Trạng thái bình thường
 * - 'active': Đang có tệp hợp lệ được kéo trên vùng Dropzone
 * - 'reject': Tệp đang kéo bị từ chối do sai định dạng hoặc vượt quá dung lượng
 */
export type UploadFileDragStatus = "idle" | "active" | "reject";

/**
 * Phân loại định dạng tệp tin cho icon và màu sắc huy hiệu
 */
export type FileCategory =
  | "pdf"
  | "word"
  | "excel"
  | "powerpoint"
  | "archive"
  | "text"
  | "image"
  | "audio"
  | "video"
  | "code"
  | "other";

/**
 * Props cho component `<FileIcon>`
 */
export interface FileIconProps {
  /**
   * Đối tượng tệp tin (File, ServerFile, hoặc chuỗi src)
   */
  file?: PreviewFile;

  /**
   * Tên tệp hoặc phần mở rộng tệp cụ thể (tự động phân loại nếu không truyền file)
   */
  fileName?: string;

  /**
   * Chỉ định danh mục định dạng cụ thể (ghi đè tự động nhận diện)
   */
  category?: FileCategory;

  /**
   * Kích thước icon
   * @default 'md'
   */
  size?: UploadFileSize | number;

  /**
   * Class tùy biến CSS
   */
  className?: string;
}

/**
 * Props cho component hiển thị từng mục tệp tin `<UploadFileItemRow>`
 */
export interface UploadFileItemRowProps {
  /**
   * Đối tượng tệp tin (PreviewFile: File | ServerFile | string)
   */
  item: PreviewFile;

  /**
   * Vị trí index trong danh sách
   */
  index: number;

  /**
   * Kiểu hiển thị danh sách
   * @default 'list'
   */
  listType?: UploadFileListType;

  /**
   * Kích thước giao diện
   * @default 'md'
   */
  size?: UploadFileSize;

  /**
   * Bo góc theo token
   */
  radius?: UploadFileRadius;

  /**
   * Màu chủ đề
   */
  color?: UploadFileColor;

  /**
   * Vô hiệu hóa tương tác
   */
  disabled?: boolean;

  /**
   * Chế độ chỉ đọc (không thể xóa)
   */
  readOnly?: boolean;

  /**
   * Hiển thị nút xem trước
   * @default true
   */
  showPreviewButton?: boolean;

  /**
   * Hiển thị nút tải xuống
   * @default true
   */
  showDownloadButton?: boolean;

  /**
   * Hiển thị nút xóa
   * @default true
   */
  showRemoveButton?: boolean;

  /**
   * Callback khi người dùng xóa tệp
   */
  onRemove?: (item: PreviewFile, index: number) => void;

  /**
   * Callback khi người dùng xem trước tệp
   */
  onPreview?: (item: PreviewFile) => void;

  /**
   * Callback khi người dùng tải xuống tệp
   */
  onDownload?: (item: PreviewFile) => void;

  /**
   * Callback khi người dùng bấm thử lại tải lên (nếu có lỗi)
   */
  onRetry?: (item: PreviewFile, index: number) => void;

  /**
   * Hàm render tùy chỉnh cho từng mục tệp
   */
  renderItem?: (
    item: PreviewFile,
    index: number,
    actions: { remove: () => void; preview: () => void; download: () => void }
  ) => ReactNode;

  /**
   * Class tùy biến CSS
   */
  className?: string;
}

/**
 * Props cho danh sách tệp tin `<UploadFileList>`
 */
export interface UploadFileListProps {
  /**
   * Danh sách các tệp tin đã tải lên
   */
  items: PreviewFile[];

  /**
   * Kiểu hiển thị danh sách tệp tin
   * @default 'list'
   */
  listType?: UploadFileListType;

  /**
   * Kích thước hiển thị
   */
  size: UploadFileSize;

  /**
   * Màu chủ đề
   */
  color?: UploadFileColor;

  /**
   * Biến thể hiển thị
   */
  variant?: UploadFileVariant;

  /**
   * Bo góc
   */
  radius: UploadFileRadius;

  /**
   * Trạng thái vô hiệu hóa
   */
  disabled?: boolean;

  /**
   * Trạng thái chỉ đọc
   */
  readOnly?: boolean;

  /**
   * Số lượng tệp tối đa
   */
  maxCount?: number;

  /**
   * Hiển thị nút xem trước
   * @default true
   */
  showPreviewButton?: boolean;

  /**
   * Hiển thị nút tải xuống
   * @default true
   */
  showDownloadButton?: boolean;

  /**
   * Hiển thị nút xóa
   * @default true
   */
  showRemoveButton?: boolean;

  /**
   * Callback khi xóa tệp
   */
  onRemove: (item: PreviewFile, index: number) => void;

  /**
   * Callback khi xem trước tệp
   */
  onPreview: (item: PreviewFile) => void;

  /**
   * Callback khi tải xuống tệp
   */
  onDownload?: (item: PreviewFile) => void;

  /**
   * Callback khi thử lại tải lên
   */
  onRetry?: (item: PreviewFile, index: number) => void;

  /**
   * Hàm render tùy biến giao diện item
   */
  renderItem?: (
    item: PreviewFile,
    index: number,
    actions: { remove: () => void; preview: () => void; download: () => void }
  ) => ReactNode;

  /**
   * Class tùy biến CSS
   */
  className?: string;
}

/**
 * Props cho vùng kéo thả `<UploadFileDropzone>`
 */
export interface UploadFileDropzoneProps {
  /**
   * Kích thước giao diện
   * @default 'md'
   */
  size?: UploadFileSize;

  /**
   * Bảng màu chủ đề
   * @default 'primary'
   */
  color?: UploadFileColor;

  /**
   * Biến thể kiểu dáng
   * @default 'outline'
   */
  variant?: UploadFileVariant;

  /**
   * Độ bo góc
   */
  radius?: UploadFileRadius;

  /**
   * Hình dạng khung dropzone ('rectangle' hoặc 'square')
   * @default 'rectangle'
   */
  shape?: UploadFileShape;

  /**
   * Chế độ thu gọn dạng thanh ngang
   * @default false
   */
  compact?: boolean;

  /**
   * Trạng thái vô hiệu hóa
   */
  disabled?: boolean;

  /**
   * Trạng thái chỉ đọc
   */
  readOnly?: boolean;

  /**
   * Trạng thái đang tải / xử lý
   */
  isLoading?: boolean;

  /**
   * Hiển thị biểu tượng xoay spinner khi đang ở trạng thái loading
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Trạng thái kéo thả tệp
   */
  dragStatus?: UploadFileDragStatus;

  /**
   * Trạng thái không hợp lệ
   */
  isInvalid?: boolean;

  /**
   * Tiêu đề chính của vùng kéo thả
   */
  dropzoneTitle?: ReactNode;

  /**
   * Đoạn mô tả phụ trợ của vùng kéo thả
   */
  dropzoneDescription?: ReactNode;

  /**
   * Icon hiển thị ở trung tâm vùng kéo thả
   */
  icon?: ReactNode;

  /**
   * Hàm kích hoạt hộp thoại chọn tệp
   */
  onTriggerUpload?: () => void;

  /**
   * Props gốc từ useDropzone
   */
  getRootProps?: <T extends DropzoneRootProps>(props?: T) => T;

  /**
   * Class tùy biến CSS
   */
  className?: string;

  /**
   * ID phần tử mô tả lỗi/trợ giúp (A11y)
   */
  describedById?: string;
}

/**
 * Cấu hình tập trung các cờ trạng thái / tính năng boolean cho `<UploadFile>`
 */
export interface UploadFileConfig {
  /**
   * Đánh dấu trường bắt buộc nhập (hiển thị dấu * màu đỏ cạnh nhãn)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Đánh dấu trường đang trong trạng thái lỗi/không hợp lệ
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Trạng thái đang tải dữ liệu hoặc đang upload
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiển thị biểu tượng xoay spinner khi đang ở trạng thái loading
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Cho phép tải lên nhiều tệp tin cùng lúc
   * @default false
   */
  multiple?: boolean;

  /**
   * Cho phép hiển thị danh sách các tệp tin đã tải lên bên dưới
   * @default true
   */
  showFileList?: boolean;

  /**
   * Hiển thị nút xem trước trên từng tệp tin
   * @default true
   */
  showPreviewButton?: boolean;

  /**
   * Hiển thị nút tải xuống trên từng tệp tin
   * @default true
   */
  showDownloadButton?: boolean;

  /**
   * Hiển thị nút xóa trên từng tệp tin
   * @default true
   */
  showRemoveButton?: boolean;
}

/**
 * Props chính cho component `<UploadFile>`
 */
export interface UploadFileProps {
  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng boolean
   */
  config?: UploadFileConfig;

  /**
   * Danh sách hoặc một mục tệp tin được quản lý (Controlled mode)
   */
  value?: PreviewFile[] | PreviewFile | null;

  /**
   * Giá trị mặc định ban đầu khi dùng ở chế độ không kiểm soát (Uncontrolled mode)
   */
  defaultValue?: PreviewFile[] | PreviewFile | null;

  /**
   * Callback kích hoạt khi danh sách tệp tin thay đổi
   */
  onChange?: (items: PreviewFile[]) => void;

  /**
   * Callback kích hoạt khi một tệp tin bị xóa khỏi danh sách
   */
  onRemove?: (item: PreviewFile, index: number) => void;

  /**
   * Callback kích hoạt khi người dùng yêu cầu xem trước tệp tin
   */
  onPreview?: (item: PreviewFile) => void;

  /**
   * Callback kích hoạt khi người dùng bấm nút tải xuống tệp tin
   */
  onDownload?: (item: PreviewFile) => void;

  /**
   * Callback kích hoạt khi người dùng bấm thử lại tải lên (khi có lỗi)
   */
  onRetry?: (item: PreviewFile, index: number) => void;

  /**
   * Giới hạn số lượng tệp tin tối đa được phép tải lên
   * @default 1 khi multiple=false, không giới hạn khi multiple=true
   */
  maxCount?: number;

  /**
   * Dung lượng tệp tối đa (tính theo bytes)
   */
  maxSize?: number;

  /**
   * Dung lượng tệp tối thiểu (tính theo bytes)
   */
  minSize?: number;

  /**
   * Định dạng tệp tin chấp nhận tải lên (chuỗi extension như ".pdf,.docx,.xlsx" hoặc MIME type)
   */
  accept?: string | Accept;

  /**
   * Hook xử lý hoặc xác thực tệp trước khi chấp nhận tải lên
   * Trả về false hoặc chuỗi thông báo lỗi để từ chối tệp
   */
  beforeUpload?: (file: File) => boolean | string | Promise<boolean | string>;

  /**
   * Chế độ hiển thị giao diện tải tệp
   * - 'dropzone': Khung kéo thả lớn kèm tiêu đề và mô tả
   * - 'button': Nút bấm kích hoạt tải tệp
   * - 'compact': Khung kéo thả dạng thanh ngang thu nhỏ
   * @default 'dropzone'
   */
  viewMode?: UploadFileViewMode;

  /**
   * Kiểu hiển thị danh sách tệp tin
   * - 'list': Dạng hàng ngang chi tiết
   * - 'grid': Dạng thẻ card trên lưới
   * @default 'list'
   */
  listType?: UploadFileListType;

  /**
   * Hình dạng của khung tải tệp ('rectangle' hoặc 'square')
   * @default 'rectangle'
   */
  shape?: UploadFileShape;

  /**
   * 5 mức kích thước chuẩn trong Design System
   * @default 'md'
   */
  size?: UploadFileSize;

  /**
   * Bảng màu chủ đề
   * @default 'primary'
   */
  color?: UploadFileColor;

  /**
   * Biến thể kiểu dáng
   * @default 'outline'
   */
  variant?: UploadFileVariant;

  /**
   * Độ bo góc theo token hệ thống
   */
  radius?: UploadFileRadius;

  /**
   * Tiêu đề nhãn của trường form
   */
  label?: ReactNode;

  /**
   * Lớp CSS tùy biến cho nhãn văn bản (label)
   */
  labelClassName?: string;

  /**
   * Đoạn văn bản trợ giúp hiển thị bên dưới
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi hiển thị bên dưới trường khi không hợp lệ
   */
  errorMessage?: ReactNode;

  /**
   * Vô hiệu hóa toàn bộ tương tác
   * @default false
   */
  disabled?: boolean;

  /**
   * Trạng thái chỉ đọc (không thể thêm mới hoặc xóa tệp)
   * @default false
   */
  readOnly?: boolean;


  /**
   * Tiêu đề hiển thị trong khung Dropzone
   */
  dropzoneTitle?: ReactNode;

  /**
   * Mô tả phụ hiển thị trong khung Dropzone
   */
  dropzoneDescription?: ReactNode;

  /**
   * Nhãn văn bản hiển thị trên nút bấm khi viewMode='button'
   * @default 'Tải tệp lên'
   */
  buttonText?: ReactNode;

  /**
   * Icon tùy biến cho vùng Dropzone
   */
  icon?: ReactNode;

  /**
   * Hàm render tùy biến hoàn toàn giao diện từng mục tệp tin trong danh sách
   */
  renderItem?: (
    item: PreviewFile,
    index: number,
    actions: { remove: () => void; preview: () => void; download: () => void }
  ) => ReactNode;

  /**
   * Class tùy biến CSS cho container ngoài cùng
   */
  className?: string;

  /**
   * Class tùy biến CSS cho khung Dropzone
   */
  dropzoneClassName?: string;

  /**
   * Class tùy biến CSS cho danh sách tệp tin
   */
  listClassName?: string;

  /**
   * Class tùy biến CSS cho danh sách xem trước (UploadFileList)
   */
  previewClassName?: string;

  /**
   * Class tùy biến CSS cho vùng Helper/Error Text
   */
  helperClassName?: string;
}
