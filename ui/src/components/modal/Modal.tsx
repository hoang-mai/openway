import React from "react";
import { sizeConfig, radiusConfig } from "./constants";
import { ModalProps } from "./types";
import { useModalContext } from "./ModalContext";
import { getSafeConfig } from "@/utils/function";

export default function Modal({
  size,
  radius,
  className = "",
  children,
  ref,
  ...props
}: ModalProps) {
  const modalContext = useModalContext();
  const currentSize = getSafeConfig(size ?? modalContext?.size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "lg");

  const containerClasses = [
    "relative flex flex-col w-full bg-neutral-white shadow-notion-modal border border-neutral-200/80 outline-none text-neutral-900 pointer-events-auto",
    currentSize.dialog,
    roundedClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      tabIndex={-1}
      data-testid="modal-dialog"
      className={containerClasses}
      {...props}
    >
      {children}
    </div>
  );
}
