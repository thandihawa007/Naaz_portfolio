/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ── Sacred ID Color System ─────────────────── */
        "background":      "#0A0A0A",
        "surface":         "#1A1A1A",
        "surface-low":     "#111111",
        "border-default":  "#222222",
        "border-accent":   "#FFFFFF",
        "border-subtle":   "#333333",

        /* Accent */
        "accent":          "#FFFFFF",
        "accent-tertiary": "#A0AE83",

        /* Text */
        "text-primary":    "#888888",
        "text-secondary":  "#EFEFEF",
        "text-muted":      "#555555",

        /* Legacy aliases kept for any Tailwind class still in use */
        "surface-tint":              "#FFFFFF",
        "on-surface":                "#EFEFEF",
        "on-surface-variant":        "#888888",
        "on-background":             "#EFEFEF",
        "primary":                   "#EFEFEF",
        "primary-container":         "#FFFFFF",
        "on-primary-container":      "#0A0A0A",
        "surface-container":         "#1A1A1A",
        "surface-container-low":     "#111111",
        "surface-container-lowest":  "#0A0A0A",
        "surface-container-high":    "#222222",
        "surface-container-highest": "#2A2A2A",
        "surface-dim":               "#0A0A0A",
        "outline-variant":           "#333333",
        "secondary":                 "#888888",
        "secondary-container":       "#1A1A1A",
        "on-secondary-container":    "#888888",
        "inverse-surface":           "#EFEFEF",
        "inverse-on-surface":        "#0A0A0A",
        "error":                     "#ff4444",
        "on-error":                  "#ffffff",
      },

      borderRadius: {
        /* Sacred ID: 0px base, 2px max for structural, pill for badges only */
        "DEFAULT": "0px",
        "sm":      "2px",
        "md":      "2px",
        "lg":      "2px",
        "xl":      "2px",
        "2xl":     "2px",
        "full":    "9999px",
      },

      spacing: {
        /* 4px base grid */
        "1":              "4px",
        "2":              "8px",
        "3":              "12px",
        "4":              "16px",
        "6":              "24px",
        "8":              "32px",
        "10":             "40px",
        "12":             "48px",
        "16":             "64px",
        "20":             "80px",
        "24":             "96px",

        "margin-desktop": "60px",
        "margin-mobile":  "24px",
        "section-gap":    "96px",
        "gutter":         "24px",
        "unit":           "4px",
        "container-max":  "1440px",
      },

      fontFamily: {
        /* Display — Cormorant Garamond */
        "display":        ["Cormorant Garamond", "Georgia", "serif"],
        "display-lg":     ["Cormorant Garamond", "Georgia", "serif"],
        "display-2xl":    ["Cormorant Garamond", "Georgia", "serif"],
        "display-lg-mobile": ["Cormorant Garamond", "Georgia", "serif"],
        "headline-md":    ["Cormorant Garamond", "Georgia", "serif"],

        /* Body + labels — Manrope */
        "body-md":        ["Manrope", "sans-serif"],
        "body-lg":        ["Manrope", "sans-serif"],
        "label-mono":     ["Manrope", "sans-serif"],
        "sans":           ["Manrope", "sans-serif"],
      },

      fontSize: {
        /* Display — 128px per spec */
        "display-lg":     ["128px", { lineHeight: "128px",  letterSpacing: "-0.025em", fontWeight: "500" }],
        "display-lg-mobile": ["56px", { lineHeight: "60px", letterSpacing: "-0.02em",  fontWeight: "500" }],
        "display-2xl":    ["128px", { lineHeight: "128px",  letterSpacing: "-0.025em", fontWeight: "500" }],

        /* Headline */
        "headline-md":    ["40px",  { lineHeight: "44px",   letterSpacing: "-0.015em", fontWeight: "500" }],
        "headline-sm":    ["28px",  { lineHeight: "36px",   letterSpacing: "-0.01em",  fontWeight: "500" }],

        /* Body — Manrope */
        "body-lg":        ["16px",  { lineHeight: "24px",  letterSpacing: "0em",      fontWeight: "300" }],
        "body-md":        ["16px",  { lineHeight: "24px",  letterSpacing: "0em",      fontWeight: "300" }],
        "body-sm":        ["14px",  { lineHeight: "22px",  letterSpacing: "0em",      fontWeight: "300" }],

        /* Labels */
        "label-mono":     ["12px",  { lineHeight: "16px",  letterSpacing: "0.1em",    fontWeight: "500" }],
        "label-sm":       ["10px",  { lineHeight: "14px",  letterSpacing: "0.12em",   fontWeight: "500" }],
      },

      transitionDuration: {
        "150":  "150ms",
        "300":  "300ms",
        "500":  "500ms",
        "900":  "900ms",
        "2000": "2000ms",
      },
    },
  },
  plugins: [],
}
