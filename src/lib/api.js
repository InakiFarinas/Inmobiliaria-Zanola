import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export async function getProperties(searchParams) {
	let query = supabase
		.from("propiedades")
		.select("*")
		.eq("activa", true)
		.order("created_at", { ascending: false });

	const ciudad = searchParams.get("ciudad");
	const tipo = searchParams.get("tipo");
	const estado = searchParams.get("estado");
	const precio_max = searchParams.get("precio_max");
	const precio_min = searchParams.get("precio_min");
	const ambientes = searchParams.get("ambientes");
	const dormitorios = searchParams.get("dormitorios");
	const superficie_min = searchParams.get("superficie_min");
	const superficie_max = searchParams.get("superficie_max");
	const garaje = searchParams.get("garaje");

	if (ciudad) query = query.eq("ciudad", ciudad);
	if (tipo) query = query.eq("tipo", tipo);
	if (estado) query = query.eq("estado", estado);
	if (precio_min) query = query.gte("precio", Number(precio_min));
	if (precio_max) query = query.lte("precio", Number(precio_max));
	if (ambientes) query = query.eq("ambientes", Number(ambientes));
	if (dormitorios) query = query.eq("dormitorios", Number(dormitorios));
	if (superficie_min) query = query.gte("superficie", Number(superficie_min));
	if (superficie_max) query = query.lte("superficie", Number(superficie_max));
	if (garaje === "1") query = query.eq("garaje", true);

	const { data, error } = await query;
	if (error) throw error;
	return data;
}

export async function getPropertyById(id) {
	const { data, error } = await supabase
		.from("propiedades")
		.select("*")
		.eq("id_propiedad", id)
		.single();

	if (error) throw error;
	return data;
}

export async function getFeaturedProperties() {
	const { data, error } = await supabase
		.from("propiedades")
		.select("*")
		.eq("activa", true)
		.eq("destacada", true)
		.limit(3);

	if (error) throw error;
	return data;
}

export async function getCities() {
	const { data, error } = await supabase
		.from("propiedades")
		.select("ciudad, id_ciudad")
		.eq("activa", true);

	if (error) throw error;

	// deduplicar por ciudad
	const seen = new Set();
	return data
		.filter(({ ciudad }) => {
			if (seen.has(ciudad)) return false;
			seen.add(ciudad);
			return true;
		})
		.map(({ ciudad, id_ciudad }) => ({ nombre: ciudad, id_ciudad }));
}

export async function getPropertyTypes() {
	const { data, error } = await supabase
		.from("propiedades")
		.select("tipo")
		.eq("activa", true);

	if (error) throw error;

	return [...new Set(data.map(({ tipo }) => tipo))];
}

export async function getPropertyStates() {
	const { data, error } = await supabase
		.from("propiedades")
		.select("estado")
		.eq("activa", true);

	if (error) throw error;

	return [...new Set(data.map(({ estado }) => estado))];
}
export async function getLatestProperties(limit = 3) {
	const { data, error } = await supabase
		.from("propiedades")
		.select("*")
		.eq("activa", true)
		.order("created_at", { ascending: false })
		.limit(limit);

	if (error) throw error;
	return data;
}

/**
 * Get count of properties matching optional searchParams.
 * Uses Supabase head/count to avoid fetching all rows.
 */
export async function getPropertiesCount(searchParams) {
	let query = supabase
		.from("propiedades")
		.select("id_propiedad", { count: "exact", head: true })
		.eq("activa", true);

	if (searchParams) {
		const ciudad = searchParams.get("ciudad");
		const tipo = searchParams.get("tipo");
		const estado = searchParams.get("estado");
		const precio_max = searchParams.get("precio_max");
		const precio_min = searchParams.get("precio_min");
		const ambientes = searchParams.get("ambientes");
		const dormitorios = searchParams.get("dormitorios");
		const superficie_min = searchParams.get("superficie_min");
		const superficie_max = searchParams.get("superficie_max");
		const garaje = searchParams.get("garaje");

		if (ciudad) query = query.eq("ciudad", ciudad);
		if (tipo) query = query.eq("tipo", tipo);
		if (estado) query = query.eq("estado", estado);
		if (precio_min) query = query.gte("precio", Number(precio_min));
		if (precio_max) query = query.lte("precio", Number(precio_max));
		if (ambientes) query = query.eq("ambientes", Number(ambientes));
		if (dormitorios) query = query.eq("dormitorios", Number(dormitorios));
		if (superficie_min) query = query.gte("superficie", Number(superficie_min));
		if (superficie_max) query = query.lte("superficie", Number(superficie_max));
		if (garaje === "1") query = query.eq("garaje", true);
	}

	const { count, error } = await query;
	if (error) throw error;
	return count || 0;
}
