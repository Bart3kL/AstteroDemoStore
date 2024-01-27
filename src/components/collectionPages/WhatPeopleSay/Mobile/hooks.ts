import { useEffect, useState, useMemo } from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider, type KeenSliderOptions } from "keen-slider/react";

export const useSliderWithDots = () => {
	const [jsEnabled, setJsEnabled] = useState(false);
	const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

	const keenSliderOptions: KeenSliderOptions = useMemo(() => {
		return {
			loop: true,
			slides: { perView: 1, spacing: 25 },
			slideChanged({ track: { details } }) {
				setCurrentSlideIdx(details.rel);
			},
		};
	}, []);

	const [mainSliderRef, mainInstanceRef] = useKeenSlider<HTMLDivElement>(keenSliderOptions);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	return {
		jsEnabled,
		mainSliderRef,
		mainInstanceRef,
		currentSlideIdx,
	};
};
