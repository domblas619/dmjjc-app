import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        academy: {
          black: "rgb(var(--academy-black) / <alpha-value>)",
          ink: "rgb(var(--academy-ink) / <alpha-value>)",
          charcoal: "rgb(var(--academy-charcoal) / <alpha-value>)",
          panel: "rgb(var(--academy-panel) / <alpha-value>)",
          card: "rgb(var(--academy-card) / <alpha-value>)",
          line: "rgb(var(--academy-line) / <alpha-value>)",
          foreground: "rgb(var(--academy-foreground) / <alpha-value>)",
          muted: "rgb(var(--academy-muted) / <alpha-value>)",
          blue: "#00aeef",
          sand: "#e7ded0",
          mist: "rgb(var(--academy-muted) / <alpha-value>)"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,174,239,.28), 0 24px 80px rgba(0,0,0,.35)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
