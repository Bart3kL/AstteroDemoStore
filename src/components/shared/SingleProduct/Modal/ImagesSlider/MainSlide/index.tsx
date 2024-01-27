import Image from "next/image";

import type { MainSlideProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const MainSlide = ({ image, idx }: MainSlideProps) => {
	return (
		<div className={cx(wrapper, `keen-slider__slide number-slide${idx + 1}`)}>
			<Image
				src={image}
				alt={"sa"}
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>
		</div>
	);
};
