import React, {
  ElementType,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  CopyConfig,
  EllipsisConfig,
  TypographyProps,
  TypographyType,
} from "./types";
import {
  alignConfig,
  colorConfig,
  lineClampConfig,
  markConfig,
  sizeConfig,
  variantStyleMap,
  variantTagMap,
  weightConfig,
} from "./constants";
import { getSafeConfig } from "@/utils/function";
import CalloutView from "./CalloutView";
import CopyButton from "./CopyButton";
import EllipsisToggle from "./EllipsisToggle";
import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon";
import LightbulbIcon from "@/components/icons/LightbulbIcon";
import Link from "next/link";

export default function Typography({
  type = "span",
  color,
  size,
  weight,
  align,
  mark,
  code = false,
  keyboard = false,
  underline = false,
  isDelete = false,
  strong = false,
  italic = false,
  tabular = false,
  disabled = false,
  copyable,
  ellipsis,
  children,
  className = "",
  ref,

  /* ========================================================================
   * 1. PROPS DÀNH CHO TYPE="a" (Next.js Link & Thẻ liên kết)
   * BẮT ĐẦU TẠI ĐÂY:
   * ======================================================================== */
  href = "#",
  external = false,
  target,
  rel,
  replace,
  scroll,
  prefetch,
  /* ==================== KẾT THÚC PROPS TYPE="a" ==================== */

  /* ========================================================================
   * 2. PROPS DÀNH CHO TYPE="callout" (Notion Callout Box)
   * BẮT ĐẦU TẠI ĐÂY:
   * ======================================================================== */
  icon,
  /* ==================== KẾT THÚC PROPS TYPE="callout" ==================== */

  /* ========================================================================
   * 3. CÁC PROPS CÒN LẠI (HTMLAttributes tiêu chuẩn: onClick, id, title...)
   * ======================================================================== */
  ...restProps
}: TypographyProps) {
  // 1. Quyết định loại phần tử duy nhất qua prop type (mặc định "span")
  const componentType = type || "span";

  // 2. Quản lý trạng thái Thu gọn / Xem thêm (Ellipsis Expandable)
  const ellipsisConfig: EllipsisConfig | null = useMemo(() => {
    return ellipsis ? (typeof ellipsis === "object" ? ellipsis : {}) : null;
  }, [ellipsis]);

  const isExpandable = Boolean(ellipsisConfig?.expandable);
  const rows = ellipsisConfig?.rows ?? 1;

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsExpanded((prev) => {
        const next = !prev;
        ellipsisConfig?.onExpand?.(e, { expanded: next });
        return next;
      });
    },
    [ellipsisConfig]
  );

  // 3. Xây dựng danh sách ClassNames
  const baseVariantStyle =
    componentType in variantStyleMap
      ? variantStyleMap[componentType as TypographyType]
      : "";
  const colorClass = color ? getSafeConfig(color, colorConfig, "default") : "";
  const sizeClass = size ? getSafeConfig(size, sizeConfig, "md") : "";
  const weightClass = weight ? getSafeConfig(weight, weightConfig, "normal") : "";
  const alignClass = align ? getSafeConfig(align, alignConfig, "left") : "";
  // Highlight Mark styling
  let markClass = "";
  if (mark) {
    if (typeof mark === "string" && mark in markConfig) {
      markClass = markConfig[mark] ?? markConfig.default ?? "";
    } else {
      markClass = markConfig.default ?? "";
    }
  }

  // Modifiers
  const isCode = code || componentType === "code";
  const isKbd = keyboard || componentType === "kbd";

  const modifierClasses = [
    strong && "font-semibold",
    italic && "italic",
    underline && "underline underline-offset-2",
    isDelete && "line-through text-neutral-400",
    isCode && "notion-inline-code",
    isKbd &&
      "font-mono text-[11px] leading-none px-1.5 py-1 rounded-xs bg-neutral-100 border border-neutral-200 text-neutral-700 shadow-xs",
    tabular && "tabular-nums font-feature-settings-tnum",
    disabled && "opacity-50 select-none cursor-not-allowed pointer-events-none",
    markClass,
  ]
    .filter(Boolean)
    .join(" ");

  // Ellipsis CSS classes & Animation (Chuẩn theo Collapse: CSS Grid transition)
  let ellipsisClass = "";
  if (ellipsisConfig) {
    if (rows <= 1) {
      ellipsisClass = isExpanded ? "" : "truncate block";
    } else {
      ellipsisClass = isExpanded
        ? "line-clamp-none"
        : lineClampConfig[rows] || "line-clamp-2";
    }
  }

  // Cờ kích hoạt Notion Zen Hover Action khi có copyable
  const hasHoverAction = Boolean(
    copyable && (typeof copyable !== "object" || (copyable as CopyConfig).hoverOnly !== false)
  );

  const containerClasses = [
    baseVariantStyle,
    colorClass,
    sizeClass,
    weightClass,
    alignClass,
    modifierClasses,
    ellipsisConfig && "block",
    hasHoverAction && "notion-hover-trigger group relative",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Khối các nút tương tác bổ trợ (Copy, Ellipsis)
  const interactiveActions = (
    <>
      <CopyButton copyable={copyable} hasHoverAction={hasHoverAction}>
        {children}
      </CopyButton>
      <EllipsisToggle
        ellipsis={ellipsis}
        isExpanded={isExpanded}
        onToggle={handleToggleExpand}
      />
    </>
  );

  const suffixNode = ellipsisConfig?.suffix ? (
    <span className="shrink-0">{ellipsisConfig.suffix}</span>
  ) : null;

  const contentNode = ellipsisConfig ? (
    isExpandable ? (
      <span
        className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <span className="overflow-hidden block">
          <span className={ellipsisClass}>
            {children}
            {suffixNode}
          </span>
        </span>
      </span>
    ) : (
      <span className={ellipsisClass}>
        {children}
        {suffixNode}
      </span>
    )
  ) : (
    children
  );

  // 4. Render theo componentType bằng switch với props phẳng (Flat Props)
  switch (componentType) {
    /* ========================================================================
     * 1. XỬ LÝ RENDER TYPE="a" (Next.js Link & Thẻ liên kết)
     * ======================================================================== */
    case "a": {
      const finalTarget = external ? "_blank" : target;
      const finalRel = external
        ? rel
          ? `${rel} noopener noreferrer`
          : "noopener noreferrer"
        : rel;

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={finalTarget}
          rel={finalRel}
          replace={replace}
          scroll={scroll}
          prefetch={prefetch}
          className={containerClasses}
          {...restProps}
        >
          {contentNode}
          {external && (
            <ExternalLinkIcon className="size-3.5 inline-block shrink-0 -mt-0.5" aria-hidden="true" />
          )}
          {interactiveActions}
        </Link>
      );
    }
    /* ==================== KẾT THÚC XỬ LÝ TYPE="a" ==================== */

    /* ========================================================================
     * 2. XỬ LÝ RENDER TYPE="callout" (Notion Callout Box)
     * ======================================================================== */
    case "callout": {
      const calloutIcon = icon ?? <LightbulbIcon className="size-5 text-current" />;

      return (
        <CalloutView
          ref={ref as React.Ref<HTMLDivElement>}
          icon={calloutIcon}
          color={color}
          className={containerClasses}
          {...restProps}
        >
          {contentNode}
          {interactiveActions}
        </CalloutView>
      );
    }
    /* ==================== KẾT THÚC XỬ LÝ TYPE="callout" ==================== */

    /* ========================================================================
     * 3. XỬ LÝ RENDER CÁC THẺ TIÊU CHUẨN (h1–h6, p, span, blockquote, code, kbd)
     * ======================================================================== */
    default: {
      const ComponentTag = (variantTagMap[componentType] || "span") as ElementType<{
        className?: string;
        ref?: React.Ref<HTMLElement>;
      }>;

      return (
        <ComponentTag
          ref={ref}
          className={containerClasses}
          {...restProps}
        >
          {contentNode}
          {interactiveActions}
        </ComponentTag>
      );
    }
    /* ==================== KẾT THÚC XỬ LÝ CÁC THẺ TIÊU CHUẨN ==================== */
  }
}
