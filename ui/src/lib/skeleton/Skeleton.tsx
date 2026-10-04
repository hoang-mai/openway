import { CSSProperties } from "react";
import { SkeletonProps } from "./types";
import { variantConfig, radiusConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import { toStyle } from "./utils";

export default function Skeleton({
  ref,
  variant = "pulse",
  shape = "rectangle",
  radius = "md",
  width,
  height = "1rem",
  lines = 1,
  gap = "0.5rem",
  className = "",
  style,
  ...props
}: SkeletonProps) {
  const animationClass = getSafeConfig(variant, variantConfig, "pulse");

  // Circle: bỏ qua radius prop, luôn full-round
  const roundedClass = shape === "circle" ? "rounded-full" : getSafeConfig(radius, radiusConfig, "md");

  const baseStyle: CSSProperties = {
    width: toStyle(width),
    height: toStyle(height),
    ...style,
  };

  const itemClass = ["bg-neutral-200", animationClass, roundedClass].filter(Boolean).join(" ");

  if (lines > 1) {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading..."
        className={["flex flex-col", className].filter(Boolean).join(" ")}
        style={{ gap: toStyle(gap), ...style }}
        {...props}
      >
        {Array.from({ length: lines }).map((_, i) => {
          const isLast = i === lines - 1;
          return (
            <div
              key={i}
              className={itemClass}
              style={{
                width: isLast ? "60%" : (toStyle(width) ?? "100%"),
                height: toStyle(height),
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="status"
      aria-label="Loading..."
      className={[itemClass, className].filter(Boolean).join(" ")}
      style={baseStyle}
      {...props}
    />
  );
}
