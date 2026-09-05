# 📭 Empty Component (`@openway/ui`)

Component **Empty** (Trạng thái rỗng) hiển thị khi một danh sách, bảng dữ liệu, tìm kiếm hoặc trang web không có dữ liệu để hiển thị. Được thiết kế chuẩn **Design System**, hỗ trợ đa dạng **Preset Illustrations**, tùy biến **Hình ảnh/Icon/URL**, căn chỉnh bố cục **Vertical / Horizontal**, tích hợp **Safe Config Fallback** (`getSafeConfig`) và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **5 Preset Illustrations tích hợp sẵn**:
  - `default`: Minh họa hộp dữ liệu rỗng tiêu chuẩn.
  - `search`: Kính lúp không tìm thấy kết quả.
  - `error`: Lỗi tải dữ liệu hoặc mất kết nối mạng.
  - `folder`: Thư mục rỗng.
  - `simple`: Minh họa tối giản, gọn nhẹ.
- **Hỗ trợ đa dạng nguồn ảnh (`image`)**:
  - Tên preset (`default`, `search`, `error`, `folder`, `simple`).
  - Đường dẫn URL ảnh (tự động render qua `next/image` với tối ưu hóa hình ảnh).
  - Custom JSX (`ReactNode`) như SVG Icon, Emoji hoặc component tùy biến.
- **3 Kích thước tiêu chuẩn (`size`)**:
  - `sm`: Gọn nhẹ, thích hợp cho dropdown, popover, select menu, bảng nhỏ.
  - `md` *(mặc định)*: Tiêu chuẩn, thích hợp cho section, thẻ card, modal dialog.
  - `lg`: Kích thước lớn, thích hợp cho trang dashboard hoặc toàn màn hình.
- **2 Bố cục hiển thị (`layout`)**:
  - `vertical` *(mặc định)*: Xếp dọc từ trên xuống (Ảnh -> Tiêu đề -> Mô tả -> Actions).
  - `horizontal`: Bố cục hàng ngang (Ảnh bên trái, nội dung & actions bên phải), tối ưu khi diện tích theo chiều ngang rộng rãi.
- **Khu vực hành động linh hoạt (`actions`)**: Cung cấp slot chuyên biệt để chèn Button (Tạo mới, Thử lại, Tải lại...).
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` từ `@/utils/function` đảm bảo an toàn tuyệt đối, không crash giao diện khi nhận giá trị `size` hoặc `layout` không hợp lệ.
- **Trợ năng (Accessibility)**: Tự động gắn `role="status"` và `aria-live="polite"` giúp các trình đọc màn hình (Screen Reader) thông báo trạng thái rỗng một cách rõ ràng.

---

## 🚀 Cài đặt & Import

```tsx
import { Empty, EmptyIllustration } from "@openway/ui";
import type { EmptyProps, EmptySize, EmptyLayout, EmptyPresetImage } from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Trạng thái rỗng cơ bản

```tsx
import { Empty } from "@openway/ui";

export function BasicEmptyExample() {
  return (
    <Empty
      title="Không có dữ liệu"
      description="Hiện tại chưa có dữ liệu nào trong danh sách này."
    />
  );
}
```

---

### 2. Các Presets minh họa (`image`)

```tsx
import { Empty } from "@openway/ui";

export function PresetExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Tìm kiếm không thấy */}
      <Empty
        image="search"
        title="Không tìm thấy kết quả"
        description="Vui lòng thử lại với từ khóa khác."
      />

      {/* Lỗi kết nối */}
      <Empty
        image="error"
        title="Tải thất bại"
        description="Không thể kết nối đến máy chủ. Vui lòng thử lại."
      />

      {/* Thư mục rỗng */}
      <Empty
        image="folder"
        title="Thư mục trống"
        description="Chưa có tệp tin nào được tải lên thư mục này."
      />
    </div>
  );
}
```

---

### 3. Tùy chỉnh kích thước (`size`) & Kèm nút hành động (`actions`)

```tsx
import { Empty, Button } from "@openway/ui";

export function ActionsExample() {
  return (
    <Empty
      size="md"
      image="default"
      title="Chưa có dự án nào"
      description="Hãy bắt đầu khởi tạo dự án đầu tiên của bạn để quản lý công việc hiệu quả."
      actions={
        <Button variant="filled" color="primary" onClick={() => console.log("Tạo mới")}>
          Tạo dự án mới
        </Button>
      }
    />
  );
}
```

---

### 4. Bố cục ngang (`layout="horizontal"`)

```tsx
import { Empty, Button } from "@openway/ui";

export function HorizontalEmptyExample() {
  return (
    <div className="border rounded-xl p-4">
      <Empty
        layout="horizontal"
        size="sm"
        image="folder"
        title="Không tìm thấy tệp tin"
        description="Thư mục hiện đang trống hoặc bạn không có quyền truy cập."
        actions={
          <Button size="xs" variant="outline" color="primary">
            Tải tệp lên
          </Button>
        }
      />
    </div>
  );
}
```

---

### 5. Dùng URL ảnh ngoài hoặc Custom ReactNode

```tsx
import { Empty } from "@openway/ui";

export function CustomImageExample() {
  return (
    <Empty
      image="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=160&auto=format&fit=crop&q=60"
      imageSize={120}
      imageAlt="Custom Image"
      title="Bộ sưu tập ảnh trống"
      description="Hãy thêm các bức ảnh yêu thích của bạn."
    />
  );
}
```

---

## 🛡️ Safe Config Fallback

Component `Empty` tích hợp hàm tiện ích `getSafeConfig` từ `@/utils/function`:

```tsx
import { getSafeConfig } from "@/utils/function";

const currentSize = getSafeConfig(size, emptySizeConfig, "md");
const currentLayout = getSafeConfig(layout, emptyLayoutConfig, "vertical");
```

- Nếu `size` truyền vào không thuộc `"sm" | "md" | "lg"`, component tự động fallback về kích cỡ chuẩn `"md"`.
- Nếu `layout` truyền vào không hợp lệ, component tự động fallback về bố cục chuẩn `"vertical"`.
- Giúp ứng dụng hoạt động ổn định, loại bỏ hoàn toàn nguy cơ runtime error / crash giao diện khi nhận dữ liệu không mong muốn từ bên ngoài.

---

## 📋 Danh sách Props (`EmptyProps`)

| Tên Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Kích cỡ tổng thể của component |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Bố cục xếp dọc hoặc dàn ngang |
| `image` | `EmptyPresetImage \| string \| ReactNode` | `'default'` | Preset minh họa, URL ảnh hoặc JSX node tùy biến |
| `imageSize` | `number \| string` | Theo `size` | Chiều rộng & chiều cao tùy chỉnh cho phần ảnh |
| `imageClassName`| `string` | `""` | Class CSS cho thẻ bao ngoài ảnh |
| `imageAlt` | `string` | `'Trống'` | Thuộc tính alt cho hình ảnh |
| `title` | `ReactNode` | `undefined` | Tiêu đề trạng thái rỗng |
| `titleClassName`| `string` | `""` | Class CSS tùy chỉnh tiêu đề |
| `description` | `ReactNode` | `'Không có dữ liệu'` | Nội dung mô tả chi tiết |
| `descriptionClassName` | `string` | `""` | Class CSS tùy chỉnh mô tả |
| `actions` | `ReactNode` | `undefined` | Khu vực chứa nút bấm hành động (CTA) |
| `actionsClassName` | `string` | `""` | Class CSS tùy chỉnh khu vực actions |
| `children` | `ReactNode` | `undefined` | Nội dung bổ sung tùy biến |
| `ref` | `Ref<HTMLDivElement>` | `undefined` | Ref chuyển tiếp đến container chính |
