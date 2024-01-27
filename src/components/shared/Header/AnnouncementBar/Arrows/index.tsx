import { Icons } from "@/lib/";
import type { ArrowsProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapperLeftArrow, wrapperRightArrow } = styles;

export const Arrows = ({ handleBackSlide, handleNextSlide }: ArrowsProps) => {
	return (
		<div>
			<div onClick={handleBackSlide} className={wrapperLeftArrow}>
				<Icons.ArrowLeftSVG />
			</div>
			<div onClick={handleNextSlide} className={wrapperRightArrow}>
				<Icons.ArrowRightSVG />
			</div>
		</div>
	);
};
