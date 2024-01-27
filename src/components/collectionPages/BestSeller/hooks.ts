import { useEffect, useState, useMemo } from "react";

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

export const useSliderWithDots = (actualColor: string) => {
	const [jsEnabled, setJsEnabled] = useState(false);
	const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

	const keenSliderOptions: KeenSliderOptions = useMemo(() => {
		return {
			loop: true,
			slides: { perView: 1 },
			slideChanged({ track: { details } }) {
				setCurrentSlideIdx(details.rel);
			},
		};
	}, []);

	const [mainSliderRef, mainInstanceRef] = useKeenSlider<HTMLDivElement>(keenSliderOptions);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	useEffect(() => {
		const fixBug = fixKeenSliderBug(mainInstanceRef, keenSliderOptions);
		fixBug();
	}, [mainInstanceRef, keenSliderOptions, actualColor]);

	const handlePreviousSlideClick = () => {
		mainInstanceRef.current?.prev();
	};

	const handleNextSlideClick = () => {
		mainInstanceRef.current?.next();
	};

	return {
		handleNextSlideClick,
		handlePreviousSlideClick,
		jsEnabled,
		mainSliderRef,
		mainInstanceRef,
		currentSlideIdx,
	};
};
