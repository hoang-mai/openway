# 💀 Skeleton & LoadingImage Component (`@openway/ui`)

Bộ đôi component **Skeleton** và **LoadingImage** hiện đại, hiệu năng cao, thiết kế chuẩn **Design System**, hỗ trợ placeholder tải dữ liệu mượt mà, chống giật layout (Cumulative Layout Shift - CLS), tích hợp **Safe Config Fallback** (`getSafeConfig`) và tuân thủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Skeleton Placeholder**:
  - **3 Biến thể animation (`variant`)**:
    - `pulse` *(mặc định)*: Hiệu ứng nhịp thở mờ dần mượt mà.
    - `wave`: Hiệu ứng shimmer ánh sáng lướt chéo từ góc trên-trái xuống góc dưới-phải (sử dụng GPU-accelerated CSS).
    - `none`: Placeholder tĩnh không chuyển động.
  - **2 Kiểu hình dạng (`shape`)**:
    - `rectangle` *(mặc định)*: Hình chữ nhật hoặc vuông, kết hợp với `radius`.
    - `circle`: Hình tròn hoàn hảo (`rounded-full`), tự động bỏ qua `radius`.
  - **6 Mức bo góc (`radius`)**: `none`, `sm`, `md` *(mặc định)*, `lg`, `xl`, `full`.
  - **Multi-line mode (`lines`)**: Tự động xếp chồng nhiều dòng văn bản theo dạng đoạn văn, với dòng cuối cùng tự động thu hẹp 60% chiều rộng để tạo cảm giác tự nhiên.
  - **Linh hoạt kích thước (`width`, `height`, `gap`)**: Nhận cả số nguyên (`px`) lẫn chuỗi CSS (`rem`, `%`, `vh`...).

- **LoadingImage**:
  - **Tích hợp Next.js Image**: Kế thừa toàn bộ tối ưu hóa của `next/image` (`fill`, `priority`, `sizes`, `quality`...).
  - **Hỗ trợ đa dạng nguồn ảnh (`src`)**: Nhận đường dẫn ảnh URL/StaticImport, đồng thời hỗ trợ trực tiếp đối tượng **`File`** hoặc **`Blob`** (tự động tạo & giải phóng Object URL an toàn, không memory leak).
  - **Tự động tối ưu `unoptimized`**: Tự động kích hoạt khi nhận `File` / `Blob` để tránh lỗi phân giải trên Image Optimization server của Next.js.
  - **Tùy biến căn chỉnh (`objectFit`)**: Hỗ trợ 5 kiểu `cover` *(mặc định)*, `contain`, `fill`, `none`, `scale-down`.
  - **Tự động reset trạng thái**: Reset `isLoaded` và `hasError` khi `src` thay đổi.
  - **Fallback Error State**: Tự động hiển thị icon placeholder dự phòng khi ảnh tải lỗi (`onError`).

- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` từ `@/utils/function` đảm bảo an toàn tuyệt đối, không crash giao diện khi nhận giá trị `variant`, `radius`, `objectFit` không hợp lệ.
- **Trợ năng (Accessibility)**: Tích hợp đầy đủ `role="status"`, `aria-label="Loading..."`.

---

## 🚀 Cài đặt & Import

```tsx
import { Skeleton, LoadingImage } from "@openway/ui";
import type {
  SkeletonProps,
  SkeletonVariant,
  SkeletonShape,
  SkeletonRadius,
  SkeletonObjectFit,
  LoadingImageProps,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Skeleton cơ bản

```tsx
import { Skeleton } from "@openway/ui";

export function BasicSkeletonExample() {
  return (
    <div className="space-y-4">
      {/* Khối đơn */}
      <Skeleton width="100%" height="2rem" />

      {/* Avatar tròn */}
      <Skeleton shape="circle" width={48} height={48} />

      {/* Hiệu ứng sóng wave */}
      <Skeleton variant="wave" width="200px" height="1.5rem" />
    </div>
  );
}
```

### 2. Multi-line Skeleton (Đoạn văn bản)

```tsx
<Skeleton lines={3} height="1rem" gap="0.75rem" />
```

### 3. LoadingImage với URL hoặc File / Blob

```tsx
import { LoadingImage } from "@openway/ui";

export function ImageExamples({ file }: { file?: File }) {
  return (
    <div className="flex gap-4">
      {/* Load ảnh qua URL với bo góc lg */}
      <LoadingImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
        alt="Mountain view"
        width={300}
        height={200}
        radius="lg"
        objectFit="cover"
      />

      {/* Load ảnh trực tiếp từ đối tượng File (Upload preview) */}
      {file && (
        <LoadingImage
          src={file}
          alt="Upload preview"
          width={150}
          height={150}
          radius="full"
          objectFit="contain"
        />
      )}
    </div>
  );
}
```

---

## ⚙️ Props API Reference

### `SkeletonProps`

| Prop | Type | Default | Mô tả |
| :--- | :--- | :--- | :--- |
| `variant` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Kiểu hiệu ứng hoạt ảnh placeholder |
| `shape` | `'rectangle' \| 'circle'` | `'rectangle'` | Hình dạng hiển thị |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Độ bo góc (chỉ áp dụng khi `shape === 'rectangle'`) |
| `width` | `string \| number` | — | Chiều rộng (px hoặc chuỗi CSS) |
| `height` | `string \| number` | `'1rem'` | Chiều cao (px hoặc chuỗi CSS) |
| `lines` | `number` | `1` | Số dòng hiển thị dạng cột (khi > 1) |
| `gap` | `string \| number` | `'0.5rem'` | Khoảng cách giữa các dòng khi `lines > 1` |
| `className` | `string` | `""` | Tùy biến class Tailwind bên ngoài |
| `ref` | `React.Ref<HTMLDivElement>` | — | Ref trỏ tới thẻ div gốc |

### `LoadingImageProps`

| Prop | Type | Default | Mô tả |
| :--- | :--- | :--- | :--- |
| `src` | `ImageProps['src'] \| File \| Blob \| ServerFile` | — | Nguồn ảnh (URL, import tĩnh, File/Blob hoặc ServerFile) |
| `alt` | `string` | `""` | Văn bản thay thế cho ảnh |
| `width` | `number` | — | Chiều rộng hiển thị (nếu không dùng `fill`) |
| `height` | `number` | — | Chiều cao hiển thị (nếu không dùng `fill`) |
| `fill` | `boolean` | `false` | Co giãn ảnh lấp đầy wrapper cha |
| `skeletonVariant` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Variant của skeleton khi đang tải |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Bo góc áp dụng cho cả skeleton và ảnh |
| `objectFit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | Kiểu căn chỉnh ảnh |
| `preview` | `boolean` | `true` | Bật xem trước ảnh phóng to trong modal khi click (qua FilePreview & FileContainer) |
| `wrapperClassName` | `string` | `""` | Class tùy biến cho wrapper div |
| `wrapperStyle` | `CSSProperties` | — | Style inline cho wrapper div |
| `onClick` | `(e) => void` | — | Callback khi click vào ảnh / wrapper |
| `onLoad` | `(e) => void` | — | Callback khi ảnh tải thành công |
| `onError` | `(e) => void` | — | Callback khi ảnh gặp lỗi tải |
| `ref` | `React.Ref<HTMLDivElement>` | — | Ref trỏ tới thẻ wrapper div |

