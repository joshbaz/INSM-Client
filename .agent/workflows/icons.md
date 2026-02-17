---
description: How to use icons in this project — always use Iconify
---

# Icons — Always Use Iconify

**Never use inline SVG icons.** This project uses [Iconify](https://iconify.design/) for all icons.

## Import

```jsx
import { Icon } from "@iconify/react";
```

## Usage

```jsx
<Icon icon="heroicons:x-mark" className="w-6 h-6" />
<Icon icon="heroicons:chevron-down" width={24} />
<Icon icon="ph:caret-down-bold" className="w-4 h-4" />
```

## Commonly Used Icon Sets

- **heroicons** — `heroicons:icon-name` (e.g. `heroicons:x-mark`, `heroicons:chevron-down`, `heroicons:heart`, `heroicons:user`)
- **Phosphor** — `ph:icon-name` (e.g. `ph:question-mark-bold`, `ph:caret-down-bold`)
- **Material Design Icons** — `mdi:icon-name` (e.g. `mdi:link-variant`)
- **Remix Icon** — `ri:icon-name` (e.g. `ri:facebook-fill`, `ri:twitter-x-fill`)

## Sizing

Use either Tailwind classes (`className="w-6 h-6"`) or the `width` prop (`width={24}`). Both approaches are used in the codebase.

## Rules

1. **Never** write `<svg>` elements inline for icons.
2. **Always** import `{ Icon }` from `@iconify/react`.
3. Browse available icons at [https://icon-sets.iconify.design/](https://icon-sets.iconify.design/).
