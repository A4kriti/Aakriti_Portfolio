import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0B0C0E",
        panel: "#131417",
        panel2: "#17181C",
        line: "#26272C",
        accent: {
          DEFAULT: "#5B9DFF",
          dim: "#3E77D6",
        },
        cyan: {
          DEFAULT: "#5B9DFF",
          dim: "#3E77D6",
        },
        amber: {
          DEFAULT: "#5B9DFF",
          dim: "#3E77D6",
        },
        ink: "#F5F6F8",
        muted: "#8A8D93",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        serif: ["var(--font-serif)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(76,224,210,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(76,224,210,0.045) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        scan: "scan 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
