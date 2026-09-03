import React, { useEffect, useRef } from "react";
import { TimeColumnProps } from "./types";
import { timeItemRadiusConfig, timePickerColorConfig, timePickerSizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";

/**
 * Component hiển thị một cột danh sách cuộn các giá trị thời gian (Giờ, Phút, Giây, hoặc AM/PM)
 * Hỗ trợ tự động cuộn đến phần tử đang chọn (auto-scroll) và phím điều hướng WAI-ARIA.
 */
export default function TimeColumn({
  items,
  selectedValue,
  onSelect,
  ariaLabel,
  size = "md",
  color = "primary",
  radius,
  className = "",
  itemClassName = "",
  selectedItemClassName = "",
}: TimeColumnProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const selectedRef = useRef<HTMLLIElement>(null);

  const sizeStyles = getSafeConfig(size, timePickerSizeConfig, "md");
  const colorStyles = getSafeConfig(color, timePickerColorConfig, "primary");
  const itemRadiusClass = getSafeConfig(radius, timeItemRadiusConfig, "md");

  const firstEnabledIndex = items.findIndex((item) => !item.disabled);
  const hasSelection = items.some((item) => item.value === selectedValue);

  // Auto-scroll to selected element and synchronize focus when navigating
  useEffect(() => {
    if (selectedRef.current && containerRef.current) {
      const container = containerRef.current;
      const target = selectedRef.current;
      const topPos =
        target.offsetTop - container.offsetTop - (container.clientHeight - target.clientHeight) / 2;

      container.scrollTo({
        top: Math.max(0, topPos),
        behavior: "smooth",
      });

      // Nếu người dùng đang focus bên trong cột, di chuyển tiêu điểm tới phần tử được chọn mới
      if (container.contains(document.activeElement)) {
        target.focus();
      }
    }
  }, [selectedValue]);

  const focusAndSelect = (targetIndex: number) => {
    const targetItem = items[targetIndex];
    if (!targetItem || targetItem.disabled) return;
    onSelect(targetItem.value);
    const itemEl = containerRef.current?.children[targetIndex] as HTMLElement | undefined;
    itemEl?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, currentIndex: number) => {
    const enabledItems = items.filter((item) => !item.disabled);
    if (!enabledItems.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      // Tìm phần tử khả dụng tiếp theo
      for (let i = currentIndex + 1; i < items.length; i++) {
        if (!items[i]!.disabled) {
          focusAndSelect(i);
          break;
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // Tìm phần tử khả dụng phía trước
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (!items[i]!.disabled) {
          focusAndSelect(i);
          break;
        }
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextCol = containerRef.current?.nextElementSibling as HTMLElement | null;
      const target = nextCol?.querySelector<HTMLElement>(
        '[tabindex="0"], [role="option"]:not([aria-disabled="true"])'
      );
      target?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevCol = containerRef.current?.previousElementSibling as HTMLElement | null;
      const target = prevCol?.querySelector<HTMLElement>(
        '[tabindex="0"], [role="option"]:not([aria-disabled="true"])'
      );
      target?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      const firstIdx = items.findIndex((item) => !item.disabled);
      if (firstIdx !== -1) {
        focusAndSelect(firstIdx);
      }
    } else if (e.key === "End") {
      e.preventDefault();
      for (let i = items.length - 1; i >= 0; i--) {
        if (!items[i]!.disabled) {
          focusAndSelect(i);
          break;
        }
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const item = items[currentIndex];
      if (item && !item.disabled) {
        focusAndSelect(currentIndex);
      }
    }
  };

  return (
    <ul
      ref={containerRef}
      role="listbox"
      aria-label={ariaLabel}
      tabIndex={-1}
      className={`relative flex flex-col overflow-y-auto select-none ${sizeStyles.columnWidth} ${sizeStyles.columnHeight} scrollbar-thin scrollbar-thumb-neutral-300 hover:scrollbar-thumb-neutral-400 py-1 focus:outline-none ${className}`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {items.map((item, index) => {
        const isSelected = selectedValue === item.value;
        const isDisabled = Boolean(item.disabled);
        const isTabbable = !isDisabled && (isSelected || (!hasSelection && index === firstEnabledIndex));

        return (
          <li
            key={`${item.value}`}
            ref={isSelected ? selectedRef : undefined}
            role="option"
            aria-selected={isSelected}
            aria-disabled={isDisabled}
            aria-label={`${item.label} ${ariaLabel || ""}`.trim()}
            tabIndex={isTabbable ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => {
              if (!isDisabled) {
                focusAndSelect(index);
              }
            }}
            className={`flex items-center justify-center shrink-0 transition-colors duration-150 mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${itemRadiusClass} ${
              sizeStyles.itemHeight
            } ${sizeStyles.itemText} ${
              isDisabled
                ? "opacity-30 cursor-not-allowed text-neutral-400"
                : isSelected
                  ? `${colorStyles.selected} cursor-default ${selectedItemClassName}`
                  : `text-neutral-700 ${colorStyles.hoverBg} cursor-pointer`
            } ${itemClassName}`}
          >
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
