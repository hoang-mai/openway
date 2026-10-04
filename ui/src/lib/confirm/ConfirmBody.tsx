import { ConfirmBodyProps } from "./types";
import { sizeConfig } from "./constants";
import { useConfirmContext } from "./ConfirmContext";
import { getSafeConfig } from "@/utils/function";

/**
 * Phần thân của hộp thoại Confirm (Hiển thị nội dung mô tả hoặc nội dung tùy biến)
 */
export default function ConfirmBody({
  size,
  description,
  descriptionClassName = "",
  className = "",
  children,
  ...props
}: ConfirmBodyProps) {
  const confirmContext = useConfirmContext();
  const currentSize = getSafeConfig(size ?? confirmContext?.size, sizeConfig, "md");

  return (
    <div
      className={`w-full ${currentSize.body} ${className}`}
      id="confirm-dialog-description"
      {...props}
    >
      {description ? (
        <p className={`${currentSize.description} ${descriptionClassName}`}>{description}</p>
      ) : null}
      {children}
    </div>
  );
}
