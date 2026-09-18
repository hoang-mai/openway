# 📆 DateRangePicker Component Suite (`@openway/ui`)

Bộ component **DateRangePicker** & **DateRangeCalendar** toàn diện, linh hoạt và tương tác cao, thiết kế chuẩn **Design System**, hỗ trợ **Chọn khoảng ngày trên 2 tháng liên tiếp song song**, **3 Chế độ View (Khoảng Ngày / Tháng / Năm)**, **Định dạng dữ liệu chuẩn hóa (`format`)**, **Hiển thị trực quan thích ứng (`displayFormat`)**, **Số thứ tự tuần (`showWeekNumbers`)**, và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Chọn khoảng ngày trực quan (2 Tháng song song)**:
  - Hiển thị cùng lúc 2 tháng liên tiếp cạnh nhau giúp người dùng dễ dàng chọn khoảng thời gian kéo dài qua nhiều tháng.
  - Hỗ trợ hiệu ứng rê chuột xem trước khoảng ngày (Hover Range Preview).
- **Tách bạch giữa Dữ liệu (`format`) và Hiển thị (`displayFormat`)**:
  - `format` *(mặc định `'DD/MM/YYYY'`)*: Dữ liệu phát ra qua `onChange` là mảng 2 phần tử `[string, string]` luôn tuân thủ 100% theo chuẩn quy định (ví dụ: `["2026-08-01", "2026-08-15"]`).
  - `displayFormat` *(tùy chọn)*: Tùy biến hiển thị trên ô input (ví dụ: `01/08/2026 - 15/08/2026`).
- **3 Chế độ Xem Linh Hoạt (`view` & `viewTabs`)**:
  - `days`: Chọn khoảng ngày cụ thể.
  - `months`: Chọn khoảng tháng trong năm (hiển thị `MM-YYYY - MM-YYYY` hoặc `MM/YYYY - MM/YYYY`).
  - `years`: Chọn khoảng năm trong thập kỷ (hiển thị `YYYY - YYYY`).
- **Tùy biến ký tự phân cách (`separator`)**: Mặc định là `' - '`, có thể tùy biến thành `' to '`, `' ~ '`...
- **Standalone `<DateRangeCalendar>` Component**: Có thể sử dụng độc lập dưới dạng lịch chọn range gắn tĩnh trên giao diện.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *mặc định*), `lg` (48px), `xl` (56px).
- **3 Biến thể giao diện (`variant`)**: `outline` *(mặc định)*, `filled`, `ghost`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Mức độ bo góc (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Vị trí đặt nhãn (`labelPlacement`)**: `top` *(mặc định)*, `left`, `floating`.
- **Hỗ trợ Đa Ngôn Ngữ (`locale`)**: Tích hợp sẵn tiếng Việt (`'vi'`), tiếng Anh (`'en'`), và cho phép tùy biến `LocaleConfig`.
- **Số thứ tự tuần (`showWeekNumbers`)**: Tự động tính số tuần chuẩn ISO 8601 kèm cột header `#` và nhãn `W1` - `W53`.

---

## 🚀 Cài đặt & Import

```tsx
import { DateRangePicker, DateRangeCalendar } from "@openway/ui";
import type {
  DateRangePickerProps,
  DateRangePickerConfig,
  DateRangeCalendarProps,
  DateRange,
  DateRangeValue,
  DateRangePickerSize,
  DateRangePickerVariant,
  DateRangePickerColor,
  DateRangePickerRadius,
  LabelPlacement,
  LocaleConfig,
} from "@openway/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { useState } from "react";
import { DateRangePicker } from "@openway/ui";

export function BasicDateRangePickerExample() {
  const [range, setRange] = useState<[string, string] | null>(["01/08/2026", "15/08/2026"]);

  return (
    <DateRangePicker
      label="Khoảng thời gian nghỉ phép"
      value={range}
      onChange={setRange}
      placeholder="DD/MM/YYYY - DD/MM/YYYY"
    />
  );
}
```

---

### 2. Định dạng Dữ liệu (`format`) và Hiển thị (`displayFormat`)

```tsx
// 1. Dùng chung 1 format ISO cho cả dữ liệu và hiển thị
<DateRangePicker 
  label="Khoảng ngày ISO" 
  format="YYYY-MM-DD" 
  defaultValue={["2026-08-01", "2026-08-15"]} 
/>

// 2. Dữ liệu chuẩn ISO (gửi API) nhưng hiển thị tiếng Việt
<DateRangePicker
  label="Khoảng ngày dự án"
  format="YYYY-MM-DD"        // onChange trả về: ["2026-08-01", "2026-08-15"]
  displayFormat="DD/MM/YYYY" // Ô input hiển thị: "01/08/2026 - 15/08/2026"
  defaultValue={["2026-08-01", "2026-08-15"]}
/>

// 3. Tùy biến ký tự phân cách (separator)
<DateRangePicker
  label="Khoảng thời gian"
  separator=" to "
  defaultValue={["01/08/2026", "15/08/2026"]}
/>
```

---

### 3. Tích hợp View Tabs (Khoảng Ngày / Tháng / Năm)

Bật `config={{ showViewTabs: true }}` để cho phép người dùng chọn khoảng tháng hoặc năm:

```tsx
<DateRangePicker
  label="Kỳ kế toán / Báo cáo tài chính"
  format="YYYY-MM-DD"
  displayFormat="DD-MM-YYYY"
  config={{ showViewTabs: true, isClearable: true }}
  // Khi ở Tab Ngày: Hiển thị "01-08-2026 - 15-08-2026", onChange phát ["2026-08-01", "2026-08-15"]
  // Khi ở Tab Tháng: Hiển thị "03-2026 - 08-2026", onChange phát ["2026-03-01", "2026-08-01"]
  // Khi ở Tab Năm: Hiển thị "2026 - 2030", onChange phát ["2026-01-01", "2030-01-01"]
/>
```

---

### 4. Standalone `<DateRangeCalendar>` (Lịch tĩnh 2 tháng)

```tsx
import { useState } from "react";
import { DateRangeCalendar } from "@openway/ui";

export function StandaloneDateRangeCalendarExample() {
  const [range, setRange] = useState<[Date | null, Date | null]>([
    new Date(2026, 7, 5),
    new Date(2026, 7, 20),
  ]);

  return (
    <DateRangeCalendar
      value={range}
      onChange={setRange}
      showWeekNumbers={true}
      color="primary"
    />
  );
}
```

---

### 5. Vị trí đặt nhãn (`labelPlacement`)

```tsx
// 1. Top (Phía trên - Mặc định)
<DateRangePicker label="Thời gian thực hiện" labelPlacement="top" />

// 2. Left (Ngang bên trái)
<DateRangePicker label="Thời gian thực hiện" labelPlacement="left" />

// 3. Floating (Lơ lửng trên viền)
<DateRangePicker label="Thời gian thực hiện" labelPlacement="floating" />
```

---

### 6. Trạng thái Form & Loading

```tsx
// Bắt buộc nhập (Required)
<DateRangePicker label="Thời gian hiệu lực" config={{ isRequired: true }} />

// Báo lỗi (Invalid)
<DateRangePicker
  label="Khoảng ngày"
  errorMessage="Khoảng ngày đã chọn không hợp lệ."
  config={{ isInvalid: true }}
/>

// Đang tải (Loading & Spinner)
<DateRangePicker
  label="Đang tải dữ liệu"
  config={{ isLoading: true, showSpinner: true }}
/>

// Vô hiệu hóa (Disabled) hoặc Chỉ đọc (ReadOnly)
<DateRangePicker label="Không khả dụng" disabled={true} />
<DateRangePicker label="Chỉ xem" readOnly={true} />
```

---

## 🛠 Bảng thông số Props

### `DateRangePickerProps`

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `value` | `[DateValue, DateValue]` | — | Mảng khoảng ngày đang được chọn (Controlled). |
| `defaultValue` | `[DateValue, DateValue]` | — | Mảng khoảng ngày mặc định ban đầu (Uncontrolled). |
| `onChange` | `(range: [string, string] \| null) => void` | — | Callback kích hoạt khi thay đổi khoảng ngày (trả về mảng 2 chuỗi định dạng theo `format`, hoặc `null` khi xóa). |
| `separator` | `string` | `' - '` | Chuỗi ký tự phân cách giữa 2 ngày trong ô input. |
| `format` | `string` | `'DD/MM/YYYY'` | Định dạng dữ liệu chính dùng chung cho cả đầu vào (`value`/`defaultValue`) và đầu ra (`onChange`). |
| `displayFormat` | `string` | Tự động | Định dạng chuỗi hiển thị trực quan trong ô input cho người xem. |
| `defaultView` | `'days' \| 'months' \| 'years'` | `'days'` | Chế độ xem mặc định ban đầu. |
| `view` | `'days' \| 'months' \| 'years'` | — | Chế độ xem đang kích hoạt (Controlled). |
| `onViewChange` | `(view: CalendarView) => void` | — | Callback khi người dùng chuyển đổi chế độ xem. |
| `viewTabs` | `CalendarView[]` | `['days', 'months', 'years']` | Danh sách các tab hiển thị trên thanh tab. |
| `minDate` | `Date \| string` | — | Giới hạn ngày nhỏ nhất cho phép chọn. |
| `maxDate` | `Date \| string` | — | Giới hạn ngày lớn nhất cho phép chọn. |
| `isDateDisabled` | `(date: Date) => boolean` | — | Hàm callback kiểm tra ngày cụ thể có bị vô hiệu hóa hay không. |
| `locale` | `'vi' \| 'en' \| LocaleConfig` | `'en'` | Cấu hình ngôn ngữ cho lịch. |
| `firstDayOfWeek` | `0 \| 1` | `1` | Ngày bắt đầu tuần: `0` (Chủ Nhật) hoặc `1` (Thứ Hai). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Kích cỡ ô nhập liệu và các nút bấm. |
| `variant` | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | Biến thể giao diện của ô nhập liệu. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Chủ đề màu sắc theo Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Độ bo góc của ô nhập và popover. |
| `label` | `ReactNode` | — | Nhãn tiêu đề hiển thị cho ô nhập liệu. |
| `labelPlacement` | `'top' \| 'left' \| 'floating'` | `'top'` | Vị trí hiển thị của nhãn. |
| `placeholder` | `string` | Tự động | Văn bản giữ chỗ khi ô input rỗng. |
| `helperText` | `ReactNode` | — | Đoạn văn bản hướng dẫn/trợ giúp bên dưới ô. |
| `errorMessage` | `ReactNode` | — | Thông báo lỗi (tự động bật trạng thái viền đỏ và hiệu ứng xuất hiện). |
| `disabled` | `boolean` | `false` | Khóa toàn bộ tương tác của ô nhập liệu. |
| `readOnly` | `boolean` | `false` | Chỉ cho phép xem, không mở popover lịch. |
| `placement` | `Placement` | `'bottom-start'` | Vị trí mở popover lịch so với ô input (Floating UI). |
| `config` | `DateRangePickerConfig` | — | Nhóm cấu hình tập trung các cờ tính năng (xem bảng dưới). |
| `ref` | `Ref<HTMLInputElement>` | — | Ref chuyển tiếp đến thẻ `<input>` HTML bên dưới. |

---

### `DateRangePickerConfig`

| Cờ thuộc tính | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Hiển thị dấu sao đỏ `*` và đánh dấu `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Bật trạng thái viền đỏ báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Khóa tương tác, bật `aria-busy="true"` và `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Hiển thị nút xóa nhanh khoảng ngày đã chọn. |
| `isFullWidth` | `boolean` | `false` | Mở rộng chiếm toàn bộ 100% chiều ngang container cha. |
| `showWeekNumbers` | `boolean` | `false` | Hiển thị cột số thứ tự tuần trong cả 2 bảng lịch. |
| `showViewTabs` | `boolean` | `false` | Hiển thị thanh chuyển Tab Ngày / Tháng / Năm. |
| `closeOnSelect` | `boolean` | `true` | Tự động đóng popover lịch ngay sau khi chọn xong ngày kết thúc. |

---

### `DateRangeCalendarProps` (Standalone)

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `value` | `[Date \| null, Date \| null]` | — | Mảng 2 đối tượng `[start, end]` đang được chọn. |
| `onChange` | `(range: [Date \| null, Date \| null]) => void` | — | Callback khi chọn khoảng ngày trên lịch. |
| `view` | `'days' \| 'months' \| 'years'` | `'days'` | Chế độ xem hiện tại của lịch. |
| `onViewChange` | `(view: CalendarView) => void` | — | Callback khi người dùng chuyển đổi chế độ xem. |
| `minDate` | `Date \| string` | — | Giới hạn ngày nhỏ nhất cho phép chọn. |
| `maxDate` | `Date \| string` | — | Giới hạn ngày lớn nhất cho phép chọn. |
| `isDateDisabled` | `(date: Date) => boolean` | — | Hàm kiểm tra ngày bị disable. |
| `locale` | `'vi' \| 'en' \| LocaleConfig` | `'vi'` | Cấu hình ngôn ngữ cho lịch. |
| `firstDayOfWeek` | `0 \| 1` | `1` | Ngày bắt đầu tuần: `0` (Chủ Nhật) hoặc `1` (Thứ Hai). |
| `showWeekNumbers` | `boolean` | `false` | Hiển thị cột số thứ tự tuần. |
| `showViewTabs` | `boolean` | `false` | Hiển thị thanh Tab Ngày / Tháng / Năm phía trên lịch. |
| `viewTabs` | `CalendarView[]` | `['days', 'months', 'years']` | Danh sách các tab hiển thị. |
| `size` | `DateRangePickerSize` | `'md'` | Kích cỡ các ô ngày và nút bấm trong lịch. |
| `color` | `DateRangePickerColor` | `'primary'` | Chủ đề màu sắc theo Design System. |
| `radius` | `DateRangePickerRadius` | `'lg'` | Bo góc khung viền lịch. |
