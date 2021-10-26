module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'stars': "url('/assets/images/stars.gif')",
       }),
      keyframes: {
        rbwiggle: {
          '0%': {
            textShadow: '0 0 5px #fff',
            textShadow: '-3px 1px 0 #ca00af',
            textShadow: '-2.5px 2px 0 #ca00af',
            textShadow: '-1.5px 3px 0 #ca00af',
            color: '#ffffff'
          },
          '30%': {
            textShadow: '0 0 5px #00e1ff',
            textShadow: '3px -1px 0 #00e1ff',
            textShadow: '2.5px -2px 0 #00e1ff',
            textShadow: '1.5px -3px 0 #00e1ff',
            textShadow: '2.5px -2px 0 #00e1ff',
            textShadow: '3px -1px 0 #00e1ff',
            color: '#d9f6fa'
          },
          '100%': {
            textShadow: '0 0 5px #fff',
            textShadow: '-3px 1px 0 #ca00af',
            textShadow: '-2.5px 2px 0 #ca00af',
            textShadow: '-1.5px 3px 0 #ca00af',
            color: 'rgb(255, 235, 254)'
          }
        }
      },
      animation: {
        'rbwiggle': 'rbwiggle 1s infinite'
      },
      fontFamily: {
        default: ['Roboto Mono', 'monospace']
      },
      screens: {
        'tinyaf': '0px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
