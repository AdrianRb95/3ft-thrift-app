/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FBF9F5",
        card: "#FFFFFF",
        muted: "#F4EFEA",
        gold: {
          DEFAULT: "#A78B71",
          hover: "#8F7359",
          light: "#EFE8E1",
          glow: "rgba(167, 139, 113, 0.25)"
        },
        bordeaux: {
          DEFAULT: "#732D30",
          hover: "#5C2426",
          light: "#F7EDED"
        },
        ink: {
          primary: "#161514",
          secondary: "#6A6661",
          muted: "#9B968F"
        },
        subtle: "rgba(22, 21, 20, 0.08)",
        glass: "rgba(255, 255, 255, 0.85)"
      },
      fontFamily: {
        serif: ["PlayfairDisplay", "serif"],
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};
