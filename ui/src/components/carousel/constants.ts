import { CarouselNavigationVariant, CarouselRadius, CarouselSize } from "./types";

export const sizeConfig: Record<
  CarouselSize,
  {
    arrowBtn: string;
    arrowIcon: string;
    dot: string;
    activeDot: string;
    line: string;
    activeLine: string;
    fraction: string;
    paginationWrapper: string;
    edgeInset: string;
  }
> = {
  sm: {
    arrowBtn: "size-6 p-0.5 text-xs",
    arrowIcon: "size-3",
    dot: "size-1.5",
    activeDot: "w-4 h-1.5",
    line: "w-3.5 h-1",
    activeLine: "w-6 h-1",
    fraction: "text-xs px-2 py-0.5 text-neutral-800 font-medium",
    paginationWrapper: "px-2 py-1 gap-1.5",
    edgeInset: "left-1.5 right-1.5",
  },
  md: {
    arrowBtn: "size-8 p-1.5 text-sm",
    arrowIcon: "size-3.5",
    dot: "size-2",
    activeDot: "w-5 h-2",
    line: "w-5 h-1.5",
    activeLine: "w-8 h-1.5",
    fraction: "text-xs px-2.5 py-0.5 font-medium text-neutral-800",
    paginationWrapper: "px-2.5 py-1 gap-1.5",
    edgeInset: "left-2 right-2",
  },
  lg: {
    arrowBtn: "size-9 p-2 text-sm",
    arrowIcon: "size-4",
    dot: "size-2.5",
    activeDot: "w-6 h-2.5",
    line: "w-7 h-2",
    activeLine: "w-11 h-2",
    fraction: "text-sm px-3 py-1 font-medium text-neutral-800",
    paginationWrapper: "px-3 py-1.5 gap-2",
    edgeInset: "left-2.5 right-2.5",
  },
};

export const radiusConfig: Record<CarouselRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

/**
 * Kiểu nút điều hướng (Mặc định là kính mờ "glass")
 */
export const navVariantConfig: Record<CarouselNavigationVariant, string> = {
  glass:
    "bg-white/80 backdrop-blur-md border border-neutral-200/70 text-neutral-800 shadow-xs hover:bg-white hover:text-neutral-950 active:scale-90 disabled:opacity-25 disabled:pointer-events-none",
  filled:
    "bg-primary-600 text-white shadow-md hover:bg-primary-700 active:bg-primary-800 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:opacity-50",
  outline:
    "border border-primary-600 text-primary-600 bg-white/70 backdrop-blur-sm hover:bg-primary-50 disabled:border-neutral-300 disabled:text-neutral-400",
  ghost:
    "text-primary-600 hover:bg-primary-100/60 active:bg-primary-200/60 disabled:text-neutral-400",
};

/**
 * Phong cách kính mờ cho thanh phân trang (Pagination Wrapper)
 */
export const glassPaginationWrapper =
  "bg-white/80 backdrop-blur-md border border-neutral-200/80 shadow-xs rounded-full";

/**
 * Màu sắc chuẩn cho Dots / Lines
 */
export const dotStyleConfig = {
  active: "bg-primary-600 shadow-xs",
  inactive: "bg-neutral-300 hover:bg-neutral-400 transition-colors",
};
