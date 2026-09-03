import { EmptySize, EmptyLayout } from "./types";

export const emptySizeConfig: Record<
  EmptySize,
  {
    container: string;
    imageWrapper: string;
    defaultImageSize: number;
    title: string;
    description: string;
    gap: string;
    contentGap: string;
    actionsGap: string;
  }
> = {
  sm: {
    container: "p-3",
    imageWrapper: "w-16 h-16",
    defaultImageSize: 64,
    title: "text-xs font-semibold text-neutral-800",
    description: "text-xs text-neutral-500",
    gap: "gap-2.5",
    contentGap: "gap-1",
    actionsGap: "mt-2",
  },
  md: {
    container: "p-6",
    imageWrapper: "w-28 h-28",
    defaultImageSize: 112,
    title: "text-sm font-semibold text-neutral-800",
    description: "text-xs sm:text-sm text-neutral-500",
    gap: "gap-4",
    contentGap: "gap-1.5",
    actionsGap: "mt-3.5",
  },
  lg: {
    container: "p-10",
    imageWrapper: "w-40 h-40",
    defaultImageSize: 160,
    title: "text-base font-semibold text-neutral-900",
    description: "text-sm text-neutral-500",
    gap: "gap-6",
    contentGap: "gap-2",
    actionsGap: "mt-5",
  },
};

export const emptyLayoutConfig: Record<
  EmptyLayout,
  {
    container: string;
    content: string;
  }
> = {
  vertical: {
    container: "flex flex-col items-center justify-center text-center",
    content: "flex flex-col items-center justify-center text-center",
  },
  horizontal: {
    container: "flex flex-row items-center justify-start text-left",
    content: "flex flex-col items-start justify-center text-left flex-1",
  },
};
