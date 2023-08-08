/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        tag_group_1_color: '#7BFFA0',
        tag_group_2_color: '#FF7BB3',
        tag_group_3_color: '#7BC8FF',
        pill_color: '#111111'
      }
    }
  }
}
