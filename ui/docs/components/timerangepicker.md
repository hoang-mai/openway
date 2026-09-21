# ⏳ TimeRangePicker Component Suite (`@openway/ui`)

A comprehensive, intuitive, and flexible **TimeRangePicker** component suite designed to strict **Design System** standards, featuring **dual parallel time panels for selecting time ranges (Start Time – End Time)**, **Separation of Data Format (`format`) & Visual Display (`displayFormat`)**, **Customizable Separator (`separator`)**, **12-Hour (AM/PM) & 24-Hour Modes**, **Optional Seconds Display (`showSeconds`)**, **Customizable Steps (`hourStep`, `minuteStep`, `secondStep`)**, and full **WAI-ARIA Accessibility** compliance with intelligent keyboard navigation.

---

## 🌟 Features

- **Dual Parallel Time Selection Panels (Start Time & End Time)**:
  - Horizontal side-by-side layout (`flex-row divide-x`) enables users to pick start and end times naturally and seamlessly.
  - Automatically constrains End Time `minTime` based on the chosen Start Time and vice versa.
- **Customizable Column Header Labels (`startLabel` & `endLabel`)**:
  - Defaults to `"Start time"` and `"End time"`, customizable to any string.
- **Customizable Separator (`separator`)**:
  - Defaults to `' - '`, customizable to `' to '`, `' ~ '`, etc.
- **Separation of Data Format (`format`) and Visual Display (`displayFormat`)**:
  - `format` (*default `'HH:mm:ss'`*): Array data emitted via `onChange` formatted as `[string, string]` (e.g., `["08:00:00", "17:30:00"]`).
  - `displayFormat` (*optional*): Visual display string format inside the input (e.g., `08:00 AM - 05:30 PM`).
- **5 Standard Sizes (`size`)**: `xs` (24px), `sm` (32px), `md` (40px – *default*), `lg` (48px), `xl` (56px).
- **3 Visual Variants (`variant`)**: `outline` (*default*), `filled`, `ghost`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`. The `warning` color uses `text-neutral-950` text for optimal contrast meeting **WCAG AA** standards.
- **6 Border Radii (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Label Placements (`labelPlacement`)**: `top` (*default*), `left`, `floating`.

---

## 🚀 Installation & Import

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

## 📖 Usage Guide

### 1. Basic Usage

```tsx
import { useState } from "react";
import { TimeRangePicker } from "@openway/ui";

export function BasicTimeRangePickerExample() {
  const [range, setRange] = useState<[string, string] | null>(["08:00:00", "17:00:00"]);

  return (
    <TimeRangePicker
      label="Working Hours"
      value={range}
      onChange={(formattedRange) => setRange(formattedRange)}
      placeholder="HH:mm:ss - HH:mm:ss"
    />
  );
}
```

---

### 2. 12-Hour Format with AM / PM & Custom Labels

```tsx
<TimeRangePicker
  label="Operating Hours"
  use12Hours={true}
  format="hh:mm A"
  startLabel="Opening Time"
  endLabel="Closing Time"
  separator=" to "
  defaultValue={["08:00 AM", "10:00 PM"]}
/>
```

---

### 3. Hide Seconds & 15-Minute Step

```tsx
<TimeRangePicker
  label="Shift Window"
  showSeconds={false}
  minuteStep={15}
  format="HH:mm"
  defaultValue={["08:00", "17:30"]}
/>
```

---

### 4. Label Placement (`labelPlacement`)

```tsx
// 1. Top (Above - Default)
<TimeRangePicker label="Time Range" labelPlacement="top" />

// 2. Left (Horizontally aligned)
<TimeRangePicker label="Time Range" labelPlacement="left" />

// 3. Floating (Overlapping border)
<TimeRangePicker label="Time Range" labelPlacement="floating" />
```

---

### 5. Form & Loading States

```tsx
// Required field
<TimeRangePicker label="Event Time" config={{ isRequired: true }} />

// Invalid error state
<TimeRangePicker
  label="Time Range"
  errorMessage="Start time cannot be later than end time."
  config={{ isInvalid: true }}
/>

// Loading state
<TimeRangePicker
  label="Synchronizing Data"
  config={{ isLoading: true, showSpinner: true }}
/>

// Disabled or ReadOnly
<TimeRangePicker label="Unavailable" disabled={true} />
<TimeRangePicker label="View Only" readOnly={true} />
```

---

## ⌨️ Keyboard Navigation (WAI-ARIA Keyboard Navigation)

| Location | Key | Action |
| :--- | :--- | :--- |
| **Input Field** | `ArrowDown` / `Enter` / `Space` | Opens popover and shifts focus into the Start Time column. |
| **Input Field** | `Escape` | Closes popover and retains focus on the input field. |
| **Popup Panel** | `ArrowDown` | Moves down to select the next time slot. |
| **Popup Panel** | `ArrowUp` | Moves up to select the previous time slot. |
| **Popup Panel** | `ArrowRight` | Moves focus to the next column (Hours $\rightarrow$ Minutes $\rightarrow$ Seconds $\rightarrow$ End Time panel). |
| **Popup Panel** | `ArrowLeft` | Moves focus to the preceding column. |
| **Popup Panel** | `Home` | Jumps to the first time option. |
| **Popup Panel** | `End` | Jumps to the last time option. |
| **Popup Panel** | `Enter` / `Space` | Confirms selection of the currently focused time option. |
| **Popup Panel** | `Escape` | Closes popover and returns focus to the input field. |

---

## 🛠 Props Reference

### `TimeRangePickerProps`

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `value` | `[TimeValue, TimeValue]` | — | Currently selected time range array (Controlled mode). |
| `defaultValue` | `[TimeValue, TimeValue]` | — | Initial default time range array (Uncontrolled mode). |
| `onChange` | `(range: [string, string] \| null) => void` | — | Callback invoked when time range changes (returns `[start, end]` or `null` when cleared). |
| `format` | `string` | `'HH:mm:ss'` | Primary data format used for input parsing and `onChange` output. |
| `displayFormat` | `string` | Automatic | Visual presentation format string displayed inside the input. |
| `separator` | `string` | `' - '` | Separator string between Start Time and End Time. |
| `startLabel` | `string` | `'Start time'` | Header label for the start time column. |
| `endLabel` | `string` | `'End time'` | Header label for the end time column. |
| `use12Hours` | `boolean` | `false` | Enables 12-hour mode with AM / PM selection column. |
| `showSeconds` | `boolean` | `true` | Displays the seconds selection column. |
| `hourStep` | `number` | `1` | Increment step for the Hours column. |
| `minuteStep` | `number` | `1` | Increment step for the Minutes column. |
| `secondStep` | `number` | `1` | Increment step for the Seconds column. |
| `minTime` | `TimeValue` | — | Minimum selectable time boundary. |
| `maxTime` | `TimeValue` | — | Maximum selectable time boundary. |
| `disabledHours` | `() => number[]` | — | Function returning an array of disabled hour numbers. |
| `disabledMinutes` | `(hour: number) => number[]` | — | Function returning an array of disabled minute numbers for a given hour. |
| `disabledSeconds` | `(h: number, m: number) => number[]` | — | Function returning an array of disabled second numbers for a given hour and minute. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the input field. |
| `variant` | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | Visual style variant for border and background. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Theme color per Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Border radius of the input and popover. |
| `label` | `ReactNode` | — | Label rendered above or beside the input field. |
| `labelPlacement` | `'top' \| 'left' \| 'floating'` | `'top'` | Placement of the label. |
| `placeholder` | `string` | Automatic | Combined placeholder text when the input is empty. |
| `placeholders` | `[string, string]` | — | Separate placeholder text array for Start and End inputs. |
| `helperText` | `ReactNode` | — | Helper or instructional text rendered beneath the field. |
| `errorMessage` | `ReactNode` | — | Error message displayed on validation failure (triggers error styling). |
| `disabled` | `boolean` | `false` | Disables all user interactions on the input. |
| `readOnly` | `boolean` | `false` | Read-only mode, prevents opening the popover or altering values. |
| `config` | `TimeRangePickerConfig` | — | Consolidated configuration object for feature flags (see table below). |
| `placement` | `Placement` | `'bottom-start'` | Floating UI placement for the time selection popover. |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref to the underlying native `<input>` HTML element. |

---

### `TimeRangePickerConfig`

| Property | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Displays a red asterisk `*` and sets `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Enables invalid error styling and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Locks interactions, setting `aria-busy="true"` and `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Displays a rotating spinner icon when `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Displays a quick clear button when a time range is selected. |
| `isFullWidth` | `boolean` | `false` | Expands the component to 100% width of the parent container. |
| `closeOnSelect` | `boolean` | `false` | Automatically closes the popover after both start and end times are chosen. |
