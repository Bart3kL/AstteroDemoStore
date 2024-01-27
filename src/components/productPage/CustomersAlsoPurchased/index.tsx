"use client";

import { SingleProduct } from "@/components/shared/SingleProduct";

import type { CustomersAlsoPurchasedProps } from "./types";
import { useSliderWithDots } from "./hooks";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentTitle,
	wrapperContentSlider,
	wrapperContentSliderLeftArrow,
	wrapperContentSliderRightArrow,
	wrapperContentDots,
	wrapperContentDotsDot,
	wrapperContentDotsDotActive,
} = styles;

export const CustomersAlsoPurchased = ({ products }: CustomersAlsoPurchasedProps) => {
	const { sliderRef, handlePreviousSlide, handleNextSlide, currentSlide, instanceRef, jsEnabled } =
		useSliderWithDots();

	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				<h2 className={wrapperContentTitle}>Customers also purchased</h2>
				<p>
					Recommendations are based on data from sales, descriptions, and relations between products
				</p>
				<div
					className={cx(
						wrapperContentSlider,
						"keen-slider",
						!jsEnabled && "noJsNewAndDiscountProducts",
					)}
					ref={sliderRef}
				>
					<>
						<div>
							<div onClick={handlePreviousSlide} className={wrapperContentSliderLeftArrow}>
								<Icons.ArrowLeftSVG />
							</div>
							<div onClick={handleNextSlide} className={wrapperContentSliderRightArrow}>
								<Icons.ArrowRightSVG />
							</div>
						</div>
						{products.map((product, idx) => (
							<SingleProduct key={product.id} {...product} idx={idx} />
						))}
					</>
				</div>

				{jsEnabled && instanceRef.current && (
					<div className={wrapperContentDots}>
						{[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
							return (
								<span
									key={idx}
									onClick={() => {
										instanceRef.current?.moveToIdx(idx);
									}}
									className={cx(
										wrapperContentDotsDot,
										currentSlide === idx && wrapperContentDotsDotActive,
									)}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};
