import { useEffect, useState, useCallback, useMemo } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import type { HeroCarouselProps, CarouselOptions } from "./types";
import { fixKeenSliderBug } from "./utils";

const specificAmountOfSlidesPerViewInThumbnailSlider = 7;

export const useCarousel = ({
	images,
	currentImageIndex,
	setCurrentImageIndex,
	actualColor,
}: HeroCarouselProps) => {
	const [jsEnabled, setJsEnabled] = useState(false);

	const initialCarouselOptions: CarouselOptions = {
		initial: 0,
		loop: false,
	};
	const initialCarouselThumbOptions: CarouselOptions = {
		initial: 0,
		loop: false,
		slides: {
			perView: 4,
			spacing: 5,
		},
	};
	const defaultMainCarouselOptions: CarouselOptions = useMemo(
		() => ({
			initial: 0,
			loop: false,
		}),
		[],
	);

	const defaultThumbCarouselOptions = useMemo(
		() => ({
			initial: 0,
			loop: false,
			slides: {
				perView: 4,
				spacing: 5,
			},
		}),
		[],
	);

	const [mainSliderRef, mainInstanceRef] = useKeenSlider<HTMLDivElement>(initialCarouselOptions);
	const [thumbnailSliderRef, thumbInstanceRef] = useKeenSlider<HTMLDivElement>(
		initialCarouselThumbOptions,
	);

	useEffect(() => {
		const fixBug = fixKeenSliderBug(mainInstanceRef, defaultMainCarouselOptions);

		fixBug();
	}, [defaultMainCarouselOptions, mainInstanceRef, actualColor]);

	useEffect(() => {
		const fixBug = fixKeenSliderBug(thumbInstanceRef, defaultThumbCarouselOptions);

		fixBug();
	}, [defaultThumbCarouselOptions, thumbInstanceRef, actualColor]);

	const handleSlidePrev = useCallback((): void => {
		if (mainInstanceRef.current) {
			mainInstanceRef.current.prev();
			const slide = mainInstanceRef.current.animator.targetIdx;
			const isValidSlideIndex = slide !== null;

			if (setCurrentImageIndex && isValidSlideIndex) setCurrentImageIndex(slide);
		}
	}, [mainInstanceRef, setCurrentImageIndex]);

	const handleSlideNext = useCallback((): void => {
		if (mainInstanceRef.current) {
			mainInstanceRef.current.next();
			const slide = mainInstanceRef.current.animator.targetIdx;
			const isValidSlideIndex = slide !== null;
			if (setCurrentImageIndex && isValidSlideIndex) setCurrentImageIndex(slide);
		}
	}, [mainInstanceRef, setCurrentImageIndex]);

	useEffect(() => {
		const isReferenceForMainSlider =
			"current" in mainInstanceRef && typeof mainInstanceRef.current !== "undefined";

		if (isReferenceForMainSlider) {
			mainInstanceRef.current?.on("dragEnded", (slider: any) => {
				const slide = slider.animator.targetIdx;
				if (slide === null) return;
				if (typeof setCurrentImageIndex === "undefined") return;

				setCurrentImageIndex(slide);
			});
		}
	}, [mainInstanceRef, setCurrentImageIndex]);

	useEffect(() => {
		const isReferenceForThumbnailSlider =
			"current" in thumbInstanceRef && typeof thumbInstanceRef.current !== "undefined";

		if (isReferenceForThumbnailSlider) {
			thumbInstanceRef.current!.moveToIdx(currentImageIndex, true);
			if (
				images.values.length - currentImageIndex < specificAmountOfSlidesPerViewInThumbnailSlider &&
				currentImageIndex !== 0
			) {
				thumbInstanceRef.current?.track.to(thumbInstanceRef.current.track.details.max);
			}
		}
	}, [currentImageIndex, images.values.length, thumbInstanceRef]);

	useEffect(() => {
		mainInstanceRef.current?.moveToIdx(currentImageIndex, true);
	}, [currentImageIndex, mainInstanceRef]);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	return {
		jsEnabled,
		mainSliderRef,
		thumbnailSliderRef,
		mainInstanceRef,
		handleSlidePrev,
		handleSlideNext,
	};
};
