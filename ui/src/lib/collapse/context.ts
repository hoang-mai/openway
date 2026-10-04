import { createContext, useContext, ReactNode } from "react";
import {
  CollapseSize,
  CollapseVariant,
  CollapseColor,
  CollapseRadius,
  CollapseExpandIconPosition,
} from "./types";

export interface CollapseContextValue {
  activeKeys: Set<string | number>;
  handleToggle: (key: string | number) => void;
  accordion: boolean;
  size: CollapseSize;
  variant: CollapseVariant;
  color: CollapseColor;
  radius: CollapseRadius;
  expandIconPosition: CollapseExpandIconPosition;
  expandIcon?: ReactNode | ((props: { isActive: boolean; disabled?: boolean }) => ReactNode);
  destroyInactivePanel: boolean;
}

export interface CollapsePanelContextValue {
  value: string | number;
  isActive: boolean;
  disabled?: boolean;
  headerId: string;
  panelId: string;
  onToggle: () => void;
}

export const CollapseContext = createContext<CollapseContextValue | null>(null);
export const CollapsePanelContext = createContext<CollapsePanelContextValue | null>(null);

export function useCollapseContext(): CollapseContextValue {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error("Collapse compound components must be rendered within a <Collapse> provider");
  }
  return context;
}

export function useCollapsePanelContext(): CollapsePanelContextValue {
  const context = useContext(CollapsePanelContext);
  if (!context) {
    throw new Error(
      "Collapse subcomponents (CollapseHeader, CollapseContent) must be rendered within a <CollapsePanel>"
    );
  }
  return context;
}
