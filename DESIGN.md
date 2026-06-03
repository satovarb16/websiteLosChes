# Design

## Color Palette

Strategy: **Committed** — el ember palette lleva el 40-60% de la superficie como identidad visual.

| Token | Value (OKLCH) | Hex | Role |
|---|---|---|---|
| `--color-bg` | `oklch(0.13 0.01 50)` | `#121212` | Background principal |
| `--color-surface` | `oklch(0.18 0.012 50)` | `#1e1a17` | Cards, secciones elevadas |
| `--color-surface-2` | `oklch(0.22 0.015 50)` | `#26201b` | Hover states, separadores |
| `--color-primary` | `oklch(0.75 0.14 85)` | `#D4AF37` | Gold — CTA, headings accent, links |
| `--color-secondary` | `oklch(0.55 0.19 40)` | `#E65100` | Ember orange — accents, highlights |
| `--color-tertiary` | `oklch(0.72 0.17 75)` | `#FFB300` | Amber — warmth, hover states |
| `--color-ink` | `oklch(0.93 0.01 85)` | `#f0ece4` | Body text principal |
| `--color-ink-muted` | `oklch(0.70 0.02 80)` | `#b8a99a` | Texto secundario, labels |
| `--color-border` | `oklch(0.28 0.02 50)` | `#3a3028` | Bordes sutiles |

## Typography

| Token | Value | Use |
|---|---|---|
| `--font-display` | `'Libre Caslon Text', Georgia, serif` | H1–H3, display headings |
| `--font-body` | `'Hanken Grotesk', system-ui, sans-serif` | Body, labels, nav, buttons |
| `--font-size-xs` | `0.75rem` | Labels, eyebrows (usados con cuidado) |
| `--font-size-sm` | `0.875rem` | Caption, metadata |
| `--font-size-base` | `1rem` | Body copy |
| `--font-size-lg` | `1.25rem` | Lead text, intro paragraphs |
| `--font-size-xl` | `1.5rem` | H3 |
| `--font-size-2xl` | `2rem` | H2 |
| `--font-size-3xl` | `clamp(2.5rem, 5vw, 4rem)` | H1 |
| `--font-size-hero` | `clamp(3rem, 7vw, 6rem)` | Hero display (techo en 6rem) |

Line heights: display `1.1`, headings `1.2`, body `1.6`.
Letter spacing: display `-0.02em`, body `0`, labels uppercase `0.08em`.

## Spacing Scale

Base 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.

## Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `4px` | Tags, badges |
| `--radius-md` | `8px` | Buttons, inputs |
| `--radius-lg` | `12px` | Cards (máximo para cards) |
| `--radius-pill` | `9999px` | Pills, toggles |

## Shadows

Paleta oscura — shadows son sutiles o inexistentes. En cambio, usar `border` en `--color-border` para separar superficies, y glow de ember para CTAs activos.

```css
--shadow-sm: 0 1px 3px oklch(0 0 0 / 0.4);
--shadow-glow-primary: 0 0 20px oklch(0.75 0.14 85 / 0.25);
--shadow-glow-secondary: 0 0 20px oklch(0.55 0.19 40 / 0.3);
```

## Motion

Energy: **moderate** — movimientos deliberados, nada frenético. Scroll reveals suaves, transiciones de hover fluidas.

```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 400ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1); /* expo-out */
```

Scroll animations: IntersectionObserver + opacity/transform. Stagger en galerías: 60ms entre items.
Siempre respetar `prefers-reduced-motion: reduce` — fallback a transición instantánea o crossfade simple.

## Layout

Max content width: `1200px`. Section padding horizontal: `clamp(1.5rem, 5vw, 5rem)`.
Grid de galería: `repeat(auto-fit, minmax(280px, 1fr))`.
Z-index scale: sticky nav `10`, modal backdrop `40`, modal `50`, toast `60`, tooltip `70`.

## Components

### Nav
- Fixed top, background `--color-bg` con `backdrop-filter: blur(12px)` y 80% opacity al hacer scroll
- Logo izquierda (Libre Caslon), links centro (Hanken, 0.85rem), CTA "Reservar" derecha (botón outlined gold)

### Buttons
- Primary: bg `--color-primary`, text `--color-bg`, radius `--radius-md`, padding `12px 28px`
- Outlined: border `--color-primary`, text `--color-primary`, bg transparent, hover fill suave
- WhatsApp CTA: bg `#25D366`, text white, con icono WhatsApp

### Section headers
- Sin eyebrows repetidos en cada sección. Usar solo cuando la palabra orienta al usuario (ej: dentro del hero)
- H2 en Libre Caslon, con accent word en `--color-primary` o `--color-secondary`

### Menu cards
- Sin card grids idénticos. Usar lista con separador `--color-border`, precio alineado a la derecha
- Categorías como tabs o acordeón

### Gallery
- CSS Grid masonry-like o grid uniforme según cantidad de fotos
- Hover: overlay oscuro sutil con scale(1.03) en la imagen

## Icons

Lucide icons (SVG inline o via CDN). Stroke width `1.5px`, sin fill en contexto de UI general.
