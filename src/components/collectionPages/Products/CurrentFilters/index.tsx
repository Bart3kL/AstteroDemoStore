import { Color } from "./Color";
import { Default } from "./Default";
import { Price } from "./Price";

import type { CurrentFiltersProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperAreFilters } = styles;

export const CurrentFilters = ({
	colorFilters,
	toggleColorFilter,
	ratingFilters,
	toggleRatingFilter,
	minPriceFilter,
	maxPriceFilter,
	setMinPriceFilter,
	setMaxPriceFilter,
	sizeFilters,
	toggleSizeFilter,
	brandFilters,
	toggleBrandFilter,
	materialFilters,
	toggleMaterialFilter,
	showDesktopFilters,
	highestPrice,
	lowestPrice,
}: CurrentFiltersProps) => {
	return (
		<div className={cx(wrapper, showDesktopFilters && wrapperAreFilters)}>
			{(minPriceFilter !== lowestPrice || maxPriceFilter !== highestPrice) && (
				<Price
					minPriceFilter={minPriceFilter}
					maxPriceFilter={maxPriceFilter}
					setMinPriceFilter={setMinPriceFilter}
					setMaxPriceFilter={setMaxPriceFilter}
					title="Price"
					highestPrice={highestPrice}
					lowestPrice={lowestPrice}
				/>
			)}

			{colorFilters.map((color) => (
				<Color key={color} color={color} toggleColorFilter={toggleColorFilter} title="Color" />
			))}
			{sizeFilters.map((size) => (
				<Default
					key={size}
					filter={size}
					toggleFilter={toggleSizeFilter as (filter: string | number) => void}
					title="Size"
				/>
			))}
			{materialFilters.map((material) => (
				<Color
					key={material}
					color={material}
					toggleColorFilter={toggleMaterialFilter}
					title="Material"
				/>
			))}
			{ratingFilters.map((rating) => (
				<Default
					key={rating}
					filter={rating}
					toggleFilter={toggleRatingFilter as (filter: string | number) => void}
					title="Rating"
				/>
			))}
			{brandFilters.map((brand) => (
				<Default
					key={brand}
					filter={brand}
					toggleFilter={toggleBrandFilter as (filter: string | number) => void}
					title="Brand"
				/>
			))}
		</div>
	);
};
