"use client";

import { Review } from "../Review";

import type { MobileProps } from "./types";
import { cx } from "@/lib/utils";
import { useSliderWithDots } from "./hooks";

import styles from "./rwd.module.scss";
const { wrapper, wrapperDots, wrapperDotsDot, wrapperDotsDotActive } = styles;

export const Mobile = ({ products }: MobileProps) => {
	const { jsEnabled, mainSliderRef, mainInstanceRef, currentSlideIdx } = useSliderWithDots();
	return (
		<div className={wrapper}>
			<div ref={mainSliderRef} className={cx("keen-slider", !jsEnabled && "noJsHero")}>
				{products.map((product, idx) => (
					<div key={product.id + idx} className={cx(`keen-slider__slide number-slide-${idx}`)}>
						<Review {...product} idx={idx} />
					</div>
				))}
			</div>
			<div className={wrapperDots}>
				{[...Array(...products).keys()].map((idx) => {
					return (
						<span
							key={idx}
							onClick={() => {
								mainInstanceRef.current?.moveToIdx(idx);
							}}
							className={cx(wrapperDotsDot, currentSlideIdx === idx && wrapperDotsDotActive)}
						></span>
					);
				})}
			</div>
		</div>
	);
};
