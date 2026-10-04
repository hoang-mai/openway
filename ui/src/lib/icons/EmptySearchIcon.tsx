import type { SVGProps } from "react";

export function EmptySearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full" {...props}>
      {/* Base shadow */}
      <ellipse cx="60" cy="100" rx="42" ry="10" className="fill-neutral-200/50" />

      {/* Sheet of paper */}
      <rect
        x="32"
        y="24"
        width="44"
        height="56"
        rx="6"
        className="fill-white stroke-neutral-300"
        strokeWidth="2"
      />
      {/* Paper lines */}
      <line
        x1="42"
        y1="36"
        x2="66"
        y2="36"
        className="stroke-neutral-200"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="44"
        x2="60"
        y2="44"
        className="stroke-neutral-200"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="52"
        x2="52"
        y2="52"
        className="stroke-neutral-200"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Magnifying Glass */}
      <g transform="translate(48, 38)">
        {/* Glass lens */}
        <circle
          cx="28"
          cy="28"
          r="20"
          className="fill-primary-50/80 stroke-primary-500"
          strokeWidth="3"
        />
        {/* Glass glare */}
        <path d="M18 20A14 14 0 0 1 34 16" className="stroke-primary-300" strokeWidth="2" strokeLinecap="round" />
        {/* Question mark / cross inside glass */}
        <path
          d="M24 24L32 32M32 24L24 32"
          className="stroke-neutral-400"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Handle */}
        <path
          d="M42 42L58 58"
          className="stroke-primary-700"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default EmptySearchIcon;
