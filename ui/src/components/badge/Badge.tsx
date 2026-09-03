import { BadgeProps } from "./types";
import { sizeConfig, radiusConfig, variantColorConfig, dotColorConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import CloseIcon from "@/components/icons/CloseIcon";
import { ReactNode } from "react";

export default function Badge({
  size = "md",
  variant = "soft",
  color = "primary",
  radius = "full",
  dot = false,
  dotPing = false,
  leftIcon,
  rightIcon,
  onDelete,
  deleteAriaLabel = "Remove",
  className = "",
  children,
  onClick,
  ref,
  ...props
}: BadgeProps) {
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  const variantStyles =
    variant === "other" ? "" : getSafeConfig(color, getSafeConfig(variant, variantColorConfig, "soft"), "primary");

  const dotBg = getSafeConfig(color, dotColorConfig, "primary");

  const roundedClass = getSafeConfig(radius, radiusConfig, "full");

  const classNames = [
    "inline-flex items-center justify-center font-medium leading-none border transition-colors duration-150 whitespace-nowrap",
    currentSize.badge,
    roundedClass,
    variantStyles,
    onClick ? "cursor-pointer select-none active:scale-[0.98] transition-transform duration-100" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderIconWrapper = (iconNode: ReactNode) => (
    <span
      className={`inline-flex items-center justify-center shrink-0 leading-none ${currentSize.icon}`}
      aria-hidden="true"
    >
      {iconNode}
    </span>
  );

  return (
    <span
      ref={ref}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={classNames}
      onClick={onClick}
      {...props}
    >
      {dot && (
        <span
          className={`relative inline-block shrink-0 rounded-full ${
            dotPing ? "animate-pulse" : ""
          } ${currentSize.dot} ${dotBg}`}
          aria-hidden="true"
        />
      )}

      {leftIcon && renderIconWrapper(leftIcon)}

      {children && <span className="leading-none">{children}</span>}

      {rightIcon && !onDelete && renderIconWrapper(rightIcon)}

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label={deleteAriaLabel}
          className={`inline-flex items-center justify-center shrink-0 rounded-full hover:bg-black/10 active:bg-black/20 transition-colors p-0.5 -mr-0.5 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-current ${currentSize.deleteIcon}`}
        >
          <CloseIcon className="size-full" />
        </button>
      )}
    </span>
  );
}
