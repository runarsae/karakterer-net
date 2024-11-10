/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-raleway)"],
      },
      colors: {
        "neutral-925": "rgb(16, 16, 16)",
        "neutral-850": "rgb(30, 30, 30)",
      },
      screens: {
        xs: "375px",
        "2xl": "1376px",
      },
      transitionProperty: {
        height: "height",
        "max-h": "max-height",
      },
    },
  },
  plugins: [],
};
