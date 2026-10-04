import { ReactNode } from "react";
import type { Accept, DropzoneRootProps } from "react-dropzone";
import type { PreviewFile } from "../file-preview/types";

/**
 * Hình dạng khung hiển thị hình ảnh
 * - 'rectangle': Khung chữ nhật (mặc định cho Dropzone)
 * - 'square': Khung vuông tỷ lệ 1:1 (mặc định cho Card Grid)
 */
export type UploadImageShape = "rectangle" | "square";

/**
 * Chế độ hiển thị giao diện tải ảnh
 * - 'dropzone': Khung kéo thả lớn với tiêu đề và mô tả trực quan
 * - 'card-grid': Lưới thẻ ảnh dạng thumbnail (picture wall)
 * - 'button': Nút bấm kích hoạt tải ảnh nhỏ gọn
 */
export type UploadImageViewMode = "dropzone" | "card-grid" | "button";

/**
 * 5 mức kích thước chuẩn trong Design System
 */
export type UploadImageSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Bảng màu chủ đề trong Design System
 */
export type UploadImageColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

/**
 * Độ bo góc theo token hệ thống
 */
export type UploadImageRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Biến thể kiểu dáng hiển thị
 */
export type UploadImageVariant = "outline" | "filled" | "ghost" | "other";

/**
 * Kiểu căn chỉnh hiển thị hình ảnh trong khung chứa (CSS object-fit)
 * - 'contain': Thu phóng giữ nguyên tỷ lệ sao cho toàn bộ hình ảnh nằm trọn trong khung
 * - 'cover': Lấp đầy khung chứa (có thể bị cắt viền)
 * - 'fill': Kéo dãn lấp đầy khung chứa
 * - 'none': Giữ nguyên kích thước gốc của hình ảnh
 * - 'scale-down': Chọn kích thước nhỏ hơn giữa 'none' và 'contain'
 */
export type UploadImageObjectFit = "cover" | "contain" | "fill" | "none" | "scale-down";

/**
 * Trạng thái kéo thả tệp trên vùng Dropzone
 * - 'idle': Trạng thái bình thường
 * - 'active': Đang có tệp hợp lệ được kéo trên vùng Dropzone
 * - 'reject': Tệp đang kéo bị từ chối do sai định dạng hoặc vượt quá dung lượng
 */
export type UploadImageDragStatus = "idle" | "active" | "reject";

/**
 * Props cho component chính `<UploadImage>`
 */
export interface UploadImageProps {
  /**
   * Danh sách hoặc một mục tệp hình ảnh được quản lý (Controlled mode)
   */
  value?: PreviewFile[] | PreviewFile | null;

  /**
   * Giá trị mặc định ban đầu khi dùng ở chế độ không kiểm soát (Uncontrolled mode)
   */
  defaultValue?: PreviewFile[] | PreviewFile | null;

  /**
   * Callback kích hoạt khi danh sách hình ảnh thay đổi (thêm mới, thay thế)
   */
  onChange?: (items: PreviewFile[]) => void;

  /**
   * Callback kích hoạt khi một hình ảnh bị xóa khỏi danh sách
   */
  onRemove?: (item: PreviewFile, index: number) => void;

  /**
   * Callback kích hoạt khi người dùng yêu cầu xem trước (phóng to) hình ảnh
   */
  onPreview?: (item: PreviewFile) => void;

  /**
   * Cho phép tải lên nhiều hình ảnh cùng lúc hay chỉ tải một ảnh
   * @default false
   */
  multiple?: boolean;

  /**
   * Giới hạn số lượng hình ảnh tối đa được phép tải lên
   * @default 1 khi multiple=false, không giới hạn khi multiple=true
   */
  maxCount?: number;

  /**
   * Giới hạn dung lượng tối đa của mỗi tệp hình ảnh (tính theo bytes)
   * Ví dụ: 5 * 1024 * 1024 tương đương 5MB
   */
  maxSize?: number;

  /**
   * Các định dạng tệp được chấp nhận (chuỗi MIME/extension hoặc object Accept từ react-dropzone)
   * @default "image/*"
   */
  accept?: string | Accept;

  /**
   * Hook xử lý trước khi tải tệp lên để xác thực hoặc chuyển đổi dữ liệu.
   * Trả về `true` để tiếp tục, `false` hoặc chuỗi thông báo lỗi để từ chối tệp.
   */
  beforeUpload?: (file: File) => boolean | string | Promise<boolean | string>;

  /**
   * Chế độ hiển thị giao diện của component:
   * - 'dropzone': Vùng kéo thả lớn với tiêu đề và mô tả
   * - 'card-grid': Lưới thẻ ảnh thu nhỏ (picture wall)
   * - 'button': Nút bấm kích hoạt tải ảnh nhỏ gọn
   * @default 'dropzone'
   */
  viewMode?: UploadImageViewMode;

  /**
   * Hình dạng của khung tải ảnh
   * @default 'rectangle' cho dropzone, 'square' cho card-grid
   */
  shape?: UploadImageShape;

  /**
   * Kiểu căn chỉnh hiển thị hình ảnh trong khung chứa (CSS object-fit)
   * @default 'contain' cho dropzone 1 ảnh, 'cover' cho thumbnail danh sách
   */
  objectFit?: UploadImageObjectFit;

  /**
   * Kích cỡ của component (áp dụng cho dropzone, thumbnail, font chữ, icon)
   * @default 'md'
   */
  size?: UploadImageSize;

  /**
   * Bảng màu chủ đề trong Design System
   * @default 'primary'
   */
  color?: UploadImageColor;

  /**
   * Biến thể kiểu dáng hiển thị của khung tải ảnh
   * @default 'outline'
   */
  variant?: UploadImageVariant;

  /**
   * Tùy chỉnh độ bo góc của các phần tử (khung dropzone, thumbnail, nút bấm)
   * @default phụ thuộc vào prop size
   */
  radius?: UploadImageRadius;

  /**
   * Nhãn văn bản hiển thị phía trên component
   */
  label?: ReactNode;

  /**
   * Đánh dấu trường bắt buộc nhập (hiển thị dấu * màu đỏ cạnh nhãn)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Lớp CSS tùy biến cho nhãn văn bản (label)
   */
  labelClassName?: string;

  /**
   * Văn bản hướng dẫn hoặc ghi chú phụ trợ hiển thị phía dưới component
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi tùy chỉnh hiển thị khi trường không hợp lệ
   */
  errorMessage?: ReactNode;

  /**
   * Trạng thái báo lỗi cho trường nhập (hiển thị viền màu đỏ)
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Vô hiệu hóa toàn bộ tương tác tải ảnh và xóa ảnh
   * @default false
   */
  disabled?: boolean;

  /**
   * Chế độ chỉ đọc (cho phép xem trước nhưng không cho phép tải thêm hoặc xóa ảnh)
   * @default false
   */
  readOnly?: boolean;

  /**
   * Trạng thái đang tải dữ liệu (hiển thị hiệu ứng xoay spinner và vô hiệu hóa tương tác)
   * @default false
   */
  isLoading?: boolean;

  /**
   * Tiêu đề chính tùy chỉnh bên trong khung Dropzone
   * @default "Kéo thả hình ảnh vào đây, hoặc nhấn để duyệt file"
   */
  dropzoneTitle?: ReactNode;

  /**
   * Mô tả phụ tùy chỉnh bên trong khung Dropzone
   * @default "Hỗ trợ định dạng PNG, JPG, WEBP, GIF"
   */
  dropzoneDescription?: ReactNode;

  /**
   * Biểu tượng tùy chỉnh hiển thị ở vị trí icon trung tâm
   */
  icon?: ReactNode;

  /**
   * Nhãn chữ của nút bấm khi viewMode="button"
   * @default "Tải ảnh lên"
   */
  buttonText?: ReactNode;

  /**
   * Render prop tùy biến giao diện hiển thị cho từng mục hình ảnh trong danh sách
   */
  renderItem?: (item: PreviewFile, index: number, actions: { remove: () => void; preview: () => void }) => ReactNode;

  /**
   * Lớp CSS tùy biến cho container bao ngoài cùng của component
   */
  className?: string;

  /**
   * Lớp CSS tùy biến cho vùng Dropzone hoặc vùng kích hoạt
   */
  dropzoneClassName?: string;

  /**
   * Lớp CSS tùy biến cho danh sách xem trước hình ảnh (UploadImageList)
   */
  previewClassName?: string;

  /**
   * Lớp CSS tùy biến cho thông báo trợ giúp/báo lỗi (HelperErrorText)
   */
  helperClassName?: string;

}

/**
 * Props cho sub-component `<UploadImageDropzone>`
 */
export interface UploadImageDropzoneProps {
  /**
   * Kích cỡ của khung Dropzone
   * @default 'md'
   */
  size?: UploadImageSize;

  /**
   * Màu sắc chủ đề khi hover và kéo thả
   * @default 'primary'
   */
  color?: UploadImageColor;

  /**
   * Biến thể kiểu dáng viền/nền của khung Dropzone
   * @default 'outline'
   */
  variant?: UploadImageVariant;

  /**
   * Tùy biến độ bo góc của khung Dropzone
   * @default phụ thuộc vào size
   */
  radius?: UploadImageRadius;

  /**
   * Hình dạng của khung Dropzone ('rectangle' hoặc 'square')
   * @default 'rectangle'
   */
  shape?: UploadImageShape;

  /**
   * Kiểu căn chỉnh hiển thị hình ảnh trong khung Dropzone (CSS object-fit)
   * @default 'contain'
   */
  objectFit?: UploadImageObjectFit;

  /**
   * Vô hiệu hóa khung kéo thả và chọn tệp
   * @default false
   */
  disabled?: boolean;

  /**
   * Chế độ chỉ đọc, không cho phép kích hoạt chọn tệp mới
   * @default false
   */
  readOnly?: boolean;

  /**
   * Trạng thái đang tải tệp hoặc xử lý hình ảnh
   * @default false
   */
  isLoading?: boolean;

  /**
   * Trạng thái kéo thả tệp trên vùng Dropzone ('idle' | 'active' | 'reject')
   * @default 'idle'
   */
  dragStatus?: UploadImageDragStatus;

  /**
   * Trạng thái hiển thị viền lỗi
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Tiêu đề hiển thị bên trong khung Dropzone
   */
  dropzoneTitle?: ReactNode;

  /**
   * Mô tả phụ hiển thị bên trong khung Dropzone
   */
  dropzoneDescription?: ReactNode;

  /**
   * Biểu tượng tùy chỉnh trong khung Dropzone
   */
  icon?: ReactNode;

  /**
   * Mục hình ảnh đã tải lên để hiển thị trực tiếp trong khung khi ở chế độ 1 ảnh
   */
  item?: PreviewFile | null;

  /**
   * Callback xóa ảnh khi nhấn nút Xóa ảnh ở góc trên bên phải
   */
  onRemove?: () => void;

  /**
   * Callback mở lightbox xem trước khi nhấn vào thân hình ảnh
   */
  onPreview?: () => void;

  /**
   * Callback mở hộp thoại chọn tệp của trình duyệt (hoặc khi nhấn nút Thay đổi ảnh)
   */
  onTriggerUpload?: () => void;

  /**
   * Hàm gắn thuộc tính accessibility và sự kiện kéo thả từ react-dropzone
   */
  getRootProps?: <T extends DropzoneRootProps>(props?: T) => T;

  /**
   * Lớp CSS tùy biến bổ sung cho khung Dropzone
   */
  className?: string;

  /**
   * ID phần tử chứa văn bản hướng dẫn/mô tả hỗ trợ accessibility (aria-describedby)
   */
  describedById?: string;
}

/**
 * Props cho sub-component `<UploadImageList>`
 */
export interface UploadImageListProps {
  /**
   * Danh sách các mục hình ảnh cần hiển thị
   */
  items: PreviewFile[];

  /**
   * Kích cỡ của thumbnail hình ảnh
   * @default 'md'
   */
  size: UploadImageSize;

  /**
   * Màu sắc chủ đề cho các nút thao tác
   * @default 'primary'
   */
  color?: UploadImageColor;

  /**
   * Biến thể hiển thị
   * @default 'outline'
   */
  variant?: UploadImageVariant;

  /**
   * Độ bo góc của từng thumbnail ảnh trong danh sách
   */
  radius: UploadImageRadius;

  /**
   * Kiểu căn chỉnh hiển thị hình ảnh trong thumbnail (CSS object-fit)
   * @default 'cover'
   */
  objectFit?: UploadImageObjectFit;

  /**
   * Vô hiệu hóa các nút tương tác trong danh sách
   * @default false
   */
  disabled?: boolean;

  /**
   * Chế độ chỉ đọc (ẩn nút xóa và nút thêm ảnh)
   * @default false
   */
  readOnly?: boolean;

  /**
   * Số lượng hình ảnh tối đa cho phép (dùng để ẩn nút thêm ảnh khi đã đạt giới hạn)
   */
  maxCount?: number;

  /**
   * Callback khi nhấn nút xóa một mục hình ảnh
   */
  onRemove: (item: PreviewFile, index: number) => void;

  /**
   * Callback khi nhấn nút xem trước một mục hình ảnh
   */
  onPreview: (item: PreviewFile) => void;

  /**
   * Callback mở hộp thoại tải ảnh khi nhấn nút thêm (+)
   */
  onTriggerUpload: () => void;

  /**
   * Render prop tùy biến giao diện từng mục hình ảnh trong danh sách
   */
  renderItem?: (item: PreviewFile, index: number, actions: { remove: () => void; preview: () => void }) => ReactNode;

  /**
   * Cho phép hiển thị nút thêm (+) ở cuối danh sách hay không
   * @default true
   */
  showAddButton?: boolean;

  /**
   * Lớp CSS tùy biến cho container danh sách
   */
  className?: string;
}
