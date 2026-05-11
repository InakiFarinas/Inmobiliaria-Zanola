import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropertyGallery from "../components/PropertyGallery";
import PropertyMap from "../components/PropertyMap";
import { WHATSAPP_PROPERTY_URL } from "../config/contact";
import { getPropertyById } from "../lib/api";

function formatPrice(value) {
	return new Intl.NumberFormat("es-AR").format(Number(value || 0));
}

export default function PropertyDetailPage() {
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!id) {
			setLoading(false);
			setError("ID inválido");
			return;
		}

		let active = true;
		setLoading(true);
		setError("");

		getPropertyById(id)
			.then((data) => {
				if (!active) {
					return;
				}
				setProperty(data);
			})
			.catch((fetchError) => {
				if (active) {
					setError(fetchError.message || "No se pudo cargar la propiedad");
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
	}, [id]);

	const address = useMemo(() => {
		if (!property) {
			return "";
		}
		return `${property.ciudad}, ${property.calle} ${property.altura}`;
	}, [property]);

	if (loading) {
		return <p className="empty-state">Cargando detalle de la propiedad...</p>;
	}

	if (error) {
		return (
			<div className="empty-state empty-state-hero">
				<p>{error}</p>
				<Link to="/propiedades" className="button button-primary">
					Volver al listado
				</Link>
			</div>
		);
	}

	if (!property) {
		return null;
	}

	return (
		<section className="section-block section-block-wide">
			<div className="detail-topbar">
				<div>
					<span className="section-kicker">Detalle</span>
					<h1>{address}</h1>
				</div>
				<Link to="/propiedades" className="text-link">
					Volver al listado
				</Link>
			</div>

			<div className="detail-layout">
				<PropertyGallery images={property.imagenes} title={address} />

				<aside className="detail-aside">
					<div className="price-card">
						<span>
							{property.estado === "Alquiler"
								? "Precio de alquiler"
								: "Precio de venta"}
						</span>
						<strong>${formatPrice(property.precio)}</strong>
					</div>

					<p className="detail-description">{property.descripcion}</p>

					<dl className="detail-specs">
						<div>
							<dt>Tipo</dt>
							<dd>{property.tipo}</dd>
						</div>
						<div>
							<dt>Garaje</dt>
							<dd>{property.garaje === 1 ? "Sí" : "No"}</dd>
						</div>
						<div>
							<dt>Baños</dt>
							<dd>{property.baños}</dd>
						</div>
						<div>
							<dt>Ambientes</dt>
							<dd>{property.ambientes}</dd>
						</div>
						<div>
							<dt>Dormitorios</dt>
							<dd>{property.dormitorios}</dd>
						</div>
						<div>
							<dt>Superficie</dt>
							<dd>{property.superficie} m²</dd>
						</div>
						<div>
							<dt>Antigüedad</dt>
							<dd>{property.antiguedad} años</dd>
						</div>
					</dl>

					<a
						className="button button-primary detail-cta"
						href={WHATSAPP_PROPERTY_URL(address)}
						target="_blank"
						rel="noreferrer"
					>
						¡Contactanos!
					</a>
				</aside>
			</div>

			<div className="map-section">
				<div className="section-heading">
					<span className="section-kicker">Ubicación</span>
					<h2>Encontrala en el mapa</h2>
				</div>
				<PropertyMap address={address} />
			</div>
		</section>
	);
}
