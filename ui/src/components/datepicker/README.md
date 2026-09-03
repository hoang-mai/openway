# 📅 DatePicker Component Suite (`@owa/ui`)

Bộ component **DatePicker** & **Calendar** toàn diện, linh hoạt và tương tác cao, thiết kế chuẩn **Design System**, hỗ trợ **3 Chế độ View (Ngày / Tháng / Năm)**, **Định dạng dữ liệu chuẩn hóa (`format`)**, **Hiển thị trực quan thích ứng (`displayFormat`)**, **Số thứ tự tuần (`showWeekNumbers`)**, và tuân thủ đầy đủ tiêu chuẩn **WAI-ARIA Accessibility**.

---

## 🌟 Điểm nổi bật

- **Tách bạch giữa Dữ liệu (`format`) và Hiển thị (`displayFormat`)**:
  - `format` *(mặc định `'DD/MM/YYYY'`)*: Đảm bảo dữ liệu lưu trữ trong State/Form và phát ra qua `onChange` luôn đồng nhất 100% theo chuẩn quy định.
  - `displayFormat` *(tùy chọn)*: Cho phép hiển thị giao diện cho người xem khác với dữ liệu lưu trữ (ví dụ: `format="YYYY-MM-DD"` lưu vào database, nhưng `displayFormat="DD/MM/YYYY"` cho người Việt xem).
- **3 Chế độ Xem Linh Hoạt (`view` & `viewTabs`)**:
  - `days`: Chọn ngày cụ thể trong tháng.
  - `months`: Chọn tháng trong năm (giao diện tự động thích ứng thành `MM-YYYY` / `MM/YYYY` / `YYYY-MM`).
  - `years`: Chọn năm trong thập kỷ (giao diện tự động thích ứng thành `YYYY`).
  - **Drill-down thông minh**: Bấm vào tiêu đề tháng/năm trên lịch để duyệt nhanh mà không làm thay đổi tab đã chọn.
- **Standalone `<Calendar>` Component**: Có thể sử dụng độc lập dưới dạng lịch gắn tĩnh trên giao diện.
- **5 Kích thước tiêu chuẩn (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *mặc định*), `lg` (48px), `xl` (56px).
- **3 Biến thể giao diện (`variant`)**: `outline` *(mặc định)*, `filled`, `ghost`.
- **7 Chủ đề màu sắc (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Mức độ bo góc (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Vị trí đặt nhãn (`labelPlacement`)**: `top` *(mặc định)*, `left`, `floating`.
- **Hỗ trợ Đa Ngôn Ngữ (`locale`)**: Tích hợp sẵn tiếng Việt (`'vi'`), tiếng Anh (`'en'`), và cho phép tùy biến `LocaleConfig`.
- **Số thứ tự tuần (`showWeekNumbers`)**: Tự động tính số tuần chuẩn ISO 8601 kèm cột header `#` và nhãn `W1` - `W53`.
- **Safe Config Fallback**: Tích hợp hàm `getSafeConfig` đảm bảo component hoạt động an toàn, không bị crash kể cả khi truyền prop không hợp lệ.

---

## 🚀 Cài đặt & Import

```tsx
import { DatePicker, Calendar } from "@owa/ui";
import type {
  DatePickerProps,
  DatePickerConfig,
  CalendarProps,
  CalendarView,
  DatePickerSize,
  DatePickerVariant,
  DatePickerColor,
  DatePickerRadius,
  LabelPlacement,
  LocaleConfig,
} from "@owa/ui";
```

---

## 📖 Hướng dẫn sử dụng

### 1. Cách sử dụng cơ bản

```tsx
import { useState } from "react";
import { DatePicker } from "@owa/ui";

export function BasicDatePickerExample() {
  const [date, setDate] = useState<string | null>("25/08/2026");

  return (
    <DatePicker
      label="Ngày sinh"
      value={date}
      onChange={setDate}
      placeholder="DD/MM/YYYY"
    />
  );
}
```

---

### 2. Định dạng Dữ liệu (`format`) và Hiển thị (`displayFormat`)

```tsx
// 1. Dùng chung 1 format ISO cho cả dữ liệu và hiển thị
<DatePicker 
  label="Ngày hiệu lực (ISO)" 
  format="YYYY-MM-DD" 
  defaultValue="2026-08-25" 
/>

// 2. Dữ liệu chuẩn ISO (gửi API) nhưng hiển thị tiếng Việt (DD/MM/YYYY)
<DatePicker
  label="Ngày ký hợp đồng"
  format="YYYY-MM-DD"        // onChange trả về: "2026-08-25"
  displayFormat="DD/MM/YYYY" // Ô input hiển thị: "25/08/2026"
  defaultValue="2026-08-25"
/>

// 3. Định dạng Mỹ (MM/DD/YYYY)
<DatePicker 
  label="US Format" 
  format="MM/DD/YYYY" 
  defaultValue="08/25/2026" 
/>
```

---

### 3. Tích hợp View Tabs (Ngày / Tháng / Năm)

Bật `config={{ showViewTabs: true }}` để cho phép người dùng chuyển nhanh chế độ chọn:

```tsx
<DatePicker
  label="Thời gian báo cáo"
  format="YYYY-MM-DD"
  displayFormat="DD-MM-YYYY"
  config={{ showViewTabs: true, isClearable: true }}
  // Khi ở Tab Ngày: Hiển thị "25-08-2026", onChange phát "2026-08-25"
  // Khi ở Tab Tháng: Hiển thị "08-2026", onChange phát "2026-08-01"
  // Khi ở Tab Năm: Hiển thị "2026", onChange phát "2026-01-01"
/>
```

---

### 4. Standalone `<Calendar>` (Lịch tĩnh)

```tsx
import { useState } from "react";
import { Calendar } from "@owa/ui";

export function StandaloneCalendarExample() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"days" | "months" | "years">("days");

  return (
    <Calendar
      value={selectedDate}
      onChange={setSelectedDate}
      view={view}
      onViewChange={setView}
      showViewTabs={true}
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
<DatePicker label="Ngày bắt đầu" labelPlacement="top" />

// 2. Left (Ngang bên trái)
<DatePicker label="Ngày bắt đầu" labelPlacement="left" />

// 3. Floating (Lơ lửng trên viền)
<DatePicker label="Ngày bắt đầu" labelPlacement="floating" />
```

---

### 6. Trạng thái Form & Loading

```tsx
// Bắt buộc nhập (Required)
<DatePicker label="Ngày hẹn" config={{ isRequired: true }} />

// Báo lỗi (Invalid)
<DatePicker
  label="Ngày kết thúc"
  defaultValue="10/08/2026"
  errorMessage="Ngày kết thúc phải lớn hơn ngày bắt đầu."
  config={{ isInvalid: true }}
/>

// Đang tải (Loading & Spinner)
<DatePicker
  label="Đang đồng bộ"
  defaultValue="25/08/2026"
  config={{ isLoading: true, showSpinner: true }}
/>

// Vô hiệu hóa (Disabled) hoặc Chỉ đọc (ReadOnly)
<DatePicker label="Không khả dụng" disabled={true} defaultValue="25/08/2026" />
<DatePicker label="Chỉ xem" readOnly={true} defaultValue="25/08/2026" />
```

---

## 🛠 Bảng thông số Props

### `DatePickerProps`

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `value` | `Date \| string \| number` | — | Giá trị ngày đang được chọn (Controlled). |
| `defaultValue` | `Date \| string \| number` | — | Giá trị ngày mặc định ban đầu (Uncontrolled). |
| `onChange` | `(date: string \| null) => void` | — | Callback kích hoạt khi thay đổi ngày (trả về chuỗi định dạng theo `format`, hoặc `null` khi xóa). |
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
| `config` | `DatePickerConfig` | — | Nhóm cấu hình tập trung các cờ tính năng (xem bảng dưới). |
| `ref` | `Ref<HTMLInputElement>` | — | Ref chuyển tiếp đến thẻ `<input>` HTML bên dưới. |

---

### `DatePickerConfig`

| Cờ thuộc tính | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Hiển thị dấu sao đỏ `*` và đánh dấu `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Bật trạng thái viền đỏ báo lỗi và `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Khóa tương tác, bật `aria-busy="true"` và `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Hiển thị biểu tượng xoay spinner khi `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Hiển thị nút xóa nhanh nội dung khi có ngày được chọn. |
| `isFullWidth` | `boolean` | `false` | Mở rộng chiếm toàn bộ 100% chiều ngang container cha. |
| `showWeekNumbers` | `boolean` | `false` | Hiển thị cột số thứ tự tuần trong lịch. |
| `showViewTabs` | `boolean` | `false` | Hiển thị thanh chuyển Tab Ngày / Tháng / Năm. |
| `closeOnSelect` | `boolean` | `true` | Tự động đóng popover lịch ngay sau khi chọn ngày. |

---

### `CalendarProps` (Standalone)

| Tên Prop | Kiểu dữ liệu | Giá trị mặc định | Mô tả |
| :--- | :--- | :---: | :--- |
| `value` | `Date \| null` | — | Đối tượng ngày đang được chọn. |
| `onChange` | `(date: Date) => void` | — | Callback khi chọn ngày trên lịch. |
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
| `size` | `DatePickerSize` | `'md'` | Kích cỡ các ô ngày và nút bấm trong lịch. |
| `color` | `DatePickerColor` | `'primary'` | Chủ đề màu sắc theo Design System. |
| `radius` | `DatePickerRadius` | `'lg'` | Bo góc khung viền lịch. |
