/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--vln-bg)",
        surface: "var(--vln-surface)",
        elevated: "var(--vln-elevated)",
        border: "var(--vln-border)",
        primary: "var(--vln-text-primary)",
        secondary: "var(--vln-text-secondary)",
        muted: "var(--vln-text-muted)",
        accent: "var(--vln-accent)",
        "accent-2": "var(--vln-accent-2)",
        success: "var(--vln-success)",
        warning: "var(--vln-warning)",
        danger: "var(--vln-danger)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -8px var(--vln-accent-glow)",
        "glow-lg": "0 0 80px -12px var(--vln-accent-glow)",
        premium: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.55)",
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 12px 32px -16px rgba(0,0,0,0.45)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        driftSlow: {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-2%, 1.5%)" },
          "100%": { transform: "translate(0,0)" },
        },
        driftSlow2: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(3%, -2%) scale(1.06)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spinSlowReverse: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 2.4s cubic-bezier(0.2,0.6,0.3,1) infinite",
        driftSlow: "driftSlow 24s ease-in-out infinite",
        driftSlow2: "driftSlow2 30s ease-in-out infinite",
        spinSlow: "spinSlow 40s linear infinite",
        spinSlowReverse: "spinSlowReverse 55s linear infinite",
        shimmer: "shimmer 2.6s linear infinite",
        floatY: "floatY 5s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};