/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				carbon: "var(--carbon)",
				griso: "var(--griso)",
				lino: "var(--lino)",
				blanco: "var(--blanco)",
				bronze: "var(--bronze)",
				arena: "var(--arena)",
				cuero: "var(--cuero)",
				cazador: "var(--cazador)",
				salvia: "var(--salvia)",
				pizarra: "var(--pizarra)",
				mostaza: "var(--mostaza)",
				terracota: "var(--terracota)",
				accent: "var(--accent)",
				"accent-dark": "var(--accent-dark)",
				"accent-soft": "var(--accent-soft)",
				whatsapp: "var(--whatsapp)",
				"cta-dark": "var(--cta-dark)",
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
				sans: ["Manrope", "sans-serif"],
				serif: ["Fraunces", "serif"],
			},
		},
	},
	plugins: [],
};
