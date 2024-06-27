import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#f7f7f7',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#c4c4c4',
          500: '#b3b3b3',
          600: '#a3a3a3',
          700: '#929292',
          800: '#828282',
          900: '#717171',
        },
        red: {
          700: '#d32f2f',
        }
      }
    }
  }
}
