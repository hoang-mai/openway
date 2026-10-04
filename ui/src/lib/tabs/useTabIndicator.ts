import {
  CSSProperties,
  KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { TabColor, TabOrientation, TabPlacement, TabRadius, TabVariant } from "./types";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Tùy chọn cấu hình cho hook `useTabIndicator`
 */
export interface UseTabIndicatorOptions {
  /**
   * Khóa định danh của tab đang active
   */
  activeKey?: string | number;

  /**
   * Chiều hiển thị tabs ('horizontal' | 'vertical')
   * @default 'horizontal'
   */
  orientation?: TabOrientation;

  /**
   * Vị trí đặt thanh tab list ('top' | 'bottom' | 'left' | 'right')
   * @default 'top'
   */
  placement?: TabPlacement;

  /**
   * Biến thể kiểu dáng của tab list
   * @default 'line'
   */
  variant?: TabVariant;

  /**
   * Chủ đề màu sắc
   * @default 'primary'
   */
  color?: TabColor;

  /**
   * Độ bo góc
   * @default 'md'
   */
  radius?: TabRadius;
}

/**
 * Custom hook quản lý tính toán toạ độ cho Sliding Tab Indicator,
 * tự động bắt sự kiện ResizeObserver/Window Resize, hỗ trợ cuộn tràn (overflow) và điều hướng bàn phím.
 */
export function useTabIndicator({
  activeKey,
  orientation = "horizontal",
  placement = "top",
  variant = "line",
  color = "primary",
  radius = "md",
}: UseTabIndicatorOptions = {}) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({
    opacity: 0,
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Kiểm tra trạng thái cuộn tràn viền (overflow) của danh sách tabs
  const checkScroll = useCallback(() => {
    if (!listRef.current || orientation === "vertical") {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft < maxScroll - 1);
  }, [orientation]);

  // Logic đo đạc & tính toán toạ độ vị trí cho indicator
  const updateIndicator = useCallback(() => {
    if (!listRef.current) return;

    checkScroll();

    const activeTab = listRef.current.querySelector<HTMLElement>(`[role="tab"][aria-selected="true"]`);

    if (!activeTab) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const measureTarget = activeTab.closest<HTMLElement>("[data-tab-wrapper]") || activeTab;

    // Tự động cuộn tab active vào vùng nhìn thấy nếu bị tràn
    measureTarget.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });

    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = measureTarget;

    if (variant === "line") {
      if (orientation === "vertical") {
        setIndicatorStyle({
          transform: `translate3d(0, ${offsetTop}px, 0)`,
          height: `${offsetHeight}px`,
          width: "2px",
          top: 0,
          left: placement === "right" ? 0 : undefined,
          right: placement !== "right" ? 0 : undefined,
          opacity: 1,
        });
      } else {
        setIndicatorStyle({
          transform: `translate3d(${offsetLeft}px, 0, 0)`,
          width: `${offsetWidth}px`,
          height: "2px",
          left: 0,
          top: placement === "bottom" ? 0 : undefined,
          bottom: placement !== "bottom" ? 0 : undefined,
          opacity: 1,
        });
      }
    } else {
      // solid, flat, bordered
      setIndicatorStyle({
        transform: `translate3d(${offsetLeft}px, ${offsetTop}px, 0)`,
        width: `${offsetWidth}px`,
        height: `${offsetHeight}px`,
        top: 0,
        left: 0,
        opacity: 1,
      });
    }
  }, [checkScroll, orientation, placement, variant]);

  // Kích hoạt cập nhật vị trí khi activeKey hoặc cấu hình layout thay đổi
  useIsomorphicLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, activeKey, variant, orientation, placement, color, radius]);

  // Đăng ký ResizeObserver và Window Resize Listener chỉ 1 lần duy nhất khi mount
  useIsomorphicLayoutEffect(() => {
    updateIndicator();
    const rafId = requestAnimationFrame(updateIndicator);

    const observer = new ResizeObserver(updateIndicator);
    if (listRef.current) {
      observer.observe(listRef.current);
      const tabElements = listRef.current.querySelectorAll("[data-tab-wrapper], [role='tab']");
      for (const el of tabElements) {
        observer.observe(el);
      }
    }

    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [updateIndicator]);

  const handleScrollLeft = () => {
    if (!listRef.current) return;
    listRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (!listRef.current) return;
    listRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!listRef.current) return;

    const tabs = Array.from(listRef.current.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'));

    if (!tabs.length) return;

    const activeIndex = tabs.findIndex(
      (tab) => tab === document.activeElement || tab.getAttribute("aria-selected") === "true"
    );

    let nextIndex = -1;

    const isHorizontal = orientation === "horizontal";
    const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
    const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

    if (e.key === nextKey) {
      e.preventDefault();
      nextIndex = (activeIndex + 1) % tabs.length;
    } else if (e.key === prevKey) {
      e.preventDefault();
      nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    }

    if (nextIndex >= 0 && tabs[nextIndex]) {
      tabs[nextIndex]?.focus();
      tabs[nextIndex]?.click();
    }
  };

  return {
    listRef,
    indicatorStyle,
    canScrollLeft,
    canScrollRight,
    checkScroll,
    handleScrollLeft,
    handleScrollRight,
    handleKeyDown,
  };
}

export default useTabIndicator;
