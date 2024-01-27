import { type Product } from "@/lib/shopify/functions/product/types";

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
