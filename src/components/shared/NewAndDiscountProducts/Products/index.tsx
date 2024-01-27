import { SingleProduct } from "@/components/shared/SingleProduct";

import type { ProductsProps } from "./types";
import { useSliderWithDots } from "./hooks";
import { cx } from "@/lib/utils";

import "./noJs.styles.scss";
import styles from "./rwd.module.scss";
const { wrapper, wrapperDots, wrapperDotsDot, wrapperDotsDotActive } = styles;

export const Products = ({ products, activeGroup }: ProductsProps) => {
	const { sliderRef, currentSlide, instanceRef, jsEnabled } = useSliderWithDots(activeGroup);

	return (
		<div className={wrapper}>
			<div
				className={cx("keen-slider", !jsEnabled && "noJsNewAndDiscountProducts")}
				ref={sliderRef}
			>
				{products.map((product, idx) => (
					<SingleProduct key={product.id} {...product} idx={idx} />
				))}
			</div>
			{jsEnabled && instanceRef.current && (
				<div className={wrapperDots}>
					{[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
						return (
							<span
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={cx(wrapperDotsDot, currentSlide === idx && wrapperDotsDotActive)}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};
