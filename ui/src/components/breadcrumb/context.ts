import { createContext, useContext } from "react";
import { BreadcrumbContextValue } from "./types";

export const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function useBreadcrumbContext(): BreadcrumbContextValue {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error(
      "Breadcrumb compound components (BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis) must be used within a <Breadcrumb> component."
    );
  }
  return context;
}

export interface BreadcrumbItemContextValue {
  disabled?: boolean;
  current?: boolean;
}

export const BreadcrumbItemContext = createContext<BreadcrumbItemContextValue>({});

export function useBreadcrumbItemContext(): BreadcrumbItemContextValue {
  return useContext(BreadcrumbItemContext);
}
