// Tailwind CDN config: enforce a NAVY BLUE brand across the entire site.
// Important: this file must be loaded BEFORE https://cdn.tailwindcss.com in each HTML file.
//
// We override `blue`, `green`, and `emerald` palettes to the same navy-blue scale so any existing
// Tailwind utilities like `text-blue-700`, `bg-blue-600`, or `from-blue-600` all render as navy.
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
      colors: {
        // Navy blue scale (Tailwind-like)
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Override green/emerald utilities to navy so we don't have to touch every page/class.
        green: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        emerald: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      boxShadow: {
        // Cleaner, bank-style shadows (subtle, not glowy)
        sm: "0 1px 2px rgba(0,0,0,.06)",
        DEFAULT: "0 8px 24px rgba(0,0,0,.10)",
        lg: "0 18px 50px rgba(0,0,0,.12)",
        xl: "0 28px 70px rgba(0,0,0,.14)",
      },
    },
  },
};
