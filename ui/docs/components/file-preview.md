# 📁 File Preview Components (`@openway/ui`)

Bộ component xem trước tệp tin hiệu năng cao, xây dựng trên nền tảng **HTML5 Native `<dialog>`** và kiến trúc **React Context + Compound Component**:

- **`<FileContainer>`**: Hộp thoại bọc ngoài Modal dialog quản lý Backdrop, Top layer breakout, ESC, Lock scroll và Header. Nhận prop `file` và chia sẻ `file` cùng `headerTitle` xuống dưới thông qua `FileContext`.
- **`<FilePreview>`**: Component xác định loại tệp (`image`, `pdf`, `video`, `audio`, `document`, `other`) và chuyển tiếp tới component hiển thị tương ứng. Tự động tiêu thụ `file` và `headerTitle` từ `useFileContext()`.
- **`<ImagePreview>`**: Khối hiển thị hình ảnh với đầy đủ tính năng Zoom, Rotate, Flip, Drag-to-pan, Reset và Tải ảnh.

---

## 🌟 Điểm nổi bật

- **Zero Global Store**: Hoàn toàn không phụ thuộc Zustand / Redux.
- **Context-driven Compound Architecture**:
  - `FileContainer` nhận `file` (và tùy chọn `title`) rồi cung cấp qua `FileContext`.
  - `FilePreview` tự động nhận `file` và `headerTitle` từ `useFileContext()`.
- **Lồng ghép linh hoạt**:
  ```tsx
  <FileContainer open={open} onClose={handleClose} file={selectedFile}>
    <FilePreview imageProps={{ minZoom: 0.5, maxZoom: 3 }} />
  </FileContainer>
  ```
- **Tự động quản lý bộ nhớ**: Tự động giải phóng `ObjectURL` (`URL.revokeObjectURL`) khi truyền `File` object để tránh memory leak.

---

## 🚀 Cài đặt & Import

```tsx
import {
  FileContainer,
  FilePreview,
  ImagePreview,
  ImagePreviewToolbar,
  FileContext,
  useFileContext,
  getFileName,
  getFileType,
  getFileExtension,
  normalizePreviewFile,
  downloadFile,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Sử dụng kết hợp qua Context (Khuyên dùng)

```tsx
import { useState } from "react";
import { Button, FileContainer, FilePreview } from "@openway/ui";

export function Example() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Xem file</Button>

      <FileContainer
        open={open}
        onClose={() => setOpen(false)}
        file={file}
      >
        <FilePreview
          imageProps={{
            minZoom: 0.5,
            maxZoom: 4,
            toolbarProps: {
              tools: { rotate: true, flip: true, download: true },
            },
          }}
        />
      </FileContainer>
    </div>
  );
}
```

---

### 2. Sử dụng gọn nhẹ (Tự động render `<FilePreview />`)

```tsx
<FileContainer
  open={open}
  onClose={() => setOpen(false)}
  file={selectedFile}
/>
```

---

### 3. Sử dụng bọc trực tiếp `<ImagePreview>`

```tsx
<FileContainer open={open} onClose={() => setOpen(false)} title="Xem ảnh">
  <ImagePreview src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675" name="artwork.jpg" />
</FileContainer>
```

---

## 📚 Bảng tra cứu Props (API Reference)

### `<FileContainer>` (Hộp thoại Modal)

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Trạng thái hiển thị mở/đóng FileContainer |
| `onClose` | `() => void` | `undefined` | Callback khi đóng hộp thoại |
| `file` | `File \| ServerFile` | `undefined` | Dữ liệu file truyền vào để chia sẻ qua Context |
| `title` | `ReactNode` | `undefined` | Tiêu đề tùy chỉnh cho phần header (mặc định lấy tên file) |
| `description` | `ReactNode` | `undefined` | Đoạn văn bản mô tả phụ bên dưới tiêu đề header |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` | Kích thước chiều rộng của hộp thoại Modal |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'xl'` | Mức độ bo góc của hộp thoại Modal |
| `showCloseButton` | `boolean` | `true` | Hiển thị nút đóng (X) ở header |
| `closeOnOverlayClick` | `boolean` | `true` | Cho phép đóng khi click ra ngoài backdrop |
| `closeOnEsc` | `boolean` | `true` | Cho phép đóng khi nhấn phím ESC |
| `lockScroll` | `boolean` | `true` | Khóa cuộn trang khi đang hiển thị |
| `className` | `string` | `""` | Class CSS tùy biến cho hộp thoại |
| `overlayClassName`| `string` | `""` | Class CSS tùy biến cho backdrop |
| `children` | `ReactNode` | `undefined` | Nội dung bên trong (mặc định tự động render `<FilePreview />`) |

---

### `<FilePreview>` (Xác định loại file & Điều hướng Viewer)

> **Lưu ý**: `<FilePreview>` tự động lấy `file` và `headerTitle` từ `FileContainer` thông qua `useFileContext()`.

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `onDownload` | `(file: PreviewFile) => void` | `undefined` | Callback tùy biến khi bấm nút tải file xuống |
| `imageProps` | `Partial<ImagePreviewProps>` | `undefined` | Cấu hình chi tiết cho phần hiển thị ảnh (`minZoom`, `maxZoom`, `toolbarProps`, ...) |
| `className` | `string` | `""` | Class CSS tùy biến cho container nội dung |

---

### `<ImagePreview>` (Hiển thị và tương tác ảnh)

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `src` | `string` | **Bắt buộc** | Đường dẫn ảnh hoặc data URL |
| `name` | `string` | `undefined` | Tên file ảnh hiển thị khi tải xuống |
| `alt` | `string` | `undefined` | Thẻ alt mô tả cho ảnh |
| `minZoom` | `number` | `0.2` | Mức độ thu nhỏ tối thiểu (20%) |
| `maxZoom` | `number` | `5` | Mức độ phóng to tối đa (500%) |
| `showToolbar` | `boolean` | `true` | Hiển thị thanh công cụ điều khiển phía dưới |
| `toolbarProps` | `Partial<ImagePreviewToolbarProps>` | `undefined` | Cấu hình chi tiết các nút bấm trên toolbar (`tools`) |
| `className` | `string` | `""` | Class CSS tùy biến cho container bao ngoài |
| `children` | `ReactNode` | `undefined` | Phần tử React con bổ sung |

### `<ImagePreviewToolbar>` (Thanh công cụ điều khiển ảnh)

| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `zoom` | `number` | `1` | Mức độ phóng to hiện tại |
| `minZoom` | `number` | `0.2` | Mức thu nhỏ tối thiểu |
| `maxZoom` | `number` | `5` | Mức phóng to tối đa |
| `step` | `number` | `0.05` | Bước nhảy zoom khi kéo thanh trượt Slider |
| `onZoomChange` | `(zoom: number) => void` | `undefined` | Callback khi zoom thay đổi qua Slider |
| `sliderProps` | `Partial<SliderProps>` | `undefined` | Tùy biến props cho component Slider bên trong |
| `tools` | `ToolbarToolsConfig` | `{}` | Cấu hình bật/tắt các nút và công cụ |

---

### `ToolbarToolsConfig` (Cấu hình nút trên thanh công cụ)

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `zoomIn` | `boolean` | `true` | Nút phóng to (+) |
| `zoomOut` | `boolean` | `true` | Nút thu nhỏ (-) |
| `zoomSlider` | `boolean` | `true` | Thanh trượt Slider điều chỉnh zoom trực tiếp |
| `reset` | `boolean` | `true` | Nút hiển thị % và reset tỉ lệ (1:1) |
| `rotate` | `boolean` | `true` | Cặp nút xoay ảnh theo & ngược chiều kim đồng hồ |
| `flip` | `boolean` | `true` | Nút lật ảnh theo chiều ngang |
| `download` | `boolean` | `true` | Nút tải ảnh xuống máy tính |
