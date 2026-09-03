import { InputHTMLAttributes, ReactNode, Ref } from "react";
import type { BadgeColor, BadgeRadius, BadgeSize, BadgeVariant } from "@/components/badge/types";

export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";
export type InputVariant = "outline" | "filled" | "ghost" | "other";
export type InputColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "neutral";
export type InputRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type LabelPlacement = "top" | "left" | "floating";

export interface InputConfig {
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
   * Hiển thị nút xóa nhanh nội dung khi input có giá trị
   * @default false
   */
  isClearable?: boolean;

  /**
   * Mở rộng chiều rộng 100% của container chứa
   * @default false
   */
  isFullWidth?: boolean;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: InputConfig;

  /**
   * Ref chuyển tiếp đến phần tử HTML input (React 19)
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Kích cỡ của input:
   * - 'xs': 24px (h-6, text-[11px])
   * - 'sm': 32px (h-8, text-xs)
   * - 'md': 40px (h-10, text-sm - mặc định)
   * - 'lg': 48px (h-12, text-base)
   * - 'xl': 56px (h-14, text-lg)
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Biến thể giao diện của input:
   * - 'outline': viền nét quanh ô (mặc định)
   * - 'filled': nền nhạt pastel, có viền mờ
   * - 'ghost': nền trong suốt, viền tối giản
   * - 'other': không áp dụng style mặc định, tự do tùy biến qua className
   * @default 'outline'
   */
  variant?: InputVariant;

  /**
   * Chủ đề màu sắc khi focus hoặc kích hoạt
   * @default 'primary'
   */
  color?: InputColor;

  /**
   * Tùy chỉnh độ bo góc:
   * - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   * @default theo từng `size` (xs: rounded, sm: rounded-md, md: rounded-lg, lg: rounded-xl, xl: rounded-2xl)
   */
  radius?: InputRadius;

  // ==================== LABEL & FORM FIELD ====================
  /**
   * Nhãn hiển thị cho input
   */
  label?: ReactNode;

  /**
   * Vị trí đặt nhãn:
   * - 'floating': Nhãn lơ lửng, nằm ở giữa đường viền khi focus hoặc có giá trị (mặc định)
   * - 'top': Nằm phía trên ô input
   * - 'left': Nằm ngang bên trái ô input
   * @default 'floating'
   */
  labelPlacement?: LabelPlacement;

  /**
   * Đánh dấu trường bắt buộc nhập (hiển thị dấu * đỏ cạnh label)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Đoạn văn bản hướng dẫn/chú thích bên dưới input
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi hiển thị bên dưới input (khi có errorMessage sẽ tự động kích hoạt trạng thái báo lỗi)
   */
  errorMessage?: ReactNode;

  /**
   * Trạng thái báo lỗi (viền đỏ, aria-invalid="true")
   * @default false
   */
  isInvalid?: boolean;

  // ==================== SLOTS & ACTIONS ====================
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
   * Icon hoặc phần tử hiển thị ở đầu ô input
   */
  leftIcon?: ReactNode;

  /**
   * Addon / prefix cố định hiển thị ở đầu ô input (vd: 'https://', '+84')
   */
  leftAddon?: ReactNode;

  /**
   * Icon hoặc phần tử hiển thị ở cuối ô input
   */
  rightIcon?: ReactNode;

  /**
   * Addon / suffix cố định hiển thị ở cuối ô input (vd: '.com', 'kg')
   */
  rightAddon?: ReactNode;

  /**
   * Hiển thị nút xóa nhanh nội dung khi input có giá trị
   * @default false
   */
  isClearable?: boolean;

  /**
   * Callback khi người dùng nhấn nút xóa nội dung
   */
  onClear?: () => void;

  // ==================== LAYOUT & CUSTOMIZATION ====================
  /**
   * Mở rộng chiều rộng 100% của container chứa
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * Tùy biến className cho container bọc toàn bộ (bao gồm label, input wrapper, helper/error text)
   */
  wrapperClassName?: string;

  /**
   * Tùy biến className cho container bao quanh riêng ô input và các icon/addon
   */
  inputWrapperClassName?: string;

  /**
   * Tùy biến className cho phần tử <label>
   */
  labelClassName?: string;

  /**
   * Tùy biến className cho đoạn văn bản helperText hoặc errorMessage
   */
  helperClassName?: string;
}

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  /**
   * Nhãn accessibility cho nút chuyển đổi ẩn/hiện mật khẩu
   * @default 'Toggle password visibility'
   */
  toggleAriaLabel?: string;

  /**
   * Mặc định hiển thị mật khẩu hay không
   * @default false
   */
  defaultVisible?: boolean;

  /**
   * Callback khi thay đổi trạng thái ẩn/hiện mật khẩu
   */
  onVisibilityChange?: (visible: boolean) => void;
}

export interface NumberInputProps extends Omit<InputProps, "type" | "value" | "defaultValue"> {
  /**
   * Giá trị số hoặc chuỗi đã được định dạng (vd: 1000000 hoặc "1.000.000" hoặc "1.000.000,50")
   */
  value?: string | number | null;

  /**
   * Giá trị mặc định ban đầu khi khởi tạo (Uncontrolled)
   */
  defaultValue?: string | number | null;

  /**
   * Giá trị nhỏ nhất cho phép
   */
  min?: number;

  /**
   * Giá trị lớn nhất cho phép (nếu nhập vượt quá, tự động đưa về max)
   */
  max?: number;

  /**
   * Ký tự phân cách hàng nghìn. Mặc định "." (Việt Nam)
   * @default '.'
   */
  thousandSeparator?: string;

  /**
   * Ký tự phân cách thập phân. Mặc định "," (Việt Nam)
   * @default ','
   */
  decimalSeparator?: string;

  /**
   * Số chữ số thập phân tối đa. Mặc định 0 (số nguyên).
   * @default 0
   */
  maxDecimalDigits?: number;

  /**
   * Cho phép nhập số âm hay không. Mặc định true nếu min < 0 hoặc min chưa định nghĩa.
   */
  allowNegative?: boolean;
}

// ==================== OTP INPUT ====================

export type OtpInputType = "numeric" | "alphanumeric" | "password";

export interface OtpInputRef {
  /**
   * Lấy toàn bộ chuỗi giá trị OTP hiện tại
   */
  getValue: () => string;

  /**
   * Xóa toàn bộ ký tự trong các ô và focus về ô đầu tiên
   */
  clear: () => void;

  /**
   * Focus vào ô chỉ định (mặc định ô đầu tiên index = 0)
   */
  focus: (index?: number) => void;
}

export interface OtpInputConfig {
  /**
   * Đánh dấu trường bắt buộc nhập
   * @default false
   */
  isRequired?: boolean;

  /**
   * Trạng thái báo lỗi
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
}

export interface OtpInputProps {
  /**
   * Ref cung cấp các phương thức điều khiển: getValue(), clear(), focus()
   */
  ref?: Ref<OtpInputRef>;

  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: OtpInputConfig;

  /**
   * ID tùy biến cho input
   */
  id?: string;

  /**
   * Tên trường form input cho form submission
   */
  name?: string;

  /**
   * Số lượng ô ký tự OTP
   * @default 6
   */
  length?: number;

  /**
   * Giá trị OTP (Controlled component)
   */
  value?: string;

  /**
   * Giá trị mặc định ban đầu (Uncontrolled component)
   */
  defaultValue?: string;

  /**
   * Callback kích hoạt mỗi khi giá trị thay đổi
   */
  onChange?: (value: string) => void;

  /**
   * Callback kích hoạt khi người dùng đã điền đủ tất cả các ô
   */
  onComplete?: (value: string) => void;

  /**
   * Kiểu ký tự cho phép:
   * - 'numeric': Chỉ nhận số (0-9) - mặc định
   * - 'alphanumeric': Nhận chữ và số
   * - 'password': Nhận chữ/số và ẩn ký tự
   * @default 'numeric'
   */
  type?: OtpInputType;

  /**
   * Ẩn ký tự đã nhập (dạng chấm tròn • hoặc ký tự tùy biến)
   * @default false
   */
  mask?: boolean | string;

  /**
   * Kích cỡ của các ô OTP:
   * - 'xs': 24x24px
   * - 'sm': 32x32px
   * - 'md': 40x40px (mặc định)
   * - 'lg': 48x48px
   * - 'xl': 56x56px
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Biến thể giao diện:
   * - 'outline' | 'filled' | 'ghost' | 'other'
   * @default 'outline'
   */
  variant?: InputVariant;

  /**
   * Chủ đề màu sắc khi focus hoặc kích hoạt
   * @default 'primary'
   */
  color?: InputColor;

  /**
   * Tùy chỉnh độ bo góc cho từng ô
   * @default theo từng size
   */
  radius?: InputRadius;

  /**
   * Tự động focus vào ô đầu tiên khi component được mount
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Vô hiệu hóa toàn bộ input
   * @default false
   */
  disabled?: boolean;

  /**
   * Chỉ đọc, không cho chỉnh sửa
   * @default false
   */
  readOnly?: boolean;

  /**
   * Số lượng ô trong mỗi nhóm (ví dụ: 3 cho nhóm 3-3)
   */
  groupSize?: number;

  /**
   * Ký tự hoặc ReactNode phân cách giữa các nhóm
   * @default '-'
   */
  separator?: ReactNode;

  /**
   * Nhãn aria-label cho container group
   * @default 'One-time password'
   */
  ariaLabel?: string;

  /**
   * Hàm tùy biến aria-label cho từng ô slot (hỗ trợ i18n)
   * @default (index, length) => `Digit ${index + 1} of ${length}`
   */
  getSlotAriaLabel?: (index: number, length: number) => string;

  /**
   * Cho phép trình duyệt và OS tự động điền mã OTP từ tin nhắn SMS (autoComplete="one-time-code")
   * @default true
   */
  allowOneTimeCode?: boolean;

  /**
   * Nhãn mô tả cho trường nhập OTP
   */
  label?: ReactNode;

  /**
   * Vị trí của label: 'top' | 'left'
   * @default 'top'
   */
  labelPlacement?: "top" | "left";

  /**
   * Văn bản hướng dẫn hiển thị bên dưới
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi (khi có lỗi, tự động chuyển màu sang error và rung/hiện animation)
   */
  errorMessage?: ReactNode;

  /**
   * Class tùy biến cho ô input slot
   */
  slotClassName?: string;

  /**
   * Class tùy biến cho container chứa các ô slot
   */
  className?: string;

  /**
   * Class tùy biến cho container ngoài cùng (bao gồm label & helper)
   */
  wrapperClassName?: string;

  /**
   * Class tùy biến cho nhãn <label>
   */
  labelClassName?: string;

  /**
   * Class tùy biến cho helperText / errorMessage
   */
  helperClassName?: string;
}

// ==================== MULTI INPUT TYPES ====================

export interface TagRenderProps {
  /**
   * Giá trị text của tag
   */
  value: string;

  /**
   * Vị trí index của tag trong mảng
   */
  index: number;

  /**
   * Hàm callback để xóa tag này
   */
  onRemove: () => void;

  /**
   * Trạng thái disabled của input
   */
  disabled?: boolean;

  /**
   * Trạng thái readOnly của input
   */
  readOnly?: boolean;
}

export interface MultiInputConfig {
  /**
   * Đánh dấu trường bắt buộc nhập (hiển thị dấu sao đỏ *)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Trạng thái báo lỗi
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
   * Cho phép nút xóa tất cả tags và text đang gõ
   * @default false
   */
  isClearable?: boolean;

  /**
   * Chiếm toàn bộ chiều rộng 100% của container cha
   * @default false
   */
  isFullWidth?: boolean;
}

export interface MultiInputProps {
  /**
   * Ref chuyển tiếp đến thẻ HTML input bên trong (React 19)
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Cấu hình tập trung các cờ trạng thái / tính năng
   */
  config?: MultiInputConfig;

  /**
   * Danh sách các giá trị tags (Controlled)
   */
  value?: string[];

  /**
   * Danh sách các giá trị tags mặc định ban đầu (Uncontrolled)
   */
  defaultValue?: string[];

  /**
   * Callback khi danh sách tags thay đổi (thêm, xóa, clear)
   */
  onChange?: (values: string[]) => void;

  /**
   * Giá trị chuỗi text đang gõ trong ô input (Controlled)
   */
  inputValue?: string;

  /**
   * Callback khi giá trị chuỗi text đang gõ thay đổi
   */
  onInputValueChange?: (value: string) => void;

  /**
   * Ký tự / phím kích hoạt tạo tag.
   * Mặc định là `['Enter']`
   */
  delimiters?: string[];

  /**
   * Hiển thị nút Add (+) ở cuối input để thêm tag khi click
   * @default false
   */
  showAddButton?: boolean;

  /**
   * Tùy biến render nút Add ở cuối
   */
  renderAddButton?: (props: { onAdd: () => void; disabled?: boolean }) => ReactNode;

  /**
   * Tự động thêm tag từ text đang gõ khi click ra ngoài (blur)
   * @default false
   */
  addOnBlur?: boolean;

  /**
   * Tự động phân tách chuỗi khi paste (ví dụ paste 'apple, banana, orange')
   * @default true
   */
  addOnPaste?: boolean;

  /**
   * Regex hoặc chuỗi ký tự dùng để phân tách khi Paste
   * @default /[\r\n,;\t]+/
   */
  pasteSplitRegex?: RegExp;

  /**
   * Tự động trim khoảng trắng ở đầu và cuối mỗi tag
   * @default true
   */
  trimValues?: boolean;

  /**
   * Cho phép các tag trùng lặp hay không
   * @default false
   */
  allowDuplicates?: boolean;

  /**
   * Callback khi người dùng cố gắng thêm tag bị trùng lặp
   */
  onDuplicate?: (value: string) => void;

  /**
   * Số lượng tag tối đa cho phép nhập
   */
  maxTags?: number;

  /**
   * Callback khi đạt giới hạn maxTags và người dùng cố gắng thêm tag mới
   */
  onMaxTagsReached?: (value: string) => void;

  /**
   * Độ dài ký tự tối đa của 1 tag
   */
  maxTagLength?: number;

  /**
   * Hàm kiểm tra tính hợp lệ của từng tag (vd kiểm tra email, regex,...)
   * Trả về true nếu hợp lệ, hoặc false/string báo lỗi nếu không hợp lệ
   */
  validateTag?: (tag: string) => boolean | string;

  /**
   * Callback khi tag không vượt qua validateTag
   */
  onValidateError?: (tag: string, error?: string) => void;

  /**
   * Số lượng tag tối đa hiển thị trước khi thu gọn thành '+N'
   */
  maxTagCount?: number;

  /**
   * Tùy biến hiển thị tag hoàn toàn
   */
  renderTag?: (props: TagRenderProps) => ReactNode;

  /**
   * Biến thể giao diện của Badge tag bên trong
   * @default 'soft'
   */
  tagVariant?: BadgeVariant;

  /**
   * Chủ đề màu của Badge tag bên trong
   * @default 'primary'
   */
  tagColor?: BadgeColor;

  /**
   * Tùy chỉnh độ bo góc của Badge tag. Nếu không truyền, Badge tự động thừa hưởng radius của Input
   */
  tagRadius?: BadgeRadius;

  /**
   * Kích thước của Badge tag bên trong. Nếu không truyền, tự động đồng bộ theo InputSize
   */
  tagSize?: BadgeSize;

  // ==================== DESIGN SYSTEM & FORM PROPS ====================
  /**
   * Kích cỡ của MultiInput
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Biến thể giao diện của MultiInput
   * @default 'outline'
   */
  variant?: InputVariant;

  /**
   * Chủ đề màu sắc
   * @default 'primary'
   */
  color?: InputColor;

  /**
   * Tùy chỉnh độ bo góc
   */
  radius?: InputRadius;

  /**
   * Nhãn hiển thị cho MultiInput
   */
  label?: ReactNode;

  /**
   * Vị trí đặt nhãn
   * @default 'floating'
   */
  labelPlacement?: LabelPlacement;

  /**
   * Đoạn văn bản hướng dẫn bên dưới
   */
  helperText?: ReactNode;

  /**
   * Thông báo lỗi hiển thị bên dưới
   */
  errorMessage?: ReactNode;

  /**
   * Callback khi người dùng bấm nút xóa tất cả
   */
  onClear?: () => void;

  /**
   * Vô hiệu hóa tương tác
   * @default false
   */
  disabled?: boolean;

  /**
   * Chế độ chỉ đọc
   * @default false
   */
  readOnly?: boolean;

  /**
   * Placeholder cho ô input text
   */
  placeholder?: string;

  /**
   * ID của input element
   */
  id?: string;

  /**
   * Tên trường form input
   */
  name?: string;

  /**
   * Tự động focus vào input khi mount
   * @default false
   */
  autoFocus?: boolean;

  // ==================== ICONS & ADDONS ====================
  leftIcon?: ReactNode;
  leftAddon?: ReactNode;
  rightIcon?: ReactNode;
  rightAddon?: ReactNode;

  // ==================== CLASSNAMES ====================
  className?: string;
  wrapperClassName?: string;
  inputWrapperClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  tagClassName?: string;
  addButtonClassName?: string;
}
