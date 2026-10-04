import { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";

/**
 * Kích thước hiển thị chung của Carousel (nút điều hướng, thanh phân trang, font chữ):
 * - `sm`: Nhỏ, phù hợp không gian hẹp
 * - `md`: Tiêu chuẩn (mặc định)
 * - `lg`: Lớn, nổi bật
 */
export type CarouselSize = "sm" | "md" | "lg";

/**
 * Tùy chỉnh độ bo góc cho container và các thành phần bên trong Carousel:
 * - `none`: Không bo góc
 * - `sm`: Bo góc nhỏ
 * - `md`: Bo góc vừa (mặc định)
 * - `lg`: Bo góc lớn
 * - `xl`: Bo góc rất lớn
 * - `full`: Bo tròn hoàn toàn
 */
export type CarouselRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Kiểu dáng hiển thị của bộ phân trang (Pagination):
 * - `dots`: Các chấm tròn tinh gọn (mặc định)
 * - `line`: Thanh gạch ngang mở rộng khi active
 * - `fraction`: Hiển thị dạng số tỉ lệ (ví dụ: 1 / 4)
 * - `none`: Không hiển thị phân trang
 */
export type CarouselPaginationType = "dots" | "line" | "fraction" | "none";

/**
 * Vị trí hiển thị của nút điều hướng:
 * - `inside`: Nằm sát bên trong 2 mép khung nhìn
 * - `outside`: Nằm ở phía ngoài 2 bên khung nhìn
 */
export type CarouselArrowPosition = "inside" | "outside";

/**
 * Biến thể giao diện của nút điều hướng (Previous/Next buttons):
 * - `glass`: Kính mờ trong suốt frosted glass (mặc định)
 * - `filled`: Nền màu thương hiệu đậm (primary filled)
 * - `outline`: Khung viền nét đơn
 * - `ghost`: Trong suốt, chỉ hiện nền khi rê chuột (hover)
 */
export type CarouselNavigationVariant = "glass" | "filled" | "outline" | "ghost";

/**
 * Giá trị và các phương thức điều khiển được cung cấp qua CarouselContext
 */
export interface CarouselContextValue {
  /** Chỉ số slide đang hiển thị */
  currentIndex: number;
  /** Tổng số lượng slide đã đăng ký */
  totalSlides: number;
  /** Số lượng slide hiển thị đồng thời trên một khung nhìn */
  slidesToShow: number;
  /** Số lượng slide dịch chuyển mỗi lần cuộn */
  slidesToScroll: number;
  /** Khoảng cách gap giữa các slide */
  spacing: number | string;
  /** Trạng thái cuộn vô hạn (loop) */
  loop: boolean;
  /** Có thể cuộn về slide trước đó hay không */
  canScrollPrev: boolean;
  /** Có thể cuộn tới slide tiếp theo hay không */
  canScrollNext: boolean;
  /** Kích thước chung của carousel */
  size: CarouselSize;
  /** Độ bo góc của carousel */
  radius: CarouselRadius;
  /** Thời gian chuyển đổi hiệu ứng (ms) */
  transitionDuration: number;
  /** Người dùng có đang thao tác kéo/vuốt hay không */
  isDragging: boolean;
  /** Khoảng cách kéo hiện tại theo trục X (px) */
  dragOffset: number;
  /** Hàm điều hướng về slide trước đó */
  scrollPrev: () => void;
  /** Hàm điều hướng tới slide tiếp theo */
  scrollNext: () => void;
  /** Hàm nhảy trực tiếp tới chỉ số slide cụ thể */
  scrollTo: (index: number) => void;
  /** Đăng ký một slide mới vào carousel context */
  registerSlide: (id: string) => void;
  /** Hủy đăng ký slide khỏi carousel context khi unmount */
  unregisterSlide: (id: string) => void;
  /** Cập nhật tổng số lượng slide */
  setTotalSlides: (total: number) => void;
  /** Ref đến khung nhìn viewport của CarouselContent */
  viewportRef: Ref<HTMLDivElement>;
  /** Ref đến container chứa danh sách slide */
  containerRef: Ref<HTMLDivElement>;
  /** Xử lý sự kiện nhấn con trỏ / bắt đầu chạm (drag) */
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  /** Xử lý sự kiện di chuyển con trỏ (drag/swipe) */
  handlePointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  /** Xử lý sự kiện thả con trỏ / kết thúc vuốt */
  handlePointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  /** Xử lý sự kiện hủy thao tác con trỏ */
  handlePointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void;
  /** Xử lý sự kiện phím điều hướng (ArrowLeft, ArrowRight, Home, End) */
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  /** Xử lý khi rê chuột vào container (tạm dừng autoplay) */
  handleMouseEnter: () => void;
  /** Xử lý khi rời chuột khỏi container (tiếp tục autoplay) */
  handleMouseLeave: () => void;
  /** Xử lý khi container nhận focus */
  handleFocus: () => void;
  /** Xử lý khi container mất focus */
  handleBlur: () => void;
}

/**
 * Props cho component container chính `<Carousel>`
 */
export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Ref đến phần tử DOM ngoài cùng của Carousel
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Chỉ số slide đang active (Controlled mode)
   */
  currentIndex?: number;

  /**
   * Chỉ số slide mặc định khi khởi tạo (Uncontrolled mode)
   * @default 0
   */
  defaultIndex?: number;

  /**
   * Callback kích hoạt khi chỉ số slide thay đổi
   */
  onIndexChange?: (index: number) => void;

  /**
   * Cho phép cuộn vòng tròn vô hạn (Infinite loop)
   * @default false
   */
  loop?: boolean;

  /**
   * Số lượng slide hiển thị đồng thời trên một khung nhìn
   * @default 1
   */
  slidesToShow?: number;

  /**
   * Số lượng slide di chuyển mỗi lần cuộn
   * @default 1
   */
  slidesToScroll?: number;

  /**
   * Khoảng cách giữa các slide (gap tính theo px hoặc chuỗi CSS)
   * @default 0
   */
  spacing?: number | string;

  /**
   * Tự động chuyển slide định kỳ (Autoplay)
   * @default true
   */
  autoPlay?: boolean;

  /**
   * Thời gian chờ giữa mỗi lần tự động chuyển slide (ms)
   * @default 3000
   */
  interval?: number;

  /**
   * Thời gian hiệu ứng chuyển đổi giữa các slide (ms)
   * @default 650
   */
  transitionDuration?: number;

  /**
   * Tạm dừng autoplay khi rê chuột vào carousel
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Tạm dừng autoplay khi focus vào carousel
   * @default true
   */
  pauseOnFocus?: boolean;

  /**
   * Cho phép kéo/vuốt bằng chuột hoặc ngón tay (Touch / Pointer drag)
   * @default true
   */
  draggable?: boolean;

  /**
   * Kích thước chung của carousel
   * @default "md"
   */
  size?: CarouselSize;

  /**
   * Bo góc của carousel container và elements
   * @default "md"
   */
  radius?: CarouselRadius;

  /**
   * Các component con bên trong Carousel (theo mô hình Declarative Compound Components)
   */
  children?: ReactNode;
}

/**
 * Props cho khung trượt nội dung `<CarouselContent>`
 */
export interface CarouselContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref đến dải trượt track */
  ref?: Ref<HTMLDivElement>;
  /** Danh sách các slide `<CarouselSlide>` */
  children?: ReactNode;
}

/**
 * Props cho từng slide đơn lẻ `<CarouselSlide>`
 */
export interface CarouselSlideProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref đến phần tử DOM slide */
  ref?: Ref<HTMLDivElement>;
  /** Chỉ số vị trí của slide */
  index?: number;
  /** Nội dung bên trong slide */
  children?: ReactNode;
}

/**
 * Props cho nút điều hướng trước/sau `<CarouselPrevious>` & `<CarouselNext>`
 */
export interface CarouselNavigationProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ref đến phần tử button */
  ref?: Ref<HTMLButtonElement>;
  /**
   * Biến thể hiển thị giao diện của nút
   * @default "glass"
   */
  variant?: CarouselNavigationVariant;
  /** Biểu tượng tùy biến (mặc định là chevron) */
  icon?: ReactNode;
}

/**
 * Props cho bộ hiển thị phân trang `<CarouselPagination>`
 */
export interface CarouselPaginationProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref đến container phân trang */
  ref?: Ref<HTMLDivElement>;
  /**
   * Kiểu dáng hiển thị phân trang
   * @default "dots"
   */
  type?: CarouselPaginationType;
  /**
   * Cho phép người dùng click vào nút để chuyển slide
   * @default true
   */
  clickable?: boolean;
}

