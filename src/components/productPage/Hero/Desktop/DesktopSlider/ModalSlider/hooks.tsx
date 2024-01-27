import { useState, useEffect, useRef, useCallback } from "react";

export const useZoomModal = (currentModalImageIndex: number, handleModalClose: any) => {
	const zoomedImageWidth = 2048;
	const zoomedImageHeight = 2048;

	const [isZoomed, setIsZoomed] = useState(false);
	const [isPanning, setPanning] = useState(false);
	const [positionChanged, setPositionChanged] = useState(false);

	const innerWidth = typeof window !== "undefined" ? window.innerWidth : 0;
	const innerHeight = typeof window !== "undefined" ? window.innerHeight : 0;

	const [position, setPosition] = useState({
		prevMouseX: 0,
		prevMouseY: 0,
		translateX: -(zoomedImageWidth - innerWidth) / 2,
		translateY: -(zoomedImageHeight - innerHeight) / 2,
	});

	const handleToggleZoom = () => {
		setIsZoomed((prev) => !prev);
	};
	const handleEnableZoom = () => {
		setIsZoomed(true);
	};

	useEffect(() => {
		if (isZoomed) {
			setIsZoomed(false);
		}
	}, [currentModalImageIndex, isZoomed]);

	const handleImageClick = (e: any, index: number) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const translateX = Math.round(((e.clientX - rect.x) / rect.width) * 100);
		const translateY = Math.round((e.clientY / rect.height) * 100);

		const childImg: any = document.querySelector(`.img-${index}`);

		if (!childImg) {
			handleEnableZoom();
			return;
		}
		childImg.classList.remove("scaleImg");
		childImg.style.transformOrigin = `${translateX}% ${translateY}%`;
		if (!isZoomed) {
			childImg.classList.add("scaleImg");
		}

		handleEnableZoom();
	};

	const containerRef = useRef<HTMLImageElement>(null);

	const handleMouseDown = (event: any) => {
		if (!isZoomed) return;
		event.preventDefault();
		setPanning(true);
		setPositionChanged(false);
		setPosition({
			...position,
			prevMouseX: event.clientX,
			prevMouseY: event.clientY,
		});
	};

	const handleMouseUp = () => {
		if (!isZoomed) return;
		setPanning(false);
		if (!positionChanged) {
			setIsZoomed(false);
		}
	};

	const handleMouseMove = (event: any) => {
		if (!isZoomed) return;
		if (isPanning) {
			setPosition({
				...position,
				translateX: position.translateX + event.clientX - position.prevMouseX,
				translateY: position.translateY + event.clientY - position.prevMouseY,
				prevMouseX: event.clientX,
				prevMouseY: event.clientY,
			});
			setPositionChanged(true);
		}
	};

	const onPressEscape = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsZoomed(false);
				handleModalClose();
			}
		},
		[handleModalClose],
	);

	useEffect(() => {
		if (position.translateX > 0) {
			setPosition((prev) => ({ ...prev, translateX: 0 }));
		}
		if (position.translateY > 0) {
			setPosition((prev) => ({ ...prev, translateY: 0 }));
		}
		if (position.translateX < -(zoomedImageWidth - innerWidth)) {
			setPosition((prev) => ({
				...prev,
				translateX: -(zoomedImageWidth - innerWidth),
			}));
		}
		if (position.translateY < -(zoomedImageHeight - innerHeight)) {
			setPosition((prev) => ({
				...prev,
				translateY: -(zoomedImageHeight - innerHeight),
			}));
		}
	}, [innerHeight, innerWidth, isPanning, isZoomed, position.translateX, position.translateY]);

	useEffect(() => {
		window.addEventListener("keydown", onPressEscape);
		return () => {
			window.removeEventListener("keydown", onPressEscape);
		};
	}, [onPressEscape]);

	return {
		handleImageClick,
		isZoomed,
		handleToggleZoom,
		zoomedModalProps: {
			isPanning,
			position,
			containerRef,
			handleMouseDown,
			handleMouseUp,
			handleMouseMove,
		},
	};
};
