import { useState } from "react";

import { MobileSlider } from "./MobileSlider";
import { Details } from "./Details";

import type { MobileProps } from "./types";
import { useVerticalSlider } from "./hooks";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Mobile = ({
	images,
	actualColor,
	title,
	breadCrumbs,
	tags,
	currentVariant,
	variants,
	description,
	rating,
	options,
	setCurrentVariant,
	handle,
	bundles,
}: MobileProps) => {
	const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

	const { jsEnabled, mainSliderRef, mainInstanceRef } = useVerticalSlider(
		actualColor,
		setCurrentSlideIdx,
	);
	return (
		<div className={wrapper}>
			<MobileSlider
				images={images}
				title={title}
				tags={tags}
				currentVariant={currentVariant}
				currentSlideIdx={currentSlideIdx}
				jsEnabled={jsEnabled}
				mainSliderRef={mainSliderRef}
				mainInstanceRef={mainInstanceRef}
				setCurrentSlideIdx={setCurrentSlideIdx}
				variants={variants}
			/>
			<Details
				mainInstanceRef={mainInstanceRef}
				currentSlideIdx={currentSlideIdx}
				imagesLength={[...images, images[0]].length}
				setCurrentSlideIdx={setCurrentSlideIdx}
				variants={variants}
				currentVariant={currentVariant}
				title={title}
				breadCrumbs={breadCrumbs}
				description={description}
				rating={rating}
				options={options}
				setCurrentVariant={setCurrentVariant}
				handle={handle}
				bundles={bundles}
			/>
		</div>
	);
};
