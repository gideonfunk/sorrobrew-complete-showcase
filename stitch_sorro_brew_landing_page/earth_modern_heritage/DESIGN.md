# Design System: Earth-Modern Editorial

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Elevated Ancestry."** 

This design system moves away from the clinical "tech-minimalism" of standard e-commerce to embrace a warm, tactile, and editorial atmosphere. We are not just selling a coffee substitute; we are curating a Salvadoran heritage ritual. To achieve this, we reject rigid, boxed-in layouts in favor of **Intentional Asymmetry**. 

By utilizing overlapping imagery, high-contrast typography scales, and a "tonal-first" layering approach, we create a digital experience that feels like a premium lifestyle magazine. The goal is to make the user feel the heat of the Salvadoran sun and the richness of the soil through breathing room (white space) and sophisticated depth.

---

## 2. Colors & Surface Philosophy
Our palette is rooted in the earth. The interaction between the cream backgrounds and deep espresso tones creates an immediate sense of premium quality.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for defining sections. We do not "box" content. Boundaries must be established through:
*   **Background Shifts:** Transitioning from `surface` (#fefccf) to `surface-container-low` (#f8f6c9).
*   **Tonal Transitions:** Using the `surface-variant` (#e6e5b9) to ground specific content blocks.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine, handmade papers. 
*   **Base:** `surface` (#fefccf) for the primary page background.
*   **The Inset:** Use `surface-container-low` (#f8f6c9) for subtle secondary areas like "Related Products."
*   **The Feature:** Use `surface-container-highest` (#e6e5b9) for high-impact callouts or persistent navigation bars.

### The "Glass & Gold" Rule
To elevate the "Modern" in Earth-Modern, use **Glassmorphism** for floating elements (like a sticky "Add to Cart" bar). 
*   **Implementation:** Use `surface` at 80% opacity with a `backdrop-filter: blur(12px)`.
*   **Signature Textures:** Apply subtle linear gradients for primary CTAs, transitioning from `primary` (#271310) to `primary_container` (#3e2723). This adds a "roasted" depth that flat hex codes cannot replicate.

---

## 3. Typography: The Editorial Voice
We utilize two distinct typefaces to balance heritage warmth with modern professionalism.

*   **Display & Headlines (Manrope):** This is our "Modern" anchor. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero sections to create an authoritative, premium feel.
*   **Body & Titles (Be Vietnam Pro):** This is our "Earth" anchor. It is warm and highly legible. Use `body-lg` (1rem) for storytelling and descriptions, ensuring a line-height of at least 1.6 to maintain the "wellness" breathing room.
*   **Labels:** Use `label-md` (0.75rem) in all-caps with increased letter-spacing (+0.1em) for category tags or "Sustainable" badges to mimic high-end fashion labeling.

---

## 4. Elevation & Depth
In this system, depth is felt, not seen through harsh shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft "lift" that feels organic.
*   **Ambient Shadows:** If a floating element is necessary, use a "Tinted Ambient Shadow." 
    *   *Shadow Color:* `on-surface` (#1d1d03) at 6% opacity.
    *   *Blur:* 40px to 60px.
    *   *Offset:* 12px Y-axis.
*   **The Ghost Border Fallback:** For accessibility on input fields, use `outline-variant` (#d3c3c0) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Component Guidelines

### Buttons (The "Harvest Gold" Interaction)
*   **Primary:** Background `secondary` (#735c00), text `on-secondary` (#ffffff). Shape: `md` (0.375rem). Use a subtle gold-to-dark-gold gradient on hover.
*   **Secondary:** Background `none`, border `Ghost Border` (15% opacity `outline`), text `primary`.
*   **Tertiary:** Text `primary` with a 2px underline using `secondary_container` (#fed65b) positioned 4px below the baseline.

### Cards & Product Grids
*   **Rule:** Forbid divider lines. 
*   **Separation:** Use `spacing scale 8` (2.75rem) to separate cards. 
*   **Styling:** Images should have a `sm` (0.125rem) radius for a sharp, editorial look, while the card container itself remains `none` (0px) or `sm` to feel grounded.

### Input Fields
*   **State:** Use `surface-container-low` as the background. On focus, transition the background to `surface-container-lowest` and apply the `Ghost Border`. This "lighting up" effect feels more premium than a simple color change.

### The "Heritage" Component: The Floating Story Badge
*   A circular badge (`full` roundedness) using `secondary_container` (#fed65b) with `on-secondary-container` (#745c00) text. Use this to highlight "Direct Trade" or "Maicillo-Based" status. Position it so it overlaps the edge of images (asymmetry).

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical margins. For example, a hero image might have a `spacing-12` left margin but a `spacing-0` right margin, bleeding off the screen.
*   **Do** embrace the Cream (`#fefccf`) as your primary white space. Pure white (#ffffff) should only be used for "Surface Container Lowest" to highlight the most important interactive cards.
*   **Do** use large typography scales to create a clear "Visual Hook."

### Don't:
*   **Don't** use 1px solid lines to separate content. Use the spacing scale (`8` or `12`) or background color shifts.
*   **Don't** use standard "drop shadows." Use the Ambient Shadow spec to maintain the organic, soft-lit feel.
*   **Don't** crowd the layout. If you feel like you need a divider, you actually need more padding (`spacing-10` or higher).
*   **Don't** use generic icons. Use thin-stroke, custom illustrative icons that match the `outline` (#827472) weight.