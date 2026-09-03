import React from "react";
import { useListItem, useMergeRefs } from "@floating-ui/react";
import { useDropdownContext } from "./context";
import { DropdownItemProps } from "./types";
import { sizeConfig, colorConfig, dangerStyles } from "./constants";
import { getSafeConfig } from "@/utils/function";

export function DropdownItem({
  ref: propRef,
  children,
  onClick,
  disabled = false,
  danger = false,
  selected = false,
  startIcon,
  endIcon,
  shortcut,
  description,
  className = "",
  closeOnSelect: itemCloseOnSelect,
  ...rest
}: DropdownItemProps) {
  const { getItemProps, activeIndex, setIsOpen, color, size, closeOnSelect: rootCloseOnSelect } = useDropdownContext();

  const label = typeof children === "string" ? children : undefined;
  const { ref: listItemRef, index } = useListItem({ label });
  const mergedRef = useMergeRefs([listItemRef, propRef]);

  const isActive = activeIndex === index;
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const colorStyles = getSafeConfig(color, colorConfig, "primary");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
    const shouldClose = itemCloseOnSelect ?? rootCloseOnSelect;
    if (shouldClose) {
      setIsOpen(false);
    }
  };

  const stateClasses = disabled
    ? "opacity-50 cursor-not-allowed text-neutral-400 select-none"
    : danger
      ? `${dangerStyles.default} ${isActive ? dangerStyles.active : ""} cursor-pointer`
      : selected
        ? `${colorStyles.selected} cursor-pointer`
        : `${isActive ? colorStyles.active : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"} cursor-pointer`;

  const itemClasses = [
    "w-full text-left flex items-center select-none transition-colors duration-100 outline-none focus:outline-none",
    currentSize.item,
    currentSize.itemGap,
    stateClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={mergedRef}
      type="button"
      role="menuitem"
      disabled={disabled}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        ...rest,
        onClick: handleClick,
        className: itemClasses,
      })}
    >
      {startIcon && (
        <span className={`flex items-center justify-center shrink-0 ${currentSize.icon}`}>{startIcon}</span>
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <span className="truncate">{children}</span>
        {description && <span className={`text-neutral-500 truncate ${currentSize.description}`}>{description}</span>}
      </div>
      {shortcut && (
        <kbd
          className={`shrink-0 rounded border border-neutral-200 bg-neutral-50 font-mono text-neutral-500 tracking-wider ${currentSize.shortcut}`}
        >
          {shortcut}
        </kbd>
      )}
      {endIcon && <span className={`flex items-center justify-center shrink-0 ${currentSize.icon}`}>{endIcon}</span>}
    </button>
  );
}

export default DropdownItem;
