import { type Product } from "@/lib/shopify/functions/product/types";

export type HeroProps = Product & {
	defaultCurrentVariant: Product["variants"][0];
	bundles: {
		products: Product[];
		freeProduct: Product;
	};
};
