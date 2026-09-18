# 📅⏳ DateTimeRangePicker Component Suite (`@openway/ui`)

Component **DateTimeRangePicker** toàn diện, linh hoạt và tiện dụng, được thiết kế theo chuẩn **Design System**, hỗ trợ **Chọn khoảng Ngày & Giờ (Start - End) với cơ chế Chuyển bước (Stepped Selection)** giúp giao diện popover luôn nhỏ gọn, vừa vặn trên mọi màn hình, **Tách bạch Định dạng Dữ liệu (`format`) & Hiển thị (`displayFormat`)**, **Chế độ 12h (AM/PM) & 24h**, **Tùy chọn hiển thị giây (`showSeconds`)**, **Bước nhảy tùy biến (`hourStep`, `minuteStep`, `secondStep`)**, **Tự động ràng buộc `minDate` / `minTime` giữa 2 mốc**, và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Cơ chế Chuyển bước thông minh (Stepped Navigation Buttons)**:
  - Thay vì hiển thị 2 bảng lịch + 2 bảng giờ cồng kềnh (chiếm hơn 800px), DateTimeRangePicker hiển thị 1 bảng chọn tại một thời điểm.
  - Phía trên có thanh tóm tắt `[ 1. Start: ... ]` và `[ 2. End: ... ]` cho phép click nhảy trực tiếp.
  - Phía dưới có 2 nút chuyển đổi tiện lợi `[ ← Bắt đầu ]` và `[ Kết thúc → ]` kèm nút `Áp dụng`.
- **Tách bạch giữa Dữ liệu (`format`) và Hiển thị (`displayFormat`)**:
  - `format` *(mặc định `'DD/MM/YYYY HH:mm:ss'`)*: Dữ liệu mảng phát ra qua `onChange` là `[string, string]` (ví dụ: `["25/08/2026 08:00:00", "28/08/2026 17:30:00"]`).
  - `displayFormat` *(tùy chọn)*: Định dạng hiển thị trực quan trong ô input (ví dụ: `"25/08/2026 08:00 AM - 28/08/2026 05:30 PM"`).
- **2 Bố cục popover linh hoạt (`layout`)**:
  - `side-by-side` *(mặc định)*: Lịch ngày (`Calendar`) và Cột giờ (`TimeView`) nằm ngang cạnh nhau.
  - `stacked`: Lịch ngày nằm phía trên, Cột giờ nằm phía dưới theo chiều dọc.
- **Tự động ràng buộc tính hợp lệ giữa 2 mốc**:
  - Khi chọn mốc kết thúc (`End`), các ngày và giờ trước mốc bắt đầu (`Start`) sẽ tự động bị vô hiệu hóa.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *mặc định*), `lg` (48px), `xl` (56px).
- **3 Biến thể giao diện (`variant`)**: `outline` *(mặc định)*, `filled`, `ghost`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`. Màu `warning` sử dụng chữ `text-neutral-950` tối ưu tương phản chuẩn **WCAG AA**.
- **6 Mức độ bo góc (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Vị trí đặt nhãn (`labelPlacement`)**: `top` *(mặc định)*, `left`, `floating`.

---

## 🚀 Cài đặt & Import

```tsx
import { DateTimeRangePicker } from "@openway/ui";
import type {
  DateTimeRangePickerProps,
  DateTimeRangePickerConfig,
  DateTimeRangeValue,
  DateTimeRange,
  DateTimeRangePickerSize,
  DateTimeRangePickerVariant,
  DateTimeRangePickerColor,
  DateTimeRangePickerRadius,
  DateTimeRangePickerLayout,
  LabelPlacement,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { useState } from "react";
import { DateTimeRangePicker } from "@openway/ui";

export function BasicDateTimeRangePickerExample() {
  const [range, setRange] = useState<[string, string] | null>([
    "25/08/2026 08:00:00",
    "28/08/2026 17:30:00",
  ]);

  return (
    <DateTimeRangePicker
      label="Khoảng thời gian công tác"
      value={range}
      onChange={(newRange) => setRange(newRange)}
      placeholder="DD/MM/YYYY HH:mm:ss - DD/MM/YYYY HH:mm:ss"
    />
  );
}
```

---

### 2. Chế độ 12 giờ với AM / PM & Tùy biến nhãn

```tsx
<DateTimeRangePicker
  label="Thời gian thuê phòng"
  use12Hours={true}
  format="DD/MM/YYYY hh:mm A"
  startLabel="Giờ nhận phòng"
  endLabel="Giờ trả phòng"
  separator=" đến "
  defaultValue={["25/08/2026 02:00 PM", "27/08/2026 12:00 PM"]}
/>
```

---

### 3. Tắt giây & Bước nhảy 15 phút

```tsx
<DateTimeRangePicker
  label="Ca trực"
  showSeconds={false}
  minuteStep={15}
  format="DD/MM/YYYY HH:mm"
  defaultValue={["25/08/2026 08:00", "25/08/2026 17:30"]}
/>
```

---

### 4. Vị trí đặt nhãn (`labelPlacement`)

```tsx
// 1. Top (Phía trên - Mặc định)
<DateTimeRangePicker label="Thời gian diễn ra" labelPlacement="top" />

// 2. Left (Ngang bên trái)
<DateTimeRangePicker label="Thời gian diễn ra" labelPlacement="left" />

// 3. Floating (Lơ lửng trên viền)
<DateTimeRangePicker label="Thời gian diễn ra" labelPlacement="floating" />
```

---

### 5. Trạng thái Form & Loading

```tsx
// Bắt buộc nhập (Required)
<DateTimeRangePicker label="Khoảng thời gian" config={{ isRequired: true }} />

// Báo lỗi (Invalid)
<DateTimeRangePicker
  label="Khoảng thời gian"
  errorMessage="Thời gian bắt đầu không được lớn hơn thời gian kết thúc."
  config={{ isInvalid: true }}
/>

// Đang tải dữ liệu (Loading)
<DateTimeRangePicker
  label="Đang đồng bộ"
  config={{ isLoading: true, showSpinner: true }}
/>

// Vô hiệu hóa (Disabled) hoặc Chỉ đọc (ReadOnly)
<DateTimeRangePicker label="Không khả dụng" disabled={true} />
<DateTimeRangePicker label="Chỉ xem" readOnly={true} />
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
| **Popover** | `Escape` | Đóng popover và trả lại tiêu điểm về ô Input. |

---

## 🛠 Bảng thông số Props

### `DateTimeRangePickerProps`

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `value` | `[DateTimeValue, DateTimeValue]` | — | Mảng khoảng ngày giờ đang chọn (Controlled). |
| `defaultValue` | `[DateTimeValue, DateTimeValue]` | — | Mảng khoảng ngày giờ mặc định ban đầu (Uncontrolled). |
| `onChange` | `(range: [string, string] \| null) => void` | — | Callback khi khoảng ngày giờ thay đổi (trả về `[start, end]` theo `format` hoặc `null` khi xóa). |
| `format` | `string` | `'DD/MM/YYYY HH:mm:ss'` | Định dạng dữ liệu chính dùng cho cả input và đầu ra `onChange`. |
| `displayFormat` | `string` | Tự động | Định dạng chuỗi hiển thị trực quan trong ô input. |
| `separator` | `string` | `' - '` | Chuỗi ký tự phân cách giữa Start DateTime và End DateTime. |
| `startLabel` | `string` | `'Start time'` | Nhãn tiêu đề mốc bắt đầu. |
| `endLabel` | `string` | `'End time'` | Nhãn tiêu đề mốc kết thúc. |
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
| `readOnly` | `boolean` | `false` | Chỉ cho phép xem, không mở popover chọn ngày giờ. |
| `config` | `DateTimeRangePickerConfig` | — | Nhóm cấu hình tập trung các cờ tính năng (xem bảng dưới). |
| `placement` | `Placement` | `'bottom-start'` | Vị trí mở popover chọn ngày giờ (Floating UI). |
| `ref` | `Ref<HTMLInputElement>` | — | Ref chuyển tiếp tới thẻ `<input>` HTML bên dưới. |

---

### `DateTimeRangePickerConfig`

| Cờ thuộc tính | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Hiển thị dấu sao đỏ `*` và đánh dấu `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Bật trạng thái viền đỏ báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Khóa tương tác, bật `aria-busy="true"` và `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Hiển thị nút xóa nhanh khoảng ngày giờ đã chọn. |
| `isFullWidth` | `boolean` | `false` | Mở rộng chiếm toàn bộ 100% chiều ngang container cha. |
| `closeOnSelect` | `boolean` | `false` | Tự động đóng popover sau khi chọn xong cả 2 mốc. |
| `showWeekNumbers` | `boolean` | `false` | Hiển thị cột số thứ tự tuần trong bảng lịch. |
| `showViewTabs` | `boolean` | `false` | Hiển thị thanh Tab Ngày / Tháng / Năm trên lịch. |
