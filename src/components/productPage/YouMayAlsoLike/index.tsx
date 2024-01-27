"use client";

import { SingleProduct } from "@/components/shared/SingleProduct";

import type { YouMayAlsoLikeProps } from "./types";
import { useSliderWithDots } from "./hooks";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentTitle,
	wrapperContentSlider,
	wrapperContentGrid,
	wrapperContentDots,
	wrapperContentDotsDot,
	wrapperContentDotsDotActive,
} = styles;

export const YouMayAlsoLike = ({ products }: YouMayAlsoLikeProps) => {
	const { sliderRef, currentSlide, instanceRef, jsEnabled } = useSliderWithDots();

	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				<h2 className={wrapperContentTitle}>You may also like</h2>
				<p>Related products from the same category might interest you</p>
				<div
					className={cx(
						wrapperContentSlider,
						"keen-slider",
						!jsEnabled && "noJsNewAndDiscountProducts",
					)}
					ref={sliderRef}
				>
					{products.map((product, idx) => (
						<SingleProduct key={product.id} {...product} idx={idx} />
					))}
				</div>

				<div className={wrapperContentGrid}>
					{products.map((product, idx) => (
						<SingleProduct key={product.id} {...product} idx={idx} />
					))}
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
