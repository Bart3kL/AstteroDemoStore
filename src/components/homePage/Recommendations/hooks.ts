import { useEffect, useState, useMemo, useCallback } from "react";
import { useKeenSlider, type KeenSliderOptions } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// import { useSound } from "@/lib/utils";
// import { sounds } from "@/lib/constants";

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

export const useCardSlider = () => {
	const [jsEnabled, setJsEnabled] = useState(false);

	const keenSliderOptions: KeenSliderOptions = useMemo(() => {
		return {
			initial: 0,
			loop: true,
			drag: false,
			slides: {
				spacing: 25,
				perView: 1,
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
	};
};

const animation = { duration: 350, easing: (t: number) => t };
const animationInstant = { duration: 0, easing: (t: number) => t };

export const useSlides = (
	instanceRef: any,
	setShouldFade: (v: boolean) => void,
	setArrowClick: (v: boolean) => void,
) => {
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const [currentSlideIndexBeforeEnded, setCurrentSlideIndexBeforeEnded] = useState(0);

	// const soundPack = useSound({
	// 	swipe: sounds.swipe,
	// });

	const keenSliderOptions: KeenSliderOptions = useMemo(
		() => ({
			initial: 0,
			loop: true,
			slides: {
				origin: "center",
				perView: 4,
			},
			mode: "free-snap",
			breakpoints: {
				"(min-width: 380px)": {
					slides: {
						perView: 5,
						origin: "center",
					},
				},
			},
			slideChanged({ track: { details } }) {
				setShouldFade(true);
				setCurrentSlideIndexBeforeEnded(details.rel);
			},
			animationEnded({ track: { details } }) {
				setCurrentSlideIndex(details.rel);
				setShouldFade(false);

				// soundPack.swipe.play();

				setArrowClick(false);
			},
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setShouldFade],
	);

	const [mainSliderRef, mainInstanceRef] = useKeenSlider<HTMLDivElement>(keenSliderOptions);

	useEffect(() => {
		const fixBug = fixKeenSliderBug(mainInstanceRef, keenSliderOptions);
		fixBug();
	}, [mainInstanceRef, keenSliderOptions]);

	useEffect(() => {
		if (instanceRef.current) {
			instanceRef.current.moveToIdx(currentSlideIndex, true, animationInstant);
		}
	}, [currentSlideIndex, instanceRef]);

	useEffect(() => {
		if (mainInstanceRef.current) {
			mainInstanceRef.current.moveToIdx(currentSlideIndex);
		}
	}, [currentSlideIndex, mainInstanceRef]);

	const handleSlideClick = useCallback(
		(slideIndex: number) => {
			if (!mainInstanceRef.current) return;
			const currentActiveSlide = mainInstanceRef.current.track.details.rel;
			const slideDistance = Math.abs(currentActiveSlide - slideIndex);
			const animationCount = slideDistance > 3 ? 3 : slideDistance;
			const oneSlideAnimationDuration = 80;
			const animationDuration = animationCount * oneSlideAnimationDuration;

			mainInstanceRef.current.animator.stop();
			mainInstanceRef.current.moveToIdx(slideIndex, false, {
				...animation,
				duration: animationDuration,
			});
		},
		[mainInstanceRef],
	);

	const handlePreviousSlideClick = (e: any) => {
		setArrowClick(true);
		e.stopPropagation();
		instanceRef.current?.prev();
		mainInstanceRef.current?.prev();
	};

	const handleNextSlideClick = (e: any) => {
		setArrowClick(true);
		e.stopPropagation();
		instanceRef.current?.next();
		mainInstanceRef.current?.next();
	};

	return {
		mainSliderRef,
		currentSlideIndexBeforeEnded,
		handleNextSlideClick,
		handlePreviousSlideClick,
		handleSlideClick,
	};
};
