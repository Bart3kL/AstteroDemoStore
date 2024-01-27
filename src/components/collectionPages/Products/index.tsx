"use client";

import { useState, useEffect } from "react";

import { ProductsList } from "./ProductsList";
import { PaginationBar } from "./PaginationBar";
import { MobileFilters } from "./Filters/MobileFilters";
import { DesktopFilters } from "./Filters/DesktopFilters";
import { Sorting } from "./Sorting";
import { CurrentFilters } from "./CurrentFilters";

import type { ProductsProps } from "./types";
import {
	setCollectionPageParamInQueryString,
	getCurrentPageProducts,
	getInitialPageIndex,
} from "./utils";
import { Icons } from "@/lib";
import { useFilters, useSorting } from "./hooks";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperActions,
	wrapperActionsMobile,
	wrapperActionsMobileBtn,
	wrapperActionsDesktopBtn,
	wrapperActionsDesktopBtnActive,
	wrapperClearFilters,
	wrapperProducts,
} = styles;

export const Products = ({
	products,
	initialPageNumber,
	title,
	preparedFilterParams,
}: ProductsProps) => {
	const initialPageIndex = getInitialPageIndex();

	const [showDesktopFilters, setShowDesktopFilters] = useState(false);
	const [showMobileFilters, setShowMobileFilters] = useState(false);
	const [activePageNumber, setActivePageNumber] = useState(Number(initialPageNumber));

	useEffect(() => {
		setActivePageNumber(initialPageIndex);
	}, [initialPageIndex]);

	const handlePageChange = (pageNumber: number) => {
		setActivePageNumber(pageNumber);
		setCollectionPageParamInQueryString(pageNumber);
	};

	const highestPrice = products.reduce((maxPrice, product) => {
		const prices = product.variants.map((variant) => parseFloat(variant.price.amount));
		const highestPriceInProduct = Math.max(...prices);
		return Math.max(maxPrice, highestPriceInProduct);
	}, 0);

	const lowestPrice = products.reduce((minPrice, product) => {
		const prices = product.variants.map((variant) => parseFloat(variant.price.amount));
		const lowestPriceInProduct = Math.min(...prices);
		return Math.min(minPrice, lowestPriceInProduct);
	}, Infinity);

	const {
		availableColors,
		colorFilters,
		toggleColorFilter,
		ratingFilters,
		toggleRatingFilter,
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
		filteredProducts,
		applyFilters,
		availableMaterials,
		materialFilters,
		toggleMaterialFilter,
		availableRating,
		clearAllFilters,
	} = useFilters(products, highestPrice, lowestPrice, preparedFilterParams);

	const { handleSort } = useSorting(filteredProducts);

	const currentPageProducts = getCurrentPageProducts(8, filteredProducts, activePageNumber);
	const totalPagesCount = Math.ceil(filteredProducts.length / 8);

	useEffect(() => {
		if (activePageNumber > totalPagesCount) {
			setCollectionPageParamInQueryString(1);
			setActivePageNumber(1);
		}
	}, [activePageNumber, totalPagesCount]);

	return (
		<div className={wrapper}>
			<div className={wrapperActions}>
				<div className={wrapperActionsMobile}>
					<button
						className={wrapperActionsMobileBtn}
						onClick={() => setShowMobileFilters(!showMobileFilters)}
					>
						<Icons.FiltersSVG />
						Filters
					</button>

					<MobileFilters
						showFilters={showMobileFilters}
						setShowFilters={setShowMobileFilters}
						title={title}
						productsTotalLength={products.length}
						filteredProductsLength={filteredProducts.length}
						availableColors={availableColors}
						colorFilters={colorFilters}
						toggleColorFilter={toggleColorFilter}
						ratingFilters={ratingFilters}
						toggleRatingFilter={toggleRatingFilter}
						minPriceFilter={minPriceFilter}
						maxPriceFilter={maxPriceFilter}
						setMinPriceFilter={setMinPriceFilter}
						setMaxPriceFilter={setMaxPriceFilter}
						availableSizes={availableSizes}
						sizeFilters={sizeFilters}
						toggleSizeFilter={toggleSizeFilter}
						availableBrands={availableBrands}
						brandFilters={brandFilters}
						toggleBrandFilter={toggleBrandFilter}
						applyFilters={applyFilters}
						availableMaterials={availableMaterials}
						materialFilters={materialFilters}
						toggleMaterialFilter={toggleMaterialFilter}
						availableRating={availableRating}
						clearAllFilters={clearAllFilters}
						highestPrice={highestPrice}
						lowestPrice={lowestPrice}
					/>
				</div>
				<button
					className={cx(
						wrapperActionsDesktopBtn,
						showDesktopFilters && wrapperActionsDesktopBtnActive,
					)}
					onClick={() => setShowDesktopFilters(!showDesktopFilters)}
				>
					{showDesktopFilters ? (
						<>
							<Icons.FiltersCloseSVG />
							Close filters
						</>
					) : (
						<>
							<Icons.FiltersSVG />
							Filters
						</>
					)}
				</button>
				<Sorting handleSort={handleSort} />
			</div>
			<CurrentFilters
				colorFilters={colorFilters}
				toggleColorFilter={toggleColorFilter}
				ratingFilters={ratingFilters}
				toggleRatingFilter={toggleRatingFilter}
				minPriceFilter={minPriceFilter}
				maxPriceFilter={maxPriceFilter}
				setMinPriceFilter={setMinPriceFilter}
				setMaxPriceFilter={setMaxPriceFilter}
				sizeFilters={sizeFilters}
				toggleSizeFilter={toggleSizeFilter}
				brandFilters={brandFilters}
				toggleBrandFilter={toggleBrandFilter}
				materialFilters={materialFilters}
				toggleMaterialFilter={toggleMaterialFilter}
				showDesktopFilters={showDesktopFilters}
				highestPrice={highestPrice}
				lowestPrice={lowestPrice}
			/>
			{(colorFilters.length > 0 ||
				colorFilters.length > 0 ||
				ratingFilters.length > 0 ||
				sizeFilters.length > 0 ||
				minPriceFilter !== lowestPrice ||
				maxPriceFilter !== highestPrice ||
				brandFilters.length > 0 ||
				brandFilters.length > 0 ||
				materialFilters.length > 0) && (
				<div className={wrapperClearFilters}>
					<button onClick={clearAllFilters}>
						<Icons.TrashSVG />
						Clear all filters
					</button>
				</div>
			)}
			<div className={wrapperProducts}>
				<DesktopFilters
					showDesktopFilters={showDesktopFilters}
					title={title}
					productsTotalLength={products.length}
					filteredProductsLength={filteredProducts.length}
					availableColors={availableColors}
					colorFilters={colorFilters}
					toggleColorFilter={toggleColorFilter}
					ratingFilters={ratingFilters}
					toggleRatingFilter={toggleRatingFilter}
					minPriceFilter={minPriceFilter}
					maxPriceFilter={maxPriceFilter}
					setMinPriceFilter={setMinPriceFilter}
					setMaxPriceFilter={setMaxPriceFilter}
					availableSizes={availableSizes}
					sizeFilters={sizeFilters}
					toggleSizeFilter={toggleSizeFilter}
					availableBrands={availableBrands}
					brandFilters={brandFilters}
					toggleBrandFilter={toggleBrandFilter}
					applyFilters={applyFilters}
					availableMaterials={availableMaterials}
					materialFilters={materialFilters}
					toggleMaterialFilter={toggleMaterialFilter}
					availableRating={availableRating}
					clearAllFilters={clearAllFilters}
					highestPrice={highestPrice}
					lowestPrice={lowestPrice}
				/>
				<ProductsList products={currentPageProducts} showDesktopFilters={showDesktopFilters} />
			</div>
			{totalPagesCount > 1 && (
				<PaginationBar
					activePageNumber={activePageNumber}
					pagesCount={totalPagesCount}
					handlePageChange={handlePageChange}
					showDesktopFilters={showDesktopFilters}
				/>
			)}
		</div>
	);
};
