/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: 
  {
    extend: {
      fontFamily: {
        'roboto-serif': ['"Roboto Serif"', 'serif'],
      },
      colors: {
        primary: '#3498db',
        secondary: '#e74c3c',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
  ],
}
// tailwind.config.js
 
