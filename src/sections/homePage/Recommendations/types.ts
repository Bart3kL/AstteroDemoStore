import { type Product } from "@/lib/shopify/functions/product/types";

export interface RecommendationsSectionProps {
	recommendations: {
		products: Product[];
		title: string;
		description: string;
	};
}
