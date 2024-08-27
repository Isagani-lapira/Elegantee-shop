/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'accent-color':'#FDA136',
        'accent-color-hovered': '#D18A36',
        'text': '#1E1E1E'
      },
    },
  },
  plugins: [],
}

