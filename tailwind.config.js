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
      colors: {
        'middle_grey': 'rgba(229, 229, 234, 1)',
        'dark_grey': 'rgba(136, 136, 136, 1)',
        'light_grey': 'rgba(244, 245, 249, 1)',
        'primary': 'rgba(60,127,255,1)',
        'primary_transition': 'rgba(50,117,245,1)',
      }
    },
  },
  plugins: [],
};
