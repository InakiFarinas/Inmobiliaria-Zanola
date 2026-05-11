import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
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

	return (
		<section className="section-block section-block-wide">
			<div className="section-heading section-heading-inline">
				<div>
					<span className="section-kicker">Explora</span>
					<h1>Listado de propiedades</h1>
				</div>
				<p className="section-summary">
					Filtrá por tipo, ciudad, presupuesto y características clave.
				</p>
			</div>

			<div className="properties-layout">
				<PropertyFilters
					values={filters}
					onChange={handleChange}
					onSubmit={handleSubmit}
					onReset={handleReset}
					options={{ cities, types, states }}
				/>

				<div className="properties-results">
					{loading ? (
						<p className="empty-state">Cargando propiedades...</p>
					) : properties.length > 0 ? (
						<div className="property-grid">
							{properties.map((property) => (
								<PropertyCard key={property.id_propiedad} property={property} />
							))}
						</div>
					) : (
						<p className="empty-state">
							No se encontraron propiedades con esos filtros.
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
