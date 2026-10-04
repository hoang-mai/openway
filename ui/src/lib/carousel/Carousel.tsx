import { getSafeConfig } from "@/utils/function";
import { CarouselProps } from "./types";
import { CarouselContext } from "./context";
import { useCarousel } from "./useCarousel";
import { radiusConfig } from "./constants";

export function Carousel({
  currentIndex,
  defaultIndex = 0,
  onIndexChange,
  loop = false,
  slidesToShow = 1,
  slidesToScroll = 1,
  spacing = 0,
  autoPlay = true,
  interval = 3000,
  transitionDuration = 650,
  pauseOnHover = true,
  pauseOnFocus = true,
  draggable = true,
  size = "md",
  radius = "md",
  children,
  className = "",
  style,
  ref,
  ...props
}: CarouselProps) {
  const carousel = useCarousel({
    currentIndex,
    defaultIndex,
    onIndexChange,
    loop,
    slidesToShow,
    slidesToScroll,
    spacing,
    autoPlay,
    interval,
    transitionDuration,
    pauseOnHover,
    pauseOnFocus,
    draggable,
    size,
    radius,
  });

  const roundedClass = getSafeConfig(radius, radiusConfig, "md");

  return (
    <CarouselContext.Provider value={carousel}>
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label="Băng chuyền"
        tabIndex={0}
        onKeyDown={carousel.handleKeyDown}
        onMouseEnter={carousel.handleMouseEnter}
        onMouseLeave={carousel.handleMouseLeave}
        onFocus={carousel.handleFocus}
        onBlur={carousel.handleBlur}
        className={`relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${roundedClass} ${className}`}
        style={style}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
