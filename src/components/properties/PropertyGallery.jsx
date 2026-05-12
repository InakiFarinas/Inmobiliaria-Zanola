import { useEffect, useState } from "react";
import Card from "../ui/Card";

export default function PropertyGallery({ images = [], title = "Propiedad" }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const shellClassName =
		"grid gap-4 rounded-[28px] border border-[color:var(--line)] bg-[var(--surface)] p-0 shadow-[var(--shadow)] backdrop-blur-[18px]";

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
		<Card className="grid gap-4" padding="none">
			<div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-3">
				{hasMultipleImages ? (
					<button
						type="button"
						className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-3xl leading-none text-[var(--text)] shadow"
						onClick={previousImage}
						aria-label="Imagen anterior"
					>
						‹
					</button>
				) : (
					<span />
				)}

				<img
					className="h-[min(68vh,560px)] w-full rounded-[22px] object-cover"
					src={currentImage}
					alt={`${title} - imagen ${currentIndex + 1}`}
				/>

				{hasMultipleImages ? (
					<button
						type="button"
						className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-3xl leading-none text-[var(--text)] shadow"
						onClick={nextImage}
						aria-label="Imagen siguiente"
					>
						›
					</button>
				) : (
					<span />
				)}
			</div>

			{hasMultipleImages ? (
				<div className="grid grid-cols-[repeat(auto-fit,minmax(84px,1fr))] gap-2.5">
					{images.map((image, index) => (
						<button
							key={image + index}
							type="button"
							className={`overflow-hidden rounded-[14px] p-0 transition-opacity duration-200 ${index === currentIndex ? "opacity-100 outline-2 outline-[var(--accent)] outline-offset-2" : "opacity-75"}`}
							onClick={() => setCurrentIndex(index)}
							aria-label={`Ver imagen ${index + 1}`}
						>
							<img
								src={image}
								alt={`${title} miniatura ${index + 1}`}
								className="aspect-square w-full object-cover"
							/>
						</button>
					))}
				</div>
			) : null}
		</Card>
	);
}
