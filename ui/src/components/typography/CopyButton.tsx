import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { CopyConfig } from "./types";
import { extractTextFromNode } from "./utils";
import CopyIcon from "@/components/icons/CopyIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import { Tooltip } from "@/components/tooltip";

export interface CopyButtonProps {
  copyable?: boolean | CopyConfig;
  children?: ReactNode;
  hasHoverAction?: boolean;
}

export default function CopyButton({ copyable, children, hasHoverAction }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const copyConfig: CopyConfig = typeof copyable === "object" ? copyable : {};
      const textToCopy = copyConfig.text ?? extractTextFromNode(children);

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          setIsCopied(true);
          copyConfig.onCopy?.(textToCopy);

          if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
          copyTimeoutRef.current = setTimeout(() => {
            setIsCopied(false);
          }, copyConfig.timeout ?? 2000);
        });
      }
    },
    [children, copyable]
  );

  if (!copyable) return null;

  const copyConf: CopyConfig = typeof copyable === "object" ? copyable : {};
  const defaultTip = Array.isArray(copyConf.tooltips) ? copyConf.tooltips[0] : "Sao chép";
  const copiedTip = Array.isArray(copyConf.tooltips) ? copyConf.tooltips[1] : "Đã sao chép!";
  const showTooltip = copyConf.tooltips !== false;

  const buttonElement = (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={isCopied ? String(copiedTip) : String(defaultTip)}
      className={`inline-flex items-center justify-center p-1 ml-1.5 rounded text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/60 transition-all duration-150 cursor-pointer align-middle ${
        hasHoverAction ? "notion-hover-action" : ""
      }`}
    >
      {isCopied ? (
        copyConf.icon?.[1] || <CheckIcon className="size-3.5 text-success-600" />
      ) : (
        copyConf.icon?.[0] || <CopyIcon className="size-3.5" />
      )}
    </button>
  );

  if (showTooltip) {
    return (
      <Tooltip content={isCopied ? copiedTip : defaultTip} placement="top" size="xs">
        {buttonElement}
      </Tooltip>
    );
  }

  return buttonElement;
}
