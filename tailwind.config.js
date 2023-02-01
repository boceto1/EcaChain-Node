/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/*.ejs",
  ],
  theme: {
    fontFamily: {
      header: ["Raleway", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}
