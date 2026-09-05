# ♾️ Hook `useInfiniteScroll` (`@openway/ui`)

Hook React độc lập, hiệu năng cao phục vụ cơ chế tải dữ liệu vô tận (Infinite Scroll) dựa trên 100% **IntersectionObserver** nguyên bản của trình duyệt.

---

## 🌟 Điểm nổi bật

- **Zero Main-Thread Overhead**: Hoàn toàn không gắn event listener `scroll` thủ công trên container, loại bỏ hiện tượng giật lag khung hình khi cuộn nhanh.
- **Pure React 19 Compliant**: Không sử dụng ref dư thừa để lưu primitives (`hasMore`, `isLoading`, `disabled`), hoàn toàn tuân thủ quy chuẩn render của React 19.
- **Chống Request Trùng lặp (Mutex Lock)**: Sử dụng duy nhất một cờ khóa an toàn `isTriggeringRef` để ngăn chặn các lượt gọi API async liên tiếp trong cùng một chu kỳ render.
- **Tự động kích hoạt khi hoàn tất tải**: Nếu dữ liệu trang trước đã tải xong (`isLoading: false`) mà phần tử sentinel vẫn đang nằm trong tầm quan sát, hook sẽ tự động kích hoạt tải tiếp trang kế tiếp một cách mượt mà.

---

## 🚀 Import

```tsx
import { useInfiniteScroll } from "@openway/ui";
import type { UseInfiniteScrollOptions, UseInfiniteScrollReturn } from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### Sử dụng với Danh sách thẻ (Card List / Feed)

```tsx
import { useState } from "react";
import { useInfiniteScroll, Skeleton } from "@openway/ui";

export function PostFeed() {
  const [posts, setPosts] = useState<string[]>(["Bài viết 1", "Bài viết 2"]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = async () => {
    setIsLoading(true);
    // Giả lập gọi API
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPosts((prev) => [
      ...prev,
      `Bài viết ${prev.length + 1}`,
      `Bài viết ${prev.length + 2}`,
    ]);
    if (posts.length > 20) setHasMore(false);
    setIsLoading(false);
  };

  const { sentinelRef } = useInfiniteScroll({
    onLoadMore: loadMorePosts,
    hasMore,
    isLoading,
    rootMargin: "150px", // Bắt đầu tải trước khi chạm đáy 150px
  });

  return (
    <div className="max-w-md mx-auto space-y-3">
      {posts.map((post, idx) => (
        <div key={idx} className="p-4 border rounded-lg shadow-sm bg-white dark:bg-neutral-900">
          {post}
        </div>
      ))}

      {/* Phần tử Sentinel để IntersectionObserver theo dõi */}
      <div ref={sentinelRef} className="py-2">
        {isLoading && (
          <Skeleton lines={2} height="2.5rem" className="w-full" />
        )}
      </div>

      {!hasMore && (
        <p className="text-center text-xs text-neutral-400 py-2">
          Đã tải hết toàn bộ bài viết
        </p>
      )}
    </div>
  );
}
```

---

## 🎛️ Bảng Options

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `onLoadMore` | `() => void \| Promise<void>` | **Bắt buộc** | Callback kích hoạt khi sentinel xuất hiện trong tầm nhìn. |
| `hasMore` | `boolean` | `true` | Còn dữ liệu trang sau hay không. Nếu `false`, hook không kích hoạt nữa. |
| `isLoading` | `boolean` | `false` | Trạng thái đang tải dữ liệu. Ngăn chặn kích hoạt lượt tải mới khi lượt cũ chưa hoàn tất. |
| `disabled` | `boolean` | `false` | Vô hiệu hóa toàn bộ cơ chế theo dõi. |
| `rootMargin` | `string` | `"100px"` | Khoảng cách biên quan sát trước khi người dùng chạm tới đáy. |
| `threshold` | `number \| number[]` | `0` | Ngưỡng hiển thị của phần tử sentinel (từ `0` đến `1`). |
| `root` | `Element \| null \| RefObject` | `null` | Khung cuộn gốc. Mặc định là viewport trình duyệt. |
