import { type Product } from "@/lib/shopify/functions/product/types";

export interface OutfitsSectionProps {
	products: Product[];
	outfits: {
		title: string;
		bundles: {
			freeProduct: string;
			products: string[];
		}[];
	};
}
