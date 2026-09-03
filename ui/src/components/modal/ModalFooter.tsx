import React from "react";
import { ModalFooterProps } from "./types";
import { sizeConfig } from "./constants";
import { useModalContext } from "./ModalContext";
import { getSafeConfig } from "@/utils/function";

export default function ModalFooter({ size, className = "", children, ...props }: ModalFooterProps) {
  const modalContext = useModalContext();
  const currentSize = getSafeConfig(size ?? modalContext?.size, sizeConfig, "md");

  return (
    <div
      className={`flex items-center justify-end w-full border-t border-neutral-100 pt-2 ${currentSize.footer} ${currentSize.buttonGap} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
