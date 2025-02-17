import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				slideIn: {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				slideUp: {
					"0%": { opacity: "0", transform: "translateY(5px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
			animation: {
				slideIn: "slideIn 0.3s ease-out",
				slideUp: "slideUp 0.2s ease-out",
				fadeIn: "fadeIn 0.3s ease-out",
			},
		},
	},
	plugins: [],
} satisfies Config;
