# AGORA, ABOGADOS — Design System v1.0

## 1. Token Architecture Principles
All visual attributes must be governed by centralized design tokens. Every token in production has exactly ONE authoritative value. If an exact value requires client/design sign-off, it is tracked as `PENDING DESIGN DECISION`.

---

## 2. Color System

| Token Name | Semantic Role | Value | Status |
| :--- | :--- | :--- | :--- |
| `color-primary` | Main text, deep structure, primary brand grounding | `#111827` (Obsidian Gray) | `LOCKED` |
| `color-primary-dark` | Deepest contrast tone | `#0B0F17` | `LOCKED` |
| `color-accent` | Refined accent, key highlights, borders of distinction | `#B48C56` (Warm Ochre Bronze) | `LOCKED` |
| `color-accent-hover` | Interactive state for accent elements | `#9B7443` | `LOCKED` |
| `color-surface-light` | Primary background, high legibility | `#FAFAF9` (Warm Off-White) | `LOCKED` |
| `color-surface-white` | Card and component surfaces | `#FFFFFF` | `LOCKED` |
| `color-surface-muted` | Secondary surfaces, section dividers | `#F3F4F6` | `LOCKED` |
| `color-border` | Subtle structural borders (1px) | `#E5E7EB` | `LOCKED` |
| `color-border-subtle` | Dark-surface structural borders | `rgba(255,255,255,0.1)` | `LOCKED` |
| `color-text-primary` | High-contrast body and titles | `#111827` | `LOCKED` |
| `color-text-secondary` | Descriptive paragraphs, subtitles | `#4B5563` | `LOCKED` |
| `color-text-muted` | Captions, metadata, placeholders | `#6B7280` | `LOCKED` |
| `color-whatsapp` | WhatsApp conversion actions | `#25D366` | `LOCKED` |
| `color-whatsapp-hover` | WhatsApp hover state | `#1EBE5D` | `LOCKED` |

---

## 3. Typography System

| Typographic Role | Family Classification | CSS Variable / Token | Font Choice Status |
| :--- | :--- | :--- | :--- |
| **Heading Display** | Editorial Serif / High-contrast Roman | `--font-serif` | `Cinzel` / `Playfair Display` (`PENDING DESIGN DECISION` — Formal font file lock in Phase 1) |
| **Body & UI** | Clean Geometric/Neutral Sans | `--font-sans` | `Inter`, system-ui (`LOCKED`) |
| **Legal / Mono** | Tabular / Technical data | `--font-mono` | `ui-monospace`, `monospace` (`LOCKED`) |

### Scale & Hierarchy
- `text-display`: `3.5rem` / `56px` (Line height 1.1) — Hero statements
- `text-h1`: `2.75rem` / `44px` (Line height 1.15) — Page titles
- `text-h2`: `2rem` / `32px` (Line height 1.25) — Major section titles
- `text-h3`: `1.5rem` / `24px` (Line height 1.3) — Card titles, sub-sections
- `text-body-lg`: `1.125rem` / `18px` (Line height 1.6) — Lead paragraphs
- `text-body`: `1rem` / `16px` (Line height 1.6) — Standard reading text
- `text-sm`: `0.875rem` / `14px` (Line height 1.5) — Captions, UI labels, metadata
- `text-xs`: `0.75rem` / `12px` (Line height 1.4) — Legal notices, badge tags

---

## 4. Spacing, Containers & Layout Scale
- **Max Container Widths:**
  - `container-sm`: `640px` (Reading / article column)
  - `container-md`: `896px` (Focused layouts / forms / legal notice)
  - `container-lg`: `1152px` (Standard page content)
  - `container-xl`: `1280px` (Max page wrapper)
- **Grid Gutters:** `1rem` (mobile), `1.5rem` (tablet), `2rem` (desktop)
- **Section Spacing (Vertical):** `4rem` (`py-16`) on mobile, `6rem` (`py-24`) on desktop

---

## 5. Shape, Elevation & Borders
- **Border Radii:**
  - `radius-none`: `0px` (Editorial frames, sharp buttons)
  - `radius-sm`: `2px` (Subtle UI controls)
  - `radius-md`: `4px` (Cards, dialog containers)
  - *No pill buttons or large radius containers.*
- **Shadows:**
  - `shadow-subtle`: `0 1px 3px rgba(0,0,0,0.05)`
  - `shadow-card`: `0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -2px rgba(0,0,0,0.04)`
  - `shadow-overlay`: `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)`

---

## 6. Button System & Interactive States
- **Primary CTA (`Button variant="primary"`):**
  - Background: `color-primary` (`#111827`), Text: `#FFFFFF`, Border: `1px solid #111827`
  - Hover: `bg-neutral-800`
- **WhatsApp CTA (`Button variant="whatsapp"`):**
  - Background: `color-whatsapp` (`#25D366`), Text: `#FFFFFF` (high contrast), Hover: `#1EBE5D`
- **Secondary / Outline (`Button variant="secondary"`):**
  - Background: `transparent`, Text: `color-primary`, Border: `1px solid color-border`
  - Hover: `bg-neutral-100`
- **Ghost / Text (`Button variant="ghost"`):**
  - Background: `transparent`, Text: `color-primary`, Underline on hover

---

## 7. Accessibility (WCAG 2.2 AA)
- Text contrast ratio: Minimum 4.5:1 for normal text, 3:1 for large display text.
- Focus rings: Explicit, high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-accent`).
- Motion: Strict `prefers-reduced-motion: reduce` compliance.
