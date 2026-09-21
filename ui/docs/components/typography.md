# ✍️ Typography Component (`@openway/ui`)

A unified, comprehensive **Typography** component faithfully adhering to the **Notion Design System** aesthetic (*Warm Paper Aesthetics*, Notion's signature 10-color palette, coral red `#eb5757` inline code, 3px bordered blockquotes, and Zen Canvas interactive elements).

---

## 🌟 Features

- **Single Unified Component (`Typography`)**: Eliminates confusion across separate text components. Simply pass `type="h1"` through `type="h6"`, `type="p"`, `type="code"`, `type="blockquote"`, `type="kbd"`, or `type="a"`.
- **`Text` Alias Support**: Ships with the convenient shorthand alias `Text = Typography`.
- **10 Notion Text & Highlight Colors**:
  - 10 text colors: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`.
  - 10 background highlight colors: `mark="yellow"`, `mark="blue"`, `mark="green"`, etc.
- **Signature Notion Inline Code**: Coral red text `#eb5757` against a subtle warm grey background `rgba(135, 131, 120, 0.15)`.
- **Notion Blockquote Block**: 3px hairline left border matching graphite text with elegant italic styling.
- **Ergonomic Interactions (Zen Canvas)**:
  - `copyable`: Smooth copy-to-clipboard button with checkmark confirmation icon.
  - `ellipsis`: Multi-line text clamping with optional expandable "Show more / Show less" controls.
  - `hoverOnly` Mode: Copy button remains discreetly hidden until hover, keeping page canvases clean.
- **Tabular Numbers (`tabular`)**: Enables `font-variant-numeric: tabular-nums` to prevent layout shifts when numerical values update.
- **Zero External Dependencies**: Directly integrated with Tailwind CSS v4 and the core unified `styles.css`.

---

## 🚀 Installation & Import

```tsx
import { Typography, Text } from "@openway/ui";
import type { TypographyProps, NotionColor, NotionMarkColor } from "@openway/ui";
```

---

## 📖 Usage Guide

### 1. Heading Levels (`type="h1"` to `type="h6"`)

Automatically generates semantic HTML elements and applies Notion typography scales:

```tsx
<Typography type="h1">Top-level Page Title H1</Typography>
<Typography type="h2" color="blue">Q3 Objectives H2</Typography>
<Typography type="h3">Sub-section H3</Typography>
<Typography type="h4">Minor Heading H4</Typography>
<Typography type="h5">Group Heading H5</Typography>
<Typography type="h6">Caption Heading H6</Typography>
```

---

### 2. Paragraphs (`type="p"`) & Standard Inline Text (Default `<span>`)

```tsx
// Paragraph block with comfortable line-height and bottom margin
<Typography type="p">
  OpenWay Design System embodies modern, focused administrative UI workflows.
</Typography>

// Standard inline text (renders span by default)
<Typography>Default inline text</Typography>
<Typography strong color="orange">Bold orange text</Typography>
<Typography italic color="gray">Italic gray text</Typography>
<Typography tabular>$1,234,567.89</Typography>
```

---

### 3. Flexible Sizing (`size`)

Combine heading types with the `size` prop to fine-tune font sizing to your layout:

```tsx
<Typography type="h2" size="3xl">
  H2 tag with 3xl font size
</Typography>
```

---

### 4. Notion Content Blocks

#### A. Callout Box (`type="callout"`)
```tsx
// Default Callout (Lightbulb icon 💡)
<Typography type="callout" color="yellow">
  Note: This data is automatically saved every 30 seconds.
</Typography>

// Custom icon via prop or props object
<Typography type="callout" icon="⚠️" color="orange">
  Warning: You are modifying senior administrator access permissions.
</Typography>

<Typography type="callout" props={{ icon: "🚀" }} color="blue">
  New Feature: AI Assistant is now activated.
</Typography>
```

#### B. Blockquote (`type="blockquote"`)
```tsx
<Typography type="blockquote">
  "Good design makes a product understandable." — Dieter Rams
</Typography>
```

#### C. Inline Code (`type="code"` or `code={true}`)
Coral red text `#eb5757` matching Notion styling:
```tsx
Install the package using <Typography type="code">pnpm add @openway/ui</Typography>.
Or via modifier: <Typography code>const x = 10;</Typography>.
```

#### D. Keyboard Shortcuts (`type="kbd"`)
```tsx
Press <Typography type="kbd">⌘</Typography> + <Typography type="kbd">K</Typography> to search.
```

#### E. Hyperlink Anchor (`type="a"`)
Typography integrates **Next.js** (`next/link`) `<Link>` for optimal client-side SPA routing. All specific link attributes are passed via the `props` attribute (matching the `SelectFilterField` standard):
```tsx
// Renders Next.js <Link> when specifying type="a"
<Typography type="a" props={{ href: "/dashboard" }}>
  Dashboard Home
</Typography>

// External link (opens in new tab with ExternalLink icon)
<Typography type="a" props={{ href: "https://openway.dev", external: true }}>
  OpenWay Documentation
</Typography>
```

---

### 5. Notion 10-Color Text & Highlight Palette

```tsx
// 10 Notion Text Colors:
<Typography color="default">Default</Typography>
<Typography color="gray">Gray</Typography>
<Typography color="brown">Brown</Typography>
<Typography color="orange">Orange</Typography>
<Typography color="yellow">Yellow</Typography>
<Typography color="green">Green</Typography>
<Typography color="blue">Blue</Typography>
<Typography color="purple">Purple</Typography>
<Typography color="pink">Pink</Typography>
<Typography color="red">Red</Typography>

// Notion Pastel Highlights:
<Typography mark="yellow">Yellow highlight</Typography>
<Typography mark="blue">Blue highlight</Typography>
<Typography mark="green">Green highlight</Typography>
<Typography mark="orange">Orange highlight</Typography>
<Typography mark="red">Red highlight</Typography>
```

---

### 6. Advanced Interactive Features

#### A. Copy to Clipboard (`copyable`)
```tsx
// Basic: Click to copy content (button reveals on hover)
<Typography copyable>0987654321</Typography>

// Advanced: Custom copy string, callback, and tooltips
<Typography
  copyable={{
    text: "RAW_API_KEY_SECRET",
    onCopy: () => console.log("Copied!"),
    tooltips: ["Copy secret key", "Copied to clipboard!"],
    hoverOnly: false, // Keep copy button visible
  }}
>
  Security Key: ••••••••
</Typography>
```

#### B. Line Clamping (`ellipsis`)
```tsx
// Single line truncation
<Typography ellipsis>
  An exceptionally long line of text that automatically truncates with an ellipsis...
</Typography>

// 2-line clamp with expandable / collapsible toggle
<Typography ellipsis={{ rows: 2, expandable: true }}>
  Detailed article content spanning across multiple lines of text...
</Typography>
```

---

## 🎛️ API Props Reference

### 1. Base Props (Common to all types)
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `color` | `NotionColor` | `"default"` | 10 Notion text colors (`gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`) or alias |
| `size` | `TypographySize` | `undefined` | Typography scale size: `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`, `"2xl"`, `"3xl"`, `"4xl"` |
| `weight` | `TypographyWeight` | `undefined` | Font weight: `"normal"`, `"medium"`, `"semibold"`, `"bold"` |
| `align` | `TypographyAlign` | `undefined` | Text alignment: `"left"`, `"center"`, `"right"`, `"justify"` |
| `mark` | `NotionMarkColor` | `undefined` | Pastel background highlight across 10 Notion colors (passing `true` defaults to yellow) |
| `code` | `boolean` | `false` | Enables coral red `#eb5757` inline code formatting |
| `keyboard` | `boolean` | `false` | Enables keyboard shortcut `<kbd>` styling |
| `strong` | `boolean` | `false` | Bold font weight (`font-semibold`) |
| `italic` | `boolean` | `false` | Italic font style (`italic`) |
| `underline`| `boolean` | `false` | Underline text decoration |
| `delete` | `boolean` | `false` | Strikethrough text decoration |
| `tabular` | `boolean` | `false` | Enables monospaced digits (`font-variant-numeric: tabular-nums`) |
| `disabled`| `boolean` | `false` | Dimmed appearance and disables interaction |
| `copyable`| `boolean \| CopyConfig` | `undefined` | Enables copy-to-clipboard button with visual feedback |
| `ellipsis`| `boolean \| EllipsisConfig` | `undefined` | Multi-line text clamping and truncation |

### 2. Discriminated Union Props by `type`
| `type` | Specific props within `props` | Description |
| :--- | :--- | :--- |
| `"h1"` – `"h6"`, `"p"`, `"span"`, `"blockquote"`, `"code"`, `"kbd"` | `props?: HTMLAttributes<HTMLElement>` | Standard semantic HTML elements (defaults to `"span"` when omitted) |
| `"callout"` | `icon?: ReactNode`<br>`props?: HTMLAttributes<HTMLDivElement> & { icon?: ReactNode }` | Highlighted Callout Box with leading icon and pastel background |
| `"a"` | `props?: Partial<LinkProps> & { external?: boolean; target?: string; rel?: string }` | Integrates Next.js `<Link>` for internal SPA navigation and external links |
