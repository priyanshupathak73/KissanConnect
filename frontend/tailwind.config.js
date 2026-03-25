/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#F5E6D3', /* light beige */
        secondary: '#6D4C41', /* earth brown */
        accent: '#FF7043', /* sunset orange */
        highlight: '#26A69A', /* teal */
      }
    }
  },
  plugins: []
}
