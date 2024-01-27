import Image from "next/image";

import { Category } from "./Category";

import type { PresentationBannerProps } from "./types";
import { useSliderWithDots } from "./hooks";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperTitle,
	wrapperCategories,
	wrapperBrands,
	wrapperBrandsDots,
	wrapperBrandsDotsDot,
	wrapperBrandsDotsDotActive,
} = styles;

export const PresentationBanner = ({ list, title, products }: PresentationBannerProps) => {
	const { sliderRef, instanceRef, currentSlide } = useSliderWithDots();

	return (
		<div className={wrapper}>
			<h4 className={wrapperTitle}>{title}</h4>
			<div className={wrapperCategories}>
				{list &&
					list.map((category, idx) => (
						<Category key={category.href + idx} {...category} idx={idx} />
					))}
			</div>
			<div className={wrapperBrands}>
				<div className="keen-slider" ref={sliderRef}>
					{products &&
						products.map((brand, idx) => (
							<Image
								key={brand.href + idx}
								src={brand.image.src}
								width={80}
								height={80}
								alt={brand.image.alt}
								className={cx(`keen-slider__slide number-slide-${idx}`)}
							/>
						))}
				</div>
				{instanceRef.current && (
					<div className={wrapperBrandsDots}>
						{[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
							return (
								<span
									key={idx}
									onClick={() => {
										instanceRef.current?.moveToIdx(idx);
									}}
									className={cx(
										wrapperBrandsDotsDot,
										currentSlide === idx && wrapperBrandsDotsDotActive,
									)}
								></span>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};
