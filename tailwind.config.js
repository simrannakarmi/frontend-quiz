/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2A9D8F",

          secondary: "#e9c46a",

          accent: "#D0EBE8",

          neutral: "#264653",

          "base-100": "#f4f4f9",

          info: "#3498db",

          success: "#2ecc71",

          warning: "#ff6347",

          error: "#c0392b",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        "light-accent": "#DFF3F1",

        primaryText: "#264653",

        hover: "#99D2CB",

        active: "#99D2CB",
      },
    },
  },
  plugins: [require("daisyui")],
};
