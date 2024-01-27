import { type Product } from "@/lib/shopify/functions/product/types";

export type UsePaginationProps = {
	products: Product[];
};

export interface ProductsProps {
	products: Product[];
	initialPageNumber: string;
	title: string;
	preparedFilterParams: {
		colors?: string[];
		sizes?: string[];
		materials?: string[];
		ratings?: number[];
		minPrice?: number;
		maxPrice?: number;
		brands?: string[];
	};
}

export interface FiltersAndSorters {
	basicFilters: string;
	color: string;
	size: string;
	rating: number;
	price: string;
}

export enum AllowedFiltersKeys {
	size = "size",
	brand = "brand",
	color = "color",
	productType = "productType",
	wiring = "wiring",
	cupLining = "cupLining",
}

export type FilterState = {
	id: string;
	label: string;
};
export type AppliedFiltersType = Record<keyof typeof AllowedFiltersKeys, FilterState[]>;
