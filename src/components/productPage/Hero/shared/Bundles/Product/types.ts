import type { Product, ProductVariant } from "@/lib/shopify/functions/product/types";

export type ProductProps = Product & {
	totalPriceWithDiscount: number;
	totalPriceBeforeDiscount: string;
	isFreeProduct: boolean;
	savedMoney: string;
	selectedVariants: ProductVariant[];
	setSelectedVariants: any;
	idx: number;
	bundleProductsAddToCart: {
		quantity: number;
		merchandiseId: string;
	}[];
};
