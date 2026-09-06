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
          "bg-primary-600 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-neutral-white text-primary-600 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 border-transparent hover:bg-neutral-300 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    secondary: {
      checked: {
        track:
          "bg-secondary-600 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-neutral-white text-secondary-600 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 border-transparent hover:bg-neutral-300 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    error: {
      checked: {
        track:
          "bg-error-600 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-neutral-white text-error-600 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 border-transparent hover:bg-neutral-300 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    success: {
      checked: {
        track:
          "bg-success-600 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-neutral-white text-success-600 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 border-transparent hover:bg-neutral-300 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    warning: {
      checked: {
        track:
          "bg-warning-500 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-neutral-white text-warning-500 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 border-transparent hover:bg-neutral-300 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    info: {
      checked: {
        track:
          "bg-info-600 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-neutral-white text-info-600 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 border-transparent hover:bg-neutral-300 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    neutral: {
      checked: {
        track:
          "bg-neutral-800 border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-white text-neutral-800 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-200 border-transparent hover:bg-neutral-300 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
  },
  outline: {
    primary: {
      checked: {
        track:
          "bg-primary-50 border-2 border-primary-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-primary-600 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 hover:border-neutral-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-neutral-400 text-neutral-white shadow-sm",
      },
    },
    secondary: {
      checked: {
        track:
          "bg-secondary-50 border-2 border-secondary-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-secondary-600 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 hover:border-neutral-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-neutral-400 text-neutral-white shadow-sm",
      },
    },
    error: {
      checked: {
        track:
          "bg-error-50 border-2 border-error-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-error-600 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 hover:border-neutral-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-neutral-400 text-neutral-white shadow-sm",
      },
    },
    success: {
      checked: {
        track:
          "bg-success-50 border-2 border-success-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-success-600 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 hover:border-neutral-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-neutral-400 text-neutral-white shadow-sm",
      },
    },
    warning: {
      checked: {
        track:
          "bg-warning-50 border-2 border-warning-500 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-warning-500 text-neutral-950 shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 hover:border-neutral-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-neutral-400 text-neutral-white shadow-sm",
      },
    },
    info: {
      checked: {
        track:
          "bg-info-50 border-2 border-info-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-info-600 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 hover:border-neutral-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-neutral-400 text-neutral-white shadow-sm",
      },
    },
    neutral: {
      checked: {
        track:
          "bg-neutral-100 border-2 border-neutral-800 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-800 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-transparent border-2 border-neutral-300 hover:border-neutral-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-400 text-neutral-white shadow-sm",
      },
    },
  },
  soft: {
    primary: {
      checked: {
        track:
          "bg-primary-100 border border-primary-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-primary-600 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 border border-neutral-200 hover:bg-neutral-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    secondary: {
      checked: {
        track:
          "bg-secondary-100 border border-secondary-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-secondary-600 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 border border-neutral-200 hover:bg-neutral-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-secondary-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    error: {
      checked: {
        track:
          "bg-error-100 border border-error-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-error-600 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 border border-neutral-200 hover:bg-neutral-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-error-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    success: {
      checked: {
        track:
          "bg-success-100 border border-success-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-success-600 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 border border-neutral-200 hover:bg-neutral-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-success-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    warning: {
      checked: {
        track:
          "bg-warning-100 border border-warning-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-warning-500 text-neutral-950 shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 border border-neutral-200 hover:bg-neutral-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-warning-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    info: {
      checked: {
        track:
          "bg-info-100 border border-info-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-info-600 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 border border-neutral-200 hover:bg-neutral-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-info-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
    neutral: {
      checked: {
        track:
          "bg-neutral-200 border border-neutral-300 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-800 text-neutral-white shadow-sm",
      },
      unchecked: {
        track:
          "bg-neutral-100 border border-neutral-200 hover:bg-neutral-200/70 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-neutral-400",
        thumb: "bg-neutral-white text-neutral-400 shadow-sm",
      },
    },
  },
};
