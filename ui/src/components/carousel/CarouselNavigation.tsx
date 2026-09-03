import { getSafeConfig } from "@/utils/function";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import { CarouselNavigationProps } from "./types";
import { useCarouselContext } from "./context";
import { navVariantConfig, sizeConfig } from "./constants";

export function CarouselPrevious({
  variant = "glass",
  icon,
  className = "",
  disabled,
  onClick,
  ref,
  ...props
}: CarouselNavigationProps) {
  const { scrollPrev, canScrollPrev, size } = useCarouselContext();

  const isDisabled = disabled !== undefined ? disabled : !canScrollPrev;
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const variantStyles = getSafeConfig(variant, navVariantConfig, "glass");

  const defaultIcon = <ChevronLeftIcon className={currentSize.arrowIcon} />;

  const previousClassNames = [
    "absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center font-medium leading-none rounded-full transition-all duration-200 cursor-pointer select-none outline-none disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-25 focus-visible:ring-2 focus-visible:ring-primary-500/50 active:scale-90 z-10",
    variantStyles,
    currentSize.arrowBtn,
    className,
  ].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Slide trước"
      disabled={isDisabled}
      onClick={(e) => {
        scrollPrev();
        onClick?.(e);
      }}
      className={previousClassNames}
      {...props}
    >
      {icon || defaultIcon}
    </button>
  );
}

export function CarouselNext({
  variant = "glass",
  icon,
  className = "",
  disabled,
  onClick,
  ref,
  ...props
}: CarouselNavigationProps) {
  const { scrollNext, canScrollNext, size } = useCarouselContext();

  const isDisabled = disabled !== undefined ? disabled : !canScrollNext;
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const variantStyles = getSafeConfig(variant, navVariantConfig, "glass");

  const defaultIcon = <ChevronRightIcon className={currentSize.arrowIcon} />;

  const nextClassNames = [
    "absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center font-medium leading-none rounded-full transition-all duration-200 cursor-pointer select-none outline-none disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-25 focus-visible:ring-2 focus-visible:ring-primary-500/50 active:scale-90 z-10",
    variantStyles,
    currentSize.arrowBtn,
    className,
  ].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Slide tiếp theo"
      disabled={isDisabled}
      onClick={(e) => {
        scrollNext();
        onClick?.(e);
      }}
      className={nextClassNames}
      {...props}
    >
      {icon || defaultIcon}
    </button>
  );
}
