import {
	getMockPropertyById,
	mockCities,
	mockProperties,
	mockStates,
	mockTypes,
} from "./mockData";
import { toSearchableText, toNumber } from "./utils";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(
	/\/$/,
	"",
);
const HAS_API = Boolean(API_BASE_URL);

function buildUrl(path, params) {
	const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);
	Object.entries(params || {}).forEach(([key, value]) => {
		if (value === undefined || value === null || value === "") {
			return;
		}
		url.searchParams.set(key, value);
	});
	return url.toString();
}

async function fetchJson(path, params) {
	const response = await fetch(buildUrl(path, params));
	if (!response.ok) {
		throw new Error(`HTTP ${response.status} ${response.statusText}`);
	}
	const data = await response.json();
	return data;
}

export function normalizeProperty(property) {
	return {
		...property,
		id_propiedad: toNumber(property.id_propiedad),
		precio: toNumber(property.precio),
		ambientes: toNumber(property.ambientes),
		dormitorios: toNumber(property.dormitorios),
		garaje: toNumber(property.garaje),
		baños: toNumber(property.baños ?? property.banos),
		superficie: toNumber(property.superficie),
		antiguedad: toNumber(property.antiguedad),
		id_ciudad: toNumber(property.id_ciudad),
		imagenes: Array.isArray(property.imagenes) ? property.imagenes : [],
	};
}

export async function getLatestProperties(limit = 5) {
	if (!HAS_API) {
		return mockProperties.slice(0, limit).map(normalizeProperty);
	}

	try {
		const data = await fetchJson("/controladores/obtenerPropiedad.php", {
			ultimas: limit,
		});
		const normalized = Array.isArray(data) ? data.map(normalizeProperty) : [];
		return normalized.length > 0
			? normalized.slice(0, limit)
			: mockProperties.slice(0, limit).map(normalizeProperty);
	} catch (error) {
		console.warn("Using mock properties for latest list", error);
		return mockProperties.slice(0, limit).map(normalizeProperty);
	}
}

export async function getProperties(filters = {}) {
	if (HAS_API) {
		try {
			const data = await fetchJson(
				"/controladores/obtenerPropiedad.php",
				filters,
			);
			if (Array.isArray(data)) {
				return data.map(normalizeProperty);
			}
		} catch (error) {
			console.warn("Using mock properties for list", error);
		}
	}

	const searchableFilters = {
		tipo: toSearchableText(filters.tipo),
		estado: toSearchableText(filters.estado),
		ciudad: toSearchableText(filters.ciudad),
		ambientes: filters.ambientes ? Number(filters.ambientes) : null,
		dormitorios: filters.dormitorios ? Number(filters.dormitorios) : null,
		baños: filters.baños ? Number(filters.baños) : null,
		antiguedad: filters.antiguedad ? Number(filters.antiguedad) : null,
		garaje: filters.garaje ? true : null,
		precio_min: filters.precio_min ? Number(filters.precio_min) : null,
		precio_max: filters.precio_max ? Number(filters.precio_max) : null,
		superficie_min: filters.superficie_min
			? Number(filters.superficie_min)
			: null,
		superficie_max: filters.superficie_max
			? Number(filters.superficie_max)
			: null,
	};

	return mockProperties.map(normalizeProperty).filter((property) => {
		if (
			searchableFilters.tipo &&
			!toSearchableText(property.tipo).includes(searchableFilters.tipo)
		)
			return false;
		if (
			searchableFilters.estado &&
			!toSearchableText(property.estado).includes(searchableFilters.estado)
		)
			return false;
		if (
			searchableFilters.ciudad &&
			!toSearchableText(property.ciudad).includes(searchableFilters.ciudad)
		)
			return false;
		if (
			searchableFilters.ambientes !== null &&
			property.ambientes !== searchableFilters.ambientes
		)
			return false;
		if (
			searchableFilters.dormitorios !== null &&
			property.dormitorios !== searchableFilters.dormitorios
		)
			return false;
		if (
			searchableFilters.baños !== null &&
			property.baños !== searchableFilters.baños
		)
			return false;
		if (
			searchableFilters.antiguedad !== null &&
			property.antiguedad !== searchableFilters.antiguedad
		)
			return false;
		if (
			searchableFilters.garaje !== null &&
			Boolean(property.garaje) !== searchableFilters.garaje
		)
			return false;
		if (
			searchableFilters.precio_min !== null &&
			property.precio < searchableFilters.precio_min
		)
			return false;
		if (
			searchableFilters.precio_max !== null &&
			property.precio > searchableFilters.precio_max
		)
			return false;
		if (
			searchableFilters.superficie_min !== null &&
			property.superficie < searchableFilters.superficie_min
		)
			return false;
		if (
			searchableFilters.superficie_max !== null &&
			property.superficie > searchableFilters.superficie_max
		)
			return false;
		return true;
	});
}

export async function getPropertyById(id) {
	if (HAS_API) {
		try {
			const data = await fetchJson(
				"/controladores/obtenerPropiedadDetalle.php",
				{
					id,
				},
			);
			if (data && !data.error) {
				return normalizeProperty(data);
			}
		} catch (error) {
			console.warn("Using mock property detail", error);
		}
	}

	const mockProperty = getMockPropertyById(id);
	if (!mockProperty) {
		throw new Error("Propiedad no encontrada");
	}
	return normalizeProperty(mockProperty);
}

export async function getCities() {
	if (!HAS_API) return mockCities;
	try {
		const data = await fetchJson("/controladores/obtenerCiudades.php");
		return Array.isArray(data) && data.length > 0 ? data : mockCities;
	} catch (error) {
		console.warn("Using mock cities", error);
		return mockCities;
	}
}

export async function getPropertyTypes() {
	if (!HAS_API) return mockTypes;
	try {
		const data = await fetchJson("/controladores/obtenerTipoPropiedad.php");
		return Array.isArray(data) && data.length > 0 ? data : mockTypes;
	} catch (error) {
		console.warn("Using mock property types", error);
		return mockTypes;
	}
}

export async function getPropertyStates() {
	if (!HAS_API) return mockStates;
	try {
		const data = await fetchJson("/controladores/obtenerEstadosPropiedad.php");
		return Array.isArray(data) && data.length > 0 ? data : mockStates;
	} catch (error) {
		console.warn("Using mock property states", error);
		return mockStates;
	}
}
