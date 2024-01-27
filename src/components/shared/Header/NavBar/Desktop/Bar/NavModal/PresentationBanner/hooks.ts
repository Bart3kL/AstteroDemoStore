import { useEffect, useState } from "react";

import { useKeenSlider, type KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export const useSliderWithDots = () => {
	const [slider, setSlider] = useState<KeenSliderInstance>();
	const [currentSlide, setCurrentSlide] = useState(0);

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		loop: true,
		slides: {
			spacing: 15,
			perView: 4,
		},
		created(slider) {
			setSlider({ ...slider });
		},
		slideChanged(slider) {
			setSlider({ ...slider });
			setCurrentSlide(slider.track.details.rel);
		},
	});

	useEffect(() => {
		const interval = setInterval(() => {
			slider?.moveToIdx(currentSlide + 1);
		}, 3000);
		return () => clearInterval(interval);
	});
	return {
		sliderRef,

		currentSlide,
		instanceRef,
	};
};
