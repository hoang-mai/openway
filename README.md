# OpenWay

[![npm version](https://img.shields.io/npm/v/@openway/ui.svg?style=flat&color=2383e2)](https://www.npmjs.com/package/@openway/ui)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hoang-mai/openway/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/maianhhoang)
[![Donate MoMo](https://img.shields.io/badge/Donate-MoMo-ae2070?style=flat&logo=momo&logoColor=white)](https://me.momo.vn/maianhhoang)

OpenWay is an ecosystem of modern, high-performance web solutions. Its core UI package, **`@openway/ui`**, is an enterprise-grade React 19 UI component library (OpenWay Design System) engineered for Next.js 15/16+ and Tailwind CSS v4 with built-in internationalization (i18n).

---

## 📦 Packages

| Package | Version | Description |
| :--- | :--- | :--- |
| [`@openway/ui`](./ui) | [![npm](https://img.shields.io/npm/v/@openway/ui.svg)](https://www.npmjs.com/package/@openway/ui) | React 19 Design System with Warm Paper Aesthetics, Tailwind CSS v4, 36+ components, 10+ custom hooks, and zero-dependency i18n. |

---

## 🚀 Quick Start with `@openway/ui`

### Installation

```bash
pnpm add @openway/ui
# or
npm install @openway/ui
# or
yarn add @openway/ui
```

### Stylesheet Setup (`app/globals.css`)

```css
@import "tailwindcss";

/* 1. Activate OpenWay Warm Neutrals, Blue, Shadows, and Animations */
@import "@openway/ui/styles.css";

/* 2. Instruct Tailwind v4 to scan classes from the library */
@source "../node_modules/@openway/ui";
```

### Usage

```tsx
import { Button, OpenWayProvider } from "@openway/ui";

export default function App() {
  return (
    <OpenWayProvider locale="viVN">
      <Button variant="filled" color="primary">
        Bắt đầu ngay
      </Button>
    </OpenWayProvider>
  );
}
```

For full component documentation and guides, see the [**ui/ documentation**](./ui/README.md).

---

## 💖 Sponsor & Support

If you find this project helpful, please consider supporting development:
- **Buy Me a Coffee**: [buymeacoffee.com/maianhhoang](https://buymeacoffee.com/maianhhoang)
- **MoMo**: [me.momo.vn/maianhhoang](https://me.momo.vn/maianhhoang) (`0867254603`)

---

## 📄 License

This repository is licensed under the [MIT License](https://github.com/hoang-mai/openway/blob/main/LICENSE).
