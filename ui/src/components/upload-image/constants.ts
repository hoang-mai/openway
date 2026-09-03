import { UploadImageColor, UploadImageRadius, UploadImageSize, UploadImageVariant } from "./types";

export const uploadImageRadiusConfig: Record<UploadImageRadius, string> = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
};

export const uploadImageLabelColorConfig: Record<UploadImageColor, string> = {
  primary: "text-primary-500 group-focus-within/field:text-primary-600",
  secondary: "text-secondary-500 group-focus-within/field:text-secondary-600",
  neutral: "text-neutral-600 group-focus-within/field:text-neutral-800",
  error: "text-error-500 group-focus-within/field:text-error-600",
  success: "text-success-500 group-focus-within/field:text-success-600",
  warning: "text-warning-500 group-focus-within/field:text-warning-600",
  info: "text-info-500 group-focus-within/field:text-info-600",
};

export const dropzoneImageHeights: Record<UploadImageSize, string> = {
  xs: "h-28",
  sm: "h-36",
  md: "h-48",
  lg: "h-60",
  xl: "h-72",
};
export const uploadImageSizeConfig: Record<
  UploadImageSize,
  {
    dropzoneHeight: string;
    dropzonePadding: string;
    avatarSize: string;
    thumbnailSize: string;
    iconSize: number;
    titleSize: string;
    descSize: string;
    labelSize: string;
    helperSize: string;
    gap: string;
  }
> = {
  xs: {
    dropzoneHeight: "min-h-[80px]",
    dropzonePadding: "p-3",
    avatarSize: "size-12",
    thumbnailSize: "size-12",
    iconSize: 24,
    titleSize: "text-[11px]",
    descSize: "text-[10px]",
    labelSize: "text-[11px] mb-1",
    helperSize: "text-[9px] mt-0.5",
    gap: "gap-1.5",
  },
  sm: {
    dropzoneHeight: "min-h-[100px]",
    dropzonePadding: "p-4",
    avatarSize: "size-16",
    thumbnailSize: "size-16",
    iconSize: 32,
    titleSize: "text-xs",
    descSize: "text-[11px]",
    labelSize: "text-xs mb-1",
    helperSize: "text-[10px] mt-0.5",
    gap: "gap-2",
  },
  md: {
    dropzoneHeight: "min-h-[130px]",
    dropzonePadding: "p-5",
    avatarSize: "size-24",
    thumbnailSize: "size-20",
    iconSize: 44,
    titleSize: "text-sm",
    descSize: "text-xs",
    labelSize: "text-sm mb-1.5",
    helperSize: "text-[11px] mt-1",
    gap: "gap-3",
  },
  lg: {
    dropzoneHeight: "min-h-[160px]",
    dropzonePadding: "p-6",
    avatarSize: "size-28",
    thumbnailSize: "size-24",
    iconSize: 54,
    titleSize: "text-base",
    descSize: "text-xs",
    labelSize: "text-base mb-1.5",
    helperSize: "text-xs mt-1",
    gap: "gap-3.5",
  },
  xl: {
    dropzoneHeight: "min-h-[200px]",
    dropzonePadding: "p-8",
    avatarSize: "size-36",
    thumbnailSize: "size-28",
    iconSize: 64,
    titleSize: "text-lg",
    descSize: "text-sm",
    labelSize: "text-lg mb-2",
    helperSize: "text-sm mt-1",
    gap: "gap-4",
  },
};

export const uploadImageVariantColorConfig: Record<
  Exclude<UploadImageVariant, "other">,
  Record<
    UploadImageColor,
    {
      idle: string;
      active: string;
      iconColor: string;
      titleHover: string;
    }
  >
> = {
  // 1. OUTLINE
  outline: {
    primary: {
      idle: "bg-neutral-white border-primary-400 hover:border-primary-500 text-neutral-700",
      active: "bg-primary-50/50 border-primary-500 ring-2 ring-primary-500/20 text-primary-900",
      iconColor: "text-primary-500",
      titleHover: "group-hover:text-primary-600",
    },
    secondary: {
      idle: "bg-neutral-white border-secondary-400 hover:border-secondary-500 text-neutral-700",
      active: "bg-secondary-50/50 border-secondary-500 ring-2 ring-secondary-500/20 text-secondary-900",
      iconColor: "text-secondary-500",
      titleHover: "group-hover:text-secondary-600",
    },
    neutral: {
      idle: "bg-neutral-white border-neutral-300 hover:border-neutral-400 text-neutral-700",
      active: "bg-neutral-100/70 border-neutral-500 ring-2 ring-neutral-500/20 text-neutral-900",
      iconColor: "text-neutral-500",
      titleHover: "group-hover:text-neutral-900",
    },
    error: {
      idle: "bg-neutral-white border-error-500 hover:border-error-600 text-neutral-700",
      active: "bg-error-50/50 border-error-500 ring-2 ring-error-500/20 text-error-900",
      iconColor: "text-error-500",
      titleHover: "group-hover:text-error-600",
    },
    success: {
      idle: "bg-neutral-white border-success-400 hover:border-success-500 text-neutral-700",
      active: "bg-success-50/50 border-success-500 ring-2 ring-success-500/20 text-success-900",
      iconColor: "text-success-500",
      titleHover: "group-hover:text-success-600",
    },
    warning: {
      idle: "bg-neutral-white border-warning-400 hover:border-warning-500 text-neutral-700",
      active: "bg-warning-50/50 border-warning-500 ring-2 ring-warning-500/20 text-warning-900",
      iconColor: "text-warning-500",
      titleHover: "group-hover:text-warning-600",
    },
    info: {
      idle: "bg-neutral-white border-info-400 hover:border-info-500 text-neutral-700",
      active: "bg-info-50/50 border-info-500 ring-2 ring-info-500/20 text-info-900",
      iconColor: "text-info-500",
      titleHover: "group-hover:text-info-600",
    },
  },

  // 2. FILLED
  filled: {
    primary: {
      idle: "bg-primary-50/60 border-primary-200 hover:bg-primary-100/60 hover:border-primary-400 text-primary-900",
      active: "bg-primary-100 border-primary-500 ring-2 ring-primary-500/20 text-primary-950",
      iconColor: "text-primary-600",
      titleHover: "group-hover:text-primary-700",
    },
    secondary: {
      idle: "bg-secondary-50/60 border-secondary-200 hover:bg-secondary-100/60 hover:border-secondary-400 text-secondary-900",
      active: "bg-secondary-100 border-secondary-500 ring-2 ring-secondary-500/20 text-secondary-950",
      iconColor: "text-secondary-600",
      titleHover: "group-hover:text-secondary-700",
    },
    neutral: {
      idle: "bg-neutral-100/70 border-neutral-200 hover:bg-neutral-200/70 hover:border-neutral-400 text-neutral-800",
      active: "bg-neutral-200 border-neutral-500 ring-2 ring-neutral-500/20 text-neutral-900",
      iconColor: "text-neutral-600",
      titleHover: "group-hover:text-neutral-950",
    },
    error: {
      idle: "bg-error-50/60 border-error-200 hover:bg-error-100/60 hover:border-error-400 text-error-900",
      active: "bg-error-100 border-error-500 ring-2 ring-error-500/20 text-error-950",
      iconColor: "text-error-600",
      titleHover: "group-hover:text-error-700",
    },
    success: {
      idle: "bg-success-50/60 border-success-200 hover:bg-success-100/60 hover:border-success-400 text-success-900",
      active: "bg-success-100 border-success-500 ring-2 ring-success-500/20 text-success-950",
      iconColor: "text-success-600",
      titleHover: "group-hover:text-success-700",
    },
    warning: {
      idle: "bg-warning-50/60 border-warning-200 hover:bg-warning-100/60 hover:border-warning-400 text-warning-900",
      active: "bg-warning-100 border-warning-500 ring-2 ring-warning-500/20 text-warning-950",
      iconColor: "text-warning-600",
      titleHover: "group-hover:text-warning-700",
    },
    info: {
      idle: "bg-info-50/60 border-info-200 hover:bg-info-100/60 hover:border-info-400 text-info-900",
      active: "bg-info-100 border-info-500 ring-2 ring-info-500/20 text-info-950",
      iconColor: "text-info-600",
      titleHover: "group-hover:text-info-700",
    },
  },

  // 3. GHOST
  ghost: {
    primary: {
      idle: "bg-transparent border-transparent hover:bg-primary-50/60 hover:border-primary-300 text-neutral-700",
      active: "bg-primary-50 border-primary-500 ring-2 ring-primary-500/20 text-primary-900",
      iconColor: "text-primary-500",
      titleHover: "group-hover:text-primary-600",
    },
    secondary: {
      idle: "bg-transparent border-transparent hover:bg-secondary-50/60 hover:border-secondary-300 text-neutral-700",
      active: "bg-secondary-50 border-secondary-500 ring-2 ring-secondary-500/20 text-secondary-900",
      iconColor: "text-secondary-500",
      titleHover: "group-hover:text-secondary-600",
    },
    neutral: {
      idle: "bg-transparent border-transparent hover:bg-neutral-100 hover:border-neutral-300 text-neutral-700",
      active: "bg-neutral-100 border-neutral-500 ring-2 ring-neutral-500/20 text-neutral-900",
      iconColor: "text-neutral-500",
      titleHover: "group-hover:text-neutral-900",
    },
    error: {
      idle: "bg-transparent border-transparent hover:bg-error-50/60 hover:border-error-300 text-neutral-700",
      active: "bg-error-50 border-error-500 ring-2 ring-error-500/20 text-error-900",
      iconColor: "text-error-500",
      titleHover: "group-hover:text-error-600",
    },
    success: {
      idle: "bg-transparent border-transparent hover:bg-success-50/60 hover:border-success-300 text-neutral-700",
      active: "bg-success-50 border-success-500 ring-2 ring-success-500/20 text-success-900",
      iconColor: "text-success-500",
      titleHover: "group-hover:text-success-600",
    },
    warning: {
      idle: "bg-transparent border-transparent hover:bg-warning-50/60 hover:border-warning-300 text-neutral-700",
      active: "bg-warning-50 border-warning-500 ring-2 ring-warning-500/20 text-warning-900",
      iconColor: "text-warning-500",
      titleHover: "group-hover:text-warning-600",
    },
    info: {
      idle: "bg-transparent border-transparent hover:bg-info-50/60 hover:border-info-300 text-neutral-700",
      active: "bg-info-50 border-info-500 ring-2 ring-info-500/20 text-info-900",
      iconColor: "text-info-500",
      titleHover: "group-hover:text-info-600",
    },
  },
};
