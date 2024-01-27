import { useCallback, useState, useEffect, useMemo } from "react";

import { useKeenSlider, type KeenSliderOptions } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export const useSliderWithBlockingArrows = (
	searchedProducts?: any,
	perViewAuto?: boolean,
	loop?: boolean,
) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const keenSliderOptions: KeenSliderOptions = useMemo(() => {
		return {
			initial: 0,
			loop: loop ? true : false,
			mode: loop ? "free-snap" : "snap",
			slides: {
				spacing: 15,
				perView: perViewAuto ? "auto" : 2,
			},
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
		};
	}, [perViewAuto, loop]);

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(keenSliderOptions);

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

	useEffect(() => {
		if (instanceRef.current) {
			instanceRef.current.update({ ...keenSliderOptions });
		}
	}, [searchedProducts, instanceRef, keenSliderOptions]);

	return {
		sliderRef,
		currentSlide,
		instanceRef,
		handleSlidePrev,
		handleSlideNext,
	};
};
