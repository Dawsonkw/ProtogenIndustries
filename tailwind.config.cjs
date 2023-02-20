/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'modak': ['Modak', 'cursive'],
        'robotoSlab': ['Roboto Slab', 'serif']
      },  
      colors: {
      'regal-blue': '#243c5a',
      'tan': '#b68d40',
      'cream': '#f4ebd0',
      'charcoal': '#122620',
      'gold': '#d6ad60',
      'forestgreen': '#104210',
      'coolgrey': '#264653',
      'peacockgreen': '#2A9D8F',
      'yellowochre': '#E9C46A',
      'sand': '#F4A261',
      'cadmiumorange': '#E76F51',
      'otterTeal': '#3cbcc0',
      'onyx': '#6F8F72',
      'portGray': '#F2F2F2',
      'jsYellow': '#f7df1e',
      'reactTeal': '#00d8ff',
      'htmlOrange': '#ff7816',
      'tailwindTeal': '#4db6ac',
      'nodeGreen': '#5cad47',
      'viteBlue': '#4dc0ff',
      'cBlue': '#649ad2',
      'pythonBlue': '#498abc',
      'devGreen': '#4caf50',
      'compTan' : '#ad7047',
      'compPurp' : '#9947ad',
      'compPink' : '#d660b3',
      'compAqua' : '#60d6a9',
      'compGray' : '#92a5c2',
      'suchGray' : '#d1dbdb',
      'kitsuneOrange' : '#f37834',
      'kitsuneBlue' : '#34b0f3',
      'resumeBrown' : '#7a534a',
      'kitsuneOrange2' : '#f5b529',
      'gradientOrange' : '#ff9a3b',
      'gradientBlue' : '#3b48ff',
      'gradientLightBlue' : '#93A5CF',
      'gradientWhite' : '#E4EfE9',
      'gradientTeal' : '#43d8b4',
      'midGradientPurp' : '#0e39c1',
      'gradientLB' : '#7dcdfc',
      'compGrad' : '#a88b2d',
      'silver' : '#c0c0c0',
      'compGrad3' : '#fca97d',
      'protoTeal' : '#74ffff',
      'protoBlue' : '#23aee1',
      'protoGray' : '#59403a',
      'protoSteel' : '#5d7683',

    }, 
    screens: {
      'tablet': '640px', 

      'mobile': '360px',
    }
    
  },
  },
  plugins: [
    
  ],
}
