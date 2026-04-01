# Design System Strategy: The Elevated Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Atelier."** 

Unlike standard e-commerce or corporate interfaces that rely on rigid grids and heavy containers, this system treats the screen as a high-end lifestyle magazine. We move away from "UI components" and toward "spatial compositions." By leveraging extreme white space, intentional asymmetry, and the luxurious tension between `notoSerif` and `manrope`, we create an experience that feels curated rather than manufactured. 

The goal is to break the "template" look. We achieve this by overlapping high-resolution minimalist photography with floating typography and using tonal depth instead of structural lines to guide the eye.

---

## 2. Color Palette & Surface Philosophy
The palette is rooted in an "Earth-Modern" warmth, utilizing a sophisticated cream base layered with metallic and organic mid-tones.

### Surface Hierarchy & Nesting
To maintain a premium feel, we strictly follow the **Layering Principle**. Depth is created through tonal shifts rather than shadows.
- **Base Layer:** Use `surface` (#fefccf) for the primary canvas.
- **Secondary Sections:** Use `surface-container-low` (#f8f6c9) to define large content areas like product descriptions.
- **Interactive Layers:** Use `surface-container-highest` (#e6e5b9) for elements that require the most prominence, such as active navigation states or high-priority cards.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Traditional dividers are prohibited. Boundaries must be defined solely through background color shifts (e.g., a `surface-container-low` section sitting on a `surface` background) or via the **Spacing Scale** (8, 12, or 16).

### The "Glass & Gradient" Rule
For a signature touch, floating elements (like a sticky header or a hovering "Quick Buy" bar) must use **Glassmorphism**. Apply a semi-transparent `surface` color with a 12px backdrop-blur. 
*   **Signature Texture:** Main CTAs should utilize a subtle linear gradient from `primary` (#735c00) to `primary_container` (#d4af37) at a 135-degree angle to provide a metallic "soul."

---

## 3. Typography
The typographic system creates an airy, sophisticated rhythm.

- **The Display Scale:** Use `display-lg` and `display-md` (`notoSerif`) for hero headlines. These should often be center-aligned with wide letter-spacing to evoke a sense of calm.
- **The Body Scale:** `manrope` is used for all functional text. `body-lg` (1rem) is our workhorse for storytelling, while `label-md` is used for technical specs or price points.
- **Editorial Contrast:** Pair a large `headline-lg` Serif with a small, all-caps `label-sm` Sans-serif (tracked out at 0.1rem) to create a high-fashion editorial hierarchy.

---

## 4. Elevation & Depth
We convey luxury through "Ambient Presence" rather than structural weight.

- **Ambient Shadows:** Shadows are reserved for high-impact floating elements only. Use the `on-surface` color (#1d1d03) at 5% opacity with a 40px blur and a 10px Y-offset. This mimics soft, natural gallery lighting.
- **The "Ghost Border" Fallback:** If a border is required for input field clarity, use the `outline_variant` (#d0c5af) at **20% opacity**. 100% opaque borders are strictly forbidden as they clutter the minimalist aesthetic.
- **Tonal Layering:** To highlight a card, place a `surface_container_lowest` (#ffffff) card on a `surface_container` (#f2f0c4) background. This creates a "lift" that feels organic and paper-like.

---

## 5. Component Guidelines

### Buttons (The "Jewelry" of the UI)
- **Primary:** Gradient from `primary` to `primary_container`. Text in `on_primary` (#ffffff). Border-radius: `md` (0.375rem).
- **Secondary:** Transparent background with a `Ghost Border` (Gold #D4AF37 at 30% opacity).
- **Tertiary:** Text-only using `primary` color, accompanied by a 1px underline that only appears on hover.

### Input Fields
- Avoid boxed inputs. Use a "Minimalist Float" style: a single `outline_variant` line at the bottom.
- On focus, the line transitions to `primary` (#735c00) with a smooth 300ms ease.

### Cards & Product Grids
- **Forbid Dividers:** Use `spacing-10` or `spacing-12` to separate items.
- **Image Treatment:** Product photography must have a consistent background matching `surface_container_low`. Overlap the `notoSerif` product title slightly over the image edge to break the grid.

### Chips & Filters
- Use `surface_container_high` for unselected chips.
- Selected state: `primary_container` background with `on_primary_container` text. Use `full` (9999px) roundedness for a pill shape.

---

## 6. Do’s and Don’ts

### Do:
- **Use Asymmetry:** Place a headline on the left and a product image slightly offset to the right.
- **Embrace White Space:** If you think there is enough space, add 20% more. Luxury is defined by what you leave out.
- **Soft Transitions:** All hover states and page transitions should be slow and fluid (400ms - 600ms).

### Don't:
- **Don't use pure black:** Use `on_surface` (#1d1d03) for all "black" text to keep the palette warm and organic.
- **Don't use heavy shadows:** If a shadow looks like a shadow, it’s too dark. It should look like a "glow" or "depth."
- **Don't use 1px borders:** Use background color shifts (`surface` vs `surface_container_low`) to define areas.
- **Don't crowd the margins:** Keep a minimum global margin of `spacing-16` (5.5rem) on desktop to maintain the editorial feel.