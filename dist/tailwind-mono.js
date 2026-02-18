// Tailwind CDN config: force a clean "bank blue" palette by defining `blue-*` to Chase-like blues.
// Important: this file must be loaded BEFORE https://cdn.tailwindcss.com in each HTML file.
//
// The site uses lots of `text-blue-*`, `bg-blue-*`, `border-blue-*`, and blue-based gradients.
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
        blue: {
          // Light backgrounds + subtle borders (green equivalents)
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          // Brand greens
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          // Dark green
          900: "#14532d",
          950: "#052e16",
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


