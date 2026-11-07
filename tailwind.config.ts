import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { ink: "#172033", muted: "#788399", canvas: "#f6f7fb", violet: "#7165e8" }, boxShadow: { soft: "0 12px 40px rgba(30,40,70,.07)" } } },
  plugins: []
};
export default config;