import { ModalRadius, ModalSize } from "./types";

export const MODAL_EXIT_ANIMATION_DURATION = 250;

export const sizeConfig: Record<
  ModalSize,
  {
    dialog: string;
    header: string;
    body: string;
    footer: string;
    title: string;
    description: string;
    buttonGap: string;
    closeButton: string;
    closeIcon: string;
  }
> = {
  xs: {
    dialog: "max-w-[320px] p-3 gap-1.5",
    header: "gap-1.5",
    body: "text-xs",
    footer: "gap-1.5 pt-1.5",
    title: "text-sm font-semibold leading-tight text-neutral-900",
    description: "text-xs leading-normal text-neutral-600",
    buttonGap: "gap-1.5",
    closeButton: "size-5 p-0.5 -mr-1 -mt-1",
    closeIcon: "size-3.5",
  },
  sm: {
    dialog: "max-w-[400px] p-3.5 gap-2",
    header: "gap-2",
    body: "text-sm",
    footer: "gap-2 pt-2",
    title: "text-base font-semibold leading-tight text-neutral-900",
    description: "text-sm leading-normal text-neutral-600",
    buttonGap: "gap-2",
    closeButton: "size-6 p-0.5 -mr-1 -mt-1",
    closeIcon: "size-4",
  },
  md: {
    dialog: "max-w-[540px] p-4 gap-2.5",
    header: "gap-2.5",
    body: "text-sm",
    footer: "gap-2 pt-2",
    title: "text-lg font-semibold leading-tight text-neutral-900",
    description: "text-sm leading-relaxed text-neutral-600",
    buttonGap: "gap-2.5",
    closeButton: "size-7 p-1 -mr-1 -mt-1",
    closeIcon: "size-4",
  },
  lg: {
    dialog: "max-w-[720px] p-4.5 gap-3",
    header: "gap-3",
    body: "text-base",
    footer: "gap-2.5 pt-2.5",
    title: "text-xl font-bold leading-snug text-neutral-900",
    description: "text-base leading-relaxed text-neutral-600",
    buttonGap: "gap-3",
    closeButton: "size-8 p-1 -mr-1 -mt-1",
    closeIcon: "size-4.5",
  },
  xl: {
    dialog: "max-w-[960px] p-5 gap-3.5",
    header: "gap-3.5",
    body: "text-base",
    footer: "gap-3 pt-3",
    title: "text-2xl font-bold leading-snug text-neutral-900",
    description: "text-base leading-relaxed text-neutral-600",
    buttonGap: "gap-3.5",
    closeButton: "size-8 p-1 -mr-1 -mt-1",
    closeIcon: "size-5",
  },
  full: {
    dialog: "max-w-[calc(100vw-2rem)] w-full h-[calc(100vh-2rem)] p-4 gap-2.5",
    header: "gap-2.5",
    body: "text-base",
    footer: "gap-2 pt-2",
    title: "text-2xl font-bold leading-snug text-neutral-900",
    description: "text-base leading-relaxed text-neutral-600",
    buttonGap: "gap-2.5",
    closeButton: "size-8 p-1 -mr-1 -mt-1",
    closeIcon: "size-4.5",
  },
};

export const radiusConfig: Record<ModalRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-2xl",
};
