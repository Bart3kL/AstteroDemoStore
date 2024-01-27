import { useRef } from "react";

import { Result } from "../Result";

import type { SearchResultsProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";
import { useSliderWithBlockingArrows } from "../../../Desktop/Bar/NavModal/OutfitOfTheWeekBanner/hooks";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperSlides,
	wrapperSlidesCenter,
	wrapperSlidesLeftArrow,
	wrapperSlidesRightArrow,
} = styles;

export const Results = ({ searchResults, noResultsLabel }: SearchResultsProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const wrapperWidth = wrapperRef.current ? wrapperRef.current.offsetWidth : 0;
	const slidesPerWdth = Math.floor(wrapperWidth / 150);
	const areWithArrows = (wrapperWidth - (slidesPerWdth / 3) * 26) / 150;

	const { sliderRef, handleSlidePrev, handleSlideNext } = useSliderWithBlockingArrows(
		searchResults,
		true,
		true,
	);

	return (
		<>
			<div className={wrapper} ref={wrapperRef}>
				{searchResults.length === 0 && <div>{noResultsLabel}</div>}
				{searchResults.length > 0 && (
					<div
						className={cx(
							wrapperSlides,
							"keen-slider",
							searchResults.length < areWithArrows && wrapperSlidesCenter,
						)}
						ref={searchResults.length > areWithArrows ? sliderRef : null}
					>
						<>
							{searchResults.length > areWithArrows && (
								<div>
									<div onClick={handleSlidePrev} className={cx(wrapperSlidesLeftArrow)}>
										<Icons.ArrowLeftSVG />
									</div>
									<div onClick={handleSlideNext} className={cx(wrapperSlidesRightArrow)}>
										<Icons.ArrowRightSVG />
									</div>
								</div>
							)}
							{searchResults.map((product, idx) => (
								<Result idx={idx} {...product} key={product.id + idx} />
							))}
						</>
					</div>
				)}
			</div>
		</>
	);
};
