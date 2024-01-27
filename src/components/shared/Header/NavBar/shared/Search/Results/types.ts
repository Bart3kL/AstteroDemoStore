import type { SearchProduct } from "@/lib/shopify/functions/product/types";

export interface SearchResultsProps {
	searchResults: SearchProduct[];
	noResultsLabel: string;
}
