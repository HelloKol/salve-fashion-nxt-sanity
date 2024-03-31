import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deepPurple: "#1147e0",
        deepGreen: "#02836C",
        deepOrange: "#EB4F39",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        sm: "500px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "2000px",
      },
    },
  },
  plugins: [],
}
export default config
