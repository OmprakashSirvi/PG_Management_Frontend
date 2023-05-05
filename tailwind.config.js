/**
 * @format
 * @type {import('tailwindcss').Config}
 */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         keyframes: {
            shimmer: {
               '100%': { transform: 'translateX(100%)' },
            },
         },
         animation: {
            shimmer: 'shimmer 1.5s infinite',
         },
      },
   },
   plugins: [],
});
