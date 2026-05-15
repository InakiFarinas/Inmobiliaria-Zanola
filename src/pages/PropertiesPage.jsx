import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropertyCard from "../components/properties/PropertyCard";
import PropertyFilters from "../components/properties/PropertyFilters";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import {
	getCities,
	getProperties,
	getPropertyStates,
	getPropertyTypes,
} from "../lib/api";

const defaultFilters = {
	tipo: "",
	estado: "",
	ciudad: "",
	ambientes: "",
	dormitorios: "",
	baños: "",
	antiguedad: "",
	garaje: false,
	precio_min: "",
	precio_max: "",
	superficie_min: "",
	superficie_max: "",
};

function readFilters(searchParams) {
	return {
		tipo: searchParams.get("tipo") || "",
		estado: searchParams.get("estado") || "",
		ciudad: searchParams.get("ciudad") || "",
		ambientes: searchParams.get("ambientes") || "",
		dormitorios: searchParams.get("dormitorios") || "",
		baños: searchParams.get("baños") || "",
		antiguedad: searchParams.get("antiguedad") || "",
		garaje: searchParams.get("garaje") === "1",
		precio_min: searchParams.get("precio_min") || "",
		precio_max: searchParams.get("precio_max") || "",
		superficie_min: searchParams.get("superficie_min") || "",
		superficie_max: searchParams.get("superficie_max") || "",
	};
}

function serializeFilters(values) {
	const params = new URLSearchParams();
	Object.entries(values).forEach(([key, value]) => {
		if (
			value === "" ||
			value === false ||
			value === null ||
			value === undefined
		) {
			return;
		}
		params.set(key, value === true ? "1" : value);
	});
	return params;
}

export default function PropertiesPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [cities, setCities] = useState([]);
	const [types, setTypes] = useState([]);
	const [states, setStates] = useState([]);
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState(() => readFilters(searchParams));

	useEffect(() => {
		let active = true;

		Promise.all([getCities(), getPropertyTypes(), getPropertyStates()])
			.then(([cityData, typeData, stateData]) => {
				if (!active) {
					return;
				}
				setCities(cityData || []);
				setTypes(typeData || []);
				setStates(stateData || []);
			})
			.catch((error) => console.error(error));

		return () => {
			active = false;
		};
	}, []);

	const queryFilters = useMemo(() => readFilters(searchParams), [searchParams]);

	useEffect(() => {
		let active = true;
		setLoading(true);
		getProperties(serializeFilters(queryFilters))
			.then((data) => {
				if (!active) {
					return;
				}
				setProperties(data || []);
			})
			.catch((error) => {
				console.error(error);
				if (active) {
					setProperties([]);
				}
			})
			.finally(() => {
				if (active) {
					setLoading(false);
				}
			});

		return () => {
			active = false;
		};
	}, [queryFilters]);

	const handleChange = (event) => {
		const { name, type, value, checked } = event.target;
		setFilters((current) => ({
			...current,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const params = serializeFilters(filters).toString();
		navigate(`/propiedades${params ? `?${params}` : ""}`);
	};

	const handleReset = () => {
		setFilters(defaultFilters);
		navigate("/propiedades");
	};

	const [filtersOpen, setFiltersOpen] = useState(false);

	const handleMobileSubmit = (event) => {
		handleSubmit(event);
		setFiltersOpen(false);
	};

	return (
		<section className="mx-auto w-[min(1180px,calc(100%_-_24px))] md:w-[min(1180px,calc(100%_-_32px))] pt-4 md:pt-6">
			<SectionHeader
				align="inline"
				kicker="Explora"
				title="Listado de propiedades"
				description="Filtrá por tipo, ciudad, presupuesto y características clave."
			/>

			<div className="mb-4 lg:hidden flex items-center justify-between">
				<button
					type="button"
					className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-extrabold text-[color:var(--accent)] bg-white/90 shadow-sm"
					onClick={() => setFiltersOpen(true)}
				>
					Filtros
				</button>
				<span className="text-sm text-muted">
					{properties.length} resultados
				</span>
			</div>

			<div className="grid gap-4 md:gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
				<div className="hidden lg:block">
					<PropertyFilters
						values={filters}
						onChange={handleChange}
						onSubmit={handleSubmit}
						onReset={handleReset}
						options={{ cities, types, states }}
					/>
				</div>

				<div className="min-w-0">
					{loading ? (
						<EmptyState title="Cargando propiedades..." />
					) : properties.length > 0 ? (
						<div className="grid gap-4 md:grid-cols-2">
							{properties.map((property) => (
								<PropertyCard key={property.id_propiedad} property={property} />
							))}
						</div>
					) : (
						<EmptyState title="No se encontraron propiedades con esos filtros." />
					)}
				</div>
			</div>

			{/* Mobile drawer for filters */}
			<div
				className={`fixed inset-0 z-50 md:hidden ${filtersOpen ? "" : "pointer-events-none"}`}
				aria-hidden={!filtersOpen}
			>
				<div
					className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${filtersOpen ? "opacity-100" : "opacity-0"}`}
					onClick={() => setFiltersOpen(false)}
				/>
				<aside
					className={`absolute left-0 top-0 bottom-0 w-[92%] max-w-[340px] bg-[var(--surface)] p-4 transition-transform duration-300 ${
						filtersOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className="flex items-center justify-between mb-3">
						<h3 className="m-0 font-extrabold">Filtros</h3>
						<button
							className="inline-flex items-center justify-center rounded-full p-2"
							onClick={() => setFiltersOpen(false)}
							aria-label="Cerrar filtros"
						>
							✕
						</button>
					</div>
					<PropertyFilters
						values={filters}
						onChange={handleChange}
						onSubmit={handleMobileSubmit}
						onReset={() => {
							handleReset();
							setFiltersOpen(false);
						}}
						options={{ cities, types, states }}
					/>
				</aside>
			</div>
		</section>
	);
}
