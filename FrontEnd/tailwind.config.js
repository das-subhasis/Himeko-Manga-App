/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      noto: ['"Noto Sans JP"', 'sans-serif'],
      roboto: [ '"Roboto Condensed"', 'sans-serif'],
      poppins: ['"Poppins"', 'sans-serif'],
      helvetica: ["'Helvetica'", 'sans-serif'],
      amaranth: ["'Amaranth'", 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}