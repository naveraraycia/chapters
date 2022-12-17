/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        sans: ['Mulish', 'sans-serif']
      },
      colors: {
        skyBlue: '#E0F7FA',
        darkBlueGreen: '#0097A7',
        lightBlueGreen: '#1EBCCC',
        darkenedSkyBlue: '#B2EBF2',
        lightOrange: '#FEE2DD',
        darkOrange: '#FF6E40',
        darkerOrange: '#FFBAAD',
        lighterOrange: '#FF9E80',
        lightSkyBlue: '#97CFD5',
        mint: '#A7FFEB',
        darkMint: '#009688',
        darkerMint: '#6FE9CD',
        dangerRed: '#FD7070',
        darkDangerRed: '#F65151'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}