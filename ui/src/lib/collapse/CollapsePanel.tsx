import { useId, useMemo } from "react";
import { getSafeConfig } from "@/utils/function";
import { CollapsePanelProps } from "./types";
import { useCollapseContext, CollapsePanelContext, CollapsePanelContextValue } from "./context";
import { radiusConfig, variantPanelConfig } from "./constants";
import CollapseHeader from "./CollapseHeader";
import CollapseContent from "./CollapseContent";

export default function CollapsePanel({
  value,
  label,
  description,
  startIcon,
  extra,
  disabled = false,
  showArrow = true,
  headerClassName = "",
  contentClassName = "",
  destroyInactivePanel,
  className = "",
  children,
  ref,
  ...props
}: CollapsePanelProps) {
  const generatedId = useId();
  const { activeKeys, handleToggle, variant, color, radius } = useCollapseContext();

  const isActive = activeKeys.has(value);
  const headerId = `collapse-header-${value ?? generatedId}`;
  const panelId = `collapse-panel-${value ?? generatedId}`;

  const panelContextValue: CollapsePanelContextValue = useMemo(
    () => ({
      value,
      isActive,
      disabled,
      headerId,
      panelId,
      onToggle: () => !disabled && handleToggle(value),
    }),
    [value, isActive, disabled, headerId, panelId, handleToggle]
  );

  const itemRounded = variant === "separated" ? getSafeConfig(radius, radiusConfig, "md") : "";
  const itemVariantStyle =
    variant === "other"
      ? ""
      : getSafeConfig(
          color,
          getSafeConfig(variant, variantPanelConfig, "outlined"),
          "primary"
        );

  const itemClassNames = [
    "group",
    itemVariantStyle,
    itemRounded,
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <CollapsePanelContext.Provider value={panelContextValue}>
      <div ref={ref} className={itemClassNames} data-state={isActive ? "open" : "closed"} {...props}>
        {label !== undefined ? (
          <>
            <CollapseHeader
              startIcon={startIcon}
              description={description}
              extra={extra}
              showArrow={showArrow}
              className={headerClassName}
            >
              {label}
            </CollapseHeader>
            <CollapseContent
              destroyInactivePanel={destroyInactivePanel}
              className={contentClassName}
            >
              {children}
            </CollapseContent>
          </>
        ) : (
          children
        )}
      </div>
    </CollapsePanelContext.Provider>
  );
}
