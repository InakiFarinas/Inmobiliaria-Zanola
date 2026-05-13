import { useEffect, useState } from "react";
import Card from "../ui/Card";
import { getImageUrl } from "../../lib/mockData";

export default function PropertyGallery({ images = [], title = "Propiedad" }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		setCurrentIndex(0);
	}, [images]);

	if (!images.length) {
		return (
			<Card
				className="grid min-h-[240px] place-items-center gap-4"
				padding="md"
			>
				<p className="m-0 rounded-[28px] border border-[color:var(--line)] bg-[var(--surface)] px-5 py-3 text-center leading-[1.6] text-[var(--muted)] shadow-[var(--shadow)] backdrop-blur-[18px]">
					No hay imágenes disponibles.
				</p>
			</Card>
		);
	}

	const currentImage = images[currentIndex] || images[0];
	const hasMultipleImages = images.length > 1;

	const previousImage = () => {
		setCurrentIndex((index) => (index - 1 + images.length) % images.length);
	};

	const nextImage = () => {
		setCurrentIndex((index) => (index + 1) % images.length);
	};

	return (
		<Card className="grid gap-3 overflow-hidden" padding="none">
			<div className="relative overflow-hidden rounded-[28px] bg-[var(--surface)]">
				<div className="relative aspect-[4/3] w-full bg-[color:var(--accent-soft)]">
					{hasMultipleImages ? (
						<button
							type="button"
							className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[var(--text)] shadow-[0_8px_22px_rgba(26,26,26,0.16)] transition hover:bg-white"
							onClick={previousImage}
							aria-label="Imagen anterior"
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.4"
							>
								<path d="M15 19l-7-7 7-7" />
							</svg>
						</button>
					) : null}

					<img
						className="h-full w-full object-cover"
						src={getImageUrl(currentImage)}
						alt={`${title} - imagen ${currentIndex + 1}`}
						width="1200"
						height="900"
					/>

					{hasMultipleImages ? (
						<button
							type="button"
							className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[var(--text)] shadow-[0_8px_22px_rgba(26,26,26,0.16)] transition hover:bg-white"
							onClick={nextImage}
							aria-label="Imagen siguiente"
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.4"
							>
								<path d="M9 5l7 7-7 7" />
							</svg>
						</button>
					) : null}

					{hasMultipleImages ? (
						<div className="absolute bottom-3 right-3 rounded-full bg-[rgba(26,26,26,0.82)] px-3 py-1 text-xs font-bold text-white shadow-[0_8px_22px_rgba(26,26,26,0.22)]">
							{currentIndex + 1} / {images.length}
						</div>
					) : null}
				</div>
			</div>

			{hasMultipleImages ? (
				<div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
					{images.map((image, index) => (
						<button
							key={image + index}
							type="button"
							className={`overflow-hidden rounded-[14px] border-2 p-0 transition duration-200 ${index === currentIndex ? "border-[color:var(--accent)] opacity-100" : "border-transparent opacity-70 hover:opacity-100"}`}
							onClick={() => setCurrentIndex(index)}
							aria-label={`Ver imagen ${index + 1}`}
						>
							<img
								src={getImageUrl(image)}
								alt={`${title} miniatura ${index + 1}`}
								width="400"
								height="300"
								className="aspect-[4/3] w-full object-cover"
							/>
						</button>
					))}
				</div>
			) : null}
		</Card>
	);
}
