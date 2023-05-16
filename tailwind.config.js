/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontSize: {
        'xs': '1vw',
        'sm': '1.5vw',
        'base': '2vw',
        'lg': '2.5vw',
        'xl': '3vw',
    },
    translate: {
        '2/4': '-50%'
    },
    fontFamily: {
        'cp-bold': ['CourierPrime-Bold']
    },
    extend: {
        transitionProperty: {
            'custom': 'all .5s cubic-bezier(.79, -1, .37, 2)'
        },
        colors: {
            lime: {
                500: '#993333'
            }
        },
        keyframes: {
            fadeIn: {
            '0%': 'opacity: 0',
            '100%': 'opacity: 1'
            }
        },
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

