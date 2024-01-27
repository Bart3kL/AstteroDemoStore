import type { KeenSliderInstance } from "keen-slider/react";
export interface SliderNavProps {
	mainInstanceRef: KeenSliderInstance | any;
	currentSlideIdx: number;
	slidesLength: number;
	handleNextSlide: () => void;
	handleBackSlide: () => void;
}
