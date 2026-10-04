import type { SVGProps } from "react";
import { EmptyPresetImage } from "./types";
import EmptyDefaultIcon from "../icons/EmptyDefaultIcon";
import EmptySearchIcon from "../icons/EmptySearchIcon";
import EmptyErrorIcon from "../icons/EmptyErrorIcon";
import EmptyFolderIcon from "../icons/EmptyFolderIcon";
import EmptySimpleIcon from "../icons/EmptySimpleIcon";

export interface EmptyIllustrationProps extends SVGProps<SVGSVGElement> {
  preset?: EmptyPresetImage;
}

export default function EmptyIllustration({ preset = "default", ...props }: EmptyIllustrationProps) {
  switch (preset) {
    case "search":
      return <EmptySearchIcon {...props} />;
    case "error":
      return <EmptyErrorIcon {...props} />;
    case "folder":
      return <EmptyFolderIcon {...props} />;
    case "simple":
      return <EmptySimpleIcon {...props} />;
    case "default":
    default:
      return <EmptyDefaultIcon {...props} />;
  }
}
