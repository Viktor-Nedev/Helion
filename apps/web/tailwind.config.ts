import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#060816",
        panel: "#0b1020",
        stroke: "rgba(255,255,255,0.08)",
        glow: {
          cyan: "#4ee9ff",
          violet: "#8b5cf6",
          blue: "#4f7cff"
        }
      },
      boxShadow: {
        glow: "0 20px 80px rgba(78, 233, 255, 0.16)",
        violet: "0 20px 70px rgba(139, 92, 246, 0.18)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(78,233,255,0.12), transparent 25%), linear-gradient(180deg, rgba(10,15,31,0.9), rgba(6,8,22,1))"
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        pulseSoft: "pulseSoft 3.5s ease-in-out infinite",
        tilt: "tilt 12s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" }
        },
        tilt: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
