/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "470px",
      ssm: "570px",
      sm: "640px",
      md: "822px",
      td: "920px",
      lg: "1024px",
      xl: "1280px",
      tl: "1552px",
      kl: "3800px",
    },
    extend: {
      colors: {
        primary: "var(--primary-color)",
        btnHover: "var(--btnHover-color)",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".drag-none": {
          "-webkit-user-drag": "none",
          "-khtml-user-drag": "none",
          "-moz-user-drag": "none",
          "-o-user-drag": "none",
          "user-drag": "none",
        },
      });
    }),
  ],
};
