# ✍️ Typography Component (`@openway/ui`)

Component **Typography** (Hệ thống Văn bản & Khối nội dung) duy nhất, toàn diện, chuẩn hóa 100% theo phong cách thiết kế **Notion Design System** (*Warm Paper Aesthetics*, bảng 10 màu đặc trưng của Notion, inline code chữ đỏ san hô `#eb5757`, Quote viền 3px, và tương tác Zen Canvas).

---

## 🌟 Điểm nổi bật

- **Một Component Duy Nhất (`Typography`)**: Không cần băn khoăn lựa chọn giữa hàng chục component rời rạc. Chỉ cần truyền prop `type="h1"` đến `type="h6"`, `type="p"`, `type="code"`, `type="blockquote"`, `type="kbd"`, `type="a"`.
- **Hỗ trợ Alias `Text`**: Xuất kèm alias `Text = Typography` để sử dụng theo thói quen ngắn gọn.
- **Bảng 10 Màu Chữ & Highlight Chuẩn Notion**:
  - 10 màu chữ: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`.
  - 10 màu highlight nền: `mark="yellow"`, `mark="blue"`, `mark="green"`...
- **Inline Code Chuẩn Nhận Diện Notion**: Chữ đỏ san hô `#eb5757` trên nền xám ấm nhẹ `rgba(135, 131, 120, 0.15)`.
- **Khối Trích Dẫn Notion Quote**: Viền hairline dày 3px bên trái mang màu chữ than chì, font chữ nghiêng mềm mại.
- **Tương Tác Tiện Lợi (Zen Canvas)**:
  - `copyable`: Nút sao chép văn bản vào Clipboard mượt mà kèm icon check xác nhận.
  - `ellipsis`: Rút gọn chuỗi dài theo 1 hoặc nhiều dòng kèm nút "Xem thêm / Thu gọn".
  - Chế độ `hoverOnly`: Mặc định nút copy ẩn mờ và chỉ hiện khi rê chuột, giữ mặt trang luôn sạch sẽ.
- **Tabular Numbers (`tabular`)**: Kích hoạt `font-variant-numeric: tabular-nums` cho số liệu không nhảy giật khung hình.
- **Zero External Dependencies**: Tích hợp trực tiếp với Tailwind CSS v4 và stylesheet duy nhất `styles.css`.

---

## 🚀 Cài đặt & Import

```tsx
import { Typography, Text } from "@openway/ui";
import type { TypographyProps, NotionColor, NotionMarkColor } from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Tiêu đề các cấp độ (`type="h1"` đến `type="h6"`)

Tự động sinh ra thẻ HTML tương ứng và áp dụng typography scale chuẩn Notion:

```tsx
<Typography type="h1">Tiêu đề trang lớn nhất H1</Typography>
<Typography type="h2" color="blue">Mục tiêu quý 3 H2</Typography>
<Typography type="h3">Tiểu mục H3</Typography>
<Typography type="h4">Tiêu đề nhỏ H4</Typography>
<Typography type="h5">Tiêu đề nhóm H5</Typography>
<Typography type="h6">Chú thích tiêu đề H6</Typography>
```

---

### 2. Đoạn văn bản (`type="p"`) & Chữ thường (Mặc định `<span>`)

```tsx
// Đoạn văn bản có line-height và margin-bottom thoáng đãng
<Typography type="p">
  OpenWay Design System áp dụng triết lý thiết kế giao diện làm việc quản trị hiện đại.
</Typography>

// Chữ nội dòng thông thường (mặc định render span)
<Typography>Văn bản mặc định</Typography>
<Typography strong color="orange">Chữ cam in đậm</Typography>
<Typography italic color="gray">Chữ xám in nghiêng</Typography>
<Typography tabular>1,234,567.89 ₫</Typography>
```

---

### 3. Tùy chỉnh kích cỡ linh hoạt (`size`)

Bạn có thể kết hợp `type` tiêu đề với prop `size` để tinh chỉnh kích thước chữ phù hợp layout:

```tsx
<Typography type="h2" size="3xl">
  Thẻ H2 với kích thước chữ 3xl
</Typography>
```

---

### 4. Các Khối Nội Dung Đặc Trưng Chuẩn Notion

#### A. Khối Ghi Chú Callout (`type="callout"`)
```tsx
// Callout mặc định (icon bóng đèn 💡)
<Typography type="callout" color="yellow">
  Lưu ý: Dữ liệu này sẽ tự động được lưu sau mỗi 30 giây.
</Typography>

// Tùy biến icon qua prop hoặc qua object props
<Typography type="callout" icon="⚠️" color="orange">
  Cảnh báo: Bạn đang thay đổi quyền truy cập của quản trị viên cấp cao.
</Typography>

<Typography type="callout" props={{ icon: "🚀" }} color="blue">
  Tính năng mới: Trợ lý AI đã được kích hoạt.
</Typography>
```

#### B. Khối Trích Dẫn Quote (`type="blockquote"`)
```tsx
<Typography type="blockquote">
  "Thiết kế tốt là làm cho sản phẩm trở nên dễ hiểu." — Dieter Rams
</Typography>
```

#### C. Mã Lệnh Nội Dòng (`type="code"` hoặc `code={true}`)
Chữ đỏ san hô `#eb5757` chuẩn Notion:
```tsx
Cài đặt thư viện bằng lệnh <Typography type="code">pnpm add @openway/ui</Typography>.
Hoặc dùng modifier: <Typography code>const x = 10;</Typography>.
```

#### D. Phím Tắt Bàn Phím (`type="kbd"`)
```tsx
Nhấn <Typography type="kbd">⌘</Typography> + <Typography type="kbd">K</Typography> để tìm kiếm.
```

#### E. Thẻ Liên Kết Siêu Văn Bản (`type="a"`)
Typography tích hợp sẵn thẻ `Link` của **Next.js** (`next/link`) giúp điều hướng client-side SPA tối ưu. Toàn bộ các props đặc thù của liên kết được truyền qua thuộc tính `props` (đồng nhất với quy chuẩn `SelectFilterField`):
```tsx
// Render Next.js <Link> khi chỉ định type="a"
<Typography type="a" props={{ href: "/dashboard" }}>
  Trang chủ Dashboard
</Typography>

// Kèm liên kết ngoài (mở tab mới và hiển thị icon ExternalLink)
<Typography type="a" props={{ href: "https://openway.dev", external: true }}>
  Tài liệu OpenWay
</Typography>
```

---

### 5. Bảng 10 Màu Chữ & Highlight Chuẩn Notion

```tsx
// 10 Màu Chữ Notion:
<Typography color="default">Default</Typography>
<Typography color="gray">Gray</Typography>
<Typography color="brown">Brown</Typography>
<Typography color="orange">Orange</Typography>
<Typography color="yellow">Yellow</Typography>
<Typography color="green">Green</Typography>
<Typography color="blue">Blue</Typography>
<Typography color="purple">Purple</Typography>
<Typography color="pink">Pink</Typography>
<Typography color="red">Red</Typography>

// Highlight Nền Chuẩn Notion:
<Typography mark="yellow">Highlight vàng</Typography>
<Typography mark="blue">Highlight xanh dương</Typography>
<Typography mark="green">Highlight xanh lá</Typography>
<Typography mark="orange">Highlight cam</Typography>
<Typography mark="red">Highlight đỏ</Typography>
```

---

### 6. Tính Năng Tương Tác Nâng Cao

#### A. Sao Chép Vào Clipboard (`copyable`)
```tsx
// Cơ bản: Tự động copy nội dung khi bấm nút (nút hiện khi hover)
<Typography copyable>0987654321</Typography>

// Cấu hình nâng cao: Custom chuỗi copy, callback, và tooltip
<Typography
  copyable={{
    text: "RAW_API_KEY_SECRET",
    onCopy: () => console.log("Copied!"),
    tooltips: ["Sao chép mã bí mật", "Đã sao chép vào bộ nhớ tạm!"],
    hoverOnly: false, // Luôn hiển thị nút copy
  }}
>
  Mã bảo mật: ••••••••
</Typography>
```

#### B. Cắt Ngắn Dòng (`ellipsis`)
```tsx
// Cắt ngắn 1 dòng (truncate)
<Typography ellipsis>
  Đoạn văn bản cực kỳ dài sẽ tự động được cắt ngắn bằng dấu 3 chấm...
</Typography>

// Cắt ngắn 2 dòng kèm nút mở rộng / thu gọn
<Typography ellipsis={{ rows: 2, expandable: true }}>
  Nội dung bài viết chi tiết kéo dài nhiều dòng...
</Typography>
```

---

## 🎛️ Bảng Props API

### 1. Props Cơ Sở (Chung cho mọi loại)
| Prop | Kiểu dữ liệu | Mặc định | Mô tả |
| :--- | :--- | :--- | :--- |
| `color` | `NotionColor` | `"default"` | 10 màu chữ Notion (`gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`) hoặc alias |
| `size` | `TypographySize` | `undefined` | Kích thước chữ: `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`, `"2xl"`, `"3xl"`, `"4xl"` |
| `weight` | `TypographyWeight` | `undefined` | Độ đậm font: `"normal"`, `"medium"`, `"semibold"`, `"bold"` |
| `align` | `TypographyAlign` | `undefined` | Căn lề: `"left"`, `"center"`, `"right"`, `"justify"` |
| `mark` | `NotionMarkColor` | `undefined` | Đánh dấu highlight nền pastel theo 10 màu Notion (truyền `true` mặc định là vàng) |
| `code` | `boolean` | `false` | Bật định dạng inline code đỏ san hô `#eb5757` |
| `keyboard` | `boolean` | `false` | Bật định dạng phím bấm bàn phím `<kbd>` |
| `strong` | `boolean` | `false` | In đậm chữ (`font-semibold`) |
| `italic` | `boolean` | `false` | In nghiêng chữ (`italic`) |
| `underline`| `boolean` | `false` | Gạch chân chữ |
| `delete` | `boolean` | `false` | Gạch ngang chữ |
| `tabular` | `boolean` | `false` | Bật số đều đặn không nhảy khung (`font-variant-numeric: tabular-nums`) |
| `disabled`| `boolean` | `false` | Làm mờ và vô hiệu hóa tương tác |
| `copyable`| `boolean \| CopyConfig` | `undefined` | Bật tính năng sao chép vào Clipboard kèm icon phản hồi |
| `ellipsis`| `boolean \| EllipsisConfig` | `undefined` | Cắt ngắn văn bản khi vượt quá số dòng |

### 2. Biến Thể Quyết Định Theo `type` (Discriminated Union)
| `type` | Props đặc thù trong `props` | Mô tả |
| :--- | :--- | :--- |
| `"h1"` – `"h6"`, `"p"`, `"span"`, `"blockquote"`, `"code"`, `"kbd"` | `props?: HTMLAttributes<HTMLElement>` | Các thẻ HTML ngữ nghĩa tiêu chuẩn (mặc định là `"span"` nếu không truyền) |
| `"callout"` | `icon?: ReactNode`<br>`props?: HTMLAttributes<HTMLDivElement> & { icon?: ReactNode }` | Khối Callout Box ghi chú nổi bật với icon biểu tượng và nền pastel |
| `"a"` | `props?: Partial<LinkProps> & { external?: boolean; target?: string; rel?: string }` | Tích hợp Next.js `<Link>` cho điều hướng SPA nội bộ và liên kết ngoài |
