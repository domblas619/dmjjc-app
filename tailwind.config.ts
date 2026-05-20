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
          black: "#05070a",
          ink: "#080b0f",
          charcoal: "#101722",
          panel: "#151f2b",
          line: "#263647",
          blue: "#00aeef",
          sand: "#e7ded0",
          mist: "#c7d5df"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,174,239,.28), 0 24px 80px rgba(0,0,0,.35)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
