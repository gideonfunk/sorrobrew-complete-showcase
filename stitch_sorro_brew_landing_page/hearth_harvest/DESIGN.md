# Design System Strategy: The Tactile Earth-Modernist

## 1. Overview & Creative North Star
This design system is built upon the **Creative North Star: The Tactile Earth-Modernist**. We are moving away from the cold, clinical precision of traditional SaaS "flat" design and moving toward a digital experience that feels as if it were curated in a physical studio. 

The aesthetic identity is rooted in the transition of raw materials—clay, water, and grain—into a refined ritual. To break the "template" look, we utilize intentional asymmetry, overlapping containers that mimic stacked heavy-stock paper, and a typography scale that treats words as graphic elements rather than just data. This system is grounded, authentic, and unapologetically organic.

---

## 2. Color & Surface Philosophy
The palette is a sophisticated interplay of Terracotta (`primary`), Muted Gold (`secondary`), and Mineral Greens (`tertiary`).

### The "No-Line" Rule
Traditional UI relies on 1px borders to separate content. In this system, **1px solid borders for sectioning are strictly prohibited.** Boundaries must be defined through:
*   **Tonal Shifts:** Transitioning from `surface` (#fef9f2) to `surface-container-low` (#f8f3ec).
*   **Organic Overlaps:** Allowing a `primary-container` element to physically overlap a `surface-variant` section.

### Surface Hierarchy & Nesting
Treat the screen as a physical desk. Layers should be "nested" to create depth without artificial shadows.
*   **Base:** `surface` (#fef9f2).
*   **Sectioning:** Use `surface-container-low` for large background blocks.
*   **Elevated Content:** Place `surface-container-highest` or `surface-bright` cards on top of lower-tier surfaces to create natural, soft definition.

### The "Glass & Grain" Rule
To elevate CTAs and floating navigation:
*   Use **Glassmorphism**: Apply semi-transparent `surface` colors with a 12px–20px backdrop-blur.
*   **Signature Gradients:** For primary actions, use a subtle linear gradient from `primary` (#94452e) to `primary-container` (#b35d44) at a 145-degree angle. This adds a "fired clay" sheen that flat color cannot replicate.

---

## 3. Typography: Editorial Authority
We utilize **Plus Jakarta Sans** for its warm, slightly rounded geometric terminals, which echo the organic shapes of our brand.

*   **Display (lg/md):** These are your "Hero" moments. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create a high-end editorial feel. Treat these as headlines in a luxury magazine.
*   **Headlines & Titles:** Use `headline-md` for section starters. Always pair these with generous top-padding (Spacing 16 or 20) to give the "Earth-Modern" aesthetic room to breathe.
*   **Body & Labels:** Use `body-lg` for storytelling and `label-md` for utility. Ensure `on-surface-variant` (#55433e) is used for secondary text to maintain a soft, low-contrast warmth that is easier on the eyes than pure black.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than structural lines.

*   **The Layering Principle:** A card should not "pop" off the screen with a shadow; it should sit on the screen. Use `surface-container-lowest` (#ffffff) on a `surface-container` (#f2ede6) background to create a crisp, clean lift.
*   **Ambient Shadows:** If a floating element (like a FAB or Popover) requires a shadow, use a large blur (32px+) at 6% opacity using a tint of `on-surface` (#1d1c17). It should feel like a soft glow of light, not a dark drop-shadow.
*   **The Ghost Border:** For high-density data where separation is mandatory, use a "Ghost Border": the `outline-variant` (#dbc1ba) at **15% opacity**. It should be felt, not seen.

---

## 5. Components & UI Elements

### Buttons
*   **Primary:** Rounded (Scale: `xl` or `full`), utilizing the "Fired Clay" gradient. No border. Text color: `on-primary`.
*   **Secondary:** `surface-container-high` background with `on-secondary-container` text. This creates a "wood-carved" button look that feels integrated into the page.
*   **Tertiary:** No background. Use `primary` text with an organic, hand-drawn underline (using a custom SVG mask) rather than a standard CSS underline.

### Cards & Lists
*   **Strict Rule:** No divider lines. Separate list items using `spacing-3` (1rem) and subtle background alternating between `surface` and `surface-container-low`.
*   **Cards:** Use `rounded-lg` (1rem). Ensure padding is generous—never use less than `spacing-5` (1.7rem) for internal card content.

### Input Fields
*   Avoid the "box" look. Use a `surface-variant` background with a bottom-only "Ghost Border" (20% `outline`). Labels should use `label-md` in `on-surface-variant`. When focused, the bottom border transitions to `secondary` (#775a19) at 2px thickness.

### Signature Component: The "Organic Chip"
*   Use `secondary-fixed-dim` for selection chips. The shape should be slightly asymmetrical (e.g., `top-left: 1.5rem, bottom-right: 1.5rem, others: 0.75rem`) to mimic hand-torn paper or smoothed river stones.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use extreme white space. If a section feels "almost right," add another `spacing-8` of padding.
*   **Do** use asymmetrical layouts. Place an image slightly off-center and overlap it with a `title-lg` text block.
*   **Do** incorporate "Grain" textures. Apply a subtle noise texture (3% opacity) over `surface-container` areas to reinforce the handmade paper feel.

### Don't
*   **Don't** use pure black (#000000). Always use `on-surface` (#1d1c17) for high-contrast text.
*   **Don't** use 90-degree sharp corners for containers. Stick to the `md` (0.75rem) or `lg` (1rem) roundedness scale.
*   **Don't** use standard Material dividers. They break the organic flow. Use vertical space to define "New Thought" areas.
*   **Don't** use high-velocity animations. Interactions should feel "heavy" and "natural"—use longer durations (300ms–500ms) with `cubic-bezier(0.2, 0.8, 0.2, 1)` easing.