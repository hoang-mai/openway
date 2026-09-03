import { cloneElement, isValidElement, MouseEvent, ReactElement } from "react";
import { ModalCloseProps } from "./types";
import { useModalContext } from "./ModalContext";

export default function ModalClose({
  children,
  asChild = true,
  onClick,
  ...props
}: ModalCloseProps) {
  const modalContext = useModalContext();
  const isLoading = modalContext?.isLoading;

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      modalContext?.onClose?.();
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
