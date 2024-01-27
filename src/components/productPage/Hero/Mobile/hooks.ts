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

export const useVerticalSlider = (actualColor: string, setCurrentSlideIdx: (v: number) => void) => {
	const [jsEnabled, setJsEnabled] = useState(false);

	const keenSliderOptions: KeenSliderOptions = useMemo(() => {
		return {
			loop: false,
			slides: { perView: 1 },
			vertical: true,
			slideChanged({ track: { details } }) {
				setCurrentSlideIdx(details.rel);
			},
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [mainSliderRef, mainInstanceRef] = useKeenSlider<HTMLDivElement>(keenSliderOptions);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	useEffect(() => {
		const fixBug = fixKeenSliderBug(mainInstanceRef, keenSliderOptions);
		fixBug();
	}, [mainInstanceRef, keenSliderOptions, actualColor]);

	return {
		jsEnabled,
		mainSliderRef,
		mainInstanceRef,
	};
};
