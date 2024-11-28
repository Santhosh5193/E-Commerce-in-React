/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "san-serif"],
        inter: ["Inter", "san-serif"],
      },
      width: {
        130: "55rem",
      },
      padding: {
        50: "50%",
      },
      colors: {
        "light-greyy": "#F5F5F5",
        "light-white": "#FAFAFA",
      },
    },
    screens: {
      sssm: "450px",
      ssm: "530px",
      sm: "640px",
      md: "768px",
      mmd: "900px",
      lg: "1024px",
      xlg: "1150px",
    },
  },
  plugins: [],
};
