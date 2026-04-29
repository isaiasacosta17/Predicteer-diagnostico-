/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        navy: '#0A1628',
        blue: { DEFAULT: '#1E6BFF', light: '#EEF3FF', dark: '#1558d6' },
        brand: {
          red: '#E53935',
          'red-light': '#FFEBEE',
          orange: '#F57C00',
          'orange-light': '#FFF3E0',
          green: '#2E7D32',
          'green-light': '#E8F5E9',
        },
      },
    },
  },
  plugins: [],
}
