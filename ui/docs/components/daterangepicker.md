# 📆 DateRangePicker Component Suite (`@openway/ui`)

A comprehensive, flexible, and highly interactive **DateRangePicker** & **DateRangeCalendar** component suite designed to strict **Design System** standards, featuring **Side-by-side Dual Month Range Selection**, **3 View Modes (Days / Months / Years)**, **standardized data formatting (`format`)**, **adaptive visual display (`displayFormat`)**, **ISO week numbering (`showWeekNumbers`)**, and full **WAI-ARIA Accessibility** compliance.

> [!NOTE]
> Starting in **v2.0.0**, locale configuration (month names, weekday abbreviations, aria-labels, etc.) is handled globally via `<OpenWayProvider>` (see [i18n documentation](../i18n.md)) rather than individual component props. Individual `locale` props on `DateRangePicker` and `DateRangeCalendar` can still be passed for localized overrides when needed.

---

## 🌟 Highlights

- **Intuitive Range Selection (Dual Side-by-Side Months)**:
  - Displays two consecutive months simultaneously side-by-side, making multi-month range selections seamless and clear.
  - Supports interactive hover preview effects across the range (Hover Range Preview).
- **Separation of Data (`format`) and Display (`displayFormat`)**:
  - `format` *(default `'DD/MM/YYYY'`)*: Data emitted through `onChange` is a 2-element array `[string, string]` adhering 100% to the specified format standard (e.g. `["2026-08-01", "2026-08-15"]`).
  - `displayFormat` *(optional)*: Customize the display text within the input field (e.g. `01/08/2026 - 15/08/2026`).
- **3 Flexible View Modes (`view` & `viewTabs`)**:
  - `days`: Select a specific date range.
  - `months`: Select a month range within the year (displays `MM-YYYY - MM-YYYY` or `MM/YYYY - MM/YYYY`).
  - `years`: Select a multi-year range within decades (displays `YYYY - YYYY`).
- **Custom Range Separator (`separator`)**: Defaults to `' - '`, customizable to `' to '`, `' ~ '`, etc.
- **Standalone `<DateRangeCalendar>` Component**: Can be used independently as an inline/static dual-calendar range picker embedded directly in the view.
- **5 Standard Sizes (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *default*), `lg` (48px), `xl` (56px).
- **3 Visual Variants (`variant`)**: `outline` *(default)*, `filled`, `ghost`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Border Radius Options (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Label Placements (`labelPlacement`)**: `top` *(default)*, `left`, `floating`.
- **Internationalization (`locale`)**: Built-in support for Vietnamese (`'vi'`), English (`'en'`), and custom `DatePickerLocale`. Centrally configured via `OpenWayProvider` since v2.0.0.
- **ISO Week Numbers (`showWeekNumbers`)**: Automatically calculates standard ISO 8601 week numbers with a `#` header column and `W1` - `W53` tags.

---

## 🚀 Installation & Import

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
  DatePickerLocale,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage

```tsx
import { useState } from "react";
import { DateRangePicker } from "@openway/ui";

export function BasicDateRangePickerExample() {
  const [range, setRange] = useState<[string, string] | null>(["01/08/2026", "15/08/2026"]);

  return (
    <DateRangePicker
      label="Leave of Absence Period"
      value={range}
      onChange={setRange}
      placeholder="DD/MM/YYYY - DD/MM/YYYY"
    />
  );
}
```

---

### 2. Data Formatting (`format`) vs. Display Formatting (`displayFormat`)

```tsx
// 1. Shared ISO format for both data and visual display
<DateRangePicker 
  label="ISO Date Range" 
  format="YYYY-MM-DD" 
  defaultValue={["2026-08-01", "2026-08-15"]} 
/>

// 2. Standard ISO data (for APIs) with formatted local display
<DateRangePicker
  label="Project Duration"
  format="YYYY-MM-DD"        // onChange returns: ["2026-08-01", "2026-08-15"]
  displayFormat="DD/MM/YYYY" // Input field displays: "01/08/2026 - 15/08/2026"
  defaultValue={["2026-08-01", "2026-08-15"]}
/>

// 3. Custom separator string
<DateRangePicker
  label="Time Period"
  separator=" to "
  defaultValue={["01/08/2026", "15/08/2026"]}
/>
```

---

### 3. Integrated View Tabs (Days / Months / Years)

Enable `config={{ showViewTabs: true }}` to allow users to select month or year ranges:

```tsx
<DateRangePicker
  label="Accounting Period / Financial Report"
  format="YYYY-MM-DD"
  displayFormat="DD-MM-YYYY"
  config={{ showViewTabs: true, isClearable: true }}
  // In Days tab: Displays "01-08-2026 - 15-08-2026", onChange emits ["2026-08-01", "2026-08-15"]
  // In Months tab: Displays "03-2026 - 08-2026", onChange emits ["2026-03-01", "2026-08-01"]
  // In Years tab: Displays "2026 - 2030", onChange emits ["2026-01-01", "2030-01-01"]
/>
```

---

### 4. Standalone `<DateRangeCalendar>` (Static Dual Calendar)

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

### 5. Label Placement (`labelPlacement`)

```tsx
// 1. Top (Above - Default)
<DateRangePicker label="Execution Period" labelPlacement="top" />

// 2. Left (Aligned horizontally to the left)
<DateRangePicker label="Execution Period" labelPlacement="left" />

// 3. Floating (Floating within border)
<DateRangePicker label="Execution Period" labelPlacement="floating" />
```

---

### 6. Form States & Loading

```tsx
// Required field
<DateRangePicker label="Validity Period" config={{ isRequired: true }} />

// Validation error (Invalid)
<DateRangePicker
  label="Date Range"
  errorMessage="Selected date range is invalid."
  config={{ isInvalid: true }}
/>

// Loading state with spinner
<DateRangePicker
  label="Loading data"
  config={{ isLoading: true, showSpinner: true }}
/>

// Disabled or Read-Only
<DateRangePicker label="Unavailable" disabled={true} />
<DateRangePicker label="View only" readOnly={true} />
```

---

## 🛠 Props Specification

### `DateRangePickerProps`

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `value` | `[DateValue, DateValue]` | — | Currently selected date range array (Controlled). |
| `defaultValue` | `[DateValue, DateValue]` | — | Initial default date range array (Uncontrolled). |
| `onChange` | `(range: [string, string] \| null) => void` | — | Callback invoked when date range changes (returns a 2-string array per `format`, or `null` when cleared). |
| `separator` | `string` | `' - '` | Separator string between the two dates inside the input field. |
| `format` | `string` | `'DD/MM/YYYY'` | Primary data format used for both input (`value`/`defaultValue`) and output (`onChange`). |
| `displayFormat` | `string` | Auto | Visual display format formatted for presentation inside the input field. |
| `defaultView` | `'days' \| 'months' \| 'years'` | `'days'` | Initial calendar view mode. |
| `view` | `'days' \| 'months' \| 'years'` | — | Active calendar view mode (Controlled). |
| `onViewChange` | `(view: CalendarView) => void` | — | Callback invoked when the user switches view modes. |
| `viewTabs` | `CalendarView[]` | `['days', 'months', 'years']` | List of tabs displayed on the view tab bar. |
| `minDate` | `Date \| string` | — | Minimum selectable date boundary. |
| `maxDate` | `Date \| string` | — | Maximum selectable date boundary. |
| `isDateDisabled` | `(date: Date) => boolean` | — | Callback function to determine if a specific date should be disabled. |
| `locale` | `'vi' \| 'en' \| DatePickerLocale` | `'en'` | Locale configuration for calendar strings. In v2.0.0+, preferred to be configured centrally via `OpenWayProvider` (see [i18n documentation](../i18n.md)). |
| `firstDayOfWeek` | `0 \| 1` | `1` | Starting day of the week: `0` (Sunday) or `1` (Monday). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the input field and trigger buttons. |
| `variant` | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | Visual variant of the input field. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Theme color based on Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Border radius of the input and calendar popover. |
| `label` | `ReactNode` | — | Label displayed alongside the input field. |
| `labelPlacement` | `'top' \| 'left' \| 'floating'` | `'top'` | Placement of the label. |
| `placeholder` | `string` | Auto | Placeholder text when input field is empty. |
| `helperText` | `ReactNode` | — | Helper text displayed beneath the input field. |
| `errorMessage` | `ReactNode` | — | Error message (automatically activates red error border and appearance animation). |
| `disabled` | `boolean` | `false` | Disables all user interaction with the input. |
| `readOnly` | `boolean` | `false` | View-only mode; prevents opening the calendar popover. |
| `placement` | `Placement` | `'bottom-start'` | Popover positioning relative to the input field (Floating UI). |
| `config` | `DateRangePickerConfig` | — | Consolidated configuration flags object (see table below). |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref to the underlying HTML `<input>` element. |

---

### `DateRangePickerConfig`

| Property | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Displays a red asterisk `*` and marks `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Enables red error border state and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Locks interactions and sets `aria-busy="true"` and `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Displays a loading spinner icon when `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Displays a quick clear button when a date range is selected. |
| `isFullWidth` | `boolean` | `false` | Expands width to occupy 100% of parent container. |
| `showWeekNumbers` | `boolean` | `false` | Displays ISO week number column in both calendar panels. |
| `showViewTabs` | `boolean` | `false` | Displays the Days / Months / Years view switcher tab bar. |
| `closeOnSelect` | `boolean` | `true` | Automatically closes the calendar popover immediately after selecting the end date. |

---

### `DateRangeCalendarProps` (Standalone)

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `value` | `[Date \| null, Date \| null]` | — | Array of 2 selected Date objects `[start, end]`. |
| `onChange` | `(range: [Date \| null, Date \| null]) => void` | — | Callback invoked when selecting a date range on the calendar. |
| `view` | `'days' \| 'months' \| 'years'` | `'days'` | Current calendar view mode. |
| `onViewChange` | `(view: CalendarView) => void` | — | Callback invoked when the user changes view mode. |
| `minDate` | `Date \| string` | — | Minimum selectable date boundary. |
| `maxDate` | `Date \| string` | — | Maximum selectable date boundary. |
| `isDateDisabled` | `(date: Date) => boolean` | — | Function to determine if a specific date is disabled. |
| `locale` | `'vi' \| 'en' \| DatePickerLocale` | `'vi'` | Locale configuration for calendar. In v2.0.0+, preferred to be configured centrally via `OpenWayProvider` (see [i18n documentation](../i18n.md)). |
| `firstDayOfWeek` | `0 \| 1` | `1` | Starting day of the week: `0` (Sunday) or `1` (Monday). |
| `showWeekNumbers` | `boolean` | `false` | Displays week numbers column. |
| `showViewTabs` | `boolean` | `false` | Displays the Days / Months / Years tab bar above the calendar. |
| `viewTabs` | `CalendarView[]` | `['days', 'months', 'years']` | List of view tabs to display. |
| `size` | `DateRangePickerSize` | `'md'` | Size of date cells and navigation buttons in the calendar. |
| `color` | `DateRangePickerColor` | `'primary'` | Color theme per Design System. |
| `radius` | `DateRangePickerRadius` | `'lg'` | Border radius of the calendar container. |
