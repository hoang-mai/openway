import React, { useState, useMemo } from "react";
import { BreadcrumbItemData, BreadcrumbProps } from "./types";
import { BreadcrumbContext } from "./context";
import BreadcrumbList from "./BreadcrumbList";
import BreadcrumbItem from "./BreadcrumbItem";
import BreadcrumbLink from "./BreadcrumbLink";
import BreadcrumbPage from "./BreadcrumbPage";
import BreadcrumbSeparator from "./BreadcrumbSeparator";
import BreadcrumbEllipsis from "./BreadcrumbEllipsis";

export default function Breadcrumb({
  size = "md",
  variant = "standard",
  color = "neutral",
  radius = "md",
  underline = "hover",
  separator,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  collapseMode = "dropdown",
  items,
  disabled = false,
  ariaLabel = "Breadcrumb",
  className = "",
  children,
  ref,
  ...props
}: BreadcrumbProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const contextValue = useMemo(
    () => ({
      size,
      variant,
      color,
      radius,
      underline,
      separator,
      disabled,
    }),
    [size, variant, color, radius, underline, separator, disabled]
  );

  // Render từng item dữ liệu trong mảng `items`
  const renderItemElement = (
    item: BreadcrumbItemData,
    isLast: boolean,
    index: number
  ) => {
    const isCurrent = item.current ?? (isLast && !item.href);
    const itemKey = item.id ?? `item-${index}`;

    if (isCurrent) {
      return (
        <BreadcrumbItem
          key={itemKey}
          current
          disabled={item.disabled}
        >
          <BreadcrumbPage
            startIcon={item.icon}
            endIcon={item.endIcon}
            badge={item.badge}
            className={item.className}
          >
            {item.label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      );
    }

    return (
      <BreadcrumbItem
        key={itemKey}
        disabled={item.disabled}
      >
        <BreadcrumbLink
          href={item.href}
          external={item.external}
          target={item.target}
          rel={item.rel}
          replace={item.replace}
          scroll={item.scroll}
          prefetch={item.prefetch}
          startIcon={item.icon}
          endIcon={item.endIcon}
          badge={item.badge}
          disabled={item.disabled}
          onClick={item.onClick}
          className={item.className}
        >
          {item.label}
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
  };

  // Logic render data-driven items
  const renderDataDrivenItems = () => {
    if (!items || items.length === 0) return null;

    const total = items.length;
    const shouldCollapse =
      Boolean(maxItems) &&
      maxItems! > 0 &&
      total > maxItems! &&
      !isExpanded &&
      collapseMode !== "none";

    if (!shouldCollapse) {
      return (
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === total - 1;
            return (
              <React.Fragment key={item.id ?? `item-frag-${index}`}>
                {renderItemElement(item, isLast, index)}
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      );
    }

    const before = Math.max(0, itemsBeforeCollapse);
    const after = Math.max(1, itemsAfterCollapse);

    const startItems = items.slice(0, before);
    const hiddenItems = items.slice(before, total - after);
    const endItems = items.slice(total - after);

    return (
      <BreadcrumbList>
        {/* Nhóm các mục đầu */}
        {startItems.map((item, index) => (
          <React.Fragment key={item.id ?? `start-${index}`}>
            {renderItemElement(item, false, index)}
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}

        {/* Nút thu gọn ba chấm */}
        <BreadcrumbItem key="ellipsis-item">
          <BreadcrumbEllipsis
            items={collapseMode === "dropdown" ? hiddenItems : undefined}
            onExpand={
              collapseMode === "expand" ? () => setIsExpanded(true) : undefined
            }
          />
        </BreadcrumbItem>
        <BreadcrumbSeparator key="ellipsis-separator" />

        {/* Nhóm các mục cuối */}
        {endItems.map((item, index) => {
          const actualIndex = total - after + index;
          const isLast = actualIndex === total - 1;
          return (
            <React.Fragment key={item.id ?? `end-${index}`}>
              {renderItemElement(item, isLast, actualIndex)}
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    );
  };

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={`w-full ${className}`.trim()}
        {...props}
      >
        {items ? renderDataDrivenItems() : children}
      </nav>
    </BreadcrumbContext.Provider>
  );
}
