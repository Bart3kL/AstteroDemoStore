import { type Product } from "@/lib/shopify/functions/product/types";

export interface RecommendationsSectionProps {
	products: Product[];
	recommendations: {
		title: string;
		description: string;
		products: string[];
	};
}
