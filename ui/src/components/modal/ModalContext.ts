import { createContext, useContext } from "react";
import { ModalSize } from "./types";

export interface ModalContextValue {
  onClose: () => void;
  isLoading?: boolean;
  size?: ModalSize;
  dialogRef?: React.RefObject<HTMLDialogElement | null>;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => useContext(ModalContext);
