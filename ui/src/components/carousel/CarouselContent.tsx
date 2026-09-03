import { CSSProperties } from "react";
import { CarouselContentProps } from "./types";
import { useCarouselContext } from "./context";

export function CarouselContent({ children, className = "", style, ref, ...props }: CarouselContentProps) {
  const {
    currentIndex,
    slidesToShow,
    spacing,
    transitionDuration,
    isDragging,
    dragOffset,
    viewportRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  } = useCarouselContext();

  const spacingValue = typeof spacing === "number" ? `${spacing}px` : spacing || "0px";

  const transformStyle = `translateX(calc(-${currentIndex} * ((100% + ${spacingValue}) / ${slidesToShow}) + ${dragOffset}px))`;

  const trackStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: spacingValue,
    transform: transformStyle,
    transition: isDragging ? "none" : `transform ${transitionDuration}ms cubic-bezier(0.25, 1, 0.5, 1)`,
    touchAction: "pan-y",
    width: "100%",
  };

  return (
    <div
      ref={viewportRef}
      className={`overflow-hidden relative w-full h-full cursor-grab ${
        isDragging ? "cursor-grabbing select-none" : ""
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <div
        ref={ref}
        role="presentation"
        className={`flex ${className}`}
        style={{
          ...trackStyle,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
