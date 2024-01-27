import type { KeenSliderInstance, KeenSliderOptions } from "keen-slider/react";

export interface Image {
	src: string;
	alt: string | "";
}

export interface HeroCarouselProps {
	images: string[];
	currentImageIndex: number;
	setCurrentImageIndex?: (index: number) => void;
	actualColor: string;
}

export type CarouselRef = any;
export type CarouselInstance = KeenSliderInstance;
export type CarouselOptsSetter = (opts: KeenSliderOptions) => void;
export type CarouselOptions = KeenSliderOptions;

export interface ImagesSliderProps {
	images: string[];
	actualColor: string;
}
