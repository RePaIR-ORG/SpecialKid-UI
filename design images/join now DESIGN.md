# Design System Documentation

## 1. Overview & Creative North Star: "The Kinetic Playhouse"

This design system is a rejection of the flat, sterile web. Our Creative North Star is **The Kinetic Playhouse**—an editorial-grade digital environment that treats UI elements as physical, weighted toys resting on a sophisticated, multi-layered canvas. 

While the system is built for a high-energy children's audience, we avoid "juvenile" templates. Instead, we use **Intentional Asymmetry** and **Tonal Depth** to create a premium experience. We break the grid by allowing 3D characters to break container bounds and using extreme typography scales that feel cinematic. This isn't just a playground; it's a curated digital gallery designed for interaction.

---

## 2. Colors & Surface Architecture

Our palette balances high-octane vibrance with a sophisticated foundation. We use a base of `background` (#f8f5ff) to ensure the `primary` Cobalt and `secondary` Yellow feel electric, not overwhelming.

### The "No-Line" Rule
To maintain a high-end editorial feel, designers are **prohibited from using 1px solid borders for sectioning.** Structural boundaries must be defined through background color shifts. For example, a `surface_container_low` section should sit directly against a `surface` background to create a soft, architectural distinction without the "cheapness" of a divider line.

### Surface Hierarchy & Nesting
Treat the UI as physical layers. Use the surface tiers to define importance:
*   **Level 0 (Base):** `surface` (#f8f5ff) for the main canvas.
*   **Level 1 (Sections):** `surface_container_low` (#f2efff) for large content areas.
*   **Level 2 (Interaction):** `surface_container_highest` (#dbd9ff) for nested containers or inactive states.

### The "Glass & Gradient" Rule
To inject "soul" into the UI, use subtle gradients for primary CTAs, transitioning from `primary` (#004be2) to `primary_container` (#809bff). For floating navigation or overlays, apply **Glassmorphism**: use semi-transparent `surface` colors with a `backdrop-blur` of 20px–40px to let the vibrant colors of the playground bleed through.

---

## 3. Typography: The Bold Voice

We use **Plus Jakarta Sans** exclusively. It is a modern, geometric typeface that provides the "extra-large" impact required for high energy while maintaining legibility.

*   **Display (The Hero):** Use `display-lg` (3.5rem) for main headers. These should often be set with tight letter-spacing (-0.02em) to feel like a physical block of text.
*   **Headlines (The Guide):** `headline-lg` (2rem) is used for section titles. Do not be afraid of white space; let these headlines breathe.
*   **Body (The Context):** `body-lg` (1rem) ensures that even in a playful environment, the information is sophisticated and readable.

**Editorial Tip:** Use "Tonal Typography." Instead of making all text black, use `on_surface_variant` (#575881) for secondary info to create a softer, more intentional hierarchy.

---

## 4. Elevation & Depth: 3D Tactility

Depth is our primary tool for "play." We move beyond flat design by utilizing **Tonal Layering** and physical metaphors.

### The Layering Principle
Achieve lift by stacking. A `surface_container_lowest` card placed on a `surface_container_low` background creates a natural "pop" without a single drop shadow. 

### Ambient Shadows
When an element must "float" (like a 3D robot or a floating action button), use **Ambient Shadows**. 
*   **Values:** Blur 40px–60px, Spread -10px.
*   **Color:** Use a 10% opacity version of `on_surface` (#2a2b51). Never use pure black or grey.

### The "Ghost Border" Fallback
While 1px lines are banned for sectioning, we utilize a **Ghost Border** for containment in complex layouts. Use the `outline_variant` token at 15% opacity. This provides a "suggestion" of a boundary that feels premium and light.

---

## 5. Components: Tactile Objects

Components in this system are "Bubble" objects—they should feel like they can be physically pressed into the screen.

### Bubble Buttons
The signature of this system.
*   **Shape:** `full` (9999px) roundedness.
*   **Border:** A thick 4px border using `on_primary_container` for the `primary` variant.
*   **3D Effect:** Apply a 4px bottom box-shadow (0px 4px 0px) using a darker shade like `primary_dim` to simulate a physical base. On "active" states, the button should translate 2px down to mimic a physical click.

### Cards & Containers
*   **Rounding:** Use `xl` (3rem) for large cards and `lg` (2rem) for smaller ones. 
*   **Separation:** **Forbid the use of divider lines.** Separate card content using vertical white space (32px or 48px) or a subtle background shift from `surface_container_lowest` to `surface_container`.

### Inputs & Selection
*   **Checkboxes & Radios:** These should be oversized and use the `secondary_container` (Yellow) for the "selected" state to provide a high-contrast visual reward.
*   **Input Fields:** Use `surface_container_high` as the fill. When focused, increase the border to 4px using the `primary` color to maintain the "thick containment" aesthetic.

---

## 6. Do's and Don'ts

### Do:
*   **Over-scale Imagery:** Let 3D robots overlap headers and containers. It breaks the "boxed-in" feel.
*   **Use High Contrast:** Place `on_primary` text on `primary` backgrounds to ensure the energy stays high and accessible.
*   **Embrace Asymmetry:** Align a headline to the left but offset the supporting body text to the right to create a sophisticated, editorial rhythm.

### Don't:
*   **Don't use 1px borders:** It immediately makes the design look like a standard web template.
*   **Don't use "Grey":** If you need a neutral, use the tinted neutrals like `surface_variant` or `outline`. Pure grey kills the "high-energy" vibe.
*   **Don't crowd the playground:** High energy requires high breathing room. If an interface feels "busy," double the padding using the `xl` (3rem) scale.

---

*Director's Note: Remember, we are building an experience that feels like a premium toy. Every tap should feel weighted, every transition should feel fluid, and every screen should feel like a custom-designed page from a high-end art book.*