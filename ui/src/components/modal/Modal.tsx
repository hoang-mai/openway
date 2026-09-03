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
    "relative flex flex-col w-full bg-neutral-white shadow-2xl border-2 border-neutral-200 outline-none text-neutral-900 pointer-events-auto",
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
      className={containerClasses}
      {...props}
    >
      {children}
    </div>
  );
}
