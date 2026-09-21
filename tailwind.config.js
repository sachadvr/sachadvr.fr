/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: false,
      padding: "clamp(24px, 4vw, 88px)",
      screens: {},
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ink: "#181818",
        paper: "#F2F2F2",
        panel: "#E6E6E6",
        crimson: "hsl(var(--accent))",
        sky: "#A8DFF5",
      },
      backgroundImage: {
        "accent-gradient": "",
        "dotted-gradient": "radial-gradient(black .5px, transparent 0)"
      },
      backgroundSize: {
        "dotted-gradient": "5px 5px, 100% 100%",
        "dotted-gradient-10": "10px 10px, 100% 100%",
      },
      backgroundPosition: {
        "dotted-gradient": "center",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
        window: "var(--radius-window)",
        soft: "var(--radius-soft)",
        pill: "100px",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brutal: "9px 9px hsl(var(--shadow-color))",
        "brutal-sm": "4px 4px hsl(var(--shadow-color))",
        "brutal-lg": "11px 11px hsl(var(--shadow-color))",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        "spin-slow": "spin 8s linear infinite",
        marquee: "marquee 28s linear infinite",
        "fade-rise": "fade-rise 0.5s ease-out both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
