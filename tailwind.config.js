import scrollbar from "tailwind-scrollbar";
import scrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  plugins: [scrollbar, scrollbarHide],
};
