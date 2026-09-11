import { HTMLAttributes, ReactNode, Ref } from "react";
import { ButtonColor, ButtonProps, ButtonVariant } from "../button/types";

/**
 * Các kích thước chiều rộng tiêu chuẩn của Confirm:
 * - 'xs': 320px (nhỏ gọn, dành cho thông báo ngắn)
 * - 'sm': 380px (dành cho câu hỏi xác nhận đơn giản)
 * - 'md': 440px (chuẩn mặc định cho đa số hộp thoại xác nhận)
 * - 'lg': 520px (dành cho thông báo cảnh báo chi tiết)
 * - 'xl': 600px (dành cho nội dung phức tạp hoặc danh sách)
 */
export type ConfirmSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Các chủ đề màu sắc biểu thị mức độ quan trọng hoặc loại hành động của Confirm:
 * - 'warning': Cảnh báo hành động có rủi ro (vàng/cam)
 * - 'error': Hành động nguy hiểm / phá hủy / xóa dữ liệu (đỏ)
 * - 'primary': Hành động nghiệp vụ chính (xanh dương)
 * - 'secondary': Hành động phụ (nâu đồng)
 * - 'neutral': Thông báo trung tính (xám)
 * - 'success': Xác nhận hoàn thành hoặc kích hoạt thành công (xanh lá)
 * - 'info': Thông tin cần người dùng lưu ý (xanh lơ)
 */
export type ConfirmColor = "primary" | "secondary" | "neutral" | "error" | "success" | "warning" | "info";

/**
 * Các mức bo góc của khung hộp thoại Confirm:
 * - 'none': Không bo góc (vuông vức)
 * - 'sm': Bo góc nhẹ (rounded-sm)
 * - 'md': Bo góc vừa (rounded-md)
 * - 'lg': Bo góc lớn (rounded-lg)
 * - 'xl': Bo góc rất lớn (rounded-xl)
 * - 'full': Bo tròn hoàn toàn (rounded-2xl)
 */
export type ConfirmRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props cho component `<Confirm>` (Khung giao diện hộp thoại xác nhận - Pure Compound Dialog Box)
 */
export interface ConfirmProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref chuyển tiếp (forwardRef) trỏ trực tiếp đến thẻ div hộp thoại
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Kích thước chiều rộng của hộp thoại (được kế thừa tự động bởi ConfirmHeader, ConfirmBody, ConfirmFooter)
   * @default 'md'
   */
  size?: ConfirmSize;

  /**
   * Chủ đề màu sắc cho hộp thoại (được kế thừa tự động bởi ConfirmHeader và ConfirmFooter)
   * @default 'warning'
   */
  color?: ConfirmColor;

  /**
   * Tùy chỉnh độ bo góc của hộp thoại:
   * - 'none': không bo góc
   * - 'sm': bo góc nhỏ
   * - 'md': bo góc vừa
   * - 'lg': bo góc lớn
   * - 'xl': bo góc rất lớn
   * - 'full': bo tròn hoàn toàn
   * @default 'rounded-lg'
   */
  radius?: ConfirmRadius;

  /**
   * Class tùy biến CSS cho container bao ngoài hộp thoại
   */
  className?: string;

  /**
   * Các sub-component con bên trong hộp thoại:
   * `<ConfirmHeader>`, `<ConfirmBody>`, `<ConfirmFooter>`
   */
  children?: ReactNode;
}

/**
 * Props cho component `<ConfirmHeader>` (Phần đầu của hộp thoại Confirm)
 */
export interface ConfirmHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Kích thước áp dụng cho tiêu đề, icon và khoảng cách padding trong header
   * @default 'md'
   */
  size?: ConfirmSize;

  /**
   * Chủ đề màu sắc cho icon badge
   * @default 'warning'
   */
  color?: ConfirmColor;

  /**
   * Icon hiển thị cạnh tiêu đề (`true`: icon mặc định theo màu, `false`: ẩn icon, `ReactNode`: icon tùy chỉnh)
   * @default true
   */
  icon?: ReactNode | boolean;

  /**
   * Tiêu đề chính của hộp thoại Confirm
   */
  title?: ReactNode;

  /**
   * Class CSS tùy biến cho container bao ngoài icon badge
   */
  iconClassName?: string;

  /**
   * Class CSS tùy biến cho tiêu đề
   */
  titleClassName?: string;

  /**
   * Cho phép hiển thị nút đóng (X) ở góc phải của header
   * @default false
   */
  showCloseButton?: boolean;

  /**
   * Callback tùy biến khi click nút đóng (X).
   * Tự động kết hợp hiệu ứng Exit Animation của ConfirmContainer.
   */
  onClose?: () => void;

  /**
   * Class CSS tùy biến cho nút đóng (X)
   */
  closeButtonClassName?: string;

  /**
   * Class CSS tùy biến cho toàn bộ header
   */
  className?: string;

  /**
   * Nội dung ReactNode tùy chỉnh bên trong header
   */
  children?: ReactNode;
}

/**
 * Props cho component `<ConfirmBody>` (Phần thân chứa nội dung mô tả của Confirm)
 */
export interface ConfirmBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Kích thước áp dụng cho cỡ chữ và padding của body
   * @default 'md'
   */
  size?: ConfirmSize;

  /**
   * Đoạn văn bản mô tả ngắn (sẽ được bọc trong thẻ `<p>`)
   */
  description?: ReactNode;

  /**
   * Class CSS tùy biến riêng cho thẻ `<p>` mô tả
   */
  descriptionClassName?: string;

  /**
   * Class CSS tùy biến cho toàn bộ body
   */
  className?: string;

  /**
   * Nội dung con tùy biến bên trong body
   */
  children?: ReactNode;
}

/**
 * Props cho component `<ConfirmFooter>` (Phần chân chứa các nút hành động xác nhận và hủy)
 */
export interface ConfirmFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Kích thước áp dụng cho padding và kích thước các nút bấm
   * @default 'md'
   */
  size?: ConfirmSize;

  /**
   * Nhãn văn bản cho nút Xác nhận
   * @default 'Xác nhận'
   */
  confirmText?: ReactNode;

  /**
   * Nhãn văn bản cho nút Hủy (truyền `false` để ẩn nút Hủy)
   * @default 'Hủy'
   */
  cancelText?: ReactNode | false;

  /**
   * Biến thể của nút Xác nhận ('filled', 'outline', 'soft', ...)
   * @default 'filled'
   */
  confirmVariant?: ButtonVariant;

  /**
   * Biến thể của nút Hủy ('filled', 'outline', 'soft', ...)
   * @default 'outline'
   */
  cancelVariant?: ButtonVariant;

  /**
   * Màu nút Xác nhận tùy chỉnh (mặc định lấy theo `color`)
   */
  confirmColor?: ButtonColor;

  /**
   * Màu nút Hủy
   * @default 'secondary'
   */
  cancelColor?: ButtonColor;

  /**
   * Callback khi người dùng bấm nút Xác nhận (trả về void hoặc Promise)
   */
  onConfirm?: () => void | Promise<unknown>;

  /**
   * Callback khi người dùng bấm nút Hủy
   */
  onCancel?: () => void;

  /**
   * Callback đóng hộp thoại
   */
  onClose?: () => void;

  /**
   * Props bổ sung truyền trực tiếp cho component Button Xác nhận
   */
  confirmButtonProps?: Partial<ButtonProps>;

  /**
   * Props bổ sung truyền trực tiếp cho component Button Hủy
   */
  cancelButtonProps?: Partial<ButtonProps>;

  /**
   * Class CSS tùy biến cho khối footer
   */
  className?: string;

  /**
   * Các nút bấm tùy chỉnh bên trong footer (khi dùng Pure Compound Pattern)
   */
  children?: ReactNode;
}

/**
 * Props cho component `<ConfirmContainer>` (Tầng Wrapper quản lý Overlay Backdrop, Native Dialog, ESC & Animation)
 */
export interface ConfirmContainerProps extends HTMLAttributes<HTMLDialogElement> {
  /**
   * Trạng thái hiển thị mở/đóng Confirm (Controlled State)
   * @default false
   */
  open?: boolean;

  /**
   * Callback được kích hoạt khi Confirm đóng (click ra ngoài backdrop, nhấn phím ESC, hoặc click nút đóng X)
   */
  onClose?: () => void;

  /**
   * Kích thước tổng thể của Confirm (truyền xuống context để đồng bộ kích thước cho Confirm, Header, Body, Footer)
   * @default 'md'
   */
  size?: ConfirmSize;

  /**
   * Chủ đề màu sắc tổng thể của Confirm (truyền xuống context để đồng bộ cho Confirm, Header, Footer)
   * @default 'warning'
   */
  color?: ConfirmColor;

  /**
   * Trạng thái đang tải / xử lý (Loading).
   * Khi `isLoading = true`:
   * - Chặn đóng Confirm khi click vào vùng backdrop overlay (`closeOnOverlayClick`)
   * - Chặn đóng Confirm khi nhấn phím ESC (`closeOnEsc`)
   * - Chặn đóng Confirm từ nút đóng (X) và component `<ConfirmClose>`
   * @default false
   */
  isLoading?: boolean;

  /**
   * Cho phép tự động đóng Confirm khi người dùng click vào vùng backdrop overlay bên ngoài
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Cho phép tự động đóng Confirm khi người dùng nhấn phím ESC (Escape) trên bàn phím
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Tự động khóa cuộn trang (body scroll lock) khi Confirm đang hiển thị
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
   * Nội dung bên trong container (thường là component `<Confirm>`)
   */
  children?: ReactNode;
}

/**
 * Props cho component `<ConfirmClose>` (Wrapper tự động kích hoạt đóng Confirm có Exit Animation cho bất kỳ nút bấm nào)
 */
export interface ConfirmCloseProps extends HTMLAttributes<HTMLElement> {
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
