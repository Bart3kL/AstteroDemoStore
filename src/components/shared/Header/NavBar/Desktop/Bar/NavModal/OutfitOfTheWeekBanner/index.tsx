import { DiscountBanner } from "../DiscountBanner";

import type { OutfitOfTheWeekBannerProps } from "./types";
import { useSliderWithBlockingArrows } from "./hooks";
import { Icons } from "@/lib";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperTitle,
	wrapperSlides,
	wrapperSlidesLeftArrow,
	wrapperSlidesRightArrow,
	wrapperSlidesDisabled,
} = styles;

export const OutfitOfTheWeekBanner = ({ products, title }: OutfitOfTheWeekBannerProps) => {
	const { sliderRef, handleSlidePrev, handleSlideNext, currentSlide, instanceRef } =
		useSliderWithBlockingArrows();

	return (
		<div className={wrapper}>
			<h4 className={wrapperTitle}>{title}</h4>

			<div className={cx(wrapperSlides, "keen-slider")} ref={sliderRef}>
				<>
					<div>
						<div
							onClick={handleSlidePrev}
							className={cx(wrapperSlidesLeftArrow, currentSlide === 0 && wrapperSlidesDisabled)}
						>
							<Icons.ArrowLeftSVG />
						</div>
						<div
							onClick={handleSlideNext}
							className={cx(
								wrapperSlidesRightArrow,
								currentSlide ===
									(instanceRef.current && instanceRef.current.track.details.slides.length - 2) &&
									wrapperSlidesDisabled,
							)}
						>
							<Icons.ArrowRightSVG />
						</div>
					</div>
					{products &&
						products.map((banner, idx) => (
							<DiscountBanner key={banner.href + idx} {...banner} idx={idx} />
						))}
				</>
			</div>
		</div>
	);
};
