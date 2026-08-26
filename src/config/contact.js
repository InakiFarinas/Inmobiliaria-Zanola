export const WHATSAPP_NUMBER = "541133333274";

export const WHATSAPP_URL = (message) =>
	`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_PROPERTY_URL = (address) =>
	`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quisiera consultar por la propiedad ${address}.`)}`;

// Para uso con api.whatsapp.com (deprecated pero aún funciona)
export const WHATSAPP_API_URL = (message) =>
	`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

export const PHONE_NUMBER = "4624 - 7581";
export const PHONE_LINK = "46247581";
export const EMAIL = "info@juliancabrerapropiedades.com.ar";
export const ADDRESS = "PTE D. F. SARMIENTO 2401, Morón";
