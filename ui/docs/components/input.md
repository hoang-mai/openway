# 🔤 Input Component Suite (`@openway/ui`)

A comprehensive, flexible, and interactive **Input** component suite designed to strict **Design System** standards, featuring **Safe Config Fallback**, **Floating Labels**, **Loading & Spinners**, and full compliance with **WAI-ARIA Accessibility** standards.

---

## 🌟 Highlights

- **Diverse Specialized Input Variants**:
  - `<Input>`: Standard text input (text, email, url, tel, search...).
  - `<PasswordInput>`: Password input with an integrated visibility toggle button.
  - `<NumberInput>`: Number input supporting real-time thousand/decimal separators, currency formatting, and intelligent min/max limits.
  - `<OtpInput>`: Discrete slotted OTP input supporting mobile SMS autofill, smart paste, and intelligent focus switching.
  - `<MultiInput>`: Multi-value tag/chip input supporting rapid deletion, badge preview, and truncation.
- **5 Standard Sizes (`size`)**: `xs` (24px), `sm` (32px), `md` (40px - *default*), `lg` (48px), `xl` (56px) with proportional typography, padding, icon, and label sizing.
- **3 Visual Variants (`variant`)**:
  - `outline` *(default)*: Crisp border around the input container; changes to theme color on hover/focus.
  - `filled`: Subtle pastel background (`bg-{color}-50/60`) with harmonized borders.
  - `ghost`: Transparent, clean background that highlights only on hover/focus.
  - `other`: Skips default color classes to allow unrestricted custom styling via `inputWrapperClassName`.
- **7 Color Themes (`color`)**: `primary`, `secondary`, `error`, `success`, `warning`, `info`, `neutral`.
- **6 Border Radius Options (`radius`)**: `none`, `sm`, `md` (*default*), `lg`, `xl`, `full`.
- **3 Label Placements (`labelPlacement`)**:
  - `floating` *(default)*: Floating label pinned cleanly over the top border of the input container.
  - `top`: Label placed above the input field.
  - `left`: Label aligned horizontally to the left of the input field.
- **Loading & Spinner States (`isLoading` & `showSpinner`)**:
  - `isLoading={true}`: Automatically disables interactions (`disabled`), triggering `aria-busy="true"` and `aria-disabled="true"`.
  - `showSpinner`: Defaults to `false`. Set `showSpinner={true}` to display a rotating spinner on the right.
- **Flexible Slots**: Supports `leftIcon`, `rightIcon`, `leftAddon`, `rightAddon`, and quick clear button `isClearable`.
- **Safe Config Fallback**: Built-in `getSafeConfig` utility guarantees resilient operation, preventing runtime crashes even with invalid prop values.

---

## 🚀 Installation & Import

```tsx
import {
  Input,
  PasswordInput,
  NumberInput,
  OtpInput,
  MultiInput,
  splitTagsFromText,
  isValidOtpChar,
  sanitizeOtpString,
} from "@openway/ui";
import type {
  InputProps,
  InputConfig,
  PasswordInputProps,
  NumberInputProps,
  OtpInputProps,
  OtpInputConfig,
  OtpInputRef,
  OtpInputType,
  MultiInputProps,
  MultiInputConfig,
  InputSize,
  InputVariant,
  InputColor,
  InputRadius,
  InputLabelPlacement,
} from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Basic Usage

```tsx
import { Input } from "@openway/ui";

export function BasicInputExample() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input label="Full Name" placeholder="John Doe" />
      <Input label="Email" type="email" placeholder="example@domain.com" />
    </div>
  );
}
```

---

### 2. Label Placement (`labelPlacement`)

```tsx
// 1. Floating (Default)
<Input label="Floating Label" labelPlacement="floating" placeholder="Enter text..." />

// 2. Top (Above)
<Input label="Top Label" labelPlacement="top" placeholder="Enter text..." />

// 3. Left (Aligned horizontally)
<Input label="Left Label" labelPlacement="left" placeholder="Enter text..." />
```

---

### 3. Icons & Addons

```tsx
<Input
  label="Website"
  leftAddon="https://"
  rightAddon=".com"
  placeholder="mywebsite"
/>

<Input
  label="Search"
  leftIcon={<SearchIcon />}
  isClearable={true}
  placeholder="Search keywords..."
/>
```

---

### 4. Loading & Quick Clear States

```tsx
<Input
  label="Loading Data"
  isLoading={true}
  showSpinner={true}
  defaultValue="Synchronizing..."
/>
```

---

### 5. Validation Errors & Helper Text

```tsx
<Input
  label="Password"
  isRequired={true}
  errorMessage="Password must be at least 8 characters!"
  isInvalid={true}
/>

<Input
  label="Username"
  helperText="Lowercase letters and numbers only."
/>
```

---

## 🛠 Props Specification (`InputProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Visual size preset (font size, height, padding, icon and label sizing). |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Visual appearance variant. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Theme color per Design System. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Corner radius of the input container (defaults per size). |
| `label` | `ReactNode` | — | Label displayed for the input field. |
| `labelPlacement` | `'floating' \| 'top' \| 'left'` | `'floating'` | Position of the label. |
| `config` | `InputConfig` | — | Consolidated configuration flags object (`isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `isClearable`, `isFullWidth`). |
| `helperText` | `ReactNode` | — | Helper text displayed beneath the input. |
| `errorMessage` | `ReactNode` | — | Error message displayed on validation failure (activates error border). |
| `leftIcon` | `ReactNode` | — | Leading icon displayed at the start of the input. |
| `rightIcon` | `ReactNode` | — | Trailing icon displayed at the end of the input. |
| `leftAddon` | `ReactNode` | — | Fixed addon / prefix prepended to the input (e.g., `'https://'`). |
| `rightAddon` | `ReactNode` | — | Fixed addon / suffix appended to the input (e.g., `'.com'`). |
| `onClear` | `() => void` | — | Callback invoked when clicking the quick clear button. |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref to the underlying HTML `<input>` element. |

---

## 💵 NumberInput Component

The **`NumberInput`** component is specialized for numeric values, currency, weight, and exchange rates with **real-time thousand and decimal formatting**, **cursor position preservation without jumping**, **mobile keyboard optimization (`inputMode`)**, and **intelligent min/max limits**.

### 🌟 Highlights of NumberInput
- **Real-Time Numeric Formatting**: Automatically formats delimiters as the user types (e.g., `1000000` -> `1,000,000` or `1.000.000`).
- **Precise Cursor Tracking**: Accurately tracks cursor position through formatting insertions/deletions so users can edit in the middle of digits without cursor jumping to the end.
- **Mobile Keyboard Optimization**: Automatically engages `inputMode="numeric"` or `inputMode="decimal"` when decimal inputs are allowed.
- **International Formatting Support**: Easily configure `thousandSeparator` and `decimalSeparator` (Vietnamese `.` / `,` or US `,` / `.`).
- **Intelligent Min / Max Limits**: Clamps `max` in real-time to prevent exceeding thresholds, while allowing digit-by-digit entry for positive `min` and auto-clamping on `onBlur`.
- **Flexible `value` Types**: Accepts either numeric values (`value={1000000}`) or formatted strings (`value="1,000,000"`).

### 📖 Usage Examples for `NumberInput`

#### 1. Basic Currency Input (Vietnamese Standard)
```tsx
import { NumberInput } from "@openway/ui";

export function CurrencyExample() {
  const [amount, setAmount] = useState<string | number>("");

  return (
    <NumberInput
      label="Payment Amount"
      rightAddon="VND"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="0"
    />
  );
}
```

#### 2. Decimal Number Input (Weight or USD Currency)
```tsx
<NumberInput
  label="Weight"
  rightAddon="kg"
  maxDecimalDigits={2}
  decimalSeparator=","
  thousandSeparator="."
  placeholder="0,00"
/>

<NumberInput
  label="USD Amount"
  leftAddon="$"
  maxDecimalDigits={2}
  decimalSeparator="."
  thousandSeparator=","
  placeholder="0.00"
/>
```

#### 3. Min & Max Limits
```tsx
<NumberInput
  label="Ticket Quantity"
  min={1}
  max={10}
  helperText="Minimum 1 ticket, maximum 10 tickets per purchase."
/>
```

---

### 🛠 Props Specification (`NumberInputProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `value` | `string \| number \| null` | — | Current numeric or formatted string value (Controlled mode). |
| `defaultValue` | `string \| number \| null` | — | Initial default value (Uncontrolled mode). |
| `min` | `number` | — | Minimum allowed value (clamped on `onBlur` or when negative numbers exceed bounds). |
| `max` | `number` | — | Maximum allowed value (clamped in real-time during typing). |
| `thousandSeparator` | `string` | `'.'` | Character used as the thousands separator. |
| `decimalSeparator` | `string` | `','` | Character used as the decimal separator. |
| `maxDecimalDigits` | `number` | `0` | Maximum number of decimal places (`0` denotes integers only). |
| `allowNegative` | `boolean` | — | Allows negative numbers (defaults to `true` if `min < 0` or `min` is unset). |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | — | Callback invoked when the input value changes. |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` | — | Callback invoked when focus leaves the input (auto-clamps `min`). |
| `...props` | `InputProps` | — | Inherits all props from `Input` (`size`, `variant`, `color`, `radius`, `label`, `config`, `leftIcon`, `rightAddon`, ...). |

---

## 🔢 OtpInput Component

The **`OtpInput`** component is specialized for one-time passwords (OTP) or PIN code entry across discrete character slots, featuring **Mobile SMS Autofill**, **Smart Paste**, **Keyboard Navigation**, **Auto-selection on focus for seamless overwriting**, and **HTML Form Integration**.

### 🌟 Highlights of OtpInput
- **Automatic Focus Traversal**: Automatically moves focus to the next slot on input, moves back to the previous slot on `Backspace`.
- **Mobile SMS Autofill & Smart Paste**: Intercepts direct `onPaste` events as well as iOS/Android SMS one-time-code autofill `onChange` events.
- **Auto-Selection on Focus (`onFocus select`)**: Selects existing slot contents on click or focus, allowing immediate overwriting without manual deletion.
- **Direct Ref Controls (`OtpInputRef`)**: Supports `ref.current.getValue()`, `ref.current.clear()`, and `ref.current.focus(index)`.
- **Native HTML Form Integration**: Automatically renders `<input type="hidden" name={name} value={...}>` to submit the full joined OTP string in standard `<form>` or `FormData` submissions.
- **Flexible Grouping**: Supports `groupSize` and `separator` (e.g., grouped `3-3`: `123 - 456`).
- **Masking & Security**: Supports `mask={true}` or `type="password"`.

### 📖 Usage Examples for `OtpInput`

#### 1. Basic Usage & Completion Listener
```tsx
import { OtpInput } from "@openway/ui";

export function OtpBasicExample() {
  return (
    <OtpInput
      length={6}
      label="OTP Verification Code"
      helperText="Enter the 6-digit code sent to your phone number."
      onChange={(val) => console.log("Entering:", val)}
      onComplete={(val) => console.log("Filled all 6 digits:", val)}
    />
  );
}
```

#### 2. Controlled via Ref (`OtpInputRef`)
```tsx
import { useRef } from "react";
import { OtpInput, type OtpInputRef } from "@openway/ui";

export function OtpRefExample() {
  const otpRef = useRef<OtpInputRef>(null);

  const handleResend = () => {
    // Clears all slots and automatically refocuses the first slot
    otpRef.current?.clear();
  };

  const handleCheck = () => {
    const code = otpRef.current?.getValue();
    alert(`Current code: ${code}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <OtpInput ref={otpRef} length={4} />
      <div className="flex gap-2">
        <button onClick={handleResend}>Resend Code</button>
        <button onClick={handleCheck}>Verify Code</button>
      </div>
    </div>
  );
}
```

#### 3. Grouping & Masked Display (PIN)
```tsx
<OtpInput
  length={6}
  groupSize={3}
  separator="-"
  mask={true}
  label="Transaction PIN"
/>
```

#### 4. State Configuration via `config` (`OtpInputConfig`)
```tsx
<OtpInput
  length={6}
  name="otp_token"
  config={{
    isRequired: true,
    isLoading: isSubmitting,
    showSpinner: true,
    isInvalid: hasError,
  }}
  errorMessage={hasError ? "OTP code is incorrect or has expired!" : undefined}
/>
```

---

### 🛠 Props Specification (`OtpInputProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `length` | `number` | `6` | Total number of OTP character slots. |
| `value` | `string` | — | Current OTP string value (Controlled mode). |
| `defaultValue` | `string` | `""` | Initial default OTP string (Uncontrolled mode). |
| `onChange` | `(value: string) => void` | — | Callback invoked whenever the OTP string changes. |
| `onComplete` | `(value: string) => void` | — | Callback invoked when all slots are completely filled. |
| `type` | `'numeric' \| 'alphanumeric' \| 'password'` | `'numeric'` | Character type allowed for input. |
| `mask` | `boolean \| string` | `false` | Masks entered characters (password bullet style). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Dimensions of each slot (`xs`: 24px, `sm`: 32px, `md`: 40px, `lg`: 48px, `xl`: 56px). |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Visual appearance variant for each slot. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Theme color applied on focus. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Corner radius of each slot. |
| `config` | `OtpInputConfig` | — | Consolidated configuration flags (`isRequired`, `isInvalid`, `isLoading`, `showSpinner`). |
| `id` | `string` | — | Custom ID prefix (generates `${id}-slot-${index}`). |
| `name` | `string` | — | Form field name (renders hidden input with full combined OTP string). |
| `autoFocus` | `boolean` | `false` | Automatically focuses the first empty slot on mount. |
| `disabled` | `boolean` | `false` | Disables interaction across all slots. |
| `readOnly` | `boolean` | `false` | Read-only mode; prevents modifications. |
| `groupSize` | `number` | — | Number of slots per visual group (e.g. `3` for `3-3` grouping). |
| `separator` | `ReactNode` | `'-'` | Separator character or icon between slot groups. |
| `label` | `ReactNode` | — | Label describing the OTP field. |
| `labelPlacement` | `'top' \| 'left'` | `'top'` | Position of the label. |
| `helperText` | `ReactNode` | — | Helper guidance text displayed beneath the slots. |
| `errorMessage` | `ReactNode` | — | Error message displayed on validation error. |
| `allowOneTimeCode` | `boolean` | `true` | Allows mobile OS autofill from incoming SMS (`autoComplete="one-time-code"`). |
| `getSlotAriaLabel` | `(index: number, length: number) => string` | — | Custom `aria-label` generator for each slot (for i18n support). |
| `ref` | `Ref<OtpInputRef>` | — | Ref exposing programmatic methods: `getValue()`, `clear()`, `focus(index)`. |

---

### ⚙️ `OtpInputConfig` Options

| Property | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Displays red asterisk `*` and sets `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Activates error state and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Disables interactions and sets `aria-busy="true"`. |
| `showSpinner` | `boolean` | `false` | Displays a loading spinner next to OTP slots when `isLoading={true}`. |

---

### 🎛️ `OtpInputRef` Methods

| Method | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `getValue()` | — | `string` | Retrieves the full current OTP string (e.g., `"123456"`). |
| `clear()` | — | `void` | Clears all slots, triggers `onChange("")`, and refocuses the first slot. |
| `focus(index?)` | `index?: number` | `void` | Moves focus to the specified slot (defaults to first slot `index = 0`). |

---

## 🏷️ MultiInput Component

The **`MultiInput`** component is specialized for multiple values (tags, keywords, chips, email lists...) with **automatic delimiter splitting on typing or pasting**, **duplicate prevention**, **tag count limits**, **compact `+N` truncation**, and **HTML Form submission as array inputs (`name[]`)**.

### 🌟 Highlights of MultiInput
- **Flexible Tag Creation**: Press `Enter`, `Comma (,)`, `Tab`, `Space` (or customize via `delimiters`).
- **Intelligent Paste Parsing**: Automatically detects multi-value paste strings (e.g., `"React, Vue; Angular\nSvelte"`) and splits them into distinct tags.
- **Limit Management & Validation**: Supports duplicate prevention (`allowDuplicates={false}`), tag limit (`maxTags`), max tag length (`maxTagLength`), and custom validation (`validateTag`).
- **Tag Count Truncation (`+N`)**: Keeps UI tidy with `maxTagCount` (e.g., display 3 tags and collapse remainder into `+5` badge).
- **Native HTML Form Integration**: When `name="tags"` is provided, automatically generates hidden `<input type="hidden" name="tags[]" value="..." />` inputs compatible with `FormData` and backend endpoints.
- **Full UI Customizability**: Supports `leftIcon`, `leftAddon`, `rightAddon`, quick add button `showAddButton` (`+`), and full custom tag rendering via `renderTag`.

### 📖 Usage Examples for `MultiInput`

#### 1. Basic Usage with Enter & Comma
```tsx
import { MultiInput } from "@openway/ui";

export function BasicTagsExample() {
  return (
    <MultiInput
      label="Professional Skills"
      placeholder="Type a skill and press Enter..."
      delimiters={["Enter", ","]}
      defaultValue={["React", "TypeScript"]}
      onChange={(tags) => console.log("Tag list:", tags)}
    />
  );
}
```

#### 2. Quick Add Button & Tag Limits
```tsx
<MultiInput
  label="Search Keywords"
  showAddButton={true}
  maxTags={5}
  onMaxTagsReached={(tag) => alert(`Maximum of 5 tags reached!`)}
  placeholder="Enter keywords..."
/>
```

#### 3. Display Truncation (`maxTagCount`) & Duplicate Detection
```tsx
<MultiInput
  label="Product Categories"
  maxTagCount={3}
  allowDuplicates={false}
  onDuplicate={(tag) => alert(`Tag "${tag}" already exists!`)}
  defaultValue={["Electronics", "Home & Kitchen", "Fashion", "Beauty", "Books"]}
/>
```

#### 4. State Configuration via `config` (`MultiInputConfig`)
```tsx
<MultiInput
  name="user_skills"
  label="Required Skills"
  config={{
    isRequired: true,
    isClearable: true,
    isFullWidth: true,
    isLoading: isSubmitting,
    showSpinner: true,
  }}
/>
```

---

### 🛠 Props Specification (`MultiInputProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `value` | `string[]` | — | Current array of tags (Controlled mode). |
| `defaultValue` | `string[]` | `[]` | Initial default tags array (Uncontrolled mode). |
| `onChange` | `(values: string[]) => void` | — | Callback invoked whenever the tag list changes. |
| `inputValue` | `string` | — | Current draft text inside the input field (Controlled). |
| `onInputValueChange` | `(value: string) => void` | — | Callback invoked when the draft text changes. |
| `delimiters` | `string[]` | `['Enter']` | Array of keys that trigger tag creation (`'Enter'`, `','`, `'Tab'`, `'Space'`). |
| `showAddButton` | `boolean` | `false` | Displays a (+) button at the end of the input to create tags on click. |
| `renderAddButton` | `(props: { onAdd: () => void; disabled?: boolean }) => ReactNode` | — | Custom renderer for the (+) add tag button. |
| `addOnBlur` | `boolean` | `false` | Automatically creates a tag from draft text when focus leaves the input. |
| `addOnPaste` | `boolean` | `true` | Automatically splits strings pasted into the input into tags. |
| `pasteSplitRegex` | `RegExp` | `/[\r\n,;\t]+/` | Regular expression used to parse and split pasted text. |
| `trimValues` | `boolean` | `true` | Automatically trims leading and trailing whitespace from each tag. |
| `allowDuplicates` | `boolean` | `false` | Whether duplicate tags are allowed. |
| `onDuplicate` | `(value: string) => void` | — | Callback invoked when attempting to add an already existing tag. |
| `maxTags` | `number` | — | Maximum number of tags allowed in the list. |
| `onMaxTagsReached` | `(value: string) => void` | — | Callback invoked when the `maxTags` threshold is reached. |
| `maxTagLength` | `number` | — | Maximum character length for a single tag. |
| `validateTag` | `(tag: string) => boolean \| string` | — | Validation function for tag strings (returns `false` or error string). |
| `onValidateError` | `(tag: string, error?: string) => void` | — | Callback invoked when a tag fails validation. |
| `maxTagCount` | `number` | — | Maximum number of tags displayed before collapsing into `+N`. |
| `renderTag` | `(props: TagRenderProps) => ReactNode` | — | Custom renderer function for badge tags. |
| `tagVariant` | `BadgeVariant` | `'soft'` | Visual appearance variant for badge tags. |
| `tagColor` | `BadgeColor` | `'primary'` | Theme color for badge tags. |
| `tagRadius` | `BadgeRadius` | — | Corner radius for badge tags (inherits from Input if omitted). |
| `tagSize` | `BadgeSize` | — | Size of badge tags (inherits from `size` if omitted). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Overall size of MultiInput. |
| `variant` | `'outline' \| 'filled' \| 'ghost' \| 'other'` | `'outline'` | Visual appearance variant of the input frame. |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Theme color for borders and focus outlines. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | — | Corner radius of the input frame. |
| `label` | `ReactNode` | — | Label displayed for MultiInput. |
| `labelPlacement` | `'floating' \| 'top' \| 'left'` | `'floating'` | Position of the label. |
| `config` | `MultiInputConfig` | — | Consolidated configuration flags (`isRequired`, `isInvalid`, `isLoading`, `showSpinner`, `isClearable`, `isFullWidth`). |
| `id` | `string` | — | Custom ID for the input element. |
| `name` | `string` | — | Form field name (automatically renders hidden inputs `name[]` for tags). |
| `placeholder` | `string` | `'Type and press Enter...'` | Placeholder text when the tag list is empty. |
| `disabled` | `boolean` | `false` | Disables all user interaction. |
| `readOnly` | `boolean` | `false` | Read-only mode; prevents adding or removing tags. |
| `autoFocus` | `boolean` | `false` | Automatically focuses the input upon mounting. |
| `leftIcon` | `ReactNode` | — | Leading icon displayed at the start of the input. |
| `leftAddon` | `ReactNode` | — | Fixed addon prepended to the left. |
| `rightIcon` | `ReactNode` | — | Trailing icon displayed at the end of the input. |
| `rightAddon` | `ReactNode` | — | Fixed addon appended to the right. |
| `helperText` | `ReactNode` | — | Helper guidance text displayed beneath the input. |
| `errorMessage` | `ReactNode` | — | Error message displayed beneath the input. |
| `onClear` | `() => void` | — | Callback invoked when clicking the button to clear all tags. |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref to the underlying HTML `<input>` element. |

---

### ⚙️ `MultiInputConfig` Options

| Property | Type | Default | Description |
| :--- | :--- | :---: | :--- |
| `isRequired` | `boolean` | `false` | Displays red asterisk `*` and sets `aria-required="true"`. |
| `isInvalid` | `boolean` | `false` | Activates red error border and sets `aria-invalid="true"`. |
| `isLoading` | `boolean` | `false` | Disables interaction and sets `aria-busy="true"`. |
| `showSpinner` | `boolean` | `false` | Displays loading spinner icon when `isLoading={true}`. |
| `isClearable` | `boolean` | `false` | Displays quick clear button when at least 1 tag or text is present. |
| `isFullWidth` | `boolean` | `false` | Expands width to occupy 100% of parent container. |

---

## 🛠️ Utility Functions

The package exports dedicated helper functions for numbers, OTP, and tag parsing:

| Function | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `splitTagsFromText(text, splitRegex?, trim?)` | `text: string, splitRegex?: RegExp, trim?: boolean` | `string[]` | Splits text strings (from typing or pasting) into independent tags using delimiter regex and trims excess whitespace. |
| `isValidOtpChar(char, type)` | `char: string, type: OtpInputType` | `boolean` | Validates whether a typed character conforms to the specified OTP type (`numeric`, `alphanumeric`, `alpha`). |
| `sanitizeOtpString(text, type)` | `text: string, type: OtpInputType` | `string` | Sanitizes a text string, retaining only valid characters for the specified OTP type. |
| `formatNumberString(...)` | `value: string, options?: NumberFormatOptions` | `string` | Formats number strings with thousand and decimal separators. |
| `parseRawNumberString(value)` | `value: string` | `string` | Parses formatted display number strings back into raw numeric representations. |
