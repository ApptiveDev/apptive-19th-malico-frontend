/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'apple': ['Apple SD Gothic Neo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};