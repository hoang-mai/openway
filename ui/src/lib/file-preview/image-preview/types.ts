import { ReactNode } from "react";
import type { SliderProps } from "../../slider/types";

/**
 * Cấu trúc thông tin ảnh hiển thị trong trình xem ảnh
 */
export interface ImageItem {
  /**
   * Đường dẫn ảnh (URL hoặc Base64/Blob URL)
   */
  src: string;


  /**
   * Tên file ảnh hiển thị khi tải xuống
   */
  name?: string;

}

/**
 * Cấu hình bật/tắt các nút chức năng trên thanh công cụ ImagePreviewToolbar
 */
export interface ToolbarToolsConfig {
  /**
   * Cho phép hiển thị nút Phóng to (+)
   * @default true
   */
  zoomIn?: boolean;

  /**
   * Cho phép hiển thị nút Thu nhỏ (-)
   * @default true
   */
  zoomOut?: boolean;

  /**
   * Cho phép hiển thị thanh trượt Slider điều chỉnh zoom
   * @default true
   */
  zoomSlider?: boolean;

  /**
   * Cho phép hiển thị nút Reset tỉ lệ về 100% (1:1)
   * @default true
   */
  reset?: boolean;

  /**
   * Cho phép hiển thị cặp nút Xoay ảnh (theo và ngược chiều kim đồng hồ)
   * @default true
   */
  rotate?: boolean;

  /**
   * Cho phép hiển thị nút Lật ảnh theo chiều ngang
   * @default true
   */
  flip?: boolean;

  /**
   * Cho phép hiển thị nút Tải ảnh xuống máy
   * @default true
   */
  download?: boolean;
}

/**
 * Props cho component `<ImagePreviewToolbar>` (Thanh công cụ điều khiển ảnh)
 */
export interface ImagePreviewToolbarProps {
  /**
   * Mức độ phóng to hiện tại của ảnh (ví dụ: 1 = 100%, 1.5 = 150%)
   */
  zoom: number;

  /**
   * Mức độ thu nhỏ tối thiểu (mặc định: 0.2 tức 20%)
   * @default 0.2
   */
  minZoom?: number;

  /**
   * Mức độ phóng to tối đa (mặc định: 5 tức 500%)
   * @default 5
   */
  maxZoom?: number;

  /**
   * Bước nhảy khi kéo thanh Slider
   * @default 0.05
   */
  step?: number;

  /**
   * Callback khi giá trị zoom thay đổi qua thanh trượt Slider
   */
  onZoomChange?: (zoom: number) => void;

  /**
   * Tùy biến chi tiết các props truyền vào Slider component
   */
  sliderProps?: Partial<SliderProps>;

  /**
   * Góc xoay hiện tại của ảnh tính theo độ (0, 90, 180, 270)
   */
  rotation: number;

  /**
   * Trạng thái lật ngang của ảnh
   */
  isFlipped: boolean;

  /**
   * Callback khi bấm nút Phóng to ảnh
   */
  onZoomIn: () => void;

  /**
   * Callback khi bấm nút Thu nhỏ ảnh
   */
  onZoomOut: () => void;

  /**
   * Callback khi bấm nút Xoay theo chiều kim đồng hồ (+90 độ)
   */
  onRotateCw: () => void;

  /**
   * Callback khi bấm nút Xoay ngược chiều kim đồng hồ (-90 độ)
   */
  onRotateCcw: () => void;

  /**
   * Callback khi bấm nút Lật ảnh ngang
   */
  onFlipHorizontal: () => void;

  /**
   * Callback khi bấm nút Đặt lại toàn bộ thao tác (zoom, rotation, flip)
   */
  onReset: () => void;

  /**
   * Thông tin đối tượng ảnh hiện tại để phục vụ tải xuống
   */
  currentImage?: ImageItem | null;

  /**
   * Cấu hình bật/tắt chi tiết từng nút công cụ trên thanh toolbar
   */
  tools?: ToolbarToolsConfig;

  /**
   * Class tùy biến CSS cho container thanh công cụ
   */
  className?: string;
}

/**
 * Props cho component `<ImagePreview>` (Khối hiển thị & điều khiển thao tác trên ảnh)
 */
export interface ImagePreviewProps {
  /**
   * Đường dẫn ảnh hoặc data URL
   */
  src: string;

  /**
   * Tên file ảnh hiển thị khi tải xuống
   */
  name?: string;
  
  /**
   * Mức độ thu nhỏ tối thiểu (mặc định: 0.2 tức 20%)
   * @default 0.2
   */
  minZoom?: number;

  /**
   * Mức độ phóng to tối đa (mặc định: 5 tức 500%)
   * @default 5
   */
  maxZoom?: number;

  /**
   * Cho phép hiển thị thanh công cụ điều khiển phía dưới
   * @default true
   */
  showToolbar?: boolean;

  /**
   * Tùy chỉnh chi tiết các nút bấm và sự kiện trên thanh công cụ
   */
  toolbarProps?: Partial<ImagePreviewToolbarProps>;

  /**
   * Class tùy biến CSS cho container bao ngoài
   */
  className?: string;

  /**
   * Phần tử React con bổ sung bên dưới khối preview
   */
  children?: ReactNode;
}