import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/**
 * Các tùy chọn cấu hình cho hook `useInfiniteScroll`.
 */
export interface UseInfiniteScrollOptions {
  /**
   * Callback được gọi khi người dùng cuộn đến cuối hoặc phần tử sentinel xuất hiện trong tầm nhìn.
   */
  onLoadMore: () => void | Promise<void>;

  /**
   * Cho biết còn dữ liệu để tải tiếp hay không.
   * Nếu là `false`, `onLoadMore` sẽ không được kích hoạt.
   * @default true
   */
  hasMore?: boolean;

  /**
   * Trạng thái đang tải dữ liệu của trang hiện tại / tiếp theo.
   * Nếu là `true`, `onLoadMore` sẽ tạm hoãn cho đến khi lượt tải trước hoàn tất.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Vô hiệu hóa toàn bộ cơ chế theo dõi cuộn vô hạn.
   * @default false
   */
  disabled?: boolean;

  /**
   * Khoảng cách biên rootMargin của IntersectionObserver (vd: "100px", "0px 0px 100px 0px").
   * Giúp kích hoạt tải trước khi người dùng chạm tới đáy danh sách để trải nghiệm mượt mà hơn.
   * @default "100px"
   */
  rootMargin?: string;

  /**
   * Ngưỡng hiển thị threshold của IntersectionObserver (từ 0.0 đến 1.0).
   * @default 0
   */
  threshold?: number | number[];

  /**
   * Phần tử gốc hoặc RefObject làm khung cuộn cho IntersectionObserver.
   * Nếu là `null` hoặc `undefined`, sẽ dùng viewport của trình duyệt hoặc khung cuộn cha gần nhất.
   * @default null
   */
  root?: Element | null | RefObject<Element | null>;
}

/**
 * Kết quả trả về từ hook `useInfiniteScroll`.
 */
export interface UseInfiniteScrollReturn {
  /**
   * Ref callback gắn vào phần tử sentinel ở cuối danh sách để theo dõi bằng IntersectionObserver.
   */
  sentinelRef: (node: HTMLElement | null) => void;

  /**
   * Trạng thái phần tử sentinel có đang nằm trong tầm quan sát hay không.
   */
  isIntersecting: boolean;
}

/**
 * Hook `useInfiniteScroll` độc lập hỗ trợ tải dữ liệu vô tận qua IntersectionObserver.
 */
export function useInfiniteScroll({
  onLoadMore,
  hasMore = true,
  isLoading = false,
  disabled = false,
  rootMargin = "100px",
  threshold = 0,
  root = null,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [sentinelNode, setSentinelNode] = useState<HTMLElement | null>(null);

  // Chỉ cần 1 ref duy nhất làm mutex lock để tránh kích hoạt 2 lần cùng lúc trong 1 frame
  const isTriggeringRef = useRef(false);

  const canTrigger = hasMore && !isLoading && !disabled;

  const triggerLoadMore = useCallback(() => {
    if (!canTrigger || isTriggeringRef.current) return;

    isTriggeringRef.current = true;
    try {
      const result = onLoadMore();
      if (result && typeof (result as Promise<void>).then === "function") {
        (result as Promise<void>).finally(() => {
          isTriggeringRef.current = false;
        });
      } else {
        isTriggeringRef.current = false;
      }
    } catch {
      isTriggeringRef.current = false;
    }
  }, [canTrigger, onLoadMore]);

  // Sentinel ref callback
  const sentinelRef = useCallback((node: HTMLElement | null) => {
    setSentinelNode(node);
  }, []);

  // IntersectionObserver setup
  useEffect(() => {
    if (!sentinelNode || disabled || !hasMore) {
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const resolvedRoot =
      root && typeof root === "object" && "current" in root
        ? (root as RefObject<Element | null>).current
        : (root as Element | null);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        const intersecting = entry.isIntersecting;
        setIsIntersecting(intersecting);

        if (intersecting) {
          triggerLoadMore();
        }
      },
      {
        root: resolvedRoot,
        rootMargin,
        threshold,
      }
    );

    observer.observe(sentinelNode);

    return () => {
      observer.disconnect();
      setIsIntersecting(false);
    };
  }, [sentinelNode, root, rootMargin, threshold, disabled, hasMore, triggerLoadMore]);

  // Khi tải xong (isLoading = false), nếu sentinel vẫn đang nằm trong tầm nhìn thì kích hoạt tải tiếp
  useEffect(() => {
    if (canTrigger && isIntersecting) {
      triggerLoadMore();
    }
  }, [canTrigger, isIntersecting, triggerLoadMore]);

  return {
    sentinelRef,
    isIntersecting,
  };
}

export default useInfiniteScroll;
