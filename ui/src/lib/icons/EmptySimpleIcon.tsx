import type { SVGProps } from "react";

export function EmptySimpleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full" {...props}>
      <ellipse cx="32" cy="54" rx="24" ry="5" className="fill-neutral-200/50" />
      <path
        d="M12 24L32 14L52 24L32 34L12 24Z"
        className="fill-neutral-100 stroke-neutral-400"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 24V40L32 50V34L12 24Z"
        className="fill-neutral-200 stroke-neutral-400"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M52 24V40L32 50V34L52 24Z"
        className="fill-neutral-300 stroke-neutral-400"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default EmptySimpleIcon;
