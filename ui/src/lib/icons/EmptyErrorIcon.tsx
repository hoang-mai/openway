import type { SVGProps } from "react";

export function EmptyErrorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full" {...props}>
      <ellipse cx="60" cy="100" rx="42" ry="10" className="fill-neutral-200/50" />

      {/* Cloud / Network error container */}
      <circle
        cx="60"
        cy="52"
        r="32"
        className="fill-error-50 stroke-error-200"
        strokeWidth="2"
      />

      {/* Triangle alert */}
      <path
        d="M60 30L78 64H42L60 30Z"
        className="fill-error-100 stroke-error-500"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Exclamation mark */}
      <line x1="60" y1="42" x2="60" y2="52" className="stroke-error-600" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="58" r="1.5" className="fill-error-600" />

      {/* Disconnect lines */}
      <path
        d="M22 66L32 60"
        className="stroke-neutral-300"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      <path
        d="M98 66L88 60"
        className="stroke-neutral-300"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

export default EmptyErrorIcon;
