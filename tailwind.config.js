/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        specialBlue: '#535bf2',
        specialGray: '#242424'
      }
    },
  },
  plugins: [],
}

