/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Components/Game/Game.tsx",
    "./src/Components/Grid/Grid.tsx"
  ],
  theme: {
    fontSize: {
        'xs': '1.5vw',
        'sm': '2vw',
        'base': '2.5vw',
        'lg': '3vw',
        'xl': '3.5vw',
    },
    fontFamily: {
        'cp-bold': ['CourierPrime-Bold']
    },
    extend: {
        padding: {
            '1/2': '50%',
            full: '100%',
          },
          boxShadow: {
            '3xl': '0 0 20px #252525'
          }
    },
  },
  plugins: [],
}

