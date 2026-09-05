# 📦 Modal Component (`@owa/ui`)

Bộ component **Modal** hiệu năng cao, chuẩn **HTML5 Native `<dialog>`** và thiết kế theo mô hình **Pure Compound Pattern** linh hoạt.

---

## 🌟 Điểm nổi bật

- **Native Top Layer**: Sử dụng thẻ `<dialog>` kết hợp phương thức `dialog.showModal()` của trình duyệt. Modal tự động nổi lên tầng cao nhất (`#top-layer`), không bao giờ bị cắt xén bởi phần tử cha có `overflow: hidden`, `overflow: auto` hay xung đột `z-index`.
- **Zero Global Store**: Loại bỏ hoàn toàn Zustand / Redux / React Portal. Bạn có thể render Modal ở bất kỳ đâu trong cây JSX.
- **Mượt mà với Exit Animation**: Tích hợp sẵn hiệu ứng mở và thoát (**Exit Animation 250ms**) cho cả hộp thoại lẫn nền mờ backdrop.
- **Pure Compound Architecture**: Tách rời hoàn toàn giữa tầng Container (`<ModalContainer>`) và tầng giao diện (`<Modal>`, `<ModalHeader>`, `<ModalBody>`, `<ModalFooter>`, `<ModalClose>`).
- **Tự động liên kết Context**: Nút đóng `(X)` trong `<ModalHeader>` và component `<ModalClose>` tự động kích hoạt đóng kèm Exit Animation mà không cần truyền lặp lại state `open/onClose`.
- **Hỗ trợ Loading an toàn (`isLoading`)**: Tự động khóa đóng modal (chặn click backdrop, chặn ESC, tự động disable nút đóng và nút bọc `<ModalClose>`) khi đang trong tiến trình xử lý API/tải dữ liệu.
- **Hỗ trợ đầy đủ Accessibility (a11y)**: Tự động khóa cuộn trang (`body scroll lock`), bắt phím `ESC`, focus trap của trình duyệt, liên kết `aria-labelledby` và `aria-describedby`.

---

## 🚀 Cài đặt & Import

```tsx
import {
  ModalContainer,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
  useModalContext,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản (Basic Modal)

```tsx
import { useState } from "react";
import {
  Button,
  ModalContainer,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@owa/ui";

export function BasicModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Mở Modal</Button>

      <ModalContainer open={open} onClose={() => setOpen(false)}>
        <Modal size="md" radius="xl">
          <ModalHeader
            title="Xác nhận cập nhật"
            description="Vui lòng kiểm tra lại thông tin trước khi tiếp tục."
          />
          <ModalBody>
            <p className="text-sm text-neutral-600">
              Hệ thống sẽ lưu các thay đổi của bạn vào cơ sở dữ liệu.
            </p>
          </ModalBody>
          <ModalFooter>
            <ModalClose>
              <Button variant="outline">Hủy bỏ</Button>
            </ModalClose>
            <ModalClose>
              <Button color="primary">Đồng ý</Button>
            </ModalClose>
          </ModalFooter>
        </Modal>
      </ModalContainer>
    </div>
  );
}
```

---

### 2. Form nhập liệu phức tạp & Xử lý Loading (`isLoading`)

Khi submit form và gọi API bất đồng bộ, chỉ cần truyền prop `isLoading={loading}` vào `<ModalContainer>`. Hệ thống sẽ tự động:
- Chặn người dùng đóng Modal khi bấm phím `ESC` hoặc click ra ngoài vùng nền mờ `backdrop`.
- Tự động `disabled` nút đóng `(X)` ở Header và nút bọc bên trong `<ModalClose>`.

```tsx
export function CreateUserModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Gọi API lưu dữ liệu
      await apiCreateUser();
      onSuccess?.();
      // 2. Đóng modal sau khi hoàn thành
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContainer open={open} isLoading={loading} onClose={onClose}>
      <Modal size="lg">
        <ModalHeader
          title="Tạo người dùng mới"
          description="Điền thông tin chi tiết của thành viên mới"
        />
        <form onSubmit={handleSubmit}>
          <ModalBody className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Họ và tên</label>
              <input required className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" required className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
          </ModalBody>
          <ModalFooter>
            {/* Tự động disabled khi isLoading = true */}
            <ModalClose>
              <Button variant="outline" type="button">Hủy</Button>
            </ModalClose>
            <Button color="primary" type="submit" loading={loading}>
              Lưu thành viên
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </ModalContainer>
  );
}
```

---

### 3. Đóng Modal lập trình qua Hook (`useModalContext`)

Nếu cần thực hiện logic bất đồng bộ (validate, fetch) trong các component con nằm sâu bên trong Modal:

```tsx
import { useModalContext, Button } from "@owa/ui";

function CustomAction() {
  const { onClose, isLoading } = useModalContext();

  const handleSaveAndClose = async () => {
    await saveApi();
    onClose?.(); // Kích hoạt animation thoát 250ms của ModalContainer
  };

  return (
    <Button onClick={handleSaveAndClose} disabled={isLoading}>
      Lưu và Đóng
    </Button>
  );
}
```

---

### 4. Tùy biến kích thước (`size`) & Bo góc (`radius`)

Modal hỗ trợ 6 kích thước chiều rộng và 6 mức độ bo góc. Bạn có thể truyền `size` trực tiếp vào `<ModalContainer size="lg">` để tự động đồng bộ kích thước xuống toàn bộ các component con (`Modal`, `ModalHeader`, `ModalBody`, `ModalFooter`):

> **Độ ưu tiên kích thước:** `Prop truyền trực tiếp vào component con` > `Prop size từ ModalContainer qua Context` > `Mặc định ("md")`.

```tsx
// Đồng bộ toàn bộ Modal, Header, Body, Footer thành kích thước "lg"
<ModalContainer open={open} size="lg" onClose={() => setOpen(false)}>
  <Modal radius="full">
    <ModalHeader title="Modal Kích Thước Lớn (LG)" />
    <ModalBody>...</ModalBody>
    <ModalFooter>...</ModalFooter>
  </Modal>
</ModalContainer>
```

| Kích thước (`size`) | Chiều rộng (`max-w`) | Mục đích sử dụng |
| :--- | :--- | :--- |
| `xs` | `320px` | Thông báo ngắn gọn, prompt đơn giản |
| `sm` | `400px` | Hộp thoại xác nhận, form 1-2 trường nhập |
| `md` *(mặc định)* | `540px` | Form nhập liệu tiêu chuẩn |
| `lg` | `720px` | Form nhiều cột, cắt ảnh (avatar crop) |
| `xl` | `960px` | Xem tài liệu, bảng dữ liệu biểu mẫu |
| `full` | `100vw` | Trải nghiệm toàn màn hình |

---

## 📚 Bảng tra cứu Props (API Reference)

### `<ModalContainer>`

Tầng Wrapper quản lý Overlay Backdrop, Native Dialog, Animation thoát và phím ESC.

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Trạng thái hiển thị mở/đóng Modal |
| `onClose` | `() => void` | `undefined` | Callback khi Modal đóng (click backdrop, bấm ESC, bấm nút X) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Kích thước tổng thể đồng bộ xuống Context cho `Modal`, `ModalHeader`, `ModalBody`, `ModalFooter` |
| `isLoading` | `boolean` | `false` | Trạng thái đang tải/xử lý. Khi `true`, sẽ chặn đóng Modal (qua click backdrop, phím ESC, nút X, `<ModalClose>`) và tự động `disabled` các nút đóng |
| `closeOnOverlayClick` | `boolean` | `true` | Cho phép đóng Modal khi click vào lớp nền backdrop bên ngoài (bị chặn khi `isLoading = true`) |
| `closeOnEsc` | `boolean` | `true` | Cho phép đóng Modal khi nhấn phím `ESC` trên bàn phím (bị chặn khi `isLoading = true`) |
| `lockScroll` | `boolean` | `true` | Tự động khóa cuộn trang (`body overflow: hidden`) khi mở Modal |
| `overlayClassName` | `string` | `""` | Class CSS tùy biến cho lớp nền backdrop mờ toàn màn hình |
| `className` | `string` | `""` | Class CSS cho container bao ngoài dialog |
| `children` | `ReactNode` | — | Nội dung bên trong container (thường là `<Modal>`) |

---

### `<Modal>`

Khung giao diện hộp thoại (Dialog Box).

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Kích thước chiều rộng của hộp thoại |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'rounded-lg'` | Mức độ bo góc của hộp thoại |
| `className` | `string` | `""` | Class CSS tùy biến cho hộp thoại |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref trỏ trực tiếp đến thẻ div hộp thoại |
| `children` | `ReactNode` | — | Các component con (`<ModalHeader>`, `<ModalBody>`, `<ModalFooter>`) |

---

### `<ModalHeader>`

Phần đầu của hộp thoại Modal.

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `title` | `ReactNode` | `undefined` | Tiêu đề chính của Modal |
| `description` | `ReactNode` | `undefined` | Đoạn văn bản mô tả phụ bên dưới tiêu đề |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Kích thước áp dụng cho tiêu đề và padding |
| `showCloseButton` | `boolean` | `true` | Hiển thị nút đóng `(X)` ở góc trên bên phải (tự động `disabled` khi `isLoading = true`) |
| `onClose` | `() => void` | `undefined` | Callback tùy biến khi click nút `(X)` (vẫn luôn chạy kèm animation thoát của ModalContainer) |
| `titleClassName` | `string` | `""` | Class CSS riêng cho text tiêu đề |
| `descriptionClassName`| `string` | `""` | Class CSS riêng cho text mô tả |
| `closeButtonClassName`| `string` | `""` | Class CSS tùy biến nút đóng `(X)` |
| `className` | `string` | `""` | Class CSS cho toàn bộ khối header |

---

### `<ModalBody>`

Phần thân chứa nội dung chính (tự động bật thanh cuộn dọc khi nội dung dài).

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Kích thước padding và font size (tự động kế thừa từ ModalContainer) |
| `className` | `string` | `""` | Class CSS tùy biến cho khối body |
| `children` | `ReactNode` | — | Nội dung form, bảng biểu, danh sách... |

---

### `<ModalFooter>`

Phần chân trang chứa các nút hành động xác nhận hoặc hủy.

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Kích thước padding và khoảng cách gap giữa các nút |
| `className` | `string` | `""` | Class CSS cho toàn bộ khối footer |
| `children` | `ReactNode` | — | Các nút bấm (`<Button>`, `<ModalClose>`) |

---

### `<ModalClose>`

Wrapper bọc quanh bất kỳ nút bấm hoặc phần tử nào bên trong Modal (ví dụ: nút Hủy bỏ trong Footer). Khi click, `<ModalClose>` sẽ tự động kích hoạt hiệu ứng đóng mượt mà (**Exit Animation 250ms**) trước khi unmount (tự động `disabled` khi `isLoading = true`).

```tsx
<ModalFooter>
  {/* asChild=true (mặc định) sẽ ghép thẳng sự kiện vào Button mà không sinh thêm thẻ div thừa */}
  <ModalClose>
    <Button variant="outline">Hủy bỏ</Button>
  </ModalClose>
  <Button color="primary" onClick={handleSave}>Lưu thay đổi</Button>
</ModalFooter>
```

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Nút bấm hoặc phần tử con cần kích hoạt sự kiện đóng |
| `asChild` | `boolean` | `true` | Truyền thẳng sự kiện `onClick` và prop `disabled` vào phần tử con thay vì bọc ngoài bằng thẻ `div` |
