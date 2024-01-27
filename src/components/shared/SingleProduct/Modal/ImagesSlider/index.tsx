import { useState } from "react";

import { MainSlide } from "./MainSlide";
import { ThumbSlide } from "./ThumbSlide";

import type { ImagesSliderProps } from "./types";
import { useCarousel } from "./hooks";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperSlides,
	wrapperSlidesLeftArrow,
	wrapperSlidesRightArrow,
	wrapperSlidesDisabled,
	wrapperSliderThumbs,
} = styles;

export const ImagesSlider = ({ images, actualColor }: ImagesSliderProps) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const { mainSliderRef, thumbnailSliderRef, handleSlidePrev, handleSlideNext } = useCarousel({
		images,
		currentImageIndex,
		setCurrentImageIndex,
		actualColor,
	});
	return (
		<div className={wrapper}>
			<div ref={mainSliderRef} className={cx("keen-slider", wrapperSlides)}>
				<div>
					<div
						onClick={handleSlidePrev}
						className={cx(wrapperSlidesLeftArrow, currentImageIndex === 0 && wrapperSlidesDisabled)}
					>
						<Icons.ArrowLeftSVG />
					</div>
					<div
						onClick={handleSlideNext}
						className={cx(
							wrapperSlidesRightArrow,
							currentImageIndex === images.length - 1 && wrapperSlidesDisabled,
						)}
					>
						<Icons.ArrowRightSVG />
					</div>
				</div>
				{images.map((image, idx) => (
					<MainSlide image={image} idx={idx} key={image + idx + image} />
				))}
			</div>
			<div ref={thumbnailSliderRef} className={cx("keen-slider", wrapperSliderThumbs)}>
				{images.map((image, idx: number) => (
					<ThumbSlide
						image={image}
						idx={idx}
						key={idx + image + idx}
						setCurrentImageIndex={setCurrentImageIndex}
						currentImageIndex={currentImageIndex}
					/>
				))}
			</div>
		</div>
	);
};
