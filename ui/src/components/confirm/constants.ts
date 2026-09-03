import { ConfirmColor, ConfirmRadius, ConfirmSize } from "./types";
import { ButtonSize } from "../button/types";
import AlertTriangleIcon from "../icons/AlertTriangleIcon";
import AlertCircleIcon from "../icons/AlertCircleIcon";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import InfoCircleIcon from "../icons/InfoCircleIcon";
import { ComponentType } from "react";

export const CONFIRM_EXIT_ANIMATION_DURATION = 300;

export const sizeConfig: Record<
  ConfirmSize,
  {
    dialog: string;
    header: string;
    body: string;
    footer: string;
    title: string;
    description: string;
    iconWrapper: string;
    icon: string;
    buttonSize: ButtonSize;
    buttonGap: string;
    closeButton: string;
    closeIcon: string;
  }
> = {
  xs: {
    dialog: "max-w-[320px] p-4 gap-3",
    header: "gap-2.5",
    body: "text-xs",
    footer: "gap-2 pt-2",
    title: "text-sm font-semibold leading-tight text-neutral-900",
    description: "text-xs leading-normal text-neutral-600",
    iconWrapper: "size-7 rounded-full",
    icon: "size-4",
    buttonSize: "xs",
    buttonGap: "gap-2",
    closeButton: "size-5 p-0.5 -mr-1 -mt-1",
    closeIcon: "size-3.5",
  },
  sm: {
    dialog: "max-w-[380px] p-5 gap-3.5",
    header: "gap-3",
    body: "text-sm",
    footer: "gap-2.5 pt-2.5",
    title: "text-base font-semibold leading-tight text-neutral-900",
    description: "text-sm leading-normal text-neutral-600",
    iconWrapper: "size-9 rounded-full",
    icon: "size-5",
    buttonSize: "sm",
    buttonGap: "gap-2.5",
    closeButton: "size-6 p-0.5 -mr-1 -mt-1",
    closeIcon: "size-4",
  },
  md: {
    dialog: "max-w-[440px] p-6 gap-4",
    header: "gap-3.5",
    body: "text-sm",
    footer: "gap-3 pt-3",
    title: "text-lg font-semibold leading-tight text-neutral-900",
    description: "text-sm leading-relaxed text-neutral-600",
    iconWrapper: "size-10 rounded-full",
    icon: "size-5",
    buttonSize: "md",
    buttonGap: "gap-3",
    closeButton: "size-7 p-1 -mr-1.5 -mt-1.5",
    closeIcon: "size-4",
  },
  lg: {
    dialog: "max-w-[520px] p-7 gap-5",
    header: "gap-4",
    body: "text-base",
    footer: "gap-3.5 pt-3.5",
    title: "text-xl font-semibold leading-snug text-neutral-900",
    description: "text-base leading-relaxed text-neutral-600",
    iconWrapper: "size-12 rounded-full",
    icon: "size-6",
    buttonSize: "lg",
    buttonGap: "gap-3.5",
    closeButton: "size-8 p-1.5 -mr-1.5 -mt-1.5",
    closeIcon: "size-4.5",
  },
  xl: {
    dialog: "max-w-[600px] p-8 gap-6",
    header: "gap-4.5",
    body: "text-lg",
    footer: "gap-4 pt-4",
    title: "text-2xl font-bold leading-snug text-neutral-900",
    description: "text-lg leading-relaxed text-neutral-600",
    iconWrapper: "size-14 rounded-full",
    icon: "size-7",
    buttonSize: "xl",
    buttonGap: "gap-4",
    closeButton: "size-9 p-1.5 -mr-2 -mt-2",
    closeIcon: "size-5",
  },
};

export const radiusConfig: Record<ConfirmRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-2xl",
};

export const iconBadgeColorConfig: Record<ConfirmColor, string> = {
  primary: "bg-primary-50 text-primary-600 border border-primary-200",
  secondary: "bg-secondary-50 text-secondary-600 border border-secondary-200",
  neutral: "bg-neutral-100 text-neutral-600 border border-neutral-200",
  error: "bg-error-50 text-error-600 border border-error-200",
  success: "bg-success-50 text-success-600 border border-success-200",
  warning: "bg-warning-50 text-warning-600 border border-warning-200",
  info: "bg-info-50 text-info-600 border border-info-200",
};

export const defaultIcons: Record<ConfirmColor, ComponentType<{ className?: string }>> = {
  warning: AlertTriangleIcon,
  error: AlertCircleIcon,
  success: CheckCircleIcon,
  info: InfoCircleIcon,
  primary: InfoCircleIcon,
  secondary: InfoCircleIcon,
  neutral: InfoCircleIcon,
};
