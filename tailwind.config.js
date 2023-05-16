/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Components/Game/Game.tsx",
    "./src/Components/Grid/Grid.tsx",
    "./src/Components/Rules/Rules.tsx",
    "./src/Components/Score/Score.tsx",
    "./src/Components/Difficulty/Difficulty.tsx",
    "./src/Components/BugReportModal/BugReportModal.tsx",
    "./src/Components/LifetimeScores/LifetimeScores.tsx",
  ],
  theme: {
    fontSize: {
        'xs': '1vw',
        'sm': '1.5vw',
        'base': '2vw',
        'lg': '2.5vw',
        'xl': '3vw',
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
          },
          width: {
            '1/3': '30%',
          },
    },
  },
  plugins: [],
}

