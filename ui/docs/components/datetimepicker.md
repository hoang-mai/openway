# 📅⏰ DateTimePicker Component Suite (`@openway/ui`)

A comprehensive, flexible, and intuitive **DateTimePicker** component designed to strict **Design System** standards, featuring **Simultaneous Date and Time Selection within a unified interface**, **2 Flexible Popover Layouts (`side-by-side` and `stacked`)**, **Separation of Data Formatting (`format`) & Display (`displayFormat`)**, **12-Hour (AM/PM) & 24-Hour Modes**, **Optional Seconds Column (`showSeconds`)**, **Custom Stepping Intervals (`hourStep`, `minuteStep`, `secondStep`)**, **Date/Time Constraints (`minDate`, `maxDate`, `minTime`, `maxTime`)**, and full **WAI-ARIA Accessibility** compliance with intelligent keyboard navigation.

> [!NOTE]
> Starting in **v2.0.0**, locale configuration (month names, weekday abbreviations, aria-labels, etc.) is handled globally via `<OpenWayProvider>` (see [i18n documentation](../i18n.md)) rather than individual component props. Individual `locale` props on `DateTimePicker` can still be passed for localized overrides when needed.

---

## 🌟 Highlights

- **Separation of Data (`format`) and Display (`displayFormat`)**:
  - `format` *(default `'DD/MM/YYYY HH:mm:ss'`)*: Standard datetime string format used for storage and emitted through `onChange` (e.g., `"25/12/2026 14:30:00"`).
  - `displayFormat` *(optional)*: Visual representation displayed inside the input field (e.g., `"25/12/2026 02:30:00 PM"`).
- **2 Flexible Popover Layouts (`layout`)**:
  - `side-by-side` *(default)*: Calendar panel (`Calendar`) and time columns (`TimeView`) are displayed side-by-side horizontally.
  - `stacked`: Calendar panel is stacked vertically above the time columns.
- **12-Hour / 24-Hour Modes (`use12Hours`)**:
  - Seamlessly switch between standard 24-hour time (`00` - `23`) and 12-hour time with an interactive `AM` / `PM` selector column.
- **Optional Seconds Display (`showSeconds`) & Stepping Intervals (`Step`)**:
  - Toggle the seconds column easily via `showSeconds={false}`.
  - Configure custom stepping increments for minutes (`minuteStep={15}`), hours (`hourStep={2}`), etc.
- **Intelligent Focus Management & Keyboard Navigation (WAI-ARIA Focus Management)**:
  - Automatically moves focus into the Calendar when opening the popover via keyboard (`Enter`, `Space`, `ArrowDown`).
  - Full support for arrow keys `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Home`, `End`, `Enter`, `Escape`.
- **5 Standard Sizes (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *default*), `lg` (48px), `xl` (56px).
- **3 Visual Variants (`variant`)**: `outline` *(default)*, `filled`, `ghost`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`. The `warning` color applies `text-neutral-950` text for optimal contrast satisfying **WCAG AA**.
- **6 Border Radius Options (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Label Placements (`labelPlacement`)**: `top` *(default)*, `left`, `floating`.

---

## 🚀 Installation & Import

```tsx
import { DateTimePicker } from "@openway/ui";
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
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage

```tsx
import { useState } from "react";
import { DateTimePicker } from "@openway/ui";

export function BasicDateTimePickerExample() {
  const [datetime, setDatetime] = useState<string | null>("25/12/2026 14:30:00");

  return (
    <DateTimePicker
      label="Event Time"
      value={datetime}
      onChange={(newVal) => setDatetime(newVal)}
      placeholder="DD/MM/YYYY HH:mm:ss"
    />
  );
}
```

---

### 2. 12-Hour Mode with AM / PM

```tsx
<DateTimePicker
  label="Meeting Schedule"
  use12Hours={true}
  format="DD/MM/YYYY hh:mm:ss A"
  defaultValue="25/12/2026 09:15:00 AM"
/>
```

---

### 3. Vertical Stacked Layout (`layout="stacked"`)

```tsx
<DateTimePicker
  label="Select Date & Time"
  layout="stacked"
  showSeconds={false}
  minuteStep={15}
/>
```

---

### 4. Date and Time Boundaries (`minDate`, `maxDate`)

```tsx
<DateTimePicker
  label="Submission Deadline"
  minDate={new Date()}
  maxDate="2026-12-31"
  helperText="Selection allowed within the current year only"
/>
```

---

### 5. Label Placement (`labelPlacement`)

```tsx
// 1. Top (Above - Default)
<DateTimePicker label="Event Time" labelPlacement="top" />

// 2. Left (Aligned horizontally to the left)
<DateTimePicker label="Event Time" labelPlacement="left" />

// 3. Floating (Floating within border)
<DateTimePicker label="Event Time" labelPlacement="floating" />
```

---

### 6. Form States & Loading

```tsx
// Required field
<DateTimePicker label="Appointment Time" config={{ isRequired: true }} />

// Validation error (Invalid)
<DateTimePicker
  label="Appointment Time"
  errorMessage="Please select a valid time."
  config={{ isInvalid: true }}
/>

// Loading state with spinner
<DateTimePicker
  label="Synchronizing"
  config={{ isLoading: true, showSpinner: true }}
/>

// Disabled or Read-Only
<DateTimePicker label="Unavailable" disabled={true} />
<DateTimePicker label="View only" readOnly={true} />
```

---

## ⌨️ Keyboard Navigation Shortcuts (WAI-ARIA Keyboard Navigation)

| Location | Key | Action |
| :--- | :--- | :--- |
| **Input Field** | `ArrowDown` / `Enter` / `Space` | Opens popover and automatically moves focus to the date cell in the Calendar. |
| **Input Field** | `Escape` | Closes popover and retains focus on the input field. |
| **Calendar Grid** | `ArrowRight` / `ArrowLeft` | Navigates to next day (+1) or previous day (-1). |
| **Calendar Grid** | `ArrowDown` / `ArrowUp` | Navigates down one week (+7) or up one week (-7). |
| **Calendar Grid** | `Home` / `End` | Jumps to the start or end of the current week. |
| **Calendar Grid** | `Enter` / `Space` | Selects the focused date (combined with the current time values). |
| **Time Column (TimeView)** | `ArrowDown` / `ArrowUp` | Increments / decrements the hour, minute, or second value. |
| **Time Column (TimeView)** | `ArrowRight` / `ArrowLeft` | Moves focus between columns (Hours $\rightarrow$ Minutes $\rightarrow$ Seconds $\rightarrow$ AM/PM). |
| **Time Column (TimeView)** | `Home` / `End` | Jumps to the first or last entry in the column. |
| **Popover** | `Escape` | Closes popover and returns focus back to the input field. |

---

## 🛠 Props Specification

### `DateTimePickerProps`

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `value` | `DateTimeValue` | — | Currently selected datetime value (Controlled). |
| `defaultValue` | `DateTimeValue` | — | Initial default datetime value (Uncontrolled). |
| `onChange` | `(date: string \| null) => void` | — | Callback invoked when datetime changes (returns formatted string per `format`, or `null` when cleared). |
| `format` | `string` | `'DD/MM/YYYY HH:mm:ss'` | Primary data format used for both input and `onChange` output. |
| `displayFormat` | `string` | Auto | Visual display format formatted for presentation inside the input field. |
| `layout` | `'side-by-side' \| 'stacked'` | `'side-by-side'` | Layout arrangement of calendar and time picker inside the popover. |
| `locale` | `'vi' \| 'en' \| DatePickerLocale` | `'vi'` | Locale configuration for internationalization. In v2.0.0+, preferred to be configured centrally via `OpenWayProvider` (see [i18n documentation](../i18n.md)). |
| `use12Hours` | `boolean` | `false` | Enables 12-hour format with AM / PM selection column. |
| `showSeconds` | `boolean` | `true` | Displays seconds selection column. |
| `hourStep` | `number` | `1` | Stepping interval for Hours column. |
| `minuteStep` | `number` | `1` | Stepping interval for Minutes column. |
| `secondStep` | `number` | `1` | Stepping interval for Seconds column. |
| `minDate` | `Date \| string` | — | Minimum selectable date boundary. |
| `maxDate` | `Date \| string` | — | Maximum selectable date boundary. |
| `isDateDisabled` | `(date: Date) => boolean` | — | Function to determine if a specific date is disabled. |
| `minTime` | `TimeValue` | — | Minimum selectable time boundary. |
| `maxTime` | `TimeValue` | — | Maximum selectable time boundary. |
| `disabledHours` | `() => number[]` | — | Function returning an array of disabled hour numbers. |
| `disabledMinutes` | `(h: number) => number[]` | — | Function returning an array of disabled minute numbers for a given hour. |
| `disabledSeconds` | `(h: number, m: number) => number[]` | — | Function returning an array of disabled second numbers for given hour and minute. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the input field and selection panels. |
| `variant` | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | Visual border and background variant of the input field. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Theme color based on Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Border radius of the input and popover. |
| `label` | `ReactNode` | — | Label displayed alongside the input field. |
| `labelPlacement` | `'top' \| 'left' \| 'floating'` | `'top'` | Placement of the label. |
| `placeholder` | `string` | Auto | Placeholder text when input field is empty. |
| `helperText` | `ReactNode` | — | Helper text displayed beneath the input field. |
| `errorMessage` | `ReactNode` | — | Error message (automatically activates red error border and appearance animation). |
| `disabled` | `boolean` | `false` | Disables all user interaction with the input. |
| `readOnly` | `boolean` | `false` | View-only mode; prevents opening the datetime popover. |
| `config` | `DateTimePickerConfig` | — | Consolidated configuration flags object (see table below). |
| `placement` | `Placement` | `'bottom-start'` | Popover positioning relative to the input field (Floating UI). |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref to the underlying HTML `<input>` element. |

---

### `DateTimePickerConfig`

| Property | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Displays a red asterisk `*` and marks `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Enables red error border state and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Locks interactions and sets `aria-busy="true"` and `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Displays a loading spinner icon when `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Displays a quick clear button when a datetime is selected. |
| `isFullWidth` | `boolean` | `false` | Expands width to occupy 100% of parent container. |
| `closeOnSelect` | `boolean` | `false` | Automatically closes the popover after date selection (defaults to `false` to allow selecting both date and time). |
| `showWeekNumbers` | `boolean` | `false` | Displays ISO week number column in the calendar panel. |
| `showViewTabs` | `boolean` | `false` | Displays Days / Months / Years view switcher tabs on the calendar. |
