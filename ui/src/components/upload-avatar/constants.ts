import { UploadAvatarColor, UploadAvatarRadius, UploadAvatarSize, UploadAvatarVariant } from "./types";

export const uploadAvatarRadiusConfig: Record<UploadAvatarRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const uploadAvatarSizeConfig: Record<
  UploadAvatarSize,
  {
    avatarSize: string;
    iconSize: number;
    iconClass: string;
    label: string;
    helper: string;
    rounded: string;
  }
> = {
  xs: {
    avatarSize: "size-12",
    iconSize: 20,
    iconClass: "size-5",
    label: "text-[11px] mb-1",
    helper: "text-[9px] mt-0.5",
    rounded: "rounded",
  },
  sm: {
    avatarSize: "size-16",
    iconSize: 24,
    iconClass: "size-6",
    label: "text-xs mb-1",
    helper: "text-[10px] mt-0.5",
    rounded: "rounded-md",
  },
  md: {
    avatarSize: "size-20",
    iconSize: 32,
    iconClass: "size-8",
    label: "text-sm mb-1.5",
    helper: "text-[11px] mt-1",
    rounded: "rounded-lg",
  },
  lg: {
    avatarSize: "size-24",
    iconSize: 40,
    iconClass: "size-10",
    label: "text-base mb-1.5",
    helper: "text-xs mt-1",
    rounded: "rounded-xl",
  },
  xl: {
    avatarSize: "size-32",
    iconSize: 52,
    iconClass: "size-12",
    label: "text-lg mb-2",
    helper: "text-sm mt-1",
    rounded: "rounded-2xl",
  },
};

export const uploadAvatarVariantColorConfig: Record<
  Exclude<UploadAvatarVariant, "other">,
  Record<UploadAvatarColor, string>
> = {
  outline: {
    primary:
      "bg-neutral-white border-primary-300 hover:border-primary-400 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-neutral-white border-secondary-300 hover:border-secondary-400 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    error:
      "bg-neutral-white border-error-300 hover:border-error-400 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-neutral-white border-success-300 hover:border-success-400 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-neutral-white border-warning-300 hover:border-warning-400 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-neutral-white border-info-300 hover:border-info-400 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
    neutral:
      "bg-neutral-white border-neutral-300 hover:border-neutral-400 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/20",
  },
  filled: {
    primary:
      "bg-primary-50/60 border-primary-200 hover:bg-primary-100/60 focus-within:bg-primary-100/60 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-secondary-50/60 border-secondary-200 hover:bg-secondary-100/60 focus-within:bg-secondary-100/60 focus-within:border-secondary-500 focus-within:ring-2 focus-within:ring-secondary-500/20",
    neutral:
      "bg-neutral-50/60 border-neutral-200 hover:bg-neutral-200/60 focus-within:bg-neutral-200/60 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500/20",
    error:
      "bg-error-50/60 border-error-500 hover:border-error-600 hover:bg-error-100/60 focus-within:bg-error-100/60 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-success-50/60 border-success-200 hover:bg-success-100/60 focus-within:bg-success-100/60 focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-warning-50/60 border-warning-200 hover:bg-warning-100/60 focus-within:bg-warning-100/60 focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-info-50/60 border-info-200 hover:bg-info-100/60 focus-within:bg-info-100/60 focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/20",
  },
  ghost: {
    primary:
      "bg-transparent border-transparent hover:bg-primary-50/50 focus-within:bg-primary-50/50 focus-within:border-primary-200/20 focus-within:ring-2 focus-within:ring-primary-500/20",
    secondary:
      "bg-transparent border-transparent hover:bg-secondary-50/50 focus-within:bg-secondary-50/50 focus-within:border-secondary-200/20 focus-within:ring-2 focus-within:ring-secondary-500/20",
    neutral:
      "bg-transparent border-transparent hover:bg-neutral-50/50 focus-within:bg-neutral-50/50 focus-within:border-neutral-200/20 focus-within:ring-2 focus-within:ring-neutral-500/20",
    error:
      "bg-transparent border-transparent hover:bg-error-50/50 focus-within:bg-error-50/50 focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
    success:
      "bg-transparent border-transparent hover:bg-success-50/50 focus-within:bg-success-50/50 focus-within:border-success-200/20 focus-within:ring-2 focus-within:ring-success-500/20",
    warning:
      "bg-transparent border-transparent hover:bg-warning-50/50 focus-within:bg-warning-50/50 focus-within:border-warning-200/20 focus-within:ring-2 focus-within:ring-warning-500/20",
    info: "bg-transparent border-transparent hover:bg-info-50/50 focus-within:bg-info-50/50 focus-within:border-info-200/20 focus-within:ring-2 focus-within:ring-info-500/20",
  },
};

export const uploadAvatarIconColorConfig: Record<UploadAvatarColor, string> = {
  primary: "text-primary-500 group-hover/avatar:text-primary-600",
  secondary: "text-secondary-500 group-hover/avatar:text-secondary-600",
  neutral: "text-neutral-400 group-hover/avatar:text-neutral-600",
  error: "text-error-500 group-hover/avatar:text-error-600",
  success: "text-success-500 group-hover/avatar:text-success-600",
  warning: "text-warning-500 group-hover/avatar:text-warning-600",
  info: "text-info-500 group-hover/avatar:text-info-600",
};

export const uploadAvatarLabelColorConfig: Record<UploadAvatarColor, string> = {
  primary: "text-primary-500 group-focus-within/field:text-primary-600",
  secondary: "text-secondary-500 group-focus-within/field:text-secondary-600",
  error: "text-error-500 group-focus-within/field:text-error-600",
  success: "text-success-500 group-focus-within/field:text-success-600",
  warning: "text-warning-500 group-focus-within/field:text-warning-600",
  info: "text-info-500 group-focus-within/field:text-info-600",
  neutral: "text-neutral-500 group-focus-within/field:text-neutral-600",
};

export const uploadAvatarDragColorConfig: Record<UploadAvatarColor, string> = {
  primary: "ring-2 ring-primary-500/40 border-primary-500 bg-primary-50/80",
  secondary: "ring-2 ring-secondary-500/40 border-secondary-500 bg-secondary-50/80",
  neutral: "ring-2 ring-neutral-500/40 border-neutral-500 bg-neutral-50/80",
  error: "ring-2 ring-error-500/40 border-error-500 bg-error-50/80",
  success: "ring-2 ring-success-500/40 border-success-500 bg-success-50/80",
  warning: "ring-2 ring-warning-500/40 border-warning-500 bg-warning-50/80",
  info: "ring-2 ring-info-500/40 border-info-500 bg-info-50/80",
};
