import React, { ElementType, cloneElement, isValidElement } from "react";
import Link from "next/link";
import { BreadcrumbLinkProps } from "./types";
import { useBreadcrumbContext, useBreadcrumbItemContext } from "./context";
import {
  FOCUS_RING,
  radiusConfig,
  sizeConfig,
  underlineConfig,
  variantColorConfig,
} from "./constants";
import { getSafeConfig } from "@/utils/function";
import ExternalLinkIcon from "../icons/ExternalLinkIcon";

export default function BreadcrumbLink({
  href,
  asChild = false,
  as,
  external = false,
  startIcon,
  endIcon,
  badge,
  disabled: itemDisabled,
  replace,
  scroll,
  prefetch,
  target,
  rel,
  className = "",
  children,
  onClick,
  ref,
  ...props
}: BreadcrumbLinkProps) {
  const {
    size,
    color,
    radius,
    variant,
    underline,
    disabled: contextDisabled,
  } = useBreadcrumbContext();
  const { disabled: itemContextDisabled } = useBreadcrumbItemContext();

  const isDisabled = Boolean(
    itemDisabled ?? itemContextDisabled ?? contextDisabled
  );
  const currentSize = getSafeConfig(size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "md");
  const underlineClass = getSafeConfig(underline, underlineConfig, "hover");

  const variantColorStyle =
    variant === "other"
      ? ""
      : getSafeConfig(
          color,
          getSafeConfig(variant, variantColorConfig, "standard"),
          "neutral"
        );

  const disabledClasses = isDisabled
    ? "opacity-50 cursor-not-allowed pointer-events-none select-none"
    : "cursor-pointer";

  const linkClasses = `group inline-flex items-center select-none transition-colors duration-150 ${currentSize.link} ${roundedClass} ${underlineClass} ${variantColorStyle} ${FOCUS_RING} ${disabledClasses} ${className}`.trim();

  // 1. Trường hợp asChild: Chuyển toàn bộ style và props sang React Element con
  if (asChild && isValidElement(children)) {
    const childElement = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;
    return cloneElement(childElement, {
      className: `${linkClasses} ${childElement.props.className || ""}`.trim(),
      children: (
        <>
          {startIcon && (
            <span
              className={`inline-flex shrink-0 items-center justify-center ${currentSize.icon}`}
              aria-hidden="true"
            >
              {startIcon}
            </span>
          )}
          {childElement.props.children}
          {external && (
            <ExternalLinkIcon
              className="size-3.5 inline-block shrink-0 -mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          )}
          {endIcon && (
            <span
              className={`inline-flex shrink-0 items-center justify-center ${currentSize.icon}`}
              aria-hidden="true"
            >
              {endIcon}
            </span>
          )}
          {badge && (
            <span
              className={`inline-flex shrink-0 items-center ${currentSize.badge}`}
            >
              {badge}
            </span>
          )}
        </>
      ),
    });
  }

  // Nội dung bên trong thẻ link
  const content = (
    <>
      {startIcon && (
        <span
          className={`inline-flex shrink-0 items-center justify-center ${currentSize.icon}`}
          aria-hidden="true"
        >
          {startIcon}
        </span>
      )}
      <span className="truncate">{children}</span>
      {external && (
        <ExternalLinkIcon
          className="size-3.5 inline-block shrink-0 -mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
      )}
      {endIcon && (
        <span
          className={`inline-flex shrink-0 items-center justify-center ${currentSize.icon}`}
          aria-hidden="true"
        >
          {endIcon}
        </span>
      )}
      {badge && (
        <span
          className={`inline-flex shrink-0 items-center ${currentSize.badge}`}
        >
          {badge}
        </span>
      )}
    </>
  );

  // 2. Tùy biến thẻ qua prop `as`
  if (as) {
    const ComponentTag = as as ElementType;
    return (
      <ComponentTag
        ref={ref}
        className={linkClasses}
        onClick={onClick}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </ComponentTag>
    );
  }

  // 3. Sử dụng Next.js Link khi có `href`
  if (href) {
    const linkRel = external
      ? rel
        ? `${rel} noopener noreferrer`
        : "noopener noreferrer"
      : rel;
    const linkTarget = external ? "_blank" : target;

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={linkTarget}
        rel={linkRel}
        replace={replace}
        scroll={scroll}
        prefetch={prefetch}
        className={linkClasses}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-disabled={isDisabled ? "true" : undefined}
        tabIndex={isDisabled ? -1 : undefined}
        {...props}
      >
        {content}
      </Link>
    );
  }

  // 4. Nếu không có `href`, tự động render dạng nút bấm `<button type="button">`
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={linkClasses}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={isDisabled}
      aria-disabled={isDisabled ? "true" : undefined}
      {...(props as unknown as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
