import type { SVGProps } from "react";

export default function RotateCwIcon({ width = 20, height = 20, className = "", ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M21 2v6h-6" />
      <path d="M21 8A10 10 0 1 0 22 13" />
    </svg>
  );
}
