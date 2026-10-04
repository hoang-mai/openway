import { createContext, useContext } from "react";
import { TabColor, TabOrientation, TabPlacement, TabRadius, TabSize, TabVariant } from "./types";

export interface TabsContextValue {
  activeKey: string | number | undefined;
  setActiveKey: (key: string | number) => void;
  size: TabSize;
  variant: TabVariant;
  color: TabColor;
  radius: TabRadius;
  orientation: TabOrientation;
  placement: TabPlacement;
  fullWidth: boolean;
  disabled: boolean;
  destroyInactiveTabPane: boolean;
  onCloseTab?: (key: string | number) => void;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be used within <Tabs>");
  }
  return context;
}
