import type { SVGProps } from "react";

export default function RotateCcwIcon({ width = 20, height = 20, className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M3 2v6h6" />
      <path d="M3 8a10 10 0 1 1-1 5" />
    </svg>
  );
}
