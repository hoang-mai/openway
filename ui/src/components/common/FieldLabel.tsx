import { ReactNode } from "react";

export interface FieldLabelProps {
  /**
   * Nội dung nhãn hiển thị (hoặc truyền qua children)
   */
  label?: ReactNode;

  /**
   * Nội dung nhãn con (thay thế cho prop label)
   */
  children?: ReactNode;

  /**
   * ID của phần tử input / control tương ứng để liên kết thuộc tính htmlFor
   */
  htmlFor?: string;

  /**
   * ID của chính phần tử label (dùng cho aria-labelledby)
   */
  id?: string;

  /**
   * Đánh dấu trường bắt buộc (hiển thị dấu sao đỏ *)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Hiển thị nhãn nổi trên viền khung (floating)
   * @default false
   */
  isFloating?: boolean;

  /**
   * Vị trí nhãn: "top" | "left" | "floating"
   * Nếu truyền "floating" thì tự động kích hoạt isFloating
   */
  placement?: "top" | "left" | "floating";

  /**
   * Kích thước nhãn: xs, sm, md, lg, xl
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * ClassName tùy biến kích thước trực tiếp nếu có cấu hình riêng (vd: currentSize.label, currentSize.floatingLabel)
   */
  sizeClassName?: string;

  /**
   * Chủ đề màu sắc nhãn
   * @default "primary"
   */
  color?: string;

  /**
   * Trạng thái lỗi (ưu tiên đổi màu sang error)
   * @default false
   */
  hasError?: boolean;

  /**
   * Trạng thái không hợp lệ (alias cho hasError)
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Kiểu con trỏ chuột: "text" | "pointer" | "default"
   * Mặc định: "cursor-text" khi isFloating, ngược lại không gán cursor cố định
   */
  cursor?: "text" | "pointer" | "default";

  /**
   * ClassName tùy biến bổ sung (vd: labelClassName)
   */
  className?: string;

  /**
   * Cấu hình bảng màu tùy biến (nếu không dùng bảng màu mặc định)
   */
  colorConfig?: Record<string, string>;

  /**
   * Trạng thái khi trường đang mở dropdown/popover (giữ màu highlight của nhãn khi focus chuyển sang floating)
   * @default false
   */
  isOpen?: boolean;
}

export const defaultLabelColorConfig: Record<string, string> = {
  primary:
    "text-neutral-700 group-focus-within/field:text-primary-600 group-data-[state=open]/field:text-primary-600 group-data-[state=open]:text-primary-600 group-aria-expanded/field:text-primary-600 data-[state=open]:text-primary-600",
  secondary:
    "text-neutral-700 group-focus-within/field:text-secondary-600 group-data-[state=open]/field:text-secondary-600 group-data-[state=open]:text-secondary-600 group-aria-expanded/field:text-secondary-600 data-[state=open]:text-secondary-600",
  error:
    "text-error-600 group-focus-within/field:text-error-600 group-data-[state=open]/field:text-error-600 group-data-[state=open]:text-error-600 group-aria-expanded/field:text-error-600 data-[state=open]:text-error-600",
  success:
    "text-neutral-700 group-focus-within/field:text-success-600 group-data-[state=open]/field:text-success-600 group-data-[state=open]:text-success-600 group-aria-expanded/field:text-success-600 data-[state=open]:text-success-600",
  warning:
    "text-neutral-700 group-focus-within/field:text-warning-600 group-data-[state=open]/field:text-warning-600 group-data-[state=open]:text-warning-600 group-aria-expanded/field:text-warning-600 data-[state=open]:text-warning-600",
  info:
    "text-neutral-700 group-focus-within/field:text-info-600 group-data-[state=open]/field:text-info-600 group-data-[state=open]:text-info-600 group-aria-expanded/field:text-info-600 data-[state=open]:text-info-600",
  neutral:
    "text-neutral-700 group-focus-within/field:text-neutral-900 group-data-[state=open]/field:text-neutral-900 group-data-[state=open]:text-neutral-900 group-aria-expanded/field:text-neutral-900 data-[state=open]:text-neutral-900",
};

export const defaultLabelSizeConfig: Record<
  "xs" | "sm" | "md" | "lg" | "xl",
  { label: string; floatingLabel: string }
> = {
  xs: {
    label: "text-[11px] mb-1",
    floatingLabel: "text-[10px]",
  },
  sm: {
    label: "text-xs mb-1",
    floatingLabel: "text-[10px]",
  },
  md: {
    label: "text-sm mb-1.5",
    floatingLabel: "text-[11px]",
  },
  lg: {
    label: "text-base mb-1.5",
    floatingLabel: "text-xs",
  },
  xl: {
    label: "text-lg mb-2",
    floatingLabel: "text-xs",
  },
};

/**
 * Component nội bộ dùng chung render nhãn (label) cho các trường form (Input, TextArea, Select, Pickers...)
 * Hỗ trợ trạng thái floating, validation error, focus reactiveness và accessibility WAI-ARIA.
 * (Không export ra ngoài package)
 */
export default function FieldLabel({
  label,
  children,
  htmlFor,
  id,
  isRequired = false,
  isFloating: isFloatingProp,
  placement,
  size = "md",
  sizeClassName,
  color = "primary",
  hasError = false,
  isInvalid = false,
  cursor,
  className = "",
  colorConfig = defaultLabelColorConfig,
  isOpen = false,
}: FieldLabelProps) {
  const content = label ?? children;
  if (!content) return null;

  const isFloating = isFloatingProp ?? (placement === "floating");
  const isErrorState = Boolean(hasError || isInvalid);

  const activeColor = isErrorState ? "error" : color;
  const labelColorStyle = isErrorState
    ? "text-error-600 font-medium"
    : colorConfig[activeColor] || defaultLabelColorConfig[activeColor] || defaultLabelColorConfig.primary;

  const sizeStyles = defaultLabelSizeConfig[size] || defaultLabelSizeConfig.md;
  const currentSizeClass = sizeClassName || (isFloating ? sizeStyles.floatingLabel : sizeStyles.label);

  const cursorClass = cursor
    ? `cursor-${cursor}`
    : isFloating
    ? "cursor-text"
    : "";

  if (isFloating) {
    return (
      <label
        htmlFor={htmlFor}
        id={id}
        data-state={isOpen ? "open" : "closed"}
        className={`absolute top-0 -translate-y-1/2 left-3 px-1.5 rounded-sm select-none z-10 font-medium bg-neutral-white transition-colors duration-150 ${cursorClass} ${currentSizeClass} ${labelColorStyle} ${className}`}
      >
        {content}
        {isRequired && (
          <span className="text-error-500 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }

  return (
    <label
      htmlFor={htmlFor}
      id={id}
      data-state={isOpen ? "open" : "closed"}
      className={`inline-flex items-center font-medium transition-colors duration-150 ${cursorClass} ${currentSizeClass} ${labelColorStyle} ${className}`}
    >
      {content}
      {isRequired && (
        <span className="text-error-500 ml-0.5" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
