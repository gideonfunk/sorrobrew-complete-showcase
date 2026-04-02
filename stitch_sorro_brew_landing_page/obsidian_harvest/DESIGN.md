# Design System Strategy: The Nocturnal Harvest

## 1. Overview & Creative North Star: "The Earthbound Prestige"
This design system moves away from the airy, predictable nature of standard "modern" web design. Our Creative North Star is **The Earthbound Prestige**. It is a celebration of the shadows, inspired by high-end editorial photography and the ritual of the dark roast. 

To break the "template" look, we reject the rigid, centered grid in favor of **Intentional Asymmetry**. Large-scale typography should overlap container boundaries, and imagery should bleed off-canvas. By utilizing high-contrast tonal shifts rather than lines, we create a digital experience that feels carved from raw materials rather than assembled from components.

## 2. Colors: The Depth of Roast
The palette is rooted in the `surface` (#181210), a near-black espresso that provides the "low-key" atmosphere required.

- **Primary (`primary`: #e9c349):** Use this "Electric Harvest Gold" sparingly but with high intent. It is the sun breaking through the canopy. Reserve it for primary CTAs and critical brand moments.
- **Surface Hierarchy & Nesting:** We define space through luminance, not borders. 
    - **Base Level:** `surface` (#181210)
    - **Secondary Level:** `surface-container-low` (#201a18) for subtle content grouping.
    - **Elevated Level:** `surface-container-highest` (#3b3331) for cards that need to "pop" against the dark background.
- **The "No-Line" Rule:** Under no circumstances should 1px solid borders be used to section off content. Transitions between sections must be handled via a shift from `surface` to `surface-container-low`.
- **The "Glass & Gradient" Rule:** To prevent the dark UI from feeling "muddy," use Glassmorphism for floating navigation or overlays. Utilize `surface-variant` at 60% opacity with a `20px` backdrop-blur. Apply a subtle linear gradient to main CTAs (from `primary` to `on-primary-container`) to give the gold a metallic, liquid soul.

## 3. Typography: Editorial Authority
We pair the brutalist structure of **Epilogue** with the refined utility of **Manrope**.

- **Display & Headlines (Epilogue):** These must be treated as graphic elements. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em). Headlines should command the page, often set in `on-surface` to cut through the dark background.
- **Body & Labels (Manrope):** Use `body-lg` (1rem) for readability. The high contrast between the heavy headers and the clean, geometric body text creates the "Modern Presence" requested.
- **Hierarchy Tip:** Use `primary` (#e9c349) for small `label-md` eyebrow text above a large white headline to create a sophisticated, tiered entry point for the eye.

## 4. Elevation & Depth: Tonal Layering
In this system, light comes from the content itself, not a simulated sun.

- **The Layering Principle:** Instead of shadows, use "Inner Radiance." A `surface-container-high` card sitting on `surface` creates a natural, sophisticated lift.
- **Ambient Shadows:** If a component must float (like a modal), use a shadow color tinted with `#241a00` (on-primary-fixed). Use a massive blur (`40px` to `60px`) at `15%` opacity. It should feel like a soft glow rather than a drop shadow.
- **The "Ghost Border" Fallback:** For interactive inputs, use the `outline-variant` (#504442) at 20% opacity. This provides a "suggestion" of a container without breaking the high-contrast immersion.
- **Glassmorphism:** Apply to any element that sits "above" the main scroll (Headers, Tooltips). It maintains the "Low-Key" lighting by allowing the deep espresso background to shimmer through.

## 5. Components: Sculpted Utility

- **Buttons:**
    - **Primary:** `primary` background with `on-primary` text. Use `md` (0.375rem) roundedness. No border.
    - **Tertiary:** `on-surface` text with no background. Use an underline only on hover.
- **Inputs:** Use `surface-container-highest` for the background. Forbid the "box" look; use a `0.5px` Ghost Border on the bottom edge only to mimic premium stationery.
- **Cards & Lists:** 
    - **Rule:** Absolute prohibition of divider lines. 
    - **Execution:** Use `spacing-8` (2.75rem) to separate list items. For cards, use a tonal shift to `surface-container-low` with an image bleed that touches the top and side edges.
- **Signature Component - The "Harvest Bar":** A progress indicator or scroll-track using a gradient of `primary` to `surface-tint`. It acts as a golden thread throughout the dark UI.
- **Chips:** Small, all-caps `label-sm` text. Use `surface-variant` background with `4px` (sm) roundedness.

## 6. Do’s and Don’ts

### Do:
- **Use "Negative Space" as a Luxury:** Large gutters (using `spacing-20`) make the content feel more expensive.
- **Embrace the Dark:** Ensure imagery uses low-key lighting (heavy shadows, single light source) to match the `surface` color.
- **Over-scale Headers:** Let `display-lg` text be the hero. If a headline feels too big, it’s probably just right.

### Don't:
- **Don't use Pure Black (#000):** It kills the "Earth" in Earth-Modern. Stick to our Espresso `surface` (#181210).
- **Don't use traditional "Dividers":** If you need to separate content, use a `1.4rem` (spacing-4) gap or a background color shift.
- **Don't use high-opacity shadows:** They look dated. If you can clearly see where the shadow ends, it's too heavy.
- **Don't use standard icons:** Use "Thin" or "Light" stroke weights (1pt or 1.5pt) to maintain the premium, editorial feel.