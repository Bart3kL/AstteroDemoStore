import Image from "next/image";

import { Product } from "./Product";

import type { EmptyProps } from "./types";
import { cx } from "@/lib/utils";
import { useSlider } from "./hooks";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentHotOffer,
	wrapperContentHotOfferTitle,
	wrapperContentHotOfferProducts,
	wrapperContentHotOfferDots,
	wrapperContentHotOfferDotsDot,
	wrapperContentHotOfferDotsDotActive,
} = styles;

export const Empty = ({ description, icon, title, saleProducts }: EmptyProps) => {
	const { sliderRef, instanceRef, jsEnabled, currentSlide } = useSlider();

	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				<Image src={icon} alt={title} width={133} height={100} />
				<h4>{title}</h4>
				<p>{description}</p>
			</div>
			<div className={wrapperContentHotOffer}>
				<h3 className={wrapperContentHotOfferTitle}>hot offer</h3>
				<div className={cx("keen-slider", wrapperContentHotOfferProducts)} ref={sliderRef}>
					{saleProducts.map((product, idx) => (
						<Product {...product} key={product.id + product.title + idx} idx={idx} />
					))}
				</div>
				{jsEnabled && instanceRef.current && (
					<div className={wrapperContentHotOfferDots}>
						{[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
							return (
								<span
									key={idx}
									onClick={() => {
										instanceRef.current?.moveToIdx(idx);
									}}
									className={cx(
										wrapperContentHotOfferDotsDot,
										currentSlide === idx && wrapperContentHotOfferDotsDotActive,
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
