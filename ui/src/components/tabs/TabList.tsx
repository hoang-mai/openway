import { useMergeRefs } from "@floating-ui/react";
import { TabListProps } from "./types";
import { useTabsContext } from "./context";
import { radiusConfig, variantListConfig, indicatorConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { useTabIndicator } from "./useTabIndicator";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";

export default function TabList({ children, className = "", extra, centered = false, ref, ...props }: TabListProps) {
  const {
    activeKey,
    orientation = "horizontal",
    placement = "top",
    variant = "line",
    color = "primary",
    radius = "md",
    fullWidth = false,
  } = useTabsContext();

  const {
    listRef,
    indicatorStyle,
    canScrollLeft,
    canScrollRight,
    checkScroll,
    handleScrollLeft,
    handleScrollRight,
    handleKeyDown,
  } = useTabIndicator({ activeKey, orientation, placement, variant, color, radius });

  const mergedRef = useMergeRefs([listRef, ref]);

  const currentRadius = getSafeConfig(radius, radiusConfig, "md");
  const variantConfigFn = variant === "other" ? "" : getSafeConfig(variant, variantListConfig, "line");
  const variantClass = typeof variantConfigFn === "function" ? variantConfigFn(orientation, placement) : "";
  const currentIndicatorClass =
    variant === "other" ? "" : getSafeConfig(color, getSafeConfig(variant, indicatorConfig, "line"), "primary");

  const isVertical = orientation === "vertical";
  const hasOverflow = canScrollLeft || canScrollRight;

  const layoutClasses = isVertical
    ? "flex flex-col items-stretch justify-start w-full"
    : `flex flex-row items-center overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth ${
        fullWidth ? "w-full" : ""
      }`;

  const containerClasses = [
    "relative flex-1 min-w-0",
    layoutClasses,
    centered && !isVertical ? "justify-center" : "",
    variant !== "line" ? currentRadius : "",
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const indicatorClasses = [
    "absolute pointer-events-none z-0 transition-all duration-300 ease-out",
    variant !== "line" ? currentRadius : "",
    currentIndicatorClass,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = isVertical
    ? "flex flex-col items-start gap-2 shrink-0 min-w-44"
    : "flex items-center justify-between gap-1 w-full min-w-0";

  return (
    <div className={wrapperClasses}>
      {/* Scroll Left Chevron Button */}
      {!isVertical && hasOverflow && (
        <button
          type="button"
          aria-label="Scroll tabs left"
          disabled={!canScrollLeft}
          onClick={handleScrollLeft}
          className="shrink-0 flex items-center justify-center size-7 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary-500"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
      )}

      <div
        ref={mergedRef}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        onScroll={checkScroll}
        className={containerClasses}
        {...props}
      >
        {/* Animated Sliding Indicator / Pill */}
        <div aria-hidden="true" data-testid="tab-indicator" className={indicatorClasses} style={indicatorStyle} />
        {children}
      </div>

      {/* Scroll Right Chevron Button */}
      {!isVertical && hasOverflow && (
        <button
          type="button"
          aria-label="Scroll tabs right"
          disabled={!canScrollRight}
          onClick={handleScrollRight}
          className="shrink-0 flex items-center justify-center size-7 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary-500"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      )}

      {extra && <div className={isVertical ? "w-full mt-1" : "shrink-0 ml-auto pl-1"}>{extra}</div>}
    </div>
  );
}
