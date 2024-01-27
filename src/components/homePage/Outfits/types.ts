import { type Product } from "@/lib/shopify/functions/product/types";
export interface OutfitsProps {
	bundles: {
		products: Product[];
		freeProduct: Product;
	}[];
	title: string;
}
