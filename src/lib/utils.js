export function getImageSrc(image) {
	return image || "";
}

/**
 * Resolve image URLs with proper base path handling for deployment environments.
 * @param {string} imagePath - Relative or absolute image path (e.g., '/images/propiedades/propiedad1.jpg')
 * @returns {string} Full URL with base path applied
 */
export function getImageUrl(imagePath) {
	const base = import.meta.env.BASE_URL || "/";
	try {
		return new URL(imagePath, `${window.location.origin}${base}`).href;
	} catch {
		return imagePath;
	}
}

export function toSearchableText(value) {
	return String(value || "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}

export function toNumber(value) {
	if (value === null || value === undefined || value === "") {
		return 0;
	}
	const parsed = Number(value);
	return Number.isNaN(parsed) ? 0 : parsed;
}
