# ⏳ TimeRangePicker Component Suite (`@openway/ui`)

Component **TimeRangePicker** toàn diện, trực quan và linh hoạt, được thiết kế theo chuẩn **Design System**, hỗ trợ **Chọn khoảng thời gian (Start Time - End Time) trên 2 bảng chọn song song**, **Tách bạch Định dạng Dữ liệu (`format`) & Hiển thị (`displayFormat`)**, **Tùy biến ký tự phân cách (`separator`)**, **Chế độ 12h (AM/PM) & 24h**, **Tùy chọn hiển thị giây (`showSeconds`)**, **Bước nhảy tùy biến (`hourStep`, `minuteStep`, `secondStep`)**, và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility** với hỗ trợ bàn phím thông minh.

---

## 🌟 Điểm nổi bật

- **Giao diện 2 Bảng chọn thời gian song song (Start Time & End Time)**:
  - Bố cục 2 cột nằm ngang (`flex-row divide-x`) giúp người dùng chọn thời gian bắt đầu và kết thúc một cách tự nhiên và liền mạch.
  - Tự động ràng buộc `minTime` của End Time theo Start Time đã chọn và ngược lại.
- **Tùy biến nhãn tiêu đề từng cột (`startLabel` & `endLabel`)**:
  - Mặc định là `"Start time"` và `"End time"`, có thể tùy biến thành `"Giờ bắt đầu"`, `"Giờ kết thúc"`...
- **Tùy biến ký tự phân cách (`separator`)**:
  - Mặc định là `' - '`, có thể tùy biến thành `' to '`, `' ~ '`...
- **Tách bạch giữa Dữ liệu (`format`) và Hiển thị (`displayFormat`)**:
  - `format` *(mặc định `'HH:mm:ss'`)*: Dữ liệu mảng phát ra qua `onChange` là `[string, string]` (ví dụ: `["08:00:00", "17:30:00"]`).
  - `displayFormat` *(tùy chọn)*: Định dạng hiển thị trong ô input (ví dụ: `08:00 AM - 05:30 PM`).
- **5 Kích thước tiêu chuẩn (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *mặc định*), `lg` (48px), `xl` (56px).
- **3 Biến thể giao diện (`variant`)**: `outline` *(mặc định)*, `filled`, `ghost`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`. Màu `warning` sử dụng chữ `text-neutral-950` tối ưu tương phản chuẩn **WCAG AA**.
- **6 Mức độ bo góc (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Vị trí đặt nhãn (`labelPlacement`)**: `top` *(mặc định)*, `left`, `floating`.

---

## 🚀 Cài đặt & Import

```tsx
import { TimeRangePicker } from "@openway/ui";
import type {
  TimeRangePickerProps,
  TimeRangePickerConfig,
  TimeRangeValue,
  TimeRange,
  TimeRangePickerSize,
  TimeRangePickerVariant,
  TimeRangePickerColor,
  TimeRangePickerRadius,
  LabelPlacement,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { useState } from "react";
import { TimeRangePicker } from "@openway/ui";

export function BasicTimeRangePickerExample() {
  const [range, setRange] = useState<[string, string] | null>(["08:00:00", "17:00:00"]);

  return (
    <TimeRangePicker
      label="Khung giờ làm việc"
      value={range}
      onChange={(formattedRange) => setRange(formattedRange)}
      placeholder="HH:mm:ss - HH:mm:ss"
    />
  );
}
```

---

### 2. Định dạng 12 giờ kèm AM / PM & Tùy biến nhãn

```tsx
<TimeRangePicker
  label="Khung giờ hoạt động"
  use12Hours={true}
  format="hh:mm A"
  startLabel="Giờ mở cửa"
  endLabel="Giờ đóng cửa"
  separator=" đến "
  defaultValue={["08:00 AM", "10:00 PM"]}
/>
```

---

### 3. Tắt giây & Bước nhảy 15 phút

```tsx
<TimeRangePicker
  label="Ca làm việc"
  showSeconds={false}
  minuteStep={15}
  format="HH:mm"
  defaultValue={["08:00", "17:30"]}
/>
```

---

### 4. Vị trí đặt nhãn (`labelPlacement`)

```tsx
// 1. Top (Phía trên - Mặc định)
<TimeRangePicker label="Khoảng thời gian" labelPlacement="top" />

// 2. Left (Ngang bên trái)
<TimeRangePicker label="Khoảng thời gian" labelPlacement="left" />

// 3. Floating (Lơ lửng trên viền)
<TimeRangePicker label="Khoảng thời gian" labelPlacement="floating" />
```

---

### 5. Trạng thái Form & Loading

```tsx
// Bắt buộc nhập (Required)
<TimeRangePicker label="Thời gian diễn ra" config={{ isRequired: true }} />

// Báo lỗi (Invalid)
<TimeRangePicker
  label="Khoảng thời gian"
  errorMessage="Thời gian bắt đầu không được lớn hơn thời gian kết thúc."
  config={{ isInvalid: true }}
/>

// Đang tải dữ liệu (Loading)
<TimeRangePicker
  label="Đang tải dữ liệu"
  config={{ isLoading: true, showSpinner: true }}
/>

// Vô hiệu hóa (Disabled) hoặc Chỉ đọc (ReadOnly)
<TimeRangePicker label="Không khả dụng" disabled={true} />
<TimeRangePicker label="Chỉ xem" readOnly={true} />
```

---

## ⌨️ Phím tắt điều hướng bàn phím (WAI-ARIA Keyboard Navigation)

| Vị trí | Phím bấm | Hành động |
| :--- | :--- | :--- |
| **Ô Input** | `ArrowDown` / `Enter` / `Space` | Mở popover và tự động chuyển tiêu điểm vào cột Start Time. |
| **Ô Input** | `Escape` | Đóng popover và giữ tiêu điểm tại ô Input. |
| **Bảng chọn (Popup)** | `ArrowDown` | Di chuyển xuống và chọn mốc thời gian tiếp theo. |
| **Bảng chọn (Popup)** | `ArrowUp` | Di chuyển lên và chọn mốc thời gian phía trước. |
| **Bảng chọn (Popup)** | `ArrowRight` | Chuyển tiêu điểm sang cột kế tiếp (Giờ $\rightarrow$ Phút $\rightarrow$ Giây $\rightarrow$ Bảng End Time). |
| **Bảng chọn (Popup)** | `ArrowLeft` | Chuyển tiêu điểm sang cột liền trước. |
| **Bảng chọn (Popup)** | `Home` | Nhảy nhanh về mốc đầu tiên. |
| **Bảng chọn (Popup)** | `End` | Nhảy nhanh về mốc cuối cùng. |
| **Bảng chọn (Popup)** | `Enter` / `Space` | Xác nhận chọn mốc thời gian đang focus. |
| **Bảng chọn (Popup)** | `Escape` | Đóng popover và trả lại tiêu điểm về ô Input. |

---

## 🛠 Bảng thông số Props

### `TimeRangePickerProps`

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `value` | `[TimeValue, TimeValue]` | — | Mảng khoảng thời gian đang chọn (Controlled). |
| `defaultValue` | `[TimeValue, TimeValue]` | — | Mảng khoảng thời gian mặc định ban đầu (Uncontrolled). |
| `onChange` | `(range: [string, string] \| null) => void` | — | Callback khi thay đổi khoảng thời gian (trả về `[start, end]` hoặc `null` khi xóa). |
| `format` | `string` | `'HH:mm:ss'` | Định dạng dữ liệu chính dùng cho input và đầu ra `onChange`. |
| `displayFormat` | `string` | Tự động | Định dạng chuỗi hiển thị trực quan trong ô input. |
| `separator` | `string` | `' - '` | Chuỗi ký tự phân cách giữa Start Time và End Time. |
| `startLabel` | `string` | `'Start time'` | Nhãn tiêu đề cột giờ bắt đầu. |
| `endLabel` | `string` | `'End time'` | Nhãn tiêu đề cột giờ kết thúc. |
| `use12Hours` | `boolean` | `false` | Bật chế độ 12 giờ kèm cột chọn AM / PM. |
| `showSeconds` | `boolean` | `true` | Hiển thị cột chọn giây. |
| `hourStep` | `number` | `1` | Bước nhảy cho cột Giờ. |
| `minuteStep` | `number` | `1` | Bước nhảy cho cột Phút. |
| `secondStep` | `number` | `1` | Bước nhảy cho cột Giây. |
| `minTime` | `TimeValue` | — | Thời gian nhỏ nhất cho phép chọn. |
| `maxTime` | `TimeValue` | — | Thời gian lớn nhất cho phép chọn. |
| `disabledHours` | `() => number[]` | — | Hàm trả về danh sách giờ bị vô hiệu hóa. |
| `disabledMinutes` | `(hour: number) => number[]` | — | Hàm trả về danh sách phút bị vô hiệu hóa. |
| `disabledSeconds` | `(h: number, m: number) => number[]` | — | Hàm trả về danh sách giây bị vô hiệu hóa. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích cỡ ô nhập liệu. |
| `variant` | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | Biến thể viền/nền của ô nhập. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Chủ đề màu sắc theo Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Độ bo góc của ô nhập và popover. |
| `label` | `ReactNode` | — | Nhãn tiêu đề hiển thị cho ô nhập liệu. |
| `labelPlacement` | `'top' \| 'left' \| 'floating'` | `'top'` | Vị trí hiển thị của nhãn. |
| `placeholder` | `string` | Tự động | Văn bản giữ chỗ khi ô input rỗng. |
| `placeholders` | `[string, string]` | — | Văn bản giữ chỗ riêng cho Start và End. |
| `helperText` | `ReactNode` | — | Đoạn văn bản hướng dẫn/trợ giúp bên dưới ô. |
| `errorMessage` | `ReactNode` | — | Thông báo lỗi (tự động bật viền đỏ và animation). |
| `disabled` | `boolean` | `false` | Khóa toàn bộ tương tác của ô nhập. |
| `readOnly` | `boolean` | `false` | Chỉ cho phép xem, không mở popover chọn giờ. |
| `config` | `TimeRangePickerConfig` | — | Nhóm cấu hình tập trung các cờ tính năng (xem bảng dưới). |
| `placement` | `Placement` | `'bottom-start'` | Vị trí mở popover chọn giờ (Floating UI). |
| `ref` | `Ref<HTMLInputElement>` | — | Ref chuyển tiếp tới thẻ `<input>` HTML bên dưới. |

---

### `TimeRangePickerConfig`

| Cờ thuộc tính | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Hiển thị dấu sao đỏ `*` và đánh dấu `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Bật trạng thái viền đỏ báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Khóa tương tác, bật `aria-busy="true"` và `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Hiển thị nút xóa nhanh khoảng thời gian đã chọn. |
| `isFullWidth` | `boolean` | `false` | Mở rộng chiếm toàn bộ 100% chiều ngang container cha. |
| `closeOnSelect` | `boolean` | `false` | Tự động đóng popover sau khi chọn xong cả 2 mốc. |
