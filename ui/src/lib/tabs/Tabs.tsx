import { useState, useMemo, useCallback, startTransition, addTransitionType } from "react";
import { TabsProps } from "./types";
import { TabsContext } from "./context";
import { cn } from "cn";

export default function Tabs({
  activeKey: activeKeyProp,
  defaultActiveKey,
  onChange,
  onClose,
  size = "md",
  variant = "line",
  color = "primary",
  radius = "md",
  orientation = "horizontal",
  placement = "top",
  fullWidth = false,
  disabled = false,
  destroyInactiveTabPane = false,
  animated = true,
  className = "",
  children,
  ref,
  ...props
}: TabsProps) {
  const isControlled = activeKeyProp !== undefined;
  const [internalActiveKey, setInternalActiveKey] = useState<string | number | undefined>(defaultActiveKey);

  const currentActiveKey = isControlled ? activeKeyProp : internalActiveKey;

  const handleActiveKeyChange = useCallback(
    (key: string | number) => {
      if (key === currentActiveKey) return;

      if (animated) {
        startTransition(() => {
          addTransitionType("tab-change");
          if (!isControlled) {
            setInternalActiveKey(key);
          }
          onChange?.(key);
        });
      } else {
        if (!isControlled) {
          setInternalActiveKey(key);
        }
        onChange?.(key);
      }
    },
    [animated, currentActiveKey, isControlled, onChange]
  );

  const handleClose = useCallback(
    (key: string | number) => {
      onClose?.(key);
    },
    [onClose]
  );

  const contextValue = useMemo(
    () => ({
      activeKey: currentActiveKey,
      setActiveKey: handleActiveKeyChange,
      size,
      variant,
      color,
      radius,
      orientation,
      placement,
      fullWidth,
      disabled,
      destroyInactiveTabPane,
      animated,
      onCloseTab: handleClose,
    }),
    [
      currentActiveKey,
      handleActiveKeyChange,
      size,
      variant,
      color,
      radius,
      orientation,
      placement,
      fullWidth,
      disabled,
      destroyInactiveTabPane,
      animated,
      handleClose,
    ]
  );

  // Orientation & Placement layout styles
  const isVertical = orientation === "vertical";
  let layoutClasses;

  if (isVertical) {
    layoutClasses =
      placement === "right" ? "flex flex-row-reverse gap-4 items-start" : "flex flex-row gap-4 items-start";
  } else {
    layoutClasses = placement === "bottom" ? "flex flex-col-reverse gap-3" : "flex flex-col gap-3";
  }

  const containerClasses = cn("w-full", layoutClasses, className);

  return (
    <div ref={ref} className={containerClasses} {...props}>
      <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
    </div>
  );
}
