/** @type {import('tailwindcss').Config} */
export default {
 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'text-gradient': 'linear-gradient(to right, #8600D9EB, #470073EB)',
      },
      screens: {
        'xxs':"340px",
        'xs': '500px',  // for mobile phones
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        "2lg":"1120px",
        'xl': '1280px',
        '2xl': '1536px',
        'vsm': '400px',

      }
    },
  },
  plugins: [],
}

