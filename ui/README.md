# @openway/ui

Bộ thư viện UI components dùng chung, tối ưu hóa cho React 19, Next.js 16+ và Tailwind CSS (hỗ trợ đầy đủ Tailwind CSS v4 & v3).

Thư viện được thiết kế theo triết lý **Theme-agnostic (Tùy biến bảng màu linh hoạt)**: Thư viện chỉ cung cấp bộ khung layout và logic WAI-ARIA, còn bảng màu (`primary`, `secondary`, `neutral`...) hoàn toàn do dự án của bạn quyết định thông qua file CSS toàn cục (`globals.css`).

---

## 1. Cài đặt

```bash
pnpm add @openway/ui
# hoặc
npm install @openway/ui
# hoặc
yarn add @openway/ui
```

---

## 2. Cấu hình bảng màu trong dự án của bạn

Bạn hoàn toàn tự do lựa chọn bất kỳ mã màu thương hiệu nào bạn thích (xanh lam, tím, cam, đen trắng...).

### Cách cấu hình với Tailwind CSS v4 (Khuyên dùng)

Trong file `app/globals.css` (hoặc file CSS chính của bạn):

```css
@import "tailwindcss";

/* 1. Chỉ định Tailwind quét các components của @openway/ui */
@source "../node_modules/@openway/ui";

/* 2. Tự cung cấp bảng màu bạn thích */
@theme {
  /* Màu chủ đạo (Primary) */
  --color-primary-50: #f0f7ff;
  --color-primary-100: #e0effe;
  --color-primary-200: #bae0fd;
  --color-primary-300: #7cc5fb;
  --color-primary-400: #36a4f6;
  --color-primary-500: #0284c7; /* Màu chính của nút, checkbox, active tab... */
  --color-primary-600: #0369a1; /* Màu khi hover nút, focus... */
  --color-primary-700: #075985;
  --color-primary-800: #0c4a6e;
  --color-primary-900: #0a3d5b;
  --color-primary-950: #06273c;

  /* Màu phụ (Secondary) */
  --color-secondary-50: #faf5ff;
  --color-secondary-100: #f3e8ff;
  --color-secondary-500: #a855f7;
  --color-secondary-600: #9333ea;
  --color-secondary-700: #7e22ce;

  /* Màu trung tính cho nền, viền, chữ (Neutral) */
  --color-neutral-white: #ffffff;
  --color-neutral-50: #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;
  --color-neutral-950: #020617;
  --color-neutral-black: #000000;

  /* Màu thông báo trạng thái (Error, Warning, Success, Info) */
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;

  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;

  --color-success-500: #10b981;
  --color-success-600: #059669;

  --color-info-500: #3b82f6;
  --color-info-600: #2563eb;
}
```

---

### Cách cấu hình với Tailwind CSS v3

Nếu dự án của bạn đang dùng `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Thêm dòng này để quét class của @openway/ui:
    "./node_modules/@openway/ui/**/*.{js,cjs,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#e0effe",
          500: "#0284c7",
          600: "#0369a1",
          700: "#075985",
        },
        neutral: {
          white: "#ffffff",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          800: "#1e293b",
          900: "#0f172a",
        },
        // Tương tự cho secondary, error, warning, success...
      },
    },
  },
};
```

---

## 3. Cách sử dụng

Trong `app/layout.tsx`:
```tsx
import "./globals.css"; // Chỉ cần import file CSS của dự án bạn

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
```

Trong bất kỳ Component / Trang nào:
```tsx
import { Button, Input, DatePicker } from "@openway/ui";

export default function Page() {
  return (
    <div className="p-6 space-y-4">
      <Input label="Họ và tên" placeholder="Nhập họ và tên..." />

      <DatePicker label="Ngày sinh" placeholder="Chọn ngày sinh" />

      <Button color="primary" variant="filled">
        Lưu thông tin
      </Button>
    </div>
  );
}
```

---

## 4. Tài liệu Chi tiết & Tích hợp Antigravity AI (`docs/`)

Toàn bộ tài liệu chi tiết của 32 components và các hooks được đóng gói sẵn trong thư mục `node_modules/@openway/ui/docs/`:

- **[Tài liệu Trung tâm (Master Guide)](./docs/README.md)**: Danh mục toàn bộ components và hướng dẫn chi tiết.
- **[Antigravity Agent Guide](./docs/AGENTS.md)**: Chỉ dẫn chuyên biệt cho Antigravity AI.
- **[Antigravity Skill](./docs/SKILL.md)**: Định dạng Skill chuẩn của Antigravity (`openway-ui`).
- **[Thư mục Components](./docs/components/)**: 32 tài liệu hướng dẫn và bảng props chi tiết của từng component.
- **[Thư mục Hooks](./docs/hooks/)**: Tài liệu `useInfiniteScroll`, `useTableQuery`, `useSelectInfiniteQuery`, `useDebounce`.

---

## 5. Tích hợp TanStack Query v5 (`@openway/ui/query`)

Dành cho các tính năng phân trang máy chủ (Server-side Pagination), sắp xếp, lọc và cuộn vô tận:

```tsx
import { useTableQuery, useSelectInfiniteQuery } from "@openway/ui/query";
```

---

## 6. Danh sách các Token màu sắc được hỗ trợ

| Tên Token | Mô tả | Các sắc độ khuyên dùng |
| :--- | :--- | :--- |
| `primary` | Màu nhận diện thương hiệu chủ đạo (Nút, Tab đang chọn, Viền focus, Checkbox, Radio...) | `50` $\rightarrow$ `950` (Tối thiểu cần `500`, `600`) |
| `secondary` | Màu phụ, nút thứ cấp | `50` $\rightarrow$ `950` (Tối thiểu cần `500`, `600`) |
| `neutral` | Màu khung viền, nền xám, nền input, màu chữ tiêu đề và mô tả | `white`, `50` $\rightarrow$ `950`, `black` |
| `error` | Trạng thái lỗi, thông báo lỗi form, nút xóa nguy hiểm | `50`, `100`, `500`, `600` |
| `warning` | Cảnh báo, trạng thái chờ | `50`, `100`, `500`, `600` |
| `success` | Thành công, hoàn thành | `50`, `100`, `500`, `600` |
| `info` | Thông tin hướng dẫn | `50`, `100`, `500`, `600` |

---

## 7. Giấy phép

Phát hành dưới giấy phép [MIT](LICENSE).
