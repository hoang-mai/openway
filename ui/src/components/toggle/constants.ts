import { ToggleSize, ToggleVariant, ToggleColor, ToggleRadius } from "./types";

export const sizeConfig: Record<
  ToggleSize,
  {
    track: string;
    thumb: string;
    translate: string;
    icon: string;
    content: string;
    label: string;
    gap: string;
    helper: string;
  }
> = {
  xs: {
    track: "w-7 h-4 p-0.5",
    thumb: "size-3",
    translate: "translate-x-3",
    icon: "size-2",
    content: "text-[9px]",
    label: "text-xs leading-4",
    gap: "gap-1.5",
    helper: "text-[10px]",
  },
  sm: {
    track: "w-9 h-5 p-0.5",
    thumb: "size-4",
    translate: "translate-x-4",
    icon: "size-2.5",
    content: "text-[10px]",
    label: "text-sm leading-4",
    gap: "gap-2",
    helper: "text-[11px]",
  },
  md: {
    track: "w-11 h-6 p-0.5",
    thumb: "size-5",
    translate: "translate-x-5",
    icon: "size-3",
    content: "text-xs",
    label: "text-sm leading-5",
    gap: "gap-2.5",
    helper: "text-xs",
  },
  lg: {
    track: "w-13 h-7 p-0.5",
    thumb: "size-6",
    translate: "translate-x-6",
    icon: "size-3.5",
    content: "text-xs",
    label: "text-base leading-6",
    gap: "gap-3",
    helper: "text-xs",
  },
  xl: {
    track: "w-16 h-9 p-1",
    thumb: "size-7",
    translate: "translate-x-7",
    icon: "size-4",
    content: "text-sm",
    label: "text-lg leading-7",
    gap: "gap-3.5",
    helper: "text-sm",
  },
};

export const radiusConfig: Record<ToggleRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export interface TrackThumbStyles {
  track: string;
  thumb: string;
}

export const variantColorConfig: Record<
  Exclude<ToggleVariant, "other">,
  Record<
    ToggleColor,
    {
      checked: TrackThumbStyles;
      unchecked: TrackThumbStyles;
    }
  >
> = {
  filled: {
    primary: {
      checked: {
        track:
          "bg-primary-600 dark:bg-primary-500 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-neutral-white text-primary-600 dark:text-primary-500 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 dark:bg-neutral-700 border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-neutral-white text-neutral-400 dark:bg-neutral-200 dark:text-neutral-600 shadow-sm",
      },
    },
    secondary: {
      checked: {
        track:
          "bg-secondary-600 dark:bg-secondary-500 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-neutral-white text-secondary-600 dark:text-secondary-500 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 dark:bg-neutral-700 border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-neutral-white text-neutral-400 dark:bg-neutral-200 dark:text-neutral-600 shadow-sm",
      },
    },
    error: {
      checked: {
        track:
          "bg-error-600 dark:bg-error-500 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-neutral-white text-error-600 dark:text-error-500 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 dark:bg-neutral-700 border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-neutral-white text-neutral-400 dark:bg-neutral-200 dark:text-neutral-600 shadow-sm",
      },
    },
    success: {
      checked: {
        track:
          "bg-success-600 dark:bg-success-500 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-neutral-white text-success-600 dark:text-success-500 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 dark:bg-neutral-700 border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-neutral-white text-neutral-400 dark:bg-neutral-200 dark:text-neutral-600 shadow-sm",
      },
    },
    warning: {
      checked: {
        track:
          "bg-warning-500 dark:bg-warning-400 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-neutral-white text-warning-500 dark:bg-neutral-900 dark:text-warning-400 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 dark:bg-neutral-700 border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-neutral-white text-neutral-400 dark:bg-neutral-200 dark:text-neutral-600 shadow-sm",
      },
    },
    info: {
      checked: {
        track:
          "bg-info-600 dark:bg-info-500 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-neutral-white text-info-600 dark:text-info-500 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 dark:bg-neutral-700 border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-neutral-white text-neutral-400 dark:bg-neutral-200 dark:text-neutral-600 shadow-sm",
      },
    },
    neutral: {
      checked: {
        track:
          "bg-neutral-800 dark:bg-neutral-200 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 dark:bg-neutral-700 border-transparent hover:bg-neutral-300 dark:hover:bg-neutral-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-white text-neutral-400 dark:bg-neutral-200 dark:text-neutral-600 shadow-sm",
      },
    },
  },
  outline: {
    primary: {
      checked: {
        track:
          "bg-primary-50 dark:bg-primary-950/40 border-2 border-primary-600 dark:border-primary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-primary-600 dark:bg-primary-500 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-neutral-400 dark:bg-neutral-500 text-neutral-white shadow-sm",
      },
    },
    secondary: {
      checked: {
        track:
          "bg-secondary-50 dark:bg-secondary-950/40 border-2 border-secondary-600 dark:border-secondary-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-secondary-600 dark:bg-secondary-500 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-neutral-400 dark:bg-neutral-500 text-neutral-white shadow-sm",
      },
    },
    error: {
      checked: {
        track:
          "bg-error-50 dark:bg-error-950/40 border-2 border-error-600 dark:border-error-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-error-600 dark:bg-error-500 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-neutral-400 dark:bg-neutral-500 text-neutral-white shadow-sm",
      },
    },
    success: {
      checked: {
        track:
          "bg-success-50 dark:bg-success-950/40 border-2 border-success-600 dark:border-success-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-success-600 dark:bg-success-500 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-neutral-400 dark:bg-neutral-500 text-neutral-white shadow-sm",
      },
    },
    warning: {
      checked: {
        track:
          "bg-warning-50 dark:bg-warning-950/40 border-2 border-warning-500 dark:border-warning-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-warning-500 dark:bg-warning-400 text-neutral-950 shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-neutral-400 dark:bg-neutral-500 text-neutral-white shadow-sm",
      },
    },
    info: {
      checked: {
        track:
          "bg-info-50 dark:bg-info-950/40 border-2 border-info-600 dark:border-info-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-info-600 dark:bg-info-500 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-neutral-400 dark:bg-neutral-500 text-neutral-white shadow-sm",
      },
    },
    neutral: {
      checked: {
        track:
          "bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-800 dark:border-neutral-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-800 dark:bg-neutral-200 text-neutral-white dark:text-neutral-900 shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-400 dark:bg-neutral-500 text-neutral-white shadow-sm",
      },
    },
  },
  soft: {
    primary: {
      checked: {
        track:
          "bg-primary-100 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-primary-600 dark:bg-primary-500 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-neutral-white dark:bg-neutral-300 text-neutral-400 dark:text-neutral-600 shadow-sm",
      },
    },
    secondary: {
      checked: {
        track:
          "bg-secondary-100 dark:bg-secondary-900/50 border border-secondary-200 dark:border-secondary-800 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-secondary-600 dark:bg-secondary-500 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-neutral-white dark:bg-neutral-300 text-neutral-400 dark:text-neutral-600 shadow-sm",
      },
    },
    error: {
      checked: {
        track:
          "bg-error-100 dark:bg-error-900/50 border border-error-200 dark:border-error-800 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-error-600 dark:bg-error-500 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-neutral-white dark:bg-neutral-300 text-neutral-400 dark:text-neutral-600 shadow-sm",
      },
    },
    success: {
      checked: {
        track:
          "bg-success-100 dark:bg-success-900/50 border border-success-200 dark:border-success-800 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-success-600 dark:bg-success-500 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-neutral-white dark:bg-neutral-300 text-neutral-400 dark:text-neutral-600 shadow-sm",
      },
    },
    warning: {
      checked: {
        track:
          "bg-warning-100 dark:bg-warning-900/50 border border-warning-200 dark:border-warning-800 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-warning-500 dark:bg-warning-400 text-neutral-950 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-neutral-white dark:bg-neutral-300 text-neutral-400 dark:text-neutral-600 shadow-sm",
      },
    },
    info: {
      checked: {
        track:
          "bg-info-100 dark:bg-info-900/50 border border-info-200 dark:border-info-800 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-info-600 dark:bg-info-500 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-neutral-white dark:bg-neutral-300 text-neutral-400 dark:text-neutral-600 shadow-sm",
      },
    },
    neutral: {
      checked: {
        track:
          "bg-neutral-200 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-800 dark:bg-neutral-200 text-neutral-white dark:text-neutral-900 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-white dark:bg-neutral-300 text-neutral-400 dark:text-neutral-600 shadow-sm",
      },
    },
  },
};
