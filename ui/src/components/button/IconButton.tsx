import { IconButtonProps } from "./types";
import { sizeConfig, radiusConfig, variantColorConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import Spinner from "../icons/Spinner";
import { ReactNode } from "react";

export default function IconButton({
  icon,
  size,
  variant,
  color,
  radius,
  isLoading = false,
  showSpinner = false,
  disabled = false,
  type = "button",
  className = "",
  ref,
  ...props
}: IconButtonProps) {
  const currentSize = getSafeConfig(size, sizeConfig, "md");

  const variantStyles =
    variant === "other"
      ? ""
      : getSafeConfig(color, getSafeConfig(variant, variantColorConfig, "filled"), "primary");
  const roundedClass = getSafeConfig(radius, radiusConfig, "full");

  const classNames = [
    "inline-flex items-center justify-center font-medium leading-none border transition-colors duration-150 active:scale-[0.98] transition-transform cursor-pointer select-none whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    currentSize.iconOnly,
    roundedClass,
    variantStyles,
    disabled ? "opacity-50" : "",
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
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      className={classNames}
      {...props}
    >
      {isLoading && showSpinner ? renderIconWrapper(<Spinner />) : renderIconWrapper(icon)}
    </button>
  );
}
