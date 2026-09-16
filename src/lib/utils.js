const CURRENCY_SYMBOLS = { USD: "US$", ARS: "AR$" };

/**
 * Format a property price with its currency symbol.
 * @param {number|string} precio
 * @param {"USD"|"ARS"} [moneda]
 * @returns {string}
 */
export function formatPrice(precio, moneda = "USD") {
	const symbol = CURRENCY_SYMBOLS[moneda] || CURRENCY_SYMBOLS.USD;
	const amount = new Intl.NumberFormat("es-AR").format(Number(precio || 0));
	return `${symbol} ${amount}`;
}

/**
 * Resolve image URLs with proper base path handling for deployment environments.
 * Supports WebP format with automatic fallback for local images.
 * @param {string} imagePath - Relative or absolute image path (e.g., '/images/propiedades/propiedad1.jpg')
 * @returns {string} Full URL with base path applied, preferring WebP if available
 */
export function getImageUrl(imagePath) {
	const base = import.meta.env.BASE_URL || "/";
	try {
		// If it's already a full URL (e.g., from Supabase), return as-is
		if (imagePath.startsWith("http")) {
			return imagePath;
		}

		// For local images, prefer WebP version
		let urlPath = imagePath;
		if (imagePath.match(/\.(jpg|jpeg|png)$/i)) {
			// Create WebP version path
			urlPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
		}

		return new URL(urlPath, `${window.location.origin}${base}`).href;
	} catch {
		return imagePath;
	}
}

/**
 * Get WebP and fallback image URLs for picture element
 * @param {string} imagePath - Image path
 * @returns {{webp: string, fallback: string}} Object with webp and fallback URLs
 */
export function getImageUrls(imagePath) {
	const base = import.meta.env.BASE_URL || "/";

	// If it's already a full URL, return it for both
	if (imagePath?.startsWith("http")) {
		return { webp: imagePath, fallback: imagePath };
	}

	try {
		const origin = window.location.origin;

		// Get WebP path
		const webpPath =
			imagePath?.replace(/\.(jpg|jpeg|png)$/i, ".webp") || imagePath;
		const webpUrl = new URL(webpPath, `${origin}${base}`).href;

		// Get fallback path
		const fallbackUrl = new URL(imagePath, `${origin}${base}`).href;

		return { webp: webpUrl, fallback: fallbackUrl };
	} catch {
		return { webp: imagePath, fallback: imagePath };
	}
}
