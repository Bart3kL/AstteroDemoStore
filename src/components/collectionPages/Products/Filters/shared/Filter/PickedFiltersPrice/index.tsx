import type { PickedFiltersPriceProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const PickedFiltersPrice = ({
	minPriceFilter,
	maxPriceFilter,
	highestPrice,
	lowestPrice,
}: PickedFiltersPriceProps) => {
	const isChanged = minPriceFilter !== lowestPrice || maxPriceFilter !== highestPrice;
	return (
		<>
			{isChanged && (
				<span className={wrapper}>
					{minPriceFilter} / {maxPriceFilter}
				</span>
			)}
		</>
	);
};
