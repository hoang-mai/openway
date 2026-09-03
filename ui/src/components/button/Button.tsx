import { ButtonProps } from "./types";
import { sizeConfig, radiusConfig, variantColorConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import Spinner from "../icons/Spinner";

export default function Button({
  size,
  variant,
  color,
  radius,
  leftIcon,
  rightIcon,
  isLoading = false,
  showSpinner = false,
  loadingText,
  isFullWidth = false,
  disabled = false,
  type = "button",
  className = "",
  children,
  ref,
  ...props
}: ButtonProps) {
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const variantStyles =
    variant === "other" ? "" : getSafeConfig(color, getSafeConfig(variant, variantColorConfig, "filled"), "primary");
  const roundedClass = getSafeConfig(radius, radiusConfig, "lg");

  const classNames = [
    "inline-flex items-center justify-center font-medium leading-none border transition-colors duration-150 cursor-pointer select-none whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] transition-transform",
    currentSize.button,
    roundedClass,
    variantStyles,
    isFullWidth ? "w-full" : "",
    disabled ? "opacity-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderIconWrapper = (iconNode: React.ReactNode) => (
    <span
      className={`inline-flex items-center justify-center shrink-0 leading-none ${currentSize.icon}`}
      aria-hidden="true"
    >
      {iconNode}
    </span>
  );

  const displayContent = isLoading && loadingText ? loadingText : children;

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
      {isLoading && showSpinner && renderIconWrapper(<Spinner />)}
      {(!isLoading || !showSpinner) && leftIcon && renderIconWrapper(leftIcon)}
      {displayContent && <span className="leading-none">{displayContent}</span>}
      {!isLoading && rightIcon && renderIconWrapper(rightIcon)}
    </button>
  );
}
