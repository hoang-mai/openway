import React from "react";
import { ModalHeaderProps } from "./types";
import { sizeConfig } from "./constants";
import CloseIcon from "../icons/CloseIcon";
import { useModalContext } from "./ModalContext";
import { getSafeConfig } from "@/utils/function";

export default function ModalHeader({
  size,
  title,
  description,
  titleClassName = "",
  descriptionClassName = "",
  showCloseButton = true,
  onClose,
  closeButtonClassName = "",
  className = "",
  children,
  ...props
}: ModalHeaderProps) {
  const modalContext = useModalContext();
  const currentSize = getSafeConfig(size ?? modalContext?.size, sizeConfig, "md");
  const isLoading = modalContext?.isLoading;

  const handleClose = () => {
    onClose?.();
    modalContext?.onClose?.();
  };

  const hasCloseHandler = Boolean(onClose || modalContext?.onClose);

  return (
    <div
      className={`flex items-start justify-between w-full border-b border-neutral-100 pb-2 ${currentSize.header} ${className}`}
      {...props}
    >
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {title && (
          <h3
            id="modal-dialog-title"
            className={`${currentSize.title} truncate ${titleClassName}`}
          >
            {title}
          </h3>
        )}
        {description && (
          <p
            id="modal-dialog-description"
            className={`${currentSize.description} mt-0.5 ${descriptionClassName}`}
          >
            {description}
          </p>
        )}
        {children}
      </div>

      {showCloseButton && hasCloseHandler && (
        <button
          type="button"
          onClick={handleClose}
          disabled={isLoading}
          aria-label="Đóng hộp thoại"
          data-testid="modal-close-button"
          className={`inline-flex items-center justify-center shrink-0 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${currentSize.closeButton} ${closeButtonClassName}`}
        >
          <CloseIcon className={currentSize.closeIcon} />
        </button>
      )}
    </div>
  );
}
