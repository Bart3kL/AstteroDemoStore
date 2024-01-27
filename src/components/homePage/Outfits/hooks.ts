import { useCallback } from "react";

import { useKeenSlider, type KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const carousel: KeenSliderPlugin = (slider) => {
	const z = 220;
	function rotate() {
		const deg = 360 * slider.track.details.progress;
		slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
	}
	slider.on("created", () => {
		const deg = 360 / slider.slides.length;
		slider.slides.forEach((element, idx) => {
			element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
		});
		rotate();
	});
	slider.on("detailsChanged", rotate);
};
export const useMiscellaneousSlider = () => {
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
			selector: ".carousel__cell",
			renderMode: "custom",
			mode: "free-snap",
		},
		[carousel],
	);
	const handleSlideClickMobile = useCallback(
		(slideIndex: number) => {
			if (!instanceRef.current) return;

			instanceRef.current.moveToIdx(slideIndex);
		},
		[instanceRef],
	);

	return {
		sliderRef,
		handleSlideClickMobile,
	};
};
const carouselDesktop: KeenSliderPlugin = (slider) => {
	const z = 360;
	function rotate() {
		const deg = 360 * slider.track.details.progress;
		slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
	}
	slider.on("created", () => {
		const deg = 360 / slider.slides.length;
		slider.slides.forEach((element, idx) => {
			element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
		});
		rotate();
	});
	slider.on("detailsChanged", rotate);
};

export const useMiscellaneousSliderDesktop = () => {
	const [sliderRefDesktop, instanceRefDesktop] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
			selector: ".carousel__cell",
			renderMode: "custom",
			mode: "free-snap",
		},
		[carouselDesktop],
	);

	const handleSlideClick = useCallback(
		(slideIndex: number) => {
			if (!instanceRefDesktop.current) return;

			instanceRefDesktop.current.moveToIdx(slideIndex);
		},
		[instanceRefDesktop],
	);

	return {
		sliderRefDesktop,
		handleSlideClick,
	};
};
