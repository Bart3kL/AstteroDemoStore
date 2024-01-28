import type { Product } from "../../../lib/shopify/functions/product/types";

export interface NewAndDiscountProductsProps {
	newProducts: Product[];
	saleProducts: Product[];
	newTitle: string;
	saleTitle: string;
	title: string;
}
