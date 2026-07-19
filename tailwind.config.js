/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D0F1A",
          card: "#141627",
          card2: "#1C1F35",
          border: "#252840",
        },
        violet: {
          brand: "#7C3AED",
          light: "#9B5CF6",
          dark: "#6025C4",
          glow: "rgba(124,58,237,0.25)",
        },
        pink: {
          brand: "#F472B6",
          light: "#F9A8D4",
          dark: "#EC4899",
        },
        lavender: "#A78BFA",
        snow: "#E2E8F0",
        muted: "#94A3B8",
        faint: "#4B5563",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "Courier New", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        shimmer: "shimmer 1.8s infinite",
        float: "float 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124,58,237,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124,58,237,0.6)" },
        },
      },
      boxShadow: {
        card: "0 2px 20px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)",
        "card-hover": "0 8px 40px rgba(124,58,237,0.25), 0 2px 8px rgba(0,0,0,0.3)",
        glow: "0 0 30px rgba(124,58,237,0.35)",
        "glow-pink": "0 0 30px rgba(244,114,182,0.25)",
        "glow-sm": "0 0 15px rgba(124,58,237,0.2)",
      },
      backgroundImage: {
        "hero-mesh": "radial-gradient(circle at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(244,114,182,0.08) 0%, transparent 50%), radial-gradient(circle at 50% 90%, rgba(124,58,237,0.08) 0%, transparent 40%)",
        "card-gradient": "linear-gradient(135deg, #141627 0%, #1C1F35 100%)",
        "violet-gradient": "linear-gradient(135deg, #7C3AED 0%, #9B5CF6 100%)",
        "pink-gradient": "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
      },
    },
  },
  plugins: [],
};
