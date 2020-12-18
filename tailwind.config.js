const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "media",
  purge: {
    content: ["./src/**/*.html", "./src/**/*.tsx"],
  },
  theme: {
    extend: {
      colors: {
        nasaBlue: "rgb(27,62,140)",
        nasaRed: "rgb(232,78,52)",
      },
    },
  },
};
