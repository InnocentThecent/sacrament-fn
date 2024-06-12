/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        primary: "#587DFF",
        primaryHover: "#0167f2",
        "light-bg": "#F9F9FB",
        "light-text": "#111827",
        "dark-text-fill": "#F3F4F6",
        "dark-bg": "#1F2A37",
        "dark-frame-bg": "#262E3D",
        "dark-tertiary": "#374151",
      },
    },
  },
  plugins: [],
};
