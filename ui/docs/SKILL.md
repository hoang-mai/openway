---
name: openway-ui
description: Comprehensive guide and API reference for the OpenWay UI Design System (@openway/ui). Use this skill whenever generating, modifying, or refactoring UI components, forms, tables, modals, pickers, or infinite scroll queries.
---

# OpenWay UI Design System Skill

This skill teaches the Antigravity agent how to leverage the `@openway/ui` component library effectively when building user interfaces.

## Quick Lookup by Functional Need

When the user asks for:
- **Button, action trigger**: Use `<Button>` or `<IconButton>` ([docs/components/button.md](./components/button.md)).
- **Text, number input**: Use `<Input>` ([docs/components/input.md](./components/input.md)).
- **Long text input**: Use `<Textarea>` ([docs/components/textarea.md](./components/textarea.md)).
- **Dropdown single/multi select**: Use `<Select>` or `<MultiSelect>` ([docs/components/select.md](./components/select.md)).
- **Server pagination / Infinite scroll dropdown**: Use `<Select>` with `useSelectInfiniteQuery` from `@openway/ui/query` ([docs/components/select.md](./components/select.md)).
- **Checkboxes**: Use `<Checkbox>` or `<CheckboxGroup>` ([docs/components/checkbox.md](./components/checkbox.md)).
- **Radio options**: Use `<Radio>` or `<RadioGroup>` ([docs/components/radio.md](./components/radio.md)).
- **Switch / Toggle**: Use `<Toggle>` ([docs/components/toggle.md](./components/toggle.md)).
- **Data Table**: Use `<Table>` ([docs/components/table.md](./components/table.md)).
- **Modal / Popup dialog**: Use `<Modal>` or `<Confirm>` ([docs/components/modal.md](./components/modal.md), [docs/components/confirm.md](./components/confirm.md)).
- **Tooltip**: Use `<Tooltip>` ([docs/components/tooltip.md](./components/tooltip.md)).
- **Inline Alert / Notification**: Use `<Alert>` ([docs/components/alert.md](./components/alert.md)).
- **Floating Toast**: Use `toast` ([docs/components/toast.md](./components/toast.md)).
- **Date/Time Picker**: Use `<DatePicker>`, `<DateRangePicker>`, `<TimePicker>`, or `<DateTimePicker>` ([docs/components/datepicker.md](./components/datepicker.md)).
- **File / Image Upload**: Use `<UploadFile>`, `<UploadAvatar>`, or `<UploadImage>` ([docs/components/upload-image.md](./components/upload-image.md)).
- **Infinite scroll list**: Use `useInfiniteScroll` from `@openway/ui` ([docs/hooks/useInfiniteScroll.md](./hooks/useInfiniteScroll.md)).
- **Server-side Table Query**: Use `useTableQuery` from `@openway/ui/query` ([docs/hooks/useTableQuery.md](./hooks/useTableQuery.md)).
- **Server-side Select Infinite Query**: Use `useSelectInfiniteQuery` from `@openway/ui/query` ([docs/hooks/useSelectInfiniteQuery.md](./hooks/useSelectInfiniteQuery.md)).
- **Debounce Value / Callback**: Use `useDebounce` or `useDebouncedCallback` ([docs/hooks/useDebounce.md](./hooks/useDebounce.md)).

## Code Generation Guidelines

1. **Imports (Granular Subpath Imports for Optimal Tree Shaking)**:
   ```tsx
   import { Button } from "@openway/ui/button";
   import { Input } from "@openway/ui/input";
   import { Select } from "@openway/ui/select";
   import { Table } from "@openway/ui/table";
   import { Modal } from "@openway/ui/modal";
   // For TanStack Query server integration:
   import { useSelectInfiniteQuery } from "@openway/ui/query";
   // For i18n localization:
   import { OpenWayProvider, viVN } from "@openway/ui/locale";
   ```
2. **Zero `any`**:
   Always type props, states, and option entities strictly:
   ```tsx
   interface Department {
     id: string;
     name: string;
   }
   const options: SelectOptionItem<Department>[] = ...;
   ```
3. **Accessibility (WAI-ARIA)**:
   Always supply `aria-label` when using `<IconButton>`.
   Always associate labels with inputs using `label` prop.
4. **Tailwind CSS v4 Tokens**:
   Rely on theme tokens (`primary`, `secondary`, `neutral`, `error`, `success`, `warning`, `info`) rather than raw hex codes (`#123456`).
