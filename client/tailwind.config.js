/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundColor: {
        'nav': '#095089',
        'sidenav':'#f4f4f5',
      },
    },
  },
  plugins: [],
}
