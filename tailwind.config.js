/**
 * @format
 * @type {import('tailwindcss').Config}
 */
import withMT from '@material-tailwind/react/utils/withMT';

// eslint-disable-next-line no-undef
export default withMT({
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         keyframes: {
            shimmer: {
               '100%': { transform: 'translateX(100%)' },
            },
            shake: {
               '0%': {
                  transform: 'translateX(0)',
               },
               '20%': {
                  transform: 'translateX(-10px)',
               },
               '40%': {
                  transform: 'translateX(10px)',
               },
               '60%': {
                  transform: 'translateX(-10px)',
               },
               '80%': {
                  transform: ' translateX(10px)',
               },
               '100%': {
                  transform: 'translateX(0)',
               },
            },
         },
         animation: {
            shimmer: 'shimmer 1.5s infinite',
            shake: 'shake 0.5s',
         },
      },
   },
   plugins: [],
});
