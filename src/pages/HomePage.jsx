import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { getCities, getLatestProperties, getPropertyStates } from "../lib/api";
import { WHATSAPP_URL } from "../config/contact";

const heroPoints = [
	{
		title: "Morón Sur y Morón Centro",
		text: "Propiedades en las zonas más buscadas de Morón, con alternativas de venta y alquiler.",
	},
	{
		title: "Casa, departamento y local",
		text: "Publicaciones activas en los rubros que la inmobiliaria trabaja de forma habitual.",
	},
	{
		title: "Atención directa",
		text: "Teléfono, WhatsApp y correo publicados para consultas rápidas.",
	},
];

export default function HomePage() {
	const navigate = useNavigate();
	const [cities, setCities] = useState([]);
	const [states, setStates] = useState([]);
	const [latest, setLatest] = useState([]);
	const [form, setForm] = useState({ ciudad: "", estado: "" });
	const heroProperties = latest.slice(0, 3);

	useEffect(() => {
		let active = true;

		Promise.all([getCities(), getPropertyStates(), getLatestProperties(5)])
			.then(([cityData, stateData, propertyData]) => {
				if (!active) return;
				setCities(cityData || []);
				setStates(stateData || []);
				setLatest(propertyData || []);
			})
			.catch((error) => console.error(error));

		return () => {
			active = false;
		};
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const params = new URLSearchParams();
		if (form.ciudad) params.set("ciudad", form.ciudad);
		if (form.estado) params.set("estado", form.estado);
		navigate(`/propiedades${params.toString() ? `?${params.toString()}` : ""}`);
	};

	return (
		<>
			<section className="hero">
				<div className="hero-shell">
					<div className="hero-copy">
						<span className="eyebrow">Morón · Buenos Aires</span>
						<h1>
							Encontrá tu próxima{" "}
							<span className="highlight-red">propiedad</span>
						</h1>
						<p>
							Explorá opciones de venta y alquiler con un acceso directo a
							propiedades destacadas, búsqueda rápida y contacto inmediato.
						</p>

						<div className="hero-actions">
							<Link to="/propiedades" className="button button-primary">
								Ver propiedades
							</Link>
							<a
								href={WHATSAPP_URL("Hola, quisiera que me contacten.")}
								target="_blank"
								rel="noreferrer"
								className="button button-ghost"
							>
								Contactar
							</a>
						</div>

						<div className="hero-points">
							<span>Venta</span>
							<span>Alquiler</span>
							<span>Morón Sur</span>
							<span>Morón Centro</span>
						</div>
					</div>

					<form className="hero-search" onSubmit={handleSubmit}>
						<label>
							Ciudad
							<select
								value={form.ciudad}
								onChange={(event) =>
									setForm((current) => ({
										...current,
										ciudad: event.target.value,
									}))
								}
							>
								<option value="">Todas las ciudades</option>
								{cities.map((city) => (
									<option key={city.id_ciudad} value={city.id_ciudad}>
										{city.nombre}
									</option>
								))}
							</select>
						</label>
						<label>
							Estado
							<select
								value={form.estado}
								onChange={(event) =>
									setForm((current) => ({
										...current,
										estado: event.target.value,
									}))
								}
							>
								<option value="">Seleccionar...</option>
								{states.map((state) => (
									<option key={state} value={state}>
										{state}
									</option>
								))}
							</select>
						</label>
						<label>
							Precio Máximo
							<input
								type="number"
								placeholder="Sin límite"
								value={form.precio_max ?? ""}
								onChange={(event) =>
									setForm((current) => ({
										...current,
										precio_max: event.target.value,
									}))
								}
							/>
						</label>
						<button type="submit" className="button button-primary">
							Buscar
						</button>
					</form>

					<div className="hero-panel">
						<div className="hero-collage">
							<div className="hero-collage-main">
								{heroProperties[0] ? (
									<img
										src={heroProperties[0].imagenes[0]}
										alt={heroProperties[0].ciudad}
										className="hero-collage-image hero-collage-image-main"
									/>
								) : (
									<div className="hero-collage-placeholder" />
								)}
								<div className="hero-collage-badge">Destacada</div>
							</div>

							<div className="hero-collage-stack">
								{heroProperties.slice(1, 3).map((property) => (
									<div
										className="hero-collage-card"
										key={property.id_propiedad}
									>
										<img
											src={property.imagenes[0]}
											alt={property.ciudad}
											className="hero-collage-image"
										/>
										<div className="hero-collage-copy">
											<strong>{property.calle}</strong>
											<span>{property.ciudad}</span>
										</div>
									</div>
								))}
							</div>

							<div className="hero-collage-footer">
								<span>{latest.length} publicaciones activas</span>
								<div className="hero-dots" aria-hidden="true">
									<span />
									<span />
									<span />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="feature-section">
				<div className="section-heading">
					<span className="section-kicker">Por qué elegirnos</span>
					<h2>Propiedades y contacto en un solo lugar</h2>
				</div>
				<div className="feature-grid">
					{heroPoints.map((item) => (
						<article className="feature-card" key={item.title}>
							<h3>{item.title}</h3>
							<p>{item.text}</p>
						</article>
					))}
				</div>
			</section>

			<section className="section-block section-block-wide">
				<div className="section-heading section-heading-inline">
					<div>
						<span className="section-kicker">Últimas propiedades</span>
						<h2>Nuevas oportunidades</h2>
					</div>
					<Link to="/propiedades" className="text-link">
						Ver todas
					</Link>
				</div>

				{latest.length > 0 ? (
					<div className="property-grid property-grid-home">
						{latest.map((property) => (
							<PropertyCard
								key={property.id_propiedad}
								property={property}
								featured
							/>
						))}
					</div>
				) : (
					<p className="empty-state">
						No hay propiedades para mostrar todavía.
					</p>
				)}
			</section>
		</>
	);
}
