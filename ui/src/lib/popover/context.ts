import { createContext, useContext } from "react";
import { PopoverContextValue } from "./types";

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export const usePopoverContext = (): PopoverContextValue => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover compound components must be used within a <Popover> component.");
  }
  return context;
};
