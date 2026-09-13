import React from "react";
import { AlertColor, AlertRadius, AlertSize, AlertVariant } from "./types";
import InfoCircleIcon from "../icons/InfoCircleIcon";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import AlertTriangleIcon from "../icons/AlertTriangleIcon";
import AlertCircleIcon from "../icons/AlertCircleIcon";


export const sizeConfig: Record<
  AlertSize,
  {
    container: string;
    title: string;
    description: string;
    icon: string;
    closeButton: string;
    closeIcon: string;
    action: string;
  }
> = {
  xs: {
    container: "p-2 gap-2 text-xs",
    title: "text-xs font-semibold leading-tight",
    description: "text-[11px] leading-tight",
    icon: "size-3.5 mt-0.5",
    closeButton: "size-4 p-0.5 -mr-0.5",
    closeIcon: "size-3",
    action: "gap-1.5 text-xs",
  },
  sm: {
    container: "p-2.5 gap-2.5 text-xs",
    title: "text-sm font-semibold leading-tight",
    description: "text-xs leading-normal",
    icon: "size-4 mt-0.5",
    closeButton: "size-5 p-0.5 -mr-0.5",
    closeIcon: "size-3.5",
    action: "gap-1.5 text-xs",
  },
  md: {
    container: "p-3.5 gap-3 text-sm",
    title: "text-sm font-semibold leading-tight",
    description: "text-sm leading-normal",
    icon: "size-5 mt-0.5",
    closeButton: "size-6 p-1 -mr-1",
    closeIcon: "size-4",
    action: "gap-2 text-sm",
  },
  lg: {
    container: "p-4 gap-3.5 text-base",
    title: "text-base font-semibold leading-snug",
    description: "text-sm leading-normal",
    icon: "size-6 mt-0.5",
    closeButton: "size-7 p-1.5 -mr-1.5",
    closeIcon: "size-4.5",
    action: "gap-2.5 text-sm",
  },
  xl: {
    container: "p-5 gap-4 text-lg",
    title: "text-lg font-semibold leading-snug",
    description: "text-base leading-normal",
    icon: "size-7 mt-0.5",
    closeButton: "size-8 p-1.5 -mr-1.5",
    closeIcon: "size-5",
    action: "gap-3 text-base",
  },
};

export const radiusConfig: Record<AlertRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-2xl",
};

export const variantColorConfig: Record<Exclude<AlertVariant, "other">, Record<AlertColor, string>> = {
  soft: {
    primary: "bg-primary-50 text-primary-900 border border-primary-200/80",
    secondary: "bg-secondary-50 text-secondary-900 border border-secondary-200/80",
    neutral: "bg-neutral-100 text-neutral-900 border border-neutral-200/80",
    error: "bg-error-50 text-error-900 border border-error-200/80",
    success: "bg-success-50 text-success-900 border border-success-200/80",
    warning: "bg-warning-50 text-warning-900 border border-warning-200/80",
    info: "bg-info-50 text-info-900 border border-info-200/80",
  },
  filled: {
    primary: "bg-primary-600 text-white border border-primary-600 shadow-xs",
    secondary: "bg-secondary-600 text-white border border-secondary-600 shadow-xs",
    neutral: "bg-neutral-800 text-white border border-neutral-800 shadow-xs",
    error: "bg-error-600 text-white border border-error-600 shadow-xs",
    success: "bg-success-600 text-white border border-success-600 shadow-xs",
    warning: "bg-warning-500 text-neutral-950 border border-warning-500 shadow-xs",
    info: "bg-info-600 text-white border border-info-600 shadow-xs",
  },
  outline: {
    primary: "bg-neutral-white text-primary-700 border border-primary-300",
    secondary: "bg-neutral-white text-secondary-700 border border-secondary-300",
    neutral: "bg-neutral-white text-neutral-700 border border-neutral-300",
    error: "bg-neutral-white text-error-700 border border-error-300",
    success: "bg-neutral-white text-success-700 border border-success-300",
    warning: "bg-neutral-white text-warning-800 border border-warning-300",
    info: "bg-neutral-white text-info-700 border border-info-300",
  },
  "accent-left": {
    primary: "bg-primary-50/70 text-primary-900 border border-primary-200/80 border-l-4 border-l-primary-500",
    secondary: "bg-secondary-50/70 text-secondary-900 border border-secondary-200/80 border-l-4 border-l-secondary-500",
    neutral: "bg-neutral-50/70 text-neutral-900 border border-neutral-200/80 border-l-4 border-l-neutral-500",
    error: "bg-error-50/70 text-error-900 border border-error-200/80 border-l-4 border-l-error-500",
    success: "bg-success-50/70 text-success-900 border border-success-200/80 border-l-4 border-l-success-500",
    warning: "bg-warning-50/70 text-warning-900 border border-warning-200/80 border-l-4 border-l-warning-500",
    info: "bg-info-50/70 text-info-900 border border-info-200/80 border-l-4 border-l-info-500",
  },
  ghost: {
    primary: "bg-transparent text-primary-800 border border-transparent",
    secondary: "bg-transparent text-secondary-800 border border-transparent",
    neutral: "bg-transparent text-neutral-800 border border-transparent",
    error: "bg-transparent text-error-700 border border-transparent",
    success: "bg-transparent text-success-700 border border-transparent",
    warning: "bg-transparent text-warning-800 border border-transparent",
    info: "bg-transparent text-info-800 border border-transparent",
  },
};

export const iconColorConfig: Record<Exclude<AlertVariant, "other">, Record<AlertColor, string>> = {
  soft: {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    neutral: "text-neutral-600",
    error: "text-error-600",
    success: "text-success-600",
    warning: "text-warning-600",
    info: "text-info-600",
  },
  filled: {
    primary: "text-white",
    secondary: "text-white",
    neutral: "text-white",
    error: "text-white",
    success: "text-white",
    warning: "text-neutral-950",
    info: "text-white",
  },
  outline: {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    neutral: "text-neutral-600",
    error: "text-error-600",
    success: "text-success-600",
    warning: "text-warning-600",
    info: "text-info-600",
  },
  "accent-left": {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    neutral: "text-neutral-600",
    error: "text-error-600",
    success: "text-success-600",
    warning: "text-warning-600",
    info: "text-info-600",
  },
  ghost: {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    neutral: "text-neutral-600",
    error: "text-error-600",
    success: "text-success-600",
    warning: "text-warning-600",
    info: "text-info-600",
  },
};

export const defaultIcons: Record<AlertColor, React.ComponentType<{ className?: string }>> = {
  primary: InfoCircleIcon,
  secondary: InfoCircleIcon,
  neutral: InfoCircleIcon,
  info: InfoCircleIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  error: AlertCircleIcon,
};