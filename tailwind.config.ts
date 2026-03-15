import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        m: {
          green:  "#00FF41",
          bright: "#AAFFAA",
          mid:    "#00CC33",
          dim:    "#007718",
          dark:   "#003B0C",
          card:   "#030A03",
          border: "#0A1E0A",
          red:    "#EF4444",
        },
      },
      fontFamily: {
        mono: ["'Courier New'", "Courier", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "reticle":    "reticle 10s linear infinite",
        "reticle-rev":"reticle 6s linear infinite reverse",
        "pulse-dot":  "pulse-dot 2s ease-in-out infinite",
        "slide-up":   "slide-up 0.3s ease-out",
        "blink":      "blink 1s step-end infinite",
      },
      keyframes: {
        reticle: {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.3" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
