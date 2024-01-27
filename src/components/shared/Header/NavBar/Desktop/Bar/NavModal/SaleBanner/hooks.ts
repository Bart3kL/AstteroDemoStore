import { useCallback } from "react";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export const useSliderWithArrows = () => {
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		loop: true,
		slides: {
			spacing: 15,
			perView: 2,
		},
	});

	const handleSlidePrev = useCallback(() => {
		if (instanceRef.current) {
			instanceRef.current.prev();
		}
	}, [instanceRef]);

	const handleSlideNext = useCallback(() => {
		if (instanceRef.current) {
			instanceRef.current.next();
		}
	}, [instanceRef]);

	return {
		sliderRef,

		handleSlidePrev,
		handleSlideNext,
	};
};
