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

export const useSlider = () => {
	const [jsEnabled, setJsEnabled] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);

	const keenSliderOptions: KeenSliderOptions = useMemo(() => {
		return {
			initial: 0,
			loop: true,

			slides: {
				spacing: 25,
				perView: 1,
				origin: "center",
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
	}, [instanceRef, keenSliderOptions]);

	return {
		sliderRef,
		instanceRef,
		jsEnabled,
		currentSlide,
	};
};
