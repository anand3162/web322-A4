/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html',],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'),
    require('daisyui'),],
  daisyui: {
      themes: ["fantasy"],  
    }
}

