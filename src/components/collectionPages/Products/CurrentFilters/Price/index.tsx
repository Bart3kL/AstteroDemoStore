import type { PriceProps } from "./types";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Price = ({
	minPriceFilter,
	maxPriceFilter,
	setMinPriceFilter,
	setMaxPriceFilter,
	title,
	highestPrice,
	lowestPrice,
}: PriceProps) => {
	return (
		<div
			className={wrapper}
			onClick={() => {
				setMinPriceFilter(lowestPrice), setMaxPriceFilter(highestPrice);
			}}
		>
			<Icons.CloseSVG />
			<p>{title}:</p>
			<p>
				{minPriceFilter}/{maxPriceFilter}
			</p>
		</div>
	);
};
