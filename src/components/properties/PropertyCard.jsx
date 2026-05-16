import { memo } from "react";
import { Link } from "react-router-dom";
import PropertyImageCarousel from "./PropertyImageCarousel";
import {
	StatGridAgeIcon,
	StatGridBathroomsIcon,
	StatGridBedroomsIcon,
	StatGridGarageIcon,
	StatGridRoomsIcon,
	StatGridSurfaceIcon,
	StatGridTypeIcon,
} from "../ui/StatGridIcons";

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

function PropertyCard({ property, featured = false }) {
	const images = property.imagenes || [];
	const isRental = normalizeStateLabel(property.estado).includes("alquiler");
	const stateLabel = isRental ? "Alquiler" : "Venta";
	const cardPills = [
		property.tipo
			? { label: property.tipo, Icon: StatGridTypeIcon, stroke: "#3b82f6" }
			: null,
		property.ambientes
			? {
					label: `${property.ambientes} amb.`,
					Icon: StatGridRoomsIcon,
					stroke: "#10b981",
				}
			: null,
		property.superficie
			? {
					label: `${property.superficie} m²`,
					Icon: StatGridSurfaceIcon,
					stroke: "#f97316",
				}
			: null,
		property.garaje
			? { label: "Cochera", Icon: StatGridGarageIcon, stroke: "#a855f7" }
			: null,
		property.patio
			? { label: "Patio", Icon: StatGridAgeIcon, stroke: "#d97706" }
			: null,
	].filter(Boolean);

	return (
		<article
			className={`overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-md md:shadow-lg transition-transform hover:-translate-y-1 ${featured ? "md:col-span-2" : ""}`}
		>
			<PropertyImageCarousel
				images={images}
				propertyId={property.id_propiedad}
				propertyCity={property.ciudad}
				propertyStreet={property.calle}
				stateLabel={stateLabel}
				featured={featured}
			/>

			<Link
				to={`/propiedad/${property.id_propiedad}`}
				className="block p-3 md:p-4"
			>
				<div className="text-3xl md:text-4xl font-black text-[var(--text)]">
					{getPriceLabel(property)}
				</div>
				<h3 className="mt-2 text-base md:text-lg font-bold">
					{property.ciudad
						? `${property.ciudad}, ${property.calle} ${property.altura}`
						: property.calle}
				</h3>
				<div className="mt-3 flex flex-wrap gap-2.5 text-sm">
					{cardPills.map(({ label, Icon, stroke }) => (
						<span
							key={label}
							className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 text-[var(--muted)]"
						>
							<span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
								<Icon stroke={stroke} />
							</span>
							{label}
						</span>
					))}
				</div>
			</Link>
		</article>
	);
}

export default memo(PropertyCard);
