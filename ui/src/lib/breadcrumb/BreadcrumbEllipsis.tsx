import React from "react";
import Link from "next/link";
import { BreadcrumbEllipsisProps } from "./types";
import { useBreadcrumbContext } from "./context";
import { FOCUS_RING, radiusConfig, sizeConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import MoreHorizontalIcon from "../icons/MoreHorizontalIcon";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "../dropdown";

export default function BreadcrumbEllipsis({
  items,
  ariaLabel = "Hiển thị thêm đường dẫn",
  onExpand,
  children,
  className = "",
  ref,
  ...props
}: BreadcrumbEllipsisProps) {
  const { size, radius } = useBreadcrumbContext();
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");

  const iconContent = children ?? (
    <MoreHorizontalIcon className={currentSize.icon} aria-hidden="true" />
  );

  const buttonClasses = `inline-flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors select-none ${currentSize.ellipsis} ${roundedClass} ${FOCUS_RING} ${className}`.trim();

  // 1. Nếu có danh sách items thu gọn -> Mở Dropdown menu
  if (items && items.length > 0) {
    return (
      <Dropdown size={size === "lg" ? "md" : "sm"}>
        <DropdownTrigger>
          <button
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            aria-label={ariaLabel}
            className={buttonClasses}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          >
            {iconContent}
          </button>
        </DropdownTrigger>
        <DropdownMenu className="min-w-40">
          {items.map((item, index) => {
            const itemKey = item.id ?? index;
            if (item.href) {
              return (
                <DropdownItem
                  key={itemKey}
                  startIcon={item.icon}
                  endIcon={item.endIcon}
                  disabled={item.disabled}
                  onClick={(e) => item.onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>)}
                >
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : item.target}
                    rel={item.external ? "noopener noreferrer" : item.rel}
                    className="w-full text-left"
                  >
                    {item.label}
                  </Link>
                </DropdownItem>
              );
            }

            return (
              <DropdownItem
                key={itemKey}
                startIcon={item.icon}
                endIcon={item.endIcon}
                disabled={item.disabled}
                onClick={(e) => item.onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>)}
              >
                {item.label}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }

  // 2. Nếu có onExpand callback -> Nút bấm mở rộng toàn bộ
  if (onExpand) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onExpand}
        aria-label={ariaLabel}
        className={buttonClasses}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {iconContent}
      </button>
    );
  }

  // 3. Biểu tượng ba chấm tĩnh
  return (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={`inline-flex items-center justify-center text-neutral-400 select-none ${currentSize.ellipsis} ${className}`.trim()}
      {...props}
    >
      {iconContent}
      <span className="sr-only">{ariaLabel}</span>
    </span>
  );
}
