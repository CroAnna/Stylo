/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-darker": "#0E296F",
        "blue-dark": "#1443BB",
        "blue-middle": "#5F83DF",
        "blue-disabled": "#1A2B58",
        "white-light": "#F8F8F8",
        "grey-middle": "#BEBEBE",
        "grey-dark": "#343434",
        "grey-darker": "#242424",
        "red-middle": "#7A0B0B",
        "disabled-text": "#8899C5",
        "green-custom": "#0D873E",
      },

      height: {
        500: "31rem",
      },
      outlineWidth: {
        6: "6px",
      },
      fontSize: {
        xxs: "0.6rem",
      },
    },
  },
  plugins: [],
};
