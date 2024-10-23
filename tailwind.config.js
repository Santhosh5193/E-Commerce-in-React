/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-greyy": "#F5F5F5",
        "light-white": "#FAFAFA",
      },
    },
    screens: {
      ssm: "530px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [],
};
