import { getSafeConfig } from "@/utils/function";
import { CarouselPaginationProps } from "./types";
import { useCarouselContext } from "./context";
import { dotStyleConfig, glassPaginationWrapper, sizeConfig } from "./constants";

export function CarouselPagination({
  type = "dots",
  clickable = true,
  className = "",
  ref,
  ...props
}: CarouselPaginationProps) {
  const { currentIndex, totalSlides, slidesToShow, loop, scrollTo, size } = useCarouselContext();

  if (type === "none" || totalSlides <= 1) return null;

  const currentSize = getSafeConfig(size, sizeConfig, "md");

  const pageCount = loop ? totalSlides : Math.max(1, totalSlides - slidesToShow + 1);

  if (type === "fraction") {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={`absolute z-10 bottom-2.5 left-1/2 -translate-x-1/2 inline-flex items-center justify-center font-medium ${glassPaginationWrapper} text-white ${
          currentSize.fraction
        } ${className}`}
        {...props}
      >
        <span>
          {Math.min(currentIndex + 1, pageCount)} / {pageCount}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="Phân trang băng chuyền"
      className={`absolute z-10 bottom-2.5 left-1/2 -translate-x-1/2 inline-flex items-center justify-center ${glassPaginationWrapper} ${
        currentSize.paginationWrapper
      } ${className}`}
      {...props}
    >
      {Array.from({ length: pageCount }).map((_, index) => {
        const isActive = index === currentIndex;

        if (type === "line") {
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Chuyển đến slide ${index + 1}`}
              disabled={!clickable}
              onClick={() => clickable && scrollTo(index)}
              className={`transition-all duration-300 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${
                isActive
                  ? `${currentSize.activeLine} ${dotStyleConfig.active}`
                  : `${currentSize.line} ${dotStyleConfig.inactive}`
              } ${clickable ? "cursor-pointer" : "cursor-default"}`}
            />
          );
        }

        // Default: dots (giữ nguyên kích thước tròn, chỉ đổi màu sang primary khi active)
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Chuyển đến slide ${index + 1}`}
            disabled={!clickable}
            onClick={() => clickable && scrollTo(index)}
            className={`transition-colors duration-200 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${
              currentSize.dot
            } ${
              isActive ? dotStyleConfig.active : dotStyleConfig.inactive
            } ${clickable ? "cursor-pointer" : "cursor-default"}`}
          />
        );
      })}
    </div>
  );
}
