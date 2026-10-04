import { ReactNode } from "react";
import { useAnimatedError } from "@/hooks/useAnimatedError";

export interface HelperErrorTextProps {
  /**
   * ID của phần tử thông báo (dùng để liên kết với aria-describedby / aria-errormessage)
   */
  id?: string;

  /**
   * Nội dung văn bản hướng dẫn/trợ giúp
   */
  helperText?: ReactNode;

  /**
   * Nội dung thông báo lỗi
   */
  errorMessage?: ReactNode;

  /**
   * ClassName tùy biến kích thước văn bản và khoảng cách (vd: currentSize.helper)
   * @default "text-xs"
   */
  sizeClassName?: string;

  /**
   * ClassName tùy biến bổ sung (vd: helperClassName)
   */
  className?: string;
}

/**
 * Component nội bộ dùng chung hiển thị đoạn văn bản helperText hoặc errorMessage
 * với animation mượt mà (CSS Grid transition), tối ưu phần cứng và tuân thủ WAI-ARIA.
 * (Không export ra ngoài package)
 */
export default function HelperErrorText({
  id,
  helperText,
  errorMessage,
  sizeClassName = "text-xs",
  className = "",
}: HelperErrorTextProps) {
  const { displayedError, isExiting } = useAnimatedError(errorMessage);

  const activeText = displayedError || helperText;
  const hasMessage = Boolean(displayedError || helperText);
  const isShowingError = Boolean(displayedError);

  return (
    <div
      className={`grid transition-[grid-template-rows,opacity,margin] duration-200 ease-out overflow-hidden ${
        hasMessage ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
      }`}
      aria-live="polite"
    >
      <div className="overflow-hidden">
        <div
          id={id}
          role={isShowingError ? "alert" : "status"}
          className={`leading-tight transition-colors duration-200 font-normal ${sizeClassName} ${
            isShowingError
              ? isExiting
                ? "text-error-600 animate-error-out"
                : "text-error-600 animate-error-in"
              : "text-neutral-600"
          } ${className}`}
        >
          {activeText || "\u00A0"}
        </div>
      </div>
    </div>
  );
}
