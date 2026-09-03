import { getSafeConfig } from "@/utils/function";
import { CollapseHeaderProps } from "./types";
import { useCollapseContext, useCollapsePanelContext } from "./context";
import { sizeConfig, colorConfig, variantHeaderConfig } from "./constants";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";

export default function CollapseHeader({
  startIcon,
  description,
  extra,
  showArrow = true,
  children,
  className = "",
  ref,
  onClick,
  onKeyDown,
  ...props
}: CollapseHeaderProps) {
  const { size, variant, color, expandIconPosition, expandIcon } = useCollapseContext();
  const { isActive, disabled, headerId, panelId, onToggle } = useCollapsePanelContext();

  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const currentColor = getSafeConfig(color, colorConfig, "primary");
  const currentHeaderBg =
    variant === "other"
      ? ""
      : getSafeConfig(
          color,
          getSafeConfig(variant, variantHeaderConfig, "outlined"),
          "primary"
        );
  const isArrowVisible = showArrow && expandIconPosition !== "none";

  const renderArrow = () => {
    if (!isArrowVisible) return null;

    if (typeof expandIcon === "function") {
      return (
        <span
          className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 text-neutral-400 ${
            isActive ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          {expandIcon({ isActive, disabled })}
        </span>
      );
    }

    if (expandIcon) {
      return (
        <span
          className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 text-neutral-400 ${
            isActive ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          {expandIcon}
        </span>
      );
    }

    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 text-neutral-400 ${
          isActive ? "rotate-180 text-neutral-700" : "rotate-0"
        }`}
        aria-hidden="true"
      >
        <ChevronDownIcon className={currentSize.icon} />
      </span>
    );
  };

  const headerContainerClassNames = [
    "w-full flex items-center justify-between transition-colors duration-150 select-none",
    currentSize.header,
    currentSize.gap,
    disabled ? "cursor-not-allowed opacity-60" : currentHeaderBg,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const triggerButtonClassNames = [
    "flex items-center flex-1 min-w-0 text-left outline-none cursor-pointer bg-transparent border-0 p-0",
    currentSize.gap,
    disabled
      ? "cursor-not-allowed pointer-events-none"
      : `${currentColor.focusRing} focus-visible:ring-2 focus-visible:ring-offset-1 rounded-lg`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={headerContainerClassNames}>
      <button
        ref={ref}
        id={headerId}
        type="button"
        aria-expanded={isActive}
        aria-controls={panelId}
        aria-disabled={disabled ? true : undefined}
        disabled={disabled}
        onClick={(e) => {
          onToggle();
          onClick?.(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
          onKeyDown?.(e);
        }}
        className={triggerButtonClassNames}
        {...props}
      >
        {/* Left icon position */}
        {expandIconPosition === "left" && renderArrow()}

        {/* Start Icon + Label / Children + Description */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {startIcon && (
            <span
              className={`inline-flex items-center justify-center shrink-0 ${currentColor.activeIndicator} ${currentSize.startIcon}`}
              aria-hidden="true"
            >
              {startIcon}
            </span>
          )}
          <div className="flex flex-col min-w-0 flex-1">
            <span className={`truncate ${currentSize.title} ${currentColor.title}`}>{children}</span>
            {description && (
              <span className={`line-clamp-2 ${currentSize.description}`}>{description}</span>
            )}
          </div>
        </div>

        {/* Right icon position when extra is absent */}
        {expandIconPosition === "right" && !extra && renderArrow()}
      </button>

      {/* Extra Actions / Slots */}
      {extra && (
        <div className="inline-flex items-center gap-2.5 shrink-0 ml-3">
          {extra}
          {expandIconPosition === "right" && renderArrow()}
        </div>
      )}
    </div>
  );
}
