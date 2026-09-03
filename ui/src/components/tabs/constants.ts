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
        ? "border-l border-neutral-200 dark:border-neutral-800 gap-1"
        : "border-r border-neutral-200 dark:border-neutral-800 gap-1";
    }
    return placement === "bottom"
      ? "border-t border-neutral-200 dark:border-neutral-800 gap-2"
      : "border-b border-neutral-200 dark:border-neutral-800 gap-2";
  },
  solid: () => "bg-neutral-100 dark:bg-neutral-800/80 p-1 gap-1",
  bordered: () =>
    "border border-neutral-200 dark:border-neutral-700/80 p-1 gap-1 bg-neutral-50/50 dark:bg-neutral-900/50",
  flat: () => "bg-neutral-100/60 dark:bg-neutral-800/40 p-1 gap-1",
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
      active: "text-primary-700 dark:text-primary-400 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-300",
    },
    solid: {
      active: "text-primary-700 dark:text-primary-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    bordered: {
      active: "text-primary-700 dark:text-primary-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    flat: {
      active: "text-primary-700 dark:text-primary-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-primary-700 dark:hover:text-primary-300",
    },
  },
  secondary: {
    line: {
      active: "text-secondary-700 dark:text-secondary-400 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-secondary-600 dark:hover:text-secondary-300",
    },
    solid: {
      active: "text-secondary-700 dark:text-secondary-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    bordered: {
      active: "text-secondary-700 dark:text-secondary-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    flat: {
      active: "text-secondary-700 dark:text-secondary-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-secondary-700 dark:hover:text-secondary-300",
    },
  },
  neutral: {
    line: {
      active: "text-neutral-950 dark:text-neutral-50 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100",
    },
    solid: {
      active: "text-neutral-950 dark:text-neutral-50 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    bordered: {
      active: "text-neutral-950 dark:text-neutral-50 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    flat: {
      active: "text-neutral-950 dark:text-neutral-50 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100",
    },
  },
  error: {
    line: {
      active: "text-error-700 dark:text-error-400 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-error-600 dark:hover:text-error-300",
    },
    solid: {
      active: "text-error-700 dark:text-error-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    bordered: {
      active: "text-error-700 dark:text-error-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    flat: {
      active: "text-error-700 dark:text-error-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-error-700 dark:hover:text-error-300",
    },
  },
  success: {
    line: {
      active: "text-success-700 dark:text-success-400 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-success-600 dark:hover:text-success-300",
    },
    solid: {
      active: "text-success-700 dark:text-success-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    bordered: {
      active: "text-success-700 dark:text-success-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    flat: {
      active: "text-success-700 dark:text-success-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-success-700 dark:hover:text-success-300",
    },
  },
  warning: {
    line: {
      active: "text-warning-700 dark:text-warning-400 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-warning-600 dark:hover:text-warning-300",
    },
    solid: {
      active: "text-warning-700 dark:text-warning-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    bordered: {
      active: "text-warning-700 dark:text-warning-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    flat: {
      active: "text-warning-700 dark:text-warning-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-warning-700 dark:hover:text-warning-300",
    },
  },
  info: {
    line: {
      active: "text-info-700 dark:text-info-400 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-info-600 dark:hover:text-info-300",
    },
    solid: {
      active: "text-info-700 dark:text-info-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    bordered: {
      active: "text-info-700 dark:text-info-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    },
    flat: {
      active: "text-info-700 dark:text-info-300 font-semibold",
      inactive: "text-neutral-600 dark:text-neutral-400 hover:text-info-700 dark:hover:text-info-300",
    },
  },
};

export const indicatorConfig: Record<Exclude<TabVariant, "other">, Record<TabColor, string>> = {
  line: {
    primary: "bg-primary-600 dark:bg-primary-400",
    secondary: "bg-secondary-600 dark:bg-secondary-400",
    neutral: "bg-neutral-900 dark:bg-neutral-100",
    error: "bg-error-600 dark:bg-error-400",
    success: "bg-success-600 dark:bg-success-400",
    warning: "bg-warning-600 dark:bg-warning-400",
    info: "bg-info-600 dark:bg-info-400",
  },
  solid: {
    primary: "bg-white dark:bg-neutral-900 shadow-xs border border-neutral-200/70 dark:border-neutral-700/70",
    secondary: "bg-white dark:bg-neutral-900 shadow-xs border border-neutral-200/70 dark:border-neutral-700/70",
    neutral: "bg-white dark:bg-neutral-900 shadow-xs border border-neutral-200/70 dark:border-neutral-700/70",
    error: "bg-white dark:bg-neutral-900 shadow-xs border border-neutral-200/70 dark:border-neutral-700/70",
    success: "bg-white dark:bg-neutral-900 shadow-xs border border-neutral-200/70 dark:border-neutral-700/70",
    warning: "bg-white dark:bg-neutral-900 shadow-xs border border-neutral-200/70 dark:border-neutral-700/70",
    info: "bg-white dark:bg-neutral-900 shadow-xs border border-neutral-200/70 dark:border-neutral-700/70",
  },
  bordered: {
    primary: "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 shadow-xs",
    secondary: "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 shadow-xs",
    neutral: "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 shadow-xs",
    error: "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 shadow-xs",
    success: "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 shadow-xs",
    warning: "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 shadow-xs",
    info: "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 shadow-xs",
  },
  flat: {
    primary: "bg-primary-100/90 dark:bg-primary-950/80",
    secondary: "bg-secondary-100/90 dark:bg-secondary-950/80",
    neutral: "bg-neutral-200/90 dark:bg-neutral-800",
    error: "bg-error-100/90 dark:bg-error-950/80",
    success: "bg-success-100/90 dark:bg-success-950/80",
    warning: "bg-warning-100/90 dark:bg-warning-950/80",
    info: "bg-info-100/90 dark:bg-info-950/80",
  },
};
