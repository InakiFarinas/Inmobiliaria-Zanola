export const WHATSAPP_NUMBER = "541133333274";

export const WHATSAPP_URL = (message) =>
	`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_PROPERTY_URL = (address) =>
	`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quisiera consultar por la propiedad ${address}.`)}`;

// Para uso con api.whatsapp.com (deprecated pero aún funciona)
export const WHATSAPP_API_URL = (message) =>
	`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

export const PHONE_NUMBER = "(011) 4489-0000";
export const PHONE_LINK = "1144890000";
export const EMAIL = "info@zanola.com.ar";
