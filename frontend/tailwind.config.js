/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: () => ({
        primary: {
          500: "#3B82F6",
          600: "#2563EB",
        },
        background: {
          200: "#F1F5F9",
        },
        hs_orange: '#F49600',
        hs_pink: '#F00045',
        hs_grey: '#7b7669'
      }),
    }
  },
  plugins: [
    require('preline/plugin'),
  ],
}
