/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          1: '#A242AF',
          2: '#783282',
        },
        yellow: {
          1: '#F6CF8C',
          2: '#D0AC6F',
        },
      },
      screens: {
        '900': '900px',
        '1200': '1200px',
      },
      fontFamily: {
        'ko-nanum-gothic': ["Nanum Gothic", "ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        'en-sans-serif': ["ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      animation: {
        'fade-in-0.2': 'fade-in 0.2s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      }
    },
  },
  plugins: [],
}

