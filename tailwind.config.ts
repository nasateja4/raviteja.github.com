import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d8efff",
          200: "#b9e3ff",
          300: "#86d2ff",
          400: "#4cb8ff",
          500: "#2296ff",
          600: "#0b77f5",
          700: "#075edc",
          800: "#0d4cb1",
          900: "#11428b",
          950: "#0b2856",
        },
        cyan: {
          glow: "#00f0ff",
        },
        navy: {
          850: "#0c1322",
          900: "#080d1a",
          950: "#04070e",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(34, 150, 255, 0.4)",
        "glow-cyan": "0 0 25px -5px rgba(0, 240, 255, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
