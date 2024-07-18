/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './index.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'urbanist-regular': ['urbanist-regular'],
        'urbanist-medium': ['urbanist-medium'],
        'urbanist-semibold': ['urbanist-semibold'],
        'urbanist-bold': ['urbanist-bold'],
        'inter-regular': ['inter-regular'],
        'inter-medium': ['inter-medium'],
        'inter-semibold': ['inter-semibold'],
      },
    },
  },
  plugins: [],
}
