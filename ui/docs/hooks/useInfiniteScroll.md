# ♾️ Hook `useInfiniteScroll` (`@openway/ui`)

A standalone, high-performance React hook for infinite scrolling mechanisms powered 100% by the browser's native **IntersectionObserver** API.

---

## 🌟 Highlights

- **Zero Main-Thread Overhead**: Does not attach manual `scroll` event listeners to containers, completely eliminating frame stutter and lag during fast scrolling.
- **Pure React 19 Compliant**: Avoids unnecessary refs for storing primitives (`hasMore`, `isLoading`, `disabled`), fully adhering to React 19 render conventions.
- **Duplicate Request Prevention (Mutex Lock)**: Employs a single, safe `isTriggeringRef` lock flag to prevent consecutive async API calls within the same render cycle.
- **Auto-trigger on Fetch Completion**: If previous page data has finished loading (`isLoading: false`) while the sentinel element remains in view, the hook seamlessly triggers loading the next page.

---

## 🚀 Import

```tsx
import { useInfiniteScroll } from "@openway/ui";
import type { UseInfiniteScrollOptions, UseInfiniteScrollReturn } from "@openway/ui";
```

---

## 📖 Usage Guide

### Using with a Card List / Feed

```tsx
import { useState } from "react";
import { useInfiniteScroll, Skeleton } from "@openway/ui";

export function PostFeed() {
  const [posts, setPosts] = useState<string[]>(["Bài viết 1", "Bài viết 2"]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = async () => {
    setIsLoading(true);
    // Simulate API call
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
    rootMargin: "150px", // Start loading 150px before reaching the bottom
  });

  return (
    <div className="max-w-md mx-auto space-y-3">
      {posts.map((post, idx) => (
        <div key={idx} className="p-4 border rounded-lg shadow-sm bg-white">
          {post}
        </div>
      ))}

      {/* Sentinel element observed by IntersectionObserver */}
      <div ref={sentinelRef} className="py-2">
        {isLoading && (
          <Skeleton lines={2} height="2.5rem" className="w-full" />
        )}
      </div>

      {!hasMore && (
        <p className="text-center text-xs text-neutral-400 py-2">
          All posts have been loaded
        </p>
      )}
    </div>
  );
}
```

---

## 🎛️ Options Table

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onLoadMore` | `() => void \| Promise<void>` | **Required** | Callback triggered when the sentinel element enters the viewport. |
| `hasMore` | `boolean` | `true` | Whether more pages are available. If `false`, the hook stops triggering. |
| `isLoading` | `boolean` | `false` | Loading state. Prevents triggering a new fetch cycle when the previous one has not completed. |
| `disabled` | `boolean` | `false` | Disables the entire observation mechanism. |
| `rootMargin` | `string` | `"100px"` | Margin around the root bounding box before triggering when approaching the bottom. |
| `threshold` | `number \| number[]` | `0` | Visibility threshold of the sentinel element (from `0` to `1`). |
| `root` | `Element \| null \| RefObject` | `null` | The scroll container element. Defaults to the browser viewport. |
