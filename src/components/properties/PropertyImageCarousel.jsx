import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { getImageUrl, getImageUrls } from "../../lib/utils";

export default function PropertyImageCarousel({
	images = [],
	propertyId,
	propertyCity,
	propertyStreet,
	stateLabel,
}) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [incomingIndex, setIncomingIndex] = useState(null);
	const [slideDirection, setSlideDirection] = useState("next");
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		setCurrentIndex(0);
		setIncomingIndex(null);
		setIsAnimating(false);
	}, [images]);

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

	const moveToIndex = useCallback(
		(nextIndex, direction) => {
			setIsAnimating((isAnim) => {
				if (!images.length || nextIndex === currentIndex || isAnim)
					return isAnim;
				setSlideDirection(direction);
				setIsAnimating(false);
				setIncomingIndex(nextIndex);
				requestAnimationFrame(() => setIsAnimating(true));
				return false;
			});
		},
		[images.length, currentIndex],
	);

	const goPrev = useCallback(() => {
		const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
		moveToIndex(nextIndex, "prev");
	}, [currentIndex, images.length, moveToIndex]);

	const goNext = useCallback(() => {
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
		<div className="relative aspect-[4/3] w-full overflow-hidden">
			<Link
				to={`/propiedad/${propertyId}`}
				aria-label={`Ver propiedad en ${propertyCity}, ${propertyStreet}`}
				className="absolute inset-0 block h-full w-full"
			>
				{currentImageUrls ? (
					<>
						<picture>
							<source srcSet={currentImageUrls.webp} type="image/webp" />
							<img
								src={currentImageUrls.fallback}
								alt={`Propiedad en ${propertyCity}`}
								width={800}
								height={600}
								className={currentLayerClassName}
								decoding="async"
							/>
						</picture>
						{incomingImageUrls ? (
							<picture>
								<source srcSet={incomingImageUrls.webp} type="image/webp" />
								<img
									src={incomingImageUrls.fallback}
									alt={`Propiedad en ${propertyCity}`}
									width={800}
									height={600}
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
			</Link>

			<span className="absolute right-2 top-2 rounded-full bg-[var(--surface)] px-2 py-1 text-xs font-bold uppercase text-[var(--accent)] md:right-3 md:top-3 md:px-3">
				{stateLabel}
			</span>

			{images.length > 1 ? (
				<>
					<button
						type="button"
						onClick={goPrev}
						className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/75 p-1.5 text-[var(--text)] transition hover:bg-white md:left-2 md:bg-white/80 md:p-2"
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
						type="button"
						onClick={goNext}
						className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/75 p-1.5 text-[var(--text)] transition hover:bg-white md:right-2 md:bg-white/80 md:p-2"
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

					<div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1 md:bottom-3">
						{images.map((_, index) => (
							<button
								key={index}
								type="button"
								onClick={() => {
									const direction = index > currentIndex ? "next" : "prev";
									moveToIndex(index, direction);
								}}
								className={`h-1.5 w-1.5 rounded-full transition md:h-2 md:w-2 ${
									index === currentIndex
										? "bg-white"
										: "bg-white/50 hover:bg-white/75"
								}`}
								aria-label={`Ir a imagen ${index + 1}`}
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	);
}
