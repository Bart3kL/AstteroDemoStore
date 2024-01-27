import { Curtain } from "../../../../shared/Modal/Curtain";
import { Filter } from "../shared/Filter";
import { Price } from "../shared/Price";
import { Color } from "../shared/Color";
import { Size } from "../shared/Size";
import { Brand } from "../shared/Brand";
import { RatingFilter } from "../shared/Rating";

import type { MobileFiltersProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperActive,
	wrapperExit,
	wrapperContent,
	wrapperContentTitle,
	wrapperContentProductsLength,
	wrapperContentFilters,
	wrapperContentButtons,
	wrapperContentButtonsAddToCart,
	wrapperContentButtonsClear,
} = styles;

export const MobileFilters = ({
	showFilters,
	setShowFilters,
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
}: MobileFiltersProps) => {
	return (
		<>
			<Curtain
				show={showFilters}
				onClose={() => setShowFilters(false)}
				curtainClose={true}
				curtainColor={"black"}
			/>
			<div className={cx(wrapper, showFilters && wrapperActive)}>
				<div className={wrapperExit}>
					<button onClick={() => setShowFilters(false)} aria-label="Close">
						<Icons.CloseSVG />
					</button>
				</div>
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
							highestPrice={highestPrice}
							lowestPrice={lowestPrice}
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
						<Filter title="Color" filters={colorFilters}>
							<Color
								colorFilters={colorFilters}
								toggleColorFilter={toggleColorFilter}
								availableColors={availableColors}
							/>
						</Filter>
						<Filter title="Size" filters={sizeFilters}>
							<Size
								sizeFilters={sizeFilters}
								toggleSizeFilter={toggleSizeFilter}
								availableSizes={availableSizes}
							/>
						</Filter>
						{availableMaterials.length > 0 && (
							<Filter title="Material" filters={materialFilters}>
								<Color
									colorFilters={materialFilters}
									toggleColorFilter={toggleMaterialFilter}
									availableColors={availableMaterials}
								/>
							</Filter>
						)}
						<Filter title="Brand" filters={brandFilters}>
							<Brand
								brandFilters={brandFilters}
								toggleBrandFilter={toggleBrandFilter}
								availableBrands={availableBrands}
							/>
						</Filter>
						<Filter title="Rating" filters={ratingFilters}>
							<RatingFilter
								ratingFilters={ratingFilters}
								toggleRatingFilter={toggleRatingFilter}
								availableRating={availableRating}
							/>
						</Filter>
					</div>
					<div className={wrapperContentButtons}>
						<button
							className={wrapperContentButtonsAddToCart}
							onClick={() => {
								applyFilters(), setShowFilters(false);
							}}
						>
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
