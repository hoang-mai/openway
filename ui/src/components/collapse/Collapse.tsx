import { useState, useMemo, useCallback } from "react";
import { getSafeConfig } from "@/utils/function";
import { CollapseProps, CollapseActiveKey, CollapseContextValue } from "./types";
import { radiusConfig, variantContainerConfig } from "./constants";
import { CollapseContext } from "./context";

function normalizeKeys(keys?: CollapseActiveKey): (string | number)[] {
  if (keys === undefined || keys === null) return [];
  if (Array.isArray(keys)) return keys;
  return [keys];
}

export default function Collapse({
  activeKey: activeKeyProp,
  defaultActiveKey,
  onChange,
  accordion = false,
  size = "md",
  variant = "outlined",
  color = "primary",
  radius = "md",
  expandIconPosition = "right",
  expandIcon,
  destroyInactivePanel = false,
  className = "",
  style,
  children,
  ref,
  ...props
}: CollapseProps) {
  const isControlled = activeKeyProp !== undefined;
  const [internalActiveKeys, setInternalActiveKeys] = useState<(string | number)[]>(() =>
    normalizeKeys(defaultActiveKey)
  );

  const activeKeys = useMemo(
    () => new Set(isControlled ? normalizeKeys(activeKeyProp) : internalActiveKeys),
    [isControlled, activeKeyProp, internalActiveKeys]
  );

  const handleToggle = useCallback(
    (key: string | number) => {
      let nextKeys: (string | number)[];
      const isCurrentActive = activeKeys.has(key);

      if (accordion) {
        nextKeys = isCurrentActive ? [] : [key];
      } else {
        const currentArray = Array.from(activeKeys);
        if (isCurrentActive) {
          nextKeys = currentArray.filter((k) => k !== key);
        } else {
          nextKeys = [...currentArray, key];
        }
      }

      if (!isControlled) {
        setInternalActiveKeys(nextKeys);
      }

      onChange?.(accordion ? (nextKeys[0] ?? "") : nextKeys);
    },
    [accordion, activeKeys, isControlled, onChange]
  );

  const containerVariantStyle =
    variant === "other"
      ? ""
      : getSafeConfig(
          color,
          getSafeConfig(variant, variantContainerConfig, "outlined"),
          "primary"
        );

  const containerRounded =
    variant !== "separated" && variant !== "ghost"
      ? getSafeConfig(radius, radiusConfig, "md")
      : "";

  const containerClassNames = [
    "w-full transition-colors",
    containerVariantStyle,
    containerRounded,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contextValue: CollapseContextValue = useMemo(
    () => ({
      activeKeys,
      handleToggle,
      accordion,
      size,
      variant,
      color,
      radius,
      expandIconPosition,
      expandIcon,
      destroyInactivePanel,
    }),
    [
      activeKeys,
      handleToggle,
      accordion,
      size,
      variant,
      color,
      radius,
      expandIconPosition,
      expandIcon,
      destroyInactivePanel,
    ]
  );

  return (
    <CollapseContext.Provider value={contextValue}>
      <div ref={ref} className={containerClassNames} style={style} {...props}>
        {children}
      </div>
    </CollapseContext.Provider>
  );
}
