module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  variants: {},
  plugins: [],
  theme: {
    extend: {
      maxHeight: {
        11: "65%",
      },
      margin: {
        25: "25%",
        50: "50%",
        75: "75%",
      },
      colors: {
        secondary: "#ebebeb",
      },
      padding: {
        25: "25%",
        50: "50%",
        75: "75%",
      },
      height: {
        30: "30vh",
      },
      text: {
        xs: "0.75rem",
      },
    },
  },
};
