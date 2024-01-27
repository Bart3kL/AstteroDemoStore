import { type Product } from "@/lib/shopify/functions/product/types";

export interface HeroProps {
	product: Product;
	bundles: {
		products: Product[];
		freeProduct: Product;
	};
	currentVariant: Product["variants"][0];
}
