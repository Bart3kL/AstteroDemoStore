import type { Product } from "../../../lib/shopify/functions/product/types";

export interface NewAndDiscountProductsProps {
	newProducts: Product[];
	newTitle: string;
	saleProducts: Product[];
	saleTitle: string;
	title: string;
}
