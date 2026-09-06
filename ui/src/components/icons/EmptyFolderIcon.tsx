import type { SVGProps } from "react";

export function EmptyFolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full" {...props}>
      <ellipse cx="60" cy="98" rx="42" ry="10" className="fill-neutral-200/50" />

      {/* Folder Back */}
      <path
        d="M24 40C24 36.69 26.69 34 30 34H48L56 42H90C93.31 42 96 44.69 96 48V78C96 81.31 93.31 84 90 84H30C26.69 84 24 81.31 24 78V40Z"
        className="fill-primary-200/70 stroke-primary-300"
        strokeWidth="2"
      />

      {/* Empty paper inside */}
      <rect
        x="36"
        y="30"
        width="48"
        height="40"
        rx="4"
        className="fill-white stroke-neutral-200"
        strokeWidth="1.5"
      />
      <line
        x1="44"
        y1="40"
        x2="68"
        y2="40"
        className="stroke-neutral-200"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="44"
        y1="48"
        x2="60"
        y2="48"
        className="stroke-neutral-200"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Folder Front */}
      <path
        d="M24 52H96V80C96 83.31 93.31 86 90 86H30C26.69 86 24 83.31 24 80V52Z"
        className="fill-primary-300/80 stroke-primary-400"
        strokeWidth="2"
      />
    </svg>
  );
}

export default EmptyFolderIcon;
