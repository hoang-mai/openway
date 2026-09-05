# 🖼️ UploadImage Component (`@openway/ui`)

Component tải lên hình ảnh chuyên nghiệp, hỗ trợ kéo thả (`drag-and-drop`), xem trước ảnh tức thời (`preview`), crop/cắt ảnh trực quan, hiển thị dạng danh sách hoặc lưới thẻ (`picture wall`), và tuân thủ các quy chuẩn **Design System** & **Accessibility**.

---

## 🌟 Điểm nổi bật

- **3 Chế độ hiển thị (`viewMode`)**:
  - `dropzone` *(mặc định)*: Khung kéo thả lớn với icon, tiêu đề và mô tả trực quan.
  - `card-grid`: Lưới thẻ ảnh dạng thumbnail vuông (picture wall), nút thêm ảnh hiển thị như 1 ô trong lưới.
  - `button`: Nút bấm kích hoạt mở hộp thoại chọn ảnh gọn gàng.
- **Tích hợp cắt ảnh linh hoạt (`enableCrop`)**:
  - Hỗ trợ modal crop ảnh trực quan (`react-easy-crop`) với tỷ lệ tùy biến (`cropAspectRatio`).
  - Hỗ trợ xoay, zoom và kiểm soát chất lượng ảnh sau crop.
- **Xem trước ảnh tiện lợi (`enablePreview`)**:
  - Tích hợp modal phóng to ảnh đầy đủ màn hình, xem chi tiết kích thước và tên tệp.
- **Kiểm soát dung lượng & Định dạng tệp**:
  - Giới hạn dung lượng tối đa (`maxSize`), tối thiểu (`minSize`).
  - Giới hạn số lượng tệp tải lên (`maxFiles`).
  - Tùy chỉnh danh sách định dạng ảnh cho phép (`accept`, ví dụ: `image/jpeg`, `image/png`, `image/webp`).
- **Phản hồi lỗi & Trạng thái tải trực quan**:
  - Báo lỗi tự động khi vượt quá dung lượng hoặc sai loại tệp.
  - Thanh tiến trình tải lên (`progress`) và hiệu ứng hover sinh động.

---

## 🚀 Cài đặt & Import

```tsx
import { UploadImage } from "@openway/ui";
import type { UploadImageProps, UploadImageFileItem } from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. UploadImage cơ bản dạng Dropzone

```tsx
import { useState } from "react";
import { UploadImage, UploadImageFileItem } from "@openway/ui";

export function BasicUploadImageExample() {
  const [files, setFiles] = useState<UploadImageFileItem[]>([]);

  return (
    <div className="max-w-md">
      <UploadImage
        label="Ảnh đại diện bài viết"
        value={files}
        onChange={(newFiles) => setFiles(newFiles)}
        maxFiles={1}
        maxSize={5 * 1024 * 1024} // 5MB
        helperText="Định dạng PNG, JPG, WEBP tối đa 5MB"
      />
    </div>
  );
}
```

---

### 2. Dạng Lưới thẻ (Picture Wall - `card-grid`)

Thích hợp cho tải album ảnh sản phẩm hoặc thư viện ảnh:

```tsx
import { useState } from "react";
import { UploadImage, UploadImageFileItem } from "@openway/ui";

export function PictureWallExample() {
  const [gallery, setGallery] = useState<UploadImageFileItem[]>([]);

  return (
    <div className="max-w-xl">
      <UploadImage
        viewMode="card-grid"
        shape="square"
        maxFiles={8}
        value={gallery}
        onChange={(newFiles) => setGallery(newFiles)}
        label="Bộ sưu tập ảnh sản phẩm"
        enablePreview
      />
    </div>
  );
}
```

---

### 3. Kích hoạt tính năng Crop ảnh (`enableCrop`)

```tsx
<UploadImage
  label="Tải ảnh bìa (Tỷ lệ 16:9)"
  maxFiles={1}
  enableCrop
  cropAspectRatio={16 / 9}
  value={files}
  onChange={setFiles}
/>
```

---

## 🎛️ Bảng Props Chi tiết

| Tên Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `value` | `UploadImageFileItem[]` | `[]` | Danh sách tệp ảnh hiện tại. |
| `onChange` | `(files: UploadImageFileItem[]) => void` | `undefined` | Callback khi danh sách ảnh thay đổi (thêm, xóa, crop). |
| `viewMode` | `"dropzone" \| "card-grid" \| "button"` | `"dropzone"` | Kiểu giao diện tải ảnh. |
| `shape` | `"rectangle" \| "square"` | `"rectangle"` | Hình dạng khung hiển thị ảnh. |
| `maxFiles` | `number` | `1` | Số lượng tệp ảnh tối đa được phép tải. |
| `maxSize` | `number` | `10 * 1024 * 1024` | Kích thước tối đa mỗi tệp (bytes). |
| `accept` | `Record<string, string[]>` | Ảnh thông dụng | Đối tượng định dạng MIME types cho phép. |
| `enableCrop` | `boolean` | `false` | Mở hộp thoại crop ảnh trước khi thêm vào danh sách. |
| `cropAspectRatio` | `number` | `1` | Tỷ lệ khung hình khi crop (ví dụ: `1` cho ảnh vuông, `16/9` cho banner). |
| `enablePreview` | `boolean` | `true` | Cho phép nhấn vào ảnh để mở modal xem ảnh kích thước lớn. |
| `disabled` | `boolean` | `false` | Khóa chức năng tải ảnh. |
| `color` | `ThemeColor` | `"primary"` | Chủ đề màu sắc theo Design System. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Kích thước khung tải ảnh. |
| `radius` | `Radius` | `"md"` | Độ bo góc của khung tải và thumbnail. |
