"use client";

import { useState } from "react";

import { Product } from "./Product";
import { Slide } from "./Slide";

import type { RecommendationsProps } from "./types";
import { cx } from "@/lib/utils";
import { useCardSlider, useSlides } from "./hooks";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperTitle,
	wrapperProducts,
	wrapperProductsLeftArrow,
	wrapperProductsRightArrow,
	wrapperSlides,
} = styles;

export const Recommendations = ({ title, description, products }: RecommendationsProps) => {
	const [shouldFade, setShouldFade] = useState(false);
	const [arrowClick, setArrowClick] = useState(false);
	const { sliderRef, instanceRef } = useCardSlider();
	const {
		mainSliderRef,
		currentSlideIndexBeforeEnded,
		handleNextSlideClick,
		handlePreviousSlideClick,
		handleSlideClick,
	} = useSlides(instanceRef, setShouldFade, setArrowClick);

	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>{title}</h2>
			<p>{description}s</p>
			<div className={wrapperProducts}>
				<div className={cx("keen-slider")} ref={sliderRef}>
					<>
						<div>
							<div onClick={handlePreviousSlideClick} className={wrapperProductsLeftArrow}>
								<Icons.ArrowLeftSVG />
							</div>
							<div onClick={handleNextSlideClick} className={wrapperProductsRightArrow}>
								<Icons.ArrowRightSVG />
							</div>
						</div>
						{products.map((product, idx) => (
							<Product
								key={idx + product.id + idx}
								{...product}
								idx={idx}
								shouldFade={!arrowClick && shouldFade}
							/>
						))}
					</>
				</div>
			</div>
			<div className={cx("keen-slider", wrapperSlides)} ref={mainSliderRef}>
				{products.map((variant, idx) => (
					<Slide
						{...variant}
						key={variant.id}
						idx={idx}
						currentSlideIndexBeforeEnded={currentSlideIndexBeforeEnded}
						handleSlideClick={handleSlideClick}
					/>
				))}
			</div>
		</div>
	);
};
