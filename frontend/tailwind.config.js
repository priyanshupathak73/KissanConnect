/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#f0fdf4', /* light green */
        secondary: '#166534', /* dark green */
        accent: '#16a34a', /* green */
        highlight: '#10b981', /* emerald green */
      }
    }
  },
  plugins: []
}
