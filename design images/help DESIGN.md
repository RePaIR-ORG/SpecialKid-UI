---
name: Tactile Play
colors:
  surface: '#f9f9ff'
  surface-dim: '#d6dae5'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#eaedf9'
  surface-container-high: '#e5e8f4'
  surface-container-highest: '#dfe2ee'
  on-surface: '#171c24'
  on-surface-variant: '#464555'
  inverse-surface: '#2c3039'
  inverse-on-surface: '#edf0fc'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#4849da'
  primary: '#4343d5'
  on-primary: '#ffffff'
  primary-container: '#5d5fef'
  on-primary-container: '#faf7ff'
  inverse-primary: '#c1c1ff'
  secondary: '#705d00'
  on-secondary: '#ffffff'
  secondary-container: '#fdd400'
  on-secondary-container: '#6f5c00'
  tertiary: '#006465'
  on-tertiary: '#ffffff'
  tertiary-container: '#007f80'
  on-tertiary-container: '#dbfffe'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c1c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2e2bc2'
  secondary-fixed: '#ffe170'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#56f9f9'
  tertiary-fixed-dim: '#26dcdd'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#004f50'
  background: '#f9f9ff'
  on-background: '#171c24'
  surface-variant: '#dfe2ee'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 18px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  button-text:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: '1.0'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system focuses on creating a safe, engaging, and low-cognitive-load environment for users with special needs. The brand personality is encouraging, dependable, and joyful.

The visual style is **Tactile / Skeuomorphic Modernism**. It utilizes "chunky" interface elements that mimic physical toys and learning tools, providing clear affordances for interaction. High-contrast elements ensure readability, while the soft pastel environment prevents overstimulation. The aesthetic avoids the "clinical" look of traditional health apps in favor of a playful, educational atmosphere.

## Colors
The palette uses high-energy primary colors against a calming background to guide attention without causing fatigue.

- **Primary (Electric Blue):** Used for primary actions and navigation markers.
- **Secondary (Warm Yellow):** Used for success states, rewards, and highlights; high contrast against the indigo text.
- **Tertiary (Turquoise):** Reserved for mascot interactions and supportive feedback.
- **Background:** A soft gradient from `#F0F3FF` to `#E0E7FF` (Lavender-Blue) to reduce screen glare.
- **Text:** Deep Indigo `#1E1B4B` is used instead of pure black to maintain high contrast while feeling softer and more approachable.

## Typography
The typography system prioritizes legibility and character differentiation to assist users with visual or cognitive impairments.

- **Headlines:** Uses **Plus Jakarta Sans** for its friendly, open apertures and bold weights. Headings should always be in the deep indigo color.
- **Body & Labels:** Uses **Atkinson Hyperlegible Next**, specifically designed for low-vision readers. It ensures that similar characters (like 'I', 'l', and '1') are easily distinguishable.
- **Sizing:** Base font sizes are larger than standard web apps (minimum 18px) to accommodate motor control challenges and visual clarity.

## Layout & Spacing
The layout follows a **Fluid Grid** with extremely generous margins and gutters to prevent accidental clicks and provide "breathing room."

- **Grid:** 12-column grid for desktop, 4-column for mobile.
- **Padding:** Interactive elements must have a minimum touch target of 56px. Internal padding for cards and containers should never be less than `md` (24px).
- **Rhythm:** Vertical rhythm is strictly enforced in 8px increments to maintain a structured, predictable flow.
- **Reflow:** On mobile, all side-by-side elements stack vertically to maintain the large, "chunky" scale of interactive components.

## Elevation & Depth
This design system uses **Tactile Depth** rather than traditional elevation shadows.

- **The "Chunky" Effect:** Buttons and cards use a solid bottom border (4px to 6px) that is a darker shade of the element's color, simulating a 3D physical object.
- **Shadows:** Avoid thin, blurry shadows. Use large, soft, colored ambient glows (low opacity) to indicate the active state or the most important element on the screen.
- **Pressed State:** When an element is clicked, it should shift down 4px (the width of the bottom border) to give the user immediate physical feedback that the "button" has been pushed.

## Shapes
The shape language is defined by extreme roundness and "squishy" geometry.

- **Corners:** A standard radius of 24px is applied to all cards and buttons.
- **Containers:** Large containers use `rounded-xl` (48px) to feel soft and non-threatening.
- **Strokes:** Use thick 3px strokes for input fields and secondary buttons to ensure clear boundaries.

## Components

### Buttons
Primary buttons are chunky, using the Warm Yellow background with Indigo text. They feature a 6px "drop" shadow (a solid darker yellow border) to look like a physical toy button.

### Cards
Cards use a white background with a subtle Soft Purple outline. They should have large, centered icons or imagery to support non-verbal navigation.

### Input Fields
Inputs are oversized with 24px padding and a 3px solid Electric Blue border. The focus state should increase the border thickness to 5px and add a soft blue outer glow.

### Chips & Tags
Used for categorization, chips should be pill-shaped and use high-contrast color pairings (e.g., White text on Purple background) to ensure they are readable.

### Toggle Switches
Oversized toggles that use the Turquoise color for the "On" state. The toggle handle should be a large white circle that looks easy to "slide."

### Success/Feedback Mascot
A recurring turquoise mascot component that appears in a consistent corner of the screen to provide encouragement and instructions via speech bubbles.