/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.vue",
    "./src/components/**/*.vue",
    "./src/views/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        hs_orange: '#F49600',
        hs_pink: '#F00045',
        hs_grey: '#7b7669'
      },
    },
  },
  plugins: [],
}
