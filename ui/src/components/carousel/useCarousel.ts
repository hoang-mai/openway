import { useCallback, useEffect, useRef, useState, PointerEvent, KeyboardEvent } from "react";
import { CarouselContextValue, CarouselRadius, CarouselSize } from "./types";

export interface UseCarouselOptions {
  currentIndex?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  loop?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  spacing?: number | string;
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  draggable?: boolean;
  size?: CarouselSize;
  radius?: CarouselRadius;
  transitionDuration?: number;
}

export function useCarousel({
  currentIndex: controlledIndex,
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
}: UseCarouselOptions = {}): CarouselContextValue {
  const [internalIndex, setInternalIndex] = useState<number>(defaultIndex);
  const [totalSlides, setTotalSlides] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const registeredSlidesRef = useRef<Set<string>>(new Set());
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStartPos = useRef<number>(0);
  const dragCurrentPos = useRef<number>(0);

  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const maxIndex = Math.max(0, loop ? totalSlides - 1 : totalSlides - slidesToShow);

  const setIndex = useCallback(
    (newIndex: number) => {
      let targetIndex = newIndex;
      if (loop) {
        if (totalSlides > 0) {
          targetIndex = (targetIndex + totalSlides) % totalSlides;
        } else {
          targetIndex = 0;
        }
      } else {
        targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));
      }

      if (!isControlled) {
        setInternalIndex(targetIndex);
      }
      onIndexChange?.(targetIndex);
    },
    [isControlled, loop, maxIndex, onIndexChange, totalSlides]
  );

  const canScrollPrev = loop ? totalSlides > 1 : activeIndex > 0;
  const canScrollNext = loop ? totalSlides > 1 : activeIndex < totalSlides - slidesToShow;

  const scrollPrev = useCallback(() => {
    if (canScrollPrev) {
      setIndex(activeIndex - slidesToScroll);
    }
  }, [activeIndex, canScrollPrev, setIndex, slidesToScroll]);

  const scrollNext = useCallback(() => {
    if (canScrollNext) {
      setIndex(activeIndex + slidesToScroll);
    }
  }, [activeIndex, canScrollNext, setIndex, slidesToScroll]);

  const scrollTo = useCallback(
    (index: number) => {
      setIndex(index);
    },
    [setIndex]
  );

  const registerSlide = useCallback((id: string) => {
    registeredSlidesRef.current.add(id);
    setTotalSlides(registeredSlidesRef.current.size);
  }, []);

  const unregisterSlide = useCallback((id: string) => {
    registeredSlidesRef.current.delete(id);
    setTotalSlides(registeredSlidesRef.current.size);
  }, []);

  // Autoplay Logic
  useEffect(() => {
    if (!autoPlay || totalSlides <= slidesToShow) return;
    if (pauseOnHover && isHovered) return;
    if (pauseOnFocus && isFocused) return;
    if (isDragging) return;

    const timer = setInterval(() => {
      if (loop || activeIndex < totalSlides - slidesToShow) {
        scrollNext();
      } else {
        scrollTo(0);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [
    activeIndex,
    autoPlay,
    interval,
    isDragging,
    isFocused,
    isHovered,
    loop,
    pauseOnFocus,
    pauseOnHover,
    scrollNext,
    scrollTo,
    slidesToShow,
    totalSlides,
  ]);

  // Pointer / Drag Handling
  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!draggable || totalSlides <= slidesToShow) return;
      if (e.button !== 0) return; // Only main button

      const clientPos = e.clientX;
      dragStartPos.current = clientPos;
      dragCurrentPos.current = clientPos;
      setIsDragging(true);
      setDragOffset(0);

      const target = e.currentTarget;
      try {
        target.setPointerCapture(e.pointerId);
      } catch {
        // Fallback for environments where setPointerCapture isn't supported
      }
    },
    [draggable, slidesToShow, totalSlides]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const clientPos = e.clientX;
      dragCurrentPos.current = clientPos;
      const offset = clientPos - dragStartPos.current;

      // Resistance at edges when not in loop
      if (!loop) {
        if (activeIndex === 0 && offset > 0) {
          setDragOffset(offset * 0.3);
          return;
        }
        if (activeIndex >= totalSlides - slidesToShow && offset < 0) {
          setDragOffset(offset * 0.3);
          return;
        }
      }

      setDragOffset(offset);
    },
    [activeIndex, isDragging, loop, slidesToShow, totalSlides]
  );

  const handlePointerEnd = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      setIsDragging(false);

      const delta = dragCurrentPos.current - dragStartPos.current;
      const threshold = 40; // minimum drag distance in pixels to trigger slide transition

      if (Math.abs(delta) > threshold) {
        if (delta > 0) {
          scrollPrev();
        } else {
          scrollNext();
        }
      }

      setDragOffset(0);

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
    },
    [isDragging, scrollNext, scrollPrev]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollTo(maxIndex);
      }
    },
    [maxIndex, scrollNext, scrollPrev, scrollTo]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return {
    currentIndex: activeIndex,
    totalSlides,
    slidesToShow,
    slidesToScroll,
    spacing,
    loop,
    canScrollPrev,
    canScrollNext,
    size,
    radius,
    transitionDuration,
    isDragging,
    dragOffset,
    scrollPrev,
    scrollNext,
    scrollTo,
    registerSlide,
    unregisterSlide,
    setTotalSlides,
    viewportRef,
    containerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp: handlePointerEnd,
    handlePointerCancel: handlePointerEnd,
    handleKeyDown,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  };
}
