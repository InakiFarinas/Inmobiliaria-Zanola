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
 * Format a listing's street address, omitting the house number when the
 * record has none (altura 0/empty) — the one address-formatting rule every
 * component showing an address must share.
 */
export function formatAddress(property) {
	if (!property) return "";
	const { ciudad, calle, altura } = property;
	const street = altura ? `${calle} ${altura}` : calle;
	return ciudad ? `${ciudad}, ${street}` : street;
}

/**
 * Format a listing's price with the agency's one price label: "AR$" prefix,
 * thousands separators, "/mes" suffix for rentals.
 */
export function formatPrice(property) {
	const amount = new Intl.NumberFormat("es-AR").format(Number(property?.precio || 0));
	const isRental = String(property?.estado || "")
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.includes("alquiler");
	return `AR$ ${amount}${isRental ? "/mes" : ""}`;
}

/** The ledger entry number stamped on every listing: "N.° 0007". */
export function formatFolio(id) {
	return `N.° ${String(id || 0).padStart(4, "0")}`;
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
