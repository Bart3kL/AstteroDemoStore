import Image from "next/image";

import type { ModalSliderProps } from "./types";
import { cx } from "@/lib/utils";
import { useZoomModal } from "./hooks";
import { Icons } from "@/lib/";

import styles from "./rwd.module.scss";

const {
	wrapper,
	wrapperProgress,
	wrapperProgressBar,
	wrapperProgressBarDisabled,
	wrapperCounter,
	wrapperActive,
	wrapperIcons,
	wrapperIconsClose,
	wrapperIconsPlayPause,
	wrapperArrow,
	wrapperArrowLeft,
	wrapperArrowRight,
	wrapperSlider,
	wrapperSliderImage,
	wrapperSliderImageImgBox,
	wrapperSliderImageImgBoxInput,
	wrapperBackdrop,
} = styles;

export const ModalSlider = ({
	isActive,
	preparedImages,
	modalProps: {
		autoplayEnabled,
		progress,
		currentImageIndex,
		mixedMediaLength,
		handleModalClose,
		currentModalImageIndex,
		handleNextSlide,
		handlePreviousSlide,
		handleAutoplayEnable,
		handleAutoplayDisable,
	},
}: ModalSliderProps) => {
	const { handleImageClick } = useZoomModal(currentModalImageIndex, handleModalClose);

	return (
		<div className={cx("ModalSlider", wrapper, isActive && wrapperActive)}>
			<div className={wrapperCounter}>
				<span>{currentImageIndex}</span>
				<span>/</span>
				<span>{mixedMediaLength}</span>
			</div>
			<div className={wrapperProgress}>
				<div
					className={autoplayEnabled ? wrapperProgressBar : wrapperProgressBarDisabled}
					style={{ width: `${progress}%` }}
				></div>
			</div>
			<div className={wrapperIcons}>
				<div className={wrapperIconsClose} onClick={handleModalClose}>
					<Icons.CloseSVG />
				</div>
				{autoplayEnabled ? (
					<div className={wrapperIconsPlayPause} onClick={handleAutoplayDisable}>
						<Icons.PauseSVG />
					</div>
				) : (
					<div className={wrapperIconsPlayPause} onClick={handleAutoplayEnable}>
						<Icons.PlaySVG />
					</div>
				)}
			</div>
			{!autoplayEnabled && (
				<>
					{currentModalImageIndex !== 0 && (
						<div className={cx(wrapperArrow, wrapperArrowLeft)} onClick={handlePreviousSlide}>
							<Icons.ArrowLongLeftSVG />
						</div>
					)}
					{currentModalImageIndex !== mixedMediaLength - 1 && (
						<div className={cx(wrapperArrow, wrapperArrowRight)} onClick={handleNextSlide}>
							<Icons.ArrowLongRightSVG />
						</div>
					)}
				</>
			)}
			<div className={wrapperSlider}>
				{preparedImages.map((el, idx) => (
					<div key={el.id + idx}>
						{currentModalImageIndex === idx && (
							<div className={wrapperSliderImage}>
								<div className={wrapperSliderImageImgBox}>
									<input
										type="checkbox"
										id={`zoomCheck-${idx}`}
										className={wrapperSliderImageImgBoxInput}
									/>
									<label htmlFor={`zoomCheck-${idx}`} onClick={(e) => handleImageClick(e, idx)}>
										<Image src={el.src} className={cx(`img-${idx}`)} alt={""} fill />
									</label>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
			<div className={wrapperBackdrop} onClick={handleModalClose}></div>
		</div>
	);
};
