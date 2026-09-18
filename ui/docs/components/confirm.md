# 📦 Confirm Component (`@openway/ui`)

Bộ component **Confirm** (Hộp thoại xác nhận) hiệu năng cao, chuẩn **HTML5 Native `<dialog>`** và thiết kế theo mô hình **Pure Compound Pattern** linh hoạt.

---

## 🌟 Điểm nổi bật

- **Native Top Layer**: Sử dụng thẻ `<dialog>` kết hợp phương thức `dialog.showModal()` của trình duyệt. Confirm tự động nổi lên tầng cao nhất (`#top-layer`), không bao giờ bị cắt xén bởi phần tử cha có `overflow: hidden`, `overflow: auto` hay xung đột `z-index`.
- **Zero Global Store**: Loại bỏ hoàn toàn Zustand / Redux / React Portal. Bạn có thể render Confirm ở bất kỳ đâu trong cây JSX.
- **Mượt mà với Exit Animation**: Tích hợp sẵn hiệu ứng mở và thoát (**Exit Animation 300ms**) cho cả hộp thoại lẫn nền mờ backdrop.
- **Pure Compound Architecture**: Tách rời hoàn toàn giữa tầng Container (`<ConfirmContainer>`) và tầng giao diện (`<Confirm>`, `<ConfirmHeader>`, `<ConfirmBody>`, `<ConfirmFooter>`, `<ConfirmClose>`).
- **Tự động liên kết Context**: Nút đóng `(X)` trong `<ConfirmHeader>` và component `<ConfirmClose>` tự động kích hoạt đóng kèm Exit Animation mà không cần truyền lặp lại state `open/onClose`.
- **Hỗ trợ Loading an toàn (`isLoading`)**: Tự động khóa đóng modal (chặn click backdrop, chặn ESC, tự động disable nút đóng `(X)`, nút Hủy và nút bọc `<ConfirmClose>`) khi đang trong tiến trình xử lý API/tải dữ liệu.
- **Hỗ trợ đầy đủ Accessibility (a11y)**: Tự động khóa cuộn trang (`body scroll lock`), bắt phím `ESC`, focus trap của trình duyệt, liên kết `aria-labelledby` và `aria-describedby`.

---

## 🚀 Cài đặt & Import

```tsx
import {
  ConfirmContainer,
  Confirm,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
  ConfirmClose,
  useConfirmContext,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản (Pure Compound Pattern)

```tsx
import { useState } from "react";
import {
  Button,
  ConfirmContainer,
  Confirm,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
} from "@openway/ui";

export function BasicConfirmExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button color="error" onClick={() => setOpen(true)}>
        Xóa mục này
      </Button>

      <ConfirmContainer open={open} size="md" color="error" onClose={() => setOpen(false)}>
        <Confirm>
          <ConfirmHeader title="Xác nhận xóa dữ liệu?" />
          <ConfirmBody>
            Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa không?
          </ConfirmBody>
          <ConfirmFooter
            confirmText="Xóa vĩnh viễn"
            cancelText="Hủy bỏ"
            onConfirm={() => {
              console.log("Đã xóa!");
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
        </Confirm>
      </ConfirmContainer>
    </div>
  );
}
```

---

### 2. Xử lý bất đồng bộ & Khóa an toàn (`isLoading`)

Khi xử lý logic bất đồng bộ (API call) trong `onConfirm`, bạn có thể truyền hàm async cho `onConfirm` trên `<ConfirmFooter>` hoặc kiểm soát prop `isLoading={loading}` trên `<ConfirmContainer>`:

```tsx
import { useState } from "react";
import {
  Button,
  ConfirmContainer,
  Confirm,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
} from "@openway/ui";

export function AsyncConfirmExample() {
  const [open, setOpen] = useState(false);

  const handleConfirmAction = async () => {
    // Tự động bật Spinner và khóa tương tác trong suốt thời gian API chạy
    await apiDeleteResource();
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Xóa tài khoản</Button>

      <ConfirmContainer open={open} color="error" onClose={() => setOpen(false)}>
        <Confirm>
          <ConfirmHeader title="Xác nhận xóa tài khoản" />
          <ConfirmBody>
            Quá trình này có thể mất vài giây để hoàn tất dọn dẹp dữ liệu.
          </ConfirmBody>
          <ConfirmFooter
            confirmText="Xóa tài khoản"
            onConfirm={handleConfirmAction}
            onCancel={() => setOpen(false)}
          />
        </Confirm>
      </ConfirmContainer>
    </div>
  );
}
```

Khi đang loading:
- Người dùng bấm phím `ESC` sẽ **bị chặn**.
- Click ra ngoài vùng backdrop overlay sẽ **bị chặn**.
- Nút đóng `(X)` và nút `Hủy` tự động bị **vô hiệu hóa (`disabled`)**.
- Nút `Xác nhận` hiển thị Spinner loading.

---

### 3. Thiết kế Compound Components tùy biến linh hoạt

Bạn có thể tự do tùy biến giao diện bên trong Confirm bằng các sub-component:

```tsx
import {
  ConfirmContainer,
  Confirm,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
  ConfirmClose,
  Button,
} from "@openway/ui";

export function CompoundConfirmExample({ open, onClose }) {
  return (
    <ConfirmContainer open={open} size="lg" color="warning" onClose={onClose}>
      <Confirm>
        <ConfirmHeader title="Cảnh báo cập nhật hệ thống" showCloseButton />
        <ConfirmBody>
          <div className="space-y-3">
            <p className="text-sm text-neutral-600">
              Một số dịch vụ có thể tạm ngưng trong ít phút khi bảo trì.
            </p>
            <div className="p-3 bg-warning-50 border border-warning-200 rounded-md text-xs text-warning-800">
              ⚠️ Vui lòng lưu lại công việc hiện tại trước khi tiếp tục.
            </div>
          </div>
        </ConfirmBody>
        <ConfirmFooter>
          {/* ConfirmClose tự động đóng kèm Exit Animation */}
          <ConfirmClose>
            <Button variant="outline">Để sau</Button>
          </ConfirmClose>
          <Button color="warning" onClick={() => proceedUpdate()}>
            Bắt đầu cập nhật
          </Button>
        </ConfirmFooter>
      </Confirm>
    </ConfirmContainer>
  );
}
```

---

### 4. Đóng Confirm lập trình qua Hook (`useConfirmContext`)

```tsx
import { useConfirmContext, Button } from "@openway/ui";

function CustomChildAction() {
  const { onClose, isLoading } = useConfirmContext();

  return (
    <Button onClick={onClose} disabled={isLoading}>
      Đóng hộp thoại
    </Button>
  );
}
```

---

### 5. Tùy biến Kích thước (`size`), Chủ đề màu (`color`) & Bo góc (`radius`)

Confirm hỗ trợ 5 kích thước chiều rộng và 7 chủ đề màu sắc:

| Kích thước (`size`) | Chiều rộng (`max-w`) |
| :--- | :--- |
| `xs` | `320px` |
| `sm` | `380px` |
| `md` *(mặc định)* | `440px` |
| `lg` | `520px` |
| `xl` | `600px` |

Chủ đề màu (`color`):
- `primary`, `secondary`, `neutral`, `error`, `success`, `warning` *(mặc định)*, `info`.

Độ ưu tiên truyền props:
> **`Prop truyền trực tiếp vào component con`** > **`Prop size / color từ ConfirmContainer qua Context`** > **`Mặc định ("md" / "warning")`**.

---

## 📚 Bảng tra cứu Props (API Reference)

### `<ConfirmContainer>`

Tầng Wrapper quản lý Overlay Backdrop, Native Dialog, Animation thoát và phím ESC.

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Trạng thái hiển thị mở/đóng Confirm |
| `onClose` | `() => void` | `undefined` | Callback khi Confirm đóng (click backdrop, bấm ESC, bấm nút X) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích thước tổng thể của Confirm (truyền xuống context để đồng bộ kích thước cho Confirm, Header, Body, Footer) |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'warning'` | Chủ đề màu sắc tổng thể (truyền xuống context để đồng bộ cho Confirm, Header, Footer) |
| `isLoading` | `boolean` | `false` | Trạng thái đang tải/xử lý. Khi `true`, sẽ chặn đóng Confirm và tự động `disabled` các nút đóng |
| `closeOnOverlayClick` | `boolean` | `true` | Cho phép đóng Confirm khi click vào lớp nền backdrop bên ngoài (bị chặn khi `isLoading = true`) |
| `closeOnEsc` | `boolean` | `true` | Cho phép đóng Confirm khi nhấn phím `ESC` trên bàn phím (bị chặn khi `isLoading = true`) |
| `lockScroll` | `boolean` | `true` | Tự động khóa cuộn trang (`body overflow: hidden`) khi mở Confirm |
| `overlayClassName` | `string` | `""` | Class CSS tùy biến cho lớp nền backdrop mờ toàn màn hình |
| `className` | `string` | `""` | Class CSS cho container bao ngoài dialog |
| `children` | `ReactNode` | — | Nội dung bên trong container (thường là `<Confirm>`) |

---

### `<Confirm>`

Khung giao diện hộp thoại xác nhận (Pure Compound Dialog Box).

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | *Kế thừa từ ConfirmContainer* | Kích thước chiều rộng của hộp thoại |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'rounded-lg'` | Mức độ bo góc |
| `className` | `string` | `""` | Class CSS tùy biến cho hộp thoại |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref trỏ trực tiếp đến thẻ div hộp thoại |
| `children` | `ReactNode` | — | Các sub-component con (`<ConfirmHeader>`, `<ConfirmBody>`, `<ConfirmFooter>`) |

---

### `<ConfirmHeader>`

Phần đầu của hộp thoại Confirm (hiển thị icon badge, tiêu đề và nút đóng X).

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `title` | `ReactNode` | `undefined` | Tiêu đề chính của Confirm |
| `icon` | `ReactNode \| boolean` | `true` | Icon hiển thị cạnh tiêu đề (`true` để lấy theo màu, `false` để ẩn) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | *Kế thừa từ Context* | Kích thước áp dụng cho tiêu đề, icon và padding |
| `color` | `'primary' \| 'secondary' \| ...` | *Kế thừa từ Context* | Chủ đề màu sắc cho icon badge |
| `showCloseButton` | `boolean` | `false` | Hiển thị nút đóng `(X)` ở góc trên bên phải (tự động `disabled` khi `isLoading = true`) |
| `onClose` | `() => void` | `undefined` | Callback khi click nút `(X)` (tự động kích hoạt Exit Animation của ConfirmContainer) |
| `iconClassName` | `string` | `""` | Class CSS riêng cho container icon badge |
| `titleClassName` | `string` | `""` | Class CSS riêng cho text tiêu đề |
| `closeButtonClassName`| `string` | `""` | Class CSS tùy biến nút đóng `(X)` |
| `className` | `string` | `""` | Class CSS cho toàn bộ khối header |
| `children` | `ReactNode` | `undefined` | Nội dung tùy biến bên trong header |

---

### `<ConfirmBody>`

Phần thân chứa nội dung mô tả hoặc nội dung tùy biến của Confirm.

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `description` | `ReactNode` | `undefined` | Đoạn văn bản mô tả ngắn (tự động bọc trong thẻ `<p>` với typography chuẩn) |
| `descriptionClassName` | `string` | `""` | Class CSS riêng cho thẻ `<p>` mô tả |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | *Kế thừa từ Context* | Kích thước áp dụng cho cỡ chữ và padding |
| `className` | `string` | `""` | Class CSS cho toàn bộ khối body |
| `children` | `ReactNode` | `undefined` | Nội dung tùy biến bên trong body |

---

### `<ConfirmFooter>`

Phần chân chứa các nút hành động xác nhận và hủy.

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `confirmText` | `ReactNode` | `'Xác nhận'` | Nhãn nút Xác nhận |
| `cancelText` | `ReactNode \| false` | `'Hủy'` | Nhãn nút Hủy (`false` để ẩn nút Hủy) |
| `confirmVariant` | `ButtonVariant` | `'filled'` | Biến thể hiển thị của nút Xác nhận |
| `cancelVariant` | `ButtonVariant` | `'outline'` | Biến thể hiển thị của nút Hủy |
| `confirmColor` | `ButtonColor` | *Kế thừa theo `color`* | Màu nút Xác nhận |
| `cancelColor` | `ButtonColor` | `'secondary'` | Màu nút Hủy |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | *Kế thừa từ Context* | Kích thước áp dụng cho nút bấm và padding |
| `onConfirm` | `() => void \| Promise<unknown>` | `undefined` | Callback khi bấm nút Xác nhận (hỗ trợ hàm Async tự động bật Loading Spinner) |
| `onCancel` | `() => void` | `undefined` | Callback khi bấm nút Hủy |
| `onClose` | `() => void` | `undefined` | Callback khi đóng |
| `confirmButtonProps` | `Partial<ButtonProps>` | `undefined` | Props bổ sung truyền trực tiếp cho Button Xác nhận |
| `cancelButtonProps` | `Partial<ButtonProps>` | `undefined` | Props bổ sung truyền trực tiếp cho Button Hủy |
| `className` | `string` | `""` | Class CSS cho toàn bộ khối footer |
| `children` | `ReactNode` | `undefined` | Các nút bấm tùy chỉnh khi tự định nghĩa footer |

---

### `<ConfirmClose>`

Wrapper bọc quanh bất kỳ nút bấm hoặc phần tử nào bên trong Confirm. Khi click, `<ConfirmClose>` sẽ tự động kích hoạt hiệu ứng đóng mượt mà trước khi unmount (tự động `disabled` khi `isLoading = true`).

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Nút bấm hoặc phần tử con cần kích hoạt sự kiện đóng |
| `asChild` | `boolean` | `true` | Truyền thẳng sự kiện `onClick` và prop `disabled` vào phần tử con thay vì bọc ngoài bằng thẻ `div` |
