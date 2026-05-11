import { useState } from "react";
import { Link } from "react-router-dom";

function formatPrice(value) {
	return new Intl.NumberFormat("es-AR").format(Number(value || 0));
}

function normalizeStateLabel(value) {
	return String(value || "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}

function getStateClass(value) {
	const state = normalizeStateLabel(value);
	if (state.includes("alquiler")) return "property-badge--alquiler";
	if (state.includes("venta")) return "property-badge--venta";
	if (state.includes("reserv")) return "property-badge--reservada";
	if (state.includes("destac")) return "property-badge--destacada";
	return "";
}

function getPriceLabel(property) {
	const isRental = normalizeStateLabel(property.estado).includes("alquiler");
	const price = formatPrice(property.precio);
	return `AR$ ${price}${isRental ? "/mes" : ""}`;
}

export default function PropertyCard({ property, featured = false }) {
	const images = property.imagenes || [];
	const [currentImage, setCurrentImage] = useState(0);

	const displayedImage = images[currentImage] || images[0];
	const hasCarousel = images.length > 1;

	const previousImage = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setCurrentImage((index) => (index - 1 + images.length) % images.length);
	};

	const nextImage = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setCurrentImage((index) => (index + 1) % images.length);
	};

	return (
		<article
			className={`property-card ${featured ? "property-card-featured" : ""}`}
		>
			<div className="property-image-wrap">
				<Link
					to={`/propiedad/${property.id_propiedad}`}
					className="property-image-link"
					aria-label={`Ver propiedad en ${property.ciudad}, ${property.calle}`}
				>
					{displayedImage ? (
						<img
							src={displayedImage}
							alt={`Propiedad en ${property.ciudad}`}
							className="property-image"
						/>
					) : (
						<div className="property-image placeholder">Sin imagen</div>
					)}
				</Link>

				{hasCarousel && (
					<div className="property-image-controls">
						<button
							type="button"
							onClick={previousImage}
							className="image-control"
						>
							‹
						</button>
						<span>
							{currentImage + 1}/{images.length}
						</span>
						<button type="button" onClick={nextImage} className="image-control">
							›
						</button>
					</div>
				)}
			</div>

			<Link
				to={`/propiedad/${property.id_propiedad}`}
				className="property-card-body property-card-link"
			>
				<div className="property-price">{getPriceLabel(property)}</div>
				<h3>
					{property.ciudad
						? `${property.ciudad}, ${property.calle} ${property.altura}`
						: property.calle}
				</h3>
				<div className="property-meta">
					{property.ambientes ? <span>{property.ambientes} amb.</span> : null}
					{property.superficie ? <span>{property.superficie} m²</span> : null}
					{property.garaje ? <span>Cochera</span> : null}
					{property.patio ? <span>Patio</span> : null}
				</div>
				{property.descripcion ? (
					<p className="property-summary">{property.descripcion}</p>
				) : null}

				<dl className="property-specs">
					<div>
						<dt>Tipo</dt>
						<dd>{property.tipo}</dd>
					</div>
					<div>
						<dt>Amb.</dt>
						<dd>{property.ambientes}</dd>
					</div>
					<div>
						<dt>Dorm.</dt>
						<dd>{property.dormitorios}</dd>
					</div>
					<div>
						<dt>M²</dt>
						<dd>{property.superficie}</dd>
					</div>
				</dl>
			</Link>
		</article>
	);
}
