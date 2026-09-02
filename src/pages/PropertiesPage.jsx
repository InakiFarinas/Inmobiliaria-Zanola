import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropertyCard from "../components/properties/PropertyCard";
import PropertyFilters from "../components/properties/PropertyFilters";
import Container from "../components/ui/Container";
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
	banos: "",
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
		banos: searchParams.get("banos") || "",
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
	const [filtersOpen, setFiltersOpen] = useState(false);
	const [optionsError, setOptionsError] = useState(null);
	const [error, setError] = useState(null);

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
			.catch((error) => {
				console.error(error);
				if (active) setOptionsError("No pudimos cargar los filtros.");
			});

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
					setError("No pudimos cargar las propiedades.");
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

	const handleMobileSubmit = (event) => {
		handleSubmit(event);
		setFiltersOpen(false);
	};

	return (
		<Container className="pt-4 md:pt-6">
			<SectionHeader
				align="inline"
				title="Listado de propiedades"
				description="Filtrá por tipo, ciudad, presupuesto y características clave."
			/>

			<div className="mb-4 lg:hidden flex items-center justify-between border-y border-dashed border-[color:var(--line)] py-2.5">
				<button
					type="button"
					className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[color:var(--line)] bg-[var(--surface)] px-4 py-2 font-semibold text-[var(--text)]"
					onClick={() => setFiltersOpen(true)}
				>
					Filtros
				</button>
				<span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
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
					{error ? (
						<EmptyState
							title={error}
							className="text-left"
						/>
					) : loading ? (
						<EmptyState
							title="Cargando propiedades..."
							className="animate-pulse text-left font-mono text-[0.72rem] uppercase tracking-[0.08em]"
						/>
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

			{/* Mobile drawer for filters — breakpoint must match the trigger button's lg:hidden above */}
			<div
				className={`fixed inset-0 z-50 lg:hidden ${filtersOpen ? "" : "pointer-events-none"}`}
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
						<h3 className="m-0 font-serif text-xl font-medium">Filtros</h3>
						<button
							className="inline-flex items-center justify-center rounded-full p-2"
							onClick={() => setFiltersOpen(false)}
							aria-label="Cerrar filtros"
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.2"
								strokeLinecap="round"
							>
								<path d="M6 6l12 12M18 6L6 18" />
							</svg>
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
		</Container>
	);
}
