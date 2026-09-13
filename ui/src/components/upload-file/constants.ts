import { FileCategory, UploadFileColor, UploadFileRadius, UploadFileSize, UploadFileVariant } from "./types";

export const uploadFileRadiusConfig: Record<UploadFileRadius, string> = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
};

export const uploadFileLabelColorConfig: Record<UploadFileColor, string> = {
  primary: "text-neutral-700 group-focus-within/field:text-primary-600",
  secondary: "text-neutral-700 group-focus-within/field:text-secondary-600",
  neutral: "text-neutral-700 group-focus-within/field:text-neutral-900",
  error: "text-error-500 group-focus-within/field:text-error-600",
  success: "text-success-500 group-focus-within/field:text-success-600",
  warning: "text-warning-500 group-focus-within/field:text-warning-600",
  info: "text-info-500 group-focus-within/field:text-info-600",
};

export const dropzoneFileHeights: Record<UploadFileSize, string> = {
  xs: "h-28",
  sm: "h-36",
  md: "h-48",
  lg: "h-60",
  xl: "h-72",
};

export const uploadFileSizeConfig: Record<
  UploadFileSize,
  {
    dropzoneHeight: string;
    dropzoneMinHeight: string;
    dropzonePadding: string;
    compactMinHeight: string;
    compactPadding: string;
    thumbnailSize: string;
    iconSize: number;
    fileIconSize: number;
    titleSize: string;
    descSize: string;
    fileNameSize: string;
    fileMetaSize: string;
    labelSize: string;
    helperSize: string;
    buttonSize: "xs" | "sm" | "md" | "lg" | "xl";
    actionButtonPadding: string;
    gap: string;
    itemPadding: string;
  }
> = {
  xs: {
    dropzoneHeight: "min-h-[80px]",
    dropzoneMinHeight: "min-h-[80px]",
    dropzonePadding: "p-3",
    compactMinHeight: "min-h-[40px]",
    compactPadding: "px-3 py-2",
    thumbnailSize: "w-28 h-20",
    iconSize: 24,
    fileIconSize: 28,
    titleSize: "text-[11px]",
    descSize: "text-[10px]",
    fileNameSize: "text-xs",
    fileMetaSize: "text-[10px]",
    labelSize: "text-[11px] mb-1",
    helperSize: "text-[9px] mt-0.5",
    buttonSize: "xs",
    actionButtonPadding: "p-1",
    gap: "gap-1.5",
    itemPadding: "px-2.5 py-1.5",
  },
  sm: {
    dropzoneHeight: "min-h-[100px]",
    dropzoneMinHeight: "min-h-[100px]",
    dropzonePadding: "p-4",
    compactMinHeight: "min-h-[48px]",
    compactPadding: "px-3.5 py-2.5",
    thumbnailSize: "w-32 h-24",
    iconSize: 32,
    fileIconSize: 34,
    titleSize: "text-xs",
    descSize: "text-[11px]",
    fileNameSize: "text-xs font-medium",
    fileMetaSize: "text-[11px]",
    labelSize: "text-xs mb-1",
    helperSize: "text-[10px] mt-0.5",
    buttonSize: "sm",
    actionButtonPadding: "p-1.5",
    gap: "gap-2",
    itemPadding: "px-3 py-2",
  },
  md: {
    dropzoneHeight: "min-h-[130px]",
    dropzoneMinHeight: "min-h-[130px]",
    dropzonePadding: "p-5",
    compactMinHeight: "min-h-[56px]",
    compactPadding: "px-4 py-3",
    thumbnailSize: "w-40 h-28",
    iconSize: 42,
    fileIconSize: 40,
    titleSize: "text-sm",
    descSize: "text-xs",
    fileNameSize: "text-sm font-medium",
    fileMetaSize: "text-xs",
    labelSize: "text-sm mb-1.5",
    helperSize: "text-[11px] mt-1",
    buttonSize: "md",
    actionButtonPadding: "p-1.5",
    gap: "gap-2.5",
    itemPadding: "px-3.5 py-2.5",
  },
  lg: {
    dropzoneHeight: "min-h-[160px]",
    dropzoneMinHeight: "min-h-[160px]",
    dropzonePadding: "p-6",
    compactMinHeight: "min-h-[64px]",
    compactPadding: "px-5 py-3.5",
    thumbnailSize: "w-48 h-32",
    iconSize: 52,
    fileIconSize: 48,
    titleSize: "text-base",
    descSize: "text-xs",
    fileNameSize: "text-base font-medium",
    fileMetaSize: "text-xs",
    labelSize: "text-base mb-1.5",
    helperSize: "text-xs mt-1",
    buttonSize: "lg",
    actionButtonPadding: "p-2",
    gap: "gap-3",
    itemPadding: "px-4 py-3",
  },
  xl: {
    dropzoneHeight: "min-h-[200px]",
    dropzoneMinHeight: "min-h-[200px]",
    dropzonePadding: "p-8",
    compactMinHeight: "min-h-[72px]",
    compactPadding: "px-6 py-4",
    thumbnailSize: "w-56 h-36",
    iconSize: 64,
    fileIconSize: 56,
    titleSize: "text-lg",
    descSize: "text-sm",
    fileNameSize: "text-lg font-medium",
    fileMetaSize: "text-sm",
    labelSize: "text-lg mb-2",
    helperSize: "text-sm mt-1",
    buttonSize: "xl",
    actionButtonPadding: "p-2.5",
    gap: "gap-3.5",
    itemPadding: "px-5 py-3.5",
  },
};

export const uploadFileVariantColorConfig: Record<
  Exclude<UploadFileVariant, "other">,
  Record<
    UploadFileColor,
    {
      idle: string;
      active: string;
      iconColor: string;
      titleHover: string;
      itemBg: string;
      itemBorder: string;
    }
  >
> = {
  outline: {
    primary: {
      idle: "bg-neutral-white border-neutral-300 hover:border-neutral-400 text-neutral-700",
      active: "bg-primary-50/50 border-primary-500 ring-2 ring-primary-500/20 text-primary-900",
      iconColor: "text-neutral-400 group-hover:text-neutral-600",
      titleHover: "group-hover:text-neutral-900",
      itemBg: "bg-white hover:bg-neutral-50/80",
      itemBorder: "border-neutral-200 hover:border-neutral-400",
    },
    secondary: {
      idle: "bg-neutral-white border-neutral-300 hover:border-neutral-400 text-neutral-700",
      active: "bg-secondary-50/50 border-secondary-500 ring-2 ring-secondary-500/20 text-secondary-900",
      iconColor: "text-secondary-500",
      titleHover: "group-hover:text-secondary-600",
      itemBg: "bg-white hover:bg-neutral-50/80",
      itemBorder: "border-neutral-200 hover:border-secondary-300",
    },
    neutral: {
      idle: "bg-neutral-white border-neutral-300 hover:border-neutral-400 text-neutral-700",
      active: "bg-neutral-100/70 border-neutral-500 ring-2 ring-neutral-500/20 text-neutral-900",
      iconColor: "text-neutral-500",
      titleHover: "group-hover:text-neutral-900",
      itemBg: "bg-white hover:bg-neutral-50/80",
      itemBorder: "border-neutral-200 hover:border-neutral-400",
    },
    error: {
      idle: "bg-neutral-white border-error-500 hover:border-error-600 text-neutral-700",
      active: "bg-error-50/50 border-error-500 ring-2 ring-error-500/20 text-error-900",
      iconColor: "text-error-500",
      titleHover: "group-hover:text-error-600",
      itemBg: "bg-white hover:bg-error-50/30",
      itemBorder: "border-error-200 hover:border-error-300",
    },
    success: {
      idle: "bg-neutral-white border-success-400 hover:border-success-500 text-neutral-700",
      active: "bg-success-50/50 border-success-500 ring-2 ring-success-500/20 text-success-900",
      iconColor: "text-success-500",
      titleHover: "group-hover:text-success-600",
      itemBg: "bg-white hover:bg-success-50/30",
      itemBorder: "border-success-200 hover:border-success-300",
    },
    warning: {
      idle: "bg-neutral-white border-warning-400 hover:border-warning-500 text-neutral-700",
      active: "bg-warning-50/50 border-warning-500 ring-2 ring-warning-500/20 text-warning-900",
      iconColor: "text-warning-500",
      titleHover: "group-hover:text-warning-600",
      itemBg: "bg-white hover:bg-warning-50/30",
      itemBorder: "border-warning-200 hover:border-warning-300",
    },
    info: {
      idle: "bg-neutral-white border-info-400 hover:border-info-500 text-neutral-700",
      active: "bg-info-50/50 border-info-500 ring-2 ring-info-500/20 text-info-900",
      iconColor: "text-info-500",
      titleHover: "group-hover:text-info-600",
      itemBg: "bg-white hover:bg-info-50/30",
      itemBorder: "border-info-200 hover:border-info-300",
    },
  },
  filled: {
    primary: {
      idle: "border-transparent bg-primary-50/60 hover:bg-primary-100/60",
      active: "border-primary-500 bg-primary-100 ring-2 ring-primary-500/20",
      iconColor: "text-primary-600",
      titleHover: "group-hover:text-primary-700",
      itemBg: "bg-primary-50/40 hover:bg-primary-50/80",
      itemBorder: "border-primary-100 hover:border-primary-200",
    },
    secondary: {
      idle: "border-transparent bg-secondary-50/60 hover:bg-secondary-100/60",
      active: "border-secondary-500 bg-secondary-100 ring-2 ring-secondary-500/20",
      iconColor: "text-secondary-600",
      titleHover: "group-hover:text-secondary-700",
      itemBg: "bg-secondary-50/40 hover:bg-secondary-50/80",
      itemBorder: "border-secondary-100 hover:border-secondary-200",
    },
    neutral: {
      idle: "border-transparent bg-neutral-100/70 hover:bg-neutral-200/50",
      active: "border-neutral-400 bg-neutral-200 ring-2 ring-neutral-400/20",
      iconColor: "text-neutral-600",
      titleHover: "group-hover:text-neutral-800",
      itemBg: "bg-neutral-100/50 hover:bg-neutral-100",
      itemBorder: "border-neutral-200 hover:border-neutral-300",
    },
    error: {
      idle: "border-transparent bg-error-50/70 hover:bg-error-100/70",
      active: "border-error-500 bg-error-100 ring-2 ring-error-500/20",
      iconColor: "text-error-600",
      titleHover: "group-hover:text-error-700",
      itemBg: "bg-error-50/40 hover:bg-error-50/80",
      itemBorder: "border-error-100 hover:border-error-200",
    },
    success: {
      idle: "border-transparent bg-success-50/70 hover:bg-success-100/70",
      active: "border-success-500 bg-success-100 ring-2 ring-success-500/20",
      iconColor: "text-success-600",
      titleHover: "group-hover:text-success-700",
      itemBg: "bg-success-50/40 hover:bg-success-50/80",
      itemBorder: "border-success-100 hover:border-success-200",
    },
    warning: {
      idle: "border-transparent bg-warning-50/70 hover:bg-warning-100/70",
      active: "border-warning-500 bg-warning-100 ring-2 ring-warning-500/20",
      iconColor: "text-warning-600",
      titleHover: "group-hover:text-warning-700",
      itemBg: "bg-warning-50/40 hover:bg-warning-50/80",
      itemBorder: "border-warning-100 hover:border-warning-200",
    },
    info: {
      idle: "border-transparent bg-info-50/70 hover:bg-info-100/70",
      active: "border-info-500 bg-info-100 ring-2 ring-info-500/20",
      iconColor: "text-info-600",
      titleHover: "group-hover:text-info-700",
      itemBg: "bg-info-50/40 hover:bg-info-50/80",
      itemBorder: "border-info-100 hover:border-info-200",
    },
  },
  ghost: {
    primary: {
      idle: "border-transparent bg-transparent hover:bg-neutral-100/40",
      active: "border-primary-400 bg-primary-50/40 ring-2 ring-primary-400/20",
      iconColor: "text-neutral-400 group-hover:text-neutral-600",
      titleHover: "group-hover:text-neutral-900",
      itemBg: "bg-transparent hover:bg-neutral-100/40",
      itemBorder: "border-transparent hover:border-neutral-300",
    },
    secondary: {
      idle: "border-transparent bg-transparent hover:bg-secondary-50/30",
      active: "border-secondary-400 bg-secondary-50/40 ring-2 ring-secondary-400/20",
      iconColor: "text-secondary-500",
      titleHover: "group-hover:text-secondary-600",
      itemBg: "bg-transparent hover:bg-secondary-50/20",
      itemBorder: "border-transparent hover:border-secondary-200",
    },
    neutral: {
      idle: "border-transparent bg-transparent hover:bg-neutral-100/40",
      active: "border-neutral-400 bg-neutral-100/50 ring-2 ring-neutral-400/20",
      iconColor: "text-neutral-500",
      titleHover: "group-hover:text-neutral-800",
      itemBg: "bg-transparent hover:bg-neutral-100/40",
      itemBorder: "border-transparent hover:border-neutral-300",
    },
    error: {
      idle: "border-transparent bg-transparent hover:bg-error-50/30",
      active: "border-error-400 bg-error-50/40 ring-2 ring-error-400/20",
      iconColor: "text-error-500",
      titleHover: "group-hover:text-error-600",
      itemBg: "bg-transparent hover:bg-error-50/20",
      itemBorder: "border-transparent hover:border-error-200",
    },
    success: {
      idle: "border-transparent bg-transparent hover:bg-success-50/30",
      active: "border-success-400 bg-success-50/40 ring-2 ring-success-400/20",
      iconColor: "text-success-500",
      titleHover: "group-hover:text-success-600",
      itemBg: "bg-transparent hover:bg-success-50/20",
      itemBorder: "border-transparent hover:border-success-200",
    },
    warning: {
      idle: "border-transparent bg-transparent hover:bg-warning-50/30",
      active: "border-warning-400 bg-warning-50/40 ring-2 ring-warning-400/20",
      iconColor: "text-warning-500",
      titleHover: "group-hover:text-warning-600",
      itemBg: "bg-transparent hover:bg-warning-50/20",
      itemBorder: "border-transparent hover:border-warning-200",
    },
    info: {
      idle: "border-transparent bg-transparent hover:bg-info-50/30",
      active: "border-info-400 bg-info-50/40 ring-2 ring-info-400/20",
      iconColor: "text-info-500",
      titleHover: "group-hover:text-info-600",
      itemBg: "bg-transparent hover:bg-info-50/20",
      itemBorder: "border-transparent hover:border-info-200",
    },
  },
};

export const FILE_EXTENSIONS_MAP: Record<FileCategory, string[]> = {
  pdf: ["pdf"],
  word: ["doc", "docx", "dot", "dotx", "odt", "rtf"],
  excel: ["xls", "xlsx", "xlsm", "xlsb", "csv", "ods"],
  powerpoint: ["ppt", "pptx", "pot", "potx", "pps", "ppsx", "odp"],
  archive: ["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "iso"],
  text: ["txt", "md", "markdown", "log"],
  image: ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico", "tiff", "avif"],
  audio: ["mp3", "wav", "ogg", "aac", "flac", "m4a", "wma"],
  video: ["mp4", "webm", "mov", "avi", "mkv", "wmv", "flv"],
  code: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "html",
    "css",
    "scss",
    "json",
    "py",
    "java",
    "c",
    "cpp",
    "cs",
    "go",
    "rs",
    "php",
    "sql",
    "sh",
    "yaml",
    "yml",
    "xml",
  ],
  other: [],
};

export const FILE_CATEGORY_CONFIG: Record<
  FileCategory,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
  }
> = {
  pdf: {
    label: "PDF",
    bg: "bg-error-50",
    text: "text-error-700",
    border: "border-error-200",
  },
  word: {
    label: "DOC",
    bg: "bg-primary-50",
    text: "text-primary-700",
    border: "border-primary-200",
  },
  excel: {
    label: "XLS",
    bg: "bg-success-50",
    text: "text-success-700",
    border: "border-success-200",
  },
  powerpoint: {
    label: "PPT",
    bg: "bg-secondary-50",
    text: "text-secondary-700",
    border: "border-secondary-200",
  },
  archive: {
    label: "ZIP",
    bg: "bg-warning-50",
    text: "text-warning-800",
    border: "border-warning-200",
  },
  text: {
    label: "TXT",
    bg: "bg-neutral-100",
    text: "text-neutral-700",
    border: "border-neutral-200",
  },
  image: {
    label: "IMG",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  audio: {
    label: "AUD",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  video: {
    label: "VID",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
  },
  code: {
    label: "DEV",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
  },
  other: {
    label: "FILE",
    bg: "bg-neutral-100",
    text: "text-neutral-600",
    border: "border-neutral-200",
  },
};
