import { useEffect, useState } from "react";

import "keen-slider/keen-slider.min.css";
import { type KeenSliderInstance, useKeenSlider } from "keen-slider/react";

function SlideChangeIntervalPlugin(intervalInSeconds: number) {
	return (slider: KeenSliderInstance) => {
		let timeout: ReturnType<typeof setTimeout>;
		function clearNextTimeout() {
			clearTimeout(timeout);
		}
		function nextTimeout() {
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				slider.next();
			}, intervalInSeconds * 1000);
		}
		slider.on("created", nextTimeout);
		slider.on("dragStarted", clearNextTimeout);
		slider.on("dragEnded", clearNextTimeout);
		slider.on("animationEnded", nextTimeout);
		slider.on("updated", nextTimeout);
	};
}

export const useAutoplaySlider = ({
	intervalInSeconds,
	allowDrag,
}: {
	intervalInSeconds: number;
	allowDrag: boolean;
}) => {
	const [jsEnabled, setJsEnabled] = useState(false);
	const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

	const [mainSliderRef, mainInstanceRef] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
			drag: allowDrag,
			slides: { perView: 1 },
			slideChanged({ track: { details } }) {
				setCurrentSlideIdx(details.rel);
			},
		},
		[SlideChangeIntervalPlugin(intervalInSeconds)],
	);

	const handleNextSlide = () => {
		if (!mainInstanceRef.current) return;
		mainInstanceRef.current?.next();
	};

	const handleBackSlide = () => {
		if (!mainInstanceRef.current) return;
		mainInstanceRef.current?.prev();
	};

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	return {
		jsEnabled,
		mainSliderRef,
		mainInstanceRef,
		handleNextSlide,
		handleBackSlide,
		currentSlideIdx,
	};
};
