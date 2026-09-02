import { memo } from "react";
import { Link } from "react-router-dom";
import PropertyImageCarousel from "./PropertyImageCarousel";
import WaxSeal from "../icons/WaxSeal";
import { formatAddress, formatFolio, formatPrice } from "../../lib/utils";
import {
	StatGridGarageIcon,
	StatGridRoomsIcon,
	StatGridSurfaceIcon,
	StatGridTypeIcon,
} from "../ui/StatGridIcons";

function normalizeStateLabel(value) {
	return String(value || "")
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase();
}

function PropertyCard({ property, featured = false }) {
	const images = property.imagenes || [];
	const isRental = normalizeStateLabel(property.estado).includes("alquiler");
	const stateLabel = isRental ? "Alquiler" : "Venta";
	const cardPills = [
		property.tipo
			? { label: property.tipo, Icon: StatGridTypeIcon }
			: null,
		property.ambientes
			? { label: `${property.ambientes} amb.`, Icon: StatGridRoomsIcon }
			: null,
		property.superficie
			? { label: `${property.superficie} m²`, Icon: StatGridSurfaceIcon }
			: null,
		property.garaje ? { label: "Cochera", Icon: StatGridGarageIcon } : null,
	].filter(Boolean);

	return (
		<article
			className={`overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--line)] bg-[var(--surface)] [box-shadow:var(--shadow)] transition-transform hover:-translate-y-1 ${featured ? "md:col-span-2" : ""}`}
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
				className="block border-t border-[color:var(--line)] p-3 md:p-4"
			>
				<div className="flex items-start justify-between gap-2">
					<span className="tabular font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)]">
						{formatFolio(property.id_propiedad)}
					</span>
					{property.destacada ? <WaxSeal size={26} /> : null}
				</div>
				<div className="tabular mt-1 font-serif text-2xl md:text-[1.9rem] font-medium text-[var(--text)]">
					{formatPrice(property)}
				</div>
				<h3 className="mt-1 text-[0.95rem] font-semibold text-[var(--muted)]">
					{formatAddress(property)}
				</h3>
				<div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-dashed border-[color:var(--line)] pt-2.5 text-sm text-[var(--muted)]">
					{cardPills.map(({ label, Icon }) => (
						<span key={label} className="inline-flex items-center gap-1.5">
							<span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
								<Icon />
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
