# 📅⏳ DateTimeRangePicker Component Suite (`@openway/ui`)

A comprehensive, flexible, and convenient **DateTimeRangePicker** component designed to strict **Design System** standards, featuring **Date & Time Range Selection (Start - End) with a Stepped Selection workflow** keeping the popover compact and responsive across all screens, **Separation of Data Formatting (`format`) & Display (`displayFormat`)**, **12-Hour (AM/PM) & 24-Hour Modes**, **Optional Seconds Column (`showSeconds`)**, **Custom Stepping Intervals (`hourStep`, `minuteStep`, `secondStep`)**, **Automatic `minDate` / `minTime` Cross-Constraint Validation**, and full **WAI-ARIA Accessibility** compliance.

> [!NOTE]
> Starting in **v2.0.0**, locale configuration (month names, weekday abbreviations, aria-labels, etc.) is handled globally via `<OpenWayProvider>` (see [i18n documentation](../i18n.md)) rather than individual component props. Individual `locale` props on `DateTimeRangePicker` can still be passed for localized overrides when needed.

---

## 🌟 Highlights

- **Intelligent Stepped Navigation Workflow**:
  - Rather than rendering 2 full calendars + 2 time columns simultaneously (consuming over 800px), DateTimeRangePicker renders one picker at a time.
  - Features an intuitive top summary bar `[ 1. Start: ... ]` and `[ 2. End: ... ]` allowing instant switching.
  - Features bottom step control buttons `[ ← Start ]` and `[ End → ]` along with an `Apply` button.
- **Separation of Data (`format`) and Display (`displayFormat`)**:
  - `format` *(default `'DD/MM/YYYY HH:mm:ss'`)*: Data emitted through `onChange` is a 2-element array `[string, string]` (e.g. `["25/08/2026 08:00:00", "28/08/2026 17:30:00"]`).
  - `displayFormat` *(optional)*: Visual formatting displayed inside the input field (e.g. `"25/08/2026 08:00 AM - 28/08/2026 05:30 PM"`).
- **2 Flexible Popover Layouts (`layout`)**:
  - `side-by-side` *(default)*: Calendar panel (`Calendar`) and time columns (`TimeView`) are displayed horizontally side-by-side.
  - `stacked`: Calendar panel is stacked vertically above the time columns.
- **Automatic Cross-Constraint Validation**:
  - When picking the `End` time, dates and times preceding the `Start` boundary are automatically disabled.
- **5 Standard Sizes (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *default*), `lg` (48px), `xl` (56px).
- **3 Visual Variants (`variant`)**: `outline` *(default)*, `filled`, `ghost`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`. The `warning` color applies `text-neutral-950` text for optimal contrast satisfying **WCAG AA**.
- **6 Border Radius Options (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Label Placements (`labelPlacement`)**: `top` *(default)*, `left`, `floating`.

---

## 🚀 Installation & Import

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

## 📖 Usage Guide

### 1. Basic Usage

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
      label="Business Trip Period"
      value={range}
      onChange={(newRange) => setRange(newRange)}
      placeholder="DD/MM/YYYY HH:mm:ss - DD/MM/YYYY HH:mm:ss"
    />
  );
}
```

---

### 2. 12-Hour Mode with AM / PM & Custom Labels

```tsx
<DateTimeRangePicker
  label="Room Booking Period"
  use12Hours={true}
  format="DD/MM/YYYY hh:mm A"
  startLabel="Check-in time"
  endLabel="Check-out time"
  separator=" to "
  defaultValue={["25/08/2026 02:00 PM", "27/08/2026 12:00 PM"]}
/>
```

---

### 3. Disable Seconds & 15-Minute Stepping

```tsx
<DateTimeRangePicker
  label="Shift Schedule"
  showSeconds={false}
  minuteStep={15}
  format="DD/MM/YYYY HH:mm"
  defaultValue={["25/08/2026 08:00", "25/08/2026 17:30"]}
/>
```

---

### 4. Label Placement (`labelPlacement`)

```tsx
// 1. Top (Above - Default)
<DateTimeRangePicker label="Event Duration" labelPlacement="top" />

// 2. Left (Aligned horizontally to the left)
<DateTimeRangePicker label="Event Duration" labelPlacement="left" />

// 3. Floating (Floating within border)
<DateTimeRangePicker label="Event Duration" labelPlacement="floating" />
```

---

### 5. Form States & Loading

```tsx
// Required field
<DateTimeRangePicker label="Time Range" config={{ isRequired: true }} />

// Validation error (Invalid)
<DateTimeRangePicker
  label="Time Range"
  errorMessage="Start time cannot be greater than end time."
  config={{ isInvalid: true }}
/>

// Loading state with spinner
<DateTimeRangePicker
  label="Synchronizing"
  config={{ isLoading: true, showSpinner: true }}
/>

// Disabled or Read-Only
<DateTimeRangePicker label="Unavailable" disabled={true} />
<DateTimeRangePicker label="View only" readOnly={true} />
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
| **Popover** | `Escape` | Closes popover and returns focus back to the input field. |

---

## 🛠 Props Specification

### `DateTimeRangePickerProps`

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `value` | `[DateTimeValue, DateTimeValue]` | — | Currently selected datetime range array (Controlled). |
| `defaultValue` | `[DateTimeValue, DateTimeValue]` | — | Initial default datetime range array (Uncontrolled). |
| `onChange` | `(range: [string, string] \| null) => void` | — | Callback invoked when datetime range changes (returns `[start, end]` per `format`, or `null` when cleared). |
| `format` | `string` | `'DD/MM/YYYY HH:mm:ss'` | Primary data format used for both input and `onChange` output. |
| `displayFormat` | `string` | Auto | Visual display format formatted for presentation inside the input field. |
| `separator` | `string` | `' - '` | Separator string between Start DateTime and End DateTime. |
| `startLabel` | `string` | `'Start time'` | Label header for start datetime step. |
| `endLabel` | `string` | `'End time'` | Label header for end datetime step. |
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
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the input field. |
| `variant` | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | Visual border and background variant of the input field. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Theme color based on Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Border radius of the input and popover. |
| `label` | `ReactNode` | — | Label displayed alongside the input field. |
| `labelPlacement` | `'top' \| 'left' \| 'floating'` | `'top'` | Placement of the label. |
| `placeholder` | `string` | Auto | Placeholder text when input field is empty. |
| `placeholders` | `[string, string]` | — | Distinct placeholder strings for Start and End inputs. |
| `helperText` | `ReactNode` | — | Helper text displayed beneath the input field. |
| `errorMessage` | `ReactNode` | — | Error message (automatically activates red error border and appearance animation). |
| `disabled` | `boolean` | `false` | Disables all user interaction with the input. |
| `readOnly` | `boolean` | `false` | View-only mode; prevents opening the datetime popover. |
| `config` | `DateTimeRangePickerConfig` | — | Consolidated configuration flags object (see table below). |
| `placement` | `Placement` | `'bottom-start'` | Popover positioning relative to the input field (Floating UI). |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref to the underlying HTML `<input>` element. |

---

### `DateTimeRangePickerConfig`

| Property | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Displays a red asterisk `*` and marks `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Enables red error border state and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Locks interactions and sets `aria-busy="true"` and `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Displays a loading spinner icon when `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Displays a quick clear button when a datetime range is selected. |
| `isFullWidth` | `boolean` | `false` | Expands width to occupy 100% of parent container. |
| `closeOnSelect` | `boolean` | `false` | Automatically closes the popover after selecting both Start and End endpoints. |
| `showWeekNumbers` | `boolean` | `false` | Displays ISO week number column in the calendar panel. |
| `showViewTabs` | `boolean` | `false` | Displays Days / Months / Years view switcher tabs on the calendar. |
