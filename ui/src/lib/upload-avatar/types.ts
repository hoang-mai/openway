import { ReactNode, Ref } from "react";
import type { Accept } from "react-dropzone";
import type { PreviewFile } from "../file-preview/types";

export type UploadAvatarShape = "circle" | "square";
export type UploadAvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type UploadAvatarColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";
export type UploadAvatarRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type UploadAvatarVariant = "outline" | "filled" | "ghost" | "other";
export type UploadAvatarLabelPlacement = "top" | "left";

export interface UploadAvatarCropOptions {
  /**
   * Tỷ lệ khung hình khi cắt ảnh (mặc định 1 cho avatar 1:1)
   * @default 1
   */
  aspectRatio?: number;

  /**
   * Hình dạng vùng cắt ảnh
   * @default 'round' cho circle avatar, 'rect' cho square avatar
   */
  cropShape?: "round" | "rect";

  /**
   * Hiển thị lưới căn chỉnh
   * @default true
   */
  showGrid?: boolean;

  /**
   * Tỷ lệ thu phóng tối thiểu
   * @default 1
   */
  minZoom?: number;

  /**
   * Tỷ lệ thu phóng tối đa
   * @default 4
   */
  maxZoom?: number;

  /**
   * Tiêu đề modal cắt ảnh
   * @default "Cắt ảnh đại diện"
   */
  modalTitle?: string;
}

export interface UploadAvatarConfig {
  /**
   * Đánh dấu trường bắt buộc nhập (hiển thị dấu * đỏ cạnh label)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Trạng thái báo lỗi (viền đỏ, aria-invalid="true")
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Trạng thái đang tải (vô hiệu hóa tương tác)
   * @default false
   */
  isLoading?: boolean;

  /**
   * Hiển thị biểu tượng xoay spinner khi đang ở trạng thái loading
   * @default false
   */
  showSpinner?: boolean;

  /**
   * Cho phép hiển thị nút xóa nhanh
   * @default false
   */
  isClearable?: boolean;

  /**
   * Mở rộng chiếm toàn bộ chiều rộng 100% của container cha
   * @default false
   */
  isFullWidth?: boolean;
}

export interface UploadAvatarProps {
  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: UploadAvatarConfig;

  /**
   * Ref chuyển tiếp đến thẻ input file ẩn (React 19)
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Kích cỡ của avatar:
   * - 'xs': 48x48px (size-12)
   * - 'sm': 64x64px (size-16)
   * - 'md': 80x80px (size-20 - mặc định)
   * - 'lg': 96x96px (size-24)
   * - 'xl': 128x128px (size-32)
   * @default 'md'
   */
  size?: UploadAvatarSize;

  /**
   * Biến thể giao diện của avatar:
   * - 'outline': viền nét quanh avatar (mặc định)
   * - 'filled': nền pastel nhạt, có viền mờ
   * - 'ghost': trong suốt, viền tối giản
   * - 'other': không áp dụng style mặc định, tùy biến qua className
   * @default 'outline'
   */
  variant?: UploadAvatarVariant;

  /**
   * Chủ đề màu sắc
   * @default 'primary'
   */
  color?: UploadAvatarColor;

  /**
   * Hình dạng avatar: 'circle' (tròn) hoặc 'square' (vuông)
   * @default 'circle'
   */
  shape?: UploadAvatarShape;

  /**
   * Tùy chỉnh độ bo góc khi shape="square"
   * @default theo từng size (xs: rounded, sm: rounded-md, md: rounded-lg, lg: rounded-xl, xl: rounded-2xl)
   */
  radius?: UploadAvatarRadius;

  // ==================== VALUE & CONTROLLED ====================
  /**
   * Giá trị ảnh avatar (PreviewFile = File | ServerFile hoặc chuỗi URL)
   */
  value?: PreviewFile | string | null;

  /**
   * Giá trị mặc định ban đầu khi khởi tạo (Uncontrolled)
   */
  defaultValue?: PreviewFile | string | null;

  /**
   * Callback khi ảnh avatar thay đổi (hoặc bị xóa với null)
   */
  onChange?: (item: PreviewFile | null) => void;

  /**
   * Callback khi ảnh avatar bị xóa
   */
  onRemove?: (item: PreviewFile) => void;

  /**
   * Callback khi mở xem trước ảnh phóng to (lightbox preview)
   */
  onPreview?: (item: PreviewFile) => void;

  /**
   * Callback khi người dùng nhấn nút xóa nhanh nội dung
   */
  onClear?: () => void;

  /**
   * Dung lượng file tối đa cho phép (bytes, ví dụ: 2 * 1024 * 1024 = 2MB)
   */
  maxSize?: number;

  /**
   * Định dạng MIME type hoặc phần mở rộng được chấp nhận (chuỗi hoặc đối tượng Accept từ react-dropzone)
   * @default "image/*"
   */
  accept?: string | Accept;

  /**
   * Bật modal cắt xén ảnh (crop) trước khi áp dụng
   * @default true
   */
  crop?: boolean | UploadAvatarCropOptions;

  // ==================== LABEL & FORM FIELD ====================
  /**
   * Nhãn hiển thị cho avatar
   */
  label?: ReactNode;

  /**
   * Vị trí đặt nhãn: 'top' | 'left'
   * @default 'top'
   */
  labelPlacement?: UploadAvatarLabelPlacement;

  /**
   * Đoạn văn bản hướng dẫn/chú thích bên dưới avatar
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi hiển thị bên dưới avatar (khi có lỗi sẽ kích hoạt trạng thái báo lỗi và viền đỏ)
   */
  errorMessage?: ReactNode;

  // ==================== STATES & ACTIONS ====================
  /**
   * Vô hiệu hóa toàn bộ tương tác
   * @default false
   */
  disabled?: boolean;

  /**
   * Chế độ chỉ đọc
   * @default false
   */
  readOnly?: boolean;

  /**
   * Icon placeholder tùy biến khi chưa có ảnh
   */
  icon?: ReactNode;

  /**
   * Tên trường form input
   */
  name?: string;

  /**
   * ID phần tử input
   */
  id?: string;

  // ==================== LAYOUT & CUSTOMIZATION ====================
  /**
   * Tùy biến className cho container bọc ngoài cùng (bao gồm label, avatar, helper/error text)
   */
  className?: string;

  /**
   * Tùy biến className cho container bọc ngoài cùng (giống Input)
   */
  wrapperClassName?: string;

  /**
   * Tùy biến className cho khung viền của riêng avatar
   */
  avatarClassName?: string;

  /**
   * Tùy biến className cho khung viền của riêng avatar (alias giống inputWrapperClassName)
   */
  avatarWrapperClassName?: string;

  /**
   * Tùy biến className cho phần tử <label>
   */
  labelClassName?: string;

  /**
   * Tùy biến className cho đoạn văn bản helperText hoặc errorMessage
   */
  helperClassName?: string;

  /**
   * Nhãn accessibility cho khu vực upload avatar
   */
  ariaLabel?: string;
}
