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
        'pretendard': ['Pretendard Variable', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif']
      },
      colors: {
        'middle_grey': 'rgba(229, 229, 234, 1)',
        'dark_grey': 'rgba(136, 136, 136, 1)',
        'light_grey': 'rgba(244, 245, 249, 1)',
        'primary': 'rgba(51, 51, 51, 1)',
        'primary_transition': 'rgb(70,70,70)',
      }
    },
  },
  plugins: [],
};
