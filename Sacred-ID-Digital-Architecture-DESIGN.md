---
version: "alpha"
name: "Sacred ID | Digital Architecture"
description: "Sacred Digital FAQ Section is designed for building reusable UI components in modern web projects. Key features include reusable structure, responsive behavior, and production-ready presentation. It is suitable for component libraries and responsive product interfaces."
colors:
  primary: "#FFFFFF"
  secondary: "#888888"
  tertiary: "#A0AE83"
  neutral: "#888888"
  background: "#0A0A0A"
  surface: "#1A1A1A"
  text-primary: "#888888"
  text-secondary: "#EFEFEF"
  border: "#222222"
  accent: "#FFFFFF"
typography:
  display-lg:
    fontFamily: "Cormorant Garamond"
    fontSize: "128px"
    fontWeight: 500
    lineHeight: "128px"
    letterSpacing: "-0.025em"
  body-md:
    fontFamily: "Manrope"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: "24px"
  label-md:
    fontFamily: "Manrope"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
    letterSpacing: "1.2px"
    textTransform: "uppercase"
rounded:
  md: "0px"
spacing:
  base: "4px"
  sm: "1px"
  md: "4px"
  lg: "8px"
  xl: "12px"
  gap: "12px"
  card-padding: "32px"
  section-padding: "32px"
components:
  button-link:
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "0px"
  card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "32px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Full Bleed
  - Framing: Glassy
  - Grid: Strong

## Colors

The color system uses light mode with #FFFFFF as the main accent and #888888 as the neutral foundation.

- **Primary (#FFFFFF):** Main accent and emphasis color.
- **Secondary (#888888):** Supporting accent for secondary emphasis.
- **Tertiary (#A0AE83):** Reserved accent for supporting contrast moments.
- **Neutral (#888888):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #0A0A0A; Surface: #1A1A1A; Text Primary: #888888; Text Secondary: #EFEFEF; Border: #222222; Accent: #FFFFFF

## Typography

Typography pairs Cormorant Garamond for display hierarchy with Manrope for supporting content and interface copy.

- **Display (`display-lg`):** Cormorant Garamond, 128px, weight 500, line-height 128px, letter-spacing -0.025em.
- **Body (`body-md`):** Manrope, 16px, weight 300, line-height 24px.
- **Labels (`label-md`):** Manrope, 12px, weight 500, line-height 16px, letter-spacing 1.2px, uppercase.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, full bleed structural frame before changing ornament or component styling. Use 4px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / full bleed composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Full Bleed
- **Base unit:** 4px
- **Scale:** 1px, 4px, 8px, 12px, 16px, 20px, 24px, 32px
- **Section padding:** 32px, 48px, 64px, 96px
- **Card padding:** 32px, 48px
- **Gaps:** 12px, 24px, 32px, 48px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 0.8px #222222; 0.8px #FFFFFF; 0.8px #1A1A1A; 0.8px #333333
- **Blur:** 12px

### Techniques
- **Gradient border shell:** Use a thin gradient border shell around the main card. Wrap the surface in an outer shell with 1px padding and a 2px radius. Drive the shell with none so the edge reads like premium depth instead of a flat stroke. Keep the actual stroke understated so the gradient shell remains the hero edge treatment. Inset the real content surface inside the wrapper with a slightly smaller radius so the gradient only appears as a hairline frame.

## Shapes

Shapes rely on a tight radius system anchored by 2px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 2px, 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles. Reuse the existing card surface recipe for content blocks.

### Buttons
- **Links:** text #888888, radius 0px, padding 0px, border 0px solid rgb(229, 231, 235).

### Cards and Surfaces
- **Card surface:** background #0A0A0A, border 0px solid rgb(229, 231, 235), radius 0px, padding 32px, shadow none.
- **Card surface:** background #FFFFFF, border 0px solid rgb(229, 231, 235), radius 0px, padding 48px, shadow none.
- **Card surface:** background #0A0A0A, border 0.8px solid rgb(34, 34, 34), radius 0px, padding 48px, shadow none.

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 4px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 2px, 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected expressive motion intensity without a deliberate reason.

## Motion

Motion feels expressive but remains focused on interface, text, and layout transitions. Timing clusters around 900ms and 500ms. Easing favors ease and 0.2. Hover behavior focuses on text and stroke changes.

**Motion Level:** expressive

**Durations:** 900ms, 500ms, 150ms, 300ms, 2000ms, 2500ms

**Easings:** ease, 0.2, 1), cubic-bezier(0.4, 0, cubic-bezier(0.2

**Hover Patterns:** text, stroke
