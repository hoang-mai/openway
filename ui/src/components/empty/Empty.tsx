import React, { isValidElement } from "react";
import Image from "next/image";
import { EmptyProps } from "./types";
import { emptySizeConfig, emptyLayoutConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import EmptyIllustration from "./EmptyIllustration";
import { isPresetImage, isUrlString, getImageInlineStyle } from "./utils";
import { useLocale } from "@/locale";

export default function Empty({
  size = "md",
  layout = "vertical",
  image = "default",
  imageSize,
  imageClassName = "",
  imageAlt = "Empty",
  title,
  titleClassName = "",
  description: descriptionProp,
  descriptionClassName = "",
  actions,
  actionsClassName = "",
  children,
  className = "",
  role = "status",
  ref,
  ...props
}: EmptyProps) {
  const emptyLocale = useLocale("empty");
  const description = descriptionProp ?? emptyLocale.description;
  const currentSize = getSafeConfig(size, emptySizeConfig, "md");
  const currentLayout = getSafeConfig(layout, emptyLayoutConfig, "vertical");

  const imageInlineStyle = getImageInlineStyle(imageSize);

  const renderImageContent = () => {
    if (!image) return null;

    if (isPresetImage(image)) {
      return (
        <div className="w-full h-full flex items-center justify-center p-2.5 rounded-2xl bg-neutral-100/50 ring-1 ring-neutral-200/50 shadow-xs">
          <EmptyIllustration preset={image} />
        </div>
      );
    }

    if (isUrlString(image)) {
      const dimension = typeof imageSize === "number" ? imageSize : currentSize.defaultImageSize;

      return (
        <Image
          src={image}
          alt={imageAlt}
          width={dimension}
          height={dimension}
          className="size-full object-contain pointer-events-none select-none"
          unoptimized={image.startsWith("data:") || image.endsWith(".svg")}
        />
      );
    }

    if (isValidElement(image)) {
      return image;
    }

    return (
      <div className="w-full h-full flex items-center justify-center p-2.5 rounded-2xl bg-neutral-100/50 ring-1 ring-neutral-200/50 shadow-xs">
        <EmptyIllustration preset="default" />
      </div>
    );
  };

  const imageWrapperClasses = [
    "flex items-center justify-center shrink-0",
    !imageSize ? currentSize.imageWrapper : "",
    imageClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const containerClasses = [
    "w-full transition-all",
    currentLayout.container,
    currentSize.container,
    currentSize.gap,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClasses = [currentLayout.content, currentSize.contentGap].filter(Boolean).join(" ");

  const titleClasses = [currentSize.title, titleClassName].filter(Boolean).join(" ");

  const descriptionClasses = [currentSize.description, descriptionClassName].filter(Boolean).join(" ");

  const actionsClasses = [
    "flex flex-wrap items-center gap-2",
    currentSize.actionsGap,
    layout === "vertical" ? "justify-center" : "justify-start",
    actionsClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} role={role} aria-live="polite" className={containerClasses} {...props}>
      {image && (
        <div className={imageWrapperClasses} style={imageInlineStyle} aria-hidden="true">
          {renderImageContent()}
        </div>
      )}

      {(title || description || actions || children) && (
        <div className={contentClasses}>
          {title && <div className={titleClasses}>{title}</div>}

          {description && <div className={descriptionClasses}>{description}</div>}

          {actions && <div className={actionsClasses}>{actions}</div>}

          {children && <div className="mt-2 w-full">{children}</div>}
        </div>
      )}
    </div>
  );
}
