import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: {
          DEFAULT: "#0F172A",   // premium dark navy
          light: "#1E293B",
          accent: "#2563EB",    // blue CTA
          soft: "#F1F5F9",      // section bg
        },
      },
      boxShadow: {
        soft: "0 8px 25px rgba(15, 23, 42, 0.08)",
        card: "0 12px 30px rgba(0, 0, 0, 0.10)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
