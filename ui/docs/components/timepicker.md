# ⏰ TimePicker Component Suite (`@openway/ui`)

A comprehensive, flexible, and intuitive **TimePicker**, **TimeView**, and **TimeColumn** component suite designed to strict **Design System** standards, featuring **12-Hour (AM/PM) & 24-Hour Modes**, **Optional Seconds Display (`showSeconds`)**, **Customizable Steps (`hourStep`, `minuteStep`, `secondStep`)**, **Separation of Data Format (`format`) & Visual Display (`displayFormat`)**, **Time Constraints (`minTime`, `maxTime`)**, **Flexible Disabling of Hours/Minutes/Seconds**, and full **WAI-ARIA Accessibility** compliance with intelligent keyboard navigation.

---

## 🌟 Features

- **Separation of Data Format (`format`) and Visual Display (`displayFormat`)**:
  - `format` (*default `'HH:mm:ss'`*): Standard time string format stored internally and emitted via `onChange` (e.g., `"14:30:00"`).
  - `displayFormat` (*optional*): Visual presentation format rendered in the input field (e.g., `"02:30:00 PM"`).
- **Flexible 12-Hour / 24-Hour Modes (`use12Hours`)**:
  - Seamlessly switches between standard 24-hour time (`00` – `23`) and 12-hour format with dedicated `AM` / `PM` selection columns.
- **Optional Seconds Column (`showSeconds`) & Step Configuration (`Step`)**:
  - Easily toggle the seconds column with `showSeconds={false}`.
  - Customize increment steps for minutes (`minuteStep={15}`), hours (`hourStep={2}`), etc.
- **Intelligent Scroll Columns (Auto-Scroll & WAI-ARIA Focus Management)**:
  - Smoothly auto-scrolls to the currently selected value upon opening the popover.
  - Automatically shifts focus into the time column when opened via keyboard navigation.
  - Full support for arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`), `Home`, `End`, `Enter`, and `Escape`.
- **5 Standard Sizes (`size`)**: `xs` (24px), `sm` (32px), `md` (40px – *default*), `lg` (48px), `xl` (56px).
- **3 Visual Variants (`variant`)**: `outline` (*default*), `filled`, `ghost`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`. The `warning` color uses `text-neutral-950` text for optimal contrast meeting **WCAG AA** standards.
- **6 Border Radii (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Label Placements (`labelPlacement`)**: `top` (*default*), `left`, `floating`.
- **Standalone `<TimeView>`**: Embed a static time picker panel directly into user interfaces without a popover input.

---

## 🚀 Installation & Import

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

## 📖 Usage Guide

### 1. Basic Usage

```tsx
import { useState } from "react";
import { TimePicker } from "@openway/ui";

export function BasicTimePickerExample() {
  const [time, setTime] = useState<string | null>("14:30:00");

  return (
    <TimePicker
      label="Appointment Time"
      value={time}
      onChange={(formattedTime) => setTime(formattedTime)}
      placeholder="HH:mm:ss"
    />
  );
}
```

---

### 2. 12-Hour Mode with AM / PM

```tsx
<TimePicker
  label="Meeting Start Time"
  use12Hours={true}
  format="hh:mm:ss A"
  defaultValue="09:15:00 AM"
/>
```

---

### 3. Hide Seconds (`showSeconds={false}`) & Custom Steps (`minuteStep`)

```tsx
<TimePicker
  label="Reservation Window"
  showSeconds={false}
  minuteStep={15} // Only shows minute intervals: 00, 15, 30, 45
  format="HH:mm"
  placeholder="HH:mm"
/>
```

---

### 4. Time Constraints (`minTime` & `maxTime`)

```tsx
<TimePicker
  label="Business Hours"
  minTime="08:00:00"
  maxTime="17:30:00"
  helperText="Selection allowed between 08:00 and 17:30 only"
/>
```

---

### 5. Standalone `<TimeView>` (Independent Time Panel)

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

### 6. Label Placement (`labelPlacement`)

```tsx
// 1. Top (Above - Default)
<TimePicker label="Event Time" labelPlacement="top" />

// 2. Left (Horizontally aligned)
<TimePicker label="Event Time" labelPlacement="left" />

// 3. Floating (Overlapping border)
<TimePicker label="Event Time" labelPlacement="floating" />
```

---

### 7. Form & Loading States

```tsx
// Required field
<TimePicker label="Departure Time" config={{ isRequired: true }} />

// Invalid error state
<TimePicker
  label="Appointment Time"
  errorMessage="Please select a valid time."
  config={{ isInvalid: true }}
/>

// Loading state
<TimePicker
  label="Synchronizing Data"
  config={{ isLoading: true, showSpinner: true }}
/>

// Disabled or ReadOnly
<TimePicker label="Unavailable" disabled={true} />
<TimePicker label="View Only" readOnly={true} />
```

---

## ⌨️ Keyboard Navigation (WAI-ARIA Keyboard Navigation)

| Location | Key | Action |
| :--- | :--- | :--- |
| **Input Field** | `ArrowDown` / `Enter` / `Space` | Opens popover and shifts focus into the Hours column. |
| **Input Field** | `Escape` | Closes popover and retains focus on the input field. |
| **Popup Panel** | `ArrowDown` | Moves down to select the next time slot. |
| **Popup Panel** | `ArrowUp` | Moves up to select the previous time slot. |
| **Popup Panel** | `ArrowRight` | Moves focus to the next column (Hours $\rightarrow$ Minutes $\rightarrow$ Seconds $\rightarrow$ AM/PM). |
| **Popup Panel** | `ArrowLeft` | Moves focus to the preceding column. |
| **Popup Panel** | `Home` | Jumps to the first time option (e.g., `00`). |
| **Popup Panel** | `End` | Jumps to the last time option (e.g., `23` or `59`). |
| **Popup Panel** | `Enter` / `Space` | Confirms selection of the currently focused time option. |
| **Popup Panel** | `Escape` | Closes popover and returns focus to the input field. |

---

## 🛠 Props Reference

### `TimePickerProps`

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `value` | `TimeValue` | — | Selected time value (Controlled mode). |
| `defaultValue` | `TimeValue` | — | Initial default time value (Uncontrolled mode). |
| `onChange` | `(time: string \| null) => void` | — | Callback invoked when time changes (returns string matching `format`, or `null` when cleared). |
| `format` | `string` | `'HH:mm:ss'` | Primary data format used for internal parsing and `onChange` output. |
| `displayFormat` | `string` | Automatic | Visual presentation string format displayed inside the input. |
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
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the input field and selection panel. |
| `variant` | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | Visual style variant for border and background. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Theme color per Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Border radius of the input and popover. |
| `label` | `ReactNode` | — | Label rendered above or beside the input field. |
| `labelPlacement` | `'top' \| 'left' \| 'floating'` | `'top'` | Placement of the label. |
| `placeholder` | `string` | Automatic | Placeholder text displayed when input is empty. |
| `helperText` | `ReactNode` | — | Helper or instructional text rendered beneath the field. |
| `errorMessage` | `ReactNode` | — | Error message displayed on validation failure (triggers error styling). |
| `disabled` | `boolean` | `false` | Disables all user interactions on the input. |
| `readOnly` | `boolean` | `false` | Read-only mode, prevents opening the popover or altering value. |
| `config` | `TimePickerConfig` | — | Consolidated configuration object for feature flags (see table below). |
| `placement` | `Placement` | `'bottom-start'` | Floating UI placement for the time selection popover. |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref to the underlying native `<input>` HTML element. |

---

### `TimePickerConfig`

| Property | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Displays a red asterisk `*` and sets `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Enables invalid error styling and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Locks interactions, setting `aria-busy="true"` and `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Displays a rotating spinner icon when `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Displays a quick clear button when a time is selected. |
| `isFullWidth` | `boolean` | `false` | Expands the component to 100% width of the parent container. |
| `closeOnSelect` | `boolean` | `false` | Automatically closes the popover once values are selected (defaults to `false` for TimePicker so users can finish choosing all columns). |
