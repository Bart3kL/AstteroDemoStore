import { useEffect, useState, useMemo } from "react";

import { useKeenSlider, type KeenSliderOptions } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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

const animationInstant = { duration: 0, easing: (t: number) => t };

export const useSliderWithDots = (activeGroup: string) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [jsEnabled, setJsEnabled] = useState(false);

	const keenSliderOptions: KeenSliderOptions = useMemo(() => {
		return {
			initial: 0,
			loop: true,
			slides: {
				spacing: 15,
				perView: 1,
			},
			breakpoints: {
				"(min-width: 480px)": {
					slides: {
						perView: 2,
						spacing: 10,
					},
				},
				"(min-width: 768px)": {
					slides: {
						perView: 3,
						spacing: 10,
					},
				},
				"(min-width: 1024px)": {
					slides: {
						perView: 4,
						spacing: 20,
					},
				},
			},
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
		};
	}, []);

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(keenSliderOptions);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	useEffect(() => {
		const fixBug = fixKeenSliderBug(instanceRef, keenSliderOptions);
		fixBug();
	}, [instanceRef, activeGroup, keenSliderOptions]);

	useEffect(() => {
		if (instanceRef.current) {
			instanceRef.current.moveToIdx(0, true, animationInstant);
		}
	}, [instanceRef, activeGroup]);

	return {
		sliderRef,
		currentSlide,
		instanceRef,
		jsEnabled,
	};
};
