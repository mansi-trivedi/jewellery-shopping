import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px", // => @media (min-width: 576px) { ... }
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkBlue: "#001e38",
        white: "#ffffff",
        orange: "#f05d4d",
        offWhite: "#F8F8F8",
        lightBlue: "#003a66",
      },
    },
  },
  plugins: [],
} satisfies Config;
