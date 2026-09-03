import { useMemo } from "react";
import { FileCategory, FileIconProps, UploadFileSize } from "./types";
import { FILE_CATEGORY_CONFIG, uploadFileSizeConfig } from "./constants";
import { getFileCategory } from "./utils";
import { getFileName } from "@/components/file-preview/utils";
import { getSafeConfig } from "@/utils/function";

export default function FileIcon({
  file,
  fileName,
  category: explicitCategory,
  size = "md",
  className = "",
}: FileIconProps) {
  const targetCategory: FileCategory = useMemo(() => {
    if (explicitCategory) return explicitCategory;
    const name = fileName || (file ? getFileName(file) : "");
    return getFileCategory(file || name);
  }, [explicitCategory, file, fileName]);

  const config = getSafeConfig(targetCategory, FILE_CATEGORY_CONFIG, "other");

  const pixelSize =
    typeof size === "number"
      ? size
      : getSafeConfig(size as UploadFileSize, uploadFileSizeConfig, "md").fileIconSize;

  // Compute proportional badge font size
  const fontSize = Math.max(8, Math.round(pixelSize * 0.22));

  return (
    <div
      role="img"
      aria-label={`Biểu tượng định dạng tệp ${config.label}`}
      style={{ width: pixelSize, height: pixelSize }}
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
    >
      {/* File Document Paper Outline with folded corner */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs transition-transform"
      >
        {/* Document Sheet Body */}
        <path
          d="M8 5C8 3.9 8.9 3 10 3H26L34 11V35C34 36.1 33.1 37 32 37H10C8.9 37 8 36.1 8 35V5Z"
          className="fill-neutral-50 stroke-neutral-300 transition-colors"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Folded Corner Triangle */}
        <path
          d="M26 3V10C26 10.55 26.45 11 27 11H34"
          className="fill-neutral-200 stroke-neutral-300"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Content line hints */}
        <line
          x1="13"
          y1="15"
          x2="23"
          y2="15"
          className="stroke-neutral-300"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="13"
          y1="19"
          x2="27"
          y2="19"
          className="stroke-neutral-300"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Category Badge */}
      <div
        style={{ fontSize: `${fontSize}px` }}
        className={`absolute bottom-1 right-0.5 px-1 py-0.2 rounded font-bold tracking-tight border shadow-2xs leading-none uppercase ${config.bg} ${config.text} ${config.border}`}
      >
        {config.label}
      </div>
    </div>
  );
}
