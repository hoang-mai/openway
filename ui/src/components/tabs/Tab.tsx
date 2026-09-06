import { useRef, MouseEvent, KeyboardEvent } from "react";
import { useMergeRefs } from "@floating-ui/react";
import { TabProps } from "./types";
import { useTabsContext } from "./context";
import { sizeConfig, radiusConfig, colorTabConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import CloseIcon from "../icons/CloseIcon";

export default function Tab({
  value,
  label,
  startIcon,
  endIcon,
  badge,
  disabled: itemDisabled = false,
  closable = false,
  onClose,
  className = "",
  children,
  onClick,
  onKeyDown,
  ref,
  ...props
}: TabProps) {
  const {
    activeKey,
    setActiveKey,
    size,
    variant,
    color,
    radius,
    orientation,
    fullWidth,
    disabled: groupDisabled,
    onCloseTab,
  } = useTabsContext();

  const internalRef = useRef<HTMLButtonElement | null>(null);
  const mergedRef = useMergeRefs([internalRef, ref]);

  const isDisabled = groupDisabled || itemDisabled;
  const isActive = activeKey === value;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    setActiveKey(value);
    onClick?.(e);
  };

  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isDisabled) return;
    onClose?.(e);
    onCloseTab?.(value);
  };

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const currentRadius = getSafeConfig(radius, radiusConfig, "md");
  const colorVariantMap = getSafeConfig(color, colorTabConfig, "primary");
  const colorStyles = variant === "other" ? { active: "", inactive: "" } : getSafeConfig(variant, colorVariantMap, "line");

  const tabId = `tab-${value}`;
  const panelId = `tabpanel-${value}`;

  const stateClass = isActive ? colorStyles.active : colorStyles.inactive;
  const isVertical = orientation === "vertical";

  const containerClasses = [
    "group relative z-10 inline-flex items-center select-none",
    isVertical ? "justify-start text-left w-full" : "justify-center text-center",
    variant !== "line" ? currentRadius : "",
    fullWidth && !isVertical ? "flex-1 text-center" : "",
    isDisabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const tabButtonClasses = [
    "inline-flex items-center cursor-pointer select-none bg-transparent",
    isVertical ? "justify-start text-left w-full" : "justify-center text-center",
    "transition-colors duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2",
    variant !== "line" ? currentRadius : "",
    currentSize.tab,
    currentSize.gap,
    closable ? "pr-1.5" : "",
    fullWidth && !isVertical ? "flex-1 text-center" : "",
    stateClass,
    isDisabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (closable && (e.key === "Delete" || e.key === "Backspace")) {
      e.preventDefault();
      e.stopPropagation();
      if (isDisabled) return;
      onClose?.(e as unknown as MouseEvent<HTMLButtonElement>);
      onCloseTab?.(value);
    }
    onKeyDown?.(e);
  };

  return (
    <div data-tab-wrapper className={containerClasses}>
      <button
        ref={mergedRef}
        id={tabId}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={panelId}
        aria-disabled={isDisabled ? "true" : undefined}
        tabIndex={isActive ? 0 : -1}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={tabButtonClasses}
        {...props}
      >
        {startIcon && (
          <span
            className={`shrink-0 inline-flex items-center justify-center transition-colors duration-200 ${currentSize.icon}`}
            aria-hidden="true"
          >
            {startIcon}
          </span>
        )}

        <span className={`truncate ${isVertical ? "flex-1 text-left" : ""}`}>{label || children}</span>

        {badge !== undefined && badge !== null && (
          <span
            className={`inline-flex items-center justify-center font-medium rounded-full bg-neutral-200/80 text-neutral-700 transition-colors duration-200 ${currentSize.badge}`}
          >
            {badge}
          </span>
        )}

        {endIcon && (
          <span
            className={`shrink-0 inline-flex items-center justify-center transition-colors duration-200 ${currentSize.icon}`}
            aria-hidden="true"
          >
            {endIcon}
          </span>
        )}
      </button>

      {closable && (
        <button
          type="button"
          aria-label="Close tab"
          disabled={isDisabled}
          tabIndex={isActive ? 0 : -1}
          onClick={handleClose}
          className={`shrink-0 cursor-pointer rounded-full hover:bg-neutral-200/80 text-neutral-400 hover:text-neutral-700 transition-colors inline-flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary-500 mr-2 ${currentSize.closeBtn}`}
        >
          <CloseIcon className="size-full pointer-events-none" />
        </button>
      )}
    </div>
  );
}
