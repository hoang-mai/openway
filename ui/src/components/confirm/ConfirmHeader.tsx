import React from "react";
import { ConfirmHeaderProps } from "./types";
import { sizeConfig, iconBadgeColorConfig, defaultIcons } from "./constants";
import CloseIcon from "../icons/CloseIcon";
import { useConfirmContext } from "./ConfirmContext";
import { getSafeConfig } from "@/utils/function";

/**
 * Phần đầu của hộp thoại Confirm (Hiển thị icon badge, tiêu đề và nút đóng X)
 */
export default function ConfirmHeader({
  size,
  color,
  icon = true,
  title,
  iconClassName = "",
  titleClassName = "",
  showCloseButton = false,
  onClose,
  closeButtonClassName = "",
  className = "",
  children,
  ...props
}: ConfirmHeaderProps) {
  const confirmContext = useConfirmContext();
  const currentSize = getSafeConfig(size ?? confirmContext?.size, sizeConfig, "md");
  const badgeStyle = getSafeConfig(color ?? confirmContext?.color, iconBadgeColorConfig, "warning");
  const isLoading = confirmContext?.isLoading;

  const handleClose = () => {
    onClose?.();
    confirmContext?.onClose?.();
  };

  const hasCloseHandler = Boolean(onClose || confirmContext?.onClose);

  const renderIcon = () => {
    if (icon === false) return null;

    if (icon !== undefined && icon !== true) {
      return (
        <div
          className={`inline-flex items-center justify-center shrink-0 ${currentSize.iconWrapper} ${badgeStyle} ${iconClassName}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      );
    }
    const IconComponent = getSafeConfig(color ?? confirmContext?.color, defaultIcons, "warning");
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 ${currentSize.iconWrapper} ${badgeStyle} ${iconClassName}`}
        aria-hidden="true"
      >
        <IconComponent className={currentSize.icon} />
      </div>
    );
  };

  return (
    <div className={`flex items-start justify-between w-full ${currentSize.header} ${className}`} {...props}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {renderIcon()}
        {title && (
          <h3 className={`${currentSize.title} truncate ${titleClassName}`} id="confirm-dialog-title">
            {title}
          </h3>
        )}
        {children}
      </div>

      {showCloseButton && hasCloseHandler && (
        <button
          type="button"
          onClick={handleClose}
          disabled={isLoading}
          aria-label="Đóng hộp thoại"
          className={`inline-flex items-center justify-center shrink-0 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${currentSize.closeButton} ${closeButtonClassName}`}
        >
          <CloseIcon className={currentSize.closeIcon} />
        </button>
      )}
    </div>
  );
}
