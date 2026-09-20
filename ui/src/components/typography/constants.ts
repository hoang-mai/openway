import { TypographyAlign, TypographySize, TypographyType, TypographyWeight } from "./types";

/**
 * Ánh xạ thẻ HTML mặc định theo từng loại phần tử
 */
export const variantTagMap: Record<TypographyType, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  span: "span",
  callout: "div",
  blockquote: "blockquote",
  code: "code",
  kbd: "kbd",
  a: "a",
};

/**
 * Ánh xạ style class Tailwind chuẩn Notion theo từng loại phần tử
 */
export const variantStyleMap: Record<TypographyType, string> = {
  h1: "text-3xl font-bold tracking-tight leading-tight text-neutral-900 my-3 block",
  h2: "text-2xl font-bold tracking-tight leading-snug text-neutral-900 my-2.5 block",
  h3: "text-xl font-semibold tracking-tight leading-snug text-neutral-900 my-2 block",
  h4: "text-lg font-semibold leading-normal text-neutral-900 my-1.5 block",
  h5: "text-base font-semibold leading-normal text-neutral-900 my-1 block",
  h6: "text-sm font-semibold leading-normal text-neutral-900 my-0.5 block",
  p: "text-sm sm:text-base leading-relaxed mb-3 last:mb-0 text-neutral-900 block",
  span: "text-sm leading-normal inline",
  callout: "notion-callout text-sm text-neutral-900 my-2.5",
  blockquote: "notion-quote text-neutral-800 block",
  code: "notion-inline-code inline",
  kbd: "inline-flex items-center justify-center font-mono text-[11px] leading-none px-1.5 py-1 rounded-xs bg-neutral-100 border border-neutral-200 text-neutral-700 shadow-xs select-none align-baseline",
  a: "text-primary-500 hover:text-primary-600 hover:underline transition-colors duration-150 cursor-pointer inline-flex items-center gap-1",
};

/**
 * Bảng 10 màu chữ chuẩn Notion và alias Design System
 */
export const colorConfig: Record<string, string> = {
  default: "text-neutral-900",
  gray: "text-neutral-500",
  brown: "text-[#9f6b53]",
  orange: "text-[#d9730d]",
  yellow: "text-[#cb912f]",
  green: "text-[#448361]",
  blue: "text-[#337ea9]",
  purple: "text-[#9065b0]",
  pink: "text-[#c14c8a]",
  red: "text-[#d44c47]",

  // Design Tokens Aliases
  primary: "text-primary-500",
  secondary: "text-neutral-500",
  tertiary: "text-neutral-400",
  muted: "text-neutral-400",
  success: "text-success-700",
  warning: "text-warning-700",
  error: "text-error-600",
  danger: "text-error-600",
  info: "text-info-700",
  neutral: "text-neutral-700",
};

/**
 * Bảng 10 màu nền highlight (Mark) chuẩn Notion
 */
export const markConfig: Record<string, string> = {
  default: "bg-[#fbf3db] text-[#37352f] px-1 py-0.5 rounded-xs",
  yellow: "bg-[#fbf3db] text-[#37352f] px-1 py-0.5 rounded-xs",
  gray: "bg-[#f1f1ef] text-[#37352f] px-1 py-0.5 rounded-xs",
  brown: "bg-[#f4eeee] text-[#37352f] px-1 py-0.5 rounded-xs",
  orange: "bg-[#fbecdd] text-[#37352f] px-1 py-0.5 rounded-xs",
  green: "bg-[#edf3ec] text-[#37352f] px-1 py-0.5 rounded-xs",
  blue: "bg-[#e7f3f8] text-[#37352f] px-1 py-0.5 rounded-xs",
  purple: "bg-[#f4f0f7] text-[#37352f] px-1 py-0.5 rounded-xs",
  pink: "bg-[#f9eef3] text-[#37352f] px-1 py-0.5 rounded-xs",
  red: "bg-[#fdebec] text-[#37352f] px-1 py-0.5 rounded-xs",
};

/**
 * Bảng phối màu nền và viền cho Callout Box theo chuẩn 10 màu Notion
 */
export const calloutColorConfig: Record<string, string> = {
  default: "bg-neutral-50 border-neutral-200/80",
  gray: "bg-[#f1f1ef] border-[#e3e2e0]",
  brown: "bg-[#f4eeee] border-[#e9dede]",
  orange: "bg-[#fbecdd] border-[#f5d9bd]",
  yellow: "bg-[#fbf3db] border-[#f7e6b8]",
  green: "bg-[#edf3ec] border-[#d4e4d2]",
  blue: "bg-[#e7f3f8] border-[#cce5f2]",
  purple: "bg-[#f4f0f7] border-[#e5dcf0]",
  pink: "bg-[#f9eef3] border-[#f2d8e5]",
  red: "bg-[#fdebec] border-[#f8cfd1]",

  // Design Tokens Aliases
  primary: "bg-[#e7f3f8] border-[#cce5f2]",
  info: "bg-[#e7f3f8] border-[#cce5f2]",
  success: "bg-[#edf3ec] border-[#d4e4d2]",
  warning: "bg-[#fbf3db] border-[#f7e6b8]",
  error: "bg-[#fdebec] border-[#f8cfd1]",
  danger: "bg-[#fdebec] border-[#f8cfd1]",
};


/**
 * Cỡ chữ font-size & line-height
 */
export const sizeConfig: Record<TypographySize, string> = {
  xs: "text-xs leading-4",
  sm: "text-[13px] leading-[18px]",
  md: "text-sm leading-5",
  lg: "text-base leading-6",
  xl: "text-lg leading-7",
  "2xl": "text-xl leading-7",
  "3xl": "text-2xl leading-8",
  "4xl": "text-3xl leading-9",
};

/**
 * Độ đậm font weight
 */
export const weightConfig: Record<TypographyWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

/**
 * Căn lề
 */
export const alignConfig: Record<TypographyAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

/**
 * Ánh xạ giới hạn dòng (line-clamp) cho Ellipsis
 */
export const lineClampConfig: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

