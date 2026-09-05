# 🔽 Select & MultiSelect Component (`@openway/ui`)

Bộ đôi component **Select** (Chọn đơn) và **MultiSelect** (Chọn nhiều) cao cấp, thiết kế theo chuẩn **Design System**, tuân thủ nghiêm ngặt **WAI-ARIA 1.2 Combobox/Listbox**, hỗ trợ **Zero `any`**, tìm kiếm **Client & Server**, phân trang vô tận với **TanStack Query v5** và hiệu ứng **Skeleton Loading**.

---

## 🌟 Điểm nổi bật

- **2 Component chuyên biệt**:
  - `<Select>`: Chọn 1 giá trị duy nhất, hỗ trợ placeholder, clearable, render custom value/option.
  - `<MultiSelect>`: Chọn nhiều giá trị dưới dạng tags/chips, hỗ trợ xóa nhanh từng tag, nút clear all, giới hạn số lượng tag hiển thị (`maxTags`).
- **2 Chế độ Tìm kiếm (`searchMode`)**:
  - `client`: Tìm kiếm và sắp xếp kết quả ngay trên client với thuật toán xếp hạng từ khóa thông minh (`searchField`, `filterFn`).
  - `server`: Tìm kiếm phía máy chủ. Tự động debounce từ khóa gõ theo `debounceMs` trước khi gọi `onSearch(query, filters)`.
- **Tích hợp TanStack Query v5 & Infinite Scroll (`@openway/ui/query`)**:
  - Hook chuyên dụng `useSelectInfiniteQuery` kết hợp `useInfiniteQuery` với `useInfiniteScroll`.
  - Tự động gộp options từ tất cả các trang, khử trùng lặp theo `value`.
  - Hiệu ứng **Skeleton** nhấp nháy ở đáy danh sách khi đang tải thêm trang (`isFetchingNextPage`).
  - Không bị double-debounce, tải mượt mà qua native `IntersectionObserver`.
- **Đầy đủ tính năng UI nâng cao**:
  - `menuFilters`: Bộ lọc đa điều kiện tích hợp ngay trên thanh đầu của menu dropdown.
  - `renderOption` & `renderValue`: Tùy biến hiển thị từng hàng option (avatar, description, badge...) và giá trị được chọn.
  - `startContent` & `endContent`: Bổ sung icon hoặc nội dung phụ ở hai đầu trigger box.
  - `portal={true}`: Render menu ra ngoài DOM qua `@floating-ui/react`, không bị tràn hoặc che khuất bởi `overflow: hidden`.
- **Trợ năng WAI-ARIA & Điều hướng bàn phím**:
  - Hỗ trợ đầy đủ phím mũi tên `ArrowUp`, `ArrowDown`, `Home`, `End`, `Enter` để chọn, `Escape` để đóng dropdown.

---

## 🚀 Cài đặt & Import

```tsx
// 1. Components & Types cơ bản
import { Select, MultiSelect } from "@openway/ui";
import type {
  SelectProps,
  MultiSelectProps,
  SelectOptionItem,
  SelectFilterField,
} from "@openway/ui";

// 2. Query Hook cho Server Infinite Scroll (Tùy chọn, cần @tanstack/react-query v5)
import { useSelectInfiniteQuery } from "@openway/ui/query";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Select cơ bản (Client Mode)

```tsx
import { useState } from "react";
import { Select, SelectOptionItem } from "@openway/ui";

const departments: SelectOptionItem<string>[] = [
  { value: "hr", label: "Phòng Nhân sự" },
  { value: "it", label: "Phòng Công nghệ Thông tin" },
  { value: "sales", label: "Phòng Kinh doanh" },
  { value: "mkt", label: "Phòng Marketing" },
];

export function BasicSelectExample() {
  const [value, setValue] = useState<string | number | null>("it");

  return (
    <div className="max-w-sm">
      <Select
        label="Phòng ban"
        placeholder="Chọn phòng ban..."
        options={departments}
        value={value}
        onChange={(val) => setValue(val)}
        clearable
      />
    </div>
  );
}
```

---

### 2. MultiSelect với Tags

```tsx
import { useState } from "react";
import { MultiSelect, SelectOptionItem } from "@openway/ui";

const roles: SelectOptionItem[] = [
  { value: "admin", label: "Quản trị viên" },
  { value: "editor", label: "Biên tập viên" },
  { value: "moderator", label: "Điều hành viên" },
  { value: "viewer", label: "Người xem" },
];

export function MultiSelectExample() {
  const [selectedRoles, setSelectedRoles] = useState<(string | number)[]>(["editor"]);

  return (
    <div className="max-w-md">
      <MultiSelect
        label="Vai trò người dùng"
        placeholder="Chọn các vai trò..."
        options={roles}
        value={selectedRoles}
        onChange={(vals) => setSelectedRoles(vals)}
        searchable
        clearable
      />
    </div>
  );
}
```

---

### 3. Server Pagination & Infinite Scroll (`useSelectInfiniteQuery`)

Đây là phương thức khuyên dùng khi dữ liệu từ máy chủ có số lượng lớn hoặc trả về theo từng trang:

```tsx
import { Select } from "@openway/ui";
import { useSelectInfiniteQuery } from "@openway/ui/query";

interface UserItem {
  id: number;
  name: string;
  email: string;
}

export function ServerInfiniteSelectExample() {
  const { selectProps, query } = useSelectInfiniteQuery<
    UserItem,
    { users: UserItem[]; nextCursor?: number },
    number
  >({
    queryKey: ["users-infinite"],
    queryFn: async ({ pageParam, search }) => {
      const res = await fetch(
        `/api/users?cursor=${pageParam}&q=${encodeURIComponent(search)}`
      );
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    // Biến đổi entity trả về thành định dạng SelectOptionItem chuẩn
    mapOption: (item) => {
      const user = item as UserItem;
      return {
        value: user.id,
        label: user.name,
        description: user.email,
        data: user,
      };
    },
    debounceMs: 300,
    endMessage: "Đã hiển thị toàn bộ người dùng",
  });

  return (
    <div className="max-w-md">
      <Select
        {...selectProps}
        label="Chọn thành viên"
        placeholder="Tìm kiếm thành viên..."
        searchable
        clearable
      />
    </div>
  );
}
```

---

### 4. Tùy biến Option (`renderOption`) & Rich Layout

```tsx
<Select
  label="Chọn người dùng"
  options={userOptions}
  renderOption={(option, { isSelected, isFocused }) => (
    <div className="flex items-center gap-2.5 py-1">
      <img
        src={option.data?.avatarUrl}
        alt={option.label}
        className="w-7 h-7 rounded-full object-cover"
      />
      <div>
        <div className="font-medium text-sm text-neutral-800 dark:text-neutral-100">
          {option.label}
        </div>
        <div className="text-xs text-neutral-400 dark:text-neutral-500">
          {option.description}
        </div>
      </div>
    </div>
  )}
/>
```

---

### 5. Bộ lọc tích hợp trong Menu (`menuFilters`)

```tsx
const filterFields: SelectFilterField[] = [
  {
    name: "status",
    label: "Trạng thái",
    type: "select",
    options: [
      { value: "active", label: "Hoạt động" },
      { value: "inactive", label: "Đã khóa" },
    ],
  },
];

<Select
  label="Khách hàng"
  options={customerOptions}
  menuFilters={filterFields}
  onMenuFilterChange={(filters) => {
    console.log("Filter áp dụng:", filters);
  }}
/>
```

---

## 🎛️ Bảng Props Chi tiết

### Props dùng chung (`BaseSelectProps`)

| Tên Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `options` | `SelectOptionItem<TData>[]` | `[]` | Mảng danh sách các lựa chọn. |
| `label` | `ReactNode` | `undefined` | Nhãn hiển thị phía trên trigger. |
| `placeholder` | `string` | `"Select..."` | Văn bản gợi ý khi chưa chọn giá trị. |
| `searchable` | `boolean` | `false` | Bật ô nhập tìm kiếm trong menu. |
| `searchMode` | `"client" \| "server"` | `"client"` | Chế độ tìm kiếm nội bộ hay gọi server. |
| `debounceMs` | `number` | `300` | Thời gian hoãn tìm kiếm server (ms). |
| `onSearch` | `(query, filters) => void` | `undefined` | Callback khi người dùng tìm kiếm ở chế độ server. |
| `listFooter` | `ReactNode` | `undefined` | Phần tử hiển thị dưới đáy danh sách (dùng cho Sentinel / Skeleton). |
| `clearable` | `boolean` | `false` | Hiển thị nút xóa nhanh giá trị đã chọn. |
| `disabled` | `boolean` | `false` | Khóa không cho phép tương tác. |
| `isLoading` | `boolean` | `false` | Hiển thị trạng thái đang tải dữ liệu. |
| `portal` | `boolean` | `true` | Render menu qua portal chống tràn khung nhìn. |
| `maxMenuHeight` | `number` | `280` | Chiều cao tối đa của khung menu cuộn (px). |
| `renderOption` | `(option, state) => ReactNode` | `undefined` | Hàm custom render từng option trong listbox. |
| `renderValue` | `(selected) => ReactNode` | `undefined` | Hàm custom hiển thị giá trị trên trigger. |
| `menuFilters` | `SelectFilterField[]` | `undefined` | Danh sách bộ lọc bổ sung gắn ở đầu dropdown. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Kích thước trigger box. |
| `variant` | `"outline" \| "filled" \| "soft"`| `"outline"` | Biến thể giao diện đường viền / nền. |
