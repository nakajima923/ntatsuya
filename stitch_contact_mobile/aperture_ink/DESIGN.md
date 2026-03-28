# Design System: The Editorial Eye

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Gallery Wall"**

This design system is engineered to disappear. In a high-end photography portfolio, the UI should never compete with the vibrant, chromatic intensity of the work; it should act as the museum-grade lighting and the curated white space of a physical gallery. 

To break the "template" look, we move away from standard grids and grouped projects. Instead, we treat each individual photograph as a singular hero. We achieve a premium feel through **intentional asymmetry**—placing text in unexpected corners, using massive typographic scales (Display-LG) against small, precise labels (Label-SM), and utilizing "breathable" white space to create a sense of luxury and pace. This is not a website; it is a digital monograph.

---

## 2. Colors & Surface Logic
The palette is a sophisticated spectrum of "off-whites" and "warm grays" designed to provide a neutral stage for vibrant color photography.

### The "No-Line" Rule
**Explicit Instruction:** Use of 1px solid borders for sectioning or containment is strictly prohibited. 
Boundaries must be defined through tonal shifts. For instance, a navigation bar should not have a bottom border; it should transition from `surface-container-lowest` to a `surface` background, or utilize a backdrop blur.

### Surface Hierarchy & Nesting
Instead of flat boxes, use the Material-based surface tiers to create "soft depth."
*   **Base Layer:** `surface` (#f9f9f9) for the primary canvas.
*   **Elevated Content:** Use `surface-container-lowest` (#ffffff) for cards or elements that need to feel "closer" to the viewer.
*   **Recessed Sections:** Use `surface-container` (#ebeeef) for utility areas like footers or filter sidebars to visually "sink" them.

### Glass & Gradient Implementation
To avoid a sterile look, floating navigation or overlay metadata must use **Glassmorphism**. Apply `surface` at 80% opacity with a `20px` backdrop-blur. 
*   **Signature Polish:** For active states or high-impact CTAs, use a subtle linear gradient from `primary` (#5f5e5e) to `primary-dim` (#535252). This provides a metallic, satin-like finish that flat hex codes cannot replicate.

---

## 3. Typography
The typographic system relies on the tension between the functional **Manrope** and the evocative **Noto Serif**.

*   **The Display Voice (Noto Serif):** Use `display-lg` and `display-md` for photo titles or philosophical fragments. These should often be placed with generous tracking or asymmetrical alignment to feel like a high-end magazine header.
*   **The Functional Voice (Manrope):** Use `body-md` and `label-md` for technical data (ISO, Aperture, Location). Manrope’s geometric clarity ensures readability even at small sizes.
*   **Contrast as Luxury:** Pair a `display-lg` serif title with a `label-sm` sans-serif caption nearby. The extreme difference in scale signals "Editorial Design" rather than "Standard Web."

---

## 4. Elevation & Depth
In this system, we do not use "shadows" in the traditional sense. We use **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` element on a `surface` background. The subtle shift from #f9f9f9 to #ffffff creates a natural, "paper-on-paper" lift.
*   **Ambient Shadows:** If an element must float (e.g., a lightbox close button), use an ultra-diffused shadow: `0px 20px 40px rgba(45, 52, 53, 0.06)`. The shadow color is derived from `on-surface` (#2d3435), not pure black.
*   **The Ghost Border Fallback:** For accessibility on inputs, use `outline-variant` (#adb3b4) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Rectangular (`0px` radius), `primary` background, `on-primary` text. Use `title-sm` for the label.
*   **Secondary/Ghost:** No background. Use `on-surface` text with a `1px` underline that expands on hover. 
*   **Interaction:** On hover, primary buttons should shift to `primary-dim`. No sudden color flashes; use a `300ms` ease-in-out transition.

### Cards & Photo Containers
*   **The Hero Frame:** Photos must never have a border. Use the `24` (8.5rem) spacing token to separate images. 
*   **Aspect Ratios:** Mix intentional aspect ratios (4:5, 16:9, 1:1) within the scroll to break the monotony of a standard masonry grid.

### Navigation (The Floating Bar)
*   **Styling:** A centered, floating pill or rectangle using `surface` with 80% opacity and a heavy backdrop blur. 
*   **No Dividers:** Use `16` (5.5rem) horizontal padding between links instead of vertical pipes or lines.

### Inputs & Fields
*   **Styling:** Bottom-border only using `outline-variant` at 20% opacity. 
*   **Focus State:** The border opacity increases to 100% using `primary`. 

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use asymmetrical margins. If the left margin is `12` (4rem), try making the right margin `24` (8.5rem) for a specific section to create editorial tension.
*   **Do** allow photos to bleed off the edge of the screen in certain sections to emphasize the "unbounded" nature of the work.
*   **Do** use `label-sm` for "Metadata" (e.g., "SHOT ON 35MM") to give it a technical, curated feel.

### Don't:
*   **Don't** use rounded corners. The `0px` scale is absolute. Softness comes from color and space, not geometry.
*   **Don't** use "Project Folders." The user requested individual photos as heroes. Avoid the "Gallery Thumbnail" cliché; let the user scroll through a curated stream of large-scale imagery.
*   **Don't** use pure black (#000000) for text. Use `on-surface` (#2d3435) to maintain a soft, premium contrast against the light gray backgrounds.
*   **Don't** use standard dividers. If you need to separate content, use a `surface-container-high` full-width bleed or a massive jump in vertical spacing (Token `24`).

---

## 7. Spacing Logic
Spacing is our most powerful tool for "Premium" feel.
*   **Vertical Rhythm:** Use `16` (5.5rem) or `20` (7rem) between disparate sections.
*   **Micro-Typography:** Use `1.5` (0.5rem) between a headline and its sub-label to keep them optically grouped as a single "thought."