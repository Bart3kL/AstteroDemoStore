import { Filter } from "../shared/Filter";
import { Price } from "../shared/Price";
import { Color } from "../shared/Color";
import { Size } from "../shared/Size";
import { Brand } from "../shared/Brand";
import { RatingFilter } from "../shared/Rating";

import type { DesktopFiltersProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperActive,
	wrapperContent,
	wrapperContentTitle,
	wrapperContentProductsLength,
	wrapperContentFilters,
	wrapperContentButtons,
	wrapperContentButtonsAddToCart,
	wrapperContentButtonsClear,
} = styles;

export const DesktopFilters = ({
	showDesktopFilters,
	title,
	productsTotalLength,
	filteredProductsLength,
	highestPrice,
	lowestPrice,

	availableColors,
	colorFilters,
	toggleColorFilter,

	ratingFilters,
	toggleRatingFilter,
	availableRating,

	minPriceFilter,
	maxPriceFilter,
	setMinPriceFilter,
	setMaxPriceFilter,

	availableSizes,
	sizeFilters,
	toggleSizeFilter,

	availableBrands,
	brandFilters,
	toggleBrandFilter,

	availableMaterials,
	materialFilters,
	toggleMaterialFilter,

	applyFilters,
	clearAllFilters,
}: DesktopFiltersProps) => {
	return (
		<>
			<div className={cx(wrapper, showDesktopFilters && wrapperActive)}>
				<div className={wrapperContent}>
					<h3 className={wrapperContentTitle}>{title}</h3>
					<div className={wrapperContentProductsLength}>
						{productsTotalLength !== filteredProductsLength && <p>{filteredProductsLength} of</p>}
						<p>{productsTotalLength} products</p>
					</div>
					<div className={wrapperContentFilters}>
						<Filter
							title="Price"
							prices={{ minPriceFilter, maxPriceFilter }}
							isDesktop
							lowestPrice={lowestPrice}
							highestPrice={highestPrice}
						>
							<Price
								currentMin={minPriceFilter}
								currentMax={maxPriceFilter}
								maxVal={highestPrice}
								minVal={lowestPrice}
								step={5}
								setMinPriceFilter={setMinPriceFilter}
								setMaxPriceFilter={setMaxPriceFilter}
								areMobileFilters
							/>
						</Filter>
						<Filter title="Color" filters={colorFilters} isDesktop>
							<Color
								colorFilters={colorFilters}
								toggleColorFilter={toggleColorFilter}
								availableColors={availableColors}
							/>
						</Filter>
						<Filter title="Size" filters={sizeFilters} isDesktop>
							<Size
								sizeFilters={sizeFilters}
								toggleSizeFilter={toggleSizeFilter}
								availableSizes={availableSizes}
							/>
						</Filter>
						{availableMaterials.length > 0 && (
							<Filter title="Material" filters={materialFilters} isDesktop>
								<Color
									colorFilters={materialFilters}
									toggleColorFilter={toggleMaterialFilter}
									availableColors={availableMaterials}
								/>
							</Filter>
						)}
						<Filter title="Brand" filters={brandFilters} isDesktop>
							<Brand
								brandFilters={brandFilters}
								toggleBrandFilter={toggleBrandFilter}
								availableBrands={availableBrands}
							/>
						</Filter>
						<Filter title="Rating" filters={ratingFilters} isDesktop>
							<RatingFilter
								ratingFilters={ratingFilters}
								toggleRatingFilter={toggleRatingFilter}
								availableRating={availableRating}
							/>
						</Filter>
					</div>
					<div className={wrapperContentButtons}>
						<button className={wrapperContentButtonsAddToCart} onClick={applyFilters}>
							Apply filters
						</button>
						<button className={wrapperContentButtonsClear} onClick={clearAllFilters}>
							Clear Filters
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
