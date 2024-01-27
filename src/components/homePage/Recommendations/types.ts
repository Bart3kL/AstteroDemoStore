import type { Product } from "@/lib/shopify/functions/product/types";
export interface RecommendationsProps {
	title: string;
	description: string;
	products: Product[];
}
