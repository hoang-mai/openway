import React from "react";
import { ModalBodyProps } from "./types";
import { sizeConfig } from "./constants";
import { useModalContext } from "./ModalContext";
import { getSafeConfig } from "@/utils/function";

export default function ModalBody({ size, className = "", children, ...props }: ModalBodyProps) {
  const modalContext = useModalContext();
  const currentSize = getSafeConfig(size ?? modalContext?.size, sizeConfig, "md");

  return (
    <div
      className={`w-auto flex-1 min-h-0 overflow-y-auto ui-scrollbar ${currentSize.body} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
