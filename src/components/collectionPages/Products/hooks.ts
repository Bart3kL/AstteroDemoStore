import { useEffect, useState, useCallback, useMemo } from "react";

import { useCollectionBrandFilters } from "@/lib/zustand/collection";
import type { Product } from "@/lib/shopify/functions/product/types";
import type { ProductsProps } from "./types";

export const useFilters = (
	initialProducts: Product[],
	highestPrice: number,
	lowestPrice: number,
	preparedFilterParams: ProductsProps["preparedFilterParams"],
) => {
	const zustand = useCollectionBrandFilters();

	const [filteredProducts, setFilteredProducts] = useState(initialProducts);

	const availableColors = [
		...new Set(
			initialProducts
				.map((product) => product.options.find((option) => option.name === "Color")?.values)
				.filter((colors) => colors)
				.flatMap((colors) => colors),
		),
	] as string[];

	const availableSizes = [
		...new Set(
			initialProducts
				.map((product) => product.options.find((option) => option.name === "Size")?.values)
				.filter((sizes) => sizes)
				.flatMap((sizes) => sizes),
		),
	] as string[];

	const availableMaterials = [
		...new Set(
			initialProducts
				.map((product) => product.options.find((option) => option.name === "Material")?.values)
				.filter((materials) => materials)
				.flatMap((materials) => materials),
		),
	] as string[];

	const availableRating = [
		...new Set(
			initialProducts
				.map((product) => product.rating.stars)
				.filter((stars) => stars)
				.flatMap((stars) => stars),
		),
	] as number[];

	const availableBrands = [...new Set(initialProducts.map((product) => product.brand?.value))];

	const [colorFilters, setColorFilters] = useState<string[]>(preparedFilterParams.colors ?? []);
	const [sizeFilters, setSizeFilters] = useState<string[]>(preparedFilterParams.sizes ?? []);
	const [materialFilters, setMaterialFilters] = useState<string[]>(
		preparedFilterParams.materials ?? [],
	);
	const [ratingFilters, setRatingFilters] = useState<number[]>(preparedFilterParams.ratings ?? []);
	const [minPriceFilter, setMinPriceFilter] = useState(
		preparedFilterParams.minPrice ?? lowestPrice,
	);
	const [maxPriceFilter, setMaxPriceFilter] = useState(
		preparedFilterParams.maxPrice ?? highestPrice,
	);

	useEffect(() => {
		zustand.setBrandFilters(preparedFilterParams.brands ?? []);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [preparedFilterParams.brands]);

	const toClearCollections = useMemo(
		() => ["colors", "sizes", "materials", "ratings", "minPrice", "maxPrice", "brands", "q"],
		[],
	);

	const updateURL = useCallback(() => {
		const filterParams: any = {};

		if (colorFilters.length > 0) {
			filterParams.colors = [...colorFilters];
		}

		if (sizeFilters.length > 0) {
			filterParams.sizes = [...sizeFilters];
		}

		if (materialFilters.length > 0) {
			filterParams.materials = [...materialFilters];
		}

		if (ratingFilters.length > 0) {
			filterParams.ratings = [...ratingFilters];
		}

		if (minPriceFilter !== lowestPrice || maxPriceFilter !== highestPrice) {
			filterParams.minPrice = [minPriceFilter];
			filterParams.maxPrice = [maxPriceFilter];
		}

		if (zustand.brandFilters.length > 0) {
			filterParams.brands = [...zustand.brandFilters];
		}

		if (typeof window !== "undefined" && "URLSearchParams" in window) {
			var searchParams = new URLSearchParams(window.location.search);

			if (Object.keys(filterParams).length === 0 && searchParams.toString() === "") {
				return;
			}

			if (searchParams.toString() !== "") {
				const paramsArray = Array.from(searchParams.entries());
				paramsArray.pop();
				searchParams = new URLSearchParams(paramsArray);
			}

			if (Object.entries(filterParams).length) {
				Object.entries(filterParams).forEach(([key, value]: any) => {
					if (key === "q") return;
					if (typeof value === "string") {
						searchParams.set(key, decodeURIComponent(value));
					} else if (value && value.length > 0) {
						searchParams.set(key, decodeURIComponent(value.join(",")));
					} else {
						searchParams.delete(key);
					}
				});
			} else {
				toClearCollections.forEach((key) => {
					if (key === "q") return;
					searchParams.delete(key);
				});
			}
			if (filterParams.q) searchParams.set("q", filterParams.q);

			var collectionPageParam = "?" + searchParams;
			var newRelativePathQuery = window.location.pathname;

			if (window.location.pathname.includes("collections")) {
				newRelativePathQuery += collectionPageParam;
			}

			history.pushState(null, "", newRelativePathQuery);
		}
	}, [
		colorFilters,
		sizeFilters,
		materialFilters,
		ratingFilters,
		minPriceFilter,
		lowestPrice,
		maxPriceFilter,
		highestPrice,
		zustand.brandFilters,
		toClearCollections,
	]);

	const applyFilters = useCallback(() => {
		let filtered = initialProducts;

		if (colorFilters.length > 0) {
			filtered = filtered.filter((product) =>
				product.options.some(
					(option) =>
						option.name === "Color" && option.values.some((value) => colorFilters.includes(value)),
				),
			);
		}

		if (sizeFilters.length > 0) {
			filtered = filtered.filter((product) =>
				product.options.some(
					(option) =>
						option.name === "Size" && option.values.some((value) => sizeFilters.includes(value)),
				),
			);
		}

		if (materialFilters.length > 0) {
			filtered = filtered.filter((product) =>
				product.options.some(
					(option) =>
						option.name === "Material" &&
						option.values.some((value) => materialFilters.includes(value)),
				),
			);
		}

		if (ratingFilters.length > 0) {
			filtered = filtered.filter((product) => ratingFilters.includes(product.rating.stars));
		}

		if (zustand.brandFilters.length > 0) {
			filtered = filtered.filter((product) => zustand.brandFilters.includes(product.brand.value));
		}

		if (minPriceFilter && maxPriceFilter) {
			filtered = filtered.filter((product) =>
				product.variants.some(
					(variant) =>
						Number(variant.price.amount) >= Number(minPriceFilter) &&
						Number(variant.price.amount) <= Number(maxPriceFilter),
				),
			);
		}

		setFilteredProducts(filtered);
		updateURL();
	}, [
		colorFilters,
		initialProducts,
		materialFilters,
		maxPriceFilter,
		minPriceFilter,
		ratingFilters,
		sizeFilters,
		updateURL,
		zustand.brandFilters,
	]);

	useEffect(() => {
		applyFilters();
	}, [
		applyFilters,
		colorFilters,
		sizeFilters,
		materialFilters,
		ratingFilters,
		minPriceFilter,
		maxPriceFilter,
	]);

	const toggleColorFilter = (color: string) => {
		if (colorFilters.includes(color)) {
			setColorFilters(colorFilters.filter((c) => c !== color));
		} else {
			setColorFilters([...colorFilters, color]);
		}
	};

	const toggleSizeFilter = (size: string) => {
		if (sizeFilters.includes(size)) {
			setSizeFilters(sizeFilters.filter((s) => s !== size));
		} else {
			setSizeFilters([...sizeFilters, size]);
		}
	};

	const toggleMaterialFilter = (material: string) => {
		if (materialFilters.includes(material)) {
			setMaterialFilters(materialFilters.filter((m) => m !== material));
		} else {
			setMaterialFilters([...materialFilters, material]);
		}
	};

	const toggleRatingFilter = (rating: number) => {
		if (ratingFilters.includes(rating)) {
			setRatingFilters(ratingFilters.filter((r) => r !== rating));
		} else {
			setRatingFilters([...ratingFilters, rating]);
		}
	};

	const toggleBrandFilter = (brand: string) => {
		if (zustand.brandFilters.includes(brand)) {
			zustand.setBrandFilters(zustand.brandFilters.filter((b) => b !== brand));
		} else {
			zustand.setBrandFilters([...zustand.brandFilters, brand]);
		}
	};

	const clearAllFilters = () => {
		setColorFilters([]);
		setSizeFilters([]);
		setMaterialFilters([]);
		setRatingFilters([]);
		setMinPriceFilter(lowestPrice);
		setMaxPriceFilter(highestPrice);
		zustand.setBrandFilters([]);

		setFilteredProducts(initialProducts);
	};

	return {
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
		brandFilters: zustand.brandFilters,
		toggleBrandFilter,
		filteredProducts,
		applyFilters,
		availableMaterials,
		materialFilters,
		toggleMaterialFilter,
		availableRating,
		clearAllFilters,
	};
};

export const useSorting = (filteredProducts: Product[]) => {
	const [sortType, setSortType] = useState("");

	let sortedProducts = filteredProducts;
	const handleSort = (type: string) => {
		setSortType(type);

		switch (type) {
			case "AZ":
				sortedProducts = sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case "ZA":
				sortedProducts = sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
				break;
			case "PRICE_LOW_TO_HIGH":
				sortedProducts = sortedProducts.sort(
					(a, b) =>
						Number(a.priceRange.minVariantPrice.amount) -
						Number(b.priceRange.minVariantPrice.amount),
				);
				break;
			case "PRICE_HIGH_TO_LOW":
				sortedProducts = sortedProducts.sort(
					(a, b) =>
						Number(b.priceRange.minVariantPrice.amount) -
						Number(a.priceRange.minVariantPrice.amount),
				);
				break;
			case "DATE_OLD_TO_NEW":
				sortedProducts = sortedProducts.sort((a, b) => {
					const dateA = new Date(a.updatedAt);
					const dateB = new Date(b.updatedAt);
					return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
				});
				break;
			case "DATE_NEW_TO_OLD":
				sortedProducts = sortedProducts.sort((a, b) => {
					const dateA = new Date(a.updatedAt);
					const dateB = new Date(b.updatedAt);
					return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
				});
				break;
			default:
				// Default sorting
				break;
		}
	};
	return {
		sortType,
		handleSort,
	};
};
