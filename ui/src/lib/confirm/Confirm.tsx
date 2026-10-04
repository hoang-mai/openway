import React from "react";
import { sizeConfig, radiusConfig } from "./constants";
import { ConfirmProps } from "./types";
import { useConfirmContext } from "./ConfirmContext";
import { getSafeConfig } from "@/utils/function";

/**
 * Khung giao diện hộp thoại xác nhận (Confirm Dialog Box).
 * Thiết kế theo mô hình Pure Compound Pattern giống Modal:
 * Nhận size/color từ ConfirmContainer qua Context và render {children}.
 */
export default function Confirm({
  size,
  radius,
  className = "",
  children,
  ref,
  ...props
}: ConfirmProps) {
  const confirmContext = useConfirmContext();
  const currentSize = getSafeConfig(size ?? confirmContext?.size, sizeConfig, "md");
  const roundedClass = getSafeConfig(radius, radiusConfig, "lg");

  const containerClasses = [
    "relative flex flex-col w-full bg-neutral-white border border-neutral-200/80 outline-none text-neutral-900 pointer-events-auto",
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
      data-testid="confirm-dialog"
      className={containerClasses}
      {...props}
    >
      {children}
    </div>
  );
}
