import { useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../lib/mockData";

export default function PropertyImageCarousel({
	images = [],
	propertyId,
	propertyCity,
	propertyStreet,
	stateLabel,
	featured = false,
}) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const displayedImage = images[currentIndex]
		? getImageUrl(images[currentIndex])
		: null;

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="relative aspect-[4/3] w-full overflow-hidden">
			<Link
				to={`/propiedad/${propertyId}`}
				aria-label={`Ver propiedad en ${propertyCity}, ${propertyStreet}`}
				className="block h-full w-full"
			>
				{displayedImage ? (
					<img
						src={displayedImage}
						alt={`Propiedad en ${propertyCity}`}
						width={800}
						height={600}
						className="h-full w-full object-cover"
					/>
				) : (
					<div className="flex h-full items-center justify-center bg-gray-100 text-muted">
						Sin imagen
					</div>
				)}
			</Link>

			{/* Badge Estado */}
			<span className="absolute right-2 md:right-3 top-2 md:top-3 rounded-full bg-[var(--surface)] px-2 md:px-3 py-1 text-xs font-bold uppercase text-[var(--accent)]">
				{stateLabel}
			</span>

			{/* Mostrar controles solo si hay múltiples imágenes */}
			{images.length > 1 && (
				<>
					{/* Flechas navegación */}
					<button
						onClick={handlePrev}
						className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/75 md:bg-white/80 p-1.5 md:p-2 text-[var(--text)] transition hover:bg-white"
						aria-label="Imagen anterior"
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button
						onClick={handleNext}
						className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/75 md:bg-white/80 p-1.5 md:p-2 text-[var(--text)] transition hover:bg-white"
						aria-label="Siguiente imagen"
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M9 5l7 7-7 7" />
						</svg>
					</button>

					{/* Dots indicadores */}
					<div className="absolute bottom-2 md:bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
						{images.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`h-1.5 md:h-2 w-1.5 md:w-2 rounded-full transition ${
									index === currentIndex
										? "bg-white"
										: "bg-white/50 hover:bg-white/75"
								}`}
								aria-label={`Ir a imagen ${index + 1}`}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
