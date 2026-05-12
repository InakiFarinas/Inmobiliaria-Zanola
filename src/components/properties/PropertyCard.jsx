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

function getPriceLabel(property) {
	const isRental = normalizeStateLabel(property.estado).includes("alquiler");
	const price = formatPrice(property.precio);
	return `AR$ ${price}${isRental ? "/mes" : ""}`;
}

export default function PropertyCard({ property, featured = false }) {
	const images = property.imagenes || [];
	const displayedImage = images[0];
	const isRental = normalizeStateLabel(property.estado).includes("alquiler");
	const stateLabel = isRental ? "Alquiler" : "Venta";

	return (
		<article
			className={`overflow-hidden rounded-md bg-white shadow-lg transition-transform hover:-translate-y-1 ${featured ? "md:col-span-2" : ""}`}
		>
			<div className="relative">
				<Link
					to={`/propiedad/${property.id_propiedad}`}
					aria-label={`Ver propiedad en ${property.ciudad}, ${property.calle}`}
					className="block"
				>
					{displayedImage ? (
						<img
							src={displayedImage}
							alt={`Propiedad en ${property.ciudad}`}
							className={`w-full ${featured ? "h-64 md:h-96" : "h-48 md:h-56"} object-cover`}
						/>
					) : (
						<div className="flex h-48 items-center justify-center bg-gray-100 text-muted md:h-56">
							Sin imagen
						</div>
					)}
				</Link>
				<span className="absolute right-3 top-3 rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-bold uppercase text-[var(--accent)]">
					{stateLabel}
				</span>
			</div>

			<Link to={`/propiedad/${property.id_propiedad}`} className="block p-4">
				<div className="text-2xl font-extrabold text-[var(--text)]">
					{getPriceLabel(property)}
				</div>
				<h3 className="mt-2 text-lg font-bold">
					{property.ciudad
						? `${property.ciudad}, ${property.calle} ${property.altura}`
						: property.calle}
				</h3>
				<div className="mt-2 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
					{property.ambientes ? (
						<span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1">
							{property.ambientes} amb.
						</span>
					) : null}
					{property.superficie ? (
						<span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1">
							{property.superficie} m²
						</span>
					) : null}
					{property.garaje ? (
						<span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1">
							Cochera
						</span>
					) : null}
					{property.patio ? (
						<span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1">
							Patio
						</span>
					) : null}
				</div>
				{property.descripcion ? (
					<p className="mt-3 text-sm text-[var(--muted)]">
						{property.descripcion}
					</p>
				) : null}

				<dl className="mt-4 grid grid-cols-4 gap-3">
					<div>
						<dt className="text-xs text-muted">Tipo</dt>
						<dd className="font-semibold">{property.tipo}</dd>
					</div>
					<div>
						<dt className="text-xs text-muted">Amb.</dt>
						<dd className="font-semibold">{property.ambientes}</dd>
					</div>
					<div>
						<dt className="text-xs text-muted">Dorm.</dt>
						<dd className="font-semibold">{property.dormitorios}</dd>
					</div>
					<div>
						<dt className="text-xs text-muted">M²</dt>
						<dd className="font-semibold">{property.superficie}</dd>
					</div>
				</dl>
			</Link>
		</article>
	);
}
<dt className="text-xs text-muted">M²</dt>;
