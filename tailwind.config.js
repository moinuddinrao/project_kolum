/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      green: "#57CC9933",
      red: "#A30D11",
      brightGreen: "#80ED9933",
      nao_mint: "#C7F9CC",
      nao_bright_green: "#80ED99",
      nao_green: "#57CC99",
      nao_turquoise: "#38A3A5",
      nao_blue: "#22577A",
      nao_light_gray: "#E9ECEF",
      nao_middle_gray: "#CED4DA",
      nao_middledark_gray: "#6C757D",
      nao_dark_gray: "#495057",
      nao_black: "#212529",
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // https://www.fabiobiondi.dev/blog/2022-09/react-antd-and-tailwind-fix-css-conflicts/#:~:text=In%20fact%20Tailwind%20applies%20a,smooth%20over%20cross%2Dbrowser%20inconsistencies.
  },
};
