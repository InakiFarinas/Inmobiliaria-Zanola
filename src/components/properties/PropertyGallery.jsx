import { useEffect, useState, useCallback, useMemo } from "react";
import Card from "../ui/Card";
import { getImageUrl, getImageUrls } from "../../lib/utils";

export default function PropertyGallery({ images = [], title = "Propiedad" }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [incomingIndex, setIncomingIndex] = useState(null);
	const [slideDirection, setSlideDirection] = useState("next");
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		setCurrentIndex(0);
		setIncomingIndex(null);
		setIsAnimating(false);
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

	const currentImageUrls = useMemo(
		() => (images[currentIndex] ? getImageUrls(images[currentIndex]) : null),
		[images, currentIndex],
	);

	const incomingImageUrls = useMemo(
		() =>
			incomingIndex !== null && images[incomingIndex]
				? getImageUrls(images[incomingIndex])
				: null,
		[images, incomingIndex],
	);

	const hasMultipleImages = images.length > 1;

	const moveToIndex = useCallback(
		(nextIndex, direction) => {
			setIsAnimating((isAnim) => {
				if (!hasMultipleImages || nextIndex === currentIndex || isAnim)
					return isAnim;
				setSlideDirection(direction);
				setIsAnimating(false);
				setIncomingIndex(nextIndex);
				requestAnimationFrame(() => setIsAnimating(true));
				return false;
			});
		},
		[hasMultipleImages, currentIndex],
	);

	const previousImage = useCallback(() => {
		const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
		moveToIndex(nextIndex, "prev");
	}, [currentIndex, images.length, moveToIndex]);

	const nextImage = useCallback(() => {
		const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
		moveToIndex(nextIndex, "next");
	}, [currentIndex, images.length, moveToIndex]);

	const handleIncomingTransitionEnd = useCallback(() => {
		if (incomingIndex === null) return;
		setCurrentIndex(incomingIndex);
		setIncomingIndex(null);
		setIsAnimating(false);
	}, [incomingIndex]);

	const currentLayerClassName = [
		"absolute inset-0 h-full w-full object-cover",
	].join(" ");

	const incomingLayerClassName = [
		"absolute inset-0 h-full w-full object-cover transform-gpu transition-transform duration-220 ease-linear",
		isAnimating
			? "translate-x-0"
			: slideDirection === "next"
				? "translate-x-[115%]"
				: "-translate-x-[115%]",
	].join(" ");

	return (
		<Card className="grid gap-3 overflow-hidden" padding="none">
			<div className="relative overflow-hidden rounded-[28px] bg-[var(--surface)]">
				<div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--accent-soft)]">
					{currentImageUrls ? (
						<>
							<picture>
								<source srcSet={currentImageUrls.webp} type="image/webp" />
								<img
									src={currentImageUrls.fallback}
									alt={`${title} - imagen ${currentIndex + 1}`}
									width="1200"
									height="900"
									className={currentLayerClassName}
									decoding="async"
								/>
							</picture>
							{incomingImageUrls ? (
								<picture>
									<source srcSet={incomingImageUrls.webp} type="image/webp" />
									<img
										src={incomingImageUrls.fallback}
										alt={`${title} - imagen ${incomingIndex + 1}`}
										width="1200"
										height="900"
										className={incomingLayerClassName}
										decoding="async"
										onTransitionEnd={handleIncomingTransitionEnd}
									/>
								</picture>
							) : null}
						</>
					) : (
						<div className="flex h-full items-center justify-center bg-gray-100 text-muted">
							Sin imagen
						</div>
					)}

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
				<div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-3">
					{images.map((image, index) => (
						<button
							key={image + index}
							type="button"
							className={`overflow-hidden rounded-[14px] border-2 p-0 transition duration-200 ${
								index === currentIndex
									? "border-[color:var(--accent)] opacity-100"
									: "border-transparent opacity-70 hover:opacity-100"
							}`}
							onClick={() => {
								const direction = index > currentIndex ? "next" : "prev";
								moveToIndex(index, direction);
							}}
							aria-label={`Ver imagen ${index + 1}`}
						>
							<picture>
								<source srcSet={getImageUrls(image).webp} type="image/webp" />
								<img
									src={getImageUrls(image).fallback}
									alt={`${title} miniatura ${index + 1}`}
									width="400"
									height="300"
									className="aspect-[4/3] w-full object-cover"
									loading="lazy"
									decoding="async"
								/>
							</picture>
						</button>
					))}
				</div>
			) : null}
		</Card>
	);
}
