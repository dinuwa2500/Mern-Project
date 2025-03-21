module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1565D8',
        secondary: '#111827',
        accent: '#1F2937',
        neutral: '#374151',
        'base-100': '#FFFFFF',
        dark: {
          hard: '#002436',
          soft: '#183B56',
        },
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
