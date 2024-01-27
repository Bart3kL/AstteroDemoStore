import { BreadCrumbs } from "../shared/BreadCrumbs";
import { Bundles } from "../shared/Bundles";
import { DesktopSlider } from "./DesktopSlider";
import { Details } from "./Details";

import type { DesktopProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Desktop = ({
	images,
	actualColor,
	title,
	breadCrumbs,
	currentVariant,
	variants,
	description,
	rating,
	options,
	setCurrentVariant,
	handle,
	bundles,
}: DesktopProps) => {
	return (
		<div className={wrapper}>
			<BreadCrumbs breadCrumbs={breadCrumbs} title={title} />
			<DesktopSlider images={images} title={title} actualColor={actualColor} />

			<Details
				variants={variants}
				currentVariant={currentVariant}
				title={title}
				description={description}
				rating={rating}
				options={options}
				setCurrentVariant={setCurrentVariant}
				handle={handle}
			/>
			{bundles && <Bundles {...bundles} />}
		</div>
	);
};
