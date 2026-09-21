# 📅 DatePicker Component Suite (`@openway/ui`)

A comprehensive, flexible, and highly interactive **DatePicker** & **Calendar** component suite designed to strict **Design System** standards, featuring **3 View Modes (Days / Months / Years)**, **standardized data formatting (`format`)**, **adaptive visual display (`displayFormat`)**, **ISO week numbering (`showWeekNumbers`)**, and full **WAI-ARIA Accessibility** compliance.

> [!NOTE]
> Starting in **v2.0.0**, locale configuration (month names, weekday abbreviations, aria-labels, etc.) is handled globally via `<OpenWayProvider>` (see [i18n documentation](../i18n.md)) rather than individual component props. Individual `locale` props on `DatePicker` and `Calendar` can still be passed for localized overrides when needed.

---

## 🌟 Highlights

- **Separation of Data (`format`) and Display (`displayFormat`)**:
  - `format` *(default `'DD/MM/YYYY'`)*: Ensures data stored in State/Form and emitted through `onChange` is 100% consistent with defined standards.
  - `displayFormat` *(optional)*: Allows displaying a user-facing presentation format different from the underlying storage format (for example, `format="YYYY-MM-DD"` stored in the database, while `displayFormat="DD/MM/YYYY"` is displayed for end users).
- **3 Flexible View Modes (`view` & `viewTabs`)**:
  - `days`: Pick a specific day within the month.
  - `months`: Pick a month within the year (automatically adapts formatting to `MM-YYYY` / `MM/YYYY` / `YYYY-MM`).
  - `years`: Pick a year within the decade (automatically adapts formatting to `YYYY`).
  - **Smart Drill-down**: Click on the month/year header in the calendar to navigate quickly without altering the active tab.
- **Standalone `<Calendar>` Component**: Can be used independently as an inline or static calendar embedded directly in the view.
- **5 Standard Sizes (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *default*), `lg` (48px), `xl` (56px).
- **3 Visual Variants (`variant`)**: `outline` *(default)*, `filled`, `ghost`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Border Radius Options (`radius`)**: `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **3 Label Placements (`labelPlacement`)**: `top` *(default)*, `left`, `floating`.
- **Internationalization (`locale`)**: Built-in support for Vietnamese (`'vi'`), English (`'en'`), and custom `DatePickerLocale`. Centrally configured via `OpenWayProvider` since v2.0.0.
- **ISO Week Numbers (`showWeekNumbers`)**: Automatically calculates standard ISO 8601 week numbers with a `#` header column and `W1` - `W53` tags.
- **Safe Config Fallback**: Built-in `getSafeConfig` utility guarantees resilient operation without crashing even if invalid props are passed.

---

## 🚀 Installation & Import

```tsx
import { DatePicker, Calendar } from "@openway/ui";
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
  DatePickerLocale,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage

```tsx
import { useState } from "react";
import { DatePicker } from "@openway/ui";

export function BasicDatePickerExample() {
  const [date, setDate] = useState<string | null>("25/08/2026");

  return (
    <DatePicker
      label="Date of birth"
      value={date}
      onChange={setDate}
      placeholder="DD/MM/YYYY"
    />
  );
}
```

---

### 2. Data Formatting (`format`) vs. Display Formatting (`displayFormat`)

```tsx
// 1. Shared ISO format for both data and visual display
<DatePicker 
  label="Effective Date (ISO)" 
  format="YYYY-MM-DD" 
  defaultValue="2026-08-25" 
/>

// 2. Standard ISO data (for APIs/databases) with formatted local display (DD/MM/YYYY)
<DatePicker
  label="Contract Signing Date"
  format="YYYY-MM-DD"        // onChange returns: "2026-08-25"
  displayFormat="DD/MM/YYYY" // Input field displays: "25/08/2026"
  defaultValue="2026-08-25"
/>

// 3. US Date Format (MM/DD/YYYY)
<DatePicker 
  label="US Format" 
  format="MM/DD/YYYY" 
  defaultValue="08/25/2026" 
/>
```

---

### 3. Integrated View Tabs (Days / Months / Years)

Enable `config={{ showViewTabs: true }}` to allow users to switch selection modes quickly:

```tsx
<DatePicker
  label="Reporting Period"
  format="YYYY-MM-DD"
  displayFormat="DD-MM-YYYY"
  config={{ showViewTabs: true, isClearable: true }}
  // In Days tab: Displays "25-08-2026", onChange emits "2026-08-25"
  // In Months tab: Displays "08-2026", onChange emits "2026-08-01"
  // In Years tab: Displays "2026", onChange emits "2026-01-01"
/>
```

---

### 4. Standalone `<Calendar>` (Static Calendar)

```tsx
import { useState } from "react";
import { Calendar } from "@openway/ui";

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

### 5. Label Placement (`labelPlacement`)

```tsx
// 1. Top (Above - Default)
<DatePicker label="Start Date" labelPlacement="top" />

// 2. Left (Aligned horizontally to the left)
<DatePicker label="Start Date" labelPlacement="left" />

// 3. Floating (Floating within border)
<DatePicker label="Start Date" labelPlacement="floating" />
```

---

### 6. Form States & Loading

```tsx
// Required field
<DatePicker label="Appointment Date" config={{ isRequired: true }} />

// Validation error (Invalid)
<DatePicker
  label="End Date"
  defaultValue="10/08/2026"
  errorMessage="End date must be greater than start date."
  config={{ isInvalid: true }}
/>

// Loading state with spinner
<DatePicker
  label="Synchronizing"
  defaultValue="25/08/2026"
  config={{ isLoading: true, showSpinner: true }}
/>

// Disabled or Read-Only
<DatePicker label="Unavailable" disabled={true} defaultValue="25/08/2026" />
<DatePicker label="View only" readOnly={true} defaultValue="25/08/2026" />
```

---

## 🛠 Props Specification

### `DatePickerProps`

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `value` | `Date \| string \| number` | — | Currently selected date value (Controlled). |
| `defaultValue` | `Date \| string \| number` | — | Initial default date value (Uncontrolled). |
| `onChange` | `(date: string \| null) => void` | — | Callback invoked when the date changes (returns formatted string per `format`, or `null` when cleared). |
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
| `config` | `DatePickerConfig` | — | Consolidated configuration flags object (see table below). |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref to the underlying HTML `<input>` element. |

---

### `DatePickerConfig`

| Property | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Displays a red asterisk `*` and marks `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Enables red error border state and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Locks interactions and sets `aria-busy="true"` and `aria-disabled="true"`. |
| `showSpinner` | `boolean` | `false` | Displays a loading spinner icon when `isLoading={true}`. |
| `isClearable` | `boolean` | `true` | Displays a quick clear button when a date is selected. |
| `isFullWidth` | `boolean` | `false` | Expands width to occupy 100% of parent container. |
| `showWeekNumbers` | `boolean` | `false` | Displays ISO week number column in the calendar. |
| `showViewTabs` | `boolean` | `false` | Displays the Days / Months / Years view switcher tab bar. |
| `closeOnSelect` | `boolean` | `true` | Automatically closes the calendar popover after selecting a date. |

---

### `CalendarProps` (Standalone)

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `value` | `Date \| null` | — | Currently selected Date object. |
| `onChange` | `(date: Date) => void` | — | Callback invoked when selecting a date on the calendar. |
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
| `size` | `DatePickerSize` | `'md'` | Size of date cells and navigation buttons in the calendar. |
| `color` | `DatePickerColor` | `'primary'` | Color theme per Design System. |
| `radius` | `DatePickerRadius` | `'lg'` | Border radius of the calendar container. |
