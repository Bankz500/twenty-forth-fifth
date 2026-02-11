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
          // Light backgrounds + subtle borders
          50: "#f6f9ff",
          100: "#eef4ff",
          200: "#d9e7ff",
          300: "#b7d1ff",
          400: "#86b2ff",
          // Brand blues
          500: "#4f86ff",
          600: "#1f66e5",
          700: "#1c4fb8",
          800: "#183f93",
          // Navy
          900: "#102b63",
          950: "#0b1f3b",
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


