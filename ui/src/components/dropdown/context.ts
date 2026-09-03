import { createContext, useContext } from "react";
import { DropdownContextValue } from "./types";

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export const useDropdownContext = (): DropdownContextValue => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown compound components must be used within a <Dropdown> component.");
  }
  return context;
};
