import React, { useState } from "react";
import Cropper, { Point } from "react-easy-crop";
import { ImagePreviewProps, ImageItem } from "./types";
import ImagePreviewToolbar from "./ImagePreviewToolbar";

export default function ImagePreview({
  src,
  name,
  minZoom = 0.2,
  maxZoom = 5,
  showToolbar = true,
  toolbarProps,
  children,
}: ImagePreviewProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(maxZoom, Math.round((prev + 0.25) * 100) / 100));
  const handleZoomOut = () => setZoom((prev) => Math.max(minZoom, Math.round((prev - 0.25) * 100) / 100));
  const handleRotateCw = () => setRotation((prev) => (prev + 90) % 360);
  const handleRotateCcw = () => setRotation((prev) => (prev - 90 + 360) % 360);
  const handleFlipHorizontal = () => setIsFlipped((prev) => !prev);
  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setIsFlipped(false);
  };

  const currentImage: ImageItem = { src, name };

  if (!src) {
    return null;
  }

  return (
    <div className="flex flex-col w-full select-none overflow-hidden">
      <div className="relative w-full h-90 sm:h-105 md:h-115 overflow-hidden bg-neutral-50/70 select-none">
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          minZoom={minZoom}
          maxZoom={maxZoom}
          zoomSpeed={0.5}
          restrictPosition={false}
          showGrid={false}
          objectFit="contain"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          classes={{
            mediaClassName: isFlipped ? "scale-x-[-1]" : "",
          }}
          style={{
            containerStyle: {
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
            },
            cropAreaStyle: {
              display: "none",
            },
            mediaStyle: {
              cursor: "grab",
            },
          }}
        />
      </div>

      {showToolbar && (
        <div className="w-full flex items-center justify-center py-2.5 sm:py-3 border-t border-neutral-200 bg-neutral-white z-20 overflow-x-auto ui-scrollbar px-2 shrink-0">
          <ImagePreviewToolbar
            zoom={zoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            onZoomChange={setZoom}
            rotation={rotation}
            isFlipped={isFlipped}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onRotateCw={handleRotateCw}
            onRotateCcw={handleRotateCcw}
            onFlipHorizontal={handleFlipHorizontal}
            onReset={handleReset}
            currentImage={currentImage}
            {...toolbarProps}
          />
        </div>
      )}
      {children}
    </div>
  );
}
