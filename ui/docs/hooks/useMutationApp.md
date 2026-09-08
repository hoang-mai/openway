# ⚡ Hook `useMutationApp` (`@openway/ui/query`)

Hook adapter chuyên dụng bọc quanh `useMutation` của **TanStack Query v5**, được thiết kế tối ưu cho các ứng dụng sử dụng hệ sinh thái **`@openway/ui`**. Hook giúp loại bỏ boilerplate code khi thao tác tạo, sửa, xóa (CUD), tự động hóa toàn diện quy trình hiển thị Toast thông báo trạng thái và làm mới cache dữ liệu (Query Invalidation).

---

## 🌟 Điểm nổi bật

- **Tự động hóa Toast Thông minh**:
  - Tự động hiển thị `toast.loading` khi bắt đầu thực thi mutation.
  - Tự động chuyển đổi mượt mà sang `toast.success` hoặc `toast.error` khi hoàn tất mà không bị nhảy popup thừa.
- **Trích xuất Lỗi Tự động (`extractErrorMessage`)**:
  - Tự động bóc tách thông điệp lỗi từ cấu trúc `error.response?.data?.message`, `error.response?.data?.error`, NestJS/Laravel validation array, HTTP status codes hoặc standard `Error.message`.
  - Không cần phải thủ công `catch (err) { toast.error(err.response.data.message) }` ở từng component.
- **Tự động Invalidate Cache Query**:
  - Hỗ trợ option `invalidateQueries` nhận vào một hoặc nhiều `QueryKey` (ví dụ `["teachers"]`, `["classes"]`) hoặc hàm tính toán động theo `(data, variables)`.
  - Khi mutation thành công, tự động gọi `queryClient.invalidateQueries` để các bảng `<Table />` (`useTableQuery`) hoặc `<Select />` (`useSelectInfiniteQuery`) lập tức hiển thị dữ liệu mới nhất.
- **Bổ sung `isLoading` (alias `isPending`)**:
  - Cung cấp `isLoading: boolean` tương thích với thói quen sử dụng của TanStack Query v4 và code giao diện thân thuộc.
- **Zero `any` & Chuẩn Generic Type**:
  - Hỗ trợ đầy đủ 4 tham số generic type chuẩn của TanStack Query: `<TData, TError, TVariables, TContext>`.
  - Giữ nguyên toàn bộ options và callback lifecycle (`onMutate`, `onSuccess`, `onError`, `onSettled`).

---

## 🚀 Import

```tsx
import { useMutationApp, extractErrorMessage } from "@openway/ui/query";
import type {
  UseMutationAppOptions,
  UseMutationAppReturn,
  UseMutationAppToastOptions,
  InvalidateQueryTarget,
} from "@openway/ui/query";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Thêm mới bản ghi (Create) với Shortcut Message

Cách đơn giản nhất để tạo một mutation có thông báo thành công và tự động refresh dữ liệu bảng:

```tsx
import { Button, Input, Modal } from "@openway/ui";
import { useMutationApp } from "@openway/ui/query";
import { useState } from "react";

interface CreateTeacherDto {
  name: string;
  email: string;
  subjectId: string;
}

export function CreateTeacherModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, isLoading } = useMutationApp({
    mutationFn: async (dto: CreateTeacherDto) => {
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (!res.ok) throw await res.json();
      return res.json();
    },
    // Hiển thị toast thành công & tự động báo lỗi nếu server trả về mã lỗi
    loadingMessage: "Đang lưu thông tin giáo viên...",
    successMessage: "Thêm mới giáo viên thành công!",
    // Tự động làm mới cache của bảng danh sách giáo viên
    invalidateQueries: [["teachers"]],
    onSuccess: () => {
      onClose();
      setName("");
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, email, subjectId: "math" });
  };

  return (
    <Modal open={open} onClose={onClose} title="Thêm mới Giáo viên">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button type="submit" loading={isLoading}>
            Lưu giáo viên
          </Button>
        </div>
      </form>
    </Modal>
  );
}
```

---

### 2. Cập nhật bản ghi với Toast động (`(data, variables)`)

Có thể truyền function để tạo thông điệp Toast chứa tên hoặc thông tin động từ dữ liệu:

```tsx
import { useMutationApp } from "@openway/ui/query";

interface UpdateUserDto {
  id: string;
  name: string;
}

export function useUpdateUser() {
  return useMutationApp({
    mutationFn: async ({ id, name }: UpdateUserDto) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
      });
      return res.json();
    },
    toast: {
      loading: (vars) => `Đang cập nhật thông tin người dùng #${vars.id}...`,
      success: (data, vars) => `Cập nhật người dùng "${vars.name}" thành công!`,
      error: (err) => `Không thể cập nhật: ${extractErrorMessage(err)}`,
    },
    // Làm mới cả danh sách chung và chi tiết user
    invalidateQueries: (data, vars) => [
      ["users"],
      ["user-detail", vars.id],
    ],
  });
}
```

---

### 3. Xóa dữ liệu (Delete) & Invalidate nhiều Query

```tsx
import { Button } from "@openway/ui";
import { useMutationApp } from "@openway/ui/query";

export function DeleteClassButton({ classId, className }: { classId: string; className: string }) {
  const { mutate, isLoading } = useMutationApp({
    mutationFn: async (id: string) => {
      await fetch(`/api/classes/${id}`, { method: "DELETE" });
    },
    successMessage: `Đã xóa lớp ${className} khỏi hệ thống!`,
    // Invalidate cả bảng lớp học và số liệu thống kê ở dashboard
    invalidateQueries: [
      ["classes"],
      ["dashboard-stats"],
    ],
  });

  return (
    <Button
      variant="soft"
      color="error"
      loading={isLoading}
      onClick={() => {
        if (confirm(`Bạn có chắc chắn muốn xóa lớp ${className}?`)) {
          mutate(classId);
        }
      }}
    >
      Xóa lớp
    </Button>
  );
}
```

---

### 4. Tắt Toast hoặc Tùy biến Giao diện Toast

```tsx
// Tắt hoàn toàn toast (nếu muốn tự xử lý UI riêng)
const mutation1 = useMutationApp({
  mutationFn: trackUserActivity,
  toast: false,
});

// Tùy biến vị trí và kiểu hiển thị của Toast
const mutation2 = useMutationApp({
  mutationFn: updateSettings,
  toast: {
    variant: "solid",
    success: "Đã lưu cài đặt!",
    options: {
      position: "bottom-center",
      duration: 3000,
    },
  },
});
```

---

## 🎛️ Bảng Options (`UseMutationAppOptions`)

Kế thừa toàn bộ options chuẩn của `UseMutationOptions` từ TanStack Query v5, bổ sung thêm:

| Tên Option | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `mutationFn` | `(variables: TVariables) => Promise<TData>` | `undefined` | Hàm bất đồng bộ gọi API thực thi tác vụ mutation. |
| `invalidateQueries` | `QueryKey \| QueryKey[] \| InvalidateQueryFilters \| InvalidateQueryFilters[] \| ((data, vars) => ...)` | `undefined` | Khóa truy vấn hoặc danh sách khóa truy vấn cần tự động làm mới khi mutation thành công. |
| `invalidateOptions` | `InvalidateOptions` | `undefined` | Tùy chọn nâng cao khi invalidate (ví dụ: `throwOnError`, `cancelRefetch`). |
| `toast` | `boolean \| UseMutationAppToastOptions` | `true` | Cấu hình Toast thông báo. Truyền `false` để tắt toàn bộ toast. |
| `loadingMessage` | `ReactNode \| ((vars) => ReactNode)` | `undefined` | Shortcut đặt thông báo loading khi đang chạy. |
| `successMessage` | `ReactNode \| ((data, vars) => ReactNode)` | `undefined` | Shortcut đặt thông báo khi thành công. |
| `errorMessage` | `ReactNode \| ((err, vars) => ReactNode)` | `undefined` | Shortcut đặt tiêu đề lỗi tùy biến (chi tiết lỗi bên dưới vẫn tự động bóc tách từ API qua `extractErrorMessage`). |
| `onSuccess` | `(data, variables, context) => Promise<unknown> \| unknown` | `undefined` | Callback chạy sau khi mutation thành công và sau khi đã refresh cache. |
| `onError` | `(error, variables, context) => Promise<unknown> \| unknown` | `undefined` | Callback chạy khi mutation gặp lỗi. |
| `onSettled` | `(data, error, variables, context) => Promise<unknown> \| unknown` | `undefined` | Callback chạy khi mutation kết thúc (dù thành công hay thất bại). |

---

## 📦 Bảng Return (`UseMutationAppReturn`)

Kế thừa toàn bộ kết quả trả về của `UseMutationResult` từ TanStack Query v5:

| Thuộc tính | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `mutate` | `(variables: TVariables, options?) => void` | Kích hoạt mutation theo cơ chế fire-and-forget. |
| `mutateAsync` | `(variables: TVariables, options?) => Promise<TData>` | Kích hoạt mutation và trả về Promise để có thể `await`. |
| `isLoading` | `boolean` | **Alias tiện ích của `isPending`**, là `true` khi mutation đang chạy. |
| `isPending` | `boolean` | Trạng thái đang chạy của TanStack Query v5. |
| `isSuccess` | `boolean` | Là `true` khi mutation đã hoàn tất thành công. |
| `isError` | `boolean` | Là `true` khi mutation thất bại. |
| `data` | `TData \| undefined` | Dữ liệu trả về từ `mutationFn` khi thành công. |
| `error` | `TError \| null` | Đối tượng lỗi trả về từ `mutationFn` khi thất bại. |
| `reset` | `() => void` | Đặt lại trạng thái mutation về ban đầu (`idle`). |
