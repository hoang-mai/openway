# ?? Upload Avatar Component Suite (`@openway/ui`)

Component **UploadAvatar** toàn di?n, linh ho?t và tuong tác cao cho phép ngu?i dùng t?i lên, kéo th? (Drag & Drop), c?t xén (Crop), xem tru?c (Lightbox Preview) và qu?n lý ?nh d?i di?n. Thi?t k? d?ng b? hoàn h?o v?i h? th?ng **Design System**, h? tr? **Safe Config Fallback**, **Qu?n lý b? nh? t? d?ng (Lifecycle Cleanup)** và tuân th? tiêu chu?n **WAI-ARIA Accessibility**.

---

## ?? Ði?m n?i b?t

- **Tích h?p quy trình x? lý ?nh tr?n gói**:
  - ??? **Kéo th? & Ch?n t?p**: H? tr? kéo th? ?nh tr?c quan nh? `react-dropzone`, t? d?ng ki?m tra d?nh d?ng MIME (`accept`) và gi?i h?n dung lu?ng (`maxSize`).
  - ?? **C?t xén ?nh tích h?p (`UploadAvatarCropModal`)**: Tích h?p s?n modal c?t ?nh tr?c quan h? tr? Zoom, Xoay (Rotate 90°), L?t ?nh (Flip), Reset và Ch?n t?p khác ngay trong modal.
  - ?? **Xem tru?c phóng to (Lightbox Preview)**: Tích h?p v?i `<FileContainer>` và `<FilePreview>` d? phóng to, xoay ?nh và t?i xu?ng ?nh ch?t lu?ng g?c.
  - ??? **Xóa nhanh & Thao tác ti?n l?i**: Menu hành d?ng hi?n th? mu?t mà khi hover (ho?c focus) cho phép Xem tru?c, C?t l?i và Xóa ?nh.
- **Qu?n lý b? nh? t?i uu (Zero Memory Leak)**:
  - ?ng d?ng mô hình **Lifecycle Cleanup**: T? d?ng gi?i phóng Blob URL (`URL.revokeObjectURL`) bên trong `useEffect cleanup` khi dóng modal, d?i ?nh ho?c khi component unmount.
- **5 Kích thu?c tiêu chu?n (`size`)**:
  - `xs`: 48x48px (`size-12`)
  - `sm`: 64x64px (`size-16`)
  - `md`: 80x80px (`size-20` - *m?c d?nh*)
  - `lg`: 96x96px (`size-24`)
  - `xl`: 128x128px (`size-32`)
- **3 Bi?n th? giao di?n (`variant`)**:
  - `outline` *(m?c d?nh)*: Vi?n nét rõ ràng quanh khung avatar, hover/focus d?i màu vi?n ch? d?.
  - `filled`: N?n pastel nh?t (`bg-{color}-50/60`), vi?n d?ng di?u.
  - `ghost`: N?n trong su?t, vi?n m? t?i gi?n.
  - `other`: B? qua các style m?c d?nh, t? do tùy bi?n qua `avatarClassName`.
- **7 Ch? d? màu s?c (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`.
- **2 Hình d?ng linh ho?t (`shape`)**:
  - `circle` *(m?c d?nh)*: Hình tròn hoàn h?o (`rounded-full`).
  - `square`: Hình vuông v?i tùy ch?n bo góc `radius` (`none`, `sm`, `md`, `lg`, `xl`, `full`).
- **Icon Avatar m?c d?nh tinh t?**: S? d?ng silhouette `<AvatarIcon />` s?c nét làm icon gi? ch? (placeholder) thay th? cho icon dám mây truy?n th?ng.
- **Ð?ng b? c?u hình Form & A11y nhu `Input`**:
  - Nhóm các c? boolean vào prop `config`: `isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `isClearable`, `isFullWidth`.
  - H? tr? `labelPlacement` (`top` ho?c `left`) cùng van b?n tr? giúp `helperText` và thông báo l?i `errorMessage`.
  - Tuong thích bàn phím: <kbd>Space</kbd> / <kbd>Enter</kbd> d? ch?n ?nh, <kbd>Delete</kbd> / <kbd>Backspace</kbd> d? xóa ?nh.
  - H? tr? Screen Reader v?i vùng thông báo d?ng `aria-live`.

---

## ?? Cài d?t & Import

```tsx
import {
  UploadAvatar,
  UploadAvatarCropModal,
  UploadAvatarCropContent,
  getCroppedImage,
  createImage,
  rotateSize,
} from "@openway/ui";

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
} from "@openway/ui";
```

---

## ?? Hu?ng d?n s? d?ng

### 1. S? d?ng co b?n (Uncontrolled & Controlled)

#### Cách 1: T? qu?n lý (Uncontrolled v?i `defaultValue`)
```tsx
import { UploadAvatar } from "@openway/ui";

export function UncontrolledExample() {
  return (
    <UploadAvatar
      defaultValue="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"
      label="?nh d?i di?n"
      helperText="H? tr? JPG, PNG, WEBP du?i 5MB"
      onChange={(item) => console.log("Avatar changed:", item)}
    />
  );
}
```

#### Cách 2: Qu?n lý tr?ng thái (Controlled v?i `value`)
```tsx
import { useState } from "react";
import { UploadAvatar, PreviewFile } from "@openway/ui";

export function ControlledExample() {
  const [avatar, setAvatar] = useState<PreviewFile | string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <UploadAvatar
        value={avatar}
        onChange={setAvatar}
        label="?nh d?i di?n h? so"
        helperText="Click d? t?i ?nh lên và c?t xén"
      />
      <p className="text-xs text-neutral-500">
        Ðã ch?n: {avatar ? (typeof avatar === "string" ? avatar : avatar.name) : "Chua có ?nh"}
      </p>
    </div>
  );
}
```

---

### 2. Tùy ch?nh tính nang C?t ?nh (`crop`)

B?n có th? c?u hình modal c?t ?nh chi ti?t ho?c t?t hoàn toàn tính nang này:

```tsx
import { UploadAvatar } from "@openway/ui";

// 1. Tùy ch?nh modal c?t ?nh
<UploadAvatar
  crop={{
    aspectRatio: 1, // T? l? 1:1
    cropShape: "round", // Vùng c?t tròn "round" ho?c vuông "rect"
    showGrid: true, // Hi?n th? lu?i can ch?nh
    minZoom: 1,
    maxZoom: 5,
    modalTitle: "Tùy ch?nh góc ch?p ?nh d?i di?n",
  }}
/>

// 2. T?t hoàn toàn modal c?t ?nh (Nh?n file tr?c ti?p sau khi ch?n)
<UploadAvatar crop={false} />
```

---

### 3. Kích thu?c (`size`) & Hình d?ng (`shape`)

```tsx
import { UploadAvatar } from "@openway/ui";

export function SizesAndShapesExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Các kích thu?c */}
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

### 4. Bi?n th? (`variant`) & Màu s?c (`color`)

```tsx
import { UploadAvatar } from "@openway/ui";

export function VariantsAndColorsExample() {
  return (
    <div className="flex gap-6">
      <UploadAvatar variant="outline" color="primary" label="Outline Primary" />
      <UploadAvatar variant="filled" color="secondary" label="Filled Secondary" />
      <UploadAvatar variant="ghost" color="neutral" label="Ghost Neutral" />
      <UploadAvatar config={{ isInvalid: true }} errorMessage="?nh không h?p l?" />
    </div>
  );
}
```

---

### 5. Tích h?p React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";
import { UploadAvatar, Button } from "@openway/ui";

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
        rules={{ required: "Vui lòng t?i lên ?nh d?i di?n c?a b?n" }}
        render={({ field: { value, onChange, ref } }) => (
          <UploadAvatar
            ref={ref}
            value={value}
            onChange={onChange}
            label="?nh d?i di?n"
            helperText="Kích thu?c t?i da 2MB"
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
      <Button type="submit" disabled={isSubmitting}>Luu thông tin</Button>
    </form>
  );
}
```

---

## ?? B?ng thu?c tính Props

### `UploadAvatarProps`

| Thu?c tính | Ki?u d? li?u | M?c d?nh | Mô t? |
| :--- | :--- | :--- | :--- |
| `value` | `PreviewFile \| string \| null` | `undefined` | Giá tr? ?nh avatar hi?n t?i (dùng ? ch? d? Controlled). |
| `defaultValue` | `PreviewFile \| string \| null` | `null` | Giá tr? ?nh avatar kh?i t?o ban d?u (dùng ? ch? d? Uncontrolled). |
| `onChange` | `(item: PreviewFile \| null) => void` | `undefined` | Callback khi ?nh avatar thay d?i ho?c b? xóa (`null`). |
| `onRemove` | `(item: PreviewFile) => void` | `undefined` | Callback khi ngu?i dùng nh?n nút xóa ?nh. |
| `onPreview` | `(item: PreviewFile) => void` | `undefined` | Callback khi ngu?i dùng m? modal xem tru?c phóng to (lightbox). |
| `onClear` | `() => void` | `undefined` | Callback kích ho?t khi nút xóa nhanh du?c g?i. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích thu?c avatar (48px, 64px, 80px, 96px, 128px). |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Ki?u bi?n th? hi?n th? khung vi?n avatar. |
| `color` | `'primary' \| 'secondary' \| 'neutral' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'primary'` | Ch? d? b?ng màu s?c hi?n th?. |
| `shape` | `'circle' \| 'square'` | `'circle'` | Hình d?ng avatar (`circle`: tròn hoàn toàn; `square`: vuông). |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | Theo `size` | Tùy bi?n bo góc khi `shape="square"`. |
| `crop` | `boolean \| UploadAvatarCropOptions` | `true` | B?t/t?t ho?c c?u hình modal c?t xén ?nh tru?c khi t?i lên. |
| `maxSize` | `number` | `undefined` | Kích thu?c t?p t?i da cho phép (don v?: bytes). |
| `accept` | `string \| Accept` | `"image/*"` | Các d?nh d?ng MIME type du?c phép t?i lên. |
| `config` | `UploadAvatarConfig` | `{}` | Gom nhóm các c? boolean tr?ng thái và tính nang (xem b?ng bên du?i). |
| `label` | `ReactNode` | `undefined` | Nhãn hi?n th? tiêu d? cho tru?ng avatar. |
| `labelPlacement`| `'top' \| 'left'` | `'top'` | V? trí d?t nhãn so v?i avatar. |
| `helperText` | `ReactNode` | `undefined` | Ðo?n van b?n hu?ng d?n/chú thích bên du?i avatar. |
| `errorMessage` | `ReactNode` | `undefined` | Thông báo l?i hi?n th? bên du?i avatar (t? d?ng kích ho?t vi?n d?). |
| `disabled` | `boolean` | `false` | Vô hi?u hóa toàn b? tuong tác t?i lên. |
| `readOnly` | `boolean` | `false` | Ch? d? ch? xem, không cho phép thay d?i hay xóa. |
| `icon` | `ReactNode` | `<AvatarIcon />` | Tùy bi?n icon placeholder khi chua có ?nh. |
| `name` | `string` | `undefined` | Tên c?a tru?ng input file trong form HTML. |
| `id` | `string` | T? d?ng sinh | ID c?a ph?n t? input (dùng cho liên k?t label & a11y). |
| `ref` | `Ref<HTMLInputElement>` | `undefined` | Ref chuy?n ti?p d?n th? input file ?n bên trong. |
| `className` | `string` | `""` | Tùy bi?n class container ngoài cùng. |
| `wrapperClassName` | `string` | `""` | Alias c?a `className`. |
| `avatarClassName` | `string` | `""` | Tùy bi?n class áp d?ng riêng cho khung vi?n c?a avatar. |
| `labelClassName` | `string` | `""` | Tùy bi?n class cho nhãn `<label>`. |
| `helperClassName` | `string` | `""` | Tùy bi?n class cho text hu?ng d?n / thông báo l?i. |

---

### `UploadAvatarConfig`

| Thu?c tính | Ki?u d? li?u | M?c d?nh | Mô t? |
| :--- | :--- | :--- | :--- |
| `isRequired` | `boolean` | `false` | Ðánh d?u b?t bu?c nh?p (hi?n th? d?u `*` d? c?nh label). |
| `isInvalid` | `boolean` | `false` | Ðánh d?u tru?ng không h?p l? (kích ho?t vi?n d? và `aria-invalid`). |
| `isLoading` | `boolean` | `false` | Ðang t?i t?p, khóa tuong tác và kích ho?t `aria-busy`. |
| `showSpinner` | `boolean` | `false` | Hi?n th? bi?u tu?ng xoay spinner overlay khi `isLoading=true`. |
| `isClearable` | `boolean` | `false` | Cho phép hi?n th? nút xóa nhanh avatar. |
| `isFullWidth` | `boolean` | `false` | M? r?ng container bao ngoài chi?m 100% chi?u r?ng khung cha. |

---

### `UploadAvatarCropOptions`

| Thu?c tính | Ki?u d? li?u | M?c d?nh | Mô t? |
| :--- | :--- | :--- | :--- |
| `aspectRatio` | `number` | `1` | T? l? khung hình c?t (m?c d?nh 1:1 cho avatar). |
| `cropShape` | `'round' \| 'rect'` | `'round'` cho circle, `'rect'` cho square | Hình d?ng m?t n? c?t xén ?nh trong modal. |
| `showGrid` | `boolean` | `true` | Hi?n th? du?ng lu?i t? l? 3x3 khi c?t ?nh. |
| `minZoom` | `number` | `1` | M?c d? thu nh? t?i thi?u. |
| `maxZoom` | `number` | `4` | M?c d? phóng to t?i da. |
| `modalTitle` | `string` | `"C?t ?nh d?i di?n"` | Tiêu d? thanh header c?a modal c?t ?nh. |

---

## ??? Kh? nang ti?p c?n (Accessibility)

- **WAI-ARIA & Keyboard Navigation**:
  - Ph?n t? avatar du?c gán `role="button"`, `tabIndex={0}`, có th? di?u hu?ng b?ng phím <kbd>Tab</kbd>.
  - Nh?n <kbd>Space</kbd> ho?c <kbd>Enter</kbd> d? kích ho?t h?p tho?i ch?n t?p tin.
  - Khi dã có ?nh, nh?n <kbd>Delete</kbd> ho?c <kbd>Backspace</kbd> s? xóa ?nh ngay l?p t?c.
- **Screen Reader Support**:
  - Tích h?p vùng ch?a `aria-live="polite"` (`sr-only`) t? d?ng thông báo tr?ng thái c?p nh?t ho?c xóa ?nh cho ngu?i khi?m th? b?ng ti?ng Vi?t chu?n.
  - Liên k?t t? d?ng gi?a label, helperText, errorMessage v?i input thông qua `aria-describedby` và `htmlFor`.
- **Tr?ng thái vô hi?u hóa**:
  - Khi `disabled={true}` ho?c `isLoading={true}`, ph?n t? t? d?ng thi?t l?p `aria-disabled="true"`, `aria-busy="true"` và ngan ch?n toàn b? s? ki?n click, kéo th?.
