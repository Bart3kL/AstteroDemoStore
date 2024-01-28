import { type Product } from "@/lib/shopify/functions/product/types";

export interface OutfitsSectionProps {
	outfits: {
		title: string;
		bundles: {
			freeProduct: string;
			products: Product[];
		}[];
	};
}
