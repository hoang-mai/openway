# 🔽 Hook `useSelectInfiniteQuery` (`@openway/ui/query`)

Hook adapter chuyên dụng kết hợp **TanStack Query v5** (`useInfiniteQuery`) với **`useInfiniteScroll`** và **`Skeleton`**, dành riêng cho các thành phần `<Select />` và `<MultiSelect />` ở chế độ máy chủ (`searchMode="server"`).

---

## 🌟 Điểm nổi bật

- **Tự động hóa hoàn toàn**: Trả về trọn gói `selectProps` sẵn sàng spread thẳng vào `<Select {...selectProps} />` hoặc `<MultiSelect {...selectProps} />`.
- **Phân trang Vô tận (Infinite Scroll)**: Tự động quan sát khi người dùng cuộn đến đáy danh sách qua `useInfiniteScroll` (native `IntersectionObserver`), kích hoạt `fetchNextPage()`.
- **Hiệu ứng Skeleton Loading**: Tự động hiển thị 2 dòng `Skeleton` nhấp nháy mô phỏng option item tại `listFooter` khi đang tải thêm trang (`isFetchingNextPage`).
- **Gộp & Khử Trùng lặp Options**: Tự động gom tụ các trang dữ liệu (`pages`) thành danh sách phẳng và khử trùng lặp theo `value`.
- **Chống Double Debounce**: `<Select />` tự chịu trách nhiệm debounce từ khóa người dùng gõ theo `debounceMs` rồi mới gọi `onSearch`, hook nhận sự kiện và kích hoạt query ngay lập tức, không tạo độ trễ thừa thãi.
- **Zero `any`**: Type-safe 100% với Generic type `TData`, `TResponse`, `TPageParam`.

---

## 🚀 Import

```tsx
import { useSelectInfiniteQuery } from "@openway/ui/query";
import type {
  SelectQueryParams,
  UseSelectInfiniteQueryOptions,
  UseSelectInfiniteQueryReturn,
} from "@openway/ui/query";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Phân trang Server cơ bản với Cursor / NextPage

```tsx
import { Select } from "@openway/ui";
import { useSelectInfiniteQuery } from "@openway/ui/query";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface ProductPageResponse {
  items: Product[];
  nextPage?: number;
}

export function InfiniteProductSelect() {
  const { selectProps, query } = useSelectInfiniteQuery<
    Product,
    ProductPageResponse,
    number
  >({
    queryKey: ["products-infinite"],
    queryFn: async ({ pageParam, search }) => {
      const res = await fetch(
        `/api/products?page=${pageParam}&search=${encodeURIComponent(search)}`
      );
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    mapOption: (item) => {
      const product = item as Product;
      return {
        value: product.id,
        label: product.title,
        description: `${product.price.toLocaleString()} đ`,
        data: product,
      };
    },
    debounceMs: 300,
    endMessage: "Đã hiển thị toàn bộ sản phẩm",
  });

  return (
    <div className="max-w-md">
      <Select
        {...selectProps}
        label="Chọn sản phẩm"
        placeholder="Tìm kiếm theo tên sản phẩm..."
        searchable
        clearable
      />
    </div>
  );
}
```

---

## 🎛️ Bảng Options (`UseSelectInfiniteQueryOptions`)

| Tên Option | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `queryKey` | `readonly unknown[]` | **Bắt buộc** | Query key gốc. `[{ search, filters }]` tự động được thêm vào cuối queryKey. |
| `queryFn` | `(params, context) => Promise<TResponse>` | **Bắt buộc** | Hàm fetch API theo từng trang, nhận `pageParam`, `search`, `filters`. |
| `initialPageParam` | `TPageParam` | `1` | Giá trị tham số trang ban đầu (page hoặc cursor). |
| `getNextPageParam` | `(lastPage, allPages, ...) => TPageParam` | Tự động đoán (`nextPage`, `nextCursor`...) | Xác định tham số trang kế tiếp. Trả về `undefined` khi hết dữ liệu. |
| `selectOptions` | `(response) => SelectOptionItem<TData>[]` | Tự động bóc tách | Hàm trích xuất mảng option từ response mỗi trang. |
| `mapOption` | `(item, index) => SelectOptionItem<TData>` | `undefined` | Hàm biến đổi phần tử thô thành `SelectOptionItem`. |
| `debounceMs` | `number` | `300` | Thời gian hoãn tìm kiếm truyền xuống cho Select. |
| `skeletonLines` | `number` | `2` | Số dòng Skeleton hiển thị ở đáy danh sách khi tải thêm trang. |
| `endMessage` | `ReactNode` | `undefined` | Văn bản hiển thị dưới đáy danh sách khi đã tải hết tất cả trang. |

---

## 📦 Giá trị trả về (`UseSelectInfiniteQueryReturn`)

- `selectProps`: Gói props truyền thẳng vào `<Select />` hoặc `<MultiSelect />`:
  - `options`: Mảng options gom tụ từ tất cả các trang đã tải.
  - `isLoading`: Trạng thái đang tải trang đầu tiên.
  - `searchMode: "server"`
  - `debounceMs`: Thời gian debounce.
  - `onSearch`: Handler nhận từ khóa và filters từ Select.
  - `listFooter`: Sentinel kèm Skeleton loading khi đang cuộn tải trang tiếp.
- `query`: Đối tượng `UseInfiniteQueryResult` từ TanStack Query.
- `options`: Danh sách options đầy đủ.
- `search`, `setSearch`: Từ khóa tìm kiếm hiện tại.
- `filters`, `setFilters`: Bộ lọc menu hiện tại.
- `reset`: Đặt lại toàn bộ tìm kiếm và bộ lọc về giá trị ban đầu.
