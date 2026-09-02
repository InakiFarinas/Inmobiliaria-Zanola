/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				seal: "var(--seal)",
				accent: "var(--accent)",
				"accent-soft": "var(--accent-soft)",
				whatsapp: "var(--whatsapp)",
				"cta-dark": "var(--cta-dark)",
				gold: "var(--gold)",
			},
			borderRadius: {
				xl: "var(--radius-xl)",
				lg: "var(--radius-lg)",
				md: "var(--radius-md)",
				sm: "var(--radius-sm)",
			},
			boxShadow: {
				site: "var(--shadow)",
			},
			fontFamily: {
				sans: ["Public Sans", "system-ui", "sans-serif"],
				serif: ["Spectral", "serif"],
				mono: ["Fragment Mono", "monospace"],
			},
		},
	},
	plugins: [],
};
