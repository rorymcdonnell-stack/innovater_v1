/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#172749',
        'navy-light': '#1e3461',
        sun: '#F18B01',
        gleam: '#FFC82D',
        sky: '#98BAC3',
        emerald: '#004732',
        spring: '#B3D680',
        mist: '#D5D1CB',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
