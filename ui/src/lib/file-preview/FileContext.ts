import { createContext, ReactNode, useContext } from "react";
import { PreviewFile } from "./types";

export interface FileContextValue {
  file?: PreviewFile;
  headerTitle?: ReactNode;
}

export const FileContext = createContext<FileContextValue | null>(null);

export const useFileContext = () => useContext(FileContext);
