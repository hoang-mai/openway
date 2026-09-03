import { useState, useEffect, useMemo } from "react";
import Image, { ImageProps } from "next/image";
import Skeleton from "./Skeleton";
import { LoadingImageProps } from "./types";
import { radiusConfig, objectFitConfig } from "./constants";
import { getSafeConfig } from "@/utils/function";
import ImageIcon from "../icons/ImageIcon";
import FileContainer from "../file-preview/FileContainer";
import FilePreview from "../file-preview/FilePreview";
import { isServerFile } from "../file-preview/utils";
import type { PreviewFile } from "../file-preview/types";
import { getSourceKey } from "./utils";



export default function LoadingImage({
  src,
  alt = "",
  width,
  height,
  fill,
  skeletonVariant = "pulse",
  radius = "md",
  objectFit = "cover",
  preview = true,
  className = "",
  wrapperClassName = "",
  style,
  wrapperStyle,
  onLoad,
  onError,
  onClick,
  ref,
  ...imageProps
}: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const currentKey = getSourceKey(src);
  const [prevKey, setPrevKey] = useState(currentKey);

  const isFileOrBlob = typeof Blob !== "undefined" && (src instanceof File || src instanceof Blob);

  const serverFile = isServerFile(src) ? src : undefined;
  const serverUrl = serverFile?.src;

  const currentSrc = isFileOrBlob ? objectUrl : serverFile ? serverUrl : (src as ImageProps["src"]);

  const isUnoptimizedSource =
    isFileOrBlob ||
    Boolean(serverFile) ||
    (typeof currentSrc === "string" &&
      (/^(?:https?:)?\/\//.test(currentSrc) ||
        currentSrc.startsWith("data:") ||
        currentSrc.startsWith("blob:")));

  const displayAlt = alt || serverFile?.name || "";

  if (currentKey !== prevKey) {
    setPrevKey(currentKey);
    setIsLoaded(false);
    setHasError(false);
  }

  useEffect(() => {
    if (!(src instanceof File || src instanceof Blob)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(src);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [src]);

  const previewFile: PreviewFile | undefined = useMemo(() => {
    if (!currentSrc) return undefined;
    if (src instanceof File) return src;
    if (serverFile) {
      return {
        ...serverFile,
        src: serverFile.src,
        name: displayAlt || "image",
        type: "image",
      };
    }
    return {
      src: typeof currentSrc === "string" ? currentSrc : (currentSrc as { src?: string })?.src,
      name: displayAlt || "image",
      type: "image",
    };
  }, [src, currentSrc, serverFile, displayAlt]);

  const roundedClass = getSafeConfig(radius, radiusConfig, "md");
  const objectFitClass = getSafeConfig(objectFit, objectFitConfig, "cover");

  const handleLoad: ImageProps["onLoad"] = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError: ImageProps["onError"] = (e) => {
    setHasError(true);
    setIsLoaded(false);
    onError?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented && preview && isLoaded && !hasError && previewFile) {
      setIsPreviewOpen(true);
    }
  };

  const isInteractive = Boolean((preview && isLoaded && !hasError) || onClick);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  const computedWrapperStyle: React.CSSProperties = {
    ...(fill ? {} : { width, height }),
    ...wrapperStyle,
  };

  return (
    <>
      <div
        ref={ref}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={[
          "relative overflow-hidden inline-block",
          roundedClass,
          isInteractive ? "cursor-pointer" : "",
          wrapperClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={computedWrapperStyle}
      >
        {/* Skeleton placeholder — hiển thị khi chưa load xong và chưa có lỗi */}
        {!isLoaded && !hasError && (
          <Skeleton
            variant={skeletonVariant}
            radius={radius}
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0 }}
          />
        )}

        {/* Next.js Image component */}
        {currentSrc ? (
          <Image
            src={currentSrc}
            alt={displayAlt}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            fill={fill}
            unoptimized={isUnoptimizedSource ? true : imageProps.unoptimized}
            className={[
              "block w-full h-full transition-opacity duration-200",
              objectFitClass,
              roundedClass,
              isLoaded ? "opacity-100" : "opacity-0",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            style={style}
            onLoad={handleLoad}
            onError={handleError}
            {...imageProps}
          />
        ) : null}

        {/* Fallback icon khi src lỗi */}
        {hasError && (
          <div
            role="img"
            aria-label="Image failed to load"
            className={["absolute inset-0 flex items-center justify-center", "bg-neutral-100 text-neutral-400"].join(
              " "
            )}
          >
            <ImageIcon width={24} height={24} aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Modal FilePreview khi click vào ảnh */}
      {isPreviewOpen && previewFile && (
        <FileContainer
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          file={previewFile}
          title={displayAlt || "Xem ảnh"}
        >
          <FilePreview />
        </FileContainer>
      )}
    </>
  );
}
