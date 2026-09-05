# 📅⏰ DateTimePicker Component Suite (`@owa/ui`)

Component **DateTimePicker** toàn diện, linh hoạt và trực quan, được thiết kế theo chuẩn **Design System**, hỗ trợ **Chọn đồng thời Ngày và Giờ trên một giao diện thống nhất**, **2 Bố cục hiển thị linh hoạt (`side-by-side` và `stacked`)**, **Tách bạch Định dạng Dữ liệu (`format`) & Hiển thị (`displayFormat`)**, **Chế độ 12h (AM/PM) & 24h**, **Tùy chọn hiển thị giây (`showSeconds`)**, **Bước nhảy tùy biến (`hourStep`, `minuteStep`, `secondStep`)**, **Giới hạn ngày giờ (`minDate`, `maxDate`, `minTime`, `maxTime`)**, và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility** với hỗ trợ bàn phím thông minh.

---

## 🌟 Điểm nổi bật

- **Tách bạch giữa Dữ liệu (`format`) và Hiển thị (`displayFormat`)**:
  - `format` *(mặc định `'DD/MM/YYYY HH:mm:ss'`)*: Định dạng chuỗi ngày giờ chuẩn lưu trữ và phát ra qua `onChange` (ví dụ: `"25/12/2026 14:30:00"`).
  - `displayFormat` *(tùy chọn)*: Định dạng trực quan hiển thị trên ô nhập liệu (ví dụ: `"25/12/2026 02:30:00 PM"`).
- **2 Bố cục popover linh hoạt (`layout`)**:
  - `side-by-side` *(mặc định)*: Lịch ngày (`Calendar`) và Cột giờ (`TimeView`) nằm ngang cạnh nhau.
  - `stacked`: Lịch ngày nằm phía trên, Cột giờ nằm phía dưới theo chiều dọc.
- **Chế độ 12 giờ / 24 giờ linh hoạt (`use12Hours`)**:
  - Tự động chuyển đổi giữa 24h chuẩn (`00` - `23`) và 12h kèm cột chọn `AM` / `PM`.
- **Tùy chọn hiển thị Giây (`showSeconds`) & Bước nhảy (`Step`)**:
  - Bật/tắt cột giây dễ dàng với `showSeconds={false}`.
  - Tùy chỉnh bước nhảy số phút (`minuteStep={15}`), số giờ (`hourStep={2}`)...
- **Quản lý Tiêu điểm & Điều hướng Bàn phím Thông minh (WAI-ARIA Focus Management)**:
  - Tự động chuyển tiêu điểm vào Lịch khi mở popover bằng bàn phím (`Enter`, `Space`, `ArrowDown`).
  - Hỗ trợ đầy đủ phím mũi tên `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Home`, `End`, `Enter`, `Escape`.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *mặc định*), `lg` (48px), `xl` (56px).
- **3 Biến thể giao diện (`variant`)**: `outline` *(mặc định)*, `filled`, `ghost`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`. Màu `warning` sử dụng chữ `text-neutral-950` tối ưu tương phản chuẩn **WCAG AA**.
- **6 Mức độ bo góc (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Vị trí đặt nhãn (`labelPlacement`)**: `top` *(mặc định)*, `left`, `floating`.

---

## 🚀 Cài đặt & Import

```tsx
import { DateTimePicker } from "@owa/ui";
import type {
  DateTimePickerProps,
  DateTimePickerConfig,
  DateTimeValue,
  DateTimePickerSize,
  DateTimePickerVariant,
  DateTimePickerColor,
  DateTimePickerRadius,
  DateTimePickerLayout,
  LabelPlacement,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { useState } from "react";
import { DateTimePicker } from "@owa/ui";

export function BasicDateTimePickerExample() {
  const [datetime, setDatetime] = useState<string | null>("25/12/2026 14:30:00");

  return (
    <DateTimePicker
      label="Thời gian diễn ra"
      value={datetime}
      onChange={(newVal) => setDatetime(newVal)}
      placeholder="DD/MM/YYYY HH:mm:ss"
    />
  );
}
```

---

### 2. Chế độ 12 giờ với AM / PM

```tsx
<DateTimePicker
  label="Lịch họp"
  use12Hours={true}
  format="DD/MM/YYYY hh:mm:ss A"
  defaultValue="25/12/2026 09:15:00 AM"
/>
```

---

### 3. Bố cục xếp chồng dọc (`layout="stacked"`)

```tsx
<DateTimePicker
  label="Chọn ngày giờ"
  layout="stacked"
  showSeconds={false}
  minuteStep={15}
/>
```

---

### 4. Giới hạn khoảng ngày và giờ (`minDate`, `maxDate`)

```tsx
<DateTimePicker
  label="Hạn chót nộp bài"
  minDate={new Date()}
  maxDate="2026-12-31"
  helperText="Chỉ cho phép chọn trong năm nay"
/>
```

---

### 5. Vị trí đặt nhãn (`labelPlacement`)

```tsx
// 1. Top (Phía trên - Mặc định)
<DateTimePicker label="Thời gian sự kiện" labelPlacement="top" />

// 2. Left (Ngang bên trái)
<DateTimePicker label="Thời gian sự kiện" labelPlacement="left" />

// 3. Floating (Lơ lửng trên viền)
<DateTimePicker label="Thời gian sự kiện" labelPlacement="floating" />
```

---

### 6. Trạng thái Form & Loading

```tsx
// Bắt buộc nhập (Required)
<DateTimePicker label="Thời gian hẹn" config={{ isRequired: true }} />

// Báo lỗi (Invalid)
<DateTimePicker
  label="Thời gian hẹn"
  errorMessage="Vui lòng chọn thời gian hợp lệ."
  config={{ isInvalid: true }}
/>

// Đang tải dữ liệu (Loading)
<DateTimePicker
  label="Đang đồng bộ"
  config={{ isLoading: true, showSpinner: true }}
/>

// Vô hiệu hóa (Disabled) hoặc Chỉ đọc (ReadOnly)
<DateTimePicker label="Không khả dụng" disabled={true} />
<DateTimePicker label="Chỉ xem" readOnly={true} />
```

---

## ⌨️ Phím tắt điều hướng bàn phím (WAI-ARIA Keyboard Navigation)

| Vị trí | Phím bấm | Hành động |
| :--- | :--- | :--- |
| **Ô Input** | `ArrowDown` / `Enter` / `Space` | Mở popover và tự động chuyển tiêu điểm vào ô Ngày trong Lịch. |
| **Ô Input** | `Escape` | Đóng popover và giữ tiêu điểm tại ô Input. |
| **Bảng Lịch (Calendar)** | `ArrowRight` / `ArrowLeft` | Di chuyển sang ngày kế tiếp (+1) hoặc ngày liền trước (-1). |
| **Bảng Lịch (Calendar)** | `ArrowDown` / `ArrowUp` | Di chuyển xuống tuần sau (+7) hoặc lên tuần trước (-7). |
| **Bảng Lịch (Calendar)** | `Home` / `End` | Nhảy về ngày đầu tuần hoặc cuối tuần. |
| **Bảng Lịch (Calendar)** | `Enter` / `Space` | Chọn ngày đang focus (kết hợp với thời gian hiện tại). |
| **Cột Giờ (TimeView)** | `ArrowDown` / `ArrowUp` | Tăng / giảm mốc giờ, phút, giây. |
| **Cột Giờ (TimeView)** | `ArrowRight` / `ArrowLeft` | Chuyển tiêu điểm giữa các cột (Giờ $\rightarrow$ Phút $\rightarrow$ Giây $\rightarrow$ AM/PM). |
| **Cột Giờ (TimeView)** | `Home` / `End` | Nhảy về mốc đầu tiên hoặc cuối cùng của cột. |
| **Popover** | `Escape` | Đóng popover và trả lại tiêu điểm về ô Input. |

---

## 🛠 Bảng thông số Props

### `DateTimePickerProps`

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `value` | `DateTimeValue` | — | Giá trị ngày giờ đang chọn (Controlled). |
| `defaultValue` | `DateTimeValue` | — | Giá trị ngày giờ mặc định ban đầu (Uncontrolled). |
| `onChange` | `(date: string \| null) => void` | — | Callback khi giá trị ngày giờ thay đổi (trả về chuỗi theo `format`, hoặc `null` khi xóa). |
| `format` | `string` | `'DD/MM/YYYY HH:mm:ss'` | Định dạng dữ liệu chính dùng cho cả input và đầu ra `onChange`. |
| `displayFormat` | `string` | Tự động | Định dạng chuỗi hiển thị trực quan trong ô input. |
| `layout` | `'side-by-side' \| 'stacked'` | `'side-by-side'` | Bố cục hiển thị bảng chọn trong popover. |
| `locale` | `'vi' \| 'en' \| LocaleConfig` | `'vi'` | Cấu hình ngôn ngữ quốc tế hóa. |
| `use12Hours` | `boolean` | `false` | Bật chế độ 12 giờ kèm cột chọn AM / PM. |
| `showSeconds` | `boolean` | `true` | Hiển thị cột chọn giây. |
| `hourStep` | `number` | `1` | Bước nhảy cho cột Giờ. |
| `minuteStep` | `number` | `1` | Bước nhảy cho cột Phút. |
| `secondStep` | `number` | `1` | Bước nhảy cho cột Giây. |
| `minDate` | `Date \| string` | — | Ngày nhỏ nhất cho phép chọn. |
| `maxDate` | `Date \| string` | — | Ngày lớn nhất cho phép chọn. |
| `isDateDisabled` | `(date: Date) => boolean` | — | Hàm kiểm tra vô hiệu hóa ngày tùy biến. |
| `minTime` | `TimeValue` | — | Thời gian nhỏ nhất cho phép chọn. |
| `maxTime` | `TimeValue` | — | Thời gian lớn nhất cho phép chọn. |
| `disabledHours` | `() => number[]` | — | Hàm trả về danh sách giờ bị vô hiệu hóa. |
| `disabledMinutes` | `(h: number) => number[]` | — | Hàm trả về danh sách phút bị vô hiệu hóa. |
| `disabledSeconds` | `(h: number, m: number) => number[]` | — | Hàm trả về danh sách giây bị vô hiệu hóa. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích cỡ ô nhập liệu và bảng chọn. |
| `variant` | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | Biến thể viền/nền của ô nhập. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Chủ đề màu sắc theo Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Độ bo góc của ô nhập và popover. |
| `label` | `ReactNode` | — | Nhãn tiêu đề hiển thị cho ô nhập liệu. |
| `labelPlacement` | `'top' \| 'left' \| 'floating'` | `'top'` | Vị trí hiển thị của nhãn. |
| `placeholder` | `string` | Tự động | Văn bản giữ chỗ khi ô input rỗng. |
| `helperText` | `ReactNode` | — | Đoạn văn bản hướng dẫn/trợ giúp bên dưới ô. |
| `errorMessage` | `ReactNode` | — | Thông báo lỗi (tự động bật viền đỏ và animation). |
| `disabled` | `boolean` | `false` | Khóa toàn bộ tương tác của ô nhập. |
| `readOnly` | `boolean` | `false` | Chỉ cho phép xem, không mở popover chọn ngày giờ. |
| `config` | `DateTimePickerConfig` | — | Nhóm cấu hình tập trung các cờ tính năng (xem bảng dưới). |
| `placement` | `Placement` | `'bottom-start'` | Vị trí mở popover chọn ngày giờ (Floating UI). |
| `ref` | `Ref<HTMLInputElement>` | — | Ref chuyển tiếp tới thẻ `<input>` HTML bên dưới. |

---

### `DateTimePickerConfig`

| Cờ thuộc tính | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Hiển thị dấu sao đỏ `*` và đánh dấu `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Bật trạng thái viền đỏ báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Khóa tương tác, bật `aria-busy="true"` và `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Hiển thị nút xóa nhanh ngày giờ đã chọn. |
| `isFullWidth` | `boolean` | `false` | Mở rộng chiếm toàn bộ 100% chiều ngang container cha. |
| `closeOnSelect` | `boolean` | `false` | Tự động đóng popover sau khi chọn (mặc định `false` để chọn cả ngày và giờ). |
| `showWeekNumbers` | `boolean` | `false` | Hiển thị cột số thứ tự tuần trong bảng lịch. |
| `showViewTabs` | `boolean` | `false` | Hiển thị thanh Tab Ngày / Tháng / Năm trên lịch. |
