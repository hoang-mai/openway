import { TabColor, TabOrientation, TabPlacement, TabRadius, TabSize, TabVariant } from "./types";

export const sizeConfig: Record<
  TabSize,
  {
    tab: string;
    icon: string;
    gap: string;
    badge: string;
    closeBtn: string;
  }
> = {
  sm: {
    tab: "px-3 py-1.5 text-xs font-medium",
    icon: "size-3.5",
    gap: "gap-1.5",
    badge: "text-[10px] px-1.5 py-0.5 min-w-4 h-4",
    closeBtn: "size-3.5 -mr-1 p-0.5",
  },
  md: {
    tab: "px-4 py-2 text-sm font-medium",
    icon: "size-4",
    gap: "gap-2",
    badge: "text-xs px-2 py-0.5 min-w-5 h-5",
    closeBtn: "size-4 -mr-1 p-0.5",
  },
  lg: {
    tab: "px-5 py-2.5 text-base font-medium",
    icon: "size-5",
    gap: "gap-2.5",
    badge: "text-xs px-2.5 py-0.5 min-w-5.5 h-5.5",
    closeBtn: "size-4.5 -mr-1.5 p-0.5",
  },
};

export const radiusConfig: Record<TabRadius, string> = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
};

export const variantListConfig: Record<Exclude<TabVariant, "other">, (orientation: TabOrientation, placement: TabPlacement) => string> = {
  line: (orientation, placement) => {
    if (orientation === "vertical") {
      return placement === "right"
        ? "border-l border-neutral-200 gap-1"
        : "border-r border-neutral-200 gap-1";
    }
    return placement === "bottom"
      ? "border-t border-neutral-200 gap-2"
      : "border-b border-neutral-200 gap-2";
  },
  solid: () => "bg-neutral-100 p-1 gap-1",
  bordered: () =>
    "border border-neutral-200 p-1 gap-1 bg-neutral-50/50",
  flat: () => "bg-neutral-100/60 p-1 gap-1",
};

export const colorTabConfig: Record<
  TabColor,
  Record<Exclude<TabVariant, "other">, {
    active: string;
    inactive: string;
  }>
> = {
  primary: {
    line: {
      active: "text-primary-700 font-semibold",
      inactive: "text-neutral-600 hover:text-primary-600",
    },
    solid: {
      active: "text-primary-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    bordered: {
      active: "text-primary-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    flat: {
      active: "text-primary-700 font-semibold",
      inactive: "text-neutral-600 hover:text-primary-700",
    },
  },
  secondary: {
    line: {
      active: "text-secondary-700 font-semibold",
      inactive: "text-neutral-600 hover:text-secondary-600",
    },
    solid: {
      active: "text-secondary-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    bordered: {
      active: "text-secondary-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    flat: {
      active: "text-secondary-700 font-semibold",
      inactive: "text-neutral-600 hover:text-secondary-700",
    },
  },
  neutral: {
    line: {
      active: "text-neutral-950 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-950",
    },
    solid: {
      active: "text-neutral-950 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    bordered: {
      active: "text-neutral-950 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    flat: {
      active: "text-neutral-950 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
  },
  error: {
    line: {
      active: "text-error-700 font-semibold",
      inactive: "text-neutral-600 hover:text-error-600",
    },
    solid: {
      active: "text-error-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    bordered: {
      active: "text-error-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    flat: {
      active: "text-error-700 font-semibold",
      inactive: "text-neutral-600 hover:text-error-700",
    },
  },
  success: {
    line: {
      active: "text-success-700 font-semibold",
      inactive: "text-neutral-600 hover:text-success-600",
    },
    solid: {
      active: "text-success-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    bordered: {
      active: "text-success-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    flat: {
      active: "text-success-700 font-semibold",
      inactive: "text-neutral-600 hover:text-success-700",
    },
  },
  warning: {
    line: {
      active: "text-warning-700 font-semibold",
      inactive: "text-neutral-600 hover:text-warning-600",
    },
    solid: {
      active: "text-warning-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    bordered: {
      active: "text-warning-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    flat: {
      active: "text-warning-700 font-semibold",
      inactive: "text-neutral-600 hover:text-warning-700",
    },
  },
  info: {
    line: {
      active: "text-info-700 font-semibold",
      inactive: "text-neutral-600 hover:text-info-600",
    },
    solid: {
      active: "text-info-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    bordered: {
      active: "text-info-700 font-semibold",
      inactive: "text-neutral-600 hover:text-neutral-900",
    },
    flat: {
      active: "text-info-700 font-semibold",
      inactive: "text-neutral-600 hover:text-info-700",
    },
  },
};

export const indicatorConfig: Record<Exclude<TabVariant, "other">, Record<TabColor, string>> = {
  line: {
    primary: "bg-primary-600",
    secondary: "bg-secondary-600",
    neutral: "bg-neutral-900",
    error: "bg-error-600",
    success: "bg-success-600",
    warning: "bg-warning-600",
    info: "bg-info-600",
  },
  solid: {
    primary: "bg-white shadow-xs border border-neutral-200/70",
    secondary: "bg-white shadow-xs border border-neutral-200/70",
    neutral: "bg-white shadow-xs border border-neutral-200/70",
    error: "bg-white shadow-xs border border-neutral-200/70",
    success: "bg-white shadow-xs border border-neutral-200/70",
    warning: "bg-white shadow-xs border border-neutral-200/70",
    info: "bg-white shadow-xs border border-neutral-200/70",
  },
  bordered: {
    primary: "bg-white border border-neutral-300 shadow-xs",
    secondary: "bg-white border border-neutral-300 shadow-xs",
    neutral: "bg-white border border-neutral-300 shadow-xs",
    error: "bg-white border border-neutral-300 shadow-xs",
    success: "bg-white border border-neutral-300 shadow-xs",
    warning: "bg-white border border-neutral-300 shadow-xs",
    info: "bg-white border border-neutral-300 shadow-xs",
  },
  flat: {
    primary: "bg-primary-100/90",
    secondary: "bg-secondary-100/90",
    neutral: "bg-neutral-200/90",
    error: "bg-error-100/90",
    success: "bg-success-100/90",
    warning: "bg-warning-100/90",
    info: "bg-info-100/90",
  },
};
