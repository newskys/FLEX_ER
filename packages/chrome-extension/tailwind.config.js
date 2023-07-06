/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './popup/**/*.{js,jsx,ts,tsx}',
    './popup/**/*.{js,jsx,ts,tsx}',
    './dashboard/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      zIndex: {
        'over-flex': '1001',
      },
    },
  },
  plugins: [],
}
