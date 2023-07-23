/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './common/**/*.{js,jsx,ts,tsx}',
    './popup/**/*.{js,jsx,ts,tsx}',
    './widget/**/*.{js,jsx,ts,tsx}',
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
