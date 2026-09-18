# 🍞 Toast Component & API (`@openway/ui`)

Hệ thống thông báo dạng pop-up nổi (**Toast Notifications**) với hiệu ứng **xếp chồng thẻ 3D (Card Stacking)** mượt mà từ động cơ **Sonner**, tích hợp trực quan hoàn hảo với thiết kế của component **`<Alert />`** chuẩn **Design System**, **100% Type-safe (Zero `any`)** và hỗ trợ **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Tích hợp giao diện `<Alert />` 100%**: Mọi thông báo Toast đều kế thừa toàn bộ vẻ đẹp của `<Alert />` (5 sizes, 6 variants, 7 colors, custom icon, action button, bo góc).
- **Xếp chồng 3D thông minh (`Card Stacking`)**: Mặc định (`expand={false}`) các thông báo sẽ tự động xếp lồng vào nhau thành 1 tập thẻ 3D gọn gàng, tự động trượt mở rộng khi người dùng rê chuột (hover) vào.
- **Imperative API tiện lợi**: Có thể gọi hàm `toast.success()`, `toast.error()` ở bất kỳ đâu (trong React Component, Event Handler, API Axios/Fetch Interceptors) mà không cần bọc context provider phức tạp.
- **Cú pháp chuẩn hóa gọn gàng**: `toast.success(title, description?, options?)` — trực quan, dễ nhớ, dễ dùng.
- **Xử lý tự động Promise (`toast.promise`)**: Tự động quản lý vòng đời Async Operation: hiển thị spinner lúc tải (*Loading*), tự động cập nhật sang *Success* hoặc *Error* mượt mà tại cùng 1 thẻ thông báo.
- **Type Safety tuyệt đối**: Không sử dụng `any`, hỗ trợ Generic `<T>` chuẩn xác cho dữ liệu trả về từ API trong `toast.promise`.
- **Hằng số chuẩn hóa**: Sử dụng `DEFAULT_TOAST_DURATION = 4000ms`, dễ dàng tùy biến thời gian hiển thị toàn cục hoặc cục bộ.

---

## 🚀 Cài đặt & Thiết lập

### Bước 1: Gắn `<Toaster />` tại Root Layout
Mount component `<Toaster />` một lần duy nhất tại file layout cao nhất của ứng dụng (ví dụ: `App.tsx`, `main.tsx` hoặc `app/layout.tsx`):

```tsx
import { Toaster } from "@openway/ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
        {/* Đặt Toaster ở cuối body */}
        <Toaster position="top-right" duration={4000} />
      </body>
    </html>
  );
}
```

---

### Bước 2: Gọi thông báo ở bất kỳ đâu
```tsx
import { toast } from "@openway/ui";

export function SaveButton() {
  const handleSave = () => {
    toast.success("Lưu thành công!", "Dữ liệu hồ sơ của bạn đã được cập nhật.");
  };

  return <button onClick={handleSave}>Lưu thông tin</button>;
}
```

---

## 📖 Hướng dẫn sử dụng chi tiết

### 1. Các phương thức thông báo cơ bản

```tsx
import { toast } from "@openway/ui";

// 1. Thành công (Success)
toast.success("Thành công!", "Tạo tài khoản mới thành công.");

// 2. Lỗi (Error)
toast.error("Đã xảy ra lỗi!", "Không thể kết nối đến máy chủ.");

// 3. Cảnh báo (Warning)
toast.warning("Cảnh báo dung lượng", "Bộ nhớ đám mây của bạn sắp đầy (90%).");

// 4. Thông tin (Info / Mặc định)
toast.info("Có bản cập nhật mới", "Vui lòng tải lại trang để áp dụng.");
// hoặc gọi trực tiếp:
toast("Thông báo hệ thống", "Phiên làm việc sẽ hết hạn sau 15 phút.");

// 5. Đang tải (Loading - không tự tắt)
const loadingId = toast.loading("Đang đồng bộ dữ liệu...", "Vui lòng không tắt trình duyệt.");
```

---

### 2. Tùy biến giao diện Alert qua `options`

Bạn có thể truyền tham số thứ 3 (`options`) để thay đổi biến thể hiển thị, thời gian, kích cỡ hoặc thêm nút thao tác:

```tsx
import { toast, Button } from "@openway/ui";

// Biến thể nền đậm (filled) và hiển thị trong 8 giây:
toast.error("Xóa thất bại!", "Bạn không có quyền xóa tài nguyên này.", {
  variant: "filled",
  duration: 8000,
});

// Thêm nút bấm Action slot:
toast.info("Đã chuyển vào thùng rác", "Tệp tin 'tailieu.pdf' đã bị xóa.", {
  action: (
    <Button
      size="xs"
      variant="outline"
      color="info"
      onClick={() => {
        // Xử lý logic hoàn tác
        console.log("Hoàn tác");
      }}
    >
      Hoàn tác
    </Button>
  ),
});

// Thay đổi độ bo góc & size:
toast.success("Đã sao chép liên kết!", undefined, {
  size: "sm",
  radius: "full",
});
```

---

### 3. Tự động hóa gọi API bất đồng bộ với `toast.promise`

`toast.promise` tự động hiển thị trạng thái đang tải (Loading spinner), sau đó cập nhật sang Success hoặc Error khi API hoàn tất:

#### Cách 1: Chuỗi thông báo đơn giản
```tsx
import { toast } from "@openway/ui";

async function handleUpdateProfile() {
  await toast.promise(updateUserApi(data), {
    loading: "Đang cập nhật hồ sơ...",
    success: "Cập nhật hồ sơ thành công!",
    error: "Không thể cập nhật hồ sơ.",
  });
}
```

#### Cách 2: Sử dụng dữ liệu trả về từ API và tùy biến giao diện
```tsx
import { toast } from "@openway/ui";

interface Invoice {
  code: string;
  total: number;
}

async function handleCreateInvoice() {
  await toast.promise<Invoice>(createInvoiceApi(), {
    loading: {
      title: "Đang tạo hóa đơn...",
      description: "Hệ thống đang xuất mã hóa đơn điện tử.",
    },
    success: (invoice) => ({
      title: "Tạo hóa đơn thành công!",
      description: `Mã hóa đơn: #${invoice.code} - Tổng tiền: ${invoice.total.toLocaleString()}đ`,
      variant: "filled",
    }),
    error: (err) => ({
      title: "Xuất hóa đơn thất bại!",
      description: err instanceof Error ? err.message : "Đã có lỗi xảy ra.",
    }),
    finally: () => {
      console.log("Hoàn tất tác vụ.");
    },
  });
}
```

---

### 4. Đóng thông báo chủ động (`toast.dismiss`)

```tsx
import { toast } from "@openway/ui";

// 1. Đóng một thông báo cụ thể bằng ID nhận được:
const id = toast.loading("Đang nén tệp...");
// ...sau khi xong việc:
toast.dismiss(id);

// 2. Đóng TẤT CẢ thông báo đang hiện trên màn hình:
toast.dismiss();
```

---

### 5. Tùy biến toàn diện với `toast.custom`

Nếu bạn muốn hiển thị một component JSX bất kỳ theo phong cách riêng:

```tsx
import { toast } from "@openway/ui";

// Cách 1: Dùng hàm render (nhận vào id để đóng)
toast.custom((id) => (
  <div className="p-4 bg-purple-900 text-white rounded-xl shadow-xl flex items-center justify-between">
    <span>✨ Thông báo khuyến mãi đặc biệt!</span>
    <button
      onClick={() => toast.dismiss(id)}
      className="ml-3 px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs"
    >
      Đóng
    </button>
  </div>
));

// Cách 2: Truyền trực tiếp AlertProps
toast.custom({
  color: "secondary",
  variant: "outline",
  title: "Tùy biến qua AlertProps",
  description: "Render trực tiếp cấu hình Alert.",
});
```

---

## ⚙️ Bảng tra cứu API Reference

### 1. `ToasterProps` (Cấu hình cho thẻ `<Toaster />`)

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `position` | `ToastPosition` | `'top-right'` | Vị trí hiển thị danh sách Toast trên màn hình (`'top-left'`, `'top-right'`, `'top-center'`, `'bottom-left'`, `'bottom-right'`, `'bottom-center'`). |
| `visibleToasts` | `number` | `3` | Số lượng thông báo tối đa hiển thị cùng lúc trước khi xếp chồng 3D. |
| `expand` | `boolean` | `false` | Mặc định `false` để gộp thành stack thẻ 3D (chỉ bung ra khi hover). Nếu `true` sẽ luôn bung rộng toàn bộ. |
| `duration` | `number` | `4000` (`DEFAULT_TOAST_DURATION`) | Thời gian hiển thị mặc định của các toasts (ms). |
| `closeButton` | `boolean` | `false` | Hiển thị nút đóng mặc định của Sonner (Alert đã tích hợp sẵn nút đóng đẹp mắt). |
| `className` | `string` | `""` | Tùy biến class cho container bao ngoài Toaster. |

---

### 2. `ToastOptions` (Tham số `options` khi gọi `toast.xxx`)

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `duration` | `number` | `4000` | Thời gian hiển thị của thông báo này (ms). Truyền `Infinity` nếu muốn giữ mãi. |
| `position` | `ToastPosition` | Theo Toaster | Ghi đè vị trí hiển thị chỉ riêng cho thông báo này. |
| `variant` | `AlertVariant` | `'soft'` | Biến thể giao diện Alert (`'soft'`, `'filled'`, `'outline'`, `'accent-left'`, `'ghost'`, `'other'`). |
| `color` | `AlertColor` | Theo hàm gọi | Màu sắc chủ đề (`'primary'`, `'secondary'`, `'neutral'`, `'error'`, `'success'`, `'warning'`, `'info'`). |
| `size` | `AlertSize` | `'md'` | Kích cỡ thông báo (`'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`). |
| `radius` | `AlertRadius` | `'lg'` | Độ bo góc (`'none'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'full'`). |
| `icon` | `ReactNode \| boolean` | `true` | Icon hiển thị (`true`: icon mặc định, `false`: ẩn icon, `ReactNode`: icon tùy chọn). |
| `action` | `ReactNode` | `undefined` | Phần tử nút bấm / liên kết thao tác nhanh trong Alert. |
| `closable` | `boolean` | `true` | Cho phép đóng thông báo qua nút `(X)` (tự động dismiss khỏi Sonner). |
| `onClose` | `() => void` | `undefined` | Callback chạy khi người dùng bấm nút đóng `(X)`. |
| `onDismiss` | `(toast: ToastT) => void` | `undefined` | Callback chạy khi toast bị dismiss khỏi màn hình. |
| `onAutoClose` | `(toast: ToastT) => void` | `undefined` | Callback chạy khi toast tự động đóng do hết thời gian `duration`. |
| `className` | `string` | `""` | Class tùy biến cho khung Alert. |

---

### 3. `ToastPromiseOptions<T>` (Cấu hình cho `toast.promise`)

| Thuộc tính | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `loading` | `ToastMessageResult` | Nội dung hiển thị trong lúc Promise đang chạy (Loading state). |
| `success` | `ToastMessageResult \| (data: T) => ToastMessageResult` | Nội dung hiển thị khi Promise hoàn tất thành công (Resolve state). |
| `error` | `ToastMessageResult \| (error: unknown) => ToastMessageResult` | Nội dung hiển thị khi Promise thất bại (Reject state). |
| `finally` | `() => void \| Promise<void>` | Callback luôn chạy sau khi Promise hoàn tất (cả success và error). |
| `duration` | `number` | Thời gian hiển thị thông báo kết quả (mặc định 4000ms). |
| `size` | `AlertSize` | Kích cỡ thông báo áp dụng cho cả chu trình promise. |
| `variant` | `AlertVariant` | Biến thể Alert áp dụng cho cả chu trình promise. |
| `radius` | `AlertRadius` | Độ bo góc áp dụng cho cả chu trình promise. |

---

### 4. Danh sách các phương thức `toast`

| Phương thức | Cú pháp | Mô tả |
| :--- | :--- | :--- |
| `toast()` | `toast(title, description?, options?)` | Hiển thị Toast thông tin mặc định (`color="info"`). |
| `toast.success()` | `toast.success(title, description?, options?)` | Hiển thị Toast thành công (`color="success"`). |
| `toast.error()` | `toast.error(title, description?, options?)` | Hiển thị Toast lỗi (`color="error"`). |
| `toast.warning()` | `toast.warning(title, description?, options?)` | Hiển thị Toast cảnh báo (`color="warning"`). |
| `toast.info()` | `toast.info(title, description?, options?)` | Hiển thị Toast thông tin (`color="info"`). |
| `toast.loading()` | `toast.loading(title, description?, options?)` | Hiển thị Toast đang tải dữ liệu (`icon=Spinner`, `duration=Infinity`). |
| `toast.promise()` | `toast.promise(promise, options)` | Tự động theo dõi Promise và cập nhật trạng thái Toast. |
| `toast.custom()` | `toast.custom(jsxFn \| alertProps, options?)` | Hiển thị Toast tùy biến hoàn toàn. |
| `toast.dismiss()` | `toast.dismiss(id?)` | Đóng Toast theo ID hoặc đóng toàn bộ nếu không truyền ID. |
