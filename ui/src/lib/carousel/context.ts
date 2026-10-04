import { createContext, useContext } from "react";
import { CarouselContextValue } from "./types";

export const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarouselContext() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      "Carousel compound components (CarouselContent, CarouselSlide, CarouselPrevious, CarouselNext, CarouselPagination) must be used within <Carousel>"
    );
  }
  return context;
}
