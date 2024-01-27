import { ModalSlider } from "./ModalSlider";
import { ImageSlide } from "./ImageSlide";

import type { MobileSliderProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";
import { useSliderWithArrows, useModal } from "./hooks";

import "./noJs.styles.scss";
import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperImages,
	wrapperImagesLeftArrow,
	wrapperImagesRightArrow,
	wrapperImagesDisabled,
} = styles;

export const DesktopSlider = ({ images, title, actualColor }: MobileSliderProps) => {
	const { isActive, handleModalOpen, preparedImages, modalProps } = useModal(images);

	const imagesLength = images.length;
	const { jsEnabled, mainSliderRef, currentSlideIdx, handleSlidePrev, handleSlideNext } =
		useSliderWithArrows(actualColor, imagesLength);

	return (
		<div className={wrapper}>
			<div
				ref={mainSliderRef}
				className={cx(
					images.length >= 2 ? "" : "keen-slider",
					!jsEnabled && "noJsHero",
					wrapperImages,
				)}
			>
				<div>
					<div
						onClick={handleSlidePrev}
						className={cx(wrapperImagesLeftArrow, currentSlideIdx === 0 && wrapperImagesDisabled)}
					>
						<Icons.ArrowLeftSVG />
					</div>
					<div
						onClick={handleSlideNext}
						className={cx(
							wrapperImagesRightArrow,
							currentSlideIdx === (images.length === 2 ? images.length - 2 : images.length - 3) &&
								wrapperImagesDisabled,
						)}
					>
						<Icons.ArrowRightSVG />
					</div>
				</div>
				{images.map((image, idx) => (
					<ImageSlide
						title={title}
						image={image}
						idx={idx}
						handleModalOpen={handleModalOpen}
						key={image + idx}
					/>
				))}
			</div>
			<ModalSlider isActive={isActive} preparedImages={preparedImages} modalProps={modalProps} />
		</div>
	);
};
