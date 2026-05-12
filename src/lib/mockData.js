function svgDataUri({ title, subtitle, background, accent }) {
	const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${background}"/>
      <stop offset="100%" stop-color="${accent}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <circle cx="960" cy="160" r="180" fill="rgba(255,255,255,0.16)"/>
  <circle cx="250" cy="620" r="240" fill="rgba(255,255,255,0.10)"/>
  <rect x="96" y="120" width="500" height="520" rx="36" fill="rgba(255,255,255,0.18)"/>
  <rect x="148" y="180" width="176" height="190" rx="18" fill="rgba(255,255,255,0.34)"/>
  <rect x="350" y="180" width="190" height="120" rx="18" fill="rgba(255,255,255,0.34)"/>
  <rect x="350" y="330" width="190" height="240" rx="18" fill="rgba(255,255,255,0.24)"/>
  <rect x="148" y="390" width="176" height="180" rx="18" fill="rgba(255,255,255,0.26)"/>
  <text x="96" y="712" fill="white" font-family="Manrope, Arial, sans-serif" font-size="34" font-weight="700">${title}</text>
  <text x="96" y="754" fill="rgba(255,255,255,0.88)" font-family="Manrope, Arial, sans-serif" font-size="22">${subtitle}</text>
</svg>`;
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const mockCities = [
	{ id_ciudad: 1, nombre: "Morón Sur" },
	{ id_ciudad: 2, nombre: "Morón Centro" },
	{ id_ciudad: 3, nombre: "Morón" },
];

export const mockTypes = ["Casa", "Departamento", "Local", "Lote"];

export const mockStates = ["Venta", "Alquiler"];

export const mockProperties = [
	{
		id_propiedad: 101,
		tipo: "Departamento",
		estado: "Venta",
		ciudad: "Morón Sur",
		id_ciudad: 1,
		calle: "Colón",
		altura: 4718,
		precio: 95000,
		ambientes: 3,
		dormitorios: 2,
		baños: 1,
		banos: 1,
		garaje: 0,
		superficie: 72,
		antiguedad: 8,
		descripcion:
			"Departamento de tres ambientes en edificio de categoría, ubicado en una zona tranquila y cercana a servicios.",
		imagenes: [
			"/images/propiedades/propiedad1.jpg",
			"/images/propiedades/propiedad2.jpg",
		],
	},
	{
		id_propiedad: 102,
		tipo: "Casa",
		estado: "Alquiler",
		ciudad: "Morón Sur",
		id_ciudad: 1,
		calle: "Paraná",
		altura: 4619,
		precio: 78000,
		ambientes: 4,
		dormitorios: 3,
		baños: 2,
		banos: 2,
		garaje: 1,
		superficie: 140,
		antiguedad: 15,
		descripcion:
			"Casa en alquiler con tres dormitorios, patio y cochera, ideal para familia.",
		imagenes: [
			"/images/propiedades/propiedad3.webp",
			"/images/propiedades/propiedad4.jpg",
		],
	},
	{
		id_propiedad: 103,
		tipo: "Departamento",
		estado: "Alquiler",
		ciudad: "Morón Centro",
		id_ciudad: 2,
		calle: "Brown",
		altura: 4736,
		precio: 320000,
		ambientes: 1,
		dormitorios: 0,
		baños: 1,
		banos: 1,
		garaje: 0,
		superficie: 32,
		antiguedad: 6,
		descripcion:
			"Monoambiente en alquiler en una ubicación céntrica, práctico y funcional para vivir o invertir.",
		imagenes: ["/images/propiedades/propiedad5.jpg"],
	},
	{
		id_propiedad: 104,
		tipo: "Departamento",
		estado: "Venta",
		ciudad: "Morón Sur",
		id_ciudad: 1,
		calle: "García Silva",
		altura: 0,
		precio: 400000,
		ambientes: 2,
		dormitorios: 1,
		baños: 1,
		banos: 1,
		garaje: 0,
		superficie: 55,
		antiguedad: 10,
		descripcion:
			"Departamento en venta en Morón Sur, con buena luz natural y una distribución cómoda para uso diario.",
		imagenes: ["/images/propiedades/propiedad6.jpg"],
	},
	{
		id_propiedad: 105,
		tipo: "Local",
		estado: "Alquiler",
		ciudad: "Morón Sur",
		id_ciudad: 1,
		calle: "Yatay",
		altura: 2688,
		precio: 124000,
		ambientes: 1,
		dormitorios: 0,
		baños: 1,
		banos: 1,
		garaje: 0,
		superficie: 48,
		antiguedad: 7,
		descripcion:
			"Local en alquiler con frente sobre calle activa, útil para comercio barrial o estudio profesional.",
		imagenes: ["/images/propiedades/propiedad1.jpg"],
	},
];

export function getMockPropertyById(id) {
	return (
		mockProperties.find(
			(property) => String(property.id_propiedad) === String(id),
		) || null
	);
}
