import Image from "next/image";

import type { ThumbSlideProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperActive } = styles;

export const ThumbSlide = ({
	image,
	idx,
	setCurrentImageIndex,
	currentImageIndex,
}: ThumbSlideProps) => {
	return (
		<div
			className={cx(
				wrapper,
				`keen-slider__slide number-slide${idx + 1}`,
				currentImageIndex === idx && wrapperActive,
			)}
			onClick={() => setCurrentImageIndex(idx)}
		>
			<Image src={image} alt={"sa"} fill sizes="(max-width: 71.5px) 100vw" />
		</div>
	);
};
