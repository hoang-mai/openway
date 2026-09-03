import { ConfirmFooterProps } from "./types";
import { sizeConfig } from "./constants";
import Button from "../button/Button";
import { useConfirmContext } from "./ConfirmContext";
import { getSafeConfig } from "@/utils/function";

/**
 * Phần chân của hộp thoại Confirm (Chứa các nút hành động Xác nhận, Hủy, hoặc các nút tùy chỉnh)
 */
export default function ConfirmFooter({
  size,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  confirmVariant = "filled",
  cancelVariant = "outline",
  confirmColor,
  cancelColor = "secondary",
  onConfirm,
  onCancel,
  onClose,
  confirmButtonProps,
  cancelButtonProps,
  className = "",
  children,
  ...props
}: ConfirmFooterProps) {
  const confirmContext = useConfirmContext();
  const currentSize = getSafeConfig(size ?? confirmContext?.size, sizeConfig, "md");
  const currentConfirmColor = confirmColor ?? confirmContext?.color ?? "warning";


  const triggerClose = () => {
    onClose?.();
    confirmContext?.onClose?.();
  };

  const handleConfirm = async () => {
    try {
      const result = onConfirm?.();
      // Nếu onConfirm là Promise, nếu thành công thì mới đóng Confirm
      if (result && 'then' in result) {
        await result;
      }
      triggerClose();
    } catch { /* empty */ }
  };

  const handleCancel = () => {
    onCancel?.();
    triggerClose();
  };

  if (children) {
    return (
      <div
        className={`flex items-center justify-end w-full ${currentSize.footer} ${currentSize.buttonGap} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-end w-full ${currentSize.footer} ${currentSize.buttonGap} ${className}`}
      {...props}
    >
      {cancelText !== false && (
        <Button
          size={currentSize.buttonSize}
          variant={cancelVariant}
          color={cancelColor}
          onClick={handleCancel}
          disabled={cancelButtonProps?.disabled || confirmContext?.isLoading}
          {...cancelButtonProps}
        >
          {cancelText}
        </Button>
      )}

      <Button
        size={currentSize.buttonSize}
        variant={confirmVariant}
        color={currentConfirmColor}
        isLoading={confirmContext?.isLoading || confirmButtonProps?.isLoading}
        disabled={confirmButtonProps?.disabled}
        onClick={handleConfirm}
        {...confirmButtonProps}
      >
        {confirmText}
      </Button>
    </div>
  );
}
