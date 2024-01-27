import { useEffect, useState, useMemo, useCallback } from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider, type KeenSliderOptions } from "keen-slider/react";

function fixKeenSliderBug(sliderInstanceRef: any, sliderOptionsValue: KeenSliderOptions) {
	return () => {
		if (sliderInstanceRef.current) {
			sliderInstanceRef.current.update({ ...sliderOptionsValue });
		}

		return () => {
			if (sliderInstanceRef.current) {
				sliderInstanceRef.current.destroy();
			}
		};
	};
}

export const useSliderWithArrows = (actualColor: string, imagesLength: number) => {
	const [jsEnabled, setJsEnabled] = useState(false);
	const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

	const keenSliderOptions: KeenSliderOptions = useMemo(() => {
		const imagesPerView = () => {
			switch (imagesLength) {
				case 1:
					return 1;
				case 2:
					return 2;
				case 3:
					return 3;

				default:
					return 3;
			}
		};

		return {
			loop: false,
			slides: { perView: imagesPerView(), spacing: 16 },
			slideChanged({ track: { details } }) {
				setCurrentSlideIdx(details.rel);
			},
		};
	}, [imagesLength]);

	const [mainSliderRef, mainInstanceRef] = useKeenSlider<HTMLDivElement>(keenSliderOptions);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	useEffect(() => {
		const fixBug = fixKeenSliderBug(mainInstanceRef, keenSliderOptions);
		fixBug();
	}, [mainInstanceRef, keenSliderOptions, actualColor]);

	const handleSlidePrev = useCallback(() => {
		if (mainInstanceRef.current) {
			mainInstanceRef.current.prev();
		}
	}, [mainInstanceRef]);

	const handleSlideNext = useCallback(() => {
		if (mainInstanceRef.current) {
			mainInstanceRef.current.next();
		}
	}, [mainInstanceRef]);

	return {
		jsEnabled,
		mainSliderRef,
		mainInstanceRef,
		currentSlideIdx,
		handleSlidePrev,
		handleSlideNext,
	};
};

export const useModal = (images: string[]) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [currentModalImageIndex, setCurrentModalImageIndex] = useState<number>(0);
	const [autoplayEnabled, setAutoplayEnabled] = useState(false);
	const [progress, setProgress] = useState(0);

	const preparedImages = images.map((image) => ({ id: image, type: "image", src: image }));

	const autoPlayDelayinSeconds = 3;
	const currentImageIndex = currentModalImageIndex + 1;
	const mixedMediaLength = preparedImages.length;

	const handleModalOpen = (mediaId: string) => {
		setCurrentModalImageIndex(preparedImages.findIndex((element) => element.id === mediaId));
		setIsActive(true);
	};

	const handleModalClose = () => {
		setIsActive(false);
	};

	const handleNextSlide = useCallback(() => {
		if (currentModalImageIndex < mixedMediaLength - 1) {
			setCurrentModalImageIndex((prev) => prev + 1);
		}
	}, [currentModalImageIndex, mixedMediaLength]);

	const handlePreviousSlide = () => {
		if (currentModalImageIndex > 0) {
			setCurrentModalImageIndex((prev) => prev - 1);
		}
	};

	useEffect(() => {
		let autoPlayInterval: NodeJS.Timeout;
		if (autoplayEnabled) {
			autoPlayInterval = setInterval(() => {
				handleNextSlide();
				setProgress(0);
			}, autoPlayDelayinSeconds * 1000);
		}
		return () => clearInterval(autoPlayInterval);
	}, [
		autoplayEnabled,
		autoPlayDelayinSeconds,
		mixedMediaLength,
		currentImageIndex,
		handleNextSlide,
	]);

	useEffect(() => {
		if (currentImageIndex === mixedMediaLength) setAutoplayEnabled(false);
	}, [currentImageIndex, mixedMediaLength]);

	const handleAutoplayEnable = () => {
		if (currentImageIndex >= mixedMediaLength) {
			setCurrentModalImageIndex(0);
		}
		setAutoplayEnabled(true);
	};

	const handleAutoplayDisable = () => {
		setAutoplayEnabled(false);
		setProgress(0);
	};

	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (autoplayEnabled) {
			intervalId = setInterval(
				() => {
					setProgress((progress) => {
						if (progress >= 100) {
							return 0;
						}
						return progress + 0.5;
					});
				},
				(autoPlayDelayinSeconds * 1000) / 200,
			);
		}
		return () => clearInterval(intervalId);
	}, [autoplayEnabled, autoPlayDelayinSeconds, mixedMediaLength]);

	return {
		isActive,
		handleModalOpen,
		preparedImages,
		modalProps: {
			autoplayEnabled,
			progress,
			currentImageIndex,
			mixedMediaLength,
			handleModalClose,
			currentModalImageIndex,
			handleNextSlide,
			handlePreviousSlide,
			handleAutoplayEnable,
			handleAutoplayDisable,
		},
	};
};
