import { HTMLAttributes, ReactNode, Ref } from "react";

/**
 * Các kích thước chiều rộng tiêu chuẩn của Modal:
 * - 'xs': 320px (nhỏ gọn, dành cho thông báo nhanh)
 * - 'sm': 400px (dành cho form ngắn, xác nhận)
 * - 'md': 540px (chuẩn mặc định cho đa số form)
 * - 'lg': 720px (dành cho form phức tạp, upload ảnh)
 * - 'xl': 960px (dành cho bảng dữ liệu, preview tài liệu)
 * - 'full': Toàn màn hình
 */
export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Các mức bo góc của khung hộp thoại Modal:
 * - 'none': Không bo góc (vuông vức)
 * - 'sm': Bo góc nhẹ (rounded-sm)
 * - 'md': Bo góc vừa (rounded-md)
 * - 'lg': Bo góc lớn (rounded-lg)
 * - 'xl': Bo góc rất lớn (rounded-xl)
 * - 'full': Bo tròn hoàn toàn (rounded-3xl)
 */
export type ModalRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props cho component `<Modal>` (Khung giao diện hộp thoại dialog box)
 */
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {

  /**
   * Ref chuyển tiếp (forwardRef) trỏ trực tiếp đến thẻ div hộp thoại
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Kích thước chiều rộng của hộp thoại
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Tùy chỉnh độ bo góc của hộp thoại.
   * Nếu không truyền, mặc định sẽ áp dụng bo góc `rounded-lg`.
   */
  radius?: ModalRadius;

  /**
   * Class tùy biến CSS cho container bao ngoài hộp thoại
   */
  className?: string;

  /**
   * Nội dung bên trong hộp thoại (thường là `<ModalHeader>`, `<ModalBody>`, `<ModalFooter>`)
   */
  children?: ReactNode;
}

/**
 * Props cho component `<ModalHeader>` (Phần đầu của hộp thoại Modal)
 */
export interface ModalHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Kích thước áp dụng cho tiêu đề và khoảng cách padding trong header
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Tiêu đề chính của Modal (dạng text string hoặc ReactNode)
   */
  title?: ReactNode;

  /**
   * Đoạn văn bản mô tả phụ bên dưới tiêu đề
   */
  description?: ReactNode;

  /**
   * Class tùy biến CSS riêng cho phần text tiêu đề (Title)
   */
  titleClassName?: string;

  /**
   * Class tùy biến CSS riêng cho phần text mô tả (Description)
   */
  descriptionClassName?: string;

  /**
   * Cho phép hiển thị nút đóng (X) ở góc phải của header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Callback tùy biến khi người dùng click vào nút đóng (X).
   * Luôn kết hợp kích hoạt hiệu ứng exit animation của ModalContainer.
   */
  onClose?: () => void;

  /**
   * Class tùy biến CSS cho nút bấm đóng (X)
   */
  closeButtonClassName?: string;

  /**
   * Class tùy biến CSS cho toàn bộ khối header
   */
  className?: string;

  /**
   * Nội dung ReactNode tùy chỉnh thêm vào bên trong header
   */
  children?: ReactNode;
}

/**
 * Props cho component `<ModalBody>` (Phần thân chứa nội dung chính cuộn được của Modal)
 */
export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Kích thước áp dụng cho khoảng cách padding và cỡ chữ bên trong body
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Class tùy biến CSS cho toàn bộ khối body (hỗ trợ overflow cuộn dọc)
   */
  className?: string;

  /**
   * Nội dung chính hiển thị bên trong body (Form nhập liệu, Danh sách, Văn bản...)
   */
  children?: ReactNode;
}

/**
 * Props cho component `<ModalFooter>` (Phần chân trang chứa các nút hành động xác nhận/hủy)
 */
export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Kích thước áp dụng cho padding và khoảng cách gap giữa các nút bấm
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Class tùy biến CSS cho toàn bộ khối footer
   */
  className?: string;

  /**
   * Các nút bấm hành động (ví dụ: `<Button>Hủy</Button>`, `<Button color="primary">Lưu</Button>`)
   */
  children?: ReactNode;
}

/**
 * Props cho component `<ModalContainer>` (Tầng Wrapper quản lý Overlay Backdrop, Native Dialog, ESC & Animation)
 */
export interface ModalContainerProps extends HTMLAttributes<HTMLDialogElement> {
  /**
   * Trạng thái hiển thị mở/đóng modal (Controlled State)
   */
  open?: boolean;

  /**
   * Callback được kích hoạt khi modal đóng (click ra ngoài backdrop, nhấn phím ESC, hoặc click nút đóng X)
   */
  onClose?: () => void;

  /**
   * Kích thước tổng thể của Modal (truyền xuống context để đồng bộ kích thước cho Modal, Header, Body, Footer)
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Trạng thái đang tải / xử lý (Loading).
   * Khi `isLoading = true`:
   * - Chặn đóng modal khi click vào vùng backdrop overlay (`closeOnOverlayClick`)
   * - Chặn đóng modal khi nhấn phím ESC (`closeOnEsc`)
   * - Chặn đóng modal từ nút đóng (X) và component `<ModalClose>`
   * @default false
   */
  isLoading?: boolean;

  /**
   * Cho phép tự động đóng modal khi người dùng click vào vùng backdrop overlay bên ngoài
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Cho phép tự động đóng modal khi người dùng nhấn phím ESC (Escape) trên bàn phím
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Tự động khóa cuộn trang (body scroll lock) khi modal đang hiển thị
   * @default true
   */
  lockScroll?: boolean;

  /**
   * Class tùy biến CSS cho lớp nền backdrop mờ toàn màn hình
   */
  overlayClassName?: string;

  /**
   * Class tùy biến CSS cho container bao ngoài dialog
   */
  className?: string;

  /**
   * Nội dung bên trong container (thường là component `<Modal>`)
   */
  children?: ReactNode;
}

/**
 * Props cho component `<ModalClose>` (Wrapper tự động kích hoạt đóng Modal có Exit Animation cho bất kỳ nút bấm nào)
 */
export interface ModalCloseProps extends HTMLAttributes<HTMLElement> {
  /**
   * Component con cần bọc để kích hoạt sự kiện đóng (thường là `<Button>`)
   */
  children?: ReactNode;

  /**
   * Tự động truyền thẳng sự kiện onClick và props vào phần tử con (cloneElement) thay vì bọc ngoài bằng thẻ div
   * @default true
   */
  asChild?: boolean;
}
