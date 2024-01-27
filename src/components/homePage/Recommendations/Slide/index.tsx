import Image from "next/image";

import type { SlideProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentBackground,
	wrapperContentImage,
	wrapperContentImageActive,
} = styles;

export function Slide({
	idx,
	featuredImage,
	currentSlideIndexBeforeEnded,
	handleSlideClick,
}: SlideProps) {
	return (
		<div
			className={cx(wrapper, `keen-slider__slide number-slide${idx + 1}`)}
			onClick={() => handleSlideClick(idx)}
		>
			<div className={wrapperContent}>
				<div className={wrapperContentBackground} />
				<Image
					className={cx(
						wrapperContentImage,
						currentSlideIndexBeforeEnded === idx && wrapperContentImageActive,
					)}
					src={featuredImage.url}
					alt={featuredImage.altText ?? ""}
					width={50}
					height={50}
				/>
			</div>
		</div>
	);
}
