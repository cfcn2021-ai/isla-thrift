import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#FAFCFB",
          100: "#EAF4F0",
          200: "#D5E6DF",
        },
        ink: {
          DEFAULT: "#0E2A2E",
          muted: "#5C7A7E",
        },
        accent: {
          DEFAULT: "#2DA9AE",
          dark: "#1A6E72",
        },
        coral: {
          DEFAULT: "#FF8B7D",
          dark: "#E66B5F",
        },
        sun: {
          DEFAULT: "#FFD66B",
        },
        palm: {
          DEFAULT: "#3D8B4F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        brand: ["var(--font-brand)", "Bagel Fat One", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wide2: "0.18em",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "count-bump": {
          "0%, 100%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.25)" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "count-bump": "count-bump 350ms cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
