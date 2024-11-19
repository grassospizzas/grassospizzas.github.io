module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grasso-red': 'var(--grasso-red)',
        'grasso-orange': 'var(--grasso-orange)',
      },
      fontFamily: {
        'grasso': ['Roboto', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}