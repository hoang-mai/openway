import { MouseEvent } from "react";
import { AlertProps } from "./types";
import { sizeConfig, radiusConfig, variantColorConfig, iconColorConfig, defaultIcons } from "./constants";
import CloseIcon from "../icons/CloseIcon";
import { getSafeConfig } from "@/utils/function";

export default function Alert({
  size,
  variant,
  color,
  radius,
  title,
  description,
  icon = true,
  action,
  closable = true,
  onClose,
  closeAriaLabel = "Đóng cảnh báo",
  banner = false,
  titleClassName = "",
  descriptionClassName = "",
  actionClassName = "",
  iconClassName = "",
  closeButtonClassName = "",
  className = "",
  children,
  role,
  ref,
  ...props
}: AlertProps) {

  const currentSize = getSafeConfig(size, sizeConfig, "md");

  const roundedClass = banner ? "rounded-none border-x-0 w-full" : getSafeConfig(radius, radiusConfig, "lg");

  const variantStyles = variant === "other" ? "" : getSafeConfig(color, getSafeConfig(variant, variantColorConfig, "soft"), "info");

  const iconColorStyle = variant === "other" ? "" : getSafeConfig(color, getSafeConfig(variant, iconColorConfig, "soft"), "info");

  const isClosable = closable || Boolean(onClose);

  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose?.();
  };

  const defaultRole = color === "error" || color === "warning" ? "alert" : "status";
  const activeRole = role || defaultRole;
  const ariaLive = color === "error" || color === "warning" ? "assertive" : "polite";

  const bodyContent = description ?? children;
  const hasBody = Boolean(bodyContent);

  const renderIcon = () => {
    if (icon === false) return null;

    if (icon !== true && icon !== undefined) {
      return (
        <span
          className={`inline-flex items-center justify-center shrink-0 leading-none ${currentSize.icon} ${iconClassName}`}
          aria-hidden="true"
        >
          {icon}
        </span>
      );
    }

    const IconComponent = getSafeConfig(color, defaultIcons, "info");
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 leading-none ${currentSize.icon} ${iconColorStyle} ${iconClassName}`}
        aria-hidden="true"
      >
        <IconComponent className="size-full" />
      </span>
    );
  };

  const containerClasses = [
    "relative flex w-full",
    currentSize.container,
    roundedClass,
    variantStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} role={activeRole} aria-live={ariaLive} className={containerClasses} {...props}>
      {renderIcon()}

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {title && <div className={`${currentSize.title} ${titleClassName}`}>{title}</div>}
        {hasBody && (
          <div className={`${currentSize.description} ${title ? "mt-0.5" : ""} ${descriptionClassName}`}>
            {bodyContent}
          </div>
        )}
      </div>

      {action && (
        <div className={`inline-flex items-center shrink-0 ${currentSize.action} ${actionClassName}`}>{action}</div>
      )}

      {isClosable && (
        <button
          type="button"
          onClick={handleClose}
          aria-label={closeAriaLabel}
          className={`inline-flex items-center justify-center shrink-0 rounded-md transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-current opacity-70 hover:opacity-100 ${
            variant === "filled" ? "hover:bg-white/20 active:bg-white/30" : "hover:bg-black/5 active:bg-black/10"
          } ${currentSize.closeButton} ${closeButtonClassName}`}
        >
          <CloseIcon className={currentSize.closeIcon} />
        </button>
      )}
    </div>
  );
}
