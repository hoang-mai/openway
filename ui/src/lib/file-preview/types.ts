import { ReactNode } from "react";
import { ModalSize, ModalRadius } from "../modal/types";
import { ImagePreviewProps } from "./image-preview/types";

/**
 * Các loại định dạng file được hỗ trợ nhận diện trong hệ thống:
 * - 'image': File ảnh (jpg, png, webp, gif, svg, ...)
 * - 'pdf': Tài liệu PDF
 * - 'video': File video (mp4, webm, mov, ...)
 * - 'audio': File âm thanh (mp3, wav, ogg, ...)
 * - 'document': File văn bản, tài liệu văn phòng (doc, xls, ppt, txt, ...)
 * - 'code': File mã nguồn
 * - 'other': Các định dạng file khác
 */
export type FileType = "image" | "pdf" | "video" | "audio" | "document" | "code" | "other";

/**
 * Cấu trúc thông tin file từ máy chủ (Server File)
 */
export interface ServerFile {
  /**
   * Định danh duy nhất của file
   */
  id?: number | string;

  /**
   * Đường dẫn src file
   */
  src?: string;

  /**
   * Tên file hiển thị
   */
  name?: string;

  /**
   * Các thuộc tính tùy biến khác
   */
  [key: string]: unknown;
}

/**
 * Đối tượng File truyền vào xem trước (File đối tượng từ input hoặc ServerFile từ API)
 */
export type PreviewFile = File | ServerFile | string;

/**
 * Props cho component `<FilePreview>` (Component xác định loại file và chọn component hiển thị tương ứng)
 */
export interface FilePreviewProps {

  /**
   * Callback khi người dùng bấm nút Tải xuống
   */
  onDownload?: (item: PreviewFile) => void;

  /**
   * Các tùy chọn nâng cao khác cho ảnh
   */
  imageProps?: Partial<ImagePreviewProps>;

  /**
   * Class tùy biến CSS cho container nội dung
   */
  className?: string;
}

/**
 * Props cho component `<FileContainer>` (Hộp thoại bọc Modal Dialog quản lý Backdrop, Top layer, ESC, Lock Scroll)
 */
export interface FileContainerProps {
  /**
   * Trạng thái hiển thị mở/đóng FileContainer (Controlled State)
   * @default false
   */
  open?: boolean;

  /**
   * Callback khi đóng hộp thoại (click ra ngoài backdrop, nhấn phím ESC, hoặc click nút đóng X)
   */
  onClose?: () => void;

  /**
   * Dữ liệu file truyền vào để chia sẻ xuống FilePreview qua Context
   */
  file?: PreviewFile;

  /**
   * Tiêu đề tùy chỉnh cho phần header của Modal
   */
  title?: ReactNode;

  /**
   * Đoạn văn bản mô tả phụ bên dưới tiêu đề header
   */
  description?: ReactNode;

  /**
   * Kích thước chiều rộng của hộp thoại Modal
   * @default 'lg'
   */
  size?: ModalSize;

  /**
   * Tùy chỉnh độ bo góc của hộp thoại Modal
   * @default 'xl'
   */
  radius?: ModalRadius;

  /**
   * Cho phép hiển thị nút đóng (X) ở góc phải header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Cho phép tự động đóng khi người dùng click vào vùng backdrop overlay bên ngoài
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Cho phép tự động đóng khi người dùng nhấn phím ESC (Escape) trên bàn phím
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Tự động khóa cuộn trang (body scroll lock) khi hiển thị
   * @default true
   */
  lockScroll?: boolean;

  /**
   * Class tùy biến CSS cho container hộp thoại Modal
   */
  className?: string;

  /**
   * Class tùy biến CSS cho lớp nền backdrop mờ toàn màn hình
   */
  overlayClassName?: string;

  /**
   * Nội dung bên trong hộp thoại (thường là `<FilePreview>` hoặc `<ImagePreview>`)
   */
  children?: ReactNode;
}