```markdown
# Design System Strategy: The Elevated Alchemist

## 1. Overview & Creative North Star
The "Elevated Alchemist" is the creative North Star of this design system. It moves away from the clinical "tech-startup" look to embrace a digital heritage aesthetic—one that feels like a high-end editorial magazine for a premium coffee substitute brand. 

This system rejects the "template" look. Instead of rigid, centered grids, we utilize **intentional asymmetry** and **tonal layering** to create a sense of organic growth and historical weight. Imagine a physical apothecary where premium ingredients are laid out on heavy cream paper; that is our digital baseline. We break the grid by overlapping large-scale typography with high-fidelity product imagery, using white space not just as a gap, but as a luxury "breathing room."

## 2. Colors: Tonal Depth & The "No-Line" Rule
Our palette is rooted in the earth but refined through gold. The core of this system is the relationship between the `surface` and the `primary_container`.

*   **Primary (#271310):** Used for high-contrast "Intellectual" moments—dense text blocks or hero calls to action.
*   **Secondary (#735c00):** Our "Harvest Gold." Use this sparingly for accentuation or interactive states to mimic a gold-leaf foil.
*   **Surface (#fefccf):** This "Cream" is our canvas. It is warmer and more inviting than pure white, providing a heritage feel.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Sectioning must be achieved through background color shifts. A transition from `surface` to `surface_container_low` is your primary tool for change.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
*   **Level 0 (Background):** `surface` (#fefccf).
*   **Level 1 (Sectioning):** `surface_container_low` (#f8f6c9).
*   **Level 2 (Active Cards):** `surface_container_highest` (#e6e5b9).
This nesting creates a soft, tactile depth that feels curated rather than engineered.

### The "Glass & Signature Texture" Rule
To add "soul," use subtle linear gradients for large CTA buttons or hero sections, transitioning from `primary` (#271310) to `primary_container` (#3e2723). For floating navigation or modal overlays, use **Glassmorphism**: apply `surface_variant` at 60% opacity with a 20px backdrop-blur to allow the rich coffee browns of the background to bleed through.

## 3. Typography: Professional Warmth
We use **Plus Jakarta Sans** exclusively. Its geometric yet humanist nature bridges the gap between modern tech and traditional warmth.

*   **Display-LG (3.5rem):** Set with tight letter-spacing (-0.02em) for a bold, editorial impact. Use this for "manifesto" statements.
*   **Headline-MD (1.75rem):** Used for storytelling headers. Pair these with asymmetrical layouts (e.g., left-aligned text with a 12-unit right-side gutter).
*   **Body-LG (1rem):** Our primary reading experience. Use a generous line-height (1.6) to ensure the heritage "story" is easy to consume.
*   **Label-MD (0.75rem):** Always uppercase with increased letter-spacing (+0.05em) when used for category tags or metadata.

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often too "digital." In this system, depth is achieved through **Tonal Layering**.

*   **The Layering Principle:** Instead of adding a shadow to a card, place a `surface_container_lowest` (#ffffff) card on a `surface_container` (#f2f0c4) background. This creates "Natural Lift."
*   **Ambient Shadows:** If a floating element is required (e.g., a "Buy Now" FAB), use an extra-diffused shadow: `offset: 0, 12px; blur: 32px; color: rgba(62, 39, 35, 0.08)`. The tint is derived from our `primary_container` brown, not black.
*   **The Ghost Border Fallback:** If a container needs more definition, use a "Ghost Border": `outline_variant` (#d3c3c0) at **15% opacity**. It should be felt, not seen.

## 5. Components: Softness & Structure
All components utilize the **ROUND_EIGHT (0.5rem)** corner radius for a "soft-modern" feel.

*   **Buttons:**
    *   *Primary:* Background `primary`, Text `on_primary`. No border.
    *   *Secondary:* Background `transparent`, Border `outline_variant` (at 20%), Text `primary`.
*   **Cards & Lists:** **Strictly forbid divider lines.** Separate list items using `spacing.5` (1.7rem) of vertical white space or by alternating background tints between `surface` and `surface_container_low`.
*   **Inputs:** Use the "Understated Field." A background of `surface_container_highest` with a bottom-only "Ghost Border." Focus states should transition the border to `secondary` (Harvest Gold).
*   **Chips:** Use for flavor profiles (e.g., "Nutty," "Dark Roast"). Pill-shaped (`rounded-full`) with `surface_container_high` backgrounds.
*   **Signature Component - The "Heritage Tile":** A specialized card for product features using an asymmetrical layout—top-aligned label-sm, center-aligned display-sm, and bottom-right aligned imagery.

## 6. Do's and Don'ts

### Do:
*   **Use Asymmetry:** Place text on the left and images slightly off-center to the right to create an editorial feel.
*   **Embrace the Cream:** Let the `surface` color be the hero. Don't feel the need to fill every corner with content.
*   **Layer with Intent:** Ensure that every nested container is at least one "tier" different from its parent surface.

### Don't:
*   **Don't use 1px solid black/grey borders.** This instantly kills the premium aesthetic.
*   **Don't use standard drop shadows.** If it looks like a default Material Design shadow, it's too heavy.
*   **Don't crowd the typography.** Plus Jakarta Sans needs space to feel "Professional and Warm." If the text feels tight, increase the spacing scale by one increment.
*   **Don't use pure white (#FFFFFF) for backgrounds.** Reserve pure white only for the highest-level "floating" cards (`surface_container_lowest`).```