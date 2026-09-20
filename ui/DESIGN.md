# OpenWay Design System — Quy Chuẩn Thiết Kế & Toàn Bộ Component Tokens

> **Tài liệu kim chỉ nam (Single Source of Truth)** về phong cách thiết kế, bảng màu tokens (Light Mode & Dark Mode), typography, đổ bóng đa tầng, animation và quy chuẩn chi tiết cho **toàn bộ 36 component** trong thư viện `@openway/ui`. 
> Tài liệu được đối soát trực tiếp từ mã nguồn CSS đang chạy trên `openway.dev` (qua stylesheet của OpenWay) và hệ thống thiết kế phần mềm quản trị hiện đại.

---

## 1. Triết Lý Thiết Kế Cốt Lõi (OpenWay Design Philosophy)

OpenWay áp dụng triết lý thiết kế giao diện làm việc quản trị hiện đại nhờ 5 nguyên tắc cốt lõi:

1. **Content-First & Document-Centric (Nội dung là trung tâm)**:
   - Giao diện đóng vai trò là "tờ giấy trắng chất lượng cao", giảm thiểu tối đa các đường viền dày thô, màu sắc chói lọi hay họa tiết rườm rà.
   - Nội dung, dữ liệu bảng biểu và trường nhập liệu của người dùng luôn là điểm sáng nổi bật nhất.
2. **Warm Paper Aesthetics (Sắc ấm của giấy than chì)**:
   - **Tuyệt đối không dùng màu đen tuyền (`#000000`)** cho chữ, icon hay viền ở Light Mode.
   - Sử dụng sắc đen than chì pha ấm (`rgb(55, 53, 47)` - `#37352f`), kết hợp nền giấy ấm (`rgb(247, 246, 243)` - `#f7f6f3`). Điều này giúp mắt thư giãn tối đa khi làm việc 8–10 tiếng liên tục trên các ứng dụng quản trị.
3. **Subtle Depth & Layered Ambient Shadows (Độ nổi tự nhiên qua bóng đa tầng)**:
   - Thay vì 1 lớp bóng đổ mờ đơn điệu, OpenWay kết hợp **viền hairline siêu mảnh 1px bán trong suốt** cùng **2–3 lớp bóng môi trường (ambient light)** để các khối dropdown, popover, modal nổi êm ái trên mặt bàn.
4. **Crisp & Compact Geometry (Hình học gọn gàng, thanh thoát)**:
   - Bo góc thanh mảnh từ `3px` đến `8px` (tối đa `10px` cho modal), tuyệt đối tránh bo góc quá tròn (`rounded-2xl`, `rounded-3xl`) gây cảm giác thiếu chuyên nghiệp trong ứng dụng quản trị.
5. **Fluid Micro-Interactions & Stable Numerics (Tương tác mượt mà & Chữ số ổn định)**:
   - Chuyển động nhanh, dứt khoát (`120ms - 200ms`).
   - Mọi con số trong Bảng dữ liệu, OTP Input, Date/Time Picker đều sử dụng `font-variant-numeric: tabular-nums` để các chữ số có chiều rộng bằng nhau tuyệt đối, không bị nhảy giật khung hình khi thay đổi giá trị.

---

## 2. Hệ Thống Design Tokens Toàn Diện (Light & Dark Mode)

### 2.1. Bảng Màu Nền & Chữ Chế Độ Sáng (Light Mode - Warm Neutrals)

| Tên Token OpenWay | Tailwind Token | Mã RGB / RGBA | Mã Hex Tương Đương | Ứng Dụng Thực Tế |
| :--- | :--- | :--- | :--- | :--- |
| `--color-canvas` | `--color-neutral-white` | `rgb(255, 255, 255)` | `#ffffff` | Nền canvas chính, nền thẻ Card, nền ô Input |
| `--bg-color-1` | `--color-neutral-50` | `rgb(247, 246, 243)` | `#f7f6f3` | Nền Sidebar, Header Table, Box Callout, Dropzone nền |
| `--fg-color-0` | `--color-neutral-100` | `rgba(55, 53, 47, 0.09)` | `#ebeae8` | Viền phụ mỏng (Divider giữa các row, gạch ngăn cách) |
| `--fg-color-1` | `--color-neutral-200` | `rgba(55, 53, 47, 0.16)` | `#e3e2e0` | **Viền chính** (Border của Input, Card, Header cột Table) |
| `--border-strong`| `--color-neutral-300` | `rgba(55, 53, 47, 0.25)` | `#d3d1cb` | Viền hover, thumb thanh cuộn scrollbar, nét đứt upload |
| `--fg-color-2` | `--color-neutral-400` | `rgba(55, 53, 47, 0.40)` | `#9b9a97` | **Placeholder**, icon chưa kích hoạt, nhãn phụ footer |
| `--fg-color-3` | `--color-neutral-500` | `rgba(55, 53, 47, 0.65)` | `#787774` | **Chữ phụ (Secondary)**, mô tả helper text, ngày tháng |
| `--fg-color-dark`| `--color-neutral-700` | `rgb(69, 68, 63)` | `#45443f` | Nhãn Form Label, Section Header, Menu Group Header |
| `--fg-color` | `--color-neutral-900` | `rgb(55, 53, 47)` | `#37352f` | **Màu chữ chính (Primary Text)**, tiêu đề h1-h6, ô input |
| `--fg-color-hover`| — | `rgba(55, 53, 47, 0.08)` | `#f1f1ef` | **Nền Hover** cho Menu item, Row trong Table, Ghost button |
| `--fg-color-active`| — | `rgba(55, 53, 47, 0.12)` | `#e8e7e4` | Nền Active / Pressed khi nhấn giữ chuột |

### 2.2. Bảng Màu Chế Độ Tối Chuẩn OpenWay (Dark Mode)

OpenWay Dark Mode không dùng màu đen tuyền `#000000` mà sử dụng màu xám đen than chì đậm, chống chói mắt:

| Token | Mã RGB / RGBA | Mã Hex | Ứng Dụng Trong Dark Mode |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `rgb(25, 25, 25)` | `#191919` | Nền canvas chính |
| `--bg-color-1` | `rgb(38, 38, 38)` | `#262626` | Nền Sidebar, Header Table, Box Callout |
| `--bg-color-2` | `rgba(255, 255, 255, 0.055)` | `#232323` | Nền Hover của menu item, table row |
| `--fg-color` | `rgba(255, 255, 255, 0.90)` | `#ebebeb` | Màu chữ chính, tiêu đề |
| `--fg-color-3` | `rgba(255, 255, 255, 0.60)` | `#a4a4a4` | Chữ phụ, mô tả, helper text |
| `--fg-color-2` | `rgba(255, 255, 255, 0.44)` | `#737373` | Placeholder, icon mờ |
| `--fg-color-1` | `rgba(255, 255, 255, 0.13)` | `#2e2e2e` | Viền chính của Input, Table, Card |
| `--fg-color-0` | `rgba(255, 255, 255, 0.094)` | `#242424` | Viền phụ mỏng ngăn cách giữa các hàng |

### 2.3. Màu Tương Tác & Điểm Nhấn (OpenWay Interactive Blue)

| Token | Mã RGB / RGBA | Mã Hex | Ứng Dụng |
| :--- | :--- | :--- | :--- |
| `--color-primary-50` | `rgba(35, 131, 226, 0.07)` | `#edf5fc` | Nền row được chọn, ngày nằm trong dải DateRange, Dropzone dragover |
| `--color-primary-100`| `rgba(35, 131, 226, 0.15)` | `#d3e5f8` | Tag xanh lam nhạt, Badge thông tin |
| `--color-primary-500`| `rgb(35, 131, 226)` | `#2383e2` | **Nút bấm chính (Primary Action)**, Checkbox checked, Tab underline |
| `--color-primary-600`| `rgb(27, 110, 194)` | `#1b6ec2` | Hover của nút chính |
| `--color-primary-700`| `rgb(23, 87, 155)` | `#17579b` | Active / Pressed của nút chính |
| `--openway-focus-ring`| `rgba(35, 131, 226, 0.25)` | — | Vòng hào quang `focus-visible` hoặc `ring-2` khi focus form |

### 2.4. Bảng Màu Pastel Trạng Thái & Badges (OpenWay Status Palette)

OpenWay không bao giờ dùng màu neon chói mắt. Mọi màu trạng thái đều sử dụng công thức **Text đậm tương phản trên nền Pastel nhạt** (Light Mode) và **Text sáng trên nền tối đục** (Dark Mode):

| Trạng Thái | Light Text | Light Surface | Dark Text | Dark Surface |
| :--- | :--- | :--- | :--- | :--- |
| **Thành công (Success)** | `rgb(28, 56, 41)` (`#1c3829`) | `rgb(219, 237, 219)` (`#dbeddb`) | `rgb(108, 155, 125)` | `rgb(53, 76, 75)` |
| **Cảnh báo (Warning)** | `rgb(64, 44, 27)` (`#402c1b`) | `rgb(253, 236, 200)` (`#fdecc8`) | `rgb(203, 148, 51)` | `rgb(89, 86, 59)` |
| **Lỗi (Error / Danger)** | `rgb(93, 23, 21)` (`#5d1715`) | `rgb(255, 226, 221)` (`#ffe2dd`) | `rgb(225, 111, 100)` | `rgb(89, 65, 65)` |
| **Thông tin (Info / Blue)**| `rgb(11, 110, 153)` (`#0b6e99`) | `rgb(232, 244, 252)` (`#e8f4fc`) | `rgb(91, 151, 189)` | `rgb(54, 73, 84)` |
| **Tím (Purple / Category)**| `rgb(65, 36, 84)` (`#412454`) | `rgb(232, 222, 238)` (`#e8deee`) | `rgb(167, 130, 195)`| `rgb(68, 63, 87)` |
| **Xám (Neutral / Default)**| `rgb(50, 48, 44)` (`#32302c`) | `rgb(227, 226, 224)` (`#e3e2e0`) | `rgb(151, 154, 155)`| `rgb(69, 75, 78)` |

---

## 3. Hệ Thống Typography, Caret, Selection & Hình Học

### 3.1. Typography Scale & Tabular Nums

Hệ thống font ưu tiên: `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif`.

| Kích Thước | Cỡ Chữ (Font Size) | Chiều Cao Dòng (Line Height) | Độ Đậm (Font Weight) | Ứng Dụng |
| :--- | :--- | :--- | :--- | :--- |
| **xs** | `11px - 12px` | `16px` | 400 / 500 | Helper text, mô tả ngày giờ, tag badge nhỏ, hotkey hint |
| **sm** | `13px` (OpenWay standard) | `18px - 20px` | 400 / 500 | **Chữ trong ô Input**, ô Table cell, menu option, button nhỏ |
| **base / md** | `14px` | `20px - 22px` | 400 / 500 / 600 | Văn bản thường, Input size md, Button chuẩn, Label chính |
| **lg** | `16px` | `24px` | 600 | Tiêu đề nhóm, Subheader, Input size lg |
| **xl** | `18px - 20px` | `28px` | 600 / 700 | Tiêu đề Modal Header, Confirm Title |

- **Quy tắc Tabular Numbers**:
  ```css
  /* Bắt buộc cho Table, OtpInput, Timer, DatePicker, Badges có số */
  font-feature-settings: "tnum" 1;
  font-variant-numeric: tabular-nums;
  ```

### 3.2. Text Selection & Caret Color

```css
/* Màu bôi đen văn bản chuẩn OpenWay */
::selection {
  background: rgba(45, 170, 219, 0.3);
}

/* Con trỏ nhấp nháy chuẩn OpenWay */
input, textarea, [contenteditable="true"] {
  caret-color: rgb(55, 53, 47);
}
```

### 3.3. Hệ Thống Bo Góc (Border Radii)

```css
--radius-xs: 3px;      /* Checkbox, tag badge nhỏ, inline code */
--radius-sm: 4px;      /* Button nhỏ, menu option, sub-item, calendar cell */
--radius-md: 6px;      /* Button chuẩn, Input, TextArea, Select box, Callout */
--radius-lg: 8px;      /* Card, Dropdown menu, Popover panel, Calendar picker, Table */
--radius-xl: 10px;     /* Modal dialog, Confirm dialog */
--radius-full: 9999px; /* Avatar tròn, Switch toggle pill, Status dot */
```

### 3.4. Hệ Thống Đổ Bóng Đa Tầng (Layered Ambient Shadows)

```css
/* Popover, Dropdown Menu & Select Menu */
.shadow-openway-dropdown {
  box-shadow: 
    rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, 
    rgba(15, 15, 15, 0.10) 0px 3px 6px, 
    rgba(15, 15, 15, 0.06) 0px 9px 24px;
}

/* Modal & Dialog Hộp Thoại Nổi */
.shadow-openway-modal {
  box-shadow: 
    rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, 
    rgba(15, 15, 15, 0.10) 0px 4px 12px, 
    rgba(15, 15, 15, 0.20) 0px 24px 48px -8px;
}

/* Card, Floating Bar & Tooltip Outline */
.shadow-openway-card {
  box-shadow: 
    rgba(15, 15, 15, 0.08) 0px 0px 0px 1px, 
    rgba(15, 15, 15, 0.04) 0px 2px 4px;
}
```

### 3.5. Quy Tắc Focus-Visible (Chuột vs Bàn Phím)

Một đặc trưng cực kỳ tinh tế của OpenWay là **không bao giờ để dính viền xanh khi click chuột vào nút bấm hay menu item**:
```css
/* Loại bỏ outline khi click bằng chuột */
button:focus:not(:focus-visible),
[role="button"]:focus:not(:focus-visible),
[tabindex]:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}

/* CHỈ kích hoạt vòng hào quang ring-2 khi người dùng điều hướng bằng phím Tab */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(35, 131, 226, 0.35);
}
```

### 3.6. Thang Độ Cao Phân Tầng Hiển Thị (Z-Index Scale)

Tránh xung đột chồng lớp giữa các component:
```css
--z-sticky: 10;        /* Header cột Table, thanh dính */
--z-popover: 50;       /* Dropdown, Popover, Select menu */
--z-backdrop: 1000;    /* Backdrop mờ của Modal */
--z-modal: 1001;       /* Khung thoại Modal, Confirm dialog */
--z-toast: 1010;       /* Thông báo góc Toast */
--z-tooltip: 1020;     /* Tooltip luôn hiển thị trên cùng */
```

### 3.7. Quy Chuẩn Nét Vẽ Icon (Crisp Stroke Width)
- OpenWay sử dụng icons dạng outline thanh mảnh, tinh xảo: `stroke-width: 1.5px` (tối đa `1.75px`).
- Tuyệt đối không dùng icons có nét vẽ dày `2.5px - 3px` gây cảm giác nặng nề.
    rgba(15, 15, 15, 0.06) 0px 9px 24px;
}

/* Modal & Dialog Hộp Thoại Nổi */
.shadow-openway-modal {
  box-shadow: 
    rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, 
    rgba(15, 15, 15, 0.10) 0px 4px 12px, 
    rgba(15, 15, 15, 0.20) 0px 24px 48px -8px;
}

/* Card, Floating Bar & Tooltip Outline */
.shadow-openway-card {
  box-shadow: 
    rgba(15, 15, 15, 0.08) 0px 0px 0px 1px, 
    rgba(15, 15, 15, 0.04) 0px 2px 4px;
}
```

---

## 4. Hệ Thống Chuyển Động (Motion & Animation)

- **Đường cong gia tốc (Easing Curve)**:
  - Entrance / Popover mở ra: `cubic-bezier(0.16, 1, 0.3, 1)` (Swift Out: phản hồi tức thì, phanh êm dịu).
  - Exit / Đóng lại: `cubic-bezier(0.7, 0, 0.84, 0)`.
  - Micro-interaction (hover nút, viền focus): `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Thời lượng (Duration)**:
  - Hover / Active nút: `120ms - 150ms`.
  - Dropdown / Popover xuất hiện: `150ms - 180ms` (kèm `translateY(-4px)` -> `translateY(0)` và `opacity: 0 -> 1`).
  - Modal mở ra: `200ms - 220ms` (kèm `scale(0.97)` -> `scale(1)` và `opacity: 0 -> 1`).
  - Backdrop mờ: `200ms ease`.

---

## 5. Bảng Tra Cứu Kích Thước Toàn Diện (Sizing Matrix)

Áp dụng đồng nhất cho toàn bộ nhóm Form Controls (`Input`, `Select`, `Button`, `TextArea`, `OtpInput`):

| Kích Thước | Chiều Cao Ô (Height) | Padding Trái / Phải | Cỡ Chữ (Font Size) | Icon Kích Cỡ | Bo Góc Chuẩn |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **xs** | `24px` (`h-6`) | `px-2` | `11px` (`text-[11px]`) | `12px` (`size-3`) | `rounded-[4px]` |
| **sm** | `32px` (`h-8`) | `px-2.5` | `12px - 13px` (`text-xs`) | `14px` (`size-3.5`)| `rounded-[5px]` |
| **md** (Chuẩn) | `40px` (`h-10`) | `px-3.5` | `14px` (`text-sm`) | `18px` (`size-[18px]`)| `rounded-[6px]` |
| **lg** | `48px` (`h-12`) | `px-4` | `16px` (`text-base`)| `20px` (`size-5`) | `rounded-[6px]` |
| **xl** | `56px` (`h-14`) | `px-5` | `18px` (`text-lg`) | `24px` (`size-6`) | `rounded-[8px]` |

---

## 6. Quy Chuẩn Chi Tiết Toàn Bộ 35 Component Trong `@openway/ui`

### Nhóm 1: Form & Nhập Liệu (Inputs & Controls)

#### 1. `Input` (Text, Number, Password, Search)
- **Biến thể (Variants)**:
  - `outline` (Mặc định chuẩn OpenWay): Nền trắng `#ffffff`, viền `1px solid #e3e2e0`, chữ `#37352f`, placeholder `#9b9a97`.
  - `filled`: Nền `#f7f6f3`, viền `1px solid #ebeae8`, hover nền `#f1f1ef`, khi focus chuyển sang nền `#ffffff` và viền xanh `#2383e2`.
  - `ghost`: Nền trong suốt, không viền, hover `bg-[#f1f1ef]`, focus nền `#ffffff` có viền `#2383e2`.
- **Trạng thái (States)**:
  - **Rest**: Viền `border-[#e3e2e0]`, nền trắng, bóng phẳng.
  - **Hover**: Viền `#d3d1cb`.
  - **Focus-within**: Viền `#2383e2`, vòng hào quang `ring-2 ring-[#2383e2]/25` (sắc nét, không nhòe).
  - **Disabled**: Nền `#f7f6f3`, chữ `#9b9a97`, viền `#ebeae8`, con trỏ `cursor-not-allowed`, opacity `0.7`.
  - **ReadOnly**: Nền `#fcfbf9`, viền `#ebeae8`, con trỏ `cursor-default`.
  - **Error / Invalid**: Viền `#eb5757`, vòng hào quang `ring-2 ring-[#eb5757]/20`.
  - **Loading**: Hiện `Spinner` kích thước tương ứng, màu `#9b9a97 animate-spin`.
- **Addons & Icons**:
  - `leftIcon` / `rightIcon`: Màu `#9b9a97`, padding tự động đẩy input tương ứng (`pl-9`, `pr-9` cho md).
  - `leftAddon` / `rightAddon`: Nền `#f7f6f3`, viền `#e3e2e0`, chữ `#787774 text-xs font-medium px-3 flex items-center`.
  - `isClearable`: Nút `x` tròn nhỏ `hover:bg-[#ebeae8] hover:text-[#37352f] rounded-full p-0.5 transition-colors`.

#### 2. `MultiInput` (Tag / Chip Input)
- **Container**: Mang đầy đủ quy chuẩn về viền, nền và focus của `Input`.
- **Tags bên trong**:
  - Nền `#f7f6f3`, viền `1px solid #e3e2e0`, chữ `#37352f text-xs font-medium`, bo góc `rounded-[4px]`, padding `px-2 py-0.5`.
  - Nút xóa tag (x): Icon `size-3 text-[#9b9a97] hover:text-[#5d1715] hover:bg-[#ffe2dd] rounded-full p-0.5 ml-1 transition-colors`.
- **Ô nhập liệu tag**: Tự động co giãn theo nội dung, không viền, không outline.

#### 3. `OtpInput` (Mã xác thực từng ô)
- **Ô nhập từng ký tự**:
  - Kích thước ô vuông cân đối: xs `24x24px`, sm `32x32px`, md `40x40px`, lg `48x48px`, xl `56x56px`.
  - Chữ số căn giữa, font chữ `font-mono font-semibold text-base tabular-nums` (md).
  - Viền `1px solid #e3e2e0`, bo góc `rounded-[6px]`.
  - Khi focus: Viền `#2383e2` và vòng hào quang `ring-2 ring-[#2383e2]/25`. Khi có lỗi: Viền `#eb5757` và ring đỏ.

#### 4. `TextArea` (Ô nhập nhiều dòng, Auto-resize)
- **Container**: Nền `#ffffff`, viền `1px solid #e3e2e0`, bo góc `rounded-[6px]`, chữ `#37352f`, placeholder `#9b9a97`, padding `p-3`, khoảng cách dòng `leading-relaxed`.
- **Focus**: Viền `#2383e2` kết hợp `ring-2 ring-[#2383e2]/25`.
- **Resize options**:
  - `none`: Mặc định OpenWay (sạch sẽ, mở rộng tự động theo chiều cao nội dung `auto-resize`).
  - `vertical`: Cho phép kéo giãn theo chiều dọc với tay cầm góc dưới siêu mảnh.
- **Character Counter**: Hiển thị góc dưới bên phải, chữ `#9b9a97 text-[11px] tabular-nums`.
- **Thanh cuộn**: Tích hợp class `.ui-scrollbar` thanh mảnh 4px màu `#d3d1cb`.

#### 5. `FieldLabel` (Nhãn trường)
- **Typography**: `text-[#45443f] text-xs font-medium mb-1.5 select-none`.
- **Tương tác**: Khi ô input bên dưới được focus, nhãn tự động đổi màu sang xanh OpenWay `text-[#1b6ec2] transition-colors duration-150`.
- **Dấu sao bắt buộc (isRequired)**: Ký tự `*` màu `#eb5757 ml-1 font-normal`.

#### 6. `HelperErrorText` (Mô tả & Thông báo lỗi)
- **Helper text**: Màu `#787774 text-[11px] mt-1`.
- **Error message**: Màu `#eb5757 text-[11px] mt-1 flex items-center gap-1 font-normal animate-[errorSlideIn_150ms_ease]`.

#### 7. `Select` & 8. `MultiSelect`
- **Trigger Box**: Tương tự `Input`, có mũi tên ChevronDown màu `#787774 transition-transform duration-200`. Khi mở menu xoay `180deg`.
- **Menu Dropdown Panel**:
  - Nền `#ffffff`, bo góc `rounded-lg (8px)`, đổ bóng `.shadow-openway-dropdown`, viền `1px solid #e3e2e0`, padding `p-1`.
- **Ô Search bên trong Menu**:
  - Chiều cao `32px`, viền đáy `border-b border-[#ebeae8]`, nền trong suốt, placeholder "Tìm kiếm...".
- **Menu Item Option**:
  - Chiều cao `32px`, padding `px-2.5 py-1.5`, bo góc `rounded-[4px]`, chữ `#37352f text-xs`.
  - Hover: `bg-[#f1f1ef]`.
  - Selected: Nền `#edf5fc text-[#1b6ec2] font-medium`, có dấu CheckIcon màu `#2383e2` bên phải.
- **MultiSelect Tags**:
  - Hiển thị tags gọn gàng bên trong trigger, khi quá số lượng hiển thị huy hiệu `+N more` màu xám `#f7f6f3`.

#### 9. `Checkbox` & 10. `CheckboxGroup`
- **Kích thước**: `16x16px` (md), bo góc `rounded-[3px]`.
- **Chưa chọn (Unchecked)**: Nền trắng, viền `1.3px solid #d3d1cb hover:border-[#a5a29a] transition-colors`.
- **Đã chọn (Checked)**: Nền `#2383e2`, viền `#2383e2`, icon check màu trắng sắc nét `stroke-[2]`.
- **Lưng chừng (Indeterminate)**: Nền `#2383e2`, vạch ngang màu trắng ở giữa.
- **Nhãn đi kèm**: Màu `#37352f text-xs select-none cursor-pointer ml-2`.

#### 11. `Radio` & 12. `RadioGroup`
- **Kích thước**: `16x16px`, bo tròn hoàn toàn `rounded-full`.
- **Chưa chọn**: Nền trắng, viền `1.3px solid #d3d1cb hover:border-[#a5a29a]`.
- **Đã chọn**: Viền `#2383e2`, chấm tròn giữa đường kính `8px` màu `#2383e2`.

#### 13. `Toggle` (Switch)
- **Kích thước track**: sm `28x16px`, md `36x20px`, lg `44x24px`, bo tròn `rounded-full`.
- **Tắt (Off)**: Nền `#d3d1cb hover:bg-[#b8b5ad] transition-colors`.
- **Bật (On)**: Nền `#2383e2`.
- **Thumb tròn di chuyển**: Nền trắng `#ffffff`, đổ bóng nhẹ `rgba(15, 15, 15, 0.15) 0 1px 3px`, di chuyển mượt mà `transition-transform duration-150`.

#### 14. `Slider` (Thanh trượt)
- **Đường ray (Track)**: Cao `4px`, bo tròn `rounded-full`, nền `#e3e2e0`. Phần đã kéo có nền `#2383e2`.
- **Nút kéo (Thumb)**: Đường kính `16x16px`, nền trắng `#ffffff`, viền `1.3px solid #d3d1cb`, đổ bóng `.shadow-openway-card`, hover scale `1.1`, active viền `#2383e2`.
- **Tooltip giá trị**: Bong bóng nhỏ màu `#37352f text-white text-[10px] px-1.5 py-0.5 rounded-[3px] tabular-nums` nổi phía trên thumb khi kéo.

---

### Nhóm 2: Ngày & Giờ (Pickers)

#### 15. `DatePicker` & 16. `DateRangePicker`
- **Khung lịch (Calendar Popup)**: Nền trắng, bo góc `rounded-lg (8px)`, đổ bóng `.shadow-openway-dropdown`, viền `1px solid #e3e2e0`, padding `p-3`.
- **Header**: Tháng / Năm dạng `font-semibold text-sm text-[#37352f]`, 2 nút Prev/Next mũi tên hover `bg-[#f1f1ef] rounded-[4px] size-7`.
- **Thứ trong tuần (T2, T3...)**: Chữ `#9b9a97 text-xs font-medium text-center py-1`.
- **Ô ngày (Day Cell - 32x32px)**:
  - Ngày thường: Chữ `#37352f text-xs hover:bg-[#f1f1ef] rounded-[4px] cursor-pointer tabular-nums`.
  - Ngày hôm nay: Chữ đậm kèm vòng viền tròn mảnh `#e3e2e0`.
  - Ngày đang chọn (Selected): Nền `#2383e2 text-white font-medium rounded-[4px] shadow-xs`.
  - Khoảng giữa dải ngày (DateRange In-Between): Nền `#edf5fc text-[#1b6ec2] rounded-none`.
  - Ngày đầu / ngày cuối của dải: Nền `#2383e2 text-white rounded-l-[4px]` / `rounded-r-[4px]`.
- **Sidebar lối tắt nhanh (Presets)**: Hôm nay, Hôm qua, 7 ngày qua, 30 ngày qua, Tháng này (chữ `#787774 hover:bg-[#f1f1ef] text-xs p-2 rounded-[4px]`).

#### 17. `DateTimePicker` & 18. `DateTimeRangePicker`
- Thiết kế 2 ngăn: Bảng lịch bên trái và Cột chọn giờ bên phải, phân cách bởi đường viền mảnh `border-r border-[#ebeae8]`.

#### 19. `TimePicker` & 20. `TimeRangePicker`
- 3 cột Giờ / Phút / Giây rộng `56px`, cao tối đa `220px`, trang bị thanh cuộn mỏng `.ui-scrollbar`.
- Ô chọn giờ: Cao `30px`, chữ `#37352f text-xs hover:bg-[#f1f1ef] rounded-[4px] tabular-nums`. Ô đang chọn có nền `#edf5fc text-[#2383e2] font-semibold`.

---

### Nhóm 3: Hiển Thị Dữ Liệu & Bảng (Data Display)

#### 21. `Table` & 22. `DataTable` (Database View)
- **Container ngoài**: Nền trắng `#ffffff`, viền ngoài `1px solid #e3e2e0`, bo góc `rounded-lg (8px)`, ẩn phần tràn `overflow-hidden`.
- **Header Cột (`<thead>`)**:
  - Chiều cao `34px`, nền giấy ấm `#f7f6f3`, chữ `#787774 font-medium text-xs uppercase tracking-wider`.
  - Viền đáy: `border-b border-[#e3e2e0]`.
  - Đường kẻ phân cách cột: `border-r border-[#e3e2e0]/60` (nhẹ nhàng, giúp phân tách cột dữ liệu rõ ràng).
  - Icon Sort: Mũi tên xám `#9b9a97`, khi kích hoạt chuyển xanh `#2383e2`.
- **Hàng dữ liệu (`<tbody>`)**:
  - Chiều cao hàng: Compact `34px`, Standard `42px`.
  - Viền ngăn cách giữa các hàng: `border-b border-[#ebeae8]` (mảnh, dịu mắt).
  - Hover hàng: Đổi màu nền sang `rgba(55, 53, 47, 0.04)` (`#fcfbf9`).
  - Ô dữ liệu (`<td>`): Chữ `#37352f text-xs/14px px-3 py-2.5 align-middle tabular-nums`.
  - Cột Checkbox chọn hàng: Chiều rộng cố định `40px`, căn giữa. Hàng được chọn (selected) phủ lớp nền `#edf5fc/50`.
- **Phân trang (TablePagination)**:
  - Chiều cao `44px`, viền trên `border-t border-[#e3e2e0]`, nền trắng, text tóm tắt `#787774 text-xs tabular-nums`.
  - Nút chuyển trang: Nền trong suốt, hover `bg-[#f1f1ef] rounded-[4px] text-xs text-[#37352f] px-2.5 py-1`.

#### 23. `Badge` (Nhãn Trạng Thái & Thẻ Danh Mục)
- **Kiểu dáng**: Dạng viên thuốc `rounded-[4px] px-2 py-0.5 text-xs font-medium inline-flex items-center gap-1.5 tabular-nums`.
- **Variants**:
  - `soft` (Chuẩn OpenWay): Sử dụng trọn vẹn 6 màu Pastel ở Mục 2.4.
  - `solid`: Nền màu đậm, chữ trắng.
  - `outline`: Nền trong suốt, viền màu `1px solid`, chữ màu tương ứng.
  - `dot`: Có chấm tròn nhỏ `size-1.5 rounded-full` bên trái báo hiệu trạng thái hoạt động.

#### 24. `Alert` (Callout Box)
- **Thiết kế Callout chuẩn OpenWay**:
  - Nền giấy `#f7f6f3`, viền `1px solid #e3e2e0`, bo góc `rounded-md (6px)`, padding `p-3.5 flex items-start gap-3`.
  - Icon/Emoji bên trái: Kích cỡ `20px` nổi bật.
  - Tiêu đề Callout: `font-medium text-[#37352f] text-sm mb-0.5`.
  - Nội dung: `text-[#5f5e5b] text-xs leading-relaxed`.
  - Các biến thể: Info (nền `#edf5fc`), Success (nền `#dbeddb`), Warning (nền `#fdecc8`), Error (nền `#ffe2dd`).

#### 25. `Tooltip` (Gợi ý con trỏ)
- Nền đen than chì ấm `bg-[#37352f] text-white text-xs px-2.5 py-1 rounded-[4px] shadow-sm tracking-normal`. Mũi tên trỏ nhỏ `4px`.

#### 26. `Toast` (Thông báo nổi góc màn hình)
- Khung thông báo: Nền trắng `#ffffff`, bo góc `rounded-lg (8px)`, đổ bóng `.shadow-openway-modal`, viền `1px solid #e3e2e0`, padding `p-3.5 flex items-start gap-3 min-w-[320px]`.
- Thanh đếm thời gian (Progress bar): Mỏng `2px` đặt ở sát mép đáy thông báo, màu theo trạng thái.

#### 27. `Empty` (Trạng thái rỗng / Chưa có dữ liệu)
- Khung minh họa nét tối giản, bọc trong nền bo tròn `#f7f6f3 p-4 rounded-full mb-3 text-[#9b9a97]`.
- Tiêu đề: `font-medium text-sm text-[#37352f]`.
- Mô tả: `text-xs text-[#787774] max-w-xs text-center mb-3`.

#### 28. `Skeleton` (Hiệu ứng chờ tải Shimmer)
- Chu kỳ quét mờ `1.5s ease-in-out infinite` chuyển mượt từ `#ebeae8` sang `#f7f6f3` rồi quay lại `#ebeae8`. Bo góc đồng bộ với component tương ứng.

#### 29. `Collapse` (Khối thu gọn / Toggle List)
- **Header**: Icon tam giác xoay `0deg` -> `90deg` (`transition-transform duration-150`), chữ `font-medium text-sm text-[#37352f] hover:text-black`.
- **Nội dung bên trong**: Thụt lề trái `pl-5 border-l border-[#ebeae8] mt-1 pt-1`.

#### 30. `Tabs` (Thanh chuyển tab)
- **Underline variant (Chuẩn OpenWay)**:
  - Thanh gạch chân cao `2px` màu xanh OpenWay `#2383e2` trượt mượt mà dưới tab đang chọn.
  - Tab chưa chọn: Chữ `#787774 hover:text-[#37352f] font-medium text-xs px-3 py-2 transition-colors`.
  - Tab đang chọn: Chữ `#37352f font-semibold`.
- **Pill variant**: Tab đang chọn phủ nền xám `#ebeae8 text-[#37352f] rounded-[4px] px-3 py-1.5`.

---

### Nhóm 4: Hộp Thoại, Menu & Nút Bấm (Modals, Menus & Buttons)

#### 31. `Modal` & 32. `Confirm`
- **Backdrop phủ mờ**: `fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50 flex items-center justify-center p-4`.
- **Hộp thoại (Dialog Panel)**: Nền trắng `#ffffff`, bo góc `rounded-lg (8px) - rounded-[10px]`, đổ bóng `.shadow-openway-modal`, viền `1px solid rgba(55, 53, 47, 0.12)`.
- **Header**: `px-5 py-4 border-b border-[#ebeae8] flex items-center justify-between`. Tiêu đề `text-base font-semibold text-[#37352f]`.
- **ModalBody (Quy tắc căn lề chuẩn)**:
  - Cấu hình bắt buộc: `w-auto -mx-2 px-2 max-h-[calc(100vh-8rem)] overflow-y-auto ui-scrollbar`.
  - **Tác dụng**: Căn lề các ô input bên trong thẳng hàng 100% với Header, đồng thời nới rộng vùng cắt xén tràn lề thêm 8px giúp vòng hào quang `ring-2` không bao giờ bị cắt cụt viền.
- **Footer**: `px-5 py-3.5 border-t border-[#ebeae8] bg-[#fcfbf9] rounded-b-lg flex justify-end gap-2.5`.
- **Confirm Dialog**: Thiết kế tinh gọn, nút Xác nhận màu `#eb5757` (cho tác vụ Xóa/Nguy hiểm) hoặc `#2383e2` (cho tác vụ chuẩn).

#### 33. `Dropdown` & 34. `Popover`
- Panel nổi: Nền trắng, đổ bóng `.shadow-openway-dropdown`, bo góc `rounded-lg (8px)`, viền `1px solid #e3e2e0`, padding `p-1`.
- Menu Items: `px-2.5 py-1.5 text-xs text-[#37352f] hover:bg-[#f1f1ef] rounded-[4px] cursor-pointer flex items-center justify-between gap-3`.
- Phím tắt (Hotkey hints): `text-[10px] text-[#9b9a97] bg-[#f7f6f3] px-1.5 py-0.5 rounded border border-[#ebeae8] font-mono`.
- Divider ngăn cách: `h-px bg-[#ebeae8] my-1`.
- Mục Nguy hiểm (Danger Item): Chữ `#eb5757 hover:bg-[#ffe2dd]/60`.

#### 35. `Button` & `IconButton`
- **Biến thể (Variants)**:
  - `primary / solid`: Nền `#2383e2 hover:bg-[#1b6ec2] active:bg-[#17579b]`, chữ trắng, bo góc `rounded-[5px]`, `font-medium shadow-xs`.
  - `secondary / outline`: Nền trắng `#ffffff hover:bg-[#f7f6f3] active:bg-[#ebeae8]`, viền `1px solid #e3e2e0`, chữ `#37352f shadow-xs`.
  - `ghost`: Nền trong suốt, hover `bg-[rgba(55,53,47,0.08)]`, chữ `#37352f`.
  - `danger`: Nền `#eb5757 hover:bg-[#d63f3f] active:bg-[#be3131]`, chữ trắng, bo góc `rounded-[5px]`.
  - `link`: Nền trong suốt, chữ `#2383e2 hover:underline p-0`.
- **IconButton**: Khung vuông cân đối (`h-8 w-8`, `h-9 w-9`), bo góc `rounded-[4px]` hoặc tròn `rounded-full`.
- **Trạng thái Disabled**: `opacity-50 cursor-not-allowed pointer-events-none`.
- **Trạng thái Loading**: Ẩn icon cũ, hiện `Spinner` xoay đều, giữ nguyên kích thước nút bấm.

---

### Nhóm 5: Tải Lên & Quản Lý Tập Tin (Uploads & Media)

#### 36. `UploadFile` (Kéo thả tập tin)
- **Vùng Dropzone**: Nền `#f7f6f3/60`, viền nét đứt `border-2 border-dashed border-[#d3d1cb] hover:border-[#2383e2] hover:bg-[#edf5fc]/40 transition-all`, bo góc `rounded-lg (8px)`, padding `p-6 text-center`.
- **Khi kéo file đè lên (Drag Over)**: Viền `#2383e2`, nền `#edf5fc`, vòng hào quang `ring-4 ring-[#2383e2]/15`.
- **Danh sách file tải lên**: Mỗi file là một hàng chữ nhật bo góc `4px`, viền `#ebeae8`, gồm icon định dạng file, tên file `#37352f font-medium text-xs`, kích thước `#787774 text-[11px] tabular-nums`, thanh tiến trình xanh mỏng `2px`, và nút hủy.

#### 37. `UploadImage` (Kéo thả ảnh & Preview Grid)
- Khung tải ảnh dạng ô vuông tỉ lệ 1:1, bo góc `rounded-md (6px)`, viền nét đứt.
- Ảnh đã chọn hiển thị dạng lưới thumbnail với lớp phủ đen mờ `hover:bg-black/30` khi di chuột, nút xem ảnh lớn và nút xóa góc trên.

#### 38. `UploadAvatar` (Tải ảnh đại diện)
- Khung tròn hoàn toàn `rounded-full`, đường kính `80px - 96px`, viền `1px solid #e3e2e0`. Khi hover phủ lớp đen mờ `bg-black/40` cùng icon máy ảnh trắng và chữ "Đổi ảnh".

#### 39. `FilePreview` (Xem trước tài liệu / hình ảnh)
- Modal phóng to toàn màn hình: Lớp nền tối mờ `bg-black/75 backdrop-blur-sm`, khung xem tài liệu trắng tinh tế, thanh công cụ trên cùng gồm tên file, nút zoom, nút tải về và nút đóng.

#### 40. `Carousel` (Trình chiếu ảnh & nội dung)
- Khung trượt mượt mà `cubic-bezier(0.16, 1, 0.3, 1)`. Nút mũi tên điều hướng tròn nhỏ với nền trắng, đổ bóng `.shadow-openway-card`, chấm chỉ số (dots) nhỏ gọn `6x6px`, dot đang chọn kéo dài `w-4 bg-[#2383e2]`.

#### 41. `Typography` & `Text` (Hệ thống Văn bản & Khối nội dung chuẩn 100% Notion)
- **Unified Component**: Một component duy nhất hỗ trợ toàn bộ các biến thể qua prop `as` (`h1` - `h6`, `p`, `callout`, `blockquote`, `code`, `kbd`, `a`, `span`), kèm alias `Text = Typography`.
- **Bảng 10 Màu Chữ & Highlight Chuẩn Notion**: Default, Gray, Brown, Orange, Yellow, Green, Blue, Purple, Pink, Red.
- **Inline Code**: Chữ đỏ san hô `#eb5757` trên nền xám ấm nhẹ `rgba(135, 131, 120, 0.15)`, bo góc `3px`.
- **Quote Block**: Viền trái hairline `3px` than chì, lề đệm `pl-3.5`, font chữ nghiêng.
- **Callout Block**: Icon/Emoji bên trái + nội dung bên phải trên nền pastel 10 màu Notion, bo góc `6px`.
- **Tương tác**: `copyable` (icon check xác nhận), `editable` (inline edit), `ellipsis` (cắt dòng kèm xem thêm/thu gọn), `tabular` numbers.
- **Zen Hover Actions**: Các nút thao tác (copy/edit) ẩn mờ mặc định và chỉ hiện khi hover.

---

## 7. Toàn Bộ Mã Nguồn CSS Sẵn Sàng Triển Khai Vào `ui/src/styles.css`

Dưới đây là khối mã hoàn chỉnh cho Tailwind CSS v4 `@theme`, Dark Mode, Text Selection, Tabular Nums, Thanh cuộn cross-browser OpenWay và Animation Keyframes:

```css
@import "tailwindcss";

@theme {
  /* ================= OPENWAY TYPOGRAPHY STACK ================= */
  --font-sans: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif;
  --font-mono: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace;

  /* ================= OPENWAY WARM NEUTRALS ================= */
  --color-neutral-white: #ffffff;
  --color-neutral-50: #f7f6f3;   /* OpenWay Sidebar / Table Header / Dropzone */
  --color-neutral-100: #ebeae8;  /* OpenWay Hairline Border / Light Divider */
  --color-neutral-200: #e3e2e0;  /* OpenWay Main Border / Input Outline */
  --color-neutral-300: #d3d1cb;  /* OpenWay Strong Border / Scrollbar Thumb */
  --color-neutral-400: #9b9a97;  /* OpenWay Placeholder / Muted Icon */
  --color-neutral-500: #787774;  /* OpenWay Secondary Text / Subtitle / Helper */
  --color-neutral-600: #5f5e5b;  /* OpenWay Darker Helper Text */
  --color-neutral-700: #45443f;  /* OpenWay Form Label / Section Heading */
  --color-neutral-800: #3c3a35;  /* OpenWay Dark Neutral */
  --color-neutral-900: #37352f;  /* OpenWay Primary Text Body & Headings */
  --color-neutral-950: #20201d;  /* OpenWay Deep Charcoal */
  --color-neutral-black: #000000;

  /* ================= OPENWAY INTERACTIVE BLUE ================= */
  --color-primary-50: #edf5fc;   /* Light Blue Tint Selection */
  --color-primary-100: #d3e5f8;
  --color-primary-200: #a8ccf0;
  --color-primary-300: #73aee7;
  --color-primary-400: #4392de;
  --color-primary-500: #2383e2;   /* OpenWay Interactive Blue */
  --color-primary-600: #1b6ec2;   /* Blue Hover */
  --color-primary-700: #17579b;   /* Blue Active / Pressed */
  --color-primary-800: #14467d;
  --color-primary-900: #103761;
  --color-primary-950: #0a213b;

  /* ================= OPENWAY STATUS RED (ERROR) ================= */
  --color-error-50: #ffe2dd;    /* Pastel Error Background */
  --color-error-100: #fcd0c7;
  --color-error-200: #f7a394;
  --color-error-300: #f07762;
  --color-error-400: #eb5757;   /* Form Error Border / Icon */
  --color-error-500: #d63f3f;
  --color-error-600: #be3131;
  --color-error-700: #962525;
  --color-error-800: #7a1e1e;
  --color-error-900: #5d1715;   /* Error Text Dark */
  --color-error-950: #3a0d0c;

  /* ================= OPENWAY STATUS GREEN (SUCCESS) ================= */
  --color-success-50: #dbeddb;  /* Pastel Success Background */
  --color-success-100: #c2e2c2;
  --color-success-200: #93cfa3;
  --color-success-300: #65bc83;
  --color-success-400: #3da868;
  --color-success-500: #2a8a50;
  --color-success-600: #206d3f;
  --color-success-700: #1c5833;
  --color-success-800: #18482b;
  --color-success-900: #1c3829;  /* Success Text Dark */
  --color-success-950: #0e1e16;

  /* ================= OPENWAY STATUS ORANGE/YELLOW (WARNING) ================= */
  --color-warning-50: #fdecc8;  /* Pastel Warning Background */
  --color-warning-100: #fce2a6;
  --color-warning-200: #f8cb66;
  --color-warning-300: #f3b22b;
  --color-warning-400: #d99616;
  --color-warning-500: #b5760d;
  --color-warning-600: #925c08;
  --color-warning-700: #724707;
  --color-warning-800: #583609;
  --color-warning-900: #402c1b;  /* Warning Text Dark */
  --color-warning-950: #261a0f;
}

/* ================= OPENWAY GLOBAL STYLES ================= */
::selection {
  background-color: rgba(45, 170, 219, 0.3);
}

input, textarea {
  caret-color: rgb(55, 53, 47);
}

button:focus:not(:focus-visible),
[role="button"]:focus:not(:focus-visible),
[tabindex]:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}

.tabular-nums {
  font-feature-settings: "tnum" 1;
  font-variant-numeric: tabular-nums;
}

/* ================= OPENWAY LAYERED AMBIENT SHADOWS ================= */
.shadow-openway-dropdown {
  box-shadow: 
    rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, 
    rgba(15, 15, 15, 0.10) 0px 3px 6px, 
    rgba(15, 15, 15, 0.06) 0px 9px 24px;
}

.shadow-openway-modal {
  box-shadow: 
    rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, 
    rgba(15, 15, 15, 0.10) 0px 4px 12px, 
    rgba(15, 15, 15, 0.20) 0px 24px 48px -8px;
}

.shadow-openway-card {
  box-shadow: 
    rgba(15, 15, 15, 0.08) 0px 0px 0px 1px, 
    rgba(15, 15, 15, 0.04) 0px 2px 4px;
}

/* ================= OPENWAY CROSS-BROWSER SCROLLBAR ================= */
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(55, 53, 47, 0.2) transparent;
}

/* Chrome, Edge, Safari */
.ui-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.ui-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.ui-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(55, 53, 47, 0.2);
  border-radius: 9999px;
}

.ui-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(55, 53, 47, 0.35);
}

/* ================= OPENWAY ANIMATION KEYFRAMES ================= */
@keyframes errorSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-3px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes openwayFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes openwayDropdownIn {
  0% {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes openwaySpinner {
  to {
    transform: rotate(360deg);
  }
}

.animate-openway-dropdown {
  animation: openwayDropdownIn 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-openway-spinner {
  animation: openwaySpinner 0.6s linear infinite;
}
```
