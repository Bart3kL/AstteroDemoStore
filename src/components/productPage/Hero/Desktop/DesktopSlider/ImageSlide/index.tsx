import Image from "next/image";

import type { ImageSlideProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperFullSize } = styles;

export const ImageSlide = ({ title, image, idx, handleModalOpen }: ImageSlideProps) => {
	return (
		<div
			key={image + idx + "bestseller"}
			className={cx(wrapper, `keen-slider__slide number-slide-${idx}`)}
		>
			<Image src={image} alt={title} fill />
			<button
				className={wrapperFullSize}
				onClick={() => handleModalOpen(image)}
				aria-label="Fullsize"
			>
				<Icons.FullSizeSVG />
			</button>
		</div>
	);
};
