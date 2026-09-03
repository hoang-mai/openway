import type { SVGProps } from "react";

export function EmptyDefaultIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full" {...props}>
      {/* Ground Shadow */}
      <ellipse cx="48" cy="80" rx="36" ry="8" className="fill-neutral-200/60 dark:fill-neutral-800/60" />
      <ellipse cx="48" cy="80" rx="22" ry="4.5" className="fill-neutral-300/50 dark:fill-neutral-700/50" />

      {/* Back Flaps (Opening outward at a lower, gentle angle) */}
      {/* Back Left Flap */}
      <path
        d="M24 38L16 32L40 22L48 28L24 38Z"
        className="fill-primary-100/80 dark:fill-primary-950/70 stroke-primary-300 dark:stroke-primary-700"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Back Right Flap */}
      <path
        d="M72 38L80 32L56 22L48 28L72 38Z"
        className="fill-primary-100/80 dark:fill-primary-950/70 stroke-primary-300 dark:stroke-primary-700"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Hollow Interior (Inside back walls & bottom floor) */}
      {/* Inside Back-Left Wall */}
      <path
        d="M24 38L48 28V52L24 62V38Z"
        className="fill-primary-300/80 dark:fill-primary-900/80 stroke-primary-300/40 dark:stroke-primary-700/40"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Inside Back-Right Wall */}
      <path
        d="M72 38L48 28V52L72 62V38Z"
        className="fill-primary-300/60 dark:fill-primary-900/60 stroke-primary-300/40 dark:stroke-primary-700/40"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Inside Bottom Floor */}
      <path
        d="M48 52L72 62L48 72L24 62L48 52Z"
        className="fill-primary-400/40 dark:fill-primary-950/90 stroke-primary-400/30 dark:stroke-primary-700/30"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Outer Front Shell (Left & Right Walls) */}
      {/* Outer Left Wall */}
      <path
        d="M24 38V64L48 76V50L24 38Z"
        className="fill-primary-100 dark:fill-primary-900/50 stroke-primary-400 dark:stroke-primary-600"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Outer Right Wall */}
      <path
        d="M72 38V64L48 76V50L72 38Z"
        className="fill-primary-200/90 dark:fill-primary-800/60 stroke-primary-400 dark:stroke-primary-600"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Front Flaps (Hanging downward) */}
      <path
        d="M24 38L48 50L38 60L14 48L24 38Z"
        className="fill-primary-50 dark:fill-primary-950/90 stroke-primary-300 dark:stroke-primary-700"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M72 38L48 50L58 60L82 48L72 38Z"
        className="fill-primary-100/90 dark:fill-primary-900/80 stroke-primary-300 dark:stroke-primary-700"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default EmptyDefaultIcon;
