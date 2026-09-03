import React from "react";
import { ImagePreviewToolbarProps } from "./types";
import ZoomInIcon from "../../icons/ZoomInIcon";
import ZoomOutIcon from "../../icons/ZoomOutIcon";
import RotateCwIcon from "../../icons/RotateCwIcon";
import RotateCcwIcon from "../../icons/RotateCcwIcon";
import FlipHorizontalIcon from "../../icons/FlipHorizontalIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import Slider from "../../slider/Slider";
import { SliderValue } from "../../slider/types";
import { downloadFile } from "../utils";

export default function ImagePreviewToolbar({
  zoom = 1,
  minZoom = 0.2,
  maxZoom = 5,
  step = 0.05,
  onZoomChange,
  sliderProps,
  onZoomIn,
  onZoomOut,
  onRotateCw,
  onRotateCcw,
  onFlipHorizontal,
  onReset,
  currentImage,
  tools,
  className = "",
}: ImagePreviewToolbarProps) {
  const {
    zoomIn = true,
    zoomOut = true,
    zoomSlider = true,
    reset = true,
    rotate = true,
    flip = true,
    download = true,
  } = tools ?? {};

  const zoomPercent = Math.round(zoom * 100);

  const handleDownload = () => {
    if (!currentImage?.src) return;
    downloadFile(currentImage.src, currentImage.name);
  };

  const handleSliderChange = (newVal: SliderValue) => {
    if (typeof newVal === "number") {
      const rounded = Math.round(newVal * 100) / 100;
      onZoomChange?.(rounded);
    }
  };

  const buttonBaseClass =
    "p-2 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:scale-95 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent";

  return (
    <div
      data-testid="image-preview-toolbar"
      className={`inline-flex items-center gap-1 bg-neutral-white border border-neutral-200 rounded-full px-3 py-1.5 shadow-sm text-neutral-700 select-none pointer-events-auto ${className}`}
    >
      {/* Zoom Out */}
      {zoomOut && (
        <button
          type="button"
          aria-label="Thu nhỏ"
          title="Thu nhỏ (-)"
          disabled={zoom <= minZoom}
          onClick={onZoomOut}
          className={buttonBaseClass}
        >
          <ZoomOutIcon width={18} height={18} />
        </button>
      )}

      {/* Zoom Slider */}
      {zoomSlider && (
        <div className="flex items-center px-1" data-testid="image-preview-zoom-slider">
          <Slider
            value={zoom}
            min={minZoom}
            max={maxZoom}
            step={step}
            size="sm"
            color="primary"
            config={{ isFullWidth: false }}
            className="w-20 sm:w-28"
            disabled={!onZoomChange && !sliderProps?.onChange}
            onChange={handleSliderChange}
            aria-label="Thanh trượt thu phóng"
            {...sliderProps}
          />
        </div>
      )}

      {/* Zoom In */}
      {zoomIn && (
        <button
          type="button"
          aria-label="Phóng to"
          title="Phóng to (+)"
          disabled={zoom >= maxZoom}
          onClick={onZoomIn}
          className={buttonBaseClass}
        >
          <ZoomInIcon width={18} height={18} />
        </button>
      )}

      {/* Zoom Percent / Reset */}
      {reset && (
        <button
          type="button"
          aria-label="Đặt lại kích thước và góc xoay"
          title="Đặt lại (1:1)"
          onClick={onReset}
          className="px-2 py-1 text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
        >
          {zoomPercent}%
        </button>
      )}

      {(rotate || flip || download) && <div className="w-px h-4 bg-neutral-200 my-auto mx-1" />}

      {/* Rotate CCW */}
      {rotate && (
        <button
          type="button"
          aria-label="Xoay ngược chiều kim đồng hồ"
          title="Xoay ngược chiều kim đồng hồ"
          onClick={onRotateCcw}
          className={buttonBaseClass}
        >
          <RotateCcwIcon width={18} height={18} />
        </button>
      )}

      {/* Rotate CW */}
      {rotate && (
        <button
          type="button"
          aria-label="Xoay theo chiều kim đồng hồ"
          title="Xoay theo chiều kim đồng hồ (r)"
          onClick={onRotateCw}
          className={buttonBaseClass}
        >
          <RotateCwIcon width={18} height={18} />
        </button>
      )}

      {/* Flip Horizontal */}
      {flip && (
        <button
          type="button"
          aria-label="Lật ngang"
          title="Lật ngang"
          onClick={onFlipHorizontal}
          className={buttonBaseClass}
        >
          <FlipHorizontalIcon width={18} height={18} />
        </button>
      )}

      {/* Download */}
      {download && (
        <button
          type="button"
          aria-label="Tải ảnh xuống"
          title="Tải ảnh xuống"
          onClick={handleDownload}
          className={buttonBaseClass}
        >
          <DownloadIcon width={18} height={18} />
        </button>
      )}
    </div>
  );
}
