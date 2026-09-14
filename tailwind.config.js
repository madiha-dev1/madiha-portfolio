/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["cursive"],
      },
      colors: {
        ink: "#05030b",
        neon: "#ff31d2",
        violet: "#8b2cff",
        soft: "#f5b4ff"
      },
      boxShadow: {
        neon: "0 0 30px rgba(255,49,210,.25)",
        card: "0 18px 70px rgba(116,26,255,.15)"
      }
    }
  },
  plugins: []
};