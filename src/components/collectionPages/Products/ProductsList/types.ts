import type { Product } from "@/lib/shopify/functions/product/types";

export interface ProductsListProps {
	products: Product[];
	showDesktopFilters: boolean;
}
