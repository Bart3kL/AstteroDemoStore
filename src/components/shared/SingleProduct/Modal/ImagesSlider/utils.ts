import type { CarouselOptions, CarouselRef } from "./types";

export function fixKeenSliderBug(
	sliderInstanceRef: CarouselRef,
	sliderOptionsValue: CarouselOptions,
) {
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
