/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        shell: "rgb(var(--shell) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        coral: "#FF6B6B",
        teal: "#4ECDC4",
        amber: "#FFB347",
        lavender: "#A78BFA",
      },
      fontFamily: {
        display: ['"Clash Display"', '"DM Sans"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 50px rgba(15, 23, 42, 0.08)",
        glow: "0 18px 38px rgba(99, 102, 241, 0.12)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at top left, rgba(255,255,255,0.7), transparent 34%), radial-gradient(circle at bottom right, rgba(255,255,255,0.12), transparent 32%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
