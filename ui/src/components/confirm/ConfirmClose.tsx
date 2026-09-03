import { cloneElement, isValidElement, MouseEvent, ReactElement } from "react";
import { ConfirmCloseProps } from "./types";
import { useConfirmContext } from "./ConfirmContext";

/**
 * Component wrapper kích hoạt đóng Confirm kèm hiệu ứng thoát (Exit Animation)
 * Tự động vô hiệu hóa (`disabled`) khi `isLoading = true`.
 */
export default function ConfirmClose({
  children,
  asChild = true,
  onClick,
  ...props
}: ConfirmCloseProps) {
  const confirmContext = useConfirmContext();
  const isLoading = confirmContext?.isLoading;

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      confirmContext?.onClose?.();
    }
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{
      onClick?: (e: MouseEvent<HTMLElement>) => void;
      disabled?: boolean;
    }>;
    return cloneElement(child, {
      disabled: child.props.disabled || isLoading,
      onClick: (e: MouseEvent<HTMLElement>) => {
        child.props.onClick?.(e);
        handleClick(e);
      },
      ...props,
    });
  }

  return (
    <button type="button" onClick={handleClick} disabled={isLoading} {...props}>
      {children}
    </button>
  );
}
