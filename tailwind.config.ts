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
          50: "#FDF8EE",
          100: "#F5E9D2",
          200: "#E8D2A8",
        },
        ink: {
          DEFAULT: "#2B3F45",
          muted: "#8A8270",
        },
        accent: {
          DEFAULT: "#4FB3C7",
          dark: "#2D7A8A",
        },
        coral: {
          DEFAULT: "#FF9E84",
          dark: "#E67B61",
        },
        sun: {
          DEFAULT: "#FFC85C",
          dark: "#B8861A",
        },
        palm: {
          DEFAULT: "#5B9B6A",
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
