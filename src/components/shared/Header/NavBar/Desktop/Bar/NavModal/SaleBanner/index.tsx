import { DiscountBanner } from "../DiscountBanner";

import type { SaleBannerProps } from "./types";
import { useSliderWithArrows } from "./hooks";
import { Icons } from "@/lib";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperSlides, wrapperSlidesLeftArrow, wrapperSlidesRightArrow } =
	styles;

export const SaleBanner = ({ products, title, type }: SaleBannerProps) => {
	const { sliderRef, handleSlidePrev, handleSlideNext } = useSliderWithArrows();

	return (
		<div className={wrapper}>
			<h4 className={wrapperTitle}>{title}</h4>
			<div className={cx(wrapperSlides, "keen-slider")} ref={sliderRef}>
				<>
					<div>
						<div onClick={handleSlidePrev} className={wrapperSlidesLeftArrow}>
							<Icons.ArrowLeftSVG />
						</div>
						<div onClick={handleSlideNext} className={wrapperSlidesRightArrow}>
							<Icons.ArrowRightSVG />
						</div>
					</div>
					{products &&
						products.map((banner, idx) => (
							<DiscountBanner
								key={banner.href + idx}
								{...banner}
								idx={idx}
								title={title}
								type={type}
							/>
						))}
				</>
			</div>
		</div>
	);
};
