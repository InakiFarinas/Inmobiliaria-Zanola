import { useState } from "react";
import { getImageSrc } from "../lib/utils";

export default function PropertyGallery({ images, title }) {
	const safeImages = Array.isArray(images) ? images : [];
	const [activeIndex, setActiveIndex] = useState(0);
	const activeImage = safeImages[activeIndex] || safeImages[0];

	if (safeImages.length === 0) {
		return (
			<div className="property-gallery empty">Sin imágenes disponibles</div>
		);
	}

	return (
		<section className="property-gallery">
			<div className="property-gallery-main">
				<button
					type="button"
					className="gallery-arrow"
					aria-label="Imagen anterior"
					onClick={() =>
						setActiveIndex(
							(index) => (index - 1 + safeImages.length) % safeImages.length,
						)
					}
				>
					‹
				</button>
				<img
					src={getImageSrc(activeImage)}
					alt={title}
					className="gallery-image"
				/>
				<button
					type="button"
					className="gallery-arrow"
					aria-label="Siguiente imagen"
					onClick={() =>
						setActiveIndex((index) => (index + 1) % safeImages.length)
					}
				>
					›
				</button>
			</div>

			<div className="property-gallery-thumbs">
				{safeImages.map((image, index) => (
					<button
						type="button"
						key={image}
						className={`thumb ${index === activeIndex ? "active" : ""}`}
						onClick={() => setActiveIndex(index)}
					>
						<img src={getImageSrc(image)} alt={`${title} ${index + 1}`} />
					</button>
				))}
			</div>
		</section>
	);
}
