import { DropdownSize, DropdownRadius, DropdownColor } from "./types";

export const sizeConfig: Record<
  DropdownSize,
  {
    menu: string;
    item: string;
    itemGap: string;
    icon: string;
    header: string;
    description: string;
    shortcut: string;
  }
> = {
  xs: {
    menu: "p-1 min-w-36 text-xs",
    item: "px-2 py-1 text-xs rounded",
    itemGap: "gap-1.5",
    icon: "size-3.5",
    header: "px-2 py-1 text-[0.625rem]",
    description: "text-[0.625rem]",
    shortcut: "text-[0.625rem] px-1 py-0.5",
  },
  sm: {
    menu: "p-1.5 min-w-44 text-xs",
    item: "px-2.5 py-1.5 text-xs rounded-md",
    itemGap: "gap-2",
    icon: "size-4",
    header: "px-2.5 py-1 text-xs",
    description: "text-[0.6875rem]",
    shortcut: "text-[0.6875rem] px-1.5 py-0.5",
  },
  md: {
    menu: "p-1.5 min-w-52 text-sm",
    item: "px-3 py-2 text-sm rounded-lg",
    itemGap: "gap-2.5",
    icon: "size-4.5",
    header: "px-3 py-1.5 text-xs",
    description: "text-xs",
    shortcut: "text-xs px-1.5 py-0.5",
  },
  lg: {
    menu: "p-2 min-w-60 text-base",
    item: "px-3.5 py-2.5 text-base rounded-xl",
    itemGap: "gap-3",
    icon: "size-5",
    header: "px-3.5 py-1.5 text-sm",
    description: "text-sm",
    shortcut: "text-sm px-2 py-0.5",
  },
  xl: {
    menu: "p-2.5 min-w-72 text-lg",
    item: "px-4 py-3 text-lg rounded-2xl",
    itemGap: "gap-3.5",
    icon: "size-6",
    header: "px-4 py-2 text-base",
    description: "text-base",
    shortcut: "text-base px-2 py-1",
  },
};

export const radiusConfig: Record<DropdownRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-3xl",
};

export const colorConfig: Record<
  DropdownColor,
  {
    active: string;
    selected: string;
    focus: string;
  }
> = {
  primary: {
    active: "bg-primary-50 text-primary-900 dark:bg-primary-950/70 dark:text-primary-200",
    selected: "bg-primary-100 text-primary-900 font-medium dark:bg-primary-900/40 dark:text-primary-100",
    focus: "focus:bg-primary-50 focus:text-primary-900 dark:focus:bg-primary-950/70 dark:focus:text-primary-200",
  },
  secondary: {
    active: "bg-secondary-50 text-secondary-900 dark:bg-secondary-950/70 dark:text-secondary-200",
    selected: "bg-secondary-100 text-secondary-900 font-medium dark:bg-secondary-900/40 dark:text-secondary-100",
    focus: "focus:bg-secondary-50 focus:text-secondary-900 dark:focus:bg-secondary-950/70 dark:focus:text-secondary-200",
  },
  neutral: {
    active: "bg-neutral-100 text-neutral-900",
    selected: "bg-neutral-200 text-neutral-900 font-medium",
    focus: "focus:bg-neutral-100 focus:text-neutral-900",
  },
  error: {
    active: "bg-error-50 text-error-900 dark:bg-error-950/70 dark:text-error-200",
    selected: "bg-error-100 text-error-900 font-medium dark:bg-error-900/40 dark:text-error-100",
    focus: "focus:bg-error-50 focus:text-error-900 dark:focus:bg-error-950/70 dark:focus:text-error-200",
  },
  success: {
    active: "bg-success-50 text-success-900 dark:bg-success-950/70 dark:text-success-200",
    selected: "bg-success-100 text-success-900 font-medium dark:bg-success-900/40 dark:text-success-100",
    focus: "focus:bg-success-50 focus:text-success-900 dark:focus:bg-success-950/70 dark:focus:text-success-200",
  },
  warning: {
    active: "bg-warning-50 text-warning-900 dark:bg-warning-950/70 dark:text-warning-200",
    selected: "bg-warning-100 text-warning-900 font-medium dark:bg-warning-900/40 dark:text-warning-100",
    focus: "focus:bg-warning-50 focus:text-warning-900 dark:focus:bg-warning-950/70 dark:focus:text-warning-200",
  },
  info: {
    active: "bg-info-50 text-info-900 dark:bg-info-950/70 dark:text-info-200",
    selected: "bg-info-100 text-info-900 font-medium dark:bg-info-900/40 dark:text-info-100",
    focus: "focus:bg-info-50 focus:text-info-900 dark:focus:bg-info-950/70 dark:focus:text-info-200",
  },
};

export const dangerStyles = {
  default: "text-error-600 hover:bg-error-50 hover:text-error-700 dark:text-error-400 dark:hover:bg-error-950/40 dark:hover:text-error-300",
  active: "bg-error-50 text-error-700 dark:bg-error-950/70 dark:text-error-300",
  focus: "focus:bg-error-50 focus:text-error-700 dark:focus:bg-error-950/70 dark:focus:text-error-300",
};
