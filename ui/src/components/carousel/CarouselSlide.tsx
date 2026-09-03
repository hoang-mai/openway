import { useId, useEffect, CSSProperties } from "react";
import { CarouselSlideProps } from "./types";
import { useCarouselContext } from "./context";

export function CarouselSlide({ children, className = "", style, ref, ...props }: CarouselSlideProps) {
  const generatedId = useId();
  const { slidesToShow, spacing, registerSlide, unregisterSlide } = useCarouselContext();

  useEffect(() => {
    registerSlide(generatedId);
    return () => {
      unregisterSlide(generatedId);
    };
  }, [generatedId, registerSlide, unregisterSlide]);

  const spacingValue = typeof spacing === "number" ? `${spacing}px` : spacing || "0px";

  const slideStyle: CSSProperties = {
    ...style,
  };

  if (slidesToShow > 1 || spacingValue !== "0px") {
    slideStyle.flex = `0 0 calc((100% - ${slidesToShow - 1} * ${spacingValue}) / ${slidesToShow})`;
  } else {
    slideStyle.flex = "0 0 100%";
  }

  const baseClasses = "min-w-0 shrink-0 grow-0 select-none box-border relative overflow-hidden";

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={`${baseClasses} ${className}`}
      style={slideStyle}
      {...props}
    >
      {children}
    </div>
  );
}
