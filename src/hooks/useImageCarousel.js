import { useEffect, useState, useCallback } from "react";

// Estado y navegación compartidos por PropertyGallery y PropertyImageCarousel.
export function useImageCarousel(images) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [incomingIndex, setIncomingIndex] = useState(null);
	const [slideDirection, setSlideDirection] = useState("next");
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		setCurrentIndex(0);
		setIncomingIndex(null);
		setIsAnimating(false);
	}, [images]);

	const moveToIndex = useCallback(
		(nextIndex, direction) => {
			setIsAnimating((isAnim) => {
				if (!images.length || nextIndex === currentIndex || isAnim)
					return isAnim;
				setSlideDirection(direction);
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

	return {
		currentIndex,
		incomingIndex,
		slideDirection,
		isAnimating,
		moveToIndex,
		goPrev,
		goNext,
		handleIncomingTransitionEnd,
	};
}
