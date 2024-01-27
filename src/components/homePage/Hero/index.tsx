"use client";

import { SliderNav } from "./SliderNav";
import { Slide } from "./Slide";

import type { SliderProps } from "./types";
import { cx } from "@/lib/utils";
import { useAutoplaySlider } from "@/lib/hooks/useAutoplaySlider";

import "./noJs.styles.scss";
import styles from "./rwd.module.scss";
const { wrapper, wrapperSlider } = styles;

export const Hero = ({ slides }: SliderProps) => {
	const {
		jsEnabled,
		mainSliderRef,
		mainInstanceRef,
		currentSlideIdx,
		handleNextSlide,
		handleBackSlide,
	} = useAutoplaySlider({
		intervalInSeconds: 4,
		allowDrag: true,
	});

	return (
		<div className={wrapper}>
			<div
				ref={mainSliderRef}
				className={cx("keen-slider", wrapperSlider, !jsEnabled && "noJsHero")}
			>
				{slides.map((slide, idx) => (
					<Slide
						{...slide}
						key={slide.textFirstLine + idx}
						idx={idx}
						currentSlideIdx={currentSlideIdx}
					/>
				))}
			</div>
			<SliderNav
				mainInstanceRef={mainInstanceRef}
				currentSlideIdx={currentSlideIdx}
				handleNextSlide={handleNextSlide}
				handleBackSlide={handleBackSlide}
				slidesLength={slides.length}
			/>
		</div>
	);
};
