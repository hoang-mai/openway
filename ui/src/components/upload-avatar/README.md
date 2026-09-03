# 👤 Upload Avatar Component Suite (`@owa/ui`)

Component **UploadAvatar** toàn diện, linh hoạt và tương tác cao cho phép người dùng tải lên, kéo thả (Drag & Drop), cắt xén (Crop), xem trước (Lightbox Preview) và quản lý ảnh đại diện. Thiết kế đồng bộ hoàn hảo với hệ thống **Design System**, hỗ trợ **Safe Config Fallback**, **Quản lý bộ nhớ tự động (Lifecycle Cleanup)** và tuân thủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Tích hợp quy trình xử lý ảnh trọn gói**:
  - 🖱️ **Kéo thả & Chọn tệp**: Hỗ trợ kéo thả ảnh trực quan nhờ `react-dropzone`, tự động kiểm tra định dạng MIME (`accept`) và giới hạn dung lượng (`maxSize`).
  - ✂️ **Cắt xén ảnh tích hợp (`UploadAvatarCropModal`)**: Tích hợp sẵn modal cắt ảnh trực quan hỗ trợ Zoom, Xoay (Rotate 90°), Lật ảnh (Flip), Reset và Chọn tệp khác ngay trong modal.
  - 🔍 **Xem trước phóng to (Lightbox Preview)**: Tích hợp với `<FileContainer>` và `<FilePreview>` để phóng to, xoay ảnh và tải xuống ảnh chất lượng gốc.
  - 🗑️ **Xóa nhanh & Thao tác tiện lợi**: Menu hành động hiển thị mượt mà khi hover (hoặc focus) cho phép Xem trước, Cắt lại và Xóa ảnh.
- **Quản lý bộ nhớ tối ưu (Zero Memory Leak)**:
  - Ứng dụng mô hình **Lifecycle Cleanup**: Tự động giải phóng Blob URL (`URL.revokeObjectURL`) bên trong `useEffect cleanup` khi đóng modal, đổi ảnh hoặc khi component unmount.
- **5 Kích thước tiêu chuẩn (`size`)**:
  - `xs`: 48x48px (`size-12`)
  - `sm`: 64x64px (`size-16`)
  - `md`: 80x80px (`size-20` - *mặc định*)
  - `lg`: 96x96px (`size-24`)
  - `xl`: 128x128px (`size-32`)
- **3 Biến thể giao diện (`variant`)**:
  - `outline` *(mặc định)*: Viền nét rõ ràng quanh khung avatar, hover/focus đổi màu viền chủ đề.
  - `filled`: Nền pastel nhạt (`bg-{color}-50/60`), viền đồng điệu.
  - `ghost`: Nền trong suốt, viền mờ tối giản.
  - `other`: Bỏ qua các style mặc định, tự do tùy biến qua `avatarClassName`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
- **2 Hình dạng linh hoạt (`shape`)**:
  - `circle` *(mặc định)*: Hình tròn hoàn hảo (`rounded-full`).
  - `square`: Hình vuông với tùy chọn bo góc `radius` (`none`, `sm`, `md`, `lg`, `xl`, `full`).
- **Icon Avatar mặc định tinh tế**: Sử dụng silhouette `<AvatarIcon />` sắc nét làm icon giữ chỗ (placeholder) thay thế cho icon đám mây truyền thống.
- **Đồng bộ cấu hình Form & A11y như `Input`**:
  - Nhóm các cờ boolean vào prop `config`: `isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `isClearable`, `isFullWidth`.
  - Hỗ trợ `labelPlacement` (`top` hoặc `left`) cùng văn bản trợ giúp `helperText` và thông báo lỗi `errorMessage`.
  - Tương thích bàn phím: <kbd>Space</kbd> / <kbd>Enter</kbd> để chọn ảnh, <kbd>Delete</kbd> / <kbd>Backspace</kbd> để xóa ảnh.
  - Hỗ trợ Screen Reader với vùng thông báo động `aria-live`.

---

## 🚀 Cài đặt & Import

```tsx
import {
  UploadAvatar,
  UploadAvatarCropModal,
  UploadAvatarCropContent,
  getCroppedImage,
  createImage,
  rotateSize,
} from "@owa/ui";

import type {
  UploadAvatarProps,
  UploadAvatarConfig,
  UploadAvatarCropOptions,
  UploadAvatarCropModalProps,
  UploadAvatarCropContentProps,
  UploadAvatarSize,
  UploadAvatarVariant,
  UploadAvatarColor,
  UploadAvatarShape,
  UploadAvatarRadius,
  UploadAvatarLabelPlacement,
  PreviewFile,
  ServerFile,
  PixelCrop,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Sử dụng cơ bản (Uncontrolled & Controlled)

#### Cách 1: Tự quản lý (Uncontrolled với `defaultValue`)
```tsx
import { UploadAvatar } from "@owa/ui";

export function UncontrolledExample() {
  return (
    <UploadAvatar
      defaultValue="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"
      label="Ảnh đại diện"
      helperText="Hỗ trợ JPG, PNG, WEBP dưới 5MB"
      onChange={(item) => console.log("Avatar changed:", item)}
    />
  );
}
```

#### Cách 2: Quản lý trạng thái (Controlled với `value`)
```tsx
import { useState } from "react";
import { UploadAvatar, PreviewFile } from "@owa/ui";

export function ControlledExample() {
  const [avatar, setAvatar] = useState<PreviewFile | string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <UploadAvatar
        value={avatar}
        onChange={setAvatar}
        label="Ảnh đại diện hồ sơ"
        helperText="Click để tải ảnh lên và cắt xén"
      />
      <p className="text-xs text-neutral-500">
        Đã chọn: {avatar ? (typeof avatar === "string" ? avatar : avatar.name) : "Chưa có ảnh"}
      </p>
    </div>
  );
}
```

---

### 2. Tùy chỉnh tính năng Cắt ảnh (`crop`)

Bạn có thể cấu hình modal cắt ảnh chi tiết hoặc tắt hoàn toàn tính năng này:

```tsx
import { UploadAvatar } from "@owa/ui";

// 1. Tùy chỉnh modal cắt ảnh
<UploadAvatar
  crop={{
    aspectRatio: 1, // Tỷ lệ 1:1
    cropShape: "round", // Vùng cắt tròn "round" hoặc vuông "rect"
    showGrid: true, // Hiển thị lưới căn chỉnh
    minZoom: 1,
    maxZoom: 5,
    modalTitle: "Tùy chỉnh góc chụp ảnh đại diện",
  }}
/>

// 2. Tắt hoàn toàn modal cắt ảnh (Nhận file trực tiếp sau khi chọn)
<UploadAvatar crop={false} />
```

---

### 3. Kích thước (`size`) & Hình dạng (`shape`)

```tsx
import { UploadAvatar } from "@owa/ui";

export function SizesAndShapesExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Các kích thước */}
      <UploadAvatar size="xs" label="XS (48px)" />
      <UploadAvatar size="sm" label="SM (64px)" />
      <UploadAvatar size="md" label="MD (80px)" />
      <UploadAvatar size="lg" label="LG (96px)" />
      <UploadAvatar size="xl" label="XL (128px)" />

      {/* Hình vuông bo góc */}
      <UploadAvatar
        shape="square"
        radius="lg"
        size="lg"
        crop={{ cropShape: "rect" }}
        label="Logo công ty"
      />
    </div>
  );
}
```

---

### 4. Biến thể (`variant`) & Màu sắc (`color`)

```tsx
import { UploadAvatar } from "@owa/ui";

export function VariantsAndColorsExample() {
  return (
    <div className="flex gap-6">
      <UploadAvatar variant="outline" color="primary" label="Outline Primary" />
      <UploadAvatar variant="filled" color="secondary" label="Filled Secondary" />
      <UploadAvatar variant="ghost" color="neutral" label="Ghost Neutral" />
      <UploadAvatar config={{ isInvalid: true }} errorMessage="Ảnh không hợp lệ" />
    </div>
  );
}
```

---

### 5. Tích hợp React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";
import { UploadAvatar, Button } from "@owa/ui";

interface ProfileFormData {
  avatar: File | null;
}

export function ProfileForm() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    defaultValues: { avatar: null },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form submitted with file:", data.avatar);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
      <Controller
        name="avatar"
        control={control}
        rules={{ required: "Vui lòng tải lên ảnh đại diện của bạn" }}
        render={({ field: { value, onChange, ref } }) => (
          <UploadAvatar
            ref={ref}
            value={value}
            onChange={onChange}
            label="Ảnh đại diện"
            helperText="Kích thước tối đa 2MB"
            maxSize={2 * 1024 * 1024}
            config={{
              isRequired: true,
              isInvalid: Boolean(errors.avatar),
              isLoading: isSubmitting,
              showSpinner: isSubmitting,
            }}
            errorMessage={errors.avatar?.message}
          />
        )}
      />
      <Button type="submit" disabled={isSubmitting}>Lưu thông tin</Button>
    </form>
  );
}
```

---

## ⚙️ Bảng thuộc tính Props

### `UploadAvatarProps`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `value` | `PreviewFile \| string \| null` | `undefined` | Giá trị ảnh avatar hiện tại (dùng ở chế độ Controlled). |
| `defaultValue` | `PreviewFile \| string \| null` | `null` | Giá trị ảnh avatar khởi tạo ban đầu (dùng ở chế độ Uncontrolled). |
| `onChange` | `(item: PreviewFile \| null) => void` | `undefined` | Callback khi ảnh avatar thay đổi hoặc bị xóa (`null`). |
| `onRemove` | `(item: PreviewFile) => void` | `undefined` | Callback khi người dùng nhấn nút xóa ảnh. |
| `onPreview` | `(item: PreviewFile) => void` | `undefined` | Callback khi người dùng mở modal xem trước phóng to (lightbox). |
| `onClear` | `() => void` | `undefined` | Callback kích hoạt khi nút xóa nhanh được gọi. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích thước avatar (48px, 64px, 80px, 96px, 128px). |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Kiểu biến thể hiển thị khung viền avatar. |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'primary'` | Chủ đề bảng màu sắc hiển thị. |
| `shape` | `'circle' \| 'square'` | `'circle'` | Hình dạng avatar (`circle`: tròn hoàn toàn; `square`: vuông). |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | Theo `size` | Tùy biến bo góc khi `shape="square"`. |
| `crop` | `boolean \| UploadAvatarCropOptions` | `true` | Bật/tắt hoặc cấu hình modal cắt xén ảnh trước khi tải lên. |
| `maxSize` | `number` | `undefined` | Kích thước tệp tối đa cho phép (đơn vị: bytes). |
| `accept` | `string \| Accept` | `"image/*"` | Các định dạng MIME type được phép tải lên. |
| `config` | `UploadAvatarConfig` | `{}` | Gom nhóm các cờ boolean trạng thái và tính năng (xem bảng bên dưới). |
| `label` | `ReactNode` | `undefined` | Nhãn hiển thị tiêu đề cho trường avatar. |
| `labelPlacement`| `'top' \| 'left'` | `'top'` | Vị trí đặt nhãn so với avatar. |
| `helperText` | `ReactNode` | `undefined` | Đoạn văn bản hướng dẫn/chú thích bên dưới avatar. |
| `errorMessage` | `ReactNode` | `undefined` | Thông báo lỗi hiển thị bên dưới avatar (tự động kích hoạt viền đỏ). |
| `disabled` | `boolean` | `false` | Vô hiệu hóa toàn bộ tương tác tải lên. |
| `readOnly` | `boolean` | `false` | Chế độ chỉ xem, không cho phép thay đổi hay xóa. |
| `icon` | `ReactNode` | `<AvatarIcon />` | Tùy biến icon placeholder khi chưa có ảnh. |
| `name` | `string` | `undefined` | Tên của trường input file trong form HTML. |
| `id` | `string` | Tự động sinh | ID của phần tử input (dùng cho liên kết label & a11y). |
| `ref` | `Ref<HTMLInputElement>` | `undefined` | Ref chuyển tiếp đến thẻ input file ẩn bên trong. |
| `className` | `string` | `""` | Tùy biến class container ngoài cùng. |
| `wrapperClassName` | `string` | `""` | Alias của `className`. |
| `avatarClassName` | `string` | `""` | Tùy biến class áp dụng riêng cho khung viền của avatar. |
| `labelClassName` | `string` | `""` | Tùy biến class cho nhãn `<label>`. |
| `helperClassName` | `string` | `""` | Tùy biến class cho text hướng dẫn / thông báo lỗi. |

---

### `UploadAvatarConfig`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `isRequired` | `boolean` | `false` | Đánh dấu bắt buộc nhập (hiển thị dấu `*` đỏ cạnh label). |
| `isInvalid` | `boolean` | `false` | Đánh dấu trường không hợp lệ (kích hoạt viền đỏ và `aria-invalid`). |
| `isLoading` | `boolean` | `false` | Đang tải tệp, khóa tương tác và kích hoạt `aria-busy`. |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner overlay khi `isLoading=true`. |
| `isClearable` | `boolean` | `false` | Cho phép hiển thị nút xóa nhanh avatar. |
| `isFullWidth` | `boolean` | `false` | Mở rộng container bao ngoài chiếm 100% chiều rộng khung cha. |

---

### `UploadAvatarCropOptions`

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `aspectRatio` | `number` | `1` | Tỷ lệ khung hình cắt (mặc định 1:1 cho avatar). |
| `cropShape` | `'round' \| 'rect'` | `'round'` cho circle, `'rect'` cho square | Hình dạng mặt nạ cắt xén ảnh trong modal. |
| `showGrid` | `boolean` | `true` | Hiển thị đường lưới tỷ lệ 3x3 khi cắt ảnh. |
| `minZoom` | `number` | `1` | Mức độ thu nhỏ tối thiểu. |
| `maxZoom` | `number` | `4` | Mức độ phóng to tối đa. |
| `modalTitle` | `string` | `"Cắt ảnh đại diện"` | Tiêu đề thanh header của modal cắt ảnh. |

---

## 🛡️ Khả năng tiếp cận (Accessibility)

- **WAI-ARIA & Keyboard Navigation**:
  - Phần tử avatar được gán `role="button"`, `tabIndex={0}`, có thể điều hướng bằng phím <kbd>Tab</kbd>.
  - Nhấn <kbd>Space</kbd> hoặc <kbd>Enter</kbd> để kích hoạt hộp thoại chọn tệp tin.
  - Khi đã có ảnh, nhấn <kbd>Delete</kbd> hoặc <kbd>Backspace</kbd> sẽ xóa ảnh ngay lập tức.
- **Screen Reader Support**:
  - Tích hợp vùng chứa `aria-live="polite"` (`sr-only`) tự động thông báo trạng thái cập nhật hoặc xóa ảnh cho người khiếm thị bằng tiếng Việt chuẩn.
  - Liên kết tự động giữa label, helperText, errorMessage với input thông qua `aria-describedby` và `htmlFor`.
- **Trạng thái vô hiệu hóa**:
  - Khi `disabled={true}` hoặc `isLoading={true}`, phần tử tự động thiết lập `aria-disabled="true"`, `aria-busy="true"` và ngăn chặn toàn bộ sự kiện click, kéo thả.
