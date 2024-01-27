"use client";

import { SingleProduct } from "@/components/shared/SingleProduct";

import type { RecentlyViewedProps } from "./types";
import { useSliderWithDots } from "./hooks";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentTitle,
	wrapperContentSlider,
	wrapperContentProductsMobile,
	wrapperContentSliderMobile,
	wrapperContentProducts,
	wrapperContentSliderLeftArrow,
	wrapperContentSliderRightArrow,
	wrapperContentDots,
	wrapperContentDotsDot,
	wrapperContentDotsDotActive,
} = styles;

export const RecentlyViewed = ({ products }: RecentlyViewedProps) => {
	const { sliderRef, handlePreviousSlide, handleNextSlide, currentSlide, instanceRef, jsEnabled } =
		useSliderWithDots();

	return (
		<>
			{products.length > 0 && (
				<div className={wrapper}>
					<div className={wrapperContent}>
						<h2 className={wrapperContentTitle}>Recently viewed</h2>
						<p>Exclusive built-in app section that stores the history of product views</p>

						{products.length > 3 ? (
							<div
								className={cx(
									wrapperContentSliderMobile,
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
						) : (
							<div className={wrapperContentProductsMobile}>
								{products.map((product, idx) => (
									<SingleProduct key={product.id} {...product} idx={idx} />
								))}
							</div>
						)}
						{products.length >= 5 ? (
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
						) : (
							<div className={wrapperContentProducts}>
								{products.map((product, idx) => (
									<SingleProduct key={product.id} {...product} idx={idx} />
								))}
							</div>
						)}

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
			)}
		</>
	);
};
