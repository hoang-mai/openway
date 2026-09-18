# ⏰ TimePicker Component Suite (`@openway/ui`)

Bộ component **TimePicker**, **TimeView**, và **TimeColumn** toàn diện, linh hoạt và trực quan, được thiết kế theo chuẩn **Design System**, hỗ trợ **Chế độ 12h (AM/PM) & 24h**, **Tùy chọn hiển thị giây (`showSeconds`)**, **Bước nhảy tùy biến (`hourStep`, `minuteStep`, `secondStep`)**, **Tách bạch Định dạng Dữ liệu (`format`) & Hiển thị (`displayFormat`)**, **Giới hạn thời gian (`minTime`, `maxTime`)**, **Vô hiệu hóa giờ/phút/giây linh hoạt**, và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility** với hỗ trợ bàn phím thông minh.

---

## 🌟 Điểm nổi bật

- **Tách bạch giữa Dữ liệu (`format`) và Hiển thị (`displayFormat`)**:
  - `format` *(mặc định `'HH:mm:ss'`)*: Định dạng chuỗi thời gian chuẩn lưu trữ và phát ra qua `onChange` (ví dụ: `"14:30:00"`).
  - `displayFormat` *(tùy chọn)*: Định dạng trực quan hiển thị trên ô nhập liệu (ví dụ: `"02:30:00 PM"`).
- **Chế độ 12 giờ / 24 giờ linh hoạt (`use12Hours`)**:
  - Tự động chuyển đổi giữa 24h chuẩn (`00` - `23`) và 12h kèm cột chọn `AM` / `PM`.
- **Tùy chọn hiển thị Giây (`showSeconds`) & Bước nhảy (`Step`)**:
  - Bật/tắt cột giây dễ dàng với `showSeconds={false}`.
  - Tùy chỉnh bước nhảy số phút (`minuteStep={15}`), số giờ (`hourStep={2}`)...
- **Cột cuộn thông minh (Auto-Scroll & WAI-ARIA Focus Management)**:
  - Tự động cuộn mượt mà (`smooth`) đến vị trí giá trị đang chọn khi mở popover.
  - Chuyển tiêu điểm (focus) tự động vào cột thời gian khi mở popup bằng bàn phím.
  - Hỗ trợ đầy đủ phím mũi tên `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Home`, `End`, `Enter`, `Escape`.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *mặc định*), `lg` (48px), `xl` (56px).
- **3 Biến thể giao diện (`variant`)**: `outline` *(mặc định)*, `filled`, `ghost`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`. Màu `warning` sử dụng chữ `text-neutral-950` tối ưu tương phản chuẩn **WCAG AA**.
- **6 Mức độ bo góc (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Vị trí đặt nhãn (`labelPlacement`)**: `top` *(mặc định)*, `left`, `floating`.
- **Standalone `<TimeView>`**: Có thể nhúng trực tiếp bảng chọn giờ tĩnh trên giao diện.

---

## 🚀 Cài đặt & Import

```tsx
import { TimePicker, TimeView, TimeColumn } from "@openway/ui";
import type {
  TimePickerProps,
  TimePickerConfig,
  TimeViewProps,
  TimeColumnProps,
  TimeValue,
  TimePickerSize,
  TimePickerVariant,
  TimePickerColor,
  TimePickerRadius,
  LabelPlacement,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { useState } from "react";
import { TimePicker } from "@openway/ui";

export function BasicTimePickerExample() {
  const [time, setTime] = useState<string | null>("14:30:00");

  return (
    <TimePicker
      label="Giờ hẹn"
      value={time}
      onChange={(formattedTime) => setTime(formattedTime)}
      placeholder="HH:mm:ss"
    />
  );
}
```

---

### 2. Chế độ 12 giờ với AM / PM

```tsx
<TimePicker
  label="Giờ bắt đầu cuộc họp"
  use12Hours={true}
  format="hh:mm:ss A"
  defaultValue="09:15:00 AM"
/>
```

---

### 3. Tắt hiển thị giây (`showSeconds={false}`) & Tùy chỉnh bước nhảy (`minuteStep`)

```tsx
<TimePicker
  label="Khung giờ đặt bàn"
  showSeconds={false}
  minuteStep={15} // Chỉ hiển thị các mốc phút: 00, 15, 30, 45
  format="HH:mm"
  placeholder="HH:mm"
/>
```

---

### 4. Giới hạn khoảng thời gian (`minTime` & `maxTime`)

```tsx
<TimePicker
  label="Giờ làm việc"
  minTime="08:00:00"
  maxTime="17:30:00"
  helperText="Chỉ cho phép chọn từ 08:00 đến 17:30"
/>
```

---

### 5. Standalone `<TimeView>` (Bảng chọn giờ độc lập)

```tsx
import { useState } from "react";
import { TimeView } from "@openway/ui";

export function StandaloneTimeViewExample() {
  const [time, setTime] = useState<Date>(new Date());

  return (
    <TimeView
      value={time}
      onChange={(newDate) => setTime(newDate)}
      showSeconds={true}
      color="primary"
    />
  );
}
```

---

### 6. Vị trí đặt nhãn (`labelPlacement`)

```tsx
// 1. Top (Phía trên - Mặc định)
<TimePicker label="Thời gian diễn ra" labelPlacement="top" />

// 2. Left (Ngang bên trái)
<TimePicker label="Thời gian diễn ra" labelPlacement="left" />

// 3. Floating (Lơ lửng trên viền)
<TimePicker label="Thời gian diễn ra" labelPlacement="floating" />
```

---

### 7. Trạng thái Form & Loading

```tsx
// Bắt buộc nhập (Required)
<TimePicker label="Giờ xuất phát" config={{ isRequired: true }} />

// Báo lỗi (Invalid)
<TimePicker
  label="Giờ hẹn"
  errorMessage="Vui lòng chọn thời gian hợp lệ."
  config={{ isInvalid: true }}
/>

// Đang tải dữ liệu (Loading)
<TimePicker
  label="Đang tải dữ liệu"
  config={{ isLoading: true, showSpinner: true }}
/>

// Vô hiệu hóa (Disabled) hoặc Chỉ đọc (ReadOnly)
<TimePicker label="Không khả dụng" disabled={true} />
<TimePicker label="Chỉ xem" readOnly={true} />
```

---

## ⌨️ Phím tắt điều hướng bàn phím (WAI-ARIA Keyboard Navigation)

| Vị trí | Phím bấm | Hành động |
| :--- | :--- | :--- |
| **Ô Input** | `ArrowDown` / `Enter` / `Space` | Mở popover và tự động chuyển tiêu điểm vào cột Giờ. |
| **Ô Input** | `Escape` | Đóng popover và giữ tiêu điểm tại ô Input. |
| **Bảng chọn (Popup)** | `ArrowDown` | Di chuyển xuống và chọn mốc thời gian tiếp theo. |
| **Bảng chọn (Popup)** | `ArrowUp` | Di chuyển lên và chọn mốc thời gian phía trước. |
| **Bảng chọn (Popup)** | `ArrowRight` | Chuyển tiêu điểm sang cột kế tiếp (Giờ $\rightarrow$ Phút $\rightarrow$ Giây $\rightarrow$ AM/PM). |
| **Bảng chọn (Popup)** | `ArrowLeft` | Chuyển tiêu điểm sang cột liền trước. |
| **Bảng chọn (Popup)** | `Home` | Nhảy nhanh về mốc đầu tiên (ví dụ: `00`). |
| **Bảng chọn (Popup)** | `End` | Nhảy nhanh về mốc cuối cùng (ví dụ: `23` hoặc `59`). |
| **Bảng chọn (Popup)** | `Enter` / `Space` | Xác nhận chọn mốc thời gian đang focus. |
| **Bảng chọn (Popup)** | `Escape` | Đóng popover và trả lại tiêu điểm về ô Input. |

---

## 🛠 Bảng thông số Props

### `TimePickerProps`

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `value` | `TimeValue` | — | Giá trị thời gian đang được chọn (Controlled). |
| `defaultValue` | `TimeValue` | — | Giá trị thời gian mặc định ban đầu (Uncontrolled). |
| `onChange` | `(time: string \| null) => void` | — | Callback khi giá trị thời gian thay đổi (trả về chuỗi theo `format`, hoặc `null` khi xóa). |
| `format` | `string` | `'HH:mm:ss'` | Định dạng dữ liệu chính dùng cho cả input và đầu ra `onChange`. |
| `displayFormat` | `string` | Tự động | Định dạng chuỗi hiển thị trực quan trong ô input. |
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
| `readOnly` | `boolean` | `false` | Chỉ cho phép xem, không mở popover chọn giờ. |
| `config` | `TimePickerConfig` | — | Nhóm cấu hình tập trung các cờ tính năng (xem bảng dưới). |
| `placement` | `Placement` | `'bottom-start'` | Vị trí mở popover chọn giờ (Floating UI). |
| `ref` | `Ref<HTMLInputElement>` | — | Ref chuyển tiếp tới thẻ `<input>` HTML bên dưới. |

---

### `TimePickerConfig`

| Cờ thuộc tính | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Hiển thị dấu sao đỏ `*` và đánh dấu `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Bật trạng thái viền đỏ báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Khóa tương tác, bật `aria-busy="true"` và `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Hiển thị nút xóa nhanh thời gian đã chọn. |
| `isFullWidth` | `boolean` | `false` | Mở rộng chiếm toàn bộ 100% chiều ngang container cha. |
| `closeOnSelect` | `boolean` | `false` | Tự động đóng popover sau khi người dùng chọn xong (mặc định `false` cho TimePicker để chọn đủ các cột). |
