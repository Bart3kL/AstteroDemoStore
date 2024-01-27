import type { SliderNavProps } from "./types";
import { cx, useSound } from "@/lib/utils";
import { Icons } from "@/lib";
import { sounds } from "@/lib/constants";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperNav,
	wrapperNavDots,
	wrapperNavDotsDot,
	wrapperNavDotsDotActive,
	wrapperNavArrow,
} = styles;

export const SliderNav = ({
	mainInstanceRef,
	currentSlideIdx,
	handleNextSlide,
	handleBackSlide,
	slidesLength,
}: SliderNavProps) => {
	const { up, down, swipe } = useSound(sounds);

	return (
		<div className={wrapper}>
			<div className={wrapperNav}>
				<div
					onClick={() => {
						handleBackSlide(), down.play();
					}}
					className={wrapperNavArrow}
				>
					<Icons.ArrowLeftSVG />
				</div>
				<div>
					<div className={wrapperNavDots}>
						{[...Array(slidesLength).keys()].map((idx) => {
							return (
								<span
									key={idx}
									onClick={() => {
										mainInstanceRef.current?.moveToIdx(idx);
										swipe.play();
									}}
									className={cx(
										wrapperNavDotsDot,
										currentSlideIdx === idx && wrapperNavDotsDotActive,
									)}
								></span>
							);
						})}
					</div>
				</div>
				<div
					onClick={() => {
						handleNextSlide();
						up.play();
					}}
					className={wrapperNavArrow}
				>
					<Icons.ArrowRightSVG />
				</div>
			</div>
		</div>
	);
};
