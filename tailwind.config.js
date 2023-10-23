/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,mustache}", "./public/**/*.{html,js}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#140991",
        secondary: {
          nav: "#D9D9D9",
          footer: "#2A1CD2",
          section: "#B158DC",
          home: "#24D8CE",
          about: "#24D8CE",
          button: "#BB8B10",
          but: "#140991",
          logo: "#FFFF00"
        }

      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

